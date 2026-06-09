import { X, Download, ExternalLink } from "lucide-react";
import { useEffect } from "react";

export default function CVViewerModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Ronit_Rajput_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal Shell */}
      <div className="relative flex flex-col w-[92vw] max-w-5xl h-[90vh] bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle bg-bg-card shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-sm font-semibold text-text-primary">
              Ronit Rajput — Curriculum Vitae
            </span>
            <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 rounded bg-bg-primary border border-border-subtle">
              PDF
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in new tab */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover border border-transparent hover:border-border-subtle transition-all duration-200"
            >
              <ExternalLink size={15} />
            </a>

            {/* Download */}
            <button
              onClick={handleDownload}
              title="Download PDF"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-primary hover:bg-accent-primary/90 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Download size={13} />
              Download
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              title="Close (Esc)"
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover border border-transparent hover:border-border-subtle transition-all duration-200 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-bg-primary overflow-hidden">
          <iframe
            src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
            title="Ronit Rajput CV"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
