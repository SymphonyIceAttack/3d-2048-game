# AGENTS.md - 3D 2048 Game Project

This document provides essential information for AI agents working on this codebase.

## Project Overview

**Type**: Next.js 16 application with React 19 and TypeScript
**Main Features**: 
- 3D implementation of the 2048 game using Three.js
- 2D version of the 2048 game  
- Blog system powered by Directus CMS
- Theme system with dark/light mode support

**Tech Stack**:
- Frontend: React 19, TypeScript, Next.js 16
- 3D Graphics: Three.js, @react-three/fiber, @react-three/drei
- Styling: Tailwind CSS v4
- CMS: Directus (@directus/sdk)
- Code Quality: Biome (NOT ESLint)
- UI Components: Radix UI primitives, shadcn/ui patterns
- Package Manager: pnpm

## Essential Commands

### Development Commands
```bash
# Start development server
pnpm dev

# Build for production  
pnpm build

# Start production server
pnpm start

# Install dependencies
pnpm install
```

### Code Quality Commands
```bash
# Run Biome linter (NOT ESLint)
pnpm lint

# Format code with Biome
pnpm format

# Type checking
npx tsc --noEmit
```

### Build Management
```bash
# Clean build cache
rm -rf .next

# Check git status
git status

# Add changes
git add .

# Commit changes
git commit -m "commit message"
```

**Critical**: This project uses **Biome** for code quality, NOT ESLint. All formatting and linting should be done with Biome commands.

## Project Structure

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

## Key Configuration Files

### Core Config Files
- `package.json` - Dependencies and scripts (uses pnpm)
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript strict configuration
- `biome.json` - Code quality and formatting rules (CRITICAL)
- `tailwind.config.js` - Tailwind CSS v4 configuration

### CI/CD
- `.github/workflows/code-quality.yml` - GitHub Actions for Biome linting

## Code Organization and Patterns

### TypeScript Configuration
- **Target**: ES2017 with strict mode enabled
- **Module**: ESNext with bundler resolution
- **JSX**: react-jsx
- **Path Aliases**: @/* maps to ./*
- **Type Checking**: Strict enabled, no implicit any

### Formatting Rules (Biome)
- **Indentation**: 2 spaces (NOT tabs)
- **Style**: Space-separated
- **Import Organization**: Automatically organized on save
- **Quotes**: Single quotes preferred
- **Semicolons**: Required

### Component Patterns

#### File Organization
- **App Router**: Uses Next.js 13+ app directory structure
- **Client Components**: Marked with `"use client"` directive
- **Server Components**: Default for app directory pages
- **Component Structure**: 
  - UI components in `components/ui/`
  - Feature components in `components/`
  - Blog components in `components/blog/`

#### Naming Conventions
- **Files**: kebab-case for components (`game-2048-3d.tsx`)
- **Components**: PascalCase (`Game2048_3D`)
- **Functions**: camelCase (`useState`, `generateStaticParams`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive names

#### Component Structure Template
```typescript
"use client"; // For client components

import { useState } from "react";
import type { ComponentType } from "react";

interface ComponentProps {
  // Props interface
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {};
  
  // Render
  return (
    <div className="...">
      {/* Content */}
    </div>
  );
}
```

### Import Patterns
- **Path Aliases**: Use @/* for absolute imports
- **Import Order**: 
  1. External libraries (react, next, etc.)
  2. Internal components (@/components/*)
  3. Internal utilities (@/lib/*)
  4. Relative imports (./, ../)

### Styling Patterns
- **CSS Framework**: Tailwind CSS v4
- **Component Variants**: class-variance-authority (CVA) for button variants
- **Styling Pattern**: 
  ```typescript
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "@/lib/utils";
  
  const componentVariants = cva("base-classes", {
    variants: {
      variant: { default: "", outline: "" },
      size: { default: "", sm: "", lg: "" }
    },
    defaultVariants: { variant: "default", size: "default" }
  });
  ```

## Game Architecture

### Game Components
- `components/game-2048.tsx` - 2D version of the game
- `components/game-2048-3d.tsx` - 3D version using @react-three/fiber and @react-three/drei
- Main page (`app/page.tsx`) allows switching between 2D/3D modes

### Game Engine Structure
```
lib/game-engine/
├── engine.ts              # Core 2048 game logic
├── types.ts               # Type definitions
├── hooks.ts               # React hooks (useGameState, etc.)
└── animations.ts          # 3D animations and transitions
```

## Blog System Architecture

### CMS Integration
- **Content Source**: Directus CMS
- **Client**: `lib/directus.ts` with schema types
- **Static Generation**: Pre-rendered at build time via `generateStaticParams()`
- **Draft Mode**: API route at `/api/draft` for preview functionality
- **Markdown Processing**: Custom pipeline with shiki and streamdown

### Blog Components
- `app/posts/[slug]/page.tsx` - Dynamic blog post pages
- `components/blog/` - Blog-specific UI components
- Custom markdown rendering with auto-generated heading IDs
- Table of contents extraction

### Environment Variables
Required for blog functionality:
- `NEXT_PUBLIC_DIRECTUS_URL` - Directus instance URL
- `DIRECTUS_ACCESS_TOKEN` - Static token for Directus API authentication

## Architecture Patterns

### App Router Structure
- **Server Components**: Default for app directory pages
- **Client Components**: Marked with `"use client"` directive
- **Layouts**: `app/layout.tsx` for root layout
- **Static Generation**: Blog posts pre-rendered at build time
- **Dynamic Routes**: `[slug]` for individual blog posts

### Server/Client Separation
- **Server Components**: Blog pages, API routes
- **Client Components**: Game components, interactive UI
- Clear boundary marked with `"use client"`

### Theme System
- `next-themes` for dark/light mode
- Context providers in layout
- Persisted in localStorage
- Applied via Tailwind CSS classes

## Testing Approach

This project does not appear to have a dedicated test suite. When adding tests:
- Use the existing TypeScript strict mode configuration
- Follow the component patterns established
- Use Biome for test file formatting

## Performance Optimizations

- **Static Generation**: Blog posts pre-rendered
- **Code Splitting**: Dynamic imports for 3D components
- **Image Optimization**: Remote patterns configured (images are unoptimized)
- **Memoization**: React.memo where beneficial

## Important Gotchas and Non-Obvious Patterns

### Critical Code Quality Configuration
- **Biome ONLY**: This project uses Biome for ALL code quality (linting, formatting)
- **NO ESLint**: Do not add ESLint configurations
- **Biome Configuration**: `biome.json` has specific rules disabled:
  - `noArrayIndexKey` (for React array rendering)
  - `useExhaustiveDependencies` (for React hooks)
  - `noUnknownAtRules` (for CSS)
  - `noDangerouslySetInnerHtml` (for markdown rendering)
  - `noSvgWithoutTitle` and `useValidAnchor` (for accessibility)

### Next.js Specific Patterns
- Images are configured as **unoptimized for remote patterns** in `next.config.ts`
- Development server runs on `http://localhost:3000`
- Static export capability configured
- TypeScript strict mode throughout

