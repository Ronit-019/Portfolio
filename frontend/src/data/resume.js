export const RESUME_DATA = {
  profile: {
    name: "Ronit Rajput",
    title: "Data Scientist · Analytics Engineering · Python & ML",
    summary:
      "Data scientist with 6 months of production experience at Tatvic Analytics building BigQuery ML forecasting models, anomaly detection systems, and an Agentic AI platform for enterprise analytics automation. Skilled in Python, GA4, BigQuery, and Google Cloud. B.Tech in ICT from Adani University (8.67 CGPA).",
  },
  experience: [
    {
      company: "Tatvic Digital Analytics Pvt. Ltd., Ahmedabad",
      role: "Technical Trainee",
      duration: "Jan 2026 – Jul 2026",
      projects: [
        {
          name: "GA4 Anomaly Detection Platform",
          contributions: [
            "Trained ARIMA_PLUS models in BigQuery ML on 3 KPIs (revenue, conversions, engagement); achieved 90%+ detection accuracy on historical validation data.",
            "Cut false-positive alert volume by ~75% by routing flagged anomalies through a Vertex AI Gemini validation layer before dispatch.",
            "Deployed the full nightly pipeline on Cloud Scheduler + Cloud Run with zero persistent compute cost; containerized Flask microservice scales to zero between runs.",
          ],
        },
        {
          name: "Statistical Analysis Assistant — Agentic Analytics Automation",
          contributions: [
            "Architected an agentic AI system to automate 13 recurring analysis types, targeting a reduction in analyst time-per-deliverable from 2–6 hrs to under 30 min.",
            "Built LangGraph orchestration on Cloud Run with state checkpoints, parallel skill execution, and a human-in-the-loop review gate before client output is released.",
            "Delivered functional prototypes for funnel drop-off and user persona skills with PPTX/XLSX output.",
          ],
        },
        {
          name: "E-Commerce Analytics System (Bounty Project)",
          contributions: [
            "Built end-to-end GA4 + BigQuery stack for a dual-surface (web + Android) e-commerce business event schema, Server-Side GTM, BigQuery aggregation models, and a Looker Studio business dashboard.",
          ],
        },
      ],
    },
  ],
  projects: [
    {
      title: "Real Estate ML Decision Support System",
      slug: "real-estate-recommender",
      tech: ["Python", "Scikit-learn", "Streamlit", "BeautifulSoup"],
      duration: "Jun–Jul 2025",
      summary:
        "Scraped 30,000+ listings; trained Random Forest & SVM models at 80%+ accuracy; deployed as a fully interactive Streamlit app with prediction, recommendation, and market insight modules.",
    },
    {
      title: "IPL Data Analysis Dashboard",
      slug: "ipl-web-analysis",
      tech: ["Python", "Pandas", "Streamlit"],
      duration: "Mar 2025",
      summary:
        "Analyzed 17 IPL seasons (~260K records); built Streamlit dashboard with 20+ interactive charts on team wins, player performance, and match outcomes.",
    },
    {
      title: "GA4 Anomaly Intelligence Platform",
      slug: "ga4-anomaly-intelligence",
      tech: ["BigQuery ML", "Cloud Run", "Vertex AI"],
      duration: "Jan–Jul 2026",
      summary:
        "Serverless GA4 event anomaly pipeline utilizing BigQuery ML ARIMA+ forecasting, Cloud Scheduler, Cloud Run, and Gemini validation layer.",
    },
    {
      title: "EdTech Analytics Dashboard",
      slug: "statistical-analysis-assistant",
      tech: ["Power BI", "Power Query", "DAX"],
      duration: "May 2025",
      summary:
        "Modeled 8,000+ course records; built dynamic regional filters and surfaced content strategy insights across instructor and enrollment dimensions.",
    },
  ],
  skills: {
    languages: ["Python", "SQL (BigQuery Standard SQL)"],
    ml: [
      "Scikit-learn", "ARIMA_PLUS (BigQuery ML)", "scipy", "statsmodels",
      "pandas", "NumPy", "Random Forest", "SVM", "k-means", "DBSCAN",
    ],
    cloud: [
      "GCP — BigQuery", "Cloud Run", "Cloud Scheduler", "Vertex AI", "IAM",
      "Terraform", "GA4", "GTM", "GA4 Data API", "Looker Studio",
    ],
    ai: ["LangGraph", "LLM Gateway design", "Vertex AI Gemini", "Prompt Engineering"],
    viz: ["python-pptx", "openpyxl", "Streamlit", "Power BI", "Matplotlib", "Seaborn", "Plotly"],
  },
  education: [
    {
      degree: "B.Tech — Information & Communication Technology",
      institution: "Adani University, Ahmedabad",
      duration: "2022–2026",
      score: "8.67 CGPA",
    },
    {
      degree: "HSC — Class 12 (Science)",
      institution: "Vijaynagar Higher Secondary English School",
      duration: "2022",
      score: "73%",
    },
    {
      degree: "SSC — Class 10",
      institution: "Vijaynagar Higher Secondary English School",
      duration: "2020",
      score: "83%",
    },
  ],
  certifications: [
    {
      name: "Google Analytics 4 Certification",
      issuer: "Google Skillshop",
      date: "2026",
      url: "https://skillshop.google.com",
    },
    {
      name: "Python Certificate of Accomplishment",
      issuer: "HackerRank",
      date: "May 2025",
      url: "https://hackerrank.com",
    },
    {
      name: "Data Science Mentorship Program — Diploma in Python",
      issuer: "CampusX / CDAC",
      date: "Jan 2023",
      url: "https://campusx.in",
    },
    {
      name: "Certificate of Appreciation — Tic-Tac-Toe Hackathon 2025",
      issuer: "IEEE Student Branch, DA-IICT",
      date: "2025",
      url: "#",
    },
  ],
};
