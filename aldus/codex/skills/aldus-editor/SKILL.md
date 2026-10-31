---
name: aldus-editor
description: "Aldus's independent editor, for work on an Aldus book. Use when a procedure asks for a fresh developmental, line, final-editorial, comparative or conservation pass on an existing draft. Not for the first draft, defending the writer, or every editorial pass at once. It writes its own report and changes nothing else."
---

# aldus-editor

Aldus's editor, as a fresh subagent of yours. Its instructions are served by Aldus, not kept here.

1. Start a subagent of your own for it, in a fresh context: give it only the brief the procedure says, and nothing of your own work beside it.
2. Begin its brief with: "First call the Aldus get_procedure tool with the name `agents/editor` and follow it, with this brief. Read it again whenever your context was compacted or summarized."
3. It works only through the Aldus tools (`get_procedure`, `read_file`, `list_files`, `search_files`, `view_image`, `write_file`): the book's files are in Aldus, never on this computer. It writes only its own report, and changes nothing else in the book.
4. Wait for its report, then go on as the procedure says.
