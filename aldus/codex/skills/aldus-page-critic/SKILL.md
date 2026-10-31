---
name: aldus-page-critic
description: "A fresh, unprimed look at the rendered pages of an Aldus book (interior pages and spreads, chapter openers, puzzle and solution pages, covers, plates), judged from the pages alone. It is design-book-interior's fresh interior reviewer (section 9) and the independent visual review other procedures ask for. It writes its report and registers its verdict; it never makes or fixes the book."
---

# aldus-page-critic

Aldus's page critic, as a fresh subagent of yours. Its instructions are served by Aldus, not kept here.

1. Start a subagent of your own for it, in a fresh context: give it only the brief the procedure says, and nothing of your own work beside it.
2. Begin its brief with: "First call the Aldus get_procedure tool with the name `reviewers/page-critic` and follow it, with this brief. Read it again whenever your context was compacted or summarized."
3. It works only through the Aldus tools (`view_image`, `contact_sheet`, `list_files`, `read_file`, `get_procedure`, `write_file`, `run_book_tool`, `describe_book_tool`, `job_status`): the book's files are in Aldus, never on this computer. It writes only its own report, and changes nothing else in the book.
4. Wait for its report, then go on as the procedure says.
