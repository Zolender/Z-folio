import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-muted px-6">
      <p className="text-xs tracking-widest uppercase text-muted/70 mb-3">404</p>
      <p className="mb-4">This page doesn't exist.</p>
      <Link to="/" className="text-sm text-accent hover:underline">
        Back home
      </Link>
    </div>
  );
}
