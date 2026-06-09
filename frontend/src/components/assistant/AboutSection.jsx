import { useState } from "react";
import { ChevronDown, ChevronUp, Circle, CheckCircle2, Milestone } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-bg-card p-6 shadow-sm hover:border-border-active transition-all duration-300">
      <div className="space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2 select-none">
          <Milestone className="text-accent-primary" size={18} />
          <h3 className="text-lg font-bold text-text-primary">About Ronit</h3>
        </div>

        {/* Preview Content */}
        <div className="text-sm text-text-secondary leading-relaxed space-y-3">
          <p>
            I didn't start my journey knowing I would become a Data Scientist.
          </p>
          <p>
            When I joined Adani University in 2022 for Information and Communication Technology, 
            I spent time exploring different areas of technology—from software development 
            concepts to mobile applications—trying to understand where my curiosity naturally pulled me.
          </p>
          <p>
            That curiosity eventually led me to Data Science. What started as learning Python and machine 
            learning quickly evolved into building recommendation systems, analytics platforms, forecasting 
            models, and agentic AI workflows.
          </p>
          <p>
            Today, I focus on building systems that combine data, machine learning, analytics, and AI to help 
            people make better decisions.
          </p>
        </div>

        {/* Read More Accordion */}
        {isExpanded && (
          <div className="pt-4 border-t border-border-subtle/40 space-y-6 text-sm text-text-secondary leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Who I Am */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2 select-none">
                <Circle size={6} className="fill-accent-primary text-accent-primary" />
                Who I Am
              </h4>
              <p>
                I'm Ronit Rajput, a Data Scientist and AI Systems Builder who recently completed a B.Tech 
                in Information and Communication Technology from Adani University.
              </p>
              <p>
                My path into Data Science wasn't planned from day one. Like many students, I started college 
                exploring different areas of technology. I spent time learning software development concepts 
                and experimenting with mobile application development before realizing that what interested 
                me most wasn't the application itself—it was the data behind it.
              </p>
              <div className="bg-bg-primary/40 rounded-lg p-4 border border-border-subtle/50 space-y-2">
                <span className="text-xs font-semibold text-text-primary select-none">
                  I became fascinated by questions like:
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-text-secondary">
                  <li>Why do users behave differently?</li>
                  <li>How can future outcomes be predicted?</li>
                  <li>How can data help businesses make better decisions?</li>
                  <li>Can repetitive analytical work be automated?</li>
                </ul>
              </div>
            </div>

            {/* The Turning Point */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2 select-none">
                <Circle size={6} className="fill-accent-primary text-accent-primary" />
                The Turning Point
              </h4>
              <p>
                During my third year of college, I started learning Python, Machine Learning, Statistics, and Data Analysis.
              </p>
              <p>
                The more I learned, the more I realized that I enjoyed solving problems through data rather 
                than building traditional user interfaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-1 select-none">
                <div className="flex-1 p-3 rounded-lg bg-bg-surface border border-border-subtle">
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Instead of asking:</span>
                  <p className="text-xs text-danger font-medium mt-1">"How do I build this application?"</p>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-bg-surface border border-accent-primary/20">
                  <span className="text-[10px] text-accent-primary uppercase font-bold tracking-wider">I found myself asking:</span>
                  <p className="text-xs text-success font-medium mt-1">"What insights can we extract from the data generated by this application?"</p>
                </div>
              </div>
              <p className="pt-1">
                That shift completely changed my direction.
              </p>
            </div>

            {/* From Learning to Building */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2 select-none">
                <Circle size={6} className="fill-accent-primary text-accent-primary" />
                From Learning To Building
              </h4>
              <p>
                Once I discovered Data Science, I focused on building projects that solved real problems:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 select-none">
                <Link
                  to="/projects/real-estate-recommender"
                  className="p-3 rounded-lg bg-bg-primary hover:bg-bg-hover border border-border-subtle hover:border-accent-primary/30 transition-all text-xs font-semibold text-text-primary text-center"
                >
                  Real Estate Support System
                </Link>
                <Link
                  to="/projects/smartcv"
                  className="p-3 rounded-lg bg-bg-primary hover:bg-bg-hover border border-border-subtle hover:border-accent-primary/30 transition-all text-xs font-semibold text-text-primary text-center"
                >
                  SmartCV
                </Link>
                <Link
                  to="/projects/data-science-copilot"
                  className="p-3 rounded-lg bg-bg-primary hover:bg-bg-hover border border-border-subtle hover:border-accent-primary/30 transition-all text-xs font-semibold text-text-primary text-center"
                >
                  Data Science Copilot
                </Link>
              </div>
              <p className="pt-1">
                Through these projects, I learned that building a model is only a small part of solving a problem. 
                The real challenge is creating systems people can actually use.
              </p>
            </div>

            {/* Industry Experience */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2 select-none">
                <Circle size={6} className="fill-accent-primary text-accent-primary" />
                Industry Experience
              </h4>
              <p>
                My internship at Tatvic Analytics gave me the opportunity to work on production analytics and AI systems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  "Forecasting pipelines using BigQuery ML",
                  "Anomaly detection systems",
                  "Analytics automation workflows",
                  "Agentic AI systems built with LangGraph",
                  "Vertex AI-powered validation workflows",
                  "GA4 and BigQuery analytics solutions",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 size={14} className="text-success shrink-0 mt-0.5 select-none" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="pt-2">
                One of the biggest lessons from that experience was understanding that accuracy alone isn't enough. 
                A technically correct system has little value if users don't trust it.
              </p>
            </div>

            {/* What I Build Today */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2 select-none">
                <Circle size={6} className="fill-accent-primary text-accent-primary" />
                What I Build Today
              </h4>
              <p>
                Today my interests sit at the intersection of:
              </p>
              <div className="flex flex-wrap gap-2 select-none">
                {[
                  "Data Science",
                  "Analytics Engineering",
                  "Machine Learning",
                  "Agentic AI Systems",
                  "Cloud-Native Data Platforms",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded bg-bg-primary border border-border-subtle text-xs font-medium text-text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Beyond Technology */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2 select-none">
                <Circle size={6} className="fill-accent-primary text-accent-primary" />
                Beyond Technology
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 select-none">
                <div className="p-2.5 rounded bg-bg-primary/30 border border-border-subtle text-xs flex items-center gap-2">
                  <span>🌍</span> <span>Traveling and exploring new places</span>
                </div>
                <div className="p-2.5 rounded bg-bg-primary/30 border border-border-subtle text-xs flex items-center gap-2">
                  <span>🎤</span> <span>Watching stand-up comedy</span>
                </div>
                <div className="p-2.5 rounded bg-bg-primary/30 border border-border-subtle text-xs flex items-center gap-2">
                  <span>🎵</span> <span>Listening to music</span>
                </div>
                <div className="p-2.5 rounded bg-bg-primary/30 border border-border-subtle text-xs flex items-center gap-2">
                  <span>🎬</span> <span>Watching movies and TV series from every generation</span>
                </div>
                <div className="p-2.5 rounded bg-bg-primary/30 border border-border-subtle text-xs flex items-center gap-2">
                  <span>🏏</span> <span>Following cricket (hardcore RCB supporter)</span>
                </div>
                <div className="p-2.5 rounded bg-bg-primary/30 border border-border-subtle text-xs flex items-center gap-2">
                  <span>🦸</span> <span>Following the Marvel Cinematic Universe</span>
                </div>
              </div>
            </div>

            {/* Looking Ahead */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2 select-none">
                <Circle size={6} className="fill-accent-primary text-accent-primary" />
                Looking Ahead
              </h4>
              <p>
                My long-term goal is to build AI-native products that combine machine learning, analytics 
                engineering, and agentic systems to automate decision-making and solve meaningful business problems.
              </p>
              <blockquote className="border-l-2 border-accent-primary pl-4 py-1 italic text-text-primary bg-bg-primary/30 rounded-r select-none">
                "The most impactful systems are not the ones that generate insights—they are the ones that help people act on them."
              </blockquote>
            </div>
          </div>
        )}

        {/* Read More button trigger */}
        <div className="flex justify-center select-none pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-text-secondary hover:text-accent-primary border border-border-subtle hover:border-accent-primary/45 rounded-lg bg-bg-surface hover:bg-bg-hover transition-all duration-300 cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>Read More</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
