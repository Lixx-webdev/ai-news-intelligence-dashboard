from app.news_fetcher import fetch_news
from app.database import SessionLocal
from app.models import Article

from app.ai_processor import analyze_article

def run_pipeline():

    db = SessionLocal()

    data = fetch_news()

    articles = data.get("results", [])[:5]

    inserted_count = 0

    for item in articles:

        article_id = item.get("article_id")

        if not article_id:
            continue

        existing = db.query(Article).filter(
            Article.article_id == article_id
        ).first()

        if existing:
            continue

        title = item.get("title", "").strip()

        if not title:
            continue

        description = item.get("description", "")

        content = item.get("content", "")

        combined_text = f"""
        Title: {title}

        Description: {description}

        Content: {content}
        """

        # AI Processing
        try:
            ai_result = analyze_article(combined_text)

        except Exception as e:
            print(f"Error occurred while analyzing article: {e}")
            ai_result = """Error occurred while analyzing article.
            SUMMARY:
    AI processing failed.

    SENTIMENT:
    neutral

    INSIGHTS:
    1. AI unavailable
            """

        article = Article(
            article_id=article_id,
            title=title,
            description=description,
            content=content,
            source_id=item.get("source_id"),
            source_name=item.get("source_name"),
            link=item.get("link"),
            pubDate=item.get("pubDate"),

            # AI fields
            summary=ai_result,
            sentiment="pending",
            insights="pending"
        )

        db.add(article)

        inserted_count += 1

    db.commit()
    db.close()

    return {
        "message": "AI Pipeline completed",
        "inserted": inserted_count
    }