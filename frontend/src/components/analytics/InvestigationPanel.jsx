import { useState, useEffect } from "react";
import { ArrowLeft, Terminal, Cpu } from "lucide-react";
import ForecastChart from "./ForecastChart";
import anomaliesData from "../../../../data/analytics/anomalies.json";

export default function InvestigationPanel({
  anomalyId,
  onBack,
}) {
  const anomaly = anomaliesData.find((a) => a.id === anomalyId) || anomaliesData[0];

  const [diagnosticLogs, setDiagnosticLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const logs = [
    `[${new Date().toLocaleTimeString()}] Fetching historical timeseries correlation metrics...`,
    `[${new Date().toLocaleTimeString()}] Accessing BigQuery standard-deviation thresholds for 'revenue' metric...`,
    `[${new Date().toLocaleTimeString()}] Checking third-party payment gateway latency (Stripe API, PayPal API)...`,
    `[${new Date().toLocaleTimeString()}] Correlating database connection pool saturation against hourly transaction spikes...`,
    `[${new Date().toLocaleTimeString()}] Running root cause clustering algorithms...`,
    `[${new Date().toLocaleTimeString()}] AI Diagnostics finished. High probability correlations identified.`
  ];

  // Run simulated logs typewriter effect on mount
  useEffect(() => {
    if (logIndex < logs.length) {
      const timer = setTimeout(() => {
        setDiagnosticLogs((prev) => [...prev, logs[logIndex]]);
        setLogIndex(logIndex + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowAnalysis(true);
    }
  }, [logIndex]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Back navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-bg-surface hover:bg-bg-hover border border-border-subtle hover:border-border-active text-text-secondary hover:text-text-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="space-y-0.5 select-none">
          <h2 className="text-lg font-bold text-text-primary">
            Root Cause Investigation
          </h2>
          <p className="text-xs text-text-secondary">
            ID: <span className="font-mono text-text-accent">{anomaly.id}</span> · Timestamp: {anomaly.timestamp}
          </p>
        </div>
      </div>

      {/* Forecasting Composed Chart */}
      <ForecastChart />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Diagnostics Console */}
        <div className="bg-bg-primary border border-border-active rounded-xl p-5 font-mono text-xs text-text-secondary select-text space-y-4 shadow-inner">
          <div className="flex items-center gap-2 text-text-primary border-b border-border-subtle pb-2 select-none">
            <Terminal size={14} className="text-accent-secondary" />
            <span className="font-bold">Agent Diagnostic Console</span>
          </div>
          
          <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-thin">
            {diagnosticLogs.map((log, index) => (
              <p key={index} className={index === logs.length - 1 ? "text-success" : ""}>
                {log}
              </p>
            ))}
            {!showAnalysis && (
              <span className="inline-block w-1.5 h-4 bg-text-secondary animate-pulse" />
            )}
          </div>
        </div>

        {/* Right Column: AI Analysis Result */}
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 flex flex-col justify-between shadow-sm">
          {showAnalysis ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
                <Cpu size={16} className="text-accent-primary animate-pulse" />
                <h4 className="text-sm font-bold text-text-primary">
                  AI Root Cause Analysis
                </h4>
              </div>

              {/* Potential Root Causes list */}
              <div className="space-y-2 select-text">
                <h5 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Identified Causes
                </h5>
                <ul className="space-y-2">
                  {anomaly.root_causes.map((cause, i) => (
                    <li key={i} className="text-xs text-text-secondary flex items-start gap-2 leading-relaxed">
                      <span className="text-danger shrink-0 mt-0.5">●</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended actions as triggerable buttons */}
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Recommended Actions
                </h5>
                <div className="flex flex-wrap gap-2">
                  {anomaly.recommended_actions.map((act, i) => (
                    <button
                      key={i}
                      className="px-3 py-1.5 text-[10px] font-semibold border border-border-active hover:border-accent-primary hover:bg-accent-primary/5 rounded bg-bg-card text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer"
                    >
                      {act}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-center text-text-muted space-y-2 select-none">
              <Cpu size={24} className="animate-spin text-border-active" />
              <p className="text-xs">Waiting for diagnostic agent...</p>
            </div>
          )}
        </div>
      </div>

      {/* Skill Demonstration Section */}
      <div className="p-4 bg-bg-surface border border-border-subtle rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Underlying Engineering Competencies
          </h5>
          <p className="text-xs text-text-secondary">
            This module models a real-world integration of ML anomaly detection filters with LLM validation logic.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {anomaly.demonstrates.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-[10px] font-semibold rounded bg-accent-primary/10 border border-accent-primary/20 text-text-accent"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
