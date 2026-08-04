import feedparser
import json
import logging
import httpx
from bs4 import BeautifulSoup
from datetime import datetime
from src.config import RSS_FEEDS, WEB_SCRAPE_TARGETS, SCRAPED_RAW_FILE, setup_logging

logger = logging.getLogger(__name__)

def scrape_rss(limit_per_feed: int = 5) -> list[dict]:
    """Scrapes articles from configured RSS feeds."""
    articles = []
    for feed_url in RSS_FEEDS:
        logger.info(f"Parsing RSS: {feed_url}...")
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:limit_per_feed]:
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
            logger.error(f"Error parsing {feed_url}: {e}")
    return articles

def scrape_web_ethical(limit_per_target: int = 5) -> list[dict]:
    """Ethical web scraping using httpx and BeautifulSoup."""
    articles = []
    # Use a generic browser user-agent to ensure servers accept the request
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; VeilleIA/1.0; +http://wavestone.com)'}
    
    for target in WEB_SCRAPE_TARGETS:
        logger.info(f"Ethical scraping: {target['name']}...")
        try:
            response = httpx.get(target['url'], headers=headers, timeout=10.0)
            if response.status_code != 200:
                logger.warning(f"Could not access {target['url']} (Status: {response.status_code})")
                continue
                
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Very simple generic extraction if 'type' is hackernews 
            # (Allows adjusting parsers depending on site structure)
            if target['type'] == 'hackernews':
                rows = soup.find_all('tr', class_='athing')[:limit_per_target]
                for row in rows:
                    titleline = row.find('span', class_='titleline')
                    if not titleline:
                        continue
                        
                    link_tag = titleline.find('a')
                    title = link_tag.text
                    link = link_tag['href']
                    
                    # Ensure links are absolute
                    if link.startswith('item?id='):
                        link = f"https://news.ycombinator.com/{link}"
                        
                    article = {
                        "id": link,
                        "title": title,
                        "url": link,
                        "date": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
                        "content": title 
                    }
                    articles.append(article)
            elif target['type'] == 'generic_blog':
                count = 0
                for item in soup.find_all(['article', 'div'], limit=limit_per_target * 5): 
                    if count >= limit_per_target: break
                    h_tag = item.find(['h2', 'h3'])
                    if not h_tag: continue
                    
                    link_tag = h_tag.find('a') or item.find('a')
                    if not link_tag or not link_tag.get('href'): continue
                    
                    url = link_tag['href']
                    if url.startswith('/'):
                        from urllib.parse import urlparse
                        parsed = urlparse(target['url'])
                        url = f"{parsed.scheme}://{parsed.netloc}{url}"
                        
                    title = h_tag.text.strip()
                    if len(title) > 10 and not any(a['url'] == url for a in articles):
                        articles.append({
                            "id": url,
                            "title": title,
                            "url": url,
                            "date": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
                            "content": title
                        })
                        count += 1
                    
        except Exception as e:
            logger.error(f"Error scraping {target['name']}: {e}")
            
    return articles

def scrape_all_articles(limit_per_source: int = 5) -> list[dict]:
    """Aggregates RSS and Web Scraping."""
    rss_articles = scrape_rss(limit_per_source)
    web_articles = scrape_web_ethical(limit_per_source)
    
    combined = rss_articles + web_articles
    logger.info(f"Scraped {len(combined)} total articles ({len(rss_articles)} RSS, {len(web_articles)} WEB).")
    return combined

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
    scraped_data = scrape_all_articles()
    save_articles(scraped_data, SCRAPED_RAW_FILE)

if __name__ == "__main__":
    main()
 
