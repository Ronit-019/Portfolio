import { AlertTriangle, ArrowRight } from "lucide-react";
import anomaliesData from "../../../../data/analytics/anomalies.json";

export default function AlertBanner({ onInvestigate }) {
  const criticalCount = anomaliesData.filter((a) => a.severity === "critical").length;

  return (
    <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl space-y-3">
      <div className="flex items-center gap-2 text-danger font-semibold text-sm select-none">
        <AlertTriangle size={16} />
        <span>⚠ ANOMALIES DETECTED TODAY: {anomaliesData.length} ({criticalCount} Critical)</span>
      </div>

      <div className="space-y-2">
        {anomaliesData.map((anomaly) => (
          <div
            key={anomaly.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-bg-card border border-border-subtle rounded-lg hover:border-border-active transition-all"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    anomaly.severity === "critical" ? "bg-danger animate-ping" : "bg-warning"
                  }`}
                />
                <h4 className="text-sm font-semibold text-text-primary">
                  {anomaly.title}
                </h4>
                <span className="text-[10px] text-text-muted font-mono bg-bg-primary px-1.5 py-0.5 rounded border border-border-subtle">
                  {anomaly.timestamp}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {anomaly.description}
              </p>
            </div>
            <button
              onClick={() => onInvestigate(anomaly.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-danger/10 hover:bg-danger hover:text-white border border-danger/25 text-danger transition-all duration-300 shrink-0 self-end sm:self-center cursor-pointer"
            >
              <span>Investigate</span>
              <ArrowRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
