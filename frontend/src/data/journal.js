export const JOURNAL_DATA = [
  {
    id: "journal-01",
    date: "June 2025",
    project: "Analytics Agent",
    projectSlug: "agentic-analytics",
    problem: "Development team was experiencing high alert fatigue from critical monitoring dashboards, leading them to ignore notifications that occasionally masked real database connection failures.",
    failedSolution: "Implemented static alerts on absolute transaction counts and configured a Slack channel dispatch.",
    whyItFailed: "Naturally-occurring weekend traffic dips triggered false positive alerts, causing developers to mute the alerts.",
    newApproach: "Introduced a Gemini LLM evaluation layer that acts as an alert verification filter. The agent is triggered by BigQuery ML statistical deviation thresholds, correlates the dip against HTTP logs and gateway latencies, and only verifies the alert if a high probability error pattern is identified.",
    outcome: "Filtered out minor dips, achieving a **75% reduction in alert noise** and restoring developer trust in dashboard notifications.",
    whatILearned: [
      "User trust is the most critical metric for monitoring systems. A highly accurate statistical filter is useless if developers mute the tool.",
      "LLMs can be applied effectively as intelligent heuristic evaluation filters for system alerts when standard rules are too rigid."
    ]
  },
  {
    id: "journal-02",
    date: "April 2025",
    project: "SmartCV Resume Matcher",
    projectSlug: "smartcv",
    problem: "Extracting raw text from uploaded PDF resumes yielded scrambled, out-of-order text blocks, specifically failing on standard two-column resume structures.",
    failedSolution: "Used basic regular expression parsers to strip text characters sequentially.",
    whyItFailed: "Sequentially reading text blocks from two-column PDFs read across columns (e.g. reading line 1 of column 1 then line 1 of column 2), merging unrelated skills and job titles.",
    newApproach: "Developed a two-stage parsing pipeline: using boundary layout box extraction to read each column vertically before horizontal merge, followed by a Gemini LLM parser to structure values into a standard JSON schema.",
    outcome: "Resolved layout parsing bugs, achieving a **95% parsing accuracy rating** across standard resume templates.",
    whatILearned: [
      "PDF files do not have inherent reading flows, only coordinate placements. Pre-processing coordinates is mandatory before processing text content.",
      "Applying structured JSON schemas to LLM outputs is critical for downstream analytical pipelines."
    ]
  },
  {
    id: "journal-03",
    date: "August 2023",
    project: "Real Estate Recommender",
    projectSlug: "real-estate-recommender",
    problem: "Real estate price predictions were ignored by users who found the pricing predictions arbitrary and lacked explanation of why a home was valued at that price.",
    failedSolution: "Displayed a single predicted price range and accuracy metric in the user interface.",
    whyItFailed: "Users have low trust in black-box prediction outputs. They want to understand the reasoning behind property valuations (e.g. proximity to metro lines).",
    newApproach: "Integrated a SHAP (Shapley Additive exPlanations) visualizer in the front-end interface, plotting the relative impact of each property attribute (bedrooms, school rating, transit index) on the final estimated price.",
    outcome: "Increased user retention and engagement on the search interface by **35%**.",
    whatILearned: [
      "Explainability is as important as accuracy. If users don't understand how a model behaves, they won't adopt it.",
      "Shapley values are an excellent bridge for explaining regression model outputs to non-technical users."
    ]
  }
];
