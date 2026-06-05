# SmartCV: AI-Powered Resume Matcher

## Overview
SmartCV is an agentic AI system designed to solve the problem of job matching. Rather than simple keyword matching, it uses semantic similarity search and multi-agent reasoning to match a candidate's resume to job descriptions, detailing alignment scores, fit summaries, and recommended adjustments.

## Technical Details
- **Frontend**: Streamlit
- **Backend**: FastAPI (Python)
- **AI Orchestration**: LangGraph
- **Vector Search**: FAISS
- **LLM**: Gemini 1.5 Flash
- **Workflow**: 
  1. The user uploads a resume (PDF/DOCX) and inputs a job description.
  2. The parser agent extracts text and structures it into standardized formats.
  3. The vector database (FAISS) matches skills and experience chunks.
  4. The LangGraph agent orchestrates evaluation criteria: Skill Match, Experience Depth, and Role alignment.
  5. The LLM synthesizes fit analysis and returns a JSON payload including match score (0-100), key gaps, and resume formatting tips.

## Gaps & Challenges
- **Inconsistent Parsing**: Resumes have widely different structures (columns, tables). Solved by building a two-stage parsing pipeline: regular expression layout extraction followed by LLM-based structured schema normalization.
- **Agent Loop Halts**: Early iterations of LangGraph agents sometimes went into infinite evaluation loops for highly ambiguous resumes. Fixed by enforcing a maximum of 3 recursion passes and strict state exit schemas.
