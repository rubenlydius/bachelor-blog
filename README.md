# Bachelor Blog

Astro + MDX blog. Run `npm run dev` and open http://localhost:4321.

## Writing a post

Create a folder per post with an `index.mdx` and its images:

```
src/content/posts/
  week-1-research/
    index.mdx       → /posts/week-1-research/
    cover.jpg
    sketch.jpg
```

Frontmatter (validated in `src/content.config.ts`):

```yaml
---
title: Week 1: Research
description: Short summary for the overview and SEO.
date: 2026-11-02
cover: ./cover.jpg      # optional
coverAlt: ...           # optional
tags: [research]        # optional
draft: true             # optional, drafts only show in dev
---
```

## Layout components

Available in every post without importing (registered in `src/components/post/index.ts`).
Import images at the top of the post so Astro optimizes them: `import sketch from './sketch.jpg';`

| Component | Usage |
|---|---|
| `Figure` | `<Figure src={sketch} alt="..." caption="..." align="center \| left \| right \| wide \| full" />` |
| `Breakout` | `<Breakout>Big statement.</Breakout>` · `variant="plain"` for no box · `wide` |
| `ImageRow` | `<ImageRow><Figure .../><Figure .../></ImageRow>` · `columns={3}` · `wide` |
| `TwoColumn` | `<TwoColumn src={img} alt="..." reverse>` markdown text `</TwoColumn>` (blank lines around the text) |

See `src/content/posts/example-post/index.mdx` for every component in use.

## Structure

```
src/
  components/post/   layout components used in posts
  content/posts/     the posts
  layouts/           BaseLayout (shell), PostLayout (post header + column)
  lib/posts.ts       getPosts(): sorted, drafts hidden in production
  pages/             index (overview), posts/[...slug], rss.xml
  styles/global.css  design tokens (colors, widths) + post column
```
