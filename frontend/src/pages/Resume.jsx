import { useState } from "react";
import ResumeSection from "../components/resume/ResumeSection";
import AIFitAnalyzer from "../components/resume/AIFitAnalyzer";
import CVViewerModal from "../components/resume/CVViewerModal";
import { Download, FileSearch } from "lucide-react";

export default function Resume() {
  const [showCV, setShowCV] = useState(false);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Ronit_Rajput_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto py-2">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 select-none animate-in fade-in duration-200">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Resume Intelligence Center
            </h1>
            <p className="text-sm text-text-secondary">
              Explore Ronit&apos;s experience tabs or execute customized AI-fit analysis scripts.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 self-start sm:self-center">
            {/* View CV */}
            <button
              id="view-cv-btn"
              onClick={() => setShowCV(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-bg-surface hover:bg-bg-hover border border-border-subtle hover:border-accent-primary/40 text-text-primary text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <FileSearch size={14} className="text-accent-primary" />
              <span>View CV</span>
            </button>

            {/* Download PDF */}
            <button
              id="download-cv-btn"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent-primary hover:bg-accent-primary/95 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Download size={14} />
              <span>Download PDF CV</span>
            </button>
          </div>
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

      {/* CV Viewer Modal */}
      {showCV && <CVViewerModal onClose={() => setShowCV(false)} />}
    </>
  );
}
