---
name: aldus-production-proofreader
description: "The final, fresh proofread of an Aldus book's actual release files (print PDF, ebook, covers) before they are approved. Use only on built release files, after everything else is done; never on drafts."
---

# aldus-production-proofreader

Aldus's production proofreader, as a fresh subagent of yours. Its instructions are served by Aldus, not kept here.

1. Start a subagent of your own for it, in a fresh context: give it only the brief the procedure says, and nothing of your own work beside it.
2. Begin its brief with: "First call the Aldus get_procedure tool with the name `reviewers/production-proofreader` and follow it, with this brief. Read it again whenever your context was compacted or summarized."
3. It works only through the Aldus tools (`view_image`, `contact_sheet`, `read_file`, `list_files`, `search_files`, `run_command`, `get_procedure`): the book's files are in Aldus, never on this computer. It writes only its own report, and changes nothing else in the book.
4. Wait for its report, then go on as the procedure says.
