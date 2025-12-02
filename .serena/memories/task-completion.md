# Task Completion Guidelines

## Pre-Commit Checklist
Before finishing any task, always run:

```bash
# Check code quality and formatting
pnpm lint

# Format code if needed
pnpm format

# Run type checking
npx tsc --noEmit
```

## Code Quality Requirements
- **Linting**: All Biome linter rules must pass
- **Formatting**: Code must be properly formatted with Biome
- **TypeScript**: No type errors allowed (strict mode)
- **Build**: Ensure `pnpm build` completes successfully

## Testing Requirements
- **Manual Testing**: Test the feature/fix in development mode
- **Cross-mode Testing**: If working on game components, test both 2D and 3D modes
- **Responsive Design**: Test on different screen sizes if UI changes made
- **Theme Testing**: Test both light and dark themes if styling changes made

## Specific Testing for This Project

### Game Components
- Test game logic in both 2D and 3D modes
- Verify keyboard controls work correctly
- Check mobile/touch controls if applicable
- Ensure theme switching works with game components

### Blog Components
- Test static generation with `pnpm build`
- Verify draft mode functionality
- Check markdown rendering and syntax highlighting
- Test image loading from external domains

### UI Components
- Test all component variants
- Verify accessibility features
- Check responsive behavior
- Test theme integration

## Performance Considerations
- **Next.js**: Ensure static generation works for blog posts
- **3D Components**: Monitor Three.js performance in 3D mode
- **Image Handling**: Verify remote image loading works correctly
- **Bundle Size**: Check that new dependencies don't bloat the bundle

## Deployment Readiness
- **Environment Variables**: Ensure all required env vars are documented
- **Build Process**: Verify `pnpm build` completes without errors
- **Static Assets**: Confirm all public assets are properly included
- **External Dependencies**: Verify Directus integration works in production

## Documentation Updates
- **CLAUDE.md**: Update if new patterns or commands are introduced
- **README.md**: Update if setup instructions change
- **Component Documentation**: Update if public APIs change

## Git Workflow
```bash
# After completing work
git add .
git commit -m "descriptive commit message"
git push origin main
```

## Rollback Plan
- **Feature Flags**: If introducing new features, ensure they can be easily disabled
- **Breaking Changes**: Document any breaking changes clearly
- **Database**: Ensure Directus schema changes are backward compatible

## Common Issues to Check
- **TypeScript Errors**: Run full type check before finishing
- **Import Errors**: Verify all imports resolve correctly
- **Runtime Errors**: Test in browser console for any JavaScript errors
- **Network Requests**: Check for failed API calls or resource loading
- **Mobile Responsiveness**: Test on mobile viewport sizes