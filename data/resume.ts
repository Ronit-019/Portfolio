export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  contributions: string[];
}

export interface ResumeProject {
  title: string;
  slug: string;
  summary: string;
}

export interface SkillSet {
  languages: string[];
  frameworks: string[];
  cloud: string[];
  tools: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface ResumeData {
  experience: WorkExperience[];
  projects: ResumeProject[];
  skills: SkillSet;
  certifications: Certification[];
}

export const RESUME_DATA: ResumeData = {
  experience: [
    {
      company: "Tatvic Analytics",
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
      title: "Real Estate Recommender",
      slug: "real-estate-recommender",
      summary: "Housing pricing XGBoost prediction model and geographic transit recommender systems deployed on GCP."
    },
    {
      title: "GA4 Anomaly Intelligence Platform",
      slug: "ga4-anomaly-intelligence",
      summary: "Serverless GA4 event anomaly pipeline utilizing BigQuery ML forecasting, Cloud Run, and Gemini validation."
    },
    {
      title: "Statistical Analysis Assistant",
      slug: "statistical-analysis-assistant",
      summary: "Dual-engine AI analytics co-pilot routing queries to either a LangGraph BigQuery SQL agent or direct GA4 API reporting funnels."
    },
    {
      title: "IPL Web Analysis (2008-2024)",
      slug: "ipl-web-analysis",
      summary: "Multi-page Streamlit analytics dashboard using Pandas to process, filter, and aggregate 17 seasons of IPL matches."
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
