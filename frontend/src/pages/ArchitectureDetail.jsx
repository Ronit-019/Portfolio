import { useParams, Link } from "react-router-dom";
import { ARCHITECTURE_DATA } from "../data/architecture";
import { ArrowLeft, BookOpen, AlertTriangle, RefreshCw } from "lucide-react";
import FlowDiagram from "../components/architecture/FlowDiagram";

export default function ArchitectureDetail() {
  const { slug } = useParams();
  const arch = ARCHITECTURE_DATA.find((a) => a.slug === slug);

  if (!arch) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Diagram Not Found</h2>
        <p className="text-sm text-text-secondary">The requested system design configuration could not be located.</p>
        <Link to="/architecture" className="text-sm text-accent-primary hover:underline">
          Return to Architecture Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-2 space-y-6 animate-in fade-in duration-200 select-text">
      {/* Back button header navigation */}
      <div className="flex items-center gap-2 select-none">
        <Link
          to="/architecture"
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Gallery
        </Link>
      </div>

      {/* Diagram Title block */}
      <div className="space-y-1 pb-4 border-b border-border-subtle select-none">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          {arch.title}
        </h1>
        <p className="text-sm text-text-secondary">
          {arch.description}
        </p>
      </div>

      {/* React Flow Interactive diagram Canvas */}
      <FlowDiagram config={arch} />

      {/* Engineering Retrospective / Lessons Learned */}
      <div className="space-y-4 pt-4 border-t border-border-subtle">
        <h3 className="text-lg font-bold text-text-primary select-none">
          Engineering Retrospective
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Why this design */}
          <div className="p-5 bg-bg-card border border-border-subtle rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-accent-primary select-none">
              <BookOpen size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Why This Design?
              </h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {arch.lessons.whyThisDesign}
            </p>
          </div>

          {/* What failed first */}
          <div className="p-5 bg-bg-card border border-border-subtle rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-danger select-none">
              <AlertTriangle size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                What Failed First?
              </h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {arch.lessons.whatFailed}
            </p>
          </div>

          {/* What changed */}
          <div className="p-5 bg-bg-card border border-border-subtle rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-success select-none">
              <RefreshCw size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                What Changed?
              </h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {arch.lessons.whatChanged}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
