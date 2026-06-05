import ChatWindow from "../components/assistant/ChatWindow";

export default function Assistant() {
  return (
    <div className="flex flex-col gap-6 w-full h-full max-w-5xl mx-auto py-2">
      {/* Title block */}
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          AI Engineer Assistant
        </h1>
        <p className="text-sm text-text-secondary">
          Interact with a retrieval-augmented LLM to query Ronit's skill credentials, metrics, and systems thinking.
        </p>
      </div>

      {/* Main chat window container */}
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
}
