<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Repo overview

This is a personal blog built with Next.js (App Router), React 19, Emotion, and MDX. Articles live as `.mdx` files under `articles/`. The site renders them via `src/libs/getArticles` and related libs.

- Articles: `articles/articles/<category>/<slug>.mdx`
- Categories: `frontend`, `backend`, `fullstack`, `infrastructure`, `observability` (the folder name IS the category, derived from the directory)
- Snippets: `articles/snippets/<category>/<slug>.mdx`
- Projects: `articles/projects/<project-slug>/`
- UI primitives: `src/components/UI/<Component>/`
- Category config (display name, icon, tech keywords): `src/libs/getSkills/data.ts`
- Category colors (charts): `src/components/Pages/Archive/GrowthChart/constants.ts`

To add a new category, update both files above and register its Lucide icon in the `iconMap` of `src/components/Pages/Home/SkillsOverview/SkillCards.tsx` and `Chart.tsx`.

# Writing articles

When asked to write or edit an article:

1. **No em dashes.** Use commas, periods, or parentheses instead. This applies to all prose in articles and snippets.
2. **No confidential or personal information.** Strip company names, internal project codenames, real coworker names, internal URLs, ticket IDs, customer data, etc. Replace with generic equivalents (e.g., "a recipe app", "the analytics service", "a teammate") so the story still reads naturally without losing context.
3. **Match the existing tone.** Before drafting, read 3 to 4 existing articles in the same category to absorb voice, structure, code-example density, and headline style. Do not invent a new format.
4. **Keep code snippets short and focused.** Show the minimal interesting code, not exhaustive listings. (See memory.)
5. **Frontmatter shape** (see any existing article for reference):
   ```
   ---
   title: '...'
   description: '...'
   topics: ['...', '...']
   published: true
   date: 'YYYY-MM-DD'
   ---
   ```
   `category` is derived from the folder, do not add it to frontmatter.
6. **Internal links** use the path form `/articles/<category>/<slug>`. If you move an article between categories, grep for its slug and update every cross-reference.

# Writing code

Conventions to follow when touching `src/`:

- **DRY.** If logic, types, or markup is reused (or about to be), extract it. Don't duplicate.
- **Shared UI lives in `src/components/UI/`.** When a primitive (button, card, box, layout helper, etc.) is reusable, put it there following the existing `<Component>/index.ts` + `<Component>.tsx` pattern. Don't redefine the same styled element across pages.
- **No inline styles.** Use Emotion `styled` components. No `style={{ ... }}` props.
- **Emotion `styled` blocks go at the bottom of the file**, below the React component. Never define them above the component or inline within JSX.
- **No `any`. No `@ts-expect-error`, no `@ts-ignore`.** If the types are wrong, fix the types. If you genuinely cannot, surface the problem rather than suppressing it.
- **Read `node_modules/next/dist/docs/` before using Next.js APIs.** This repo is on a non-trained Next.js version (see top of file).

# After making code changes

Always run `npm run lint:fix` after writing or editing TypeScript/TSX. This runs ESLint, Stylelint, and Prettier with auto-fix in parallel. Do not commit or report the task complete until it passes cleanly.

For UI changes specifically, also verify the change renders correctly in the browser via `npm run dev` when possible.
