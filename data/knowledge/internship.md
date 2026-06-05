# Internship: Data Engineering & ML Intern

## Overview
From June 2025 to August 2025, Ronit interned at **Future Analytics** as a Data Engineering & ML Intern. His primary responsibility was building intelligent monitoring tools and optimizing data storage performance for business-critical marketing metrics.

## Key Contributions
- **LLM Alert Filtering**: Developed an LLM-validation layer utilizing Gemini API to reduce statistical alert noise. By prompting the model to check historical contexts and correlation metrics, the system filtered out insignificant anomalies, leading to a **75% reduction in alert noise**.
- **ETL Query Tuning**: Optimized BigQuery tables, indexes, and partition schemes. These modifications reduced the execution time of marketing dashboard aggregation scripts by **40%**.
- **Forecasting Pipeline**: Configured a BigQuery ML time-series forecasting model (`ARIMA_PLUS`) that runs daily to generate revenue predictions, comparing actual metrics against predicted trends in real-time.

## Technical Details
- **Stack**: Google Cloud Platform (GCP), BigQuery, FastAPI, BigQuery ML, Gemini 1.5 Flash, React, Recharts
- **Architecture**: A cron scheduler triggers a BigQuery ML run every midnight. A FastAPI microservice fetches the actual vs. forecast records and checks for anomalies. If an anomaly exceeds standard standard-deviation thresholds, it is sent to the Gemini API validation layer. Verified anomalies are pushed to a Redis stream and rendered on the front-end dashboard.

## Learnings & Outcomes
- **Outcome**: The team went from dealing with 20+ false alarm alerts per day to ~2 high-fidelity alerts that genuinely required developer attention.
- **Learning**: Realized that user trust is the most critical metric for monitoring tools. If a dashboard triggers too many false positives, engineers will mute it, rendering the tool useless.
