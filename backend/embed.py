import os
import re
import sys
import asyncio
from typing import List, Dict, Any
from dotenv import load_dotenv

# Load env variables from root folder or backend folder
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(backend_dir)
load_dotenv(os.path.join(project_dir, ".env.local"))
load_dotenv(os.path.join(project_dir, ".env"))

from llm_provider import get_llm_provider
from vector_store import get_vector_store, VectorRecord

def walk_dir(directory: str) -> List[str]:
    results = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                results.append(os.path.join(root, file))
    return results

def chunk_document(file_path: str, content: str, knowledge_dir: str) -> List[Dict[str, Any]]:
    chunks = []
    base_name = os.path.splitext(os.path.basename(file_path))[0]
    relative_path = os.path.relpath(file_path, knowledge_dir)
    source_name = relative_path.replace("\\", "/")

    # Find H1
    h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = h1_match.group(1).strip() if h1_match else base_name

    # Split by ## sections
    sections = re.split(r'\n(?=##\s+)', content)
    for index, section in enumerate(sections):
        trimmed = section.strip()
        if not trimmed:
            continue

        h2_match = re.search(r'^##\s+(.+)$', trimmed, re.MULTILINE)
        sub_title = h2_match.group(1).strip() if h2_match else ""
        full_title = f"{title} - {sub_title}" if sub_title else title

        chunks.append({
            "id": f"{base_name}_chunk_{index}",
            "text": trimmed,
            "source": source_name,
            "title": full_title
        })
    return chunks

async def main():
    print("Starting knowledge base embedding pipeline in Python...")

    knowledge_dir = os.path.join(project_dir, "data", "knowledge")
    if not os.path.exists(knowledge_dir):
        print(f"Knowledge directory not found at: {knowledge_dir}")
        sys.exit(1)

    files = walk_dir(knowledge_dir)
    print(f"Found {len(files)} markdown files in knowledge base.")

    all_chunks = []
    for file in files:
        with open(file, "r", encoding="utf-8") as f:
            content = f.read()
        doc_chunks = chunk_document(file, content, knowledge_dir)
        all_chunks.extend(doc_chunks)

    print(f"Generated {len(all_chunks)} chunks from files.")

    llm_provider = get_llm_provider()
    vector_store = get_vector_store()

    print(f"Using LLM Provider: {llm_provider.name}")
    print(f"Using Vector Store: {vector_store.name}")

    vector_records = []
    for i, chunk in enumerate(all_chunks):
        print(f"[{i + 1}/{len(all_chunks)}] Generating embedding for: {chunk['title']} ({chunk['source']})")
        
        try:
            values = await llm_provider.generate_embedding(chunk["text"])
            
            vector_records.append(VectorRecord(
                record_id=chunk["id"],
                values=values,
                text=chunk["text"],
                metadata={
                    "source": chunk["source"],
                    "title": chunk["title"]
                }
            ))

            # Simple sleep to prevent hitting rate limits
            await asyncio.sleep(0.3)
        except Exception as err:
            print(f"Failed to generate embedding for chunk {chunk['id']}: {err}")

    print(f"Successfully embedded {len(vector_records)} chunks.")

    print(f"Saving to vector store: {vector_store.name}...")
    await vector_store.upsert(vector_records)
    print("Pipeline finished successfully!")

if __name__ == "__main__":
    asyncio.run(main())
