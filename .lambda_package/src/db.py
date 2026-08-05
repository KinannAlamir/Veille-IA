import boto3
import logging
from botocore.exceptions import ClientError
from mypy_boto3_dynamodb.service_resource import Table

logger = logging.getLogger(__name__)

TABLE_NAME = "TechWatch_Articles"

def get_table() -> Table:
    """Returns the DynamoDB table resource."""
    dynamodb = boto3.resource("dynamodb", region_name="eu-west-1") # Change region if needed
    return dynamodb.Table(TABLE_NAME)

def article_exists(article_id: str) -> bool:
    """Checks if an article exists in DynamoDB by its ID."""
    table = get_table()
    try:
        response = table.get_item(Key={"PK": "article", "SK": article_id})
        return "Item" in response
    except ClientError as e:
        logger.error(f"Error checking if article exists: {e}")
        return False

def save_article_to_db(article: dict) -> None:
    """Saves a single enriched article to DynamoDB."""
    table = get_table()
    
    # Map the document to the table schema
    # Use PK = "article" for quick retrieval by type. SK as unique article id.
    item = {
        "PK": "article",
        "SK": article["id"],
        **article
    }
    
    try:
        table.put_item(
            Item=item,
            ConditionExpression="attribute_not_exists(PK) AND attribute_not_exists(SK)"
        )
        logger.info(f"Successfully saved {article['id']} to DynamoDB.")
    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            logger.info(f"Article {article['id']} already exists in DynamoDB. Skipping.")
        else:
            logger.error(f"Error saving to DynamoDB: {e}")

