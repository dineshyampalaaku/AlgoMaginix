from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

# Update these with your actual PostgreSQL credentials
DB_URL = "postgresql://postgres:%23Post%40SQL%23@localhost:5432/algomaginix"

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables if they don't exist
def init_db():
    Base.metadata.create_all(bind=engine)
