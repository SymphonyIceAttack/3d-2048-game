# 3D 2048 Game - Three.js & React Modern Web Game

<div align="center">

![3D 2048 Game](./public/og-image.png)

**Experience the classic 2048 puzzle in stunning 3D space! Built with Next.js, React 19, and Three.js**

[![Live Demo](https://img.shields.io/badge/Live-Demo-00d9ff?style=for-the-badge&logo=live&logoColor=white)](https://www.3048.onl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)

</div>

## 🎮 Game Overview

**3D 2048 Game** is a modern web implementation of the popular 2048 puzzle game, featuring a stunning 3D visualization built with Three.js and React. Experience the classic tile-matching puzzle in a completely new dimension with smooth 3D animations, particle effects, and immersive spatial gameplay.

**🌟 Play Now: [https://www.3048.onl](https://www.3048.onl)**

## ✨ Key Features

### 🎯 Core Gameplay
- **3D Spatial Experience** - Play in a 4×4×4 cubic space instead of traditional 2D grid
- **Dual Mode Support** - Switch between 3D immersive mode and classic 2D mode
- **Smooth Animations** - Beautiful tile movements and merging animations using React Spring
- **Particle Effects** - Visual feedback with sparkles and glow effects
- **Intuitive Controls** - Keyboard shortcuts and touch-friendly interface

### 🛠️ Technical Features
- **Modern Tech Stack** - Built with Next.js 16, React 19, and TypeScript
- **3D Graphics** - Powered by Three.js and @react-three/fiber
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme** - Automatic theme switching with user preference
- **SEO Optimized** - Complete metadata, Open Graph, and structured data
- **Performance Focused** - Optimized bundle size and loading performance

### 📱 User Experience
- **Cross-Platform** - Works seamlessly on all modern browsers
- **Touch Support** - Optimized controls for mobile and tablet gaming
- **Accessibility** - Keyboard navigation and screen reader friendly
- **Progressive Web App** - Install as native app on mobile devices
- **Fast Loading** - Optimized assets and lazy loading

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/3d-2048-game.git
cd 3d-2048-game

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🎮 How to Play

### 2D Mode (Classic)
- Use **arrow keys** or **WASD** to move tiles
- Combine tiles with the same number to reach 2048
- **Goal**: Create a tile with value 2048

### 3D Mode (Enhanced)
- Use **arrow keys** for X/Y movement, **Q/E** for Z-axis
- Navigate through the 3D cube space
- Combine tiles in three dimensions
- **Goal**: Reach the highest score possible in 3D space

### Controls
| Key | Action |
|-----|--------|
| ↑ ↓ ← → | Move tiles (2D mode) |
| W A S D | Move tiles (2D mode) |
| Q E | Move along Z-axis (3D mode) |
| R | Reset game |
| U | Undo last move |
| Space | Toggle 3D/2D mode |

## 🏗️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### 3D Graphics
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions
- **@react-spring/three** - Spring animations for 3D

### UI Components
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful icons
- **class-variance-authority** - Component variants

### Development Tools
- **Biome** - Fast formatter and linter (replaces ESLint)
- **Vercel Analytics** - Performance monitoring
- **Directus** - Headless CMS for blog content

## 📁 Project Structure

```
3d-2048-game/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── posts/             # Blog pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap.xml
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── blog/              # Blog components
│   ├── game-2048.tsx      # 2D game component
│   ├── game-2048-3d.tsx   # 3D game component
│   └── particle-system.tsx # 3D effects
├── lib/                   # Utilities and logic
│   ├── game-engine/       # Game logic
│   │   ├── engine.ts      # Core 2048 engine
│   │   ├── hooks.ts       # React hooks
│   │   ├── types.ts       # Type definitions
│   │   └── animations.ts  # Animation utilities
│   ├── directus.ts        # CMS client
│   └── utils.ts           # General utilities
└── public/                # Static assets
    ├── favicon.ico        # App icons
    ├── og-image.png       # Social media image
    └── logo.png           # App logo
```

## 🚀 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2F3d-2048-game)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Manual Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run linter
pnpm lint

# Format code
pnpm format

# Type checking
npx tsc --noEmit
```

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 🔧 Submit pull requests
- 📝 Improve documentation
- 🎨 Enhance UI/UX design
- 🌐 Translate to other languages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [2048 Game](https://github.com/gabrielecirulli/2048) - Original 2048 concept by Gabriele Cirulli
- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Vercel](https://vercel.com) - Hosting and analytics platform

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB (gzipped)

## 🔗 Links

- **🌐 Live Demo**: [https://www.3048.onl](https://www.3048.onl)
- **📖 Documentation**: [Wiki](https://github.com/your-username/3d-2048-game/wiki)
- **🐛 Issues**: [GitHub Issues](https://github.com/your-username/3d-2048-game/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/your-username/3d-2048-game/discussions)

## 📈 SEO Keywords

3D 2048, 3D puzzle game, browser game, web game, Three.js game, React game, spatial puzzle, 3D rendering, WebGL game, puzzle solver, brain teaser, casual game, free game, online game, browser puzzle, 3D web experience, modern web game

---

<div align="center">

**⭐ Star this repository if you enjoyed the game!**

Made with ❤️ by [SymphonyIceAttack](https://github.com/symphonyiceattack)

</div>
