import { BrowserRouter, Routes, Route } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import Cursor from "./components/ui/Cursor";
import CommandPalette from "./components/ui/CommandPalette";
import CommandHint from "./components/ui/CommandHint";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { CommandProvider } from "./components/providers/CommandProvider";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  // Route transitions are handled by the native View Transitions API
  // (see ProjectCard / ProjectPage and global.css), not Framer AnimatePresence.
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="*" element={<NotFound />} />
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
          <ErrorBoundary>
            <Layout>
              <AppRoutes />
            </Layout>
          </ErrorBoundary>
          <CommandPalette />
          <CommandHint />
          <Analytics />
        </CommandProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
