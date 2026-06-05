export const RESUME_DATA = {
  experience: [
    {
      company: "Future Analytics (Simulated)",
      role: "Data Engineering & ML Intern",
      duration: "June 2025 – August 2025",
      contributions: [
        "Developed an automated business monitoring dashboard integrating BigQuery ML forecasting (ARIMA+) and anomaly alerts.",
        "Engineered an LLM-validation layer utilizing Gemini API to filter out statistcal alert noise, reducing false positives by 75%.",
        "Optimized ETL data pipelines, reducing aggregate query execution latencies for marketing dashboards by 40%.",
        "Documented pipeline schemas, connection pools, and containerized deployment parameters for team handoff."
      ]
    }
  ],
  projects: [
    {
      title: "SmartCV Resume Matcher",
      slug: "smartcv",
      summary: "AI-powered resume evaluation engine using LangGraph, FAISS vector search, and Gemini API to critique skill fits."
    },
    {
      title: "Data Science Copilot",
      command: "ds-copilot",
      slug: "data-science-copilot",
      summary: "Exploratory data analysis assistant translating conversational queries into runnable Python Scikit-Learn pipelines."
    },
    {
      title: "Real Estate Recommender",
      slug: "real-estate-recommender",
      summary: "Housing pricing XGBoost prediction model and geographic transit recommender systems deployed on GCP."
    },
    {
      title: "Agentic Analytics Dashboard",
      slug: "agentic-analytics",
      summary: "Live-telemetry DevOps monitoring dashboard integrating BigQuery predictions and root cause console diagnostics."
    }
  ],
  skills: {
    languages: ["Python (Advanced)", "SQL (BigQuery, PostgreSQL)", "TypeScript", "JavaScript", "HTML5", "CSS3"],
    frameworks: ["Next.js", "React", "FastAPI", "Streamlit", "LangGraph", "LangChain", "Scikit-Learn", "Pandas", "NumPy"],
    cloud: ["Google Cloud Platform (GCP)", "BigQuery ML", "Vertex AI (Exposure)", "Vercel"],
    tools: ["Git", "GitHub", "Docker", "FAISS", "Pinecone", "VS Code", "Terminal"]
  },
  certifications: [
    {
      name: "Google Cloud Certified: Associate Cloud Engineer",
      issuer: "Google Cloud",
      date: "Dec 2024",
      credentialId: "GCP-ACE-18290",
      url: "https://google.com/certification"
    },
    {
      name: "LangChain for LLM Application Development",
      issuer: "DeepLearning.AI",
      date: "Mar 2025",
      url: "https://deeplearning.ai"
    },
    {
      name: "Python for Data Science and Machine Learning",
      issuer: "Udemy",
      date: "Aug 2023",
      credentialId: "UC-87190",
      url: "https://udemy.com"
    }
  ]
};
