from typing import List, Dict, Any
from llm_provider import get_llm_provider
from vector_store import get_vector_store, VectorQueryResponse

class RAGContext:
    def __init__(self, context_text: str, matches: List[VectorQueryResponse]):
        self.context_text = context_text
        self.matches = matches

    def to_dict(self) -> Dict[str, Any]:
        return {
            "contextText": self.context_text,
            "matches": [m.to_dict() for m in self.matches]
        }

async def retrieve_context(query: str, top_k: int = 5) -> RAGContext:
    try:
        llm_provider = get_llm_provider()
        vector_store = get_vector_store()

        print(f"[RAG] Generating embedding for query using: {llm_provider.name}")
        query_vector = await llm_provider.generate_embedding(query)

        print(f"[RAG] Querying vector store using: {vector_store.name}")
        matches = await vector_store.query(query_vector, top_k)

        context_blocks = []
        for match in matches:
            source = match.metadata.get("source", "unknown")
            title = match.metadata.get("title", "untitled")
            context_blocks.append(f"SOURCE: {source}\nTITLE: {title}\nCONTENT:\n{match.text}")

        context_text = "\n\n---\n\n".join(context_blocks)

        return RAGContext(context_text=context_text, matches=matches)
    except Exception as e:
        print("[RAG] Failed to retrieve context:", e)
        return RAGContext(context_text="", matches=[])
