# Builds deployable zip packages for both Lambda functions into deploy/dist/.
# Run from the repository root: .\deploy\package_lambdas.ps1
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $PSScriptRoot "dist"
$build = Join-Path $PSScriptRoot "build"

Remove-Item -Recurse -Force $dist, $build -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $dist, $build | Out-Null

# --- get_articles: zero external dependencies (boto3 ships with the Lambda runtime) ---
Write-Host "Packaging get_articles..."
Compress-Archive -Path (Join-Path $root "lambdas\get_articles.py") -DestinationPath (Join-Path $dist "get_articles.zip")

# --- ingest_articles: needs feedparser/httpx/beautifulsoup4 + the local agent_prompts module ---
Write-Host "Packaging ingest_articles..."
$ingestBuild = Join-Path $build "ingest_articles"
New-Item -ItemType Directory -Path $ingestBuild | Out-Null

python -m pip install -r (Join-Path $PSScriptRoot "requirements-lambda.txt") -t $ingestBuild --no-cache-dir --quiet
Copy-Item (Join-Path $root "lambdas\ingest_articles.py") $ingestBuild
Copy-Item (Join-Path $root "lambdas\agent_prompts.py") $ingestBuild

Compress-Archive -Path (Join-Path $ingestBuild "*") -DestinationPath (Join-Path $dist "ingest_articles.zip")

Remove-Item -Recurse -Force $build
Write-Host "Done. Zips are in $dist"
