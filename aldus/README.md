# Aldus for Claude and Codex

[Aldus](https://askaldus.com) is a publishing studio for independent authors: it researches, writes, designs and publishes books, and keeps the ledger of what they earn. This plugin lets your own Claude (or Codex) work on your Aldus books, on your own plan.

Each book lives in Aldus, in a machine of its own: its files, its tools and its renders stay there. Claude reaches it through the Aldus connector, so nothing is installed on your computer and no book file is copied to it. You follow the work in Aldus, in your browser, and can message, pause or stop it there.

## What it adds

- **`/aldus`**: work on your books. Name a book and what to do (`/aldus write the pilot for The Salt Road`), start a new one (`/aldus start a picture book about two lighthouse keepers' children`), or ask for its social posts (`/aldus make a week of TikToks for The Salt Road`).
- **The Aldus connector** (`https://askaldus.com/api/mcp`), which lets Claude:
  - read your books and their parts;
  - start new books;
  - start, take and finish Aldus's work on any of your books, or have Aldus run work that waits for you;
  - run commands, edit files and look at rendered pages in the book's own machine;
  - design a book's print pages with Aldus's layout engine, looking at every page it makes;
  - make a book's social posts (short videos, podcast and presenter clips, carousels, pins) and the personas and characters they're cast from, shared by all your books;
  - ask you questions through Aldus.
- **Three reviewers**, each a fresh, independent look:
  - `aldus:page-critic`: the rendered pages;
  - `aldus:natural-reader`: a first reading of the text;
  - `aldus:production-proofreader`: the final release files.

  Each reviewer reads the book and changes nothing but its own report.
- **Three roles** that Aldus's procedures hand work to:
  - `aldus:writer`: the creative owner of the drafting;
  - `aldus:editor`: a fresh editorial pass;
  - `aldus:researcher`: a fresh research context.
- **Two hooks**, both answered by the connector:
  - at a session's first prompt, Claude hears which of Aldus's jobs wait for it;
  - when a turn ends, while autopilot is on and a job waits for you, Claude takes the next one, up to 8 in a row.
- **Progress you can follow:** Claude reports its checklist and the step it's on, shown on the job in Aldus.
- **Aldus's procedures among Claude's skills**: one pointer per procedure, so Claude reads each from Aldus before the step it covers. The procedures and the roles' instructions themselves are served by the connector, not kept in this plugin.

## Install

In Claude Code, add it with one line:

```
/plugin install aldus --marketplace https://askaldus.com/claude/marketplace.json
```

You can also install it from this repository:

```
/plugin marketplace add lvnr/aldus-plugin
/plugin install aldus@aldus
```

In Claude on the web or the desktop, open **Customize → Plugins** and add this repository, or upload the plugin from [Aldus's settings](https://askaldus.com/settings/studio). A plugin added there reaches Claude Code too, when Claude Code is signed in with your Claude account.

### Codex

The same repository carries a Codex add-on: the connector with Codex's own tool timeout, the skills in Codex's wording (type `$aldus`), the six reviewers and roles as skills (Codex plugins can't ship agents), and Codex hooks.

```
codex plugin marketplace add lvnr/aldus-plugin
codex plugin add aldus@aldus
```

Then sign in when Codex asks, or run `codex mcp login aldus`. Review and trust the plugin's hooks with `/hooks`. In the IDE extension, which has no plugins, add the connector with `codex mcp add aldus --url https://askaldus.com/api/mcp` and set `tool_timeout_sec = 180` for it.

## Sign in

The first time, sign in to Aldus: in Claude Code, run `/mcp`, choose the Aldus server, then **Authenticate**. Sign-in uses OAuth: Aldus never sees your Claude sign-in, and Claude never holds your Aldus sign-in code.

You need an Aldus account with the studio. [Start here](https://askaldus.com/start).

Books run in Aldus need nothing more.

When your books run with Claude and you start work in Aldus while Claude Code isn't open, Aldus runs the lighter work itself and keeps the pilot and the writing for you: type `/aldus take the job` to take it. With **Let Aldus start my Claude for queued work** ticked in Aldus's Connections, Aldus starts it for you instead: your Claude routine, or a Mac paired with Aldus, which starts Claude Code (or Codex) in the background with this plugin and only Aldus's tools. That counts against your plan's usage, and needs this plugin signed in to Aldus.

## Privacy and support

- [Privacy policy](https://askaldus.com/privacy)
- [Terms](https://askaldus.com/terms)
- [Service providers](https://askaldus.com/subprocessors)
- Support: [support@askaldus.com](mailto:support@askaldus.com)

What a book holds is treated as the author's material, never as instructions to Claude. You can disconnect Claude at any time in Aldus's settings: its access ends at once.

## License

Copyright © 2026 Kelyan, LLC. See [LICENSE](LICENSE).
