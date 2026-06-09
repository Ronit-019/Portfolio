# GA4 Anomaly Intelligence Platform

## Overview
A fully automated, production-grade GA4 anomaly detection pipeline using BigQuery ML, ARIMA forecasting, LLM-based contextual validation, and Cloud Run orchestration to deliver business-critical alerts via email.

## Problem
Manually monitoring Google Analytics 4 event streams for anomalies is slow, error-prone, and produces too many false positives — traditional threshold rules cannot adapt to seasonality, weekly patterns, or holiday effects, causing alert fatigue and missed real incidents.

## Solution
A serverless, end-to-end analytics pipeline built entirely on Google Cloud. BigQuery Scheduled Queries aggregate synthetic GA4 events daily, ARIMA_PLUS models forecast expected behavior per metric, a dual-signal anomaly engine (prediction interval breach + ML.DETECT_ANOMALIES) classifies deviations statistically, a severity + business impact layer translates signals into actionable classifications, a Flask-based Context Agent deployed on Cloud Run calls Vertex AI Gemini to validate whether anomalies are explained by active campaigns or news, and a Google Apps Script delivers professionally formatted email alerts.

## Technical Details
- **Architecture Flow**: Decoupled statistical detection (BigQuery ML), business interpretation (BigQuery SQL), contextual validation (Cloud Run + Vertex AI Gemini), and alert delivery (Google Apps Script).
- **Timezone Syncing**: Enforced a strict "process yesterday" principle using `DATE_SUB(CURRENT_DATE('Asia/Kolkata'), INTERVAL 1 DAY)` in every pipeline stage to avoid timezone drifts.
- **Idempotency**: Utilized "delete-then-insert" design pattern on all scheduled queries to make history backfills and recoveries replay-safe.

## Challenges & Resolutions
- **Synthetic GA4 Event Generation**: Created a framework in BigQuery SQL generating simulated event distributions, weekday/weekend seasonality multipliers, holiday multipliers (Diwali 1.8x, Christmas 1.5x), and probabilistic anomalies (7% daily chance) to preserve schema compatibility with live production data.
- **Atomic Batch Loads**: Replaced unstable BigQuery streaming inserts with atomic batch load jobs using `bq.load_table_from_json()` with `WRITE_APPEND` to solve date serialization errors and table truncation lock conflicts.
- **Dynamic Thresholding**: Integrated metric-specific anomaly probability thresholds (0.97 for traffic/engagement, 0.99 for revenue) and combined prediction interval breaches with `ML.DETECT_ANOMALIES` confirmation to avoid false alarms.
