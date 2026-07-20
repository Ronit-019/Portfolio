import { Activity, ShieldCheck, Zap, Database, GraduationCap, Trophy } from "lucide-react";

export default function ImpactSnapshot() {
  const metrics = [
    {
      icon: Activity,
      value: "90%+",
      label: "Detection Accuracy",
      description: "ARIMA_PLUS models trained in BigQuery ML for GA4 event streams",
      color: "text-success bg-success/5 border-success/15",
    },
    {
      icon: ShieldCheck,
      value: "~75%",
      label: "False Alarm Reduction",
      description: "Achieved by Vertex AI Gemini validation layer in anomaly pipeline",
      color: "text-accent-primary bg-accent-primary/5 border-accent-primary/15",
    },
    {
      icon: Zap,
      value: "85%+",
      label: "Automation Speedup",
      description: "Analyst time automated via LangGraph from 2-6 hrs to <30 mins",
      color: "text-warning bg-warning/5 border-warning/15",
    },
    {
      icon: Database,
      value: "30K+",
      label: "Listings Processed",
      description: "Scraped, cleaned, and modeled in Real Estate DSS app",
      color: "text-accent-secondary bg-accent-secondary/5 border-accent-secondary/15",
    },
    {
      icon: GraduationCap,
      value: "8.72",
      label: "Academic CGPA",
      description: "B.Tech in Information & Communication Technology from Adani Uni",
      color: "text-text-accent bg-text-accent/5 border-text-accent/15",
    },
    {
      icon: Trophy,
      value: "260K+",
      label: "Cricket Records",
      description: "Ball-by-ball events parsed for 17 seasons in IPL Analysis dashboard",
      color: "text-danger bg-danger/5 border-danger/15",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 select-none">
        <Activity className="text-accent-primary" size={18} />
        <h3 className="text-lg font-bold text-text-primary">Impact Snapshot</h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-4 bg-bg-card border border-border-subtle hover:border-border-active rounded-xl transition-all duration-300 shadow-sm"
            >
              <div className="space-y-2.5">
                {/* Header Icon */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg border ${metric.color} select-none`}>
                  <Icon size={16} />
                </div>

                <div className="space-y-0.5">
                  {/* Large Value */}
                  <span className="text-xl md:text-2xl font-extrabold tracking-tight text-text-primary group-hover:text-accent-primary transition-colors">
                    {metric.value}
                  </span>
                  {/* Label */}
                  <h4 className="text-xs font-bold text-text-secondary tracking-tight">
                    {metric.label}
                  </h4>
                </div>
              </div>

              {/* Description */}
              <p className="text-[10px] md:text-xs text-text-muted mt-2 leading-relaxed">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
