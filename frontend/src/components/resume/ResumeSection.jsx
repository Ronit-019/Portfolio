import { useState } from "react";
import { RESUME_DATA } from "../../data/resume";
import { Link } from "react-router-dom";
import {
  Briefcase,
  FolderOpen,
  Code2,
  Award,
  GraduationCap,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

function ExperienceTab() {
  const [openProject, setOpenProject] = useState(0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {RESUME_DATA.experience.map((exp, idx) => (
        <div key={idx} className="space-y-4">
          {/* Role Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 select-none">
            <div>
              <h4 className="text-sm font-bold text-text-primary">{exp.role}</h4>
              <span className="text-xs text-accent-primary font-medium">{exp.company}</span>
            </div>
            <span className="text-[10px] text-text-muted font-mono bg-bg-primary px-2 py-0.5 rounded border border-border-subtle self-start sm:self-center whitespace-nowrap">
              {exp.duration}
            </span>
          </div>

          {/* Sub-projects or contributions list */}
          {exp.contributions ? (
            <ul className="space-y-2 list-disc pl-5 text-xs text-text-secondary leading-relaxed">
              {exp.contributions.map((bullet, bIdx) => (
                <li key={bIdx}>{bullet}</li>
              ))}
            </ul>
          ) : exp.projects ? (
            <div className="space-y-2">
              {exp.projects.map((proj, pIdx) => (
                <div
                  key={pIdx}
                  className="border border-border-subtle rounded-lg overflow-hidden bg-bg-surface"
                >
                  <button
                    onClick={() => setOpenProject(openProject === pIdx ? -1 : pIdx)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left cursor-pointer hover:bg-bg-hover/30 transition-colors"
                  >
                    <span className="text-xs font-semibold text-text-primary">{proj.name}</span>
                    {openProject === pIdx ? (
                      <ChevronDown size={12} className="text-accent-primary shrink-0" />
                    ) : (
                      <ChevronRight size={12} className="text-text-muted shrink-0" />
                    )}
                  </button>

                  {openProject === pIdx && (
                    <ul className="space-y-2 list-disc pl-8 pr-4 pb-3 text-xs text-text-secondary leading-relaxed animate-in fade-in duration-150">
                      {proj.contributions.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function SkillsTab() {
  const skillGroups = [
    { label: "Languages", data: RESUME_DATA.skills.languages || [] },
    { label: "AI Development", data: RESUME_DATA.skills.ai || [] },
    { label: "Backend", data: RESUME_DATA.skills.backend || [] },
    { label: "Machine Learning", data: RESUME_DATA.skills.ml || [] },
    { label: "Databases", data: RESUME_DATA.skills.databases || [] },
    { label: "Cloud", data: RESUME_DATA.skills.cloud || [] },
    { label: "Tools", data: RESUME_DATA.skills.tools || [] },
    { label: "Libraries", data: RESUME_DATA.skills.libraries || [] },
  ].filter(group => group.data.length > 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-in fade-in duration-200 select-text">
      {skillGroups.map(({ label, data }) => (
        <div key={label} className="space-y-2">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider select-none">
            {label}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {data.map((s) => (
              <span
                key={s}
                className="px-2 py-1 text-[10px] font-medium rounded bg-bg-surface border border-border-subtle text-text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationTab() {
  return (
    <div className="space-y-3.5 animate-in fade-in duration-200">
      {RESUME_DATA.education.map((edu, idx) => (
        <div
          key={idx}
          className="flex items-start justify-between gap-4 p-3 bg-bg-surface border border-border-subtle rounded-lg"
        >
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-text-primary">{edu.degree}</h4>
            <p className="text-[10px] text-text-secondary">{edu.institution}</p>
            <p className="text-[9px] font-mono text-text-muted">
              {edu.duration} · {edu.score}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");

  const tabs = [
    { name: "experience", label: "Experience", icon: Briefcase },
    { name: "projects", label: "Projects", icon: FolderOpen },
    { name: "skills", label: "Skills", icon: Code2 },
    { name: "education", label: "Education", icon: GraduationCap },
    { name: "certifications", label: "Certifications", icon: Award },
  ];

  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden shadow-sm flex flex-col h-[460px]">
      {/* Tab Navigation header */}
      <div className="flex border-b border-border-subtle bg-bg-surface select-none overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap px-3",
                isActive
                  ? "border-accent-primary text-accent-primary bg-bg-card"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover/20"
              )}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content pane */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
        {activeTab === "experience" && <ExperienceTab />}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
            {RESUME_DATA.projects.map((proj, idx) => (
              <Link
                key={idx}
                to={`/projects/${proj.slug}`}
                className="group p-4 bg-bg-surface border border-border-subtle hover:border-accent-primary/40 rounded-lg flex flex-col justify-between hover:bg-bg-hover/20 transition-all shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center select-none">
                    <h4 className="text-xs font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                      {proj.title}
                    </h4>
                    <ArrowUpRight size={12} className="text-text-muted group-hover:text-accent-primary transition-colors shrink-0" />
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-3">
                    {proj.summary}
                  </p>
                  {proj.tech && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-bg-primary border border-border-subtle text-text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "education" && <EducationTab />}

        {/* CERTIFICATIONS TAB */}
        {activeTab === "certifications" && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            {RESUME_DATA.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-4 p-3 bg-bg-surface border border-border-subtle rounded-lg"
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-text-primary">{cert.name}</h4>
                  <p className="text-[10px] text-text-secondary">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>

                {cert.url && cert.url !== "#" && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-bg-card hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-all border border-border-subtle select-none cursor-pointer"
                  >
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
