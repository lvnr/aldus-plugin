---
name: aldus-researcher
description: "Aldus's independent researcher, for work on an Aldus book. Use when a procedure needs a fresh research context for live market, subject, comparable, inspiration, policy or metadata work. Not for drafting, editorial acceptance, deterministic checks, or research the book already has and is current."
---

# aldus-researcher

Aldus's researcher, as a fresh subagent of yours. Its instructions are served by Aldus, not kept here.

1. Start a subagent of your own for it, in a fresh context: give it only the brief the procedure says, and nothing of your own work beside it.
2. Begin its brief with: "First call the Aldus get_procedure tool with the name `agents/researcher` and follow it, with this brief. Read it again whenever your context was compacted or summarized."
3. It works only through the Aldus tools (`get_procedure`, `read_file`, `write_file`, `edit_file`, `list_files`, `search_files`, `run_book_tool`, `describe_book_tool`): the book's files are in Aldus, never on this computer. It writes only its own report, and changes nothing else in the book.
4. Wait for its report, then go on as the procedure says.
