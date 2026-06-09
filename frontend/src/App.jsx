import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Assistant from "./pages/Assistant";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Architecture from "./pages/Architecture";
import ArchitectureDetail from "./pages/ArchitectureDetail";
import Journal from "./pages/Journal";
import Timeline from "./pages/Timeline";
import GitHub from "./pages/GitHub";
import Resume from "./pages/Resume";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Default route redirects to assistant */}
          <Route index element={<Navigate to="/assistant" replace />} />
          
          <Route path="assistant" element={<Assistant />} />
          
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          
          <Route path="architecture" element={<Architecture />} />
          <Route path="architecture/:slug" element={<ArchitectureDetail />} />
          
          <Route path="journal" element={<Journal />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="github" element={<GitHub />} />
          <Route path="resume" element={<Resume />} />
          
          {/* Catch-all fallback redirects to assistant */}
          <Route path="*" element={<Navigate to="/assistant" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
