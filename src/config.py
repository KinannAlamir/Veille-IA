import os
import logging

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

SCRAPED_RAW_FILE = os.path.join(DATA_DIR, "scraped_raw.json")
OUTPUT_LOCAL_FILE = os.path.join(DATA_DIR, "output_local.json")
UI_DATA_FILE = os.path.join(PUBLIC_DIR, "data.json")

# AI
TOPIC_MAP = [
    "arch_design", "infra_conn", "cloud_adopt", "auto_ops_sre", 
    "sovereignty_resilience", "sustech_finops", "hyperscalers", 
    "ai", "quantum", "fow_modern_workplace", "fow_comm_collab", 
    "fow_nextgen_support", "fow_cyber_compliance", "fow_data_ai"
]

# Sources de veille organisées par sujet (grille des 14 thématiques + "general" pour les flux
# généralistes non rattachés à un seul sujet). Sert de référence unique pour dériver les listes
# à plat RSS_FEEDS / WEB_SCRAPE_TARGETS utilisées par le scraper.
# NB: certaines URLs peuvent évoluer avec le temps ; à vérifier périodiquement.
SOURCES_BY_TOPIC = {
    "general": [
        {"kind": "rss", "url": "https://hnrss.org/frontpage", "name": "Hacker News (RSS)"},
        {"kind": "web", "url": "https://news.ycombinator.com/", "type": "hackernews", "name": "HackerNews Web"},
    ],
    "arch_design": [
        {"kind": "rss", "url": "https://martinfowler.com/feed.atom", "name": "Martin Fowler"},
        {"kind": "web", "url": "https://thenewstack.io/", "type": "generic_blog", "name": "The New Stack"},
    ],
    "infra_conn": [
        {"kind": "rss", "url": "https://www.theregister.com/data_centre/headlines.atom", "name": "The Register - Data Centre"},
        {"kind": "rss", "url": "https://blogs.cisco.com/feed", "name": "Cisco Blogs"},
        {"kind": "web", "url": "https://blog.cloudflare.com/", "type": "generic_blog", "name": "Cloudflare Blog"},
    ],
    "cloud_adopt": [
        {"kind": "rss", "url": "https://www.cio.com/feed/", "name": "CIO.com"},
        {"kind": "rss", "url": "https://www.theregister.com/cloud/headlines.atom", "name": "The Register - Cloud"},
    ],
    "auto_ops_sre": [
        {"kind": "rss", "url": "https://devops.com/feed/", "name": "DevOps.com"},
        {"kind": "rss", "url": "https://kubernetes.io/feed.xml", "name": "Kubernetes Blog"},
    ],
    "sovereignty_resilience": [
        {"kind": "rss", "url": "https://www.lemagit.fr/rss/Actualites.xml", "name": "LeMagIT"},
        {"kind": "rss", "url": "https://www.silicon.fr/feed", "name": "Silicon.fr"},
    ],
    "sustech_finops": [
        {"kind": "rss", "url": "https://www.finops.org/feed/", "name": "FinOps Foundation"},
        {"kind": "rss", "url": "https://www.greenit.fr/feed/", "name": "GreenIT.fr"},
    ],
    "hyperscalers": [
        {"kind": "rss", "url": "https://aws.amazon.com/about-aws/whats-new/recent/feed/", "name": "AWS What's New"},
        {"kind": "rss", "url": "https://azurecomcdn.azureedge.net/en-us/updates/feed/", "name": "Azure Updates"},
        {"kind": "rss", "url": "https://cloudblog.withgoogle.com/rss/", "name": "Google Cloud Blog"},
    ],
    "ai": [
        {"kind": "rss", "url": "https://www.artificialintelligence-news.com/feed/", "name": "AI News"},
        {"kind": "rss", "url": "https://openai.com/blog/rss.xml", "name": "OpenAI Blog"},
    ],
    "quantum": [
        {"kind": "rss", "url": "https://quantumcomputingreport.com/feed/", "name": "Quantum Computing Report"},
    ],
    "fow_modern_workplace": [
        {"kind": "rss", "url": "https://petri.com/feed", "name": "Petri IT Knowledgebase"},
    ],
    "fow_comm_collab": [
        {"kind": "rss", "url": "https://blog.zoom.us/feed/", "name": "Zoom Blog"},
    ],
    "fow_nextgen_support": [
        {"kind": "rss", "url": "https://itsm.tools/feed/", "name": "ITSM.tools"},
    ],
    "fow_cyber_compliance": [
        {"kind": "rss", "url": "https://feeds.feedburner.com/TheHackersNews", "name": "The Hacker News"},
        {"kind": "rss", "url": "https://krebsonsecurity.com/feed/", "name": "Krebs on Security"},
    ],
    "fow_data_ai": [
        {"kind": "rss", "url": "https://towardsdatascience.com/feed", "name": "Towards Data Science"},
        {"kind": "web", "url": "https://huggingface.co/blog", "type": "generic_blog", "name": "Hugging Face Blog"},
    ],
}

# Listes à plat dérivées de SOURCES_BY_TOPIC, consommées par le scraper (RSS + web scraping).
RSS_FEEDS = [
    src["url"]
    for sources in SOURCES_BY_TOPIC.values()
    for src in sources
    if src["kind"] == "rss"
]

WEB_SCRAPE_TARGETS = [
    {"url": src["url"], "type": src["type"], "name": src["name"]}
    for sources in SOURCES_BY_TOPIC.values()
    for src in sources
    if src["kind"] == "web"
]

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

