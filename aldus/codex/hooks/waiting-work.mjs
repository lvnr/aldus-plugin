#!/usr/bin/env node
// Aldus's SessionStart hook for Codex: a line telling the session where to see what waits for it in
// Aldus (the waiting_work tool). Codex's hooks run commands, not the connector's tools, so the
// agent asks Aldus itself. It reads and sends nothing.
process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext:
        "The Aldus plugin is installed. When the author asks about their books in Aldus, or what waits for you there, call the Aldus waiting_work tool first; take a waiting job with take_job.",
    },
  }),
);
