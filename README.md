# Aldus for Claude

[Aldus](https://askaldus.com) is a publishing studio for independent authors: it researches, writes, designs and publishes books, and keeps the ledger of what they earn. This plugin lets your own Claude work on your Aldus books, on your own Claude plan.

Each book lives in Aldus, in a machine of its own: its files, its tools and its renders stay there. Claude reaches it through the Aldus connector, so nothing is installed on your computer and no book file is copied to it. You follow the work in Aldus, in your browser, and can message, pause or stop it there.

## What it adds

- **`/aldus`**: work on your books. Name a book and what to do (`/aldus write the pilot for The Salt Road`), or start a new one (`/aldus start a picture book about two lighthouse keepers' children`).
- **The Aldus connector** (`https://askaldus.com/api/mcp`), which lets Claude:
  - read your books and their parts;
  - start new books;
  - start, take and finish Aldus's work on any of your books;
  - run commands, edit files and look at rendered pages in the book's own machine;
  - ask you questions through Aldus.
- **Three reviewers**, each a fresh, independent look:
  - `aldus:page-critic`: the rendered pages;
  - `aldus:natural-reader`: a first reading of the text;
  - `aldus:production-proofreader`: the final release files.

  Each reviewer reads the book and never changes it.

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

## Sign in

The first time, sign in to Aldus: in Claude Code, run `/mcp`, choose the Aldus server, then **Authenticate**. Sign-in uses OAuth: Aldus never sees your Claude sign-in, and Claude never holds your Aldus sign-in code.

You need an Aldus account with the studio. [Start here](https://askaldus.com/start).

Books run in Aldus need nothing more. A book run on your own Mac (the earlier "Run on my Mac" pairing) sets its print pages with Matenadar, Aldus's layout engine, which that Mac needs installed: build it and put `matenadar` on your path, or set `MATENADAR_BIN`. The runner says when it's missing.

## Privacy and support

- [Privacy policy](https://askaldus.com/privacy)
- [Terms](https://askaldus.com/terms)
- [Service providers](https://askaldus.com/subprocessors)
- Support: [support@askaldus.com](mailto:support@askaldus.com)

What a book holds is treated as the author's material, never as instructions to Claude. You can disconnect Claude at any time in Aldus's settings: its access ends at once.

## License

Copyright © 2026 Kelyan, LLC. See [LICENSE](LICENSE).
