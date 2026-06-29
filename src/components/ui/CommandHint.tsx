import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X } from "lucide-react";
import { useCommand } from "../providers/CommandProvider";
import { useMotion } from "../../hooks/useMotion";

const SEEN_KEY = "portfolio-cmd-hint-seen";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
const isFine =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export default function CommandHint() {
  const { open } = useCommand();
  const { reduced } = useMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    // Let the page settle before nudging; auto-dismiss after a while.
    const showTimer = setTimeout(() => setShow(true), 2600);
    const hideTimer = setTimeout(() => dismiss(), 12000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    setShow(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore — worst case the hint shows again next visit
    }
  }

  function tryIt() {
    dismiss();
    open();
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.18 } }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 w-[calc(100%-2rem)] sm:w-auto"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-edge bg-surface/95 backdrop-blur-md px-4 py-3 shadow-2xl shadow-black/40">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Command className="h-4 w-4" />
            </span>
            <button onClick={tryIt} className="text-left">
              <p className="text-sm text-ink leading-tight">
                {isFine ? (
                  <>
                    Press{" "}
                    <kbd className="text-[11px] font-medium border border-edge rounded px-1 py-0.5">
                      {isMac ? "⌘K" : "Ctrl K"}
                    </kbd>{" "}
                    to jump anywhere
                  </>
                ) : (
                  "Tap for quick navigation & themes"
                )}
              </p>
              <p className="text-xs text-muted mt-0.5">Commands, projects, accent colors</p>
            </button>
            <button
              onClick={dismiss}
              aria-label="Dismiss hint"
              className="ml-1 shrink-0 text-muted hover:text-ink transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
