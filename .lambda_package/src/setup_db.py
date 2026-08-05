import boto3
import logging
from botocore.exceptions import ClientError
from src.config import setup_logging
from src.db import TABLE_NAME

logger = logging.getLogger(__name__)

def create_table():
    """Creates the DynamoDB table if it does not exist."""
    dynamodb = boto3.resource("dynamodb", region_name="eu-west-1")
    
    try:
        table = dynamodb.create_table(
            TableName=TABLE_NAME,
            KeySchema=[
                {"AttributeName": "PK", "KeyType": "HASH"},  # Partition key
                {"AttributeName": "SK", "KeyType": "RANGE"}  # Sort key
            ],
            AttributeDefinitions=[
                {"AttributeName": "PK", "AttributeType": "S"},
                {"AttributeName": "SK", "AttributeType": "S"}
            ],
            BillingMode="PAY_PER_REQUEST" 
        )
        
        logger.info(f"Creating table {TABLE_NAME}...")
        table.wait_until_exists()
        logger.info(f"Table {TABLE_NAME} created successfully!")
    except ClientError as e:
        if e.response["Error"]["Code"] == "ResourceInUseException":
            logger.info(f"Table {TABLE_NAME} already exists.")
        else:
            logger.error(f"Error creating table: {e}")

if __name__ == "__main__":
    setup_logging()
    create_table()

