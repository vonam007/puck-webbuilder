# Puck Web Builder

A **plug-and-play**, modular web page builder based on [@measured/puck](https://github.com/measuredco/puck). This project provides a fully encapsulated, reusable Web Builder module that can be easily dropped into any React application.

![Puck Web Builder](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop)

## ✨ Features

- 🧩 **Modular Architecture** - Self-contained module in `/src/modules/web-builder`
- 🎨 **8 Pre-built Components** - Hero, Features, Grid, Card, Heading, Text, Button, Spacer
- 📱 **Responsive Design** - All components are mobile-friendly with Tailwind CSS
- 🔌 **Plug-and-Play** - Just import and use, no configuration needed
- 🎯 **TypeScript** - Full type safety with strict typing
- ⚡ **Vite Powered** - Lightning-fast development experience

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/vonam007/puck-webbuilder.git
cd puck-webbuilder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

```tsx
import { WebBuilder, createInitialData } from "./modules/web-builder";

function App() {
  const handleSave = (data) => {
    console.log("Page saved:", data);
    // Save to your backend or localStorage
  };

  return (
    <WebBuilder
      data={createInitialData()}
      onSave={handleSave}
      headerTitle="My Page Builder"
    />
  );
}
```

## 📁 Project Structure

```
src/
├── modules/
│   └── web-builder/              # 🔌 Reusable module (copy this to any project!)
│       ├── components/           # UI Components for the builder
│       │   ├── Hero.tsx         # Hero section with gradient background
│       │   ├── Features.tsx     # Features grid with multiple variants
│       │   ├── Grid.tsx         # Layout grid with DropZone support
│       │   ├── Card.tsx         # Card component (3 variants)
│       │   ├── Heading.tsx      # Heading with multiple levels
│       │   ├── Text.tsx         # Text block component
│       │   ├── Button.tsx       # Button with multiple styles
│       │   ├── Spacer.tsx       # Spacer with optional divider
│       │   └── index.ts         # Component exports
│       ├── config.tsx           # Puck configuration
│       └── index.tsx            # Public API
├── App.tsx                      # Demo application
└── index.css                    # Global styles (Tailwind)
```

## 🧱 Available Components

| Component    | Description                                                                        |
| ------------ | ---------------------------------------------------------------------------------- |
| **Hero**     | Full-width hero section with background image, title, description, and CTA buttons |
| **Features** | Feature grid with icons, supports 3 display variants (cards, simple, icons-left)   |
| **Grid**     | Flexible layout grid (1-6 columns) with nested DropZone support                    |
| **Card**     | Content card with image, 3 variants (default, horizontal, overlay)                 |
| **Heading**  | Heading component (H1-H4) with gradient color option                               |
| **Text**     | Text paragraph with size, weight, and color options                                |
| **Button**   | Button/link with 5 variants (primary, secondary, outline, ghost, gradient)         |
| **Spacer**   | Vertical spacing with optional divider line                                        |

## 🔧 Configuration

### WebBuilder Props

```tsx
interface WebBuilderProps {
  data: WebBuilderData; // Initial page data
  onSave: (data) => void; // Save callback
  onChange?: (data) => void; // Optional change callback
  headerTitle?: string; // Editor header title
}
```

### Helper Functions

```tsx
import { createEmptyData, createInitialData } from "./modules/web-builder";

// Create empty page
const emptyPage = createEmptyData();

// Create page with sample Hero section
const samplePage = createInitialData();
```

## 🎯 Using as a Reusable Module

The entire web builder is encapsulated in `/src/modules/web-builder`. To use it in another project:

1. **Copy** the `web-builder` folder to your project's modules directory
2. **Install** peer dependencies:
   ```bash
   npm install @measured/puck lucide-react
   npm install -D tailwindcss @tailwindcss/vite
   ```
3. **Import** and use:
   ```tsx
   import { WebBuilder } from "@/modules/web-builder";
   ```

## 📦 Tech Stack

- [React 19](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool
- [@measured/puck](https://github.com/measuredco/puck) - Visual Editor Engine
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons

## 🛠️ Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📄 License

MIT

---

Built with ❤️ using [Puck](https://github.com/measuredco/puck)
