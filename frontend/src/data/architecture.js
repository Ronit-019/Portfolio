export const ARCHITECTURE_DATA = [
  {
    slug: "finance-intelligence-mcp",
    title: "Finance Intelligence MCP Server: System Architecture",
    description: "Local-first MCP server architecture connecting AI clients to a private PostgreSQL finance database via stdio protocol with headless chart generation.",
    figmaUrl: null,
    nodes: [
      {
        id: "client",
        label: "MCP Client (Claude / Cursor)",
        type: "input",
        position: { x: 50, y: 150 },
        meta: {
          purpose: "AI assistant host that invokes MCP tools via natural language queries.",
          input: "User natural language prompts",
          output: "Tool calls with typed parameters",
          limitations: "Context window limits restrict maximum payload size per tool call.",
        },
      },
      {
        id: "stdio",
        label: "stdio Transport Layer",
        type: "default",
        position: { x: 250, y: 150 },
        meta: {
          purpose: "Secures the JSON-RPC communication channel between the MCP host and server process over standard input/output.",
          input: "JSON-RPC 2.0 tool call requests",
          output: "Structured JSON tool responses",
          limitations: "Requires the server process to remain alive; crashes terminate the connection.",
        },
      },
      {
        id: "fastmcp",
        label: "FastMCP Server (main.py)",
        type: "default",
        position: { x: 450, y: 80 },
        meta: {
          purpose: "Exposes 12 typed Python functions as MCP tools automatically via type-hint schema generation.",
          input: "Validated tool call parameters",
          output: "Structured JSON responses or file paths",
          limitations: "Single-process; computationally heavy tools block the event loop.",
        },
      },
      {
        id: "health",
        label: "6-KPI Health Scoring Engine",
        type: "default",
        position: { x: 450, y: 220 },
        meta: {
          purpose: "Deterministic scoring engine computing budget adherence, MoM stability (CV), savings rate, category balance, large transaction ratio, and spending trend.",
          input: "Aggregated expense queries from PostgreSQL",
          output: "Numerical score + letter grade + structured facts",
          limitations: "Score weights are static; requires manual recalibration for different spending profiles.",
        },
      },
      {
        id: "asyncpg",
        label: "asyncpg Connection Pool",
        type: "default",
        position: { x: 650, y: 80 },
        meta: {
          purpose: "Manages an asynchronous PostgreSQL connection pool for concurrent non-blocking database queries.",
          input: "SQL queries from FastMCP tool handlers",
          output: "Query results as Python data structures",
          limitations: "Pool size must be tuned to database connection limits.",
        },
      },
      {
        id: "matplotlib",
        label: "Headless Matplotlib (Agg Backend)",
        type: "default",
        position: { x: 650, y: 220 },
        meta: {
          purpose: "Renders spending trend charts entirely in memory using the non-interactive Agg backend, saving output to disk as PNG.",
          input: "Aggregated time-series expense data",
          output: "expense_analysis.png saved to local disk",
          limitations: "No real-time interactive charts; static image only.",
        },
      },
      {
        id: "postgres",
        label: "PostgreSQL Database",
        type: "output",
        position: { x: 850, y: 150 },
        meta: {
          purpose: "Stores all expense records, budget configurations, and category mappings in a private local or cloud-hosted PostgreSQL instance.",
          input: "SQL INSERT / SELECT / UPDATE from asyncpg",
          output: "Persisted financial records",
          limitations: "Requires a running PostgreSQL instance (Supabase, AWS RDS, or local).",
        },
      },
    ],
    edges: [
      { id: "e-client-stdio", source: "client", target: "stdio", animated: true, label: "JSON-RPC Calls" },
      { id: "e-stdio-fastmcp", source: "stdio", target: "fastmcp", animated: true, label: "Route Tool Call" },
      { id: "e-fastmcp-health", source: "fastmcp", target: "health", animated: true, label: "Score Request" },
      { id: "e-fastmcp-asyncpg", source: "fastmcp", target: "asyncpg", animated: true, label: "DB Query" },
      { id: "e-fastmcp-matplotlib", source: "fastmcp", target: "matplotlib", animated: true, label: "Chart Request" },
      { id: "e-asyncpg-postgres", source: "asyncpg", target: "postgres", animated: false, label: "SQL" },
      { id: "e-health-asyncpg", source: "health", target: "asyncpg", animated: false, label: "Aggregate Query" },
    ],
    lessons: {
      whyThisDesign: "FastMCP was chosen to automatically expose type-hinted Python functions as JSON-RPC compliant schemas to the MCP host without writing manual protocol boilerplate, dramatically reducing the surface area for bugs.",
      whatFailed: "Synchronous database drivers blocked the stdio connection stream under rapid, multi-threaded LLM queries, causing tool timeouts and connection drops when the AI assistant called multiple tools in rapid succession.",
      whatChanged: "Migrated all storage engine queries to use an asynchronous connection pool with asyncpg, handling concurrency gracefully and keeping the stdio stream unblocked during heavy database operations.",
    },
  },
  {
    slug: "job-intelligence-engine",
    title: "Job Intelligence Engine: System Architecture",
    description: "Automated multi-company job scraping pipeline with SPA-aware browser automation, dual-layer HTML cleaning, LLM extraction, and audit-trail PostgreSQL persistence.",
    figmaUrl: null,
    nodes: [
      {
        id: "gsheets",
        label: "Google Sheets (Company Targets)",
        type: "input",
        position: { x: 50, y: 150 },
        meta: {
          purpose: "Source of truth for which companies and career URLs to scrape, managed via OAuth service account with gspread.",
          input: "Manual entries by the user",
          output: "List of CompanyTarget objects",
          limitations: "Requires a valid Google service account JSON key for OAuth access.",
        },
      },
      {
        id: "sync",
        label: "CompanySyncService",
        type: "default",
        position: { x: 220, y: 150 },
        meta: {
          purpose: "Reads company targets from Google Sheets and upserts them into the PostgreSQL companies table.",
          input: "Google Sheets rows",
          output: "Synced company records in Postgres",
          limitations: "Overwrites company metadata on every sync cycle.",
        },
      },
      {
        id: "runner",
        label: "CompanyRunner",
        type: "default",
        position: { x: 390, y: 150 },
        meta: {
          purpose: "Orchestrates the per-company pipeline: fetches active companies from the DB and invokes the scraping → extraction → persistence chain.",
          input: "Active company records from Postgres",
          output: "Structured job listings",
          limitations: "Sequential processing; one company at a time in current version.",
        },
      },
      {
        id: "playwright",
        label: "Playwright HTMLFetcher",
        type: "default",
        position: { x: 560, y: 80 },
        meta: {
          purpose: "Launches a headless Chromium browser, navigates to the career URL, waits 5000ms for SPA hydration, then extracts the fully-rendered page HTML.",
          input: "Career page URL",
          output: "Raw fully-rendered HTML string",
          limitations: "5s wait is static; highly dynamic pages may need longer waits.",
        },
      },
      {
        id: "cleaner",
        label: "HTMLCleaner + CandidateChunkFilter",
        type: "default",
        position: { x: 560, y: 220 },
        meta: {
          purpose: "Strips noise-only HTML nodes (scripts, styles, SVGs), converts to Markdown, then filters out non-recruitment text blocks, reducing token size by 80%+.",
          input: "Raw HTML string",
          output: "Clean, token-efficient markdown",
          limitations: "Keyword filter may discard relevant text if companies use non-standard recruitment language.",
        },
      },
      {
        id: "groq",
        label: "Groq LLM Extractor (Qwen 3 32B)",
        type: "default",
        position: { x: 730, y: 150 },
        meta: {
          purpose: "Sends cleaned markdown to Groq's Qwen 3 32B model with a structured extraction prompt, receiving a JSON array of job listings.",
          input: "Cleaned markdown content",
          output: "JSON array of structured job objects",
          limitations: "API rate limits apply; JSON extraction uses a custom regex parser to handle LLM markdown wrapping.",
        },
      },
      {
        id: "repo",
        label: "JobRepository (UPSERT + ChangeDetector)",
        type: "default",
        position: { x: 900, y: 80 },
        meta: {
          purpose: "Persists extracted jobs via UPSERT on company_id + job_url. ChangeDetector compares fields and writes field-level diffs to the job_history audit table.",
          input: "Validated Pydantic job models",
          output: "Persisted jobs + change history records",
          limitations: "Field-level diff detection requires strict schema consistency between scrape cycles.",
        },
      },
      {
        id: "postgres",
        label: "PostgreSQL Database",
        type: "output",
        position: { x: 900, y: 220 },
        meta: {
          purpose: "Stores company targets, structured job listings, and field-level job_history change audit records.",
          input: "SQL from JobRepository and CompanySyncService",
          output: "Persisted relational data",
          limitations: "Requires psycopg_pool connection limits tuned to DB server capacity.",
        },
      },
    ],
    edges: [
      { id: "e-gsheets-sync", source: "gsheets", target: "sync", animated: true, label: "OAuth Pull" },
      { id: "e-sync-postgres", source: "sync", target: "postgres", animated: false, label: "Upsert Companies" },
      { id: "e-postgres-runner", source: "postgres", target: "runner", animated: true, label: "Load Active Companies" },
      { id: "e-runner-playwright", source: "runner", target: "playwright", animated: true, label: "Fetch Page" },
      { id: "e-runner-cleaner", source: "runner", target: "cleaner", animated: true, label: "Clean HTML" },
      { id: "e-playwright-cleaner", source: "playwright", target: "cleaner", animated: false, label: "Raw HTML" },
      { id: "e-cleaner-groq", source: "cleaner", target: "groq", animated: true, label: "Cleaned Markdown" },
      { id: "e-groq-repo", source: "groq", target: "repo", animated: true, label: "Structured Jobs JSON" },
      { id: "e-repo-postgres", source: "repo", target: "postgres", animated: false, label: "UPSERT + Diff" },
    ],
    lessons: {
      whyThisDesign: "Dividing scraping, cleaning, extraction, and persistence into isolated layers ensures that changes to scrapers or LLM prompts don't cascade failures into the database layer. Each stage has a single clear responsibility.",
      whatFailed: "Standard synchronous HTTP requests failed to fetch jobs on React/hydration-heavy corporate pages, yielding blank HTML with zero job listings despite returning a 200 status code.",
      whatChanged: "Swapped the HTTP client fetcher for a dynamic headless Playwright engine, allowing each career page to fully render client-side JavaScript in memory before the HTML snapshot is taken for processing.",
    },
  },
  {
    slug: "ga4-anomaly",
    title: "GA4 Anomaly Intelligence Platform Architecture",
    description: "Serverless GA4 event stream anomaly pipeline with statistical forecasts and LLM context checks.",
    figmaUrl: "https://www.figma.com/make/axaYwz06joMUjzlgBGkaFb/GA4-Anomaly-Intelligence-Platform-%E2%80%94-System-Architecture?fullscreen=1&t=WjEZfSx1J6YLubWY-1&code-node-id=0-9",
    nodes: [
      {
        id: "gen",
        label: "Synthetic GA4 Event Gen",
        type: "input",
        position: { x: 50, y: 120 },
        meta: {
          purpose: "Simulates daily user traffic/purchase events with seasonal and holiday multipliers.",
          input: "None (BigQuery Scheduled Query)",
          output: "ga4SampleData_live event tables",
          limitations: "Synthetic model, requires manual parameter tuning to simulate new event types."
        }
      },
      {
        id: "inj",
        label: "Anomaly Injector",
        type: "input",
        position: { x: 50, y: 240 },
        meta: {
          purpose: "Randomly injects anomalies (e.g., Diwali spikes, search drops) for testing pipeline detection.",
          input: "None (BigQuery Scheduled Query)",
          output: "Injected event records",
          limitations: "Uses probabilistic models that can occasionally overlap."
        }
      },
      {
        id: "agg",
        label: "Daily Metric Aggregator",
        type: "default",
        position: { x: 230, y: 120 },
        meta: {
          purpose: "Aggregates raw event counts per metric daily.",
          input: "ga4SampleData_live event logs",
          output: "ga4_event_metrics_daily",
          limitations: "Processes data in batches daily, which does not provide real-time updates."
        }
      },
      {
        id: "gap",
        label: "Gap Filler",
        type: "default",
        position: { x: 230, y: 240 },
        meta: {
          purpose: "Inserts zero rows for missing dates, ensuring a continuous timeline for forecasting models.",
          input: "ga4_event_metrics_daily",
          output: "ga4_event_metrics_daily_filled",
          limitations: "Requires static calendar tables."
        }
      },
      {
        id: "arima",
        label: "ARIMA_PLUS Models",
        type: "default",
        position: { x: 420, y: 120 },
        meta: {
          purpose: "Trains auto-regressive integrated moving average time-series models per metric (retrained every 30 days).",
          input: "ga4_event_metrics_daily_filled",
          output: "BigQuery ML models",
          limitations: "Demands at least 9 months of historical data for accurate seasonality."
        }
      },
      {
        id: "detector",
        label: "Statistical Detector",
        type: "default",
        position: { x: 420, y: 240 },
        meta: {
          purpose: "Performs prediction interval breaches and ML.DETECT_ANOMALIES logic.",
          input: "ARIMA_PLUS Models",
          output: "ga4_anomaly_enriched_all_events",
          limitations: "Statistical breaches don't represent business criticality."
        }
      },
      {
        id: "classifier",
        label: "Severity & Impact Classifier",
        type: "default",
        position: { x: 620, y: 120 },
        meta: {
          purpose: "Applies SQL rule filters mapping metrics to business-critical scores.",
          input: "ga4_anomaly_enriched_all_events",
          output: "ga4_anomaly_scored_events",
          limitations: "Requires hardcoded weights."
        }
      },
      {
        id: "decision",
        label: "Alert Eligibility Engine",
        type: "default",
        position: { x: 620, y: 240 },
        meta: {
          purpose: "Filters alert-ready anomalies, suppressing duplicates and enforcing office hours.",
          input: "ga4_anomaly_scored_events",
          output: "ga4_anomaly_alert_decisions",
          limitations: "Can delay notifications for sub-critical alerts."
        }
      },
      {
        id: "agent",
        label: "Context Agent",
        type: "default",
        position: { x: 620, y: 360 },
        meta: {
          purpose: "Flask application orchestration pulling contextual events, campaign updates, and news feeds.",
          input: "ga4_anomaly_scored_events",
          output: "Enriched JSON payloads",
          limitations: "Requires active Cloud Run service state."
        }
      },
      {
        id: "gemini",
        label: "Vertex AI Gemini",
        type: "default",
        position: { x: 800, y: 360 },
        meta: {
          purpose: "Uses generative intelligence to validate whether external campaigns/promotions explain anomalies.",
          input: "Context prompts",
          output: "Text explanation diagnostics",
          limitations: "API quota rate limits."
        }
      },
      {
        id: "table",
        label: "Contextualized Table",
        type: "default",
        position: { x: 800, y: 240 },
        meta: {
          purpose: "Saves contextual explanations using atomic batch loads.",
          input: "Gemini text evaluations",
          output: "ga4_anomaly_contextualized_events",
          limitations: "Requires load job schema alignment."
        }
      },
      {
        id: "view",
        label: "Email Payload View",
        type: "default",
        position: { x: 980, y: 120 },
        meta: {
          purpose: "SQL View combining alert eligibility decisions and contextual explanations.",
          input: "Joined anomaly/context tables",
          output: "Consolidated SQL payloads",
          limitations: "Read-only view."
        }
      },
      {
        id: "delivery",
        label: "Alert Delivery",
        type: "output",
        position: { x: 980, y: 240 },
        meta: {
          purpose: "Google Apps Script pulling daily view records and sending formatted emails via Gmail API.",
          input: "Email Payload View rows",
          output: "Gmail notifications",
          limitations: "Apps Script is capped at 100 emails/day."
        }
      }
    ],
    edges: [
      { id: "e-gen-agg", source: "gen", target: "agg", animated: true },
      { id: "e-inj-agg", source: "inj", target: "agg", animated: true },
      { id: "e-agg-gap", source: "agg", target: "gap", animated: false },
      { id: "e-gap-arima", source: "gap", target: "arima", animated: true, label: "Train" },
      { id: "e-arima-det", source: "arima", target: "detector", animated: true, label: "Forecast" },
      { id: "e-det-class", source: "detector", target: "classifier", animated: false },
      { id: "e-class-dec", source: "classifier", target: "decision", animated: true, label: "Filter" },
      { id: "e-class-agent", source: "classifier", target: "agent", animated: true, label: "Context" },
      { id: "e-agent-gemini", source: "agent", target: "gemini", animated: true, label: "Validate" },
      { id: "e-gemini-table", source: "gemini", target: "table", animated: false },
      { id: "e-dec-view", source: "decision", target: "view", animated: true },
      { id: "e-table-view", source: "table", target: "view", animated: true },
      { id: "e-view-del", source: "view", target: "delivery", animated: true, label: "Deliver" }
    ],
    lessons: {
      whyThisDesign: "Separating statistical detection (BigQuery ML) from business filters (BigQuery SQL) and context verification (Gemini) ensures high auditability and dynamic parameter changes without code redeployments.",
      whatFailed: "Standard BigQuery streaming inserts of context rows caused serialization and lock disputes, failing during simultaneous write transactions.",
      whatChanged: "Converted to batch file insertions using bq.load_table_from_json() under WRITE_APPEND, achieving complete write durability."
    }
  },
  {
    slug: "real-estate-recommender",
    title: "Real Estate Decision Support System Architecture",
    description: "Modular system design showing data preprocessing, caching, machine learning pipelines, and the interactive Presentation Layer.",
    figmaUrl: "https://www.figma.com/make/fopxJEECJrwmKKKU1phtEv/Real-Estate-Decision-Support-System?fullscreen=1&t=MPHy4ud2qGWst7QS-1&code-node-id=0-9",
    nodes: [
      {
        id: "Home",
        label: "Home.py",
        type: "input",
        position: { x: 50, y: 440 },
        meta: {
          purpose: "Landing & navigation dashboard page for the multi-page Streamlit application.",
          input: "User menu selection.",
          output: "Active page navigation.",
          limitations: "Requires persistent connection session state."
        }
      },
      {
        id: "P1",
        label: "1_Analytics.py",
        type: "output",
        position: { x: 780, y: 80 },
        meta: {
          purpose: "Renders interactive Plotly charts, Mapbox geo-coordinates, facing direction counts, and floor-level distribution analytics.",
          input: "User selected locality filter.",
          output: "Rendered Mapbox plots and distribution graphs.",
          limitations: "Map loading relies on client-side Mapbox token and WebGL support."
        }
      },
      {
        id: "P2",
        label: "2_PricePredictor.py",
        type: "output",
        position: { x: 780, y: 560 },
        meta: {
          purpose: "Displays the dynamic prediction form where users input property specifications (BHK, area, furnishing, luxury score).",
          input: "User form criteria inputs.",
          output: "Triggered preprocessing actions and predicted valuation bounds display.",
          limitations: "Form inputs must be fully validated before submitting to model."
        }
      },
      {
        id: "P3",
        label: "3_InsightsModule.py",
        type: "output",
        position: { x: 780, y: 200 },
        meta: {
          purpose: "Interactive feature importance panel allowing users to configure target features and observe relative ML regression weights.",
          input: "Selectable regression feature checklists.",
          output: "Seaborn bar charts displaying calculated feature weights.",
          limitations: "Heavy training lag requires active caching bounds."
        }
      },
      {
        id: "P4",
        label: "4_PropertyCategoryClassification.py",
        type: "output",
        position: { x: 780, y: 320 },
        meta: {
          purpose: "Property tier classification UI displaying metrics reports and predictions classifying properties into affordable, mid-range, and luxury.",
          input: "Selectable classification criteria inputs.",
          output: "Predicted price-tier labels and JSON classification evaluation reports.",
          limitations: "Dependent on user-configured threshold inputs."
        }
      },
      {
        id: "P5",
        label: "5_RecommenderSystem.py",
        type: "output",
        position: { x: 780, y: 440 },
        meta: {
          purpose: "Exposes recommender inputs (e.g. locality constraints) and renders top matching similar properties card list.",
          input: "User property filters and index selections.",
          output: "Recommended sibling listing cards grid.",
          limitations: "Demands locality filter constraints to prune distance calculation matrix."
        }
      },
      {
        id: "CSV",
        label: "REAL-ESTATE-DATASET.csv",
        type: "input",
        position: { x: 50, y: 80 },
        meta: {
          purpose: "Primary property listing database containing location coordinates, prices, sizes, amenities, and features.",
          input: "Raw database file.",
          output: "Unstructured DataFrame records.",
          limitations: "Requires cleaning and normalization to resolve missing values."
        }
      },
      {
        id: "RFReg",
        label: "random_forest_model.pkl",
        type: "default",
        position: { x: 510, y: 560 },
        meta: {
          purpose: "Pre-trained, offline-compiled Random Forest Regressor binary.",
          input: "Standardized 1D arrays.",
          output: "Housing price predictions.",
          limitations: "Frozen static model; requires manual offline updates to learn new listings."
        }
      },
      {
        id: "Scaler",
        label: "scaler.pkl",
        type: "input",
        position: { x: 50, y: 200 },
        meta: {
          purpose: "Serialized StandardScaler coefficients containing training mean and standard deviation matrices.",
          input: "Raw categorical and numerical arrays.",
          output: "Standardized normal distributions.",
          limitations: "Demands precise matching dimensions."
        }
      },
      {
        id: "Cols",
        label: "feature_columns.pkl",
        type: "input",
        position: { x: 50, y: 320 },
        meta: {
          purpose: "Serialized index arrays containing the master listing columns from training one-hot matrices.",
          input: "Categorical inputs.",
          output: "Zero-padded feature schemas.",
          limitations: "Incompatible with structure changes without manual regeneration."
        }
      },
      {
        id: "Cache",
        label: "Caching Layer (@st.cache)",
        type: "default",
        position: { x: 280, y: 80 },
        meta: {
          purpose: "Manages stateful execution memory bounds to store parsed files and model resources in RAM.",
          input: "Parsed data frames & models.",
          output: "Cached memory addresses.",
          limitations: "Can trigger memory leaks under massive un-evicted loads."
        }
      },
      {
        id: "Prep",
        label: "Data Preprocessing & Cleanup",
        type: "default",
        position: { x: 280, y: 260 },
        meta: {
          purpose: "Handles cleaning operations, dummy encoding, coordinate scaling, and structural column alignments.",
          input: "Filtered dataframes or user inputs.",
          output: "Cleaned datasets or scaled arrays.",
          limitations: "Dependent on matching schema columns."
        }
      },
      {
        id: "DynamicReg",
        label: "Dynamic RF Regressor Trainer",
        type: "default",
        position: { x: 510, y: 200 },
        meta: {
          purpose: "Trains custom RandomForestRegressor models on-the-fly to calculate dynamic feature importances.",
          input: "User selected feature split matrices.",
          output: "Calculated feature importances.",
          limitations: "High computational training lag requires active caching bounds."
        }
      },
      {
        id: "DynamicClf",
        label: "Dynamic RF Classifier Trainer",
        type: "default",
        position: { x: 510, y: 320 },
        meta: {
          purpose: "Trains custom RandomForestClassifier models to compute accuracy metrics and predict property price classifications.",
          input: "Target category labels and feature inputs.",
          output: "Accuracy classification score matrices.",
          limitations: "Heavy training tasks block interactive rendering if executed without cached fits."
        }
      },
      {
        id: "KNN",
        label: "Similarity Engine (NearestNeighbors)",
        type: "default",
        position: { x: 510, y: 440 },
        meta: {
          purpose: "Fits localized listing distance vectors and computes similarity using k-NN with Euclidean metrics.",
          input: "Filtered property listing matrices.",
          output: "Top matching similar listing suggestions.",
          limitations: "Requires restricted locality search boundaries for speed."
        }
      }
    ],
    edges: [
      { id: "e-csv-cache", source: "CSV", target: "Cache", animated: true, label: "Cached Load" },
      { id: "e-cache-p1", source: "Cache", target: "P1", animated: true, label: "Analytics Maps" },
      
      { id: "e-scaler-prep", source: "Scaler", target: "Prep", animated: false, label: "Load Scaler Profile" },
      { id: "e-cols-prep", source: "Cols", target: "Prep", animated: false, label: "Load Schema Profile" },
      { id: "e-prep-reg", source: "Prep", target: "RFReg", animated: true, label: "Scale & Align" },
      { id: "e-reg-p2", source: "RFReg", target: "P2", animated: true, label: "Price Predictions" },
      
      { id: "e-cache-dynreg", source: "Cache", target: "DynamicReg", animated: true, label: "Train Regressor" },
      { id: "e-dynreg-p3", source: "DynamicReg", target: "P3", animated: true, label: "Feature Weights" },
      
      { id: "e-cache-dynclf", source: "Cache", target: "DynamicClf", animated: true, label: "Train Classifier" },
      { id: "e-dynclf-p4", source: "DynamicClf", target: "P4", animated: true, label: "Accuracy Metrics" },
      
      { id: "e-cache-knn", source: "Cache", target: "KNN", animated: true, label: "Listings Data" },
      { id: "e-knn-p5", source: "KNN", target: "P5", animated: true, label: "Recommendations" }
    ],
    lessons: {
      whyThisDesign: "Separating static ingestion from dynamic scaling ensures user input changes do not re-run heavy file I/O operations. Using streamlit caches conditionally manages runtime costs.",
      whatFailed: "Online predictions threw size mismatch errors when high-cardinality locality tags was not represented inside the scaling matrix.",
      whatChanged: "Serialized column layout configurations offline, allowing the web client to perform alignment fills of zeros to retain layout integrity during scaling."
    }
  },
  {
    slug: "statistical-analysis-assistant",
    title: "Statistical Analysis Assistant Architecture",
    description: "Dual-engine routing co-pilot directing reporting queries to either LangGraph (BigQuery) or direct GA4 API funnels.",
    figmaUrl: {
      "GA4 Pipeline Flowchart": "https://www.figma.com/make/AYEuyp8BTSlQwKCFvTJCpO/GA4-Pipeline-Flowchart?fullscreen=1&t=ft0TV7WIVn8nnzBU-1&code-node-id=0-9",
      "BigQuery Analytics Pipeline": "https://www.figma.com/make/z5OHRSuuyqpoOoK2m3ZUPl/BigQuery-Analytics-Pipeline?code-node-id=0-9&p=f&t=o2NzdSbFRRNj4vLa-0&fullscreen=1"
    },
    nodes: [
      {
        id: "ui",
        label: "User Interface (React)",
        type: "input",
        position: { x: 50, y: 200 },
        meta: {
          purpose: "Captures natural language requests and renders visual charts and slides.",
          input: "Conversational text",
          output: "JSON commands",
          limitations: "Requires persistent network connection state."
        }
      },
      {
        id: "auth",
        label: "Auth & Role Gate",
        type: "default",
        position: { x: 200, y: 200 },
        meta: {
          purpose: "Validates user permissions (ADMIN / ANALYST) for accessing specific clients.",
          input: "HTTP Header Token",
          output: "Validated payload Context",
          limitations: "Relies on external IAM models."
        }
      },
      {
        id: "router",
        label: "Dual Engine Router",
        type: "default",
        position: { x: 350, y: 200 },
        meta: {
          purpose: "Determines if a query requires raw BigQuery event data or standard Direct GA4 reports.",
          input: "Parsed user command text",
          output: "Assigned execution branch",
          limitations: "Heuristic-based, occasionally routes complex synonym metrics down SQL path."
        }
      },
      {
        id: "agent",
        label: "LangGraph Agent (BigQuery)",
        type: "default",
        position: { x: 500, y: 100 },
        meta: {
          purpose: "Generates, corrects, and dry-runs SQL query calculations using Gemini 2.5 Pro.",
          input: "Conversational prompt + client schemas",
          output: "Executable SQL string",
          limitations: "Higher latency due to multiple agent loops."
        }
      },
      {
        id: "bq",
        label: "BigQuery SQL Executor",
        type: "default",
        position: { x: 650, y: 100 },
        meta: {
          purpose: "Runs optimized partition-aware SQL against GA4 export tables.",
          input: "Validated SQL query",
          output: "Raw data records",
          limitations: "Scanned bytes incur billing costs."
        }
      },
      {
        id: "direct",
        label: "Direct GA4 Pipeline",
        type: "default",
        position: { x: 500, y: 300 },
        meta: {
          purpose: "Processes reporting metrics via an 8-stage sequence using Gemini 2.0 Flash.",
          input: "Metric attributes",
          output: "Formulated API requests",
          limitations: "Cannot execute custom user multi-touch attribution algorithms."
        }
      },
      {
        id: "apis",
        label: "GA4 Reporting APIs",
        type: "default",
        position: { x: 650, y: 300 },
        meta: {
          purpose: "Fetches aggregated client metrics from Google Data API endpoints (Alpha/Beta/Admin).",
          input: "API Request schemas",
          output: "Standard report responses",
          limitations: "API quota rate limits."
        }
      },
      {
        id: "insights",
        label: "Insights Service",
        type: "default",
        position: { x: 800, y: 200 },
        meta: {
          purpose: "Synthesizes narrative observations and CRO recommendations using Gemini 2.0 Flash.",
          input: "Consolidated query data tables",
          output: "Structured text descriptions",
          limitations: "Depends on prompt context limits."
        }
      },
      {
        id: "compiler",
        label: "Presentation Compiler",
        type: "default",
        position: { x: 950, y: 120 },
        meta: {
          purpose: "Generates styled PPTX/PDF slide decks automatically.",
          input: "Raw chart values & observations",
          output: "Downloadable slide files",
          limitations: "Slide layouts are statically pre-defined."
        }
      },
      {
        id: "email",
        label: "Email Delivery",
        type: "output",
        position: { x: 950, y: 280 },
        meta: {
          purpose: "Delivers compiled reports formatted in executive Minto Pyramid structures.",
          input: "Slide decks & summary summaries",
          output: "Sent email alerts",
          limitations: "Dependent on SMTP provider uptime."
        }
      }
    ],
    edges: [
      { id: "e-ui-auth", source: "ui", target: "auth", animated: true },
      { id: "e-auth-router", source: "auth", target: "router", animated: true },
      { id: "e-router-agent", source: "router", target: "agent", animated: true, label: "BigQuery path" },
      { id: "e-router-direct", source: "router", target: "direct", animated: true, label: "Direct API path" },
      { id: "e-agent-bq", source: "agent", target: "bq", animated: true, label: "Execute" },
      { id: "e-direct-apis", source: "direct", target: "apis", animated: true, label: "Fetch" },
      { id: "e-bq-insights", source: "bq", target: "insights", animated: false },
      { id: "e-apis-insights", source: "apis", target: "insights", animated: false },
      { id: "e-insights-compiler", source: "insights", target: "compiler", animated: true },
      { id: "e-insights-email", source: "insights", target: "email", animated: true, label: "Deliver" }
    ],
    lessons: {
      whyThisDesign: "Separating custom SQL generation from direct reporting API queries protects GCP billing budgets while maintaining low response latency for standard reporting questions.",
      whatFailed: "Synonym variations and conversational requests for dimensions failed to resolve against GA4 API schema fields directly, triggering constant API schema errors.",
      whatChanged: "Developed an offline client metadata catalog map to translate metrics locally, bypassing LLM round-trips and improving validation stability."
    }
  },
  {
    slug: "ipl-web-analysis",
    title: "IPL Web Analysis Architecture",
    description: "Multi-page Streamlit analytical dashboard processing 17 seasons of match and delivery logs.",
    figmaUrl: "https://github.com/Ronit-019/IPL-2008-2024-Web-Analysis",
    nodes: [
      {
        id: "streamlit_ui",
        label: "Streamlit UI",
        type: "input",
        position: { x: 50, y: 150 },
        meta: {
          purpose: "Interactive multi-page UI presenting dashboard options, player metrics, and team tallies.",
          input: "User menu interactions, team selectors, dynamic threshold inputs.",
          output: "Active dashboard filter parameters.",
          limitations: "Streamlit reruns the entire script upon user interaction."
        }
      },
      {
        id: "app_dispatcher",
        label: "App Dispatcher",
        type: "default",
        position: { x: 250, y: 150 },
        meta: {
          purpose: "Coordinates dashboard routing and matches selections to corresponding statistical handlers.",
          input: "Active dashboard filter parameters.",
          output: "Targeted module execution requests.",
          limitations: "Single-threaded routing synchronous execution flow."
        }
      },
      {
        id: "analysis_modules",
        label: "Analysis Modules",
        type: "default",
        position: { x: 450, y: 150 },
        meta: {
          purpose: "Dedicated Python scripts containing batting, bowling, matchup, and point table formulas.",
          input: "Pre-processed Pandas data summaries.",
          output: "Plotly chart figures, metrics cards, and styled dataframe tables.",
          limitations: "Dependent on custom helper structures and column formats."
        }
      },
      {
        id: "pandas_processor",
        label: "Pandas Processor",
        type: "default",
        position: { x: 650, y: 150 },
        meta: {
          purpose: "Handles dataset cleaning, column type formatting, and dynamic groupby aggregations.",
          input: "Raw CSV/XLS file buffers.",
          output: "Cleaned and filtered pandas DataFrames.",
          limitations: "In-memory processing of entire delivery logs can cause resource bottlenecks."
        }
      },
      {
        id: "datasets",
        label: "IPL Datasets",
        type: "output",
        position: { x: 850, y: 150 },
        meta: {
          purpose: "Static files storing 17 seasons of ball-by-ball deliveries and matches (2008-2024).",
          input: "None (Static local storage files).",
          output: "deliveries.csv and matches.csv files.",
          limitations: "Static local assets, lacking real-time tournament feed scraping."
        }
      }
    ],
    edges: [
      { id: "e-ui-dispatcher", source: "streamlit_ui", target: "app_dispatcher", animated: true, label: "User Interaction" },
      { id: "e-dispatcher-modules", source: "app_dispatcher", target: "analysis_modules", animated: true, label: "Execute Routing" },
      { id: "e-modules-pandas", source: "analysis_modules", target: "pandas_processor", animated: true, label: "Request Aggregates" },
      { id: "e-pandas-datasets", source: "pandas_processor", target: "datasets", animated: false, label: "Load Data" }
    ],
    lessons: {
      whyThisDesign: "Decoupling analysis modules from the presentation script keeps the code modular, allowing independent testing of statistics calculators.",
      whatFailed: "Calculating batting strike rates and bowling economy rates directly on raw data groups generated outliers from players with very few faced/bowled balls.",
      whatChanged: "Enforced strict pre-filter boundaries (minimum 100 runs for batsmen, 120 balls for bowlers) to isolate representative metrics."
    }
  }
];
