# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application featuring a 3D implementation of the 2048 game with both 2D and 3D modes using Three.js, plus a blog system powered by Directus CMS. The project uses React 19 and TypeScript.

## Development Commands

```bash
# Development
npm run dev           # Start dev server on http://localhost:3000

# Building
npm run build         # Production build
npm start             # Start production server

# Code Quality
npm run lint          # Run Biome linter (checks code quality)
npm run format        # Format code with Biome
```

## Architecture

### Game Components

- `components/game-2048.tsx` - 2D version of the game
- `components/game-2048-3d.tsx` - 3D version using @react-three/fiber and @react-three/drei
- Main page (`app/page.tsx`) is client-side rendered, allows switching between 2D/3D modes
- Theme system managed via localStorage with dark/light mode support

### Blog System

The blog is powered by Directus CMS with server-side rendering:

- `lib/directus.ts` - Directus client configuration and Post type definitions
- `app/posts/[slug]/page.tsx` - Dynamic blog post pages with:
  - Static generation via `generateStaticParams()`
  - Dynamic metadata generation via `generateMetadata()`
  - Draft mode support for previewing unpublished content
- `app/api/draft/route.ts` - API endpoint for enabling draft mode
- Blog components in `components/blog/`:
  - `markdown-with-ids.tsx` - Custom markdown renderer with auto-generated heading IDs
  - `table-of-contents.tsx` - Auto-generated TOC from markdown headings
  - `recent-posts.tsx` - Recent posts sidebar
  - `theme-provider.tsx` - Theme management for blog pages

### Content Rendering

The blog uses a custom markdown rendering pipeline:
1. Markdown content is parsed and rendered with `MarkdownWithIds`
2. Heading IDs are auto-generated for anchor links
3. Table of contents is extracted from the same content
4. Uses `shiki` for syntax highlighting and `streamdown` for markdown processing

### Environment Variables

Required for blog functionality:
- `NEXT_PUBLIC_DIRECTUS_URL` - Directus instance URL
- `DIRECTUS_ACCESS_TOKEN` - Static token for Directus API authentication

### Image Handling

- Next.js images are unoptimized (`unoptimized: true` in next.config.ts)
- Remote images allowed from `symcloud.top` and all HTTPS domains
- Blog post images are served from `https://symcloud.top/` + imageurl path

## Code Quality

This project uses **Biome** (not ESLint) for linting and formatting:

- Configuration in `biome.json`
- Recommended rules enabled for Next.js and React
- Import organization on save
- Some rules disabled: `noArrayIndexKey`, `useExhaustiveDependencies`, `noUnknownAtRules`
- Indentation: 2 spaces

When fixing linting issues, run `npm run lint` and `npm run format`.

## Styling

- Tailwind CSS v4 with custom configuration
- Component library based on shadcn/ui patterns in `components/ui/`
- Theme system supports light and dark modes
- Responsive design with mobile-first approach

## Key Patterns

1. **Static Generation**: Blog posts use `generateStaticParams()` to pre-render all published posts at build time
2. **Draft Mode**: Use the `/api/draft` route to enable preview mode for unpublished content
3. **Server/Client Separation**: Game components are client-side (`"use client"`), blog pages are server-side
4. **Type Safety**: Directus schema types defined in `lib/directus.ts` - extend the Schema type when adding new collections
5. **Error Handling**: Blog routes use try/catch with `notFound()` for graceful 404s
