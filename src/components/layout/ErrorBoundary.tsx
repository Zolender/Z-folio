import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

// Top-level fallback so a runtime throw in any component doesn't
// white-screen the whole site.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-muted px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-muted/70 mb-3">
            Something broke
          </p>
          <p className="mb-4 max-w-sm">
            An unexpected error occurred while rendering this page.
          </p>
          <button
            onClick={this.handleReload}
            className="text-sm text-accent hover:underline"
          >
            Back home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
