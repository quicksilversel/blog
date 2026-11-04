---
name: write-article
description: Draft or revise blog articles, snippets, and project-series parts from notes, logs, PRs, issues, or a topic. Preserve the author's personal voice, ground claims in evidence, and choose a structure suited to the story. Use when the user asks to write or edit blog content.
---

# Writing an article

Follow the article and project rules in AGENTS.md for privacy, frontmatter, topics, links, content syntax, and verification. Preserve the user's requested scope and format when revising an existing post.

## Find the story in the source material

Read the supplied notes, session logs, code, or linked PRs and issues before drafting claims about them. For GitHub sources, use the available GitHub tools or `gh pr view`, `gh pr diff`, and `gh issue view` as appropriate. Follow relevant issue links when they explain the reasoning behind a change.

Identify what the author wants to tell the reader: the problem they solved, the assumption that failed, the behavior they discovered, or the judgment they reached. Use the user's framing and corrections. Do not invent hesitation, enthusiasm, frustration, decisions, or hands-on work to make a better story. Ask for missing context only when it materially changes the article; otherwise draft from the available evidence.

## Choose placement

Respect an explicit destination. Otherwise:

- Check existing project-series metadata before creating a new standalone article. A feature or next stage of an existing project may belong in that series; a debugging story about the same app can stand on its own.
- Choose a standalone category by the article's main subject, using the existing categories.
- When adding a series part, preserve the reading order through its date, update existing continuation links where needed, and update project metadata if it enumerates the parts. Follow the series' actual navigation conventions.

## Use the reference for voice, not as a template

The main reference is `articles/articles/fullstack/claude-code-migrates-recipe-app-to-prisma.mdx`. Read it before substantial drafting, along with the category or series examples required by AGENTS.md. Reuse context already read in the current conversation.

Carry over its clarity, personal perspective, and care with evidence. Its headings, length, number of sections, tables, and code density belong to that particular story. Other articles can be much shorter, more technical, or organized differently.

- **Write as the author.** Use first person for their experience, choices, and opinions. Use past tense for what happened and present tense where it makes a technical explanation clearer. Distinguish work done by the author, an agent, or someone else. Do not introduce a collective "we" for a solo project.
- **Prefer plain, concrete language.** Explain the practical result before unfamiliar mechanics. Introduce technical terms when the reader needs them, with enough context to understand their role. Keep the author's natural reactions and turns of phrase when they fit.
- **Give each paragraph a job.** Advance the account, explain a cause, present evidence, or give a judgment. Vary paragraph and sentence lengths naturally. Remove repeated explanations and verdicts that add no new information.
- **Keep claims within the evidence.** Separate an observation from its possible explanation when that distinction matters. State unresolved causes plainly. Do not add a qualification to every sentence or force an uncertainty section when there is nothing useful to say.
- **Use useful specifics.** Include verified measurements, versions, and error messages when they help the reader assess the result. Explain measurement boundaries when needed, and date facts such as pricing that can drift. Do not force a metric into every claim or include private counts merely to sound credible.
- **Make opinions specific and fair.** Explain what worked or frustrated the author and why. Attribute problems to the implementation, tool, platform, or agent as the evidence supports. Do not manufacture praise to balance criticism, or inflate a small cleanup into a product-wide advantage.

## Build a readable path through this story

Choose an order that helps a reader unfamiliar with the project. Do not apply a fixed article outline.

The opening should establish enough context to understand the work and why it matters. A disclosure, title, or stack diagram does not replace that context. A brief result early on can help orient the reader, but a TL;DR is optional and should not introduce the project halfway through its conclusion.

Use chronology when later events depend on earlier ones. Introduce deployment work before describing the running deployment; explain the initial failure before listing retries. When grouping related incidents instead, make any time shifts clear. A direct fix or explanation can lead a short working note without a long narrative introduction.

