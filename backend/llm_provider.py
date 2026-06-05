import os
import random
import httpx
from typing import List, Dict, Any
import google.generativeai as genai

class ChatMessage:
    def __init__(self, role: str, content: str):
        self.role = role  # "user", "assistant", "system"
        self.content = content

    def to_dict(self) -> Dict[str, str]:
        return {"role": self.role, "content": self.content}

class LLMProvider:
    name: str = "Base LLM Provider"

    async def generate_text(self, system_prompt: str, prompt: str, history: List[ChatMessage]) -> str:
        raise NotImplementedError

    async def generate_embedding(self, text: str) -> List[float]:
        raise NotImplementedError

class GeminiProvider(LLMProvider):
    def __init__(self):
        self.name = "Google Gemini 1.5 Flash"
        api_key = os.getenv("GEMINI_API_KEY") or ""
        genai.configure(api_key=api_key)

    async def generate_text(self, system_prompt: str, prompt: str, history: List[ChatMessage]) -> str:
        try:
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=system_prompt
            )
            
            # Map history to Gemini format
            contents = []
            for msg in history:
                role = "model" if msg.role == "assistant" else "user"
                contents.append({
                    "role": role,
                    "parts": [{"text": msg.content}]
                })
            
            # Add current user prompt
            contents.append({
                "role": "user",
                "parts": [{"text": prompt}]
            })

            # Since python's google-generativeai API call is synchronous, 
            # we can run it directly or wrap it in a thread if needed,
            # but for simplicity standard call is fine.
            response = model.generate_content(
                contents=contents,
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=2048,
                    temperature=0.3,
                )
            )
            return response.text
        except Exception as e:
            print("Gemini text generation failed:", e)
            raise e

    async def generate_embedding(self, text: str) -> List[float]:
        try:
            # We can use standard embed_content from genai
            response = genai.embed_content(
                model="models/text-embedding-004",
                content=text,
                task_type="retrieval_document"
            )
            return response["embedding"]
        except Exception as e:
            print("Gemini embedding generation failed:", e)
            raise e

class HuggingFaceProvider(LLMProvider):
    def __init__(self):
        self.name = "Hugging Face Serverless Inference"
        self.api_key = os.getenv("HF_API_KEY") or ""
        self.chat_model = "Qwen/Qwen2.5-Coder-7B-Instruct"
        self.embed_model = "sentence-transformers/all-MiniLM-L6-v2"

    async def generate_text(self, system_prompt: str, prompt: str, history: List[ChatMessage]) -> str:
        try:
            messages = [{"role": "system", "content": system_prompt}]
            for h in history:
                messages.append({"role": h.role, "content": h.content})
            messages.append({"role": "user", "content": prompt})

            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "model": self.chat_model,
                "messages": messages,
                "max_tokens": 1500,
                "temperature": 0.3
            }

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api-inference.huggingface.co/v1/chat/completions",
                    headers=headers,
                    json=payload
                )

                if response.status_code != 200:
                    raise Exception(f"Hugging Face API returned error status: {response.status_code} - {response.text}")

                data = response.json()
                return data["choices"][0]["message"]["content"]
        except Exception as e:
            print("Hugging Face text generation failed:", e)
            raise e

    async def generate_embedding(self, text: str) -> List[float]:
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"https://api-inference.huggingface.co/pipeline/feature-extraction/{self.embed_model}",
                    headers=headers,
                    json={"inputs": text}
                )

                if response.status_code != 200:
                    raise Exception(f"Hugging Face embedding API error: {response.status_code}")

                # Feature extraction pipeline returns embedding list
                return response.json()
        except Exception as e:
            print("Hugging Face embedding failed:", e)
            raise e

class MockLLMProvider(LLMProvider):
    def __init__(self):
        self.name = "Mock LLM Provider (Offline)"

    async def generate_text(self, system_prompt: str, prompt: str, history: List[ChatMessage]) -> str:
        print("Mock LLM generation prompted with:", prompt)
        
        lowercase_prompt = prompt.lower()
        action_block = ""
        
        if "architecture" in lowercase_prompt or "smartcv" in lowercase_prompt:
            action_block = '\n\n{"action": "navigate", "path": "/architecture/smartcv", "label": "Open SmartCV Architecture"}'
        elif "project" in lowercase_prompt or "work" in lowercase_prompt:
            action_block = '\n\n{"action": "navigate", "path": "/projects", "label": "Open Projects Command Center"}'
        elif "resume" in lowercase_prompt or "cv" in lowercase_prompt:
            action_block = '\n\n{"action": "navigate", "path": "/resume", "label": "Open Resume Intelligence Hub"}'
        elif "analytics" in lowercase_prompt or "war room" in lowercase_prompt:
            action_block = '\n\n{"action": "navigate", "path": "/analytics", "label": "Open Analytics War Room"}'

        if "internship" in lowercase_prompt:
            return (
                f"During his internship, Ronit worked as a Data Engineer / ML Intern. "
                f"He optimized analytics processing pipelines and engineered custom machine learning model deployments. "
                f"His contributions led to a 40% reduction in analyst query times and a 75% reduction in alert noise "
                f"using intelligent LLM-validation layers. {action_block}"
            )

        if "hire" in lowercase_prompt or "why should i" in lowercase_prompt:
            return (
                f"You should hire Ronit because he has hands-on experience building Agentic AI systems "
                f"(using LangGraph, Gemini, and FAISS) and deploying production monitoring analytics pipelines. "
                f"He possesses strong software engineering fundamentals, focuses on clean and modular architecture, "
                f"and has a proven track record of resolving business problems with data-driven AI systems."
            )

        return (
            f"This is a response from the offline Mock LLM Provider in Python. "
            f"I received your message: \"{prompt}\". "
            f"To get real AI responses, please set GEMINI_API_KEY or HF_API_KEY in your .env file. {action_block}"
        )

    async def generate_embedding(self, text: str) -> List[float]:
        # Return a normalized vector of length 384
        vector = [random.uniform(-1, 1) for _ in range(384)]
        magnitude = sum(x * x for x in vector) ** 0.5
        if magnitude == 0:
            return [0.0] * 384
        return [x / magnitude for x in vector]

def get_llm_provider() -> LLMProvider:
    provider = os.getenv("LLM_PROVIDER")
    gemini_key = os.getenv("GEMINI_API_KEY")
    hf_key = os.getenv("HF_API_KEY")

    if provider == "gemini" and gemini_key:
        return GeminiProvider()
    if provider == "huggingface" and hf_key:
        return HuggingFaceProvider()

    # Auto detect
    if gemini_key:
        return GeminiProvider()
    if hf_key:
        return HuggingFaceProvider()

    return MockLLMProvider()
