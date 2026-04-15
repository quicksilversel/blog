import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import langBash from 'shiki/langs/bash.mjs'
import langCss from 'shiki/langs/css.mjs'
import langDiff from 'shiki/langs/diff.mjs'
import langHtml from 'shiki/langs/html.mjs'
import langJavascript from 'shiki/langs/javascript.mjs'
import langJson from 'shiki/langs/json.mjs'
import langJsx from 'shiki/langs/jsx.mjs'
import langMarkdown from 'shiki/langs/markdown.mjs'
import langTsx from 'shiki/langs/tsx.mjs'
import langTypescript from 'shiki/langs/typescript.mjs'
import langYaml from 'shiki/langs/yaml.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'

const highlighter = createHighlighterCoreSync({
  themes: [githubDark],
  langs: [
    langBash,
    langCss,
    langDiff,
    langHtml,
    langJavascript,
    langJson,
    langJsx,
    langMarkdown,
    langTsx,
    langTypescript,
    langYaml,
  ],
  engine: createJavaScriptRegexEngine(),
})

export function highlightCode(code: string, lang: string) {
  try {
    return highlighter.codeToTokensBase(code, {
      lang,
      theme: 'github-dark',
    })
  } catch {
    return highlighter.codeToTokensBase(code, {
      lang: 'plaintext',
      theme: 'github-dark',
    })
  }
}
