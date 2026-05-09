from openai import OpenAI
from app.config import OPENROUTER_API_KEY

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)

def analyze_article(article_text):

    prompt = f"""
    Analyze the following news article.

    Return ONLY in this format:

    SUMMARY:
    <2 sentence summary>

    SENTIMENT:
    <positive/negative/neutral>

    INSIGHTS:
    1. insight one
    2. insight two
    3. insight three

    ARTICLE:
    {article_text}
    """

    completion = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content