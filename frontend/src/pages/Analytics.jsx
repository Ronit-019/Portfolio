import { useState } from "react";
import MetricsBar from "../components/analytics/MetricsBar";
import AlertBanner from "../components/analytics/AlertBanner";
import InvestigationPanel from "../components/analytics/InvestigationPanel";
import { Activity } from "lucide-react";

export default function Analytics() {
  const [activeAnomalyId, setActiveAnomalyId] = useState(null);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto py-2">
      {/* Page Title & Status Header */}
      {!activeAnomalyId && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 select-none animate-in fade-in duration-200">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Analytics War Room
            </h1>
            <p className="text-sm text-text-secondary">
              Real-time monitoring of marketing conversion systems and revenue anomalies.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20 text-success text-xs font-semibold self-start sm:self-center">
            <Activity size={14} className="animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
            <span>Revenue System Live</span>
          </div>
        </div>
      )}

      {/* Conditional View Routing */}
      {activeAnomalyId ? (
        <InvestigationPanel
          anomalyId={activeAnomalyId}
          onBack={() => setActiveAnomalyId(null)}
        />
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Metrics Sparkline cards */}
          <MetricsBar />

          {/* Anomalies alert alerts */}
          <AlertBanner onInvestigate={setActiveAnomalyId} />

          {/* Informational context card */}
          <div className="p-5 bg-bg-surface border border-border-subtle rounded-xl select-none">
            <h4 className="text-sm font-bold text-text-primary mb-2">
              How the War Room Works
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              This dashboard simulates a production DevOps analytics console. A background pipeline queries a time-series model (represented by static parameters). Deviation anomalies are detected using dynamic standard-deviation threshold limits, then processed through a LLM evaluation agent that filters alert noise and isolates the root cause before reporting the incident to this panel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
