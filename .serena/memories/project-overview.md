# 3D 2048 Game Project Overview

## Project Purpose
This is a Next.js 16 application featuring:
- A 3D implementation of the 2048 game with both 2D and 3D modes using Three.js
- A blog system powered by Directus CMS
- React 19 and TypeScript

## Main Components
- **Game Components**: 
  - `components/game-2048.tsx` - 2D version of the game
  - `components/game-2048-3d.tsx` - 3D version using @react-three/fiber and @react-three/drei
  - Main page (`app/page.tsx`) allows switching between 2D/3D modes
- **Blog System**: Server-side rendered blog with Directus CMS integration
- **UI Components**: Based on shadcn/ui patterns in `components/ui/`

## Tech Stack
- **Frontend**: React 19, TypeScript, Next.js 16
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS v4
- **CMS**: Directus (@directus/sdk)
- **Code Quality**: Biome (not ESLint)
- **UI Components**: Radix UI primitives, shadcn/ui patterns
- **Content Rendering**: shiki (syntax highlighting), streamdown (markdown processing)

## Key Features
- Theme system with dark/light mode support
- Static generation for blog posts with dynamic metadata
- Draft mode for previewing unpublished content
- Custom markdown rendering with auto-generated heading IDs
- Table of contents extraction
- Image handling with Next.js (unoptimized for remote images)

## Environment Variables
Required for blog functionality:
- `NEXT_PUBLIC_DIRECTUS_URL` - Directus instance URL
- `DIRECTUS_ACCESS_TOKEN` - Static token for Directus API authentication

## Deployment
Configured for Vercel deployment with TypeScript strict mode and modern ES modules.
Uses pnpm as the package manager (pnpm-lock.yaml).