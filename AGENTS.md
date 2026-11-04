<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo overview

This is a personal blog built with Next.js (App Router), React 19, Emotion, and MDX. Articles live as `.mdx` files under `articles/`. The site renders them via `src/libs/getArticles` and related libs.

- Articles: `articles/articles/<category>/<slug>.mdx`
- Categories: `frontend`, `backend`, `fullstack`, `infrastructure`, `observability` (the folder name IS the category, derived from the directory)
- Snippets: `articles/snippets/<category>/<slug>.mdx`
- Projects: `articles/projects/<project-slug>/`
- UI primitives: `src/components/UI/<Component>/`
- Content libs: `src/libs/getArticles`, `src/libs/getProjects`, `src/libs/getTopics` (topic aggregation), `src/libs/search` (client-side search over a prebuilt index)
- Category config (display name, icon, tech keywords): `src/libs/getSkills/data.ts`
- Category colors (charts): `src/components/Pages/Archive/GrowthChart/constants.ts`

To add a new category, update both files above and register its Lucide icon in the `iconMap` of `src/components/Pages/Home/SkillsOverview/SkillCards.tsx` and `src/components/Pages/Home/SkillsOverview/Chart.tsx` (note: there is a second `Chart.tsx` under `Archive/GrowthChart/` that does not have an `iconMap`).

Search is served from a static index (`public/search-index.json`) regenerated on every `npm run build`, so new or renamed articles appear in search automatically after a build. There is no search API route.

# Writing articles

When asked to write or edit an article:

1. **No em dashes.** Use commas, periods, or parentheses instead. This applies to all prose in articles and snippets, and is enforced: `npm run lint:content` (part of `npm run lint`) scans every `.mdx` file, skipping code blocks, and fails on an em dash. Run it after editing prose.
2. **No confidential or personal information.** Strip company names, internal project codenames, real coworker names, internal URLs, ticket IDs, customer data, etc. Replace with generic equivalents (e.g., "a recipe app", "the analytics service", "a teammate") so the story still reads naturally without losing context. The terms themselves are confidential, so they are NOT hardcoded in the repo. For real enforcement, create a local, gitignored `.confidential-words` file at the repo root (one term per line, `#` for comments); `npm run lint:content` reads it if present and fails on any match, scanning code blocks too. Without that file the check is inactive. Note: violations print the matched term, so treat CI logs accordingly if you wire the file in via a secret.
3. **Match the existing tone.** Before drafting, read 3 to 4 existing articles in the same category to absorb the voice, clarity, and level of technical detail. Choose a structure and supporting formats that fit the article's subject.

   The reference article for voice is `articles/articles/fullstack/claude-code-migrates-recipe-app-to-prisma.mdx`. Use it for its personal perspective, plain explanations, readable progression, and care with evidence. Its structure, length, tables, and code density are specific to that story. Choose those for each article's purpose and source material. The `write-article` skill explains how to apply the voice across different kinds of posts.

4. **Keep code snippets short and focused.** Show the minimal interesting code, not exhaustive listings. (See memory.)
5. **Frontmatter shape** (see any existing article for reference):

   ```
   ---
   title: '...'
   description: '...'
   topics: ['...', '...']
   published: true
   date: 'YYYY-MM-DD'
   updated: 'YYYY-MM-DD'
   ---
   ```

   - `category` is derived from the folder for articles and snippets, so do not add it to their frontmatter. Projects are different (see "Writing projects" below).
   - `updated` is optional. Add it when substantially revising a post; it renders an "Updated …" line in the header and feeds the sitemap's `lastModified`.
   - `topics` are not just metadata: each one generates a `/topics/<slug>` aggregation page and is rendered as a clickable tag. Reuse existing topic names with consistent casing rather than inventing near-duplicates.
   - Quote the `date` (and `updated`) value. An unquoted `date: 2024-01-01` is parsed by YAML as a Date object instead of a string.

6. **Internal links** use the path form `/articles/<category>/<slug>`. If you move an article between categories, grep for its slug and update every cross-reference.
7. **Callouts** use the GitHub alert syntax, handled by `src/libs/markdown/remarkCallouts.ts`. Types are `note`, `tip`, `important`, `warning`, `caution`, `memo`, and `disclosure`; unknown types fall back to the `note` style. Text after the marker replaces the default label.

   ```
   > [!TIP] Prior art
   > The idea came from a teammate.
   ```

   A blockquote without a marker keeps the plain quote styling, so use a bare `>` for actual quotes.

8. **Articles are real MDX.** They are compiled on the server by `MdxRenderer` (`next-mdx-remote/rsc`), so a post can use React components inline. The ones available by name are registered in `src/components/Pages/Article/ArticleDetail/mdxComponents.ts`; add a component there to make it usable in prose. Currently `<Callout>` and `<Sidenote>`.

   Prefer plain markdown. Reach for a component only when the thing you want to show cannot be shown as prose, a code block, or an image.

