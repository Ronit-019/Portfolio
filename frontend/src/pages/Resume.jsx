import ResumeSection from "../components/resume/ResumeSection";
import AIFitAnalyzer from "../components/resume/AIFitAnalyzer";
import { Download } from "lucide-react";

export default function Resume() {
  const handleDownload = () => {
    // Triggers download of public resume.pdf
    window.open("/resume.pdf", "_blank");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto py-2">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 select-none animate-in fade-in duration-200">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Resume Intelligence Center
          </h1>
          <p className="text-sm text-text-secondary">
            Explore Ronit's experience tabs or execute customized AI-fit analysis scripts.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent-primary hover:bg-accent-primary/95 text-white text-xs font-semibold self-start sm:self-center transition-all shadow-sm cursor-pointer"
        >
          <Download size={14} />
          <span>Download PDF CV</span>
        </button>
      </div>

      {/* Main Grid: Tabs on Left, AI Analyzer on Right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Left 2 Columns: Resume Tabs */}
        <div className="md:col-span-2">
          <ResumeSection />
        </div>

        {/* Right 1 Column: AI Fit Analyzer */}
        <div className="md:col-span-1">
          <AIFitAnalyzer />
        </div>
      </div>
    </div>
  );
}
