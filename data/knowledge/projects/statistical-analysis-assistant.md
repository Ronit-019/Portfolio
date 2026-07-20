# Statistical Analysis Assistant

## Overview
A dual-engine AI analytics co-pilot that routes natural language questions to either a LangGraph-powered BigQuery SQL agent or a direct GA4 Reporting API pipeline, delivering Gemini-synthesized insights and auto-exported client presentations.

## Problem
DA&I analysts spent hours writing complex, deeply nested BigQuery SQL for GA4 event schemas (UNNEST, window functions, QUALIFY clauses), while standard direct API reporting couldn't handle custom multi-touch attribution. No single tool bridged both paths via a plain-English interface.

## Solution
A FastAPI + React platform that intelligently routes each request: complex custom queries go to a self-correcting LangGraph ReAct agent (Gemini 2.5 Pro) that generates date-partitioned SQL, runs a dry-run for GCP cost estimation, and asks for user consent before executing against BigQuery; standard metric requests bypass BigQuery entirely and go through a sequential 8-stage Direct GA4 API pipeline (Gemini 2.0 Flash) with self-healing schema validation. Both tracks synthesize results into Gemini-powered narrative insights and export client-ready PPTX/PDF slide decks automatically.

## Technical Details
- **Dual-Engine Routing**: Intelligently splits execution between direct GA4 reporting APIs (zero scanned bytes) and BigQuery raw data warehouses.
- **Self-Healing Schema Validator**: Employs offline metadata lookup dictionaries to translate informal synonyms (like "bounces") to official GA4 dimensions, combined with Gemini retries on validation breaches.
- **Auto-Discovery Loader**: Samples database tables dynamically to create cached schema JSON configs for new clients, eliminating onboarding setup times.

## Challenges & Resolutions
- **Nested Query Cost Spikes**: Solved query pricing issues by implementing dry-run cost gates and reserving BigQuery raw checks for attribution math only, serving standard metrics via the zero-cost Direct API.
- **Thinking Tags Extraction**: Created regex stripping structures to clean LLM markdown thinking trace boundaries before execution against client databases.
- **Synonym Mismatch Resolution**: Constructed property metadata JSON structures loaded at request time, matching user descriptions without extra LLM hops.
