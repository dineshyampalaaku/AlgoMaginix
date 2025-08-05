from textblob import TextBlob


def analyze_sentiment(text: str) -> dict:
    """
    Analyze the sentiment of a given text using TextBlob.

    Returns:
        {
            "label": "positive" / "negative" / "neutral",
            "polarity": float
        }
    """
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    if polarity > 0:
        label = "positive"
    elif polarity < 0:
        label = "negative"
    else:
        label = "neutral"

    return {"label": label, "polarity": polarity}
