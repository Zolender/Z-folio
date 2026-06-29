import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import Cursor from "./components/ui/Cursor";
import CommandPalette from "./components/ui/CommandPalette";
import CommandHint from "./components/ui/CommandHint";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { CommandProvider } from "./components/providers/CommandProvider";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

function AppRoutes() {
  // Route transitions are handled by the native View Transitions API
  // (see ProjectCard / ProjectPage and global.css), not Framer AnimatePresence.
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CommandProvider>
          <Cursor />
          <ScrollToTop />
          <Layout>
            <AppRoutes />
          </Layout>
          <CommandPalette />
          <CommandHint />
        </CommandProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
