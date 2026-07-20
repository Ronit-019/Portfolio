# Finance Intelligence MCP Server

## Overview
A production-ready Model Context Protocol (MCP) server built in Python that enables AI assistants (like Claude Desktop or Cursor) to securely manage and analyze personal finances locally using a private PostgreSQL database. The server exposes 12 core tools via stdio transport for expense entry, budget management, and analytical queries — all without sending sensitive financial data to external services.

## Technical Details
- **Stack**: Python (>=3.10), FastMCP, PostgreSQL (Supabase / AWS RDS / Local), asyncpg, Matplotlib (Agg backend), openpyxl, python-dotenv
- **Duration**: Jun–Jul 2026
- **GitHub**: https://github.com/Ronit-019/Finance-Intelligence-MCP
- **Type**: Personal Project

## Key Features
- **12 MCP Tools**: Expense entry, listing, updating, deleting, budget management, and spending analytics all exposed as typed MCP tools.
- **6-KPI Financial Health Scoring Engine** (`src/health.py`): Deterministic scoring engine producing a numerical score and letter grade based on budget adherence, Month-over-Month spending stability (Coefficient of Variation), savings capacity, discretionary spending balance, large transaction concentration, and spending trend direction.
- **Local categories.json dictionary**: Maps 19 major expense categories to granular subcategories for input validation at the API boundary.
- **Headless Chart Generation**: Matplotlib Agg backend renders spending trend charts in memory (no display server required) and saves them to disk for embedding in the AI chat interface.
- **Large Dataset Excel Export**: Automatically generates openpyxl .xlsx files for expense lists exceeding 50 rows, returning a local file:// path to avoid exceeding LLM context windows.
- **Safe Batch Operations**: Rejects bulk update or delete operations that do not supply at least one active filter, protecting database state from accidental mass mutations.

## Architecture
MCP Client (Claude / Cursor) → stdio Protocol → FastMCP Server (main.py) → asyncpg Connection Pool → PostgreSQL Database (Supabase/Local)

## Challenges & Learnings
- **Challenge**: AI client context window flooding during large expense lookups. Wide date range queries could exceed LLM token limits.
- **Learning**: Implemented a 50-item truncation threshold. Larger outputs are exported as .xlsx files via openpyxl, with a local file path returned to the AI client.
- **Challenge**: Plotting charts inside daemon MCP worker processes crashed with standard graphical backends (Tkinter, Qt) requiring a display server.
- **Learning**: Explicitly configured matplotlib.use('Agg') before import to use the headless Agg backend, enabling fully in-memory chart rendering.
- **Challenge**: LLM financial coaching produced inconsistent, subjective, and sometimes hallucinated assessments without structured scoring guardrails.
- **Learning**: Built the deterministic 6-KPI health scoring engine that outputs structured mathematical facts before the LLM synthesizes them into coaching advice.

## Future Roadmap
- Local Bank Statement OCR ingestion using PDFPlumber or Tesseract
- AI-driven Cash Flow Projection using ARIMA or Prophet forecasting
- Multi-Currency Reconciliation with real-time exchange rate support
