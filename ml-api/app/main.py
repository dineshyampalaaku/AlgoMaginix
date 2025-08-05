from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from .database import init_db, SessionLocal
from .models import JournalEntry
from sqlalchemy.orm import Session
import json

# Initialize FastAPI app
app = FastAPI()

# Initialize DB
init_db()

# Load emotion model once at startup
emotion_classifier = pipeline("text-classification",
                              model="j-hartmann/emotion-english-distilroberta-base",
                              return_all_scores=True)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

from pydantic import BaseModel, root_validator

class TextInput(BaseModel):
    text: str

    @root_validator(pre=True)
    def allow_text_or_inputText(cls, values):
        if 'text' not in values and 'inputText' in values:
            values['text'] = values.pop('inputText')
        return values


# Emotion analysis + DB save
@app.post("/analyze")
async def analyze_text(data: TextInput):
    text = data.text
    results = emotion_classifier(text)[0]

    emotions = {res['label']: round(res['score'], 3) for res in results}
    top_emotion = max(emotions, key=emotions.get)

    # Save to DB
    db = SessionLocal()
    try:
        entry = JournalEntry(
            input_text=text,
            top_emotion=top_emotion,
            emotion_scores=json.dumps(emotions)
        )
        db.add(entry)
        db.commit()
        db.refresh(entry)
    finally:
        db.close()

    return {
        "input_text": text,
        "top_emotion": top_emotion,
        "emotions": emotions
    }

# Get all journal entries
@app.get("/entries")
def get_entries():
    db: Session = SessionLocal()
    try:
        entries = db.query(JournalEntry).order_by(JournalEntry.created_at.desc()).all()
        result = []
        for entry in entries:
            result.append({
                "id": entry.id,
                "input_text": entry.input_text,
                "top_emotion": entry.top_emotion,
                "emotions": json.loads(entry.emotion_scores),
                "created_at": entry.created_at.isoformat()
            })
        return result
    finally:
        db.close()
