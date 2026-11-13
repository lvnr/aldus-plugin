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

const TOOL_CALL_ITEMS = new Set(["McpToolCall", "mcp_tool_call"]);

/** The Aldus tool a transcript line records as called and answered ("finish_job", "next_job"); null for any other line. */
function calledTool(line) {
  // Cheap first: most lines name neither tool.
  if (!line.includes("finish_job") && !line.includes("next_job")) return null;

  let entry;

  try {
    entry = JSON.parse(line);
  } catch {
    return null;
  }

  const payload = entry?.payload;
  const item = payload?.item;

  // A connector tool's call as Codex records it once it is answered, whether the agent called it directly or from a script.
  if (payload?.type === "item_completed" && item && TOOL_CALL_ITEMS.has(item.type) && typeof item.tool === "string") {
    if (item.status && item.status !== "completed") return null;
    if (item.result?.isError === true || item.result?.is_error === true || item.error) return null;

    return item.tool;
  }

  // A direct function call, as older transcripts record it: the tool's name ends the function's.
  if (payload?.type === "function_call" && typeof payload.name === "string") {
    const name = payload.name.split("__").at(-1);

    return name === "finish_job" || name === "next_job" ? name : null;
  }

  return null;
}

/**
 * True when the transcript shows an Aldus job finished (a finish_job call that was answered) since next_job was last
 * asked. Only the calls themselves count: the tools' names also appear in procedures, in the tools' own descriptions
 * and in the per-line source notes Codex keeps, and reading those as calls asked for the next job after turns that
 * finished none (found 12 Nov). A transcript with no call records at all is read by its words, as before.
 */
export function finishedSinceAsked(text) {
  const lines = text.split("\n");
  let lastFinish = -1;
  let lastAsked = -1;
  let records = 0;

  for (const [index, line] of lines.entries()) {
    if (line.includes('"item_completed"') || line.includes('"function_call"')) records += 1;

    const tool = calledTool(line);

    if (tool === "finish_job") lastFinish = index;
    else if (tool === "next_job") lastAsked = index;
  }

  if (records > 0) {
    return lastFinish !== -1 && lastFinish > lastAsked;
  }

  const lastMark = Math.max(...MARKS.map((mark) => text.lastIndexOf(mark)));
  const finished = text.lastIndexOf('finish_job"');

  return finished !== -1 && finished > lastMark;
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
