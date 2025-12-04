# Contributing to 3D 2048 Game

Thank you for your interest in contributing to the 3D 2048 Game! This document provides guidelines and instructions for contributing to the project.

## 🎯 Ways to Contribute

We welcome various types of contributions:

- 🐛 **Bug Reports** - Report issues you encounter
- 💡 **Feature Requests** - Suggest new features or improvements
- 🔧 **Code Contributions** - Submit bug fixes or new features
- 📝 **Documentation** - Improve docs, tutorials, or examples
- 🎨 **UI/UX Improvements** - Enhance the user interface and experience
- 🌐 **Translations** - Help translate the game to other languages
- 🧪 **Testing** - Help test new features and report issues

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Quick Start
```bash
# Clone the repository
git clone https://github.com/your-username/3d-2048-game.git
cd 3d-2048-game

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
pnpm type-check   # Run TypeScript type checking
```

## 📋 Code Style Guidelines

We use **Biome** for linting and formatting (NOT ESLint). Please ensure your code follows these guidelines:

### Code Quality
- Use TypeScript for type safety
- Follow existing component patterns
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions
- Keep components focused and reusable

### Formatting
- Use 2 spaces for indentation (no tabs)
- Use single quotes for strings
- Add semicolons at the end of statements
- Format imports automatically with Biome
- Keep lines under 100 characters when possible

### React Patterns
- Use functional components with hooks
- Start component files with `"use client"` if they use client-side features
- Follow the existing component structure in `/components/ui/`
- Use TypeScript interfaces for props
- Prefer composition over inheritance

## 🏗️ Project Structure

```
3d-2048-game/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── blog/           # Blog-specific components
│   └── *.tsx           # Feature components
├── lib/                # Utilities and logic
│   └── game-engine/    # Core game logic
└── public/             # Static assets
```

## 🧪 Testing Guidelines

### Manual Testing
Before submitting a PR, please test:
- [ ] Game functionality works in both 2D and 3D modes
- [ ] Responsive design on different screen sizes
- [ ] Keyboard and touch controls
- [ ] Theme switching (dark/light mode)
- [ ] Performance in development and production builds

### Automated Testing
While we don't have automated tests yet, please:
- Test your changes thoroughly in multiple browsers
- Check console for any errors or warnings
- Verify that the build process completes successfully

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the bug
3. **Expected behavior** vs actual behavior
4. **Screenshots** if applicable
5. **Environment details** (browser, OS, device)
6. **Console errors** if any

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Browser: [e.g. Chrome 120]
- OS: [e.g. iOS 16]
- Device: [e.g. iPhone 14]
```

## 💡 Feature Requests

For feature requests, please provide:

1. **Clear description** of the proposed feature
2. **Use case** - why would this be valuable?
3. **Alternative solutions** you've considered
4. **Implementation suggestions** if you have any

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature.

**Use Case**
Describe the problem this feature would solve.

**Proposed Solution**
How you envision this feature working.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other relevant information.
```

## 🔧 Pull Request Process

### Before Submitting
1. **Fork** the repository and create a feature branch
2. **Follow** the code style guidelines
3. **Test** your changes thoroughly
4. **Update** documentation if needed
5. **Ensure** the build passes

### PR Guidelines
- Keep PRs focused on a single feature or bug fix
- Write clear commit messages
- Update the README if you change user-facing features
- Add screenshots for UI changes
- Reference related issues in your PR description

### PR Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature causing existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Tested in multiple browsers
- [ ] Responsive design verified

## Screenshots
If applicable, add screenshots.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Build passes
- [ ] No console errors
```

## 🎮 Game Development Guidelines

### 3D Development
- Use `@react-three/fiber` and `@react-three/drei` for 3D components
- Optimize 3D models and textures for web performance
- Test on different devices and graphics capabilities
- Consider fallbacks for devices with limited WebGL support

### Game Mechanics
- Maintain the core 2048 gameplay mechanics
- Ensure fair and balanced 3D movement
- Provide clear visual feedback for player actions
- Keep performance smooth at 60fps when possible

### Accessibility
- Ensure keyboard navigation works
- Provide visual feedback for all interactions
- Consider color blindness in tile design
- Make 3D controls intuitive and discoverable

## 🌟 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

## 📞 Getting Help

- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
- **Discord** - Real-time chat (if available)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to 3D 2048 Game! 🎮✨