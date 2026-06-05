import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import { useAppStore } from "../../lib/store";
import { API_BASE_URL } from "../../config";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to **Ronit OS**! I am Ronit's AI engineer assistant, powered by the Qwen/Gemini dual retrieval framework. Ask me anything about his technical background, project details, internship metrics, or download his resume.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const { chatPreFill, setChatPreFill } = useAppStore();

  // Trigger search if a pre-fill question is set by the Command Palette
  useEffect(() => {
    if (chatPreFill) {
      handleSendMessage(chatPreFill);
      setChatPreFill(""); // Reset store state
    }
  }, [chatPreFill]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      const assistantMsg = {
        role: "assistant",
        content: data.content,
        action: data.action || undefined,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Failed to query AI Assistant:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a connectivity error while reaching the model server. Please make sure your Hugging Face or Gemini API keys are configured correctly in `.env.local` or `.env` inside the backend, or check your network connection.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-bg-surface border border-border-subtle rounded-xl overflow-hidden shadow-md">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}

        {/* Loading / Typing indicator */}
        {loading && (
          <div className="flex w-full gap-4 p-4 rounded-xl bg-bg-surface border border-border-subtle shadow-sm animate-pulse justify-start">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/20 shrink-0">
              <span className="text-[10px] font-bold text-accent-primary tracking-wide">RO</span>
            </div>
            <div className="flex items-center gap-1.5 h-8">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Suggested Questions Grid (Only visible if no user messages sent yet) */}
      {messages.length === 1 && !loading && (
        <div className="px-6 py-4 border-t border-border-subtle bg-bg-surface">
          <SuggestedQuestions onSelectQuestion={handleSendMessage} />
        </div>
      )}

      {/* Input bar container */}
      <div className="p-4 border-t border-border-subtle bg-bg-surface">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="relative flex items-center bg-bg-primary border border-border-subtle focus-within:border-accent-primary focus-within:ring-1 focus-within:ring-accent-glow rounded-xl overflow-hidden transition-all duration-300"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask me anything about Ronit's experience, resume, or projects..."
            className="w-full h-12 px-4 pr-12 text-sm text-text-primary bg-transparent outline-none placeholder-text-muted"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 rounded-lg bg-accent-primary hover:bg-accent-primary/95 text-white disabled:bg-bg-hover disabled:text-text-muted transition-all duration-300 cursor-pointer"
          >
            <ArrowUp size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
