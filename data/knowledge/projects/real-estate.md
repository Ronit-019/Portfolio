# Real Estate Recommender

## Overview
A pricing prediction model and geographic recommender system designed to evaluate property values based on historical records, surrounding neighborhood features, and public transport access indexes. Deployed on GCP for scalable inference.

## Technical Details
- **Stack**: Python, Pandas, Scikit-Learn, XGBoost, FastAPI, Docker, GCP (App Engine, BigQuery)
- **Model Design**: 
  - An ensemble model of Gradient Boosting (XGBoost) and Ridge Regression.
  - Features include geographic coordinates, bedroom/bathroom metrics, school district ratings, and a custom "commute factor" index compiled from distance to transit stations.
- **API**: FastAPI endpoint that receives coordinates and features, returns predicted price range and 5 nearest neighbor recommended properties.

## Challenges & Learnings
- **Challenge**: Missing feature values (e.g. some property records lacked square footage or year built). Dealt with this by implementing KNN Imputation on the dataset before training, which reduced our pricing mean absolute error (MAE) by 8% compared to simple median imputation.
- **Learning**: Learned that users rarely trust a black-box price prediction. Adding feature importance visualization (using SHAP values) in the web UI significantly improved user trust and engagement.
