from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Article(Base):

    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)

    article_id = Column(String, unique=True)

    title = Column(String)
    description = Column(Text)
    content = Column(Text)

    source_id = Column(String)
    source_name = Column(String)

    link = Column(String)

    pubDate = Column(String)

    summary = Column(Text)
    sentiment = Column(String)
    insights = Column(Text)