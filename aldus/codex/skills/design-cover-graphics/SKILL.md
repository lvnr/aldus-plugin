---
name: design-cover-graphics
description: "Aldus procedure, for work on an Aldus book: Draw a cover's own graphics and set its type in the Cover room: SVG ornaments, frames, patterns, rules, emblems and spine devices as Matenadar elements, art and type spanning back, spine and front, and the clean-plate cover's title, subtitle, author and b…"
---

# design-cover-graphics

This is one of Aldus's procedures. The procedure itself is served by the Aldus connector, not kept in this plugin.

1. Before any step it covers, call the Aldus `get_procedure` tool with the name `design-cover-graphics` and read it in full. When this session exposes native image generation and the author has not chosen Aldus's image service, include `native_image_generation: true`. Follow it through the Aldus tools, as its first lines say.
2. Read it again whenever your context was compacted or summarized, before you go on with its steps. Never work from memory of it.
3. It applies only to work on an Aldus book, inside a job you took with `take_job`. The `$aldus` skill says how that work runs.
