from fastapi import FastAPI
from app.news_fetcher import fetch_news
from app.database import engine
from app.models import Base
from app.pipeline import run_pipeline
from app.database import SessionLocal
from app.models import Article
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI News Dashboard API Running"}

@app.get("/news")
def get_news():
    return fetch_news()

@app.get("/run-pipeline")
def pipeline():
    return run_pipeline()

@app.get("/articles")
def get_articles():

    db = SessionLocal()

    articles = db.query(Article).all()

    db.close()

    return articles