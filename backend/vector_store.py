import os
import json
import math
from typing import List, Dict, Any
from pinecone import Pinecone

class VectorRecord:
    def __init__(self, record_id: str, values: List[float], text: str, metadata: Dict[str, Any]):
        self.id = record_id
        self.values = values
        self.text = text
        self.metadata = metadata

class VectorQueryResponse:
    def __init__(self, text: str, score: float, metadata: Dict[str, Any]):
        self.text = text
        self.score = score
        self.metadata = metadata

    def to_dict(self) -> Dict[str, Any]:
        return {
            "text": self.text,
            "score": self.score,
            "metadata": self.metadata
        }

class VectorStore:
    name: str = "Base Vector Store"

    async def upsert(self, records: List[VectorRecord]) -> None:
        raise NotImplementedError

    async def query(self, query_vector: List[float], top_k: int) -> List[VectorQueryResponse]:
        raise NotImplementedError

class PineconeVectorStore(VectorStore):
    def __init__(self):
        self.name = "Pinecone Cloud DB"
        self.index_name = os.getenv("PINECONE_INDEX") or ""
        
    def _get_index(self):
        api_key = os.getenv("PINECONE_API_KEY") or ""
        pc = Pinecone(api_key=api_key)
        return pc.Index(self.index_name)

    async def upsert(self, records: List[VectorRecord]) -> None:
        try:
            index = self._get_index()
            pinecone_records = []
            for rec in records:
                # Merge text into metadata for retrieval
                metadata_copy = rec.metadata.copy()
                metadata_copy["text"] = rec.text
                pinecone_records.append({
                    "id": rec.id,
                    "values": rec.values,
                    "metadata": metadata_copy
                })

            # Batch uploads in chunks of 100
            batch_size = 100
            for i in range(0, len(pinecone_records), batch_size):
                batch = pinecone_records[i:i + batch_size]
                index.upsert(vectors=batch)
        except Exception as e:
            print("Pinecone upsert failed:", e)
            raise e

    async def query(self, query_vector: List[float], top_k: int) -> List[VectorQueryResponse]:
        try:
            index = self._get_index()
            response = index.query(
                vector=query_vector,
                top_k=top_k,
                include_metadata=True
            )

            results = []
            for match in response.get("matches", []):
                metadata = match.get("metadata", {})
                text = metadata.get("text", "")
                if not text:
                    continue
                
                # Extract original metadata keys
                source = metadata.get("source", "")
                title = metadata.get("title", "")
                
                results.append(VectorQueryResponse(
                    text=text,
                    score=match.get("score", 0.0),
                    metadata={
                        "source": source,
                        "title": title,
                        **{k: v for k, v in metadata.items() if k not in ["text"]}
                    }
                ))
            return results
        except Exception as e:
            print("Pinecone query failed:", e)
            raise e

class LocalVectorStore(VectorStore):
    def __init__(self):
        self.name = "Local JSON Vector Store"
        # Find absolute path relative to current backend folder
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        project_dir = os.path.dirname(backend_dir)
        self.file_path = os.path.join(project_dir, "data", "vectors.json")

    def _read_vectors(self) -> List[Dict[str, Any]]:
        try:
            if not os.path.exists(self.file_path):
                return []
            with open(self.file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print("Failed to read local vectors file:", e)
            return []

    def _write_vectors(self, records_data: List[Dict[str, Any]]) -> None:
        try:
            dir_path = os.path.dirname(self.file_path)
            if not os.path.exists(dir_path):
                os.makedirs(dir_path, exist_ok=True)
            with open(self.file_path, "w", encoding="utf-8") as f:
                json.dump(records_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print("Failed to write local vectors file:", e)
            raise e

    async def upsert(self, records: List[VectorRecord]) -> None:
        existing = self._read_vectors()
        existing_map = {r["id"]: r for r in existing}

        for rec in records:
            existing_map[rec.id] = {
                "id": rec.id,
                "values": rec.values,
                "text": rec.text,
                "metadata": rec.metadata
            }

        self._write_vectors(list(existing_map.values()))

    def _cosine_similarity(self, vec_a: List[float], vec_b: List[float]) -> float:
        if len(vec_a) != len(vec_b):
            return 0.0
        dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = sum(a * a for a in vec_a)
        norm_b = sum(b * b for b in vec_b)
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot_product / (math.sqrt(norm_a) * math.sqrt(norm_b))

    async def query(self, query_vector: List[float], top_k: int) -> List[VectorQueryResponse]:
        records = self._read_vectors()
        if not records:
            return []

        scored = []
        for rec in records:
            score = self._cosine_similarity(query_vector, rec["values"])
            scored.append(VectorQueryResponse(
                text=rec["text"],
                score=score,
                metadata=rec["metadata"]
            ))

        # Sort descending by score
        scored.sort(key=lambda x: x.score, reverse=True)
        return scored[:top_k]

def get_vector_store() -> VectorStore:
    provider = os.getenv("VECTOR_PROVIDER")
    pinecone_key = os.getenv("PINECONE_API_KEY")
    pinecone_index = os.getenv("PINECONE_INDEX")

    if provider == "pinecone" and pinecone_key and pinecone_index:
        return PineconeVectorStore()

    return LocalVectorStore()
