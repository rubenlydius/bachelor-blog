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
author: ruben           # optional: elitsa | miriam | ruben, links to their profile
tags: [ux, design]      # optional, become filters on /posts
draft: true             # optional, drafts only show in dev
---
```

### Weekly time post

Add a `time` block with hours per member per pillar (`ux`, `design`, `development`; missing ones count as 0).
The post shows a chart per member, gets the `time` tag automatically, and the hours add up on
the team page and each profile (`/team/<id>/`). See `src/content/posts/example-time/index.mdx`.

```yaml
time:
  elitsa: { ux: 12, design: 4, development: 1 }
  miriam: { ux: 3, design: 14.5 }
  ruben: { ux: 2, design: 1.5, development: 16 }
```

Team members (name, role, bio, photo, links) live in `src/data/team.ts`; their ids in `src/data/members.ts`.

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
