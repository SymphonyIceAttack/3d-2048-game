# Suggested Commands for 3D-2048-Game Project

## Development Commands
```bash
# Start development server
pnpm dev

# Build for production  
pnpm build

# Start production server
pnpm start
```

## Code Quality Commands
```bash
# Run Biome linter (checks code quality)
pnpm lint

# Format code with Biome
pnpm format
```

## Package Management
```bash
# Install dependencies (uses pnpm-lock.yaml)
pnpm install

# Alternative package managers (if available)
yarn install
npm install
```

## Next.js Specific
```bash
# Generate static params for blog posts
# (happens automatically during build)

# Type checking (run before committing)
npx tsc --noEmit

# Clean build cache
rm -rf .next
```

## Git Commands (for this project)
```bash
# Check git status
git status

# Add changes
git add .

# Commit changes
git commit -m "commit message"

# Push changes
git push origin main
```

## Development Tips
- Run `pnpm lint` and `pnpm format` before committing
- Use TypeScript strict mode - all type errors must be resolved
- Images are configured as unoptimized for remote patterns
- Development server runs on http://localhost:3000

## System Notes
- This project runs on Darwin (macOS)
- Uses pnpm as the preferred package manager (pnpm-lock.yaml present)
- Biome is configured for import organization on save