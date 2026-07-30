import os
import logging

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

SCRAPED_RAW_FILE = os.path.join(DATA_DIR, "scraped_raw.json")
OUTPUT_LOCAL_FILE = os.path.join(DATA_DIR, "output_local.json")
UI_DATA_FILE = os.path.join(PUBLIC_DIR, "data.json")

# Sources
RSS_FEEDS = [
    "https://aws.amazon.com/about-aws/whats-new/recent/feed/",
    "https://azurecomcdn.azureedge.net/en-us/updates/feed/",
    "https://hnrss.org/frontpage",
    "https://devops.com/feed/",
    "https://feeds.feedburner.com/TheHackersNews",
    "https://www.artificialintelligence-news.com/feed/"
]

# AI
TOPIC_MAP = [
    "arch_design", "infra_conn", "cloud_adopt", "auto_ops_sre", 
    "sovereignty_resilience", "sustech_finops", "hyperscalers", 
    "ai", "quantum", "fow_modern_workplace", "fow_comm_collab", 
    "fow_nextgen_support", "fow_cyber_compliance", "fow_data_ai"
]

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

