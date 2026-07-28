import feedparser
import json
import logging
from src.config import RSS_FEEDS, SCRAPED_RAW_FILE, setup_logging

logger = logging.getLogger(__name__)

def scrape_articles(limit_per_feed: int = 2) -> list[dict]:
    """Scrapes articles from configured RSS feeds."""
    articles = []
    
    for feed_url in RSS_FEEDS:
        logger.info(f"Scraping {feed_url}...")
        try:
            feed = feedparser.parse(feed_url)
            
            for entry in feed.entries[:limit_per_feed]:
                logger.info(f"Found article: {entry.title}")
                
                content = getattr(entry, "content", [{"value": ""}])[0]["value"] if hasattr(entry, "content") else getattr(entry, "summary", "")
                    
                article = {
                    "id": entry.link,
                    "title": entry.title,
                    "url": entry.link,
                    "date": getattr(entry, "published", "Unknown"),
                    "content": content
                }
                articles.append(article)
        except Exception as e:
            logger.error(f"Error scraping {feed_url}: {e}")
            
    logger.info(f"Scraped {len(articles)} articles total.")
    return articles

def save_articles(articles: list[dict], output_path: str) -> None:
    """Saves articles to a JSON file."""
    try:
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(articles, f, ensure_ascii=False, indent=4)
        logger.info(f"Saved raw articles to {output_path}")
    except IOError as e:
        logger.error(f"Failed to save articles to {output_path}: {e}")

def main():
    setup_logging()
    scraped_data = scrape_articles()
    save_articles(scraped_data, SCRAPED_RAW_FILE)

if __name__ == "__main__":
    main()

