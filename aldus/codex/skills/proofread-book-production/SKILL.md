---
name: proofread-book-production
description: "Aldus procedure, for work on an Aldus book: Proofread the actual strict Aldus release candidate across EPUB, PDF, DOCX, fixed-layout, or graphic transcript outputs before final approval. Use after strict candidate build and rerun whenever a reviewed artifact changes."
---

# proofread-book-production

This is one of Aldus's procedures. The procedure itself is served by the Aldus connector, not kept in this plugin.

1. Before any step it covers, call the Aldus `get_procedure` tool with the name `proofread-book-production` and read it in full. Follow it through the Aldus tools, as its first lines say.
2. Read it again whenever your context was compacted or summarized, before you go on with its steps. Never work from memory of it.
3. It applies only to work on an Aldus book, inside a job you took with `take_job`. The `$aldus` skill says how that work runs.
