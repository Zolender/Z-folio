import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";
import SectionRail from "../ui/SectionRail";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      <SectionRail />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
