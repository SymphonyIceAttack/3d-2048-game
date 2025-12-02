# Project Structure and Architecture

## Directory Overview
```
3d-2048-game/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── draft/         # Draft mode API
│   ├── posts/             # Blog post pages
│   │   └── [slug]/        # Dynamic blog post routes
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (game)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── blog/              # Blog-specific components
│   ├── game-2048.tsx      # 2D game component
│   ├── game-2048-3d.tsx   # 3D game component
│   └── ...                # Other feature components
├── lib/                   # Utility libraries
│   ├── game-engine/       # Game logic and state management
│   │   ├── engine.ts      # Core game engine
│   │   ├── types.ts       # Game type definitions
│   │   ├── hooks.ts       # React hooks for game
│   │   └── animations.ts  # Animation utilities
│   ├── directus.ts        # Directus CMS client
│   └── utils.ts           # General utilities
├── public/                # Static assets
└── ...config files        # Configuration files
```

## Architecture Patterns

### App Router Structure
- **Server Components**: Default for app directory pages
- **Client Components**: Marked with `"use client"` directive
- **Layouts**: `app/layout.tsx` for root layout
- **Static Generation**: Blog posts pre-rendered at build time
- **Dynamic Routes**: `[slug]` for individual blog posts

### Component Organization
```
components/
├── ui/                     # shadcn/ui components
│   ├── button.tsx         # Button component with variants
│   ├── card.tsx           # Card container
│   └── accordion.tsx      # Accordion component
├── blog/                   # Blog-specific components
│   ├── markdown-with-ids.tsx    # Custom markdown renderer
│   ├── table-of-contents.tsx    # Auto-generated TOC
│   ├── recent-posts.tsx         # Sidebar with recent posts
│   ├── theme-provider.tsx       # Theme management
│   └── ...                # Other blog components
└── game-*.tsx              # Game components
```

### Game Architecture
```
lib/game-engine/
├── engine.ts              # Core 2048 game logic
├── types.ts               # Type definitions
├── hooks.ts               # React hooks (useGameState, etc.)
└── animations.ts          # 3D animations and transitions
```

### Blog Architecture
- **CMS**: Directus for content management
- **Static Generation**: Pre-rendered at build time
- **Dynamic Content**: Draft mode for unpublished posts
- **Markdown Processing**: Custom pipeline with shiki and streamdown

## Key Files and Their Purpose

### Core Application Files
- `app/page.tsx`: Main game page with 2D/3D mode switching
- `app/layout.tsx`: Root layout with providers and navigation
- `app/globals.css`: Global styles and Tailwind imports

### Configuration Files
- `biome.json`: Code quality and formatting rules
- `next.config.ts`: Next.js configuration (images, env vars)
- `tsconfig.json`: TypeScript strict configuration
- `tailwind.config.js`: Tailwind CSS v4 configuration

### Game Files
- `components/game-2048.tsx`: 2D implementation of 2048
- `components/game-2048-3d.tsx`: 3D implementation using Three.js
- `lib/game-engine/`: Shared game logic and state management

### Blog Files
- `lib/directus.ts`: Directus client and type definitions
- `app/posts/[slug]/page.tsx`: Dynamic blog post pages
- `app/api/draft/route.ts`: Draft mode API endpoint

### UI System
- `components/ui/`: shadcn/ui component library
- `lib/utils.ts`: Utility functions (cn for className merging)
- `components.json`: shadcn/ui configuration

## Data Flow

### Game State Management
- Local state with React hooks in game components
- Shared logic in `lib/game-engine/`
- Animation state managed separately for 2D/3D modes

### Blog Content Flow
1. **Content Source**: Directus CMS
2. **Build Time**: Static generation via `generateStaticParams()`
3. **Runtime**: API routes for draft mode
4. **Rendering**: Custom markdown processing pipeline

### Theme System
- `next-themes` for dark/light mode
- Context providers in layout
- Persisted in localStorage
- Applied via Tailwind CSS classes

## Development Patterns

### Server/Client Separation
- **Server Components**: Blog pages, API routes
- **Client Components**: Game components, interactive UI
- Clear boundary marked with `"use client"`

### Type Safety
- **TypeScript**: Strict mode throughout
- **Directus**: Schema types defined in `lib/directus.ts`
- **Component Props**: Well-typed interfaces

### Performance Optimizations
- **Static Generation**: Blog posts pre-rendered
- **Code Splitting**: Dynamic imports for 3D components
- **Image Optimization**: Remote patterns configured
- **Memoization**: React.memo where beneficial

## Build and Deployment
- **Build System**: Next.js with static export capability
- **Deployment**: Vercel-ready configuration
- **Environment**: Environment variables for CMS integration
- **Assets**: Static files served from public directory