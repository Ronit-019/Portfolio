# Job Intelligence Engine

## Overview
An automated, AI-powered multi-company job extraction pipeline that crawls corporate career sites, cleans raw HTML through a dual-layer optimization pipeline, extracts structured job listings via Groq LLM API, and persists them with field-level audit trails in a PostgreSQL database. Company scraping targets are managed dynamically from Google Sheets via OAuth.

## Technical Details
- **Stack**: Python (>=3.10), Playwright (Chromium), BeautifulSoup4 / lxml, Markdownify, Groq API (Qwen 3 32B), PostgreSQL / Supabase, psycopg ConnectionPool, gspread (Google Sheets OAuth), Pydantic v2, Jinja2 (email digest templates)
- **Duration**: Jun–Jul 2026
- **GitHub**: https://github.com/Ronit-019/Job-Intelligence-Engine
- **Type**: Personal Project

## Key Features
- **SPA-Aware Scraping**: Playwright Chromium browser with a configurable 5000ms hydration wait period, ensuring React/Next.js career sites fully render before HTML extraction.
- **Dual-Layer HTML Optimization Pipeline**: 
  - Phase 1 — HTMLCleaner: Strips all noise-only nodes (scripts, styles, SVGs, hidden elements) using BeautifulSoup4 decomposition before Markdownify conversion.
  - Phase 2 — CandidateChunkFilter: Tokenizes and discards markdown blocks lacking recruitment keywords (careers, vacancy, hiring, etc.), reducing LLM input token size by 80%+.
- **Groq LLM Extraction (Qwen 3 32B)**: Sends cleaned markdown to Groq with a structured job extraction prompt, returning validated JSON arrays of job objects.
- **Custom JSON Parser** (`ResponseParser.extract_json`): Uses a regex bracket depth tracker to robustly extract JSON arrays from LLM responses even when wrapped in markdown backticks or surrounded by conversation text.
- **Google Sheets Sync**: CompanySyncService reads active company targets from Google Sheets via OAuth service account (gspread) and upserts them into the PostgreSQL companies table.
- **Field-Level Audit Trail**: ChangeDetector performs UPSERT on company_id + job_url. Any field-level change triggers a delta record in the job_history table, maintaining a complete revision history.
- **Production PostgreSQL Pool**: Uses psycopg_pool with connection limits and SSL mode validation.

## Architecture
Google Sheets (Source) → CompanySyncService → Postgres DB → CompanyRunner → Playwright HTMLFetcher → HTMLCleaner → MarkdownConverter → CandidateChunkFilter → Groq LLM Extractor → JobRepository (UPSERT + ChangeDetector) → Postgres DB

## Challenges & Learnings
- **Challenge**: Handling Single-Page Applications (React/Next.js career sites) returning blank HTML to standard HTTP scrapers due to client-side hydration.
- **Learning**: Implemented Playwright Chromium browser automation in scraper/browser.py with a configurable WAIT_TIME (5000ms) to allow full client-side rendering before HTML extraction.
- **Challenge**: Raw HTML pages contain thousands of tokens of boilerplate (headers, footers, scripts, styles) that waste LLM context and inflate API costs.
- **Learning**: Built the two-phase cleanup pipeline (HTMLCleaner + CandidateChunkFilter) that strips all non-recruitment content before sending to the LLM, cutting token overhead by 80%+.
- **Challenge**: Duplicate listings and loss of historical details when career portals update or close job postings between scrape cycles.
- **Learning**: Implemented field-level ChangeDetector with UPSERT logic on company_id + job_url, recording field differences in the job_history audit table for full version history.

## Future Roadmap
- Dynamic pagination and individual job detail page parsing for full descriptions
- Slack and Discord webhook integrations for real-time new job alerts
- Async concurrency pooling using asyncio to scrape multiple companies concurrently
