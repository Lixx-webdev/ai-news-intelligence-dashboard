# AI News Intelligence Dashboard

An end-to-end AI-powered news analytics platform built using FastAPI, React, SQLite, and AI enrichment pipelines.

## Features

- Real-time news ingestion pipeline
- AI-generated article summaries
- Search functionality
- FastAPI backend APIs
- React dashboard frontend
- SQLite database integration
- ETL pipeline architecture
- Responsive modern UI

---

## Tech Stack

### Backend
- Python
- FastAPI
- SQLite
- SQLAlchemy
- Requests

### Frontend
- React
- Vite
- TailwindCSS
- Axios

### AI Integration
- OpenRouter API
- LLM-based article analysis

---

## Project Architecture

News API
↓
ETL Pipeline
↓
AI Processing
↓
SQLite Database
↓
FastAPI Backend
↓
React Dashboard

---

## Setup Instructions

# Backend

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

Create .env file:

NEWS_API_KEY=your_key
OPENROUTER_API_KEY=your_key

uvicorn app.main:app --reload

# Frontend

cd frontend

npm install

npm run dev

---

## API Endpoints

GET /articles
GET /search
GET /run-pipeline

---

## Future Improvements

- Sentiment visualization charts
- User authentication
- Scheduled automated pipelines
- Docker deployment
- Cloud database integration
- Vector search + RAG pipeline
- More Intuitive User Interface
- Deployement as an android/iOS application
- AI Chatbot for learning, query resolution

---

## Author

Lavanya Santosh Indulkar -

B.E. in AI & Data Science 