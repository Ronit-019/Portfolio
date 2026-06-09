import ProfileCard from "../components/assistant/ProfileCard";
import AboutSection from "../components/assistant/AboutSection";
import ImpactSnapshot from "../components/assistant/ImpactSnapshot";
import FeaturedProjects from "../components/assistant/FeaturedProjects";
import ChatWindow from "../components/assistant/ChatWindow";

export default function Assistant() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto py-4 select-text animate-in fade-in duration-300">
      {/* Top Section: Dashboard with Left Side Detail and Right Side Chat Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Card, Bio, and Statistics */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <ProfileCard />
          <AboutSection />
          <ImpactSnapshot />
        </div>

        {/* Right Column: Sticky AI Chat Console */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full lg:sticky lg:top-6">
          <div className="flex flex-col gap-1 select-none border-b border-border-subtle/50 pb-2">
            <h3 className="text-base font-bold text-text-primary">
              AI Assistant Console
            </h3>
            <p className="text-[11px] text-text-secondary">
              Interact with a retrieval-augmented LLM to query Ronit's skill credentials, metrics, and systems thinking.
            </p>
          </div>

          <div className="w-full">
            <ChatWindow />
          </div>
        </div>
      </div>

      {/* Bottom Section: Featured Projects Showcase */}
      <div className="border-t border-border-subtle/40 pt-8 mt-4">
        <FeaturedProjects />
      </div>
    </div>
  );
}
