import os
import re
import time
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

# Load env variables from root or backend
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(backend_dir)
load_dotenv(os.path.join(project_dir, ".env.local"))
load_dotenv(os.path.join(project_dir, ".env"))

from llm_provider import get_llm_provider, ChatMessage
from rag import retrieve_context
from embed import main as run_embedding_pipeline

app = FastAPI(title="Ronit OS Portfolio Backend API")

# Configure CORS so Vite frontend on 5173 can interact with it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageInput(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[MessageInput]

# In-memory GitHub Cache
github_cache = {
    "data": None,
    "timestamp": 0.0
}
CACHE_DURATION_SECS = 900.0  # 15 minutes

def get_mock_github_data() -> Dict[str, Any]:
    return {
        "stats": {
            "totalRepos": 8,
            "totalStars": 0,
            "totalForks": 0,
            "topLanguage": "Python",
            "estimatedCommits": 150,
        },
        "languages": [
            {"name": "Python", "percentage": 63},
            {"name": "Jupyter Notebook", "percentage": 13},
            {"name": "JavaScript", "percentage": 12},
            {"name": "Other", "percentage": 12},
        ],
        "featuredRepos": [
            {
                "name": "IPL-2008-2024-Web-Analysis",
                "description": "An interactive Streamlit dashboard providing in-depth analysis of IPL team tally, player performance, and match statistics from 2008 to 2024.",
                "stars": 0,
                "forks": 0,
                "language": "Python",
                "topics": ["streamlit", "pandas", "python", "data-analysis", "cricket-stats"],
                "updatedAt": "June 11, 2025",
                "url": "https://github.com/Ronit-019/IPL-2008-2024-Web-Analysis",
            },
            {
                "name": "IPL-Web-Analysis",
                "description": "Exploratory data analysis and python scripts tracking historical IPL datasets.",
                "stars": 0,
                "forks": 0,
                "language": "Python",
                "topics": ["pandas", "python", "data-analysis", "cricket-stats"],
                "updatedAt": "April 21, 2025",
                "url": "https://github.com/Ronit-019/IPL-Web-Analysis",
            },
            {
                "name": "Portfolio",
                "description": "Interactive developer OS portfolio website.",
                "stars": 0,
                "forks": 0,
                "language": "JavaScript",
                "topics": ["react", "tailwind-css", "vite"],
                "updatedAt": "June 5, 2026",
                "url": "https://github.com/Ronit-019/Portfolio",
            },
        ],
        "otherRepos": [
            {
                "name": "CampusCare",
                "description": "Student welfare or campus management Python system.",
                "stars": 0,
                "forks": 0,
                "language": "Python",
                "topics": ["python"],
                "updatedAt": "June 2, 2026",
                "url": "https://github.com/Ronit-019/CampusCare",
            },
            {
                "name": "CODSOFT",
                "description": "Internship Tasks for CODSOFT.",
                "stars": 0,
                "forks": 0,
                "language": "Jupyter Notebook",
                "topics": ["data-science", "machine-learning"],
                "updatedAt": "July 6, 2025",
                "url": "https://github.com/Ronit-019/CODSOFT",
            },
            {
                "name": "Edtech-Powerbi-Dashboard",
                "description": "Power BI dashboard for analyzing online courses and EdTech trends.",
                "stars": 0,
                "forks": 0,
                "language": "Other",
                "topics": ["powerbi", "dashboard", "analytics"],
                "updatedAt": "June 8, 2025",
                "url": "https://github.com/Ronit-019/Edtech-Powerbi-Dashboard",
            },
            {
                "name": "Global-Tech-Salaries-Explorer",
                "description": "Exploratory data analysis of tech salaries worldwide.",
                "stars": 0,
                "forks": 0,
                "language": "Python",
                "topics": ["python", "data-analysis", "salaries"],
                "updatedAt": "August 10, 2025",
                "url": "https://github.com/Ronit-019/Global-Tech-Salaries-Explorer",
            },
            {
                "name": "Indian-Startup-Funding-Case-Study",
                "description": "Data analysis and visualization of startup funding trends in India.",
                "stars": 0,
                "forks": 0,
                "language": "Python",
                "topics": ["python", "data-analysis", "funding"],
                "updatedAt": "May 31, 2025",
                "url": "https://github.com/Ronit-019/Indian-Startup-Funding-Case-Study",
            },
        ],
    }

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        messages = request.messages
        if not messages:
            raise HTTPException(status_code=400, detail="Invalid or empty messages list")

        # Get last user query
        last_message = messages[-1]
        if last_message.role != "user":
            raise HTTPException(status_code=400, detail="Last message must be from user")

        query = last_message.content

        # Retrieve RAG context
        rag_context = await retrieve_context(query, top_k=4)
        context_text = rag_context.context_text

        # Replicate System Prompt exactly
        system_prompt = f"""You are Ronit OS, an AI assistant representing Ronit Rajput, an aspiring Data Engineer / ML Engineer.
You answer questions about Ronit's background, internship experience, skills, projects, and certifications.
Be concise, professional, and specific. Emphasize actual outcomes and metrics where available (e.g. 75% reduction in alert noise, 40% reduction in query times).
ONLY answer based on the provided context. If you are unsure or the context doesn't contain the answer, say: "I don't have that specific detail in my knowledge base, but you can explore Ronit's Projects or Resume Hub for more info."

CONTEXT FROM KNOWLEDGE BASE:
{context_text}

If the user asks to "show", "open", "go to", or "navigate to" a specific section of the website, or if their question is directly answered by a specific section (e.g. "show me your resume" -> /resume, "show smartcv architecture" -> /architecture/smartcv), you MUST append a JSON block at the very end of your response. 

Supported paths are:
- AI Assistant: /assistant
- Projects Command Center: /projects
- GA4 Anomaly Project Details: /projects/ga4-anomaly-intelligence
- Real Estate Recommender Project Details: /projects/real-estate-recommender
- Statistical Analysis Assistant Project Details: /projects/statistical-analysis-assistant
- IPL Analysis Project Details: /projects/ipl-web-analysis
- Architecture Gallery: /architecture
- GA4 Anomaly Architecture: /architecture/ga4-anomaly
- Statistical Analysis Assistant Architecture: /architecture/statistical-analysis-assistant
- IPL Analysis Architecture: /architecture/ipl-web-analysis
- Engineering Journal: /journal
- Timeline of Growth: /timeline
- GitHub Intelligence: /github
- Resume Hub: /resume

The JSON block format must be EXACTLY on a new line:
{{"action": "navigate", "path": "/path-here", "label": "Button Label Here"}}

Make sure to separate it from your response text with a double newline. Do not surround the JSON block with markdown code blocks (backticks)."""

        llm_provider = get_llm_provider()
        
        # Convert Pydantic history objects to internal ChatMessage objects, excluding last message
        history = [ChatMessage(role=msg.role, content=msg.content) for msg in messages[:-1]]

        print(f"[Chat API] Querying model: {llm_provider.name}")
        response_text = await llm_provider.generate_text(
            system_prompt=system_prompt,
            prompt=query,
            history=history
        )

        cleaned_text = response_text.strip()
        action = None

        # Search for the navigate action JSON block in the AI response
        json_regex = r'\{"action":\s*"navigate",\s*"path":\s*"([^"]+)",\s*"label":\s*"([^"]+)"\}'
        match = re.search(json_regex, cleaned_text)

        if match:
            try:
                action = {
                    "action": "navigate",
                    "path": match.group(1),
                    "label": match.group(2)
                }
                # Remove the JSON pattern from response
                cleaned_text = re.sub(json_regex, "", cleaned_text).strip()
            except Exception as err:
                print("Failed to parse navigation intent from AI response:", err)

        return {
            "content": cleaned_text,
            "action": action
        }
    except Exception as e:
        print("Error in Chat API route:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/github")
