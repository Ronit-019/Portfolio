import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={clsx(
        "flex w-full gap-4 p-4 rounded-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2",
        isUser ? "justify-end" : "justify-start bg-bg-surface border border-border-subtle shadow-sm"
      )}
    >
      {/* Avatar block */}
      {!isUser && (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/20 shrink-0 select-none">
          <span className="text-[10px] font-bold text-accent-primary tracking-wide">RO</span>
        </div>
      )}

      {/* Message Body */}
      <div className={clsx("flex flex-col gap-2 max-w-[85%]", isUser ? "items-end" : "items-start")}>
        <div
          className={clsx(
            "text-sm leading-relaxed",
            isUser
              ? "bg-accent-primary text-white px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-md"
              : "text-text-primary"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 rounded bg-bg-primary text-text-accent font-mono text-xs border border-border-subtle">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="p-3 my-2 rounded-lg bg-bg-primary border border-border-subtle font-mono text-xs overflow-x-auto select-text scrollbar-thin">
                    {children}
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-accent hover:text-accent-primary underline transition-colors"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Navigation Action Intent Button */}
        {message.action && (
          <Link
            to={message.action.path}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-accent-primary/10 border border-accent-primary/20 hover:bg-accent-primary hover:text-white text-accent-primary transition-all duration-300 shadow-sm mt-1 animate-pulse"
          >
            <span>{message.action.label}</span>
            <ArrowRight size={12} />
          </Link>
        )}
      </div>

      {isUser && (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-surface border border-border-subtle shrink-0 select-none">
          <span className="text-[10px] font-bold text-text-secondary">U</span>
        </div>
      )}
    </div>
  );
}
