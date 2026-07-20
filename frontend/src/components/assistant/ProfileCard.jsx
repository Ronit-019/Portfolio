import { Mail, Github, Linkedin, FileText, Download, MapPin, GraduationCap } from "lucide-react";

export default function ProfileCard() {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Ronit_Rajput_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-bg-card p-6 shadow-sm hover:shadow-accent-glow transition-all duration-300 select-none">
      {/* Glow decorative effect */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 blur-[80px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Large circular photo */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary opacity-20 blur-sm scale-105" />
          <img
            src="/photo_v2.jpg"
            alt="Ronit Rajput Professional Headshot"
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-border-active hover:border-accent-primary/60 transition-all duration-300"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Details & Socials */}
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
              Ronit Rajput
            </h2>
            <p className="text-sm font-medium text-accent-primary">
              Software Engineer · AI Engineer · Python Developer
            </p>
          </div>

          <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-2xl">
            I specialize in building production analytics platforms, automated data pipelines, 
            forecasting models, and agentic AI systems. I combine machine learning, statistics, 
            and modern cloud infrastructure to create systems that help people make better decisions.
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-text-secondary">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-surface border border-border-subtle">
              <MapPin size={12} className="text-accent-primary" />
              <span>Ahmedabad, India</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-surface border border-border-subtle">
              <GraduationCap size={12} className="text-accent-primary" />
              <span>B.Tech in ICT (8.67 CGPA)</span>
            </div>
          </div>

          {/* Links and CTA Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            {/* Email */}
            <a
              href="mailto:ronitrajput182005@gmail.com"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-surface border border-border-subtle hover:border-accent-primary/40 text-text-secondary hover:text-text-primary transition-all duration-200"
              title="Email Ronit"
            >
              <Mail size={16} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Ronit-019"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-surface border border-border-subtle hover:border-accent-primary/40 text-text-secondary hover:text-text-primary transition-all duration-200"
              title="GitHub Profile"
            >
              <Github size={16} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/ronit-rajput"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-surface border border-border-subtle hover:border-accent-primary/40 text-text-secondary hover:text-text-primary transition-all duration-200"
              title="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>

            {/* Download Resume Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-primary hover:bg-accent-primary/95 text-white text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
            >
              <Download size={13} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
