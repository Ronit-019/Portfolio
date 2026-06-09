export const PROJECTS_DATA = [
  {
    slug: "real-estate-recommender",
    type: "personal",
    title: "Real Estate Decision Support System",
    tagline: "An interactive, end-to-end data analytics and machine learning platform designed to analyze market trends, predict property prices, classify listings, and recommend properties.",
    problem: "Real estate decisions (buying, selling, investing) are complex, opaque, and often lack data-driven backing. Investors and buyers struggle to estimate fair property values, analyze local market dynamics, compare features, or get personalized property recommendations based on specific criteria.",
    solution: "Developed a comprehensive web application using Streamlit that processes a large Indian real estate dataset. The solution includes interactive Plotly visualization dashboards, a Random Forest Regressor for price predictions, an interactive feature importance generator, a Random Forest Classifier to categorize listings into price tiers, and a k-Nearest Neighbors (k-NN) content-based recommender system.",
    architectureSlug: "real-estate-recommender",
    techStack: [
      { name: "Python", color: "#3572A5" },
      { name: "Streamlit", color: "#ef4444" },
      { name: "Pandas", color: "#15045C" },
      { name: "Scikit-Learn", color: "#F7931E" },
      { name: "Plotly", color: "#3F4F75" }
    ],
    challenges: [
      "Ensuring feature consistency between offline model training and online predictions. Real estate characteristics (localities, regions, facing directions) are high-cardinality categorical inputs.",
      "High computational latency when training machine learning models on-the-fly in a Streamlit application (e.g., training Random Forest models for dynamic feature importance and classification reports).",
      "Recommendation latency and accuracy over highly diverse and custom user filters."
    ],
    learnings: [
      "Serialized the trained Random Forest model (random_forest_model.pkl), feature column list (feature_columns.pkl), and scaling parameters (scaler.pkl) via Pickle. Reconstructed categorical inputs in Streamlit to match the precise serialized feature schema.",
      "Implemented Streamlit caching mechanisms (@st.cache_data and @st.cache_resource) to pre-process and load data conditionally, caching custom classifier and regressor fits based on selected features.",
      "Developed a localized recommendation strategy that narrows search space to user's selected locality, constructs a subset feature vector dynamically, and calculates nearest neighbors using an optimized k-NN model."
    ],
    githubUrl: "https://github.com/Ronit-019/Real-Estate-Decision-Support-System",
    futureRoadmap: [
      "Integrate Mapbox API to display interactive geographical views and physical property sites directly on local maps.",
      "Automate daily/weekly data scraping from leading real estate portals to keep dataset and model predictions updated in real-time.",
      "Implement deep neural networks for price predictions and hybrid recommenders incorporating collaborative user filtering."
    ]
  },
  {
    slug: "ga4-anomaly-intelligence",
    type: "internship",
    title: "GA4 Anomaly Intelligence Platform",
    tagline: "A fully automated, production-grade GA4 anomaly detection pipeline using BigQuery ML, ARIMA forecasting, LLM-based contextual validation, and Cloud Run orchestration to deliver business-critical alerts via email.",
    problem: "Manually monitoring Google Analytics 4 event streams for anomalies is slow, error-prone, and produces too many false positives — traditional threshold rules cannot adapt to seasonality, weekly patterns, or holiday effects, causing alert fatigue and missed real incidents.",
    solution: "A serverless, end-to-end analytics pipeline built entirely on Google Cloud: BigQuery Scheduled Queries aggregate synthetic GA4 events daily, ARIMA_PLUS models forecast expected behavior per metric, a dual-signal anomaly engine classifies deviations statistically, a Flask-based Context Agent deployed on Cloud Run calls Vertex AI Gemini to validate anomalies against active campaigns/news context, and Google Apps Script delivers email alerts.",
    architectureSlug: "ga4-anomaly",
    techStack: [
      { name: "Python", color: "#3572A5" },
      { name: "Google BigQuery", color: "#4285F4" },
      { name: "Vertex AI", color: "#4285F4" },
      { name: "Google Cloud Run", color: "#4285F4" },
      { name: "Google Apps Script", color: "#34A853" },
      { name: "Flask", color: "#000000" }
    ],
    challenges: [
      "ARIMA_PLUS models require long continuous time series (9-12 months), but a live GA4 production export was not available at development time.",
      "BigQuery streaming inserts caused date serialization errors, table truncation conflicts, and streaming buffer conflicts when the Context Agent tried to write contextualized rows.",
      "Naively applying uniform anomaly thresholds across all metrics caused excessive false positives on revenue metrics which are inherently spiky due to promotions and bulk orders.",
      "Scheduling all BigQuery stages in UTC while the business operates in IST caused partial-day data processing and false anomaly drops during early-morning UTC runs.",
      "Uncontrolled alerting for every statistical anomaly caused alert fatigue — low-impact or repeated anomalies were drowning out genuinely critical incidents."
    ],
    learnings: [
      "Built a fully synthetic GA4 data generation framework in BigQuery SQL simulating realistic distributions, weekly seasonality multipliers, holiday effects, and probabilistic anomaly injection while keeping schema compatibility.",
      "Replaced streaming inserts with atomic batch load jobs using bq.load_table_from_json() with WRITE_APPEND disposition, ensuring reliable, conflict-free batch insertion regardless of table state.",
      "Implemented metric-specific anomaly probability thresholds (0.97 for traffic/engagement, 0.99 for revenue) combined with a dual-signal decision requiring both prediction interval breach and ML.DETECT_ANOMALIES confirmation.",
      "Enforced a strict 'process yesterday' principle using DATE_SUB(CURRENT_DATE('Asia/Kolkata'), INTERVAL 1 DAY) in every pipeline stage, fully decoupling execution time from business date logic.",
      "Built a dedicated alert eligibility and suppression layer that gates alerts on severity/impact levels, suppresses repeated alerts, enforces business hours for non-critical alerts, and assigns priorities."
    ],
    futureRoadmap: [
      "Expand LLM context validation to include social media trend signals and competitor pricing data as context sources.",
      "Build a real-time monitoring dashboard in Looker Studio fed directly from the contextualized anomaly table.",
      "Add support for multi-property GA4 pipelines with per-client routing logic in the email payload view.",
      "Integrate root-cause correlation analysis across multiple metrics.",
      "Replace Apps Script delivery with a Pub/Sub + Cloud Functions pipeline supporting Slack and PagerDuty notifications."
    ]
  },
  {
    slug: "statistical-analysis-assistant",
    type: "internship",
    title: "Statistical Analysis Assistant",
    tagline: "A dual-engine AI analytics co-pilot that routes natural language questions to either a LangGraph-powered BigQuery SQL agent or a direct GA4 Reporting API pipeline, delivering Gemini-synthesized insights and auto-exported client presentations.",
    problem: "DA&I analysts spent hours writing complex, deeply nested BigQuery SQL for GA4 event schemas (UNNEST, window functions, QUALIFY clauses), while standard direct API reporting couldn't handle custom multi-touch attribution — and no single tool bridged both paths via a plain-English interface.",
    solution: "A FastAPI + React platform that intelligently routes each request: complex custom queries go to a self-correcting LangGraph ReAct agent (Gemini 2.5 Pro) that generates date-partitioned SQL, runs a dry-run for GCP cost estimation, and asks for user consent before executing against BigQuery; standard metric requests bypass BigQuery entirely and go through a sequential 8-stage Direct GA4 API pipeline (Gemini 2.0 Flash) with self-healing schema validation. Both tracks synthesize results into Gemini-powered narrative insights and export client-ready PPTX/PDF slide decks automatically.",
    architectureSlug: "statistical-analysis-assistant",
    techStack: [
      { name: "Python", color: "#3572A5" },
      { name: "FastAPI", color: "#009688" },
      { name: "React", color: "#61DAFB" },
      { name: "Google BigQuery", color: "#4285F4" },
      { name: "GA4 API", color: "#E37400" },
      { name: "LangGraph", color: "#000000" }
    ],
    challenges: [
      "GA4 BigQuery schemas use deeply nested repeated records — standard UNNEST queries scanned hundreds of gigabytes unnecessarily, producing massive unexpected GCP billing spikes.",
      "Gemini 2.5 Pro outputs long internal thinking chain blocks before producing the final SQL, which broke string parsers trying to extract the executable query.",
      "The GA4 Direct API's Alpha endpoint for sequential funnel reports uses complex dimension filtering structures that are completely different from standard Beta report requests.",
      "User synonym terms (e.g. 'bounced users', 'drop-off rate') didn't map to valid GA4 API dimension or metric names, causing repeated API failures during query building.",
      "Onboarding a new BigQuery client required manually discovering their custom event parameters and schema structure, which was slow and error-prone."
    ],
    learnings: [
      "Built an intelligent dual-routing framework that sends all standard metric requests directly to the GA4 Reporting API (zero scanned bytes) and reserves BigQuery only for heavy custom computations that genuinely require raw event-level access. Added dry-run cost estimation gates.",
      "Upgraded the extraction logic with a thinking-aware regex that strips structural thinking tags before attempting to parse the final executable SQL block.",
      "Built a dedicated ga4_api_service.py that directly implements AlphaAnalyticsDataAsyncClient structures to compile and execute closed and open sequential funnels natively against the Alpha endpoint.",
      "Built an offline JSON metadata catalog (property_{property_id}.json) per client that maps conversational synonyms to official GA4 API names. A Gemini-powered self-correction retry handles any remaining mismatches.",
      "Built an auto-discovery endpoint (/discover) that samples the client's sharded events_YYYYMMDD tables to automatically identify active custom dimensions, caching the result as a local JSON file."
    ],
    futureRoadmap: [
      "Multi-cloud schema support for Snowflake and Amazon Redshift GA4 exports.",
      "Continuous dashboard streaming via BigQuery Continuous Queries.",
      "Localized Python regression-based ML attribution models for multi-touch analysis.",
      "Automated midnight cron job on Cloud Run to refresh local schema JSON catalogs.",
      "Migration of user credentials from hardcoded role arrays to a Cloud SQL PostgreSQL instance."
    ]
  },
  {
    slug: "ipl-web-analysis",
    type: "personal",
    title: "IPL Web Analysis (2008-2024)",
    tagline: "An interactive, multi-page Streamlit dashboard providing in-depth analysis of IPL team performance, player statistics, and head-to-head match dynamics from 2008 to 2024.",
    problem: "Cricket fans, analysts, and sports enthusiasts lack a unified, interactive platform to explore 17 seasons of historical IPL statistics. Navigating raw, multi-million-row ball-by-ball delivery datasets and match-level records to extract insights on team tallies, player performance, and player matchups is slow and complex without specialized data processing.",
    solution: "Developed a multi-page Streamlit application powered by Pandas and custom visualization modules. The application processes and cleans large-scale match and ball-by-ball delivery datasets, presenting key metrics (runs, strike rates, economy rates) through a clean web UI with decoupled analysis tabs for batting, bowling, head-to-head records, and team stats.",
    architectureSlug: "ipl-web-analysis",
    techStack: [
      { name: "Python", color: "#3572A5" },
      { name: "Streamlit", color: "#ef4444" },
      { name: "Pandas", color: "#15045C" },
      { name: "Plotly", color: "#3F4F75" }
    ],
    challenges: [
      "Processing millions of rows in the ball-by-ball delivery dataset led to high memory footprint and CPU processing latency in the Streamlit application.",
      "Outlier statistics skewing performance lists (e.g., a batsman with 1 face and 6 runs showing a 600% strike rate, or a bowler with 1 ball and 0 runs showing 0.00 economy rate).",
      "Complex table joins and merges between the match metadata tables and individual delivery records for head-to-head matchup calculations."
    ],
    learnings: [
      "Implemented optimized Pandas aggregation pipelines using groupby pre-filtering and lazy loading category details to minimize memory utilization during execution.",
      "Designed and enforced strict minimum eligibility thresholds (e.g., minimum 100 runs for batsmen and 120 balls bowled for bowlers) to eliminate outlier spikes and maintain analytical integrity.",
      "Engineered a decoupled Python-based module system that extracts, pre-processes, and merges datasets before feeding clean summary tables into the Streamlit presentation layer."
    ],
    githubUrl: "https://github.com/Ronit-019/IPL-2008-2024-Web-Analysis",
    futureRoadmap: [
      "Implement machine learning models to predict live first-innings scores and second-innings match win-probabilities.",
      "Integrate live scraping scripts to auto-refresh statistics at the end of each ongoing match.",
      "Add predictive player recommendations using k-NN for franchise auction planning."
    ]
  }
];
