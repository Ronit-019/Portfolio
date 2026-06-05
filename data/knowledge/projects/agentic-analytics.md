# Agentic Analytics Dashboard

## Overview
An interactive monitoring system styled like Datadog, demonstrating AI-augmented anomaly detection and automated root cause analysis.

## Technical Details
- **Stack**: Next.js, React, Tailwind CSS, Recharts, Lucide React, Gemini API
- **Key Features**:
  - Live revenue, conversion, and session metrics tracking.
  - Anomaly alerting system.
  - Interactive "Investigate" panel that displays actual vs. forecast charts using Recharts.
  - AI root cause analyzer that simulates agent diagnostic runs (evaluating checkout funnels, database logs, and marketing ad spend channels).

## Learnings & Impact
- **Impact**: Demonstrates a modern paradigm in developer tooling where monitoring dashboards don't just alert users when something is broken, but proactively investigate and recommend specific actions.
- **Learning**: Gained deep experience configuring complex charts using Recharts (`ComposedChart`, `ReferenceArea`, custom tooltip overrides) and managing UI states using Zustand.
