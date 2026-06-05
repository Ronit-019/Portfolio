export const PROJECTS_DATA = [
  {
    slug: "smartcv",
    title: "SmartCV Resume Matcher",
    tagline: "AI-powered candidate-to-role matching utilizing LangGraph and FAISS semantic similarity search.",
    problem: "Recruiters and applicants spend countless hours evaluating resume fit manually. Basic keyword matching (ATS systems) fails to understand candidate context, project scope, and synonyms, leading to high false-rejection and false-acceptance rates.",
    solution: "SmartCV parses resumes and job descriptions, projects them into high-dimensional vector spaces using embedding models, and executes structured multi-agent reasoning chains via LangGraph to output matching scores, key competency gaps, and alignment rationales.",
    architectureSlug: "smartcv",
    techStack: [
      { name: "Python", color: "#3572A5" },
      { name: "LangGraph", color: "#6366f1" },
      { name: "FastAPI", color: "#009688" },
      { name: "FAISS", color: "#8b5cf6" },
      { name: "Gemini LLM", color: "#f59e0b" },
      { name: "Streamlit", color: "#ef4444" }
    ],
    challenges: [
      "Varying resume formats (PDF structures, single vs. multi-column layouts, tables) caused text extraction tools to output jumbled tokens.",
      "LangGraph evaluation agents would occasionally enter recursive loop halts when evaluating highly ambiguous resume profiles."
    ],
    learnings: [
      "Engineered a dual-stage text parser: raw layout block ordering followed by LLM parsing into standardized JSON schemas.",
      "Configured strict recursion limits (max 3 cycles) and explicit transition states in agent graphs to prevent execution halts."
    ],
    githubUrl: "https://github.com/Ronit-019/SmartCV",
    futureRoadmap: [
      "Integrate automatic PDF generation to suggest layout repairs.",
      "Implement a voice-activated interview mock simulator for matched skills.",
      "Add support for multiple concurrent document comparison matrices."
    ]
  },
  {
    slug: "data-science-copilot",
    title: "Data Science Copilot",
    tagline: "An automated exploratory analysis tool generating custom Scikit-Learn training pipelines.",
    problem: "Data scientists waste hours writing boilerplate scripts for exploratory data analysis (EDA), cleaning null cells, encoding categories, and testing standard model architectures.",
    solution: "An interactive Streamlit assistant that ingests CSV/Excel files, automatically generates comprehensive statistical summaries and heatmaps, and writes custom, runnable Scikit-Learn Python pipelines matching natural language requests.",
    architectureSlug: "data-science-copilot",
    techStack: [
      { name: "Python", color: "#3572A5" },
      { name: "Pandas", color: "#15045C" },
      { name: "Scikit-Learn", color: "#F7931E" },
      { name: "Streamlit", color: "#ef4444" },
      { name: "OpenAI GPT", color: "#10a37f" }
    ],
    challenges: [
      "Uploading large datasets (100MB+) exceeded prompt context windows and caused significant latency during API queries.",
      "Ensuring generated code runs perfectly without throwing variable naming compilation exceptions in Python."
    ],
    learnings: [
      "Developed a metadata extraction filter that only passes structural summaries (types, nulls, correlation highlights) to the LLM.",
      "Constructed strict prompt parsing templates enforcing structured schemas (forcing code blocks inside specific wrapper boundaries)."
    ],
    githubUrl: "https://github.com/Ronit-019/Data-Science-Copilot",
    futureRoadmap: [
      "Support training models using cloud BigQuery ML datasets directly.",
      "Integrate automated hyperparameter tuning via Optuna generation.",
      "Add interactive model interpretability widgets (SHAP, LIME)."
    ]
  },
  {
    slug: "real-estate-recommender",
    title: "Real Estate Recommender",
    tagline: "Housing pricing prediction models and transit commute recommender systems deployed on GCP.",
    problem: "Home buyers evaluate listings solely on price tags, ignoring proximity parameters, regional school ratings, and transit options. Meanwhile, pricing models lack transparency.",
    solution: "A machine learning pricing estimator that evaluates properties based on physical attributes and geo-coordinates, outputting SHAP importance charts and recommender matches with similar commute scores.",
    architectureSlug: "real-estate-recommender",
    techStack: [
      { name: "Python", color: "#3572A5" },
      { name: "XGBoost", color: "#22c55e" },
      { name: "FastAPI", color: "#009688" },
      { name: "GCP (App Engine)", color: "#4285F4" },
      { name: "SHAP", color: "#8b5cf6" }
    ],
    challenges: [
      "High percentages of missing variables (e.g. year built) in raw housing records caused traditional regression models to output skewed forecasts.",
      "Recruiters/Users ignored prediction estimates when presented as flat numbers without underlying explanations."
    ],
    learnings: [
      "Implemented a KNN Imputation pipeline prior to training, reducing testing Mean Absolute Error (MAE) by 8.4%.",
      "Integrated SHAP (Shapley Additive exPlanations) charts in the front-end to dynamically explain how each feature impacted the price."
    ],
    githubUrl: "https://github.com/Ronit-019/Real-Estate-Recommender",
    futureRoadmap: [
      "Configure automated scraping cron jobs for real-time listing updates.",
      "Deploy models on Vertex AI endpoints for model scaling.",
      "Add user search history tracking to personalize recommendation feeds."
    ]
  },
  {
    slug: "agentic-analytics",
    title: "Agentic Analytics Dashboard",
    tagline: "A Datadog-style monitoring room demonstrating ML forecasting and AI root cause diagnosis.",
    problem: "Traditional analytics dashboards trigger static alarms that engineers ignore due to alert fatigue. When alerts trigger, finding root causes requires manual, complex query triage.",
    solution: "A live-simulated monitoring panel integrating BigQuery ML revenue forecasting with a Gemini diagnostics agent. When anomalies exceed dynamic thresholds, the agent investigates system logs and recommends specific fixes.",
    architectureSlug: "analytics-agent",
    techStack: [
      { name: "Next.js", color: "#000000" },
      { name: "React", color: "#61DAFB" },
      { name: "Recharts", color: "#ef4444" },
      { name: "Tailwind CSS", color: "#38B2AC" },
      { name: "Gemini API", color: "#f59e0b" }
    ],
    challenges: [
      "Handling real-time drawing of forecast envelopes and anomaly dot markers cleanly in responsive web interfaces.",
      "Simulating terminal telemetry logs and diagnostic pipelines dynamically on the client side during investigations."
    ],
    learnings: [
      "Customized Recharts ComposedChart structures utilizing standard range Area rendering to shade deviation envelopes.",
      "Built stateful terminal simulators in React that stagger logging loops to replicate multi-agent execution steps."
    ],
    githubUrl: "https://github.com/Ronit-019/Portfolio",
    futureRoadmap: [
      "Connect live telemetry logs via WebSockets.",
      "Support custom metric threshold creations from UI command palette.",
      "Integrate automated PagerDuty SMS alert dispatches."
    ]
  }
];
