from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class JournalEntry(Base):
    __tablename__ = "journal_entry"

    id = Column(Integer, primary_key=True, index=True)
    input_text = Column(Text)
    top_emotion = Column(String)
    emotion_scores = Column(Text)  # JSON string of scores
    created_at = Column(DateTime, default=datetime.utcnow)
