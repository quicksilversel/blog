# TechStack

Use a `tech-stack` fenced block anywhere in an article, snippet, or project part. The shared Markdown renderer displays it as a responsive stack overview.

````markdown
```tech-stack
[
  { "name": "React", "role": "UI", "detail": "react", "group": "Frontend" },
  { "name": "PostgreSQL", "role": "Database", "group": "Backend" }
]
```
````

Only `name` is required. `role`, `detail`, and `group` are optional strings. Group labels come from the content, and groups appear in the order they first occur. Omit `group` for a simple list.

For a custom title, use an object instead of an array:

````markdown
```tech-stack
{
  "title": "Tools behind this project",
  "items": [{ "name": "React" }, { "name": "PostgreSQL" }]
}
```
````

Invalid data falls back to a regular code block. Text is rendered as text, without interpreting HTML or Markdown.

React components can import `TechStack` and the `TechStackData` and `TechStackItem` types from this directory's barrel export. The default title is “Stack at a glance.”
