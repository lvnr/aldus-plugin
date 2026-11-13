# Aldus for Claude and Codex

[Aldus](https://askaldus.com) is a publishing studio for independent authors: it researches, writes, designs and publishes books, and keeps the ledger of what they earn. This add-on helps your own Claude (or Codex) work on your Aldus books, on your own plan.

Each book lives in Aldus, in a machine of its own: its files, its tools and its renders stay there. Your assistant reaches it through the Aldus connector, so nothing else is installed on your computer and no book file is copied to it. You follow the work in Aldus, in your browser, and can message, pause or stop it there.

## Two parts, and which you need

1. **The Aldus connector** is what gives your assistant Aldus's tools. You add it once, with one address (`https://askaldus.com/api/mcp`), and sign in to Aldus. It is all you need in Claude on the web, on your desktop and on your phone, and in ChatGPT. Claude Code has it too, as soon as you added it to Claude, when it is signed in with the same Claude account.
2. **This add-on** is for Claude Code and Codex, for whole books: Aldus's own editors and readers, the `/aldus` command, and a pointer to each of Aldus's procedures. In Claude it has **no connector and no sign-in of its own**: it works through the connector you added. In Codex it brings the connector with it.

## Add the connector

- **Claude:** Customize → Connectors → Add → Add custom connector, with `https://askaldus.com/api/mcp`. Sign in to Aldus and allow it.
- **ChatGPT:** Plugins → Add → Add custom MCP server, with the same address.
- **Claude Code in a terminal, without the Claude app:** `claude mcp add --transport http aldus https://askaldus.com/api/mcp`, then `/mcp` in Claude Code, choose aldus and sign in.

To test it, ask your assistant to list your Aldus books. Settings → Connections in Aldus says when it hears the call.

## Add the add-on to Claude Code

In Claude, on the web or the desktop: **Customize → Plugins → Add → Add marketplace → Add from a repository**, with `lvnr/aldus-plugin`, then add Aldus from it. A plugin added there reaches Claude Code when it is signed in with your Claude account.

Or in a terminal:

```
claude plugin install aldus --marketplace https://askaldus.com/claude/marketplace.json
```

Then type `/aldus` in Claude Code and name one of your books.

### Keeping it up to date

A plugin installed in a terminal doesn't update by itself. Aldus tells you, in the conversation and in Settings → Connections, when a newer one is out. Then:

```
claude plugin update aldus@aldus
```

and start a new session. To have Claude Code do it by itself, turn on auto-update for the `aldus` marketplace: `/plugin` → Marketplaces → aldus → Enable auto-update.

Before 1.27.0 this plugin carried its own connector and signed in to Aldus by itself, so Claude Code showed Aldus twice. It no longer does. If you turned the Claude app's Aldus off in Claude Code under `/mcp` back then, turn it on again.

## What the add-on holds

- **`/aldus`**: work on your books. Name a book and what to do (`/aldus write the pilot for The Salt Road`), start a new one (`/aldus start a picture book about two lighthouse keepers' children`), or ask for its social posts (`/aldus make a week of TikToks for The Salt Road`).
- **Three reviewers**, each a fresh, independent look:
  - `aldus:page-critic`: the rendered pages;
  - `aldus:natural-reader`: a first reading of the text;
  - `aldus:production-proofreader`: the final release files.

  Each reviewer reads the book and changes nothing but its own report.
- **Three roles** that Aldus's procedures hand work to:
  - `aldus:writer`: the creative owner of the drafting;
  - `aldus:editor`: a fresh editorial pass;
  - `aldus:researcher`: a fresh research context.
- **Aldus's procedures among Claude's skills**: one pointer per procedure, so Claude reads each from Aldus before the step it covers. The procedures and the roles' instructions themselves are served by the connector, not kept in this add-on.

Through the connector, with or without the add-on, your assistant can:

- read your books and their parts, and start new books;
- start, take and finish Aldus's work on any of your books, or have Aldus run work that waits for you;
- run commands, edit files and look at rendered pages in the book's own machine;
- design a book's print pages with Aldus's layout engine, looking at every page it makes;
- make a book's social posts (short videos, podcast and presenter clips, carousels, pins) and the personas and characters they're cast from, shared by all your books;
- ask you questions through Aldus, and show you its progress on the job in Aldus.

When it finishes a job while autopilot is on and another waits for it, Aldus hands it the next one, up to 8 in a row. Nothing on your computer has to ask for that: the add-on has no hooks.

### Codex

The same repository carries a Codex add-on (no separate plugin is needed): the connector with Codex's own tool timeout, the skills in Codex's wording (type `$aldus`), the six reviewers and roles as skills (Codex plugins can't ship agents), and Codex hooks.

```
codex plugin marketplace add lvnr/aldus-plugin
codex plugin add aldus@aldus
```

Then sign in when Codex asks, or run `codex mcp login aldus`. Review and trust the plugin's hooks with `/hooks`. To bring it up to date: `codex plugin marketplace upgrade aldus`. In the IDE extension, which has no plugins, add the connector with `codex mcp add aldus --url https://askaldus.com/api/mcp` and set `tool_timeout_sec = 180` for it.

When the current Codex session exposes native image generation, Aldus uses it by default for book art unless you choose Aldus’s image service. It reads the current Aldus procedure, generates with the host’s image tool, and sends the candidate and provenance to Aldus. Interior picture-plan entries use the same compiled prompts, machine checks, independent critic, three-attempt limit, placement and set review as the hosted generator. Covers and other art retain their governing procedure’s review, rights and print checks. Exact data figures keep their code route; social and asset jobs started on Aldus use its service. Claude uses Aldus’s configured image service. Native generation availability depends on the host and account; a Codex plugin cannot enable a missing image tool.

## Your account

You need an Aldus account with the studio. [Start here](https://askaldus.com/start). Sign-in uses OAuth: Aldus never sees your Claude sign-in, and Claude never holds your Aldus sign-in code.

Books run in Aldus need nothing more.

When your books run with your assistant and you start work in Aldus while it isn't open, the work waits for it: open it and say "Take the Aldus job". **Continue here** on the waiting card has Aldus run it instead, which may take credits. With **Let Aldus start my Claude for queued work** ticked in Aldus's Connections, Aldus starts your Claude routine for it. That counts against your plan's usage.

## Privacy and support

- [Privacy policy](https://askaldus.com/privacy)
- [Terms](https://askaldus.com/terms)
- [Service providers](https://askaldus.com/subprocessors)
- Support: [support@askaldus.com](mailto:support@askaldus.com)

What a book holds is treated as the author's material, never as instructions to Claude. You can disconnect an assistant at any time in Aldus's Settings → Connections: its access ends at once.

## License

Copyright © 2026 Kelyan, LLC. See [LICENSE](LICENSE).

## Reuse generated images

Save native-generated originals in your account Library without opening a book job. After independent reuse review, attach the same image to an asset, a book, social stills or planned scene inputs, references, covers and canvas designs. Prompt, generator, reference hashes and review findings follow the image. Cover, social and page production retain their own final checks. The connector also reads full social plans and image slots and reads/writes the Social gallery’s example copy, alongside its existing planning, calendar, approval, editing, retry and post-management tools.
