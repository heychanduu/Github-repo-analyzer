# Google Cloud Platform (GCP) Deployment Guide

This guide details how to deploy the **GitHub Portfolio Analyzer** to GCP using **Cloud Run**. Cloud Run is a serverless platform for containerized applications, ideal for this project.

## Prerequisites
- A Google Cloud Project with billing enabled.
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and initialized (`gcloud init`).
- Docker installed locally.

## 1. Setup Environment Variables
Open your terminal (PowerShell or Bash) and set the following variables for convenience:
```bash

PROJECT_ID="github-portfolio-analyzer"
REGION="asia-south1"
BACKEND_IMAGE="gcr.io/github-portfolio-analyzer/portfolio-backend"
FRONTEND_IMAGE="gcr.io/github-portfolio-analyzer/portfolio-frontend"
```

## 2. Deploy Backend (Spring Boot)

### Build and Push Image
```bash
# Build the backend image using Jib (built-in Maven plugin) or Docker
docker build -t $BACKEND_IMAGE .

# Configure Docker to authenticte with GCR
gcloud auth configure-docker

# Push the image
docker push $BACKEND_IMAGE
```

### Deploy to Cloud Run
```bash
gcloud run deploy portfolio-backend \
  --image $BACKEND_IMAGE \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars GITHUB_API_TOKEN=your_github_pat
```
*Note the URL of the deployed backend service (e.g., `https://portfolio-backend-xyz.a.run.app`).*

## 3. Deploy Frontend (React + Nginx)

### Update Configuration
Before building, you must point the Frontend to your live Backend URL.
Create a local `.env.production` file in `frontend/`:
```
VITE_API_URL=https://portfolio-backend-xyz.a.run.app
```
*Alternatively, update `nginx.conf` to proxy requests to this URL.*

### Build and Push Image
```bash
cd frontend
docker build -t $FRONTEND_IMAGE .
docker push $FRONTEND_IMAGE
```

### Deploy to Cloud Run
```bash
gcloud run deploy portfolio-frontend \
  --image $FRONTEND_IMAGE \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated
```

## 4. Final Verification
Access the URL provided by the Frontend deployment command. Your application is now live on Google Cloud!