### React Patterns
- React 19 is used (latest version)
- `use client` directive is mandatory for client components
- Proper hook dependency arrays required (except when explicitly disabled in biome.json)

### Package Management
- **pnpm is required**: Project uses `pnpm-lock.yaml`
- **No Yarn/NPM**: While alternatives may work, pnpm is the expected workflow

### Development Workflow
1. Run `pnpm install` to install dependencies
2. Use `pnpm dev` for development
3. Run `pnpm lint` and `pnpm format` before committing
4. Type checking with `npx tsc --noEmit`

### Error Handling Patterns
- **Blog Routes**: try/catch blocks with `notFound()` for graceful 404s
- **Async Operations**: Proper error boundaries and fallback states
- **Type Safety**: Exhaustive TypeScript coverage

### Deployment
- **Vercel-ready**: Configured for Vercel deployment
- **Environment Variables**: Required for CMS integration
- **Static Generation**: Blog content pre-rendered at build time

## Key Files to Know

### Core Application Files
- `app/page.tsx`: Main game page with 2D/3D mode switching
- `app/layout.tsx`: Root layout with providers and navigation
- `app/globals.css`: Global styles and Tailwind imports

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

## Memory Files

This project has detailed Serena memory files with additional context:
- `suggested_commands.md` - Command reference
- `style-conventions.md` - Detailed code style guide
- `project-overview.md` - Project purpose and features
- `project-structure.md` - Architecture details
- `task-completion.md` - Task completion patterns

## Development Tips

- Always use Biome for code quality (not ESLint)
- Follow the established component patterns
- Use absolute imports with @/* alias
- Respect the TypeScript strict mode configuration
- Images are unoptimized for remote patterns
- Run code quality checks before committing
- Test both 2D and 3D game modes when making changes

## System Notes

- Platform: Darwin (macOS)
- Uses pnpm as the preferred package manager
- Biome is configured for import organization on save
- React 19 is used (latest version)
- Next.js 16 with App Router
This guide should help you navigate and contribute to the tide forecast project effectively. Always refer to the actual code when implementing changes, as patterns may evolve over time.

## Chrome DevTools Usage in Crush

When using Chrome DevTools tools in Crush, always set `verbose: false` to get clean, concise output instead of verbose a11y tree structures.

### Basic Usage Pattern

```javascript
// Set verbose: false for clean output
mcp_chrome-devtools_take_snapshot({
  "verbose": false
});

// Simplified page content inspection
mcp_chrome-devtools_evaluate_script({
  "function": "() => document.title"
});
```

### Common Chrome DevTools Commands

```javascript
// 1. Take page snapshot (clean output)
mcp_chrome-devtools_take_snapshot({
  "verbose": false
});

// 2. Click element by UID
mcp_chrome-devtools_click({
  "uid": "element_id_here"
});

// 3. Take screenshot
mcp_chrome-devtools_take_screenshot({
  "fullPage": true
});

// 4. Scroll page
mcp_chrome-devtools_evaluate_script({
  "function": "() => window.scrollTo(0, 1000)"
});

// 5. Get network requests
mcp_chrome-devtools_list_network_requests({
  "pageSize": 10
});

// 6. Get console logs
mcp_chrome-devtools_list_console_messages({
  "pageSize": 10
});
```

### Chrome DevTools Configuration

The Chrome DevTools MCP is configured in `.crush.json`:

```json
{
  "mcp": {
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

**Note**: Chrome DevTools and Serena are separate tool systems. Chrome DevTools provides browser automation features, while Serena provides code editing capabilities. They cannot be used interchangeably.
