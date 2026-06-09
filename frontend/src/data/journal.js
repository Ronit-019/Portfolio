export const JOURNAL_DATA = [
  {
    id: "journal-02",
    date: "May 2026",
    project: "GA4 Anomaly Intelligence",
    projectSlug: "ga4-anomaly-intelligence",
    problem: "Scheduling all BigQuery pipeline stages in UTC while the business operates in IST caused partial-day data processing and false anomaly drops during early-morning UTC runs.",
    failedSolution: "Running scheduled queries at a set UTC hour using standard database date functions.",
    whyItFailed: "Timezone offsets caused query runs to scan incomplete current-day records before all event files were fully compiled, resulting in inaccurate anomaly forecasts.",
    newApproach: "Enforced a strict 'process yesterday' calculation using DATE_SUB(CURRENT_DATE('Asia/Kolkata'), INTERVAL 1 DAY) in every SQL pipeline stage, decoupling execution hour from target business dates.",
    outcome: "Eliminated timezone drift bugs completely, ensuring **100% data completeness** on every single daily forecasting run.",
    whatILearned: [
      "Decouple pipeline execution triggers from the business timezone bounds of the targeted dataset.",
      "Ensuring idempotency with date-bounded deletes makes analytics scripts safe to replay during recoveries."
    ]
  },
  {
    id: "journal-03",
    date: "June 2026",
    project: "Statistical Analysis Assistant",
    projectSlug: "statistical-analysis-assistant",
    problem: "User synonym terms (e.g. 'bounced users', 'drop-off rate') didn't map to valid GA4 API dimension or metric names, causing repeated API schema failures during query building.",
    failedSolution: "Prompted the LLM to guess the correct GA4 API dimension or metric name dynamically inside the request constructor.",
    whyItFailed: "LLM hallucinations led to invalid API parameters, causing schema validation failures and wasted API quotas.",
    newApproach: "Built an offline JSON metadata catalog per client mapping colloquial synonyms to official GA4 API names, resolving field lookups locally before API dispatch.",
    outcome: "Eliminated query building failures, achieving a **90%+ query accuracy rating** for conversational reporting requests.",
    whatILearned: [
      "Local schema validation layers protect external API quota limits and catch invalid fields early.",
      "Caching structured client synonym catalogs locally is faster and more reliable than dynamic LLM translation."
    ]
  },
  {
    id: "journal-04",
    date: "May 2025",
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
  },
  {
    id: "journal-05",
    date: "August 2025",
    project: "IPL Web Analysis",
    projectSlug: "ipl-web-analysis",
    problem: "Calculating player strike rates and bowling economy rates directly on raw data groups generated statistical anomalies, where players with only a few deliveries faced would skew leaderboards with unrealistic ratios.",
    failedSolution: "Direct groupby aggregations on raw player deliveries, sorting by calculated strike rates and economy rates.",
    whyItFailed: "Outliers with tiny sample sizes dominated the leaderboard, pushing high-performing, high-volume players off the top lists and ruining the analytical value of the dashboard.",
    newApproach: "Designed and implemented a pre-filter threshold boundary (minimum 100 runs for batters and 120 balls for bowlers) before computing rate aggregations, effectively isolating players with representative season counts.",
    outcome: "Eliminated statistical noise completely, ensuring **100% representative and accurate leaderboards** across all 17 seasons of data.",
    whatILearned: [
      "Statistical metrics must always include minimum eligibility boundaries to avoid outlier distortion.",
      "Applying threshold filters in the initial Pandas processing layer saves memory and keeps dashboard rendering times low."
    ]
  }
];
