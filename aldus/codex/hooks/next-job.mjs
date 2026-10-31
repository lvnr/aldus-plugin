#!/usr/bin/env node
// Aldus's Stop hook for Codex. Codex's hooks run commands, not the connector's tools, so this one
// only asks: after the session finished an Aldus job (finish_job) and hasn't asked since, it blocks
// the stop and has the agent call the Aldus next_job tool, which hands over the next job while
// autopilot is on, or answers [aldus:no-job]. At most 8 continuations in a row, counted here.
// It reads the session's own transcript and writes one small count file; it sends nothing anywhere.
import { closeSync, mkdirSync, openSync, readFileSync, readSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const MAX_CONTINUATIONS = 8;
const TAIL_BYTES = 2 * 1024 * 1024;
const MARKS = ["[aldus:job-waits]", "[aldus:no-job]"];
const REASON =
  "You finished an Aldus job. Call the Aldus next_job tool with no arguments: if it hands you a job, take it and do it the same way, through the Aldus tools, to finish_job; if it says no job waits, end here.";

function readInput() {
  try {
    return JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

function tailOf(file) {
  try {
    const size = statSync(file).size;
    const length = Math.min(size, TAIL_BYTES);
    const buffer = Buffer.alloc(length);
    const fd = openSync(file, "r");

    try {
      readSync(fd, buffer, 0, length, size - length);
    } finally {
      closeSync(fd);
    }

    return buffer.toString("utf8");
  } catch {
    return "";
  }
}

/** True when the transcript shows a finished Aldus job since the last next_job answer. */
export function finishedSinceAsked(text) {
  const lastMark = Math.max(...MARKS.map((mark) => text.lastIndexOf(mark)));
  const lastFinish = text.lastIndexOf('finish_job"');

  return lastFinish !== -1 && lastFinish > lastMark;
}

function main() {
  const input = readInput();
  const session = String(input.session_id ?? "session").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 100) || "session";
  const dir = process.env.PLUGIN_DATA || process.env.CLAUDE_PLUGIN_DATA || path.join(os.homedir(), ".aldus", "codex");
  const file = path.join(dir, "stop-runs.json");
  let runs = {};

  try {
    runs = JSON.parse(readFileSync(file, "utf8"));
  } catch {
    runs = {};
  }

  const count = input.stop_hook_active === true ? Number(runs[session] ?? 0) : 0;
  const transcript = typeof input.transcript_path === "string" ? tailOf(input.transcript_path) : "";
  const block = count < MAX_CONTINUATIONS && finishedSinceAsked(transcript);

  runs[session] = block ? count + 1 : 0;

  try {
    mkdirSync(dir, { recursive: true });
    // Only the latest sessions are kept.
    writeFileSync(file, JSON.stringify(Object.fromEntries(Object.entries(runs).slice(-50))));
  } catch {
    // A count that can't be kept stops nothing.
  }

  if (block) {
    process.stdout.write(JSON.stringify({ decision: "block", reason: REASON }));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
