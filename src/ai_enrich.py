# -*- coding: utf-8 -*-
import json
import logging
import hashlib
import boto3
from botocore.exceptions import ClientError
from src.config import SCRAPED_RAW_FILE, OUTPUT_LOCAL_FILE, UI_DATA_FILE, TOPIC_MAP, setup_logging
from src.db import save_article_to_db, article_exists

from src.agent_prompts import get_agent_prompt

logger = logging.getLogger(__name__)

# Vérifiez Bedrock > Model access dans cette région pour Amazon Nova Micro. Si indisponible en
# invocation directe, utilisez le profil d'inférence cross-region "eu.amazon.nova-micro-v1:0"
# ou changez BEDROCK_REGION (ex: us-east-1).
BEDROCK_REGION = "eu-west-3"
MODEL_ID = "amazon.nova-micro-v1:0"

def load_scraped_data(file_path: str) -> list[dict]:
    """Loads scraped data from JSON file."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error(f"No {file_path} found. Run scraper.py first.")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Error parsing JSON in {file_path}: {e}")
        return []

def call_bedrock(content: str, title: str, category: str = "ea") -> dict:
    """Calls Amazon Bedrock using Nova Micro (Converse API) for cost-effective enrichment."""
    logger.info(f"Calling Bedrock for: {title}")

    bedrock = boto3.client(service_name='bedrock-runtime', region_name=BEDROCK_REGION)

    # Si on transmet un sujet clé (ma, sourcing...), on génère le Custom Prompt.
    # Pour simuler sur le poste de test, je limite le formatage à un de vos agents.
    prompt = get_agent_prompt(category)
    prompt += f"\n\nTEXTE À ANALYSER (Titre: {title}):\n{content[:2000]}"

    result_text = ""
    try:
        response = bedrock.converse(
            modelId=MODEL_ID,
            messages=[{"role": "user", "content": [{"text": prompt}]}],
            inferenceConfig={"maxTokens": 1024, "temperature": 0.5}
        )
        result_text = response["output"]["message"]["content"][0]["text"]

        try:
            enriched_data = json.loads(result_text)
            return enriched_data
        except json.JSONDecodeError:
            # Option 2 : Si le LLM n'a pas renvoyé de JSON, c'est que c'est un prompt Agent Spécialiste
            # On encapsule ce rapport dans le fallback pour notre nouvel onglet d'affichage.
            logger.info("Réponse de type Rapport Texte interceptée.")
            return {
                "tag": "RAPPORT AGENT",
                "topicId": category,
                "isReport": True,
                "reportContent": result_text
            }

    except ClientError as e:
        logger.error(f"AWS Bedrock error: {e}")
        # Fallback to mock format if Bedrock fails
        return {
            "tag": "ERROR",
            "topicId": "automation",
            "linkedinHook": "Error formatting",
            "facts": ["Error processing with Bedrock"],
            "summary": "Failed"
        }

def format_enriched_article(idx: int, article: dict, enriched: dict) -> dict:
    """Formats the final document for the UI."""
    article_hash = hashlib.md5(article["url"].encode()).hexdigest()[:8]
    return {
        "id": f"news_auto_{article_hash}",
        "tag": enriched.get("tag", "TECH"),
        "topicId": enriched.get("topicId", "automation"),
        "title": article["title"],
        "source": "RSS Scraper",
        "date": "Aujourd'hui", 
        "score": str(80 + idx),
        "comments": str(idx * 2),
        "shares": "0",
        "linkedinHook": enriched.get("linkedinHook", ""),
        "facts": enriched.get("facts", []),
        "summary": enriched.get("summary", ""),
        "isReport": enriched.get("isReport", False),
        "reportContent": enriched.get("reportContent", "")
    }

def save_enriched_data(data: list[dict], file_paths: list[str]) -> None:
    """Saves the enriched data to multiple paths."""
    for path in file_paths:
        try:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            logger.info(f"Wrote results to {path}")
        except IOError as e:
            logger.error(f"Failed to write to {path}: {e}")

def main():
    setup_logging()
    articles = load_scraped_data(SCRAPED_RAW_FILE)
    if not articles:
        return
        
    enriched_data = []

    for idx, article in enumerate(articles):
        # Generate hash id as before
        article_hash = hashlib.md5(article["url"].encode()).hexdigest()[:8]
        generated_id = f"news_auto_{article_hash}"
        
        # Check if already processed in DynamoDB to save costs!
        if article_exists(generated_id):
            logger.info(f"Article {generated_id} already exists in DB. Skipping AI enrichment and saving.")
            continue
            
        # Enrich and structure
        # Simulation d'un routage : pour le dev, on fait tourner l'article sur les 14 sujets de la grille UI
        assigned_category = TOPIC_MAP[idx % len(TOPIC_MAP)]
        
        enriched = call_bedrock(article["content"], article["title"], category=assigned_category)
        
        final_doc = format_enriched_article(idx, article, enriched)
        final_doc["id"] = generated_id
        final_doc["url"] = article.get("url", "")
        
        # Save to list for local JSON backup
        enriched_data.append(final_doc)
        
        # Save to DynamoDB
        save_article_to_db(final_doc)
        
    if enriched_data:
        save_enriched_data(enriched_data, [OUTPUT_LOCAL_FILE, UI_DATA_FILE])
    logger.info("Enrichment complete.")

if __name__ == "__main__":
    main()

