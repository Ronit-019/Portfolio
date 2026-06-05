export interface ArchNode {
  id: string;
  label: string;
  type: "input" | "default" | "output";
  position: { x: number; y: number };
  meta: {
    purpose: string;
    input: string;
    output: string;
    limitations: string;
  };
}

export interface ArchEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface ArchitectureConfig {
  slug: string;
  title: string;
  description: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
  lessons: {
    whyThisDesign: string;
    whatFailed: string;
    whatChanged: string;
  };
}

export const ARCHITECTURE_DATA: ArchitectureConfig[] = [
  {
    slug: "smartcv",
    title: "SmartCV Architecture",
    description: "Multi-agent orchestration parsing and semantic similarity evaluation pipeline.",
    nodes: [
      {
        id: "frontend",
        label: "Streamlit UI",
        type: "input",
        position: { x: 50, y: 150 },
        meta: {
          purpose: "Ingests candidate resume PDF and target job description from user interface.",
          input: "Raw PDF files, text boxes.",
          output: "JSON string payloads.",
          limitations: "Streamlit is single-threaded, causing rendering lag during high concurrent traffic."
        }
      },
      {
        id: "fastapi",
        label: "FastAPI Gateway",
        type: "default",
        position: { x: 230, y: 150 },
        meta: {
          purpose: "Exposes HTTP endpoints, runs async handlers, parses payloads, and manages API authentication.",
          input: "Resume stream, job description string.",
          output: "JSON response payloads (matching score, analysis metadata).",
          limitations: "Requires horizontal container scaling to support large upload loads."
        }
      },
      {
        id: "langgraph",
        label: "LangGraph Agent",
        type: "default",
        position: { x: 420, y: 150 },
        meta: {
          purpose: "Orchestrates multi-agent evaluation states (Parser Agent -> Matcher Agent -> Editor Agent).",
          input: "Structured resume data, job details.",
          output: "Final formatted matching summary JSON.",
          limitations: "Higher latency due to multiple LLM validation checks (average run: 2-3 seconds)."
        }
      },
      {
        id: "gemini",
        label: "Gemini 1.5 Flash",
        type: "default",
        position: { x: 620, y: 80 },
        meta: {
          purpose: "Provides semantic language inference, resume summarization, and formatting critiques.",
          input: "Prompt strings, context variables.",
          output: "Raw generated text outputs.",
          limitations: "Strict API token rate limits under free-tier endpoints (15 requests per minute)."
        }
      },
      {
        id: "faiss",
        label: "FAISS Vector DB",
        type: "output",
        position: { x: 620, y: 220 },
        meta: {
          purpose: "Stores embedded vectors of skills/jobs and executes cosine similarity query indexing.",
          input: "Embedding query vectors (dimension 384 or 768).",
          output: "Nearest neighbor matches with similarity distance weights.",
          limitations: "FAISS is in-memory only. Index changes must be re-saved to disk to persist."
        }
      }
    ],
    edges: [
      { id: "e1-2", source: "frontend", target: "fastapi", animated: true },
      { id: "e2-3", source: "fastapi", target: "langgraph", animated: true },
      { id: "e3-4", source: "langgraph", target: "gemini", animated: true, label: "inference" },
      { id: "e3-5", source: "langgraph", target: "faiss", animated: true, label: "lookup" }
    ],
    lessons: {
      whyThisDesign: "Using LangGraph over standard linear chains allowed us to build cyclic evaluation flows. If the matcher agent identifies ambiguous skill descriptions, it loops back to the parser agent to re-extract raw resume strings.",
      whatFailed: "Originally, we tried extracting PDF text using simple regex. This failed to parse resumes with double columns, returning scrambled texts. FAISS lookups returned irrelevant skills as a result.",
      whatChanged: "We split the parsing into two phases: PyMuPDF for boundary layout box extraction, followed by LLM schema normalization. This resolved parsing bugs across 95% of standard resume designs."
    }
  },
  {
    slug: "analytics-agent",
    title: "Analytics Agent Architecture",
    description: "Live monitoring anomaly alerting system with LLM validation logic.",
    nodes: [
      {
        id: "timeseries",
        label: "Telemetry Pipeline",
        type: "input",
        position: { x: 50, y: 150 },
        meta: {
          purpose: "Tracks session metrics, conversions, and transactions continuously.",
          input: "Raw server log events, database triggers.",
          output: "Hourly aggregate stats.",
          limitations: "Requires sliding-window buffers to prevent memory spikes under flash traffic."
        }
      },
      {
        id: "bigquery",
        label: "BigQuery ML (ARIMA+)",
        type: "default",
        position: { x: 230, y: 150 },
        meta: {
          purpose: "Generates timeseries revenue forecasts hourly and detects standard-deviation anomalies.",
          input: "30 days of historical aggregate metrics.",
          output: "Forecast revenue ranges, actuals, and standard deviation bounds.",
          limitations: "Re-training models takes significant compute and is restricted to daily runs."
        }
      },
      {
        id: "val-layer",
        label: "Gemini Validation Layer",
        type: "default",
        position: { x: 420, y: 150 },
        meta: {
          purpose: "Filters out false-positive alerts by checking error logs and external API statuses.",
          input: "Raw anomaly logs, correlation variables.",
          output: "Boolean validation flag and root cause diagnostics summary.",
          limitations: "Introduces +1.5s latency to alert notifications."
        }
      },
      {
        id: "alert-stream",
        label: "Alert Dashboard UI",
        type: "output",
        position: { x: 620, y: 150 },
        meta: {
          purpose: "Renders metrics charts, anomaly warnings, and root cause logs for dev engineers.",
          input: "High-fidelity alerts, diagnostics JSON.",
          output: "Interactive Recharts visual grids.",
          limitations: "Relies on client-side polling or WebSocket stability for live refreshes."
        }
      }
    ],
    edges: [
      { id: "e1-2", source: "timeseries", target: "bigquery", animated: true },
      { id: "e2-3", source: "bigquery", target: "val-layer", animated: true, label: "anomaly detected" },
      { id: "e3-4", source: "val-layer", target: "alert-stream", animated: true, label: "alert verified" }
    ],
    lessons: {
      whyThisDesign: "We placed a Gemini evaluation layer between the statistical anomaly detection (BigQuery ML) and the user alert trigger. This eliminates alert fatigue for the development team.",
      whatFailed: "Relying purely on statistical thresholds triggered alerts during expected weekend traffic dips, causing engineers to ignore the dashboard warnings.",
      whatChanged: "The LLM validation layer now correlates the revenue dip against server HTTP codes and payment API latencies, filtering out natural traffic shifts."
    }
  },
  {
    slug: "forecasting-pipeline",
    title: "Forecasting Pipeline",
    description: "Scheduled ETL batch pipeline training time-series prediction models in BigQuery.",
    nodes: [
      {
        id: "data-source",
        label: "Operational DB",
        type: "input",
        position: { x: 50, y: 150 },
        meta: {
          purpose: "Transactional database storing order records, user sessions, and cart details.",
          input: "OLTP transactions.",
          output: "Raw database log streams.",
          limitations: "Frequent read locks if querying live transaction tables directly."
        }
      },
      {
        id: "gcs",
        label: "Cloud Storage",
        type: "default",
        position: { x: 230, y: 150 },
        meta: {
          purpose: "Acts as a landing zone staging area for raw ETL export dumps.",
          input: "Daily CSV/JSON log exports.",
          output: "Staged document directories.",
          limitations: "File consistency must be verified before schema ingestion."
        }
      },
      {
        id: "bq-warehouse",
        label: "BigQuery DW",
        type: "default",
        position: { x: 420, y: 150 },
        meta: {
          purpose: "Aggregates, partitions, and indexes log variables. Trains BigQuery ML forecasting scripts.",
          input: "Staged storage files, SQL queries.",
          output: "ARIMA prediction outputs.",
          limitations: "High query cost if scanning unpartitioned columns."
        }
      },
      {
        id: "prediction-table",
        label: "Prediction Tables",
        type: "output",
        position: { x: 620, y: 150 },
        meta: {
          purpose: "Stores forecasts, historic bounds, and model evaluation metrics for web dashboard queries.",
          input: "Generated prediction arrays.",
          output: "Analytical JSON response payloads.",
          limitations: "Stale data if daily ETL updates fail."
        }
      }
    ],
    edges: [
      { id: "e1-2", source: "data-source", target: "gcs", animated: true },
      { id: "e2-3", source: "gcs", target: "bq-warehouse", animated: true, label: "ingestion" },
      { id: "e3-4", source: "bq-warehouse", target: "prediction-table", animated: true, label: "prediction run" }
    ],
    lessons: {
      whyThisDesign: "Ingesting raw logs through Cloud Storage staging before importing to BigQuery keeps operational databases isolated from analytical query loads, avoiding transaction locks.",
      whatFailed: "Running forecasting queries directly on raw daily data caused long load latencies due to sorting unpartitioned timestamps.",
      whatChanged: "Partitioned the tables by day and clustered on metric type, reducing query execution times by 40%."
    }
  },
  {
    slug: "data-science-copilot",
    title: "Data Science Copilot Architecture",
    description: "Exploratory analysis engine translating queries into runnable Python scripts.",
    nodes: [
      {
        id: "csv-upload",
        label: "Dataset Ingestion",
        type: "input",
        position: { x: 50, y: 150 },
        meta: {
          purpose: "Ingests structured CSV/Excel files from user uploads.",
          input: "Local spreadsheets.",
          output: "In-memory Pandas DataFrames.",
          limitations: "Restricted to files under 200MB due to browser memory bounds."
        }
      },
      {
        id: "metadata-extract",
        label: "Metadata Extractor",
        type: "default",
        position: { x: 230, y: 150 },
        meta: {
          purpose: "Extracts data structures (columns, types, missing rates, statistics) to form the context prompt.",
          input: "Pandas DataFrame.",
          output: "Structured schema markdown prompt.",
          limitations: "Does not capture deep row relationships without full scanning."
        }
      },
      {
        id: "gpt-model",
        label: "OpenAI / Gemini",
        type: "default",
        position: { x: 420, y: 150 },
        meta: {
          purpose: "Interprets natural language commands and generates annotated Scikit-Learn Python code.",
          input: "Schema metadata + user request.",
          output: "Raw markdown python code blocks.",
          limitations: "Occasionally hallucinates column names if prompts are poorly structured."
        }
      },
      {
        id: "runner-ui",
        label: "Streamlit UI Console",
        type: "output",
        position: { x: 620, y: 150 },
        meta: {
          purpose: "Displays statistical heatmaps, lists feature distributions, and renders generated code blocks.",
          input: "Generated script blocks, statistics objects.",
          output: "Interactive web grids.",
          limitations: "Code must be copy-pasted manually to execute."
        }
      }
    ],
    edges: [
      { id: "e1-2", source: "csv-upload", target: "metadata-extract", animated: true },
      { id: "e2-3", source: "metadata-extract", target: "gpt-model", animated: true },
      { id: "e3-4", source: "gpt-model", target: "runner-ui", animated: true }
    ],
    lessons: {
      whyThisDesign: "We designed a metadata filter to isolate LLM prompts from raw data values. This guarantees data privacy and prevents context overflows while remaining fast.",
      whatFailed: "Early code generators frequently failed during execution due to using libraries with outdated variable syntax.",
      whatChanged: "Injected a comprehensive system prompt outlining specific Scikit-Learn version standards. This achieved a 92% syntax compatibility score."
    }
  }
];