Choose headings that tell the reader what a section contributes. Claims and concrete questions often work well, but a useful descriptive heading is fine. Split a dense section when its question changes, not after an arbitrary number of paragraphs. Keep transitions brief and explain what the next stage is meant to resolve.

Adapt to the article's purpose:

- A debugging account needs the symptom, the reasoning that led to the cause, the fix, and relevant limits. It does not need every failed command.
- An evaluation needs supported judgments about the experience and its suitability. Include scope, tradeoffs, or effort accounting where they affect those judgments.
- A practical guide needs enough explanation and focused examples for the reader to follow the work. Direct instructions are appropriate here.
- A short working note can stop after the useful finding and its context. Do not stretch it into a long-form evaluation.

A closing recommendation is useful when the article asks whether a tool or approach is worth using. Otherwise end when the reader has the answer. Do not repeat the same summary in a TL;DR, scorecard, pros and cons list, and conclusion.

## Choose supporting formats only when they help

Prose is the default. The reference article's tables and components are examples of available tools, not requirements.

- **Tables:** use for a real comparison or mapping with parallel information. They are unnecessary for most narratives and single findings. Verify comparable units and plan scope when comparing services; link to primary sources for product and pricing claims.
- **Code:** show the smallest actual example that explains the interesting change. A code-heavy article is fine when the code carries the explanation. Avoid exhaustive listings and incidental setup.
- **Lists:** use for meaningful parallel points or a sequence. Avoid breaking connected reasoning into fragments for visual variety.
- **Stack blocks or diagrams:** use when multiple technologies and their roles need explaining. Omit them when the stack is incidental or already clear.
- **Screenshots:** include when they supply useful evidence or show behavior that prose cannot convey well. Inspect them for confidential details and explain what they establish.
- **Scorecards, effort counts, and upstream reports:** include only when they answer a question the article is evaluating. Keep an outcome distinct from responsibility for it. Do not require emojis, an intervention tally, or an issues-and-PRs section in unrelated posts.

Disclose a relevant collaboration early, using accurate language about payment and any review. Do not add a disclosure to an ordinary independent post. Keep GitHub URLs on their own lines so the blog can render previews; other citations can use descriptive inline links.

## Keep the post self-contained and safe to publish

Explain enough background that the reader does not need the source conversation or internal project knowledge. Public product names, official documentation, and relevant public repositories are useful context and can remain. Remove confidential details according to AGENTS.md.

Replace private company, project, or names with natural generic equivalents. For private package examples, follow the existing `@myorg/<descriptive-name>` convention. Check code, logs, comments, fixtures, URLs, and screenshots as well as prose. Generalize private details without losing the technical point, and do not reintroduce details the user has asked to omit.

Generalize quietly in published prose. "I encountered this in a Next.js app" usually gives enough context; avoid unnecessary secrecy language such as "I cannot reveal the company or project." Do not invent replacement facts or claim that publication was approved without evidence.

Removing identifiers does not establish permission to publish non-public employer or client material. Consider confidentiality obligations and publication rights separately, including whether the technical substance or a combination of details remains sensitive. Prefer original minimal examples over reproducing private artifacts. If a specific disclosure is uncertain, flag it for the author to confirm before including it; continue with public sources or safely generalized explanations where possible. See [WIPO's trade secret protection guidance](https://www.wipo.int/en/web/trade-secrets/protection) for background; these editorial checks do not establish legal compliance.

## Verify and report

- Check frontmatter, quoted dates, topic casing, category, and internal links against AGENTS.md. Reuse existing topic names when they fit.
- Reread the article for context gaps, repetition, unsupported claims, and invented author experience. Verify any code examples against the actual source where available.
- Run `npm run lint:content`. Follow the additional repository checks if implementation code changed.
- For a renamed post or a changed series, update cross-references and confirm the reading order and navigation still work.
- Summarize the material changes and any unresolved evidence the user needs to know about. Do not turn a small edit into a full article review unless requested.
