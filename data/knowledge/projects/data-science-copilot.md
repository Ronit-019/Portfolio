# Data Science Copilot

## Overview
An interactive companion tool for data scientists that automates the tedious early stages of dataset analysis (EDA) and generates boilerplate Scikit-Learn pipelines.

## Technical Details
- **Stack**: Python, Streamlit, Pandas, YData-Profiling, OpenAI GPT-4o-mini
- **Workflow**:
  - The user uploads a CSV or Excel dataset.
  - The application automatically generates descriptive statistics, correlation heatmaps, and alerts for highly correlated features or class imbalances.
  - The user enters a natural language query describing their goal (e.g., "predict column 'churn' using random forest").
  - The copilot translates the request, generates complete, commented Python code for training a pipeline, and includes code for saving the model.

## Challenges & Learnings
- **Challenge**: Context window overflow on large CSV files. To prevent sending raw data to the LLM, the tool extracts structural metadata: column names, data types, null percentage, and a 3-row statistical summary (mean, min, max, unique values). Only this metadata is sent to the LLM.
- **Learning**: Gained experience in prompt engineering, structuring output schemas (forcing the LLM to return code blocks wrapped in specific markdown tags), and building responsive, data-heavy Streamlit user interfaces.
