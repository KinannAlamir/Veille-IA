# -*- coding: utf-8 -*-
import json
import logging
import hashlib
import boto3
from botocore.exceptions import ClientError
from src.config import SCRAPED_RAW_FILE, OUTPUT_LOCAL_FILE, UI_DATA_FILE, setup_logging
from src.db import save_article_to_db, article_exists

logger = logging.getLogger(__name__)

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

def call_bedrock(content: str, title: str) -> dict:
    """Calls Amazon Bedrock using Ministral 3B for cost-effective enrichment."""
    logger.info(f"Calling Bedrock for: {title}")
    
    # Region Londres (eu-west-2) qui possède Ministral 3B
    bedrock = boto3.client(service_name='bedrock-runtime', region_name="eu-west-2")
    
    # Utilisation de Ministral 3B
    model_id = "mistral.ministral-3b-instruct-v1:0"
    
    prompt = f"""Tu es un analyste technologique expert Wavestone. Analyse le texte suivant et renvoie la réponse EXACTEMENT au format JSON spécifié, sans aucun texte avant ou après.

Format JSON attendu:
{{
  "tag": "Un mot clé principal (ex: IA, CLOUD, CYBER)",
  "topicId": "Un identifiant parmi: automation, cloud, ia, boosting_cto",
  "highLevel": {{
    "linkedinHook": "Une accroche LinkedIn avec des emojis, orientée business et stratégie.",
    "facts": [
      "Fait 1 simplifié",
      "Fait 2 simplifié"
    ],
    "summary": "1 phrase résumant l'impact métier."
  }},
  "lowLevel": {{
    "linkedinHook": "Une accroche LinkedIn pour un public développeur/architecte.",
    "facts": [
      "Fait technique 1",
      "Fait technique 2"
    ],
    "summary": "1 phrase résumant l'architecture ou la stack."
  }}
}}

TEXTE À ANALYSER (Titre: {title}):
{content[:2000]} # Limitons la taille du texte pour les coûts
"""

    mistral_prompt = f"<s>[INST] {prompt} [/INST]"

    request_body = {
        "prompt": mistral_prompt,
        "max_tokens": 1024,
        "temperature": 0.5
    }

    try:
        response = bedrock.invoke_model(
            modelId=model_id,
            body=json.dumps(request_body)
        )
        
        response_body = json.loads(response.get('body').read())
        result_text = response_body.get("outputs")[0].get("text")
        
        # Parse the JSON returned by Claude
        enriched_data = json.loads(result_text)
        return enriched_data
        
    except ClientError as e:
        logger.error(f"AWS Bedrock error: {e}")
        # Fallback to mock format if Bedrock fails
        return {
            "tag": "ERROR",
            "topicId": "automation",
            "highLevel": {
                "linkedinHook": f"Error formatting",
                "facts": ["Error processing with Bedrock"],
                "summary": "Failed"
            },
            "lowLevel": {
                "linkedinHook": f"Error formatting",
                "facts": ["Error processing with Bedrock"],
                "summary": "Failed"
            }
        }
    except json.JSONDecodeError as e:
         logger.error(f"LLM returned invalid JSON: {e}. Raw response: {result_text}")
         return {
            "tag": "PARSE_ERROR",
            "topicId": "automation",
            "highLevel": {
                "linkedinHook": f"Parse error",
                "facts": ["Model did not return valid JSON"],
                "summary": "Failed"
            },
            "lowLevel": {
                "linkedinHook": f"Parse error",
                "facts": ["Model did not return valid JSON"],
                "summary": "Failed"
            }
        }

def format_enriched_article(idx: int, article: dict, enriched: dict) -> dict:
    """Formats the final document for the UI."""
    article_hash = hashlib.md5(article["url"].encode()).hexdigest()[:8]
    return {
        "id": f"news_auto_{article_hash}",
        "tag": enriched["tag"],
        "topicId": enriched["topicId"],
        "title": article["title"],
        "source": "RSS Scraper",
        "date": "Aujourd'hui", 
        "score": str(80 + idx),
        "period": "Cette semaine",
        "comments": str(idx * 2),
        "shares": "0",
        "highLevel": enriched["highLevel"],
        "lowLevel": enriched["lowLevel"]
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
        enriched = call_bedrock(article["content"], article["title"])
        final_doc = format_enriched_article(idx, article, enriched)
        final_doc["id"] = generated_id 
        
        # Save to list for local JSON backup
        enriched_data.append(final_doc)
        
        # Save to DynamoDB
        save_article_to_db(final_doc)
        
    if enriched_data:
        save_enriched_data(enriched_data, [OUTPUT_LOCAL_FILE, UI_DATA_FILE])
    logger.info("Enrichment complete.")

if __name__ == "__main__":
    main()

