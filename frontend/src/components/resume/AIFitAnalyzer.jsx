import { useState } from "react";
import { Cpu, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { API_BASE_URL } from "../../config";

export default function AIFitAnalyzer() {
  const [query, setQuery] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setAnalysis("");

    try {
      const chatMessage = {
        role: "user",
        content: `Based on Ronit's resume, explain why he is a strong fit for the role described below. Highlight matching skills, relevant projects, and internship contributions. Use bullet points and focus on metrics.

Role description:
${query}`,
      };

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [chatMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate fit");
      }

      const data = await response.json();
      setAnalysis(data.content);
    } catch (error) {
      console.error("AI Fit Analyzer failed:", error);
      setAnalysis(
        "I encountered an error while evaluating the resume alignment. Please ensure your API keys are configured, or verify your network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 space-y-4 shadow-sm flex flex-col justify-between">
      <div className="space-y-1 select-none">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-accent-primary" />
          <h4 className="text-sm font-bold text-text-primary">
            AI Fit Analyzer
          </h4>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          Paste a target job description or role title to evaluate Ronit's experience alignment.
        </p>
      </div>

      {/* Query form */}
      <form onSubmit={handleAnalyze} className="space-y-3 select-none">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          placeholder="Paste job description here... (e.g. 'Looking for a Data Engineer experienced in building ETL pipelines, BigQuery, and Python...')"
          className="w-full h-24 p-3 text-xs text-text-primary bg-bg-primary border border-border-subtle focus:border-accent-primary rounded-lg outline-none placeholder-text-muted resize-none scrollbar-thin"
        />
        
        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg bg-accent-primary hover:bg-accent-primary/95 text-white disabled:bg-bg-hover disabled:text-text-muted transition-all cursor-pointer shadow-sm"
        >
          <Cpu size={14} className={loading ? "animate-spin" : ""} />
          <span>{loading ? "Analyzing Alignment..." : "Analyze Role Fit"}</span>
        </button>
      </form>

      {/* Analysis Output panel */}
      {(loading || analysis) && (
        <div className="border-t border-border-subtle/50 pt-4 space-y-3">
          {loading ? (
            <div className="space-y-2.5 animate-pulse select-none">
              <div className="flex items-center gap-2 text-[10px] text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-ping" />
                <span>Running diagnostic RAG lookup... matching skills...</span>
              </div>
              <div className="h-3 bg-bg-card rounded w-3/4" />
              <div className="h-3 bg-bg-card rounded w-5/6" />
              <div className="h-3 bg-bg-card rounded w-2/3" />
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-200 select-text">
              <div className="flex items-center gap-1.5 text-success font-semibold text-xs select-none">
                <CheckCircle size={14} />
                <span>AI Fit Evaluation</span>
              </div>

              <div className="p-4 bg-bg-card border border-border-subtle rounded-lg text-xs leading-relaxed text-text-secondary select-text max-h-[180px] overflow-y-auto scrollbar-thin">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>,
                    li: ({ children }) => <li>{children}</li>,
                    code: ({ children }) => (
                      <code className="px-1 py-0.5 rounded bg-bg-primary text-text-accent font-mono text-[10px] border border-border-subtle">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {analysis}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
