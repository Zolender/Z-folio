import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import Cursor from "./components/ui/Cursor";
import CommandPalette from "./components/ui/CommandPalette";
import CommandHint from "./components/ui/CommandHint";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { CommandProvider } from "./components/providers/CommandProvider";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </AnimatePresence>
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
            <AnimatedRoutes />
          </Layout>
          <CommandPalette />
          <CommandHint />
        </CommandProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