async def github_endpoint():
    current_time = time.time()
    
    # Return cache if valid
    if github_cache["data"] and (current_time - github_cache["timestamp"] < CACHE_DURATION_SECS):
        print("[GitHub API] Returning cached repositories data.")
        return github_cache["data"]

    username = os.getenv("GITHUB_USERNAME") or "Ronit-019"
    token = os.getenv("GITHUB_TOKEN") or ""

    try:
        headers = {
            "Accept": "application/vnd.github.v3+json"
        }
        if token:
            headers["Authorization"] = f"token {token}"

        print(f"[GitHub API] Fetching repositories for: {username}")
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                f"https://api.github.com/users/{username}/repos?per_page=100",
                headers=headers
            )

        if response.status_code != 200:
            print(f"GitHub API returned status {response.status_code}. Falling back to mock data.")
            return get_mock_github_data()

        repos = response.json()
        if not isinstance(repos, list):
            return get_mock_github_data()

        # Filter out forks
        public_repos = [r for r in repos if not r.get("fork", False)]

        total_stars = 0
        total_forks = 0
        language_counts = {}

        for repo in public_repos:
            total_stars += repo.get("stargazers_count", 0)
            total_forks += repo.get("forks_count", 0)
            lang = repo.get("language")
            if lang:
                language_counts[lang] = language_counts.get(lang, 0) + 1

        total_with_language = sum(language_counts.values())
        languages = []
        for name, count in language_counts.items():
            pct = round((count / total_with_language) * 100) if total_with_language > 0 else 0
            languages.append({"name": name, "percentage": pct})

        languages.sort(key=lambda x: x["percentage"], reverse=True)
        languages = languages[:4]

        # Add "Other" if percentages don't total 100
        top_percentage_sum = sum(l["percentage"] for l in languages)
        if 0 < top_percentage_sum < 100:
            languages.append({
                "name": "Other",
                "percentage": 100 - top_percentage_sum
            })

        top_language = languages[0]["name"] if languages else "Python"

        # Format repositories list
        all_formatted = []
        for repo in public_repos:
            updated_at_str = repo.get("updated_at", "")
            # Simple parse
            formatted_date = "Recent"
            try:
                # E.g. "2026-06-02T13:16:36Z"
                parts = updated_at_str.split("T")[0].split("-")
                months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                formatted_date = f"{months[int(parts[1])]} {parts[2]}, {parts[0]}"
            except Exception:
                pass

            all_formatted.append({
                "name": repo.get("name", ""),
                "description": repo.get("description") or "No description provided.",
                "stars": repo.get("stargazers_count", 0),
                "forks": repo.get("forks_count", 0),
                "language": repo.get("language") or "Other",
                "topics": repo.get("topics") or [],
                "updatedAt": formatted_date,
                "url": repo.get("html_url", "")
            })

        featured_names = ["IPL-2008-2024-Web-Analysis", "IPL-Web-Analysis", "Portfolio"]
        
        featured_repos = [r for r in all_formatted if any(f.lower() == r["name"].lower() for f in featured_names)]
        other_repos = [r for r in all_formatted if not any(f.lower() == r["name"].lower() for f in featured_names)]

        payload = {
            "stats": {
                "totalRepos": len(public_repos),
                "totalStars": total_stars,
                "totalForks": total_forks,
                "topLanguage": top_language,
                "estimatedCommits": 150,
            },
            "languages": languages,
            "featuredRepos": featured_repos if featured_repos else all_formatted[:3],
            "otherRepos": other_repos if featured_repos else all_formatted[3:10]
        }

        # Cache data
        github_cache["data"] = payload
        github_cache["timestamp"] = current_time

        return payload
    except Exception as e:
        print("GitHub query error:", e)
        return get_mock_github_data()

@app.post("/api/embed")
async def trigger_embedding():
    try:
        await run_embedding_pipeline()
        return {"status": "success", "message": "Embedding pipeline run completed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline failed: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
