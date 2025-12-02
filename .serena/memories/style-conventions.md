# Code Style and Conventions

## TypeScript Configuration
- **Target**: ES2017 with strict mode enabled
- **Module**: ESNext with bundler resolution
- **JSX**: react-jsx
- **Path Aliases**: @/* maps to ./*
- **Type Checking**: Strict enabled, no implicit any

## Formatting (Biome)
- **Indentation**: 2 spaces (not tabs)
- **Style**: Space-separated, not tabbed
- **Import Organization**: Automatically organized on save
- **Quotes**: Single quotes preferred
- **Semicolons**: Required

## Code Quality Rules (Biome)
- **Recommended rules**: Enabled for Next.js and React
- **Disabled rules**:
  - `noArrayIndexKey` (for React array rendering)
  - `useExhaustiveDependencies` (for React hooks)
  - `noUnknownAtRules` (for CSS)
  - `noDangerouslySetInnerHtml` (for markdown rendering)
  - `noSvgWithoutTitle` and `useValidAnchor` (for accessibility)

## Component Patterns

### File Organization
- **App Router**: Uses Next.js 13+ app directory structure
- **Client Components**: Marked with `"use client"` directive
- **Server Components**: Default for app directory pages
- **Component Structure**: 
  - UI components in `components/ui/`
  - Feature components in `components/`
  - Blog components in `components/blog/`

### Naming Conventions
- **Files**: kebab-case for components (`game-2048-3d.tsx`)
- **Components**: PascalCase (`Game2048_3D`)
- **Functions**: camelCase (`useState`, `generateStaticParams`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive names

### Component Structure
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

### Import Patterns
- **Path Aliases**: Use @/* for absolute imports
- **Import Order**: 
  1. External libraries (react, next, etc.)
  2. Internal components (@/components/*)
  3. Internal utilities (@/lib/*)
  4. Relative imports (./, ../)

### React Patterns
- **Hooks**: useState for local state, proper dependency arrays
- **Event Handling**: Inline handlers for simple cases, separate functions for complex logic
- **Props**: Explicit typing with interfaces
- **Performance**: Memoization with React.memo where beneficial

### Next.js Patterns
- **Static Generation**: Use `generateStaticParams()` for dynamic routes
- **Metadata**: Use `generateMetadata()` for dynamic page metadata
- **Draft Mode**: API route at `/api/draft` for preview functionality
- **Server/Client Split**: Clear separation with "use client" directive

### Error Handling
- **Blog Routes**: try/catch blocks with `notFound()` for graceful 404s
- **Async Operations**: Proper error boundaries and fallback states
- **Type Safety**: Exhaustive TypeScript coverage

### Documentation
- **TypeScript**: Self-documenting through interfaces and types
- **Comments**: Minimal, focus on "why" not "what"
- **Component Documentation**: PropTypes through TypeScript interfaces