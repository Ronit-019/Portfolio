export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  context: string;
  challenge: string;
  skillGained: string;
  impact: string;
  tags?: string[];
}

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: "time-01",
    year: "2023",
    title: "Started Python & Data Science Fundamentals",
    context: "Embarked on software engineering path. Learned core algorithmic thinking and data manipulations.",
    challenge: "Understanding complex statistical formulas and adapting to NumPy multi-dimensional array operations.",
    skillGained: "Python, SQL query scripting, Pandas data cleaning, and statistical regression modeling.",
    impact: "Established coding fundamentals and built exploratory statistical scripts analyzing demographic datasets.",
    tags: ["Python", "SQL", "Pandas"]
  },
  {
    id: "time-02",
    year: "2024",
    title: "Built First ML Prediction Models",
    context: "Learned machine learning fundamentals. Built and deployed standard models on Kaggle datasets.",
    challenge: "Dealing with class imbalance, model overfitting, and selecting proper evaluation metrics.",
    skillGained: "Scikit-Learn, pricing models, feature engineering, classification evaluation metrics.",
    impact: "Constructed housing prediction estimators and model pipelines showing 80%+ evaluation scores.",
    tags: ["Machine Learning", "Scikit-Learn", "Feature Engineering"]
  },
  {
    id: "time-03",
    year: "2025 (Early)",
    title: "Real Estate Recommender Deployed on GCP",
    context: "Designed a full-stack ML pricing estimator and commute recommender service deployed on cloud platforms.",
    challenge: "Integrating predictive APIs with front-end code, managing coordinate distances, and GCP configuration.",
    skillGained: "Google Cloud Platform (GCP App Engine), FastAPI async handlers, SHAP model interpretability.",
    impact: "Launched housing predictor tool, achieving 35% user engagement gains via SHAP explanation maps.",
    tags: ["GCP", "FastAPI", "Model Interpretability"]
  },
  {
    id: "time-04",
    year: "2025 (Mid)",
    title: "Data Engineering & ML Internship",
    context: "Interned at Future Analytics, building monitoring dashboards and optimizing analytics query logs.",
    challenge: "Minimizing false positives on business monitoring dashboards to combat alert fatigue.",
    skillGained: "BigQuery ML timeseries forecasting, LLM validation pipelines, connection pool tuning.",
    impact: "Reduced system alert noise by 75% and query aggregation latencies by 40% on production databases.",
    tags: ["Data Engineering", "BigQuery ML", "System Monitoring"]
  },
  {
    id: "time-05",
    year: "2026",
    title: "Agentic AI Orchestrations",
    context: "Engineered multi-agent workflows, vector search pipelines, and dual-provider RAG portfolio frameworks.",
    challenge: "Managing state flows and loop halts in recursive agent graphs over long context documents.",
    skillGained: "LangGraph agent orchestration, FAISS vector index retrieval, pluggable provider architecture design.",
    impact: "Developed SmartCV and Ronit OS, demonstrating production-grade software engineering patterns.",
    tags: ["Agentic AI", "LangGraph", "Vector Databases", "TypeScript"]
  }
];
