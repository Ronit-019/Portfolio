import { LineChart, Line, ResponsiveContainer } from "recharts";
import timeseriesData from "../../../../data/analytics/revenue-timeseries.json";
import clsx from "clsx";

function MetricCard({
  label,
  value,
  delta,
  trend,
  sparklineData,
  lineColor,
}) {
  return (
    <div className="flex flex-col justify-between p-5 bg-bg-card border border-border-subtle rounded-xl shadow-sm hover:border-border-active transition-all duration-300 select-none group">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">
            {label}
          </span>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight">
            {value}
          </h3>
        </div>
        <span
          className={clsx(
            "px-2 py-0.5 text-xs font-semibold rounded-full flex items-center gap-0.5 border",
            trend === "up" && "bg-success/10 border-success/20 text-success",
            trend === "down" && "bg-danger/10 border-danger/20 text-danger",
            trend === "neutral" && "bg-border-active/10 border-border-active/20 text-text-muted"
          )}
        >
          {trend === "up" && "↑"}
          {trend === "down" && "↓"}
          {trend === "neutral" && "→"}
          {delta}
        </span>
      </div>

      {/* Sparkline chart container */}
      <div className="h-10 mt-4 w-full opacity-80 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function MetricsBar() {
  // Extract last 7 days for the sparklines
  const last7Days = timeseriesData.slice(-7);
  
  const revenueSpark = last7Days.map((d) => ({ value: d.revenue }));
  const conversionSpark = last7Days.map((d) => ({ value: d.conversions }));
  const sessionSpark = last7Days.map((d) => ({ value: d.sessions }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <MetricCard
        label="Revenue"
        value="₹4.2M"
        delta="-18% vs Forecast"
        trend="down"
        sparklineData={revenueSpark}
        lineColor="var(--danger)"
      />
      <MetricCard
        label="Conversions"
        value="3.8%"
        delta="-2.1% vs Baseline"
        trend="down"
        sparklineData={conversionSpark}
        lineColor="var(--danger)"
      />
      <MetricCard
        label="Sessions"
        value="142K"
        delta="+0.3% vs Yesterday"
        trend="up"
        sparklineData={sessionSpark}
        lineColor="var(--success)"
      />
    </div>
  );
}
