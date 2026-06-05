import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import timeseriesData from "../../../../data/analytics/revenue-timeseries.json";

// Custom tooltip renderer
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const actual = payload[0].value;
    const forecast = payload[1].value;
    const deviation = Math.round(((actual - forecast) / forecast) * 100);

    return (
      <div className="p-3 bg-bg-card border border-border-active rounded-lg shadow-xl text-xs space-y-1.5 font-sans select-none">
        <p className="font-semibold text-text-primary">{label}</p>
        <div className="space-y-1">
          <div className="flex justify-between gap-6">
            <span className="text-text-secondary">Actual:</span>
            <span className="font-mono text-text-primary">₹{actual.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-text-secondary">Forecast:</span>
            <span className="font-mono text-text-accent">₹{forecast.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6 border-t border-border-subtle pt-1 mt-1 font-medium">
            <span className="text-text-secondary">Deviation:</span>
            <span className={`font-mono ${deviation < 0 ? "text-danger" : "text-success"}`}>
              {deviation > 0 ? `+${deviation}` : deviation}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Custom renderer for the anomaly point
const RenderAnomalyDot = (props) => {
  const { cx, cy, payload } = props;
  
  if (payload.date === "2025-06-01") {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={10}
          fill="var(--danger)"
          className="animate-ping"
          opacity={0.3}
        />
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="var(--danger)"
          stroke="white"
          strokeWidth={1.5}
        />
        <text
          x={cx - 50}
          y={cy - 15}
          fill="var(--danger)"
          fontSize={10}
          fontWeight="bold"
          fontFamily="var(--font-sans)"
          className="bg-bg-card"
        >
          ANOMALY DETECTED
        </text>
      </g>
    );
  }

  return null;
};

export default function ForecastChart() {
  // Format data to support range shading in Area (deviation zone)
  const chartData = timeseriesData.map((d) => ({
    ...d,
    // Range: [actual, predicted]
    deviation: [d.revenue, d.forecast_revenue],
    dateFormatted: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  const formatYAxis = (tick) => {
    return `₹${(tick / 1000).toFixed(0)}K`;
  };

  return (
    <div className="w-full h-[320px] bg-bg-card border border-border-subtle rounded-xl p-4 shadow-sm select-none">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Actual Revenue vs. Predictive ML Forecast (Last 30 Days)
        </h4>
        <div className="flex items-center gap-4 text-[10px] text-text-secondary font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-text-primary" />
            <span>Actual Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-accent-primary" />
            <span>ML Target Forecast</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-danger/10" />
            <span>Deviation Zone</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" />
          <XAxis
            dataKey="dateFormatted"
            stroke="var(--text-muted)"
            fontSize={9}
            tickLine={false}
          />
          <YAxis
            stroke="var(--text-muted)"
            fontSize={9}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxis}
            domain={[100000, 170000]}
          />
          
          <Tooltip content={<CustomTooltip />} />

          {/* Area between actual and predicted (shaded deviation zone) */}
          <Area
            type="monotone"
            dataKey="deviation"
            stroke="none"
            fill="var(--danger)"
            fillOpacity={0.1}
          />

          {/* Line 1: ML Target Forecast (Dashed Indigo) */}
          <Line
            type="monotone"
            dataKey="forecast_revenue"
            stroke="var(--accent-primary)"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
            activeDot={false}
          />

          {/* Line 2: Actual Revenue (Solid White) */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--text-primary)"
            strokeWidth={2}
            dot={<RenderAnomalyDot />}
            activeDot={{ r: 6, fill: "var(--accent-secondary)", strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