9. **Code fences take options** after the language, parsed by `src/libs/markdown/parseCodeMeta.ts`:

   ````
   ```ts title="src/server.ts" {2,4-5} noLineNumbers
   ````

   - `title="..."` (or `filename="..."`) renders a filename bar above the block.
   - `{2,4-5}` highlights those 1-based lines.
   - `noLineNumbers` hides the gutter, which suits one or two line snippets.

   A malformed range is ignored rather than failing the build, so check the rendered output if a highlight does not appear.

10. **Images** are measured at compile time by `rehypeImageSize`, which reads local files out of `public/` and hands real dimensions to `next/image`. Nothing is needed in the article beyond normal markdown. Add a caption with the markdown title slot:

    ```
    ![Alt text for screen readers](/folder/shot.png 'Caption shown under the image')
    ```

    Remote images cannot be measured and fall back to a plain lazy `<img>`, so prefer committing images to `public/`.

11. **Footnotes** use the standard GFM syntax (`text[^1]` plus `[^1]: the note`). Use them for citations and tangents that belong at the end. Use `<Sidenote>` instead when the aside belongs beside the paragraph it relates to; on wide screens it floats into the right of the text column.

12. **Heading ids** come from `rehype-slug`. The table of contents derives the same ids via `getHeadings`, which shares github-slugger's dedupe counter, so the two stay in sync automatically. Do not hand-write heading anchors.

# Writing projects

A project is a multi-part series living in its own folder under `articles/projects/<project-slug>/`. The folder name is NOT a category (unlike articles and snippets).

- **`index.mdx` is project-level metadata, not a post.** It holds the project's `title`, `description`, `topics`, and `category`, and is not rendered as its own page. Every other `.mdx` in the folder is one part of the series.
- **Category for projects comes from frontmatter, not the folder.** Set `category` on the project's `index.mdx`; each part inherits it. An individual part can override by setting its own `category` in frontmatter. (If neither is set, the part falls back to the category `project`.) Use one of the existing categories (`frontend`, `backend`, `fullstack`, `infrastructure`, `observability`) so the part shows up correctly in archives, skills, and topic pages.
- **Each part needs the normal article frontmatter** (`title`, `description`, `topics`, `published`, quoted `date`). Parts are ordered oldest-first by `date` to form the series, and the "Project Navigation" sidebar shows progress ("Part X of Y"), so keep dates in the intended reading order.
- Parts render at `/projects/<project-slug>/<part-slug>`; a project must have at least one published part to appear.

# Writing code

Conventions to follow when touching `src/`:

- **DRY.** If logic, types, or markup is reused (or about to be), extract it. Don't duplicate.
- **Shared UI lives in `src/components/UI/`.** When a primitive (button, card, box, layout helper, etc.) is reusable, put it there following the existing `<Component>/index.ts` + `<Component>.tsx` pattern. Don't redefine the same styled element across pages.
- **No inline styles.** Use Emotion `styled` components. No `style={{ ... }}` props.
- **Emotion `styled` blocks go at the bottom of the file**, below the React component. Never define them above the component or inline within JSX.
- **No `any`. No `@ts-expect-error`, no `@ts-ignore`.** If the types are wrong, fix the types. If you genuinely cannot, surface the problem rather than suppressing it.
- **Read `node_modules/next/dist/docs/` before using Next.js APIs.** This repo is on a non-trained Next.js version (see top of file).
- **Do not write comments unless they are genuinely necessary.** Default to none. Names and structure should carry the meaning; if a comment is explaining what the code does, rewrite the code instead. The narrow cases that earn one: a non-obvious external constraint (a browser quirk, an upstream bug, a spec requirement), a deliberate choice whose alternative looks more obvious, or a value whose origin is not recoverable from the code (why a magic number is that number). Keep those to one line where possible. No JSDoc blocks on internal functions, no section banners, no restating the signature.

# After making code changes

Always run `npm run lint:fix` after writing or editing TypeScript/TSX. This runs ESLint, Stylelint, and Prettier with auto-fix in parallel. Do not commit or report the task complete until it passes cleanly.

When you touch logic in `src/libs` (or anything with `*.test.ts` coverage), run `npm test` (Vitest). Add or update tests for the behavior you change.

CI (`.github/workflows/pr-check.yml`) runs `lint`, `test`, and `build` on every PR to `main`, so a green local run of all three means the PR will pass. Note `npm run lint` includes the content linter, and `npm run build` regenerates the RSS feed and search index before `next build`.

For UI changes specifically, also verify the change renders correctly in the browser via `npm run dev` when possible.
