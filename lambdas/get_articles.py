import json
import boto3
import decimal
from botocore.exceptions import ClientError

# Helper pour convertir les types Decimal de DynamoDB vers JSON
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            # Si c'est un entier, le retourner comme int sinon comme float
            if obj % 1 == 0:
                return int(obj)
            else:
                return float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    """
    Fonction AWS Lambda pour récupérer les articles depuis DynamoDB.
    Déclenchée via API Gateway ou Function URL.
    """
    dynamodb = boto3.resource("dynamodb", region_name="eu-west-1")
    table = dynamodb.Table("TechWatch_Articles")
    
    try:
        # On récupère tous les éléments qui ont PK = "article"
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key("PK").eq("article")
        )
        
        items = response.get("Items", [])
        
        # On supprime les clefs AWS purement internes (PK, SK) pour le front
        for item in items:
            item.pop("PK", None)
            item.pop("SK", None)

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                # Activer le CORS pour que le fetch du Frontend fonctionne depuis n'importe où
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": json.dumps(items, cls=DecimalEncoder)
        }
        
    except ClientError as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"error": str(e)})
        }

