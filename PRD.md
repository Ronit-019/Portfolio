# RONIT OS — Product Requirements Document (PRD)

**Version:** 1.0  
**Author:** Ronit  
**Document Type:** Full-Stack Product Specification  
**Target Audience:** Agentic IDE / AI Developer Agent  
**Purpose:** Complete specification to build the Ronit OS portfolio website from scratch

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Design System & Global UI Standards](#2-design-system--global-ui-standards)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Section 1 — AI Assistant (Landing Page)](#5-section-1--ai-assistant-landing-page)
6. [Section 2 — Analytics War Room](#6-section-2--analytics-war-room)
7. [Section 3 — Project Command Center](#7-section-3--project-command-center)
8. [Section 4 — Architecture Gallery](#8-section-4--architecture-gallery)
9. [Section 5 — Engineering Journal](#9-section-5--engineering-journal)
10. [Section 6 — Timeline of Growth](#10-section-6--timeline-of-growth)
11. [Section 7 — GitHub Intelligence](#11-section-7--github-intelligence)
12. [Section 8 — Resume Hub](#12-section-8--resume-hub)
13. [Section 9 — Command Palette](#13-section-9--command-palette)
14. [Global Navigation Sidebar](#14-global-navigation-sidebar)
15. [Backend / API Layer](#15-backend--api-layer)
16. [AI Knowledge Base](#16-ai-knowledge-base)
17. [Deployment](#17-deployment)
18. [Assets Checklist](#18-assets-checklist)

---

## 1. Product Overview

### 1.1 Vision

**Ronit OS** is not a portfolio website — it is an operating system for understanding Ronit as an engineer. Inspired by the aesthetic and UX of ChatGPT, Cursor, Notion, and Datadog combined, it presents Ronit's work, thinking, architecture decisions, and growth trajectory as a living product rather than a static resume.

### 1.2 Core User (Recruiter) Journey

Within 60 seconds of landing, a recruiter must be able to answer:

| Question | Section That Answers It |
|---|---|
| Who is Ronit? | AI Assistant — landing page |
| What has he built? | Project Command Center |
| How does he think? | Engineering Journal + Architecture Gallery |
| Why should I interview him? | Analytics War Room + Resume Hub |

### 1.3 Success Criteria

- AI Assistant responds accurately within 3 seconds
- All sections load under 2 seconds
- Mobile-responsive on all screen sizes ≥ 375px
- Command Palette (Ctrl+K) is functional across all sections
- Zero broken links or placeholder content at launch

---

## 2. Design System & Global UI Standards

### 2.1 Visual Identity

The aesthetic is **dark-mode OS / developer tooling** — not a typical portfolio. Think VS Code meets Datadog.

| Token | Value |
|---|---|
| `--bg-primary` | `#0a0a0f` |
| `--bg-surface` | `#111118` |
| `--bg-card` | `#16161f` |
| `--bg-hover` | `#1e1e2e` |
| `--border-subtle` | `#1e1e2e` |
| `--border-active` | `#3b3b52` |
| `--accent-primary` | `#6366f1` (Indigo) |
| `--accent-secondary` | `#8b5cf6` (Violet) |
| `--accent-glow` | `rgba(99, 102, 241, 0.15)` |
| `--text-primary` | `#e2e8f0` |
| `--text-secondary` | `#94a3b8` |
| `--text-muted` | `#475569` |
| `--text-accent` | `#818cf8` |
| `--success` | `#22c55e` |
| `--warning` | `#f59e0b` |
| `--danger` | `#ef4444` |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` |
| `--font-sans` | `'Inter', system-ui, sans-serif` |
| `--radius-sm` | `6px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `16px` |

### 2.2 Typography Scale

```
Display:  32px / 700 weight / --font-sans
H1:       24px / 700 weight / --font-sans
H2:       20px / 600 weight / --font-sans
H3:       16px / 600 weight / --font-sans
Body:     14px / 400 weight / --font-sans
Small:    12px / 400 weight / --font-sans
Mono:     13px / 400 weight / --font-mono
```

### 2.3 Spacing System

Use an 8px base grid. Standard spacings: `4, 8, 12, 16, 24, 32, 48, 64px`.

### 2.4 Component Standards

- **Cards:** `background: --bg-card`, `border: 1px solid --border-subtle`, `border-radius: --radius-md`, subtle box-shadow on hover
- **Buttons — Primary:** `background: --accent-primary`, white text, hover: lighten 10%
- **Buttons — Ghost:** transparent background, `border: 1px solid --border-active`, text: `--text-secondary`
- **Input fields:** `background: --bg-surface`, `border: 1px solid --border-subtle`, focus: `border-color: --accent-primary`, `box-shadow: 0 0 0 3px --accent-glow`
- **Scrollbars:** Thin, `2-4px`, color `--border-active`, transparent track
- **Animations:** Prefer `ease-out` curves, max 300ms for transitions, 500ms for page-level animations
- **Loading states:** Skeleton loaders using `--bg-hover` animated shimmer
- **Badges/tags:** Small pill with slight color fill matching the tag category

### 2.5 Sidebar Layout (Global Shell)

The entire app lives inside a **two-column layout**:

```
┌──────────────────────────────────────────────────────┐
│  SIDEBAR (240px fixed)  │  MAIN CONTENT (flex-grow)  │
└──────────────────────────────────────────────────────┘
```

On mobile (< 768px): sidebar collapses to a hamburger menu drawer.

---

## 3. Tech Stack

### 3.1 Frontend

| Layer | Technology | Reason |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSR, file-based routing, API routes |
| Language | **TypeScript** | Type safety across all components |
| Styling | **Tailwind CSS** + CSS Variables | Utility-first + custom design tokens |
| UI Components | **shadcn/ui** | Headless, accessible, Tailwind-compatible |
| Icons | **Lucide React** | Consistent icon library |
| Animations | **Framer Motion** | Page transitions, timeline, card hovers |
| Charts/Viz | **Recharts** | Revenue charts, anomaly graphs |
| Diagrams | **React Flow** | Interactive architecture diagrams |
| Syntax Highlighting | **Shiki** or **Prism** | Code blocks in journal entries |
| State Management | **Zustand** | Lightweight global state (sidebar, palette) |
| Markdown | **react-markdown** + **remark-gfm** | Journal entries, README rendering |

### 3.2 Backend (API Routes in Next.js)

| Feature | Technology |
|---|---|
| AI Chat | **Anthropic Claude API** (claude-3-5-haiku for speed) OR **OpenAI GPT-4o-mini** |
| Vector Search | **Pinecone** (hosted) OR **Chroma** (local dev) |
| Embeddings | `text-embedding-3-small` (OpenAI) |
| GitHub Data | **GitHub REST API v3** (public, no auth required for public repos) |
| RAG Pipeline | Custom Next.js API route using LangChain.js |

### 3.3 Data / Storage

| Data Type | Storage |
|---|---|
| Knowledge base (docs, resume, project info) | Markdown files in `/data/knowledge/` |
| Simulated analytics data | Static JSON files in `/data/analytics/` |
| Vector embeddings | Pinecone index OR local JSON file for demo |
| GitHub stats cache | In-memory or Vercel KV (15-min TTL) |

### 3.4 Deployment

| Service | Provider |
|---|---|
| Hosting | **Vercel** |
| Environment Variables | Vercel Environment Variables |
| Domain | Custom domain via Vercel |
| Analytics | Vercel Analytics (optional) |

---

## 4. Project Structure

```
ronit-os/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with sidebar shell
│   ├── page.tsx                  # Redirects to /assistant
│   ├── assistant/
│   │   └── page.tsx              # Section 1: AI Assistant
│   ├── analytics/
│   │   └── page.tsx              # Section 2: Analytics War Room
│   ├── projects/
│   │   ├── page.tsx              # Section 3: Projects list
│   │   └── [slug]/
│   │       └── page.tsx          # Individual project page
│   ├── architecture/
│   │   ├── page.tsx              # Section 4: Architecture gallery
│   │   └── [slug]/
│   │       └── page.tsx          # Individual architecture page
│   ├── journal/
│   │   └── page.tsx              # Section 5: Engineering journal
│   ├── timeline/
│   │   └── page.tsx              # Section 6: Timeline
│   ├── github/
│   │   └── page.tsx              # Section 7: GitHub Intelligence
│   └── resume/
│       └── page.tsx              # Section 8: Resume Hub
│
├── api/                          # Next.js API routes (inside app/)
│   ├── app/api/chat/route.ts     # AI assistant endpoint
│   ├── app/api/github/route.ts   # GitHub data endpoint
│   └── app/api/embed/route.ts    # Embedding + vector search
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── CommandPalette.tsx
│   │   └── TopBar.tsx
│   ├── assistant/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatMessage.tsx
│   │   └── SuggestedQuestions.tsx
│   ├── analytics/
│   │   ├── MetricsBar.tsx
│   │   ├── AlertBanner.tsx
│   │   ├── ForecastChart.tsx
│   │   └── InvestigationPanel.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectDetail.tsx
│   ├── architecture/
│   │   ├── ArchCard.tsx
│   │   └── FlowDiagram.tsx
│   ├── journal/
│   │   └── JournalEntry.tsx
│   ├── timeline/
│   │   └── TimelineNode.tsx
│   ├── github/
│   │   ├── StatsOverview.tsx
│   │   └── RepoCard.tsx
│   └── resume/
│       ├── ResumeSection.tsx
│       └── AIFitAnalyzer.tsx
│
├── data/
│   ├── knowledge/                # Markdown files for RAG
│   │   ├── about.md
│   │   ├── resume.md
│   │   ├── internship.md
│   │   ├── projects/
│   │   │   ├── smartcv.md
│   │   │   ├── real-estate.md
│   │   │   ├── data-science-copilot.md
│   │   │   └── agentic-analytics.md
│   │   └── certifications.md
│   ├── analytics/
│   │   ├── revenue-timeseries.json
│   │   └── anomalies.json
│   ├── projects.ts               # Projects config/data
│   ├── architecture.ts           # Architecture diagrams config
│   ├── journal.ts                # Journal entries
│   └── timeline.ts               # Timeline events
│
├── lib/
│   ├── ai.ts                     # AI client setup
│   ├── rag.ts                    # RAG pipeline
│   ├── github.ts                 # GitHub API wrapper
│   └── utils.ts                  # Shared utilities
│
├── public/
│   ├── headshot.jpg
│   ├── resume.pdf
│   └── diagrams/                 # Architecture diagram images/SVGs
│
├── styles/
│   └── globals.css               # CSS variables, base styles
│
├── .env.local                    # API keys (not committed)
└── tailwind.config.ts
```

---

## 5. Section 1 — AI Assistant (Landing Page)

### 5.1 Purpose

This is the homepage. It replaces a traditional "About Me" page with an interactive AI chat interface that knows everything about Ronit.

### 5.2 Route

`/assistant` (default route, `/` redirects here)

### 5.3 Layout Specification

```
┌─────────────────────────────────────────────────────┐
│  RONIT OS                               [status dot] │
│  Ask me anything about Ronit                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Chat message area — scrollable]                   │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │ 👤 You: Show SmartCV architecture             │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │ 🤖 Ronit OS: [Response text]                  │  │
│  │    [Optional: opens Architecture Gallery]     │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Suggested:                                         │
│  [What did Ronit do during his internship?]         │
│  [Show SmartCV architecture]                        │
│  [Explain anomaly detection project]                │
│  [Why should I hire Ronit?]                         │
│  [Show GitHub projects]                             │
├─────────────────────────────────────────────────────┤
│  [ Ask me anything about Ronit...        ] [Send ↑] │
└─────────────────────────────────────────────────────┘
```

### 5.4 Component Requirements

**`ChatWindow.tsx`**
- Renders conversation history
- Auto-scrolls to bottom on new message
- Shows typing indicator (animated 3-dot pulse) while AI responds
- Streams AI response token-by-token (using streaming fetch)
- Supports Markdown in AI responses (bold, bullet lists, code blocks)
- Stores conversation in component state (no persistence required)

**`ChatMessage.tsx`**
- Two variants: `user` and `assistant`
- User bubble: right-aligned, `--accent-primary` background
- Assistant bubble: left-aligned, `--bg-card` background, with small "RO" avatar
- Timestamps shown in muted text
- Assistant messages support a special `action` field — if the AI returns a navigation intent, render a clickable button like `[Open Architecture Gallery →]`

**`SuggestedQuestions.tsx`**
- Horizontal scrollable row of pill buttons
- 5 default questions (see below)
- Clicking a suggestion populates the input field and auto-submits
- Questions disappear once the first user message is sent
- Default suggestions:
  1. "What did Ronit do during his internship?"
  2. "Show SmartCV architecture"
  3. "Explain the anomaly detection project"
  4. "Why should I hire Ronit?"
  5. "Show his GitHub projects"

**Chat Input**
- Full-width text input, `--bg-surface` background
- Send button with arrow-up icon
- `Enter` key submits, `Shift+Enter` adds newline
- Disabled + loading state while AI is responding
- Placeholder: `"Ask me anything about Ronit..."`

### 5.5 AI Behavior — Navigation Intents

The AI assistant should detect navigation intent in user queries and return a structured response. Define an intent parser in the RAG/chat API:

| User Input Pattern | Intent | Action |
|---|---|---|
| "show architecture", "smartcv architecture" | `OPEN_ARCHITECTURE` | Button to `/architecture/smartcv` |
| "show projects", "what projects" | `OPEN_PROJECTS` | Button to `/projects` |
| "open analytics", "war room" | `OPEN_ANALYTICS` | Button to `/analytics` |
| "show resume", "download cv" | `OPEN_RESUME` | Button to `/resume` |
| "github", "repositories" | `OPEN_GITHUB` | Button to `/github` |

System prompt must instruct the AI: when a navigation intent is detected, append a JSON block at the end of the response like:
```json
{"action": "navigate", "path": "/architecture/smartcv", "label": "Open SmartCV Architecture"}
```

The frontend parses this and renders the navigation button.

### 5.6 API Endpoint — `/api/chat`

**Method:** `POST`  
**Request Body:**
```typescript
{
  messages: Array<{ role: "user" | "assistant", content: string }>,
  stream: boolean  // true for streaming
}
```

**Response:** Server-Sent Events stream (or JSON if stream=false)

**Implementation:**
1. Take the last user message
2. Run semantic search against the vector knowledge base (top 5 chunks)
3. Inject retrieved context into the system prompt
4. Call LLM API with full message history + context
5. Stream response back
6. Parse navigation intent from final response text before sending to client

**System Prompt Template:**
```
You are Ronit OS, an AI assistant representing Ronit [Last Name], a Data Engineer / ML Engineer. 
You answer questions about Ronit's background, projects, skills, and experience.
Be concise, confident, and specific. Use data and metrics when available.
Only answer based on the provided context. If unsure, say so honestly.

CONTEXT FROM KNOWLEDGE BASE:
{retrieved_chunks}

If the user asks to "show", "open", or "navigate to" a specific section, 
append a JSON navigation intent at the very end of your response.
```

---

## 6. Section 2 — Analytics War Room

### 6.1 Purpose

Demonstrates Ronit's ability to build monitoring systems, forecasting pipelines, and AI-augmented analytics. This is the most technically impressive section.

### 6.2 Route

`/analytics`

### 6.3 Layout — Landing View

```
┌────────────────────────────────────────────────────────┐
│  Revenue Monitoring System                   [Live ●]  │
├────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Revenue     │  │  Conversions │  │  Sessions    │  │
│  │  ₹4.2M       │  │  3.8%        │  │  142K        │  │
│  │  ↓ -18%      │  │  ↓ -2.1%    │  │  → +0.3%     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
├────────────────────────────────────────────────────────┤
│  ⚠ ANOMALIES DETECTED TODAY: 2                         │
│                                                        │
│  🔴 Revenue dropped 18% vs forecast (11:30 AM)         │
│     [ Investigate → ]                                   │
│                                                        │
│  🟡 Mobile checkout failure rate elevated (09:15 AM)   │
│     [ Investigate → ]                                   │
└────────────────────────────────────────────────────────┘
```

### 6.4 Component: `MetricsBar.tsx`

Renders 3 KPI cards side by side.

Each card displays:
- **Label:** e.g., "Revenue"
- **Value:** formatted number (use `Intl.NumberFormat`)
- **Delta:** colored badge: red for negative (↓), green for positive (↑), gray for neutral (→)
- **Sparkline:** small 7-day trend line (use Recharts `LineChart` minimal variant)

Data source: `/data/analytics/revenue-timeseries.json`

```typescript
// Schema for revenue-timeseries.json
type MetricsData = {
  date: string;          // "2025-06-01"
  revenue: number;
  conversions: number;
  sessions: number;
  forecast_revenue: number;
}[]
```

### 6.5 Component: `AlertBanner.tsx`

- Fixed bar below metrics, styled in `--danger` red tint if anomalies exist
- Shows count of anomalies
- Lists each anomaly with timestamp and brief description
- Each row has an "Investigate →" button that switches the main view to Investigation View

### 6.6 Layout — Investigation View

Clicking "Investigate" opens an expanded panel:

```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Overview                                     │
│  Investigation: Revenue Drop — June 1, 11:30 AM         │
├─────────────────────────────────────────────────────────┤
│  FORECAST vs ACTUAL (last 30 days)                      │
│  [Line Chart — Recharts]                                │
│  - Predicted Revenue (dashed blue line)                 │
│  - Actual Revenue (solid white line)                    │
│  - Deviation zone (shaded red area between lines)       │
│  - Anomaly point marked with red dot + label            │
├─────────────────────────────────────────────────────────┤
│  AI ANALYSIS                              [Gemini icon] │
│                                                         │
│  Potential Root Causes:                                 │
│  1. Google Ads spend dropped by 34% (Campaign ended)    │
│  2. Mobile checkout error rate: 12% (↑ from 2%)        │
│  3. Weekend traffic pattern deviation                   │
│                                                         │
│  Recommended Actions:                                   │
│  [Check Ads Account]  [Review Checkout Funnel]          │
│  [Inspect Mobile Sessions]                              │
├─────────────────────────────────────────────────────────┤
│  WHAT THIS DEMONSTRATES                                 │
│  BigQuery ML  ·  Forecasting  ·  Analytics Agents       │
│  Anomaly Detection  ·  Business Thinking                │
└─────────────────────────────────────────────────────────┘
```

### 6.7 Component: `ForecastChart.tsx`

Built with Recharts `ComposedChart`:
- X-axis: dates
- Y-axis: revenue values
- Line 1: Predicted revenue — dashed, blue (`#6366f1`), `strokeDasharray="5 5"`
- Line 2: Actual revenue — solid, white (`--text-primary`)
- Area between lines: `ReferenceArea` shaded red with 20% opacity when actual < predicted
- Custom `dot` renderer for the anomaly point (large red circle)
- Custom tooltip showing date, actual, predicted, deviation %

Data source: `/data/analytics/revenue-timeseries.json`

### 6.8 Component: `InvestigationPanel.tsx`

- "AI Analysis" section with typing animation that runs on mount (simulated AI reasoning)
- Root causes numbered list
- Recommended Actions as clickable ghost buttons (buttons do nothing — this is simulated)
- "What This Demonstrates" tag section with skill badges

### 6.9 Data: `anomalies.json`

```typescript
type Anomaly = {
  id: string;
  timestamp: string;
  metric: "revenue" | "conversions" | "sessions";
  severity: "critical" | "warning";
  title: string;
  description: string;
  root_causes: string[];
  recommended_actions: string[];
  demonstrates: string[];
}[]
```

---

## 7. Section 3 — Project Command Center

### 7.1 Purpose

Showcases all projects in a Netflix-style browsable interface with deep individual project pages.

### 7.2 Route

`/projects` and `/projects/[slug]`

### 7.3 Projects to Include

| Slug | Title | Status |
|---|---|---|
| `smartcv` | SmartCV | Complete |
| `data-science-copilot` | Data Science Copilot | Complete |
| `real-estate-recommender` | Real Estate Recommender | Complete |
| `agentic-analytics` | Agentic Analytics | Complete |

### 7.4 Layout — Projects List Page

```
┌────────────────────────────────────────────────────────┐
│  PROJECTS                                              │
│  Building things that think.                          │
├────────────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │  SmartCV     │ │  Data Sci.   │ │  Real Estate │   │
│  │  [Hero Img]  │ │  Copilot     │ │  Recommender │   │
│  │  AI·LangGraph│ │  [Hero Img]  │ │  [Hero Img]  │   │
│  │  [View →]    │ │  [View →]    │ │  [View →]    │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                        │
│  ┌──────────────┐                                      │
│  │  Agentic     │                                      │
│  │  Analytics   │                                      │
│  │  [Hero Img]  │                                      │
│  │  [View →]    │                                      │
│  └──────────────┘                                      │
└────────────────────────────────────────────────────────┘
```

### 7.5 Component: `ProjectCard.tsx`

- Fixed aspect ratio card (16:9 or 4:3)
- Hero image or animated gradient placeholder
- Project title overlay (bottom-left)
- Tech stack tags (bottom-right, max 3 visible)
- Hover: card lifts with box-shadow, "View Project →" CTA appears with slide-up animation
- Click: navigates to `/projects/[slug]`

### 7.6 Layout — Individual Project Page

Structure is a long-scroll single-column page with clear sections:

```
┌──────────────────────────────────────────────────┐
│  ← Projects                                      │
│                                                  │
│  SmartCV                                         │
│  AI-powered resume matching for students         │
├──────────────────────────────────────────────────┤
│  THE PROBLEM                                     │
│  Students apply blindly to hundreds of jobs...  │
├──────────────────────────────────────────────────┤
│  THE SOLUTION                                    │
│  AI-powered job matching using semantic search  │
├──────────────────────────────────────────────────┤
│  ARCHITECTURE                                    │
│  [Diagram / React Flow embed]                   │
│  [Full Diagram →]                                │
├──────────────────────────────────────────────────┤
│  DEMO                                            │
│  [GIF / Video embed]                             │
├──────────────────────────────────────────────────┤
│  TECH STACK                                      │
│  [LangGraph] [HuggingFace] [FAISS] [Streamlit]  │
├──────────────────────────────────────────────────┤
│  CHALLENGES                                      │
│  1. Resume parsing inconsistency across formats  │
│  2. Ranking quality for ambiguous queries        │
│  3. Prompt tuning for domain-specific matching   │
├──────────────────────────────────────────────────┤
│  LEARNINGS                                       │
│  - Agent orchestration with LangGraph            │
│  - Semantic search with FAISS                    │
│  - Workflow design patterns                      │
├──────────────────────────────────────────────────┤
│  [View on GitHub ↗]                              │
├──────────────────────────────────────────────────┤
│  FUTURE ROADMAP                                  │
│  ○ Live deployment on GCP                        │
│  ○ Resume scoring module                         │
│  ○ Interview simulator                           │
└──────────────────────────────────────────────────┘
```

### 7.7 Data Schema: `projects.ts`

```typescript
type Project = {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;            // path in /public/projects/
  problem: string;              // paragraph
  solution: string;             // paragraph
  architectureSlug: string;     // links to /architecture/[slug]
  demoGif?: string;             // path in /public/demos/
  demoVideo?: string;           // YouTube embed URL
  techStack: Array<{
    name: string;
    icon?: string;
    color?: string;
  }>;
  challenges: string[];
  learnings: string[];
  githubUrl: string;
  futureRoadmap: string[];
}
```

---

## 8. Section 4 — Architecture Gallery

### 8.1 Purpose

Shows system design thinking through interactive architecture diagrams. This is what separates Ronit from candidates who only list technologies.

### 8.2 Route

`/architecture` and `/architecture/[slug]`

### 8.3 Diagrams to Include

| Slug | Title |
|---|---|
| `smartcv` | SmartCV Architecture |
| `analytics-agent` | Analytics Agent Architecture |
| `forecasting-pipeline` | Forecasting Pipeline |
| `data-science-copilot` | Data Science Copilot |

### 8.4 Layout — Gallery Landing

Grid of architecture cards, similar to Projects but with a diagram thumbnail preview.

### 8.5 Component: `FlowDiagram.tsx`

Built using **React Flow** (`reactflow` npm package):

- Each architecture is defined as a set of **nodes** and **edges** in a config file
- Nodes are custom-styled with `--bg-card` background, `--accent-primary` border
- Edges use animated dashes (`animated: true` in React Flow)
- **Hover on a node** opens a side panel (or tooltip) with:
  - **Purpose:** What this component does
  - **Input:** What data it receives
  - **Output:** What data it produces
  - **Limitations:** Known constraints or tradeoffs

**Example node structure for SmartCV:**

```typescript
const nodes = [
  { id: "frontend", label: "Streamlit Frontend", type: "input" },
  { id: "fastapi", label: "FastAPI", type: "default" },
  { id: "langgraph", label: "LangGraph Agent", type: "default" },
  { id: "gemini", label: "Gemini LLM", type: "default" },
  { id: "faiss", label: "FAISS Vector DB", type: "output" },
];

const edges = [
  { id: "e1-2", source: "frontend", target: "fastapi" },
  { id: "e2-3", source: "fastapi", target: "langgraph" },
  { id: "e3-4", source: "langgraph", target: "gemini" },
  { id: "e3-5", source: "langgraph", target: "faiss" },
];
```

### 8.6 Layout — Individual Architecture Page

```
┌──────────────────────────────────────────────────┐
│  ← Architecture Gallery                          │
│  SmartCV Architecture                            │
│  Hover components to explore                     │
├──────────────────────────────────────────────────┤
│  [React Flow Diagram — full width, ~500px tall]  │
│  [Interactive, pannable, zoomable]               │
├──────────────────────────────────────────────────┤
│  [Component Detail Panel — appears on hover]    │
│  Component: LangGraph Agent                      │
│  Purpose: Orchestrates multi-step reasoning      │
│  Input: Parsed resume + job description          │
│  Output: Ranked job matches with scores          │
│  Limitations: Latency on >10 concurrent users   │
├──────────────────────────────────────────────────┤
│  LESSONS LEARNED                                 │
│  Why this design? ...                            │
│  What failed first? ...                          │
│  What changed? ...                               │
└──────────────────────────────────────────────────┘
```

### 8.7 Data Schema: `architecture.ts`

```typescript
type ArchitectureConfig = {
  slug: string;
  title: string;
  description: string;
  nodes: Array<{
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
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    label?: string;
  }>;
  lessons: {
    whyThisDesign: string;
    whatFailed: string;
    whatChanged: string;
  };
}
```

---

## 9. Section 5 — Engineering Journal

### 9.1 Purpose

A chronological log of real engineering decisions, failures, and learnings. This demonstrates mature engineering thinking that almost no other candidate will have.

### 9.2 Route

`/journal`

### 9.3 Layout

```
┌──────────────────────────────────────────────────┐
│  Engineering Journal                             │
│  Thinking out loud about real problems.         │
├──────────────────────────────────────────────────┤
│  [Entry 1]  Jun 2025  Analytics Agent           │
│  ─────────────────────────────────────────────  │
│  Problem: Analysts were ignoring alerts         │
│  Failed Solution: Static thresholds             │
│  Why it failed: Too many false positives        │
│  New Approach: Gemini validation layer          │
│  Outcome: 75% reduction in alert noise          │
│  What I Learned: Accuracy alone isn't enough.  │
│                  Trust is the real metric.      │
│                                                 │
│  [Entry 2]  Apr 2025  SmartCV                   │
│  ...                                            │
└──────────────────────────────────────────────────┘
```

### 9.4 Component: `JournalEntry.tsx`

Each entry is a card with structured sections:

| Field | Label | Style |
|---|---|---|
| `date` | Date badge | Muted pill, top-right |
| `project` | Project tag | Color-coded pill |
| `problem` | 🔴 Problem | Red left-border section |
| `failedSolution` | ❌ Failed Solution | Orange section |
| `whyItFailed` | Why it failed | Sub-text under failed solution |
| `newApproach` | ✅ New Approach | Green section |
| `outcome` | 📊 Outcome | Metric badge if number included |
| `whatILearned` | 💡 What I Learned | Italic, indented, accent color |

Entries are listed in reverse-chronological order (newest first).

### 9.5 Data Schema: `journal.ts`

```typescript
type JournalEntry = {
  id: string;
  date: string;                  // "June 2025"
  project: string;               // "Analytics Agent"
  projectSlug?: string;          // links to project page
  problem: string;
  failedSolution: string;
  whyItFailed: string;
  newApproach: string;
  outcome: string;               // Include metrics if available
  whatILearned: string[];        // Array of insight strings
}
```

### 9.6 Minimum Required Entries

Include at least **3 real entries**. Suggested:

1. Analytics Agent — alert noise problem
2. SmartCV — resume parsing failures
3. Real Estate Recommender — model accuracy vs user trust

---

## 10. Section 6 — Timeline of Growth

### 10.1 Purpose

Visualizes Ronit's evolution from beginner to agentic AI builder. Shows trajectory, not just a list of accomplishments.

### 10.2 Route

`/timeline`

### 10.3 Layout

Vertical timeline, centered, alternating left/right nodes on desktop. Mobile: single left-aligned column.

```
2023 ──● Started Python & Data Science
       │
2024 ──● Built First ML Projects
       │
2025 ──● Real Estate Recommender (GCP)
       │
2025 ──● Internship @ [Company]
       │
2026 ──● Agentic AI Systems (SmartCV, Analytics)
```

Each node is clickable and expands an info panel:

```
┌────────────────────────────────────────┐
│  Agentic AI Systems                    │
│  2026                                  │
├────────────────────────────────────────┤
│  Context: Built multi-agent pipelines  │
│  using LangGraph and Gemini...         │
│                                        │
│  Challenge: Managing state across      │
│  long agent reasoning chains           │
│                                        │
│  Skill Gained: Agent orchestration,    │
│  prompt engineering, vector retrieval  │
│                                        │
│  Impact: Deployed systems that         │
│  reduced analyst workload by 40%       │
└────────────────────────────────────────┘
```

### 10.4 Animation

- On page load: timeline line draws top-to-bottom using CSS `@keyframes` (SVG stroke-dashoffset animation)
- Each node fades in sequentially with staggered delay using Framer Motion
- Expanded panel slides in from right (desktop) or down (mobile)

### 10.5 Component: `TimelineNode.tsx`

Props:
```typescript
type TimelineEvent = {
  year: string;
  title: string;
  context: string;
  challenge: string;
  skillGained: string;
  impact: string;
  tags?: string[];
}
```

### 10.6 Data: `timeline.ts`

Minimum **5 nodes** covering 2023–2026.

---

## 11. Section 7 — GitHub Intelligence

### 11.1 Purpose

Replaces a GitHub link with an embedded intelligence dashboard showing contribution patterns, language usage, and highlighted repositories.

### 11.2 Route

`/github`

### 11.3 Layout

```
┌────────────────────────────────────────────────────────┐
│  GitHub Intelligence                    [@username ↗]  │
├────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  42      │  │  1.2K    │  │  Python  │  │  3     │ │
│  │ Repos    │  │ Commits  │  │ Top Lang │  │ Stars  │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
├────────────────────────────────────────────────────────┤
│  LANGUAGE BREAKDOWN                                    │
│  [Horizontal bar chart — Recharts]                    │
│  Python ████████████ 67%                              │
│  JavaScript ████ 18%                                  │
│  TypeScript ██ 9%                                     │
│  Other ██ 6%                                          │
├────────────────────────────────────────────────────────┤
│  HIGHLIGHTED REPOSITORIES                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  SmartCV                         ⭐ 12  🍴 3     │  │
│  │  AI resume matcher using LangGraph + FAISS        │  │
│  │  [Python] [LangChain] [Streamlit]                 │  │
│  │  Last commit: 3 days ago                          │  │
│  └──────────────────────────────────────────────────┘  │
│  (repeat for Analytics Agent, Data Science Copilot)   │
└────────────────────────────────────────────────────────┘
```

### 11.4 API Endpoint: `/api/github`

- Fetches data from `https://api.github.com/users/{username}/repos`
- Returns: repo list, language stats, commit count (approximate)
- Caches response for 15 minutes to avoid rate limits
- Uses `GITHUB_USERNAME` env variable

```typescript
// Response shape
type GitHubData = {
  stats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    topLanguage: string;
  };
  languages: Array<{ name: string; percentage: number }>;
  featuredRepos: Array<{
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    topics: string[];
    updatedAt: string;
    url: string;
  }>;
}
```

### 11.5 Featured Repositories

Hardcode a list of featured repo names in `/lib/github.ts`. These are always shown first at the top, followed by other public repos.

```typescript
const FEATURED_REPOS = ["smartcv", "analytics-agent", "data-science-copilot"];
```

### 11.6 Component: `RepoCard.tsx`

- Shows: name (linked), description, language badge, stars, forks, last updated
- Has an "Architecture →" button if the repo has a matching architecture config
- Has a "View Project →" button if the repo has a matching project config
- Tags/topics shown as small pills

---

## 12. Section 8 — Resume Hub

### 12.1 Purpose

Transforms a static PDF download into an interactive Resume Intelligence Center with AI-powered fit analysis.

### 12.2 Route

`/resume`

### 12.3 Layout

```
┌──────────────────────────────────────────────────┐
│  Resume Intelligence Center                      │
│                             [Download PDF ↓]    │
├──────────────────────────────────────────────────┤
│  [Experience]  [Projects]  [Skills]  [Certs]    │
│  (tab navigation)                                │
├──────────────────────────────────────────────────┤
│  EXPERIENCE TAB                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  [Company] · [Role] · [Duration]           │  │
│  │  ● Contribution 1                          │  │
│  │  ● Contribution 2                          │  │
│  │  ● Contribution 3                          │  │
│  └────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────┤
│  AI FIT ANALYZER                                 │
│  "Why am I a fit for [role]?"                    │
│                                                  │
│  [ Data Scientist at [Company]      ] [Analyze] │
│                                                  │
│  [AI-generated fit analysis appears here]        │
└──────────────────────────────────────────────────┘
```

### 12.4 Component: `ResumeSection.tsx`

Tabs:
1. **Experience** — timeline-style list of roles with bullet contributions
2. **Projects** — condensed project list linking to `/projects/[slug]`
3. **Skills** — categorized skill grid (Languages, Frameworks, Cloud, Tools)
4. **Certifications** — certification cards with issuer, date, credential ID

### 12.5 Component: `AIFitAnalyzer.tsx`

- Text input for role name/description
- "Analyze Fit" button
- On submit: calls `/api/chat` with a specialized prompt:
  ```
  Based on Ronit's resume, explain why he is a strong fit for the role: [user input].
  Be specific. Use bullet points. Reference his actual experience and projects.
  ```
- Result renders below input with typing animation
- Loading state: animated skeleton with "Analyzing fit..." text

### 12.6 Resume Data Schema

Store structured resume data in `/data/knowledge/resume.md` (for AI RAG) AND in a TypeScript object in `/data/resume.ts` for the structured tab UI:

```typescript
type ResumeData = {
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    contributions: string[];
  }>;
  projects: Array<{ title: string; slug: string; summary: string }>;
  skills: {
    languages: string[];
    frameworks: string[];
    cloud: string[];
    tools: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
  }>;
}
```

---

## 13. Section 9 — Command Palette

### 13.1 Purpose

Makes the site feel like a real developer application. Users can navigate instantly using keyboard shortcuts.

### 13.2 Trigger

- `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac)
- Also: small keyboard shortcut hint visible in sidebar footer

### 13.3 Layout

Modal overlay, centered, with blurred backdrop:

```
┌──────────────────────────────────────────────────┐
│  ⌘K  [Search or type a command...            ]   │
├──────────────────────────────────────────────────┤
│  NAVIGATION                                      │
│  → AI Assistant              /assistant          │
│  → Analytics War Room        /analytics          │
│  → Projects                  /projects           │
│  → Architecture Gallery      /architecture       │
│  → Engineering Journal       /journal            │
│  → Timeline                  /timeline           │
│  → GitHub Intelligence       /github             │
│  → Resume Hub                /resume             │
├──────────────────────────────────────────────────┤
│  QUICK ACTIONS                                   │
│  → Show SmartCV              opens project page  │
│  → Show internship           opens AI assistant  │
│  → Download Resume           downloads PDF       │
│  → View Architecture         architecture gallery│
└──────────────────────────────────────────────────┘
```

### 13.4 Component: `CommandPalette.tsx`

**Libraries:** Use `cmdk` npm package (headless command palette component)

**Behavior:**
- Open: `Ctrl+K` or `Cmd+K`
- Close: `Escape`, click outside, or after selection
- Fuzzy search filters all commands in real-time
- Arrow keys navigate, `Enter` selects
- Navigation commands: `router.push(path)`
- Quick action commands: route to relevant page with optional pre-filled query
- Global state via Zustand: `useCommandPalette` store with `{ isOpen, toggle, close }`

**Command List (full):**

| Command Label | Action |
|---|---|
| AI Assistant | Navigate to `/assistant` |
| Analytics War Room | Navigate to `/analytics` |
| Projects | Navigate to `/projects` |
| Architecture Gallery | Navigate to `/architecture` |
| Engineering Journal | Navigate to `/journal` |
| Timeline | Navigate to `/timeline` |
| GitHub Intelligence | Navigate to `/github` |
| Resume Hub | Navigate to `/resume` |
| Show SmartCV | Navigate to `/projects/smartcv` |
| Show Internship | Navigate to `/assistant` + pre-fill "What did Ronit do during his internship?" |
| Show SmartCV Architecture | Navigate to `/architecture/smartcv` |
| Download Resume | Trigger PDF download |
| Why should I hire Ronit? | Navigate to `/assistant` + pre-fill the question |

### 13.5 Global Keyboard Listener

In `app/layout.tsx`, add a `useEffect` that listens for `keydown` events:

```typescript
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      toggleCommandPalette();
    }
  };
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);
```

---

## 14. Global Navigation Sidebar

### 14.1 Structure

```
┌──────────────────────┐
│  RONIT OS            │  ← Logo / Brand (links to /assistant)
│  [status: ● Online]  │
├──────────────────────┤
│  [AI icon]  Assistant│  ← Active item: accent color + left border
│  [chart]   Analytics │
│  [folder]  Projects  │
│  [diagram] Arch.     │
│  [book]    Journal   │
│  [clock]   Timeline  │
│  [github]  GitHub    │
│  [file]    Resume    │
├──────────────────────┤
│  ⌘K to search       │  ← Command palette hint
└──────────────────────┘
```

### 14.2 Component: `Sidebar.tsx`

- Each nav item: icon + label
- Active state: `--accent-primary` text, left border `3px solid --accent-primary`, `--bg-hover` background
- Hover state: `--bg-hover` background
- Icons from Lucide React
- Mobile: hidden by default, shown as drawer when hamburger is tapped
- Footer: `⌘K` command palette hint

### 14.3 Nav Items & Icons

| Label | Icon (Lucide) | Route |
|---|---|---|
| Assistant | `MessageCircle` | `/assistant` |
| Analytics | `BarChart3` | `/analytics` |
| Projects | `FolderOpen` | `/projects` |
| Architecture | `GitBranch` | `/architecture` |
| Journal | `BookOpen` | `/journal` |
| Timeline | `Clock` | `/timeline` |
| GitHub | `Github` | `/github` |
| Resume | `FileText` | `/resume` |

---

## 15. Backend / API Layer

### 15.1 `/api/chat` — AI Assistant Endpoint

**File:** `app/api/chat/route.ts`  
**Method:** POST  
**Streaming:** Yes (Server-Sent Events)

**Flow:**
1. Receive `{ messages, stream }` from client
2. Extract last user message text
3. Call `lib/rag.ts` → `retrieveContext(userMessage, topK=5)`
4. Build system prompt with injected context
5. Call LLM API with `stream: true`
6. Pipe stream back to client using `ReadableStream`
7. After full response: parse navigation intent JSON if present

**Environment Variables Required:**
```
OPENAI_API_KEY=sk-...         # or ANTHROPIC_API_KEY
PINECONE_API_KEY=...
PINECONE_INDEX=ronit-os-kb
```

### 15.2 `/api/github` — GitHub Data Endpoint

**File:** `app/api/github/route.ts`  
**Method:** GET  
**Caching:** `next: { revalidate: 900 }` (15 min)

**Flow:**
1. Fetch `https://api.github.com/users/{GITHUB_USERNAME}/repos?per_page=100`
2. Compute language stats from repo language fields
3. Filter and sort featured repos
4. Return structured `GitHubData` object

**Environment Variables Required:**
```
GITHUB_USERNAME=ronit...
GITHUB_TOKEN=ghp_...          # Optional, increases rate limit
```

### 15.3 `/api/embed` — Embedding Endpoint (One-time setup)

**File:** `app/api/embed/route.ts`  
**Method:** POST (protected, only called during setup)

**Flow:**
1. Read all `.md` files from `/data/knowledge/`
2. Chunk each file (512 tokens, 50 token overlap)
3. Generate embeddings via OpenAI `text-embedding-3-small`
4. Upsert to Pinecone index with metadata `{ source, chunk_index, text }`

### 15.4 `lib/rag.ts`

```typescript
export async function retrieveContext(query: string, topK = 5): Promise<string> {
  // 1. Generate embedding for query
  // 2. Query Pinecone for top-K similar chunks
  // 3. Return concatenated text of all chunks
}
```

---

## 16. AI Knowledge Base

### 16.1 Knowledge Base Files (in `/data/knowledge/`)

Every file below must be populated before deployment. These are the RAG source documents.

| File | Content |
|---|---|
| `about.md` | Who Ronit is, background, personality, goals |
| `resume.md` | Full resume in plain text/markdown |
| `internship.md` | Internship company, role, contributions, architecture, metrics, learnings |
| `certifications.md` | All certifications with names, issuers, dates |
| `projects/smartcv.md` | Full SmartCV project details: problem, solution, stack, challenges, metrics |
| `projects/real-estate.md` | Full Real Estate Recommender details |
| `projects/data-science-copilot.md` | Full Data Science Copilot details |
| `projects/agentic-analytics.md` | Full Agentic Analytics details |

### 16.2 Markdown Format Convention

Each knowledge file should follow this format for clean chunking:

```markdown
# [Title]

## Overview
[2-3 paragraphs]

## Key Facts
- Fact 1 with specifics
- Fact 2 with metrics

## Technical Details
[Architecture, stack, decisions]

## Outcomes & Metrics
- Metric 1: X% improvement
- Metric 2: Reduced Y by Z
```

---

## 17. Deployment

### 17.1 Environment Variables (`.env.local`)

```bash
# AI
OPENAI_API_KEY=sk-...
# OR
ANTHROPIC_API_KEY=sk-ant-...

# Vector DB
PINECONE_API_KEY=...
PINECONE_INDEX=ronit-os-kb
PINECONE_ENVIRONMENT=us-east-1

# GitHub
GITHUB_USERNAME=your_username
GITHUB_TOKEN=ghp_...  # optional but recommended

# App
NEXT_PUBLIC_SITE_URL=https://ronit.dev  # your domain
```

### 17.2 Vercel Deployment Steps

1. Push repo to GitHub
2. Connect repo to Vercel project
3. Add all environment variables in Vercel dashboard
4. Set build command: `next build`
5. Set output directory: `.next`
6. Run `/api/embed` once after deployment to populate vector index (can be a script)

### 17.3 Performance Targets

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| AI first token | < 2s |
| Lighthouse Performance | > 85 |
| Mobile Responsive | Yes (all viewports ≥ 375px) |

---

## 18. Assets Checklist

Before feeding this PRD to the IDE, ensure these files are ready:

### Personal
- [ ] Professional headshot — `public/headshot.jpg` (min 400×400px, square crop)
- [ ] Resume PDF — `public/resume.pdf`

### Projects (for each of 4 projects)
- [ ] Hero image — `public/projects/[slug]-hero.png`
- [ ] Demo GIF or video URL — `public/demos/[slug].gif`
- [ ] GitHub repository URL

### Architecture
- [ ] Architecture diagrams (optional image fallback) — `public/diagrams/[slug].png`
- [ ] Node/edge config data filled in `data/architecture.ts`

### Knowledge Base
- [ ] All `.md` files in `/data/knowledge/` populated with real content
- [ ] Internship details: architecture, metrics, contributions documented

### Analytics
- [ ] `revenue-timeseries.json` — 30 days of simulated data with forecast and actual values
- [ ] `anomalies.json` — 2–3 simulated anomalies with root causes

---

## Appendix A — Key Dependencies (package.json)

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "framer-motion": "^11.0.0",
    "zustand": "^4.5.0",
    "recharts": "^2.12.0",
    "reactflow": "^11.11.0",
    "cmdk": "^1.0.0",
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "lucide-react": "^0.383.0",
    "openai": "^4.40.0",
    "@pinecone-database/pinecone": "^3.0.0",
    "ai": "^3.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  }
}
```

---

## Appendix B — Mobile Responsiveness Requirements

| Breakpoint | Behavior |
|---|---|
| `< 768px` | Sidebar hidden, hamburger menu icon top-left, all cards full-width |
| `768px–1024px` | Sidebar shown, 200px width, content adapts |
| `> 1024px` | Full layout, 240px sidebar, 2-3 column grids where applicable |

All `grid-cols-3` layouts collapse to `grid-cols-1` on mobile. Charts remain horizontally scrollable on narrow screens rather than shrinking.

---

*End of PRD — Version 1.0*