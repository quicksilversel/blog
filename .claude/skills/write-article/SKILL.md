---
name: write-article
description: Write or revise a blog article, snippet, or project-series part from any source material (a PR/issue URL, notes, a topic, or a debugging story). Covers placement, tone matching, keeping posts self-contained, series bookkeeping, and verification. Use whenever the user asks to write about something for the blog.
---

# Writing an article

The rules in AGENTS.md ("Writing articles" / "Writing projects") always apply: no em dashes, no confidential or personal information, frontmatter shape, quoted dates, topic reuse, internal link form. This skill is the workflow around them.

## 1. Gather the source material

The input can be anything: a GitHub PR or issue URL, a pasted error, rough notes, or just "write about X".

- **PR/issue URLs**: fetch via `gh pr view <n> --repo <org/repo> --json title,body,files,additions,deletions,commits` and `gh pr diff`. If the PR body links an issue, fetch that too; the issue often contains the research and reasoning that makes the article worth reading.
- Identify the **story**, not just the change: what was surprising, what failed first, what would the reader mis-assume? The user's framing ("the problem was OOM", "this was revealing because...") is the article's centerpiece; ask for it if no angle is apparent.

## 2. Decide placement

- **Part of an existing project series?** Check `articles/projects/*/index.mdx` descriptions. If the work belongs to a tool/app that already has a series, write it as a new part: date it to sort last, add a "Next:" link to the end of the current last part, and update the series `index.mdx` description if it enumerates the parts (e.g. "Four automations" → "Five").
- **Otherwise a standalone article** in `articles/articles/<category>/`: pick from the existing categories by the article's center of gravity (e.g. error monitoring → `observability`, CI/Docker/cloud → `infrastructure`), not by where the work happened.
- Deployment/debugging war stories about a tool that has a series still usually work better as standalone articles; series parts are for the feature narrative.

## 3. Absorb the tone

Read 3-4 existing articles in the same category or series before drafting. Match voice, structure (problem → investigation → fix → gotchas → TL;DR is the house style for war stories), title conventions (`[Tag] Title` for standalone articles), heading style, and code-snippet density. Do not invent a new format.

## 4. Keep the post self-contained

These are personal posts. Whatever the source material, the published article should stand on its own, with nothing in it that belongs to someone else or points back at a specific project, product, or person (AGENTS.md rule 2). The craft points:

- **Replace, don't delete.** Swap specifics for generic equivalents that keep the story natural ("a recipe app", "an internal UI library", "a teammate"). A post full of holes reads worse than a post about a generic app.
- Use the established `@myorg/<descriptive-name>` convention for package names; existing articles set the pattern.
- Names, URLs, IDs, hostnames, and links to non-public trackers or chats add nothing for the reader; drop them entirely.
- **Sweep beyond the prose.** Code samples, test fixtures, config snippets, and code comments carry names, paths, and terms just as easily as sentences do. Sanitize the diff you quote, not just the paragraphs you write.
- Translate any niche or in-group terminology into plain English so the post is understandable without context.
- Background facts about the stack are fine at the level existing published articles already use. When a draft introduces one that no published article mentions, flag it in the summary so the user can decide.

## 5. Frontmatter and topics

- Use the exact frontmatter shape from AGENTS.md; the user often supplies the `date`, otherwise use today.
- Before choosing `topics`, list what already exists: `grep -h "^topics:" articles/articles/*/*.mdx articles/projects/*/*.mdx | tr -d "[]'" | sed 's/topics: //' | tr ',' '\n' | sed 's/^ *//' | sort -u`. Reuse existing names and casing; introduce a new topic only when nothing close exists.

## 6. Verify

1. `npm run lint:content` must pass.
2. The linter can only catch what it knows about, so also reread the new/edited files (grep helps: names, hostnames, IDs, links) and confirm nothing points outside the post itself.
3. If series files were touched, confirm the "Next:" chain and part dates still order the series correctly.

## 7. Report

Summarize for the user: where the article went and why, the story it tells, what was generalized, any new topic introduced, and anything borderline they may want to reword.
