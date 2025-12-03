# Puck Web Builder - AI Coding Instructions

## Architecture Overview

This is a **modular web page builder** using [@measured/puck](https://github.com/measuredco/puck). The entire builder is encapsulated in `/src/modules/web-builder/` as a **plug-and-play module** designed to be copied into other React projects.

### Key Directories

- `src/modules/web-builder/` - The reusable module (self-contained)
  - `config_components/` - Puck components with their configs (Hero, Card, Grid, etc.)
  - `components/` - UI modals (JsonModal, PreviewModal)
  - `config.tsx` - Main Puck configuration aggregating all components
  - `index.tsx` - Public API (`WebBuilder` component, helper functions)

## Component Pattern

Each builder component follows this strict pattern in `config_components/`:

```tsx
// 1. Props interface with explicit types
export interface HeroProps {
  title: string;
  alignment: "left" | "center" | "right";
}

// 2. React component
export const Hero: React.FC<HeroProps> = ({ title, alignment }) => {
  return <section>...</section>;
};

// 3. Puck ComponentConfig with fields, defaultProps, render
export const heroConfig: ComponentConfig<HeroProps> = {
  label: "Hero Section",
  fields: { title: { type: "text", label: "Title" } },
  defaultProps: { title: "Hello", alignment: "center" },
  render: (props) => <Hero {...props} />,
};
```

**Always export**: `Component`, `componentConfig`, `ComponentProps` from each file.

## Adding New Components

1. Create `config_components/NewComponent.tsx` following the pattern above
2. Export from `config_components/index.ts`
3. Add to `ComponentProps` type map in `config.tsx`
4. Register in `config.components` and appropriate `config.categories`

## Styling Conventions

- **Tailwind CSS 4** - Use utility classes, no custom CSS
- Responsive: `sm:`, `md:`, `lg:` prefixes
- Color palette: `slate-*`, `purple-*` (primary accent)
- Common patterns: `rounded-lg`, `shadow-sm`, `transition-colors`

## Puck Field Types Reference

When defining `fields` in ComponentConfig, use these field types:

```tsx
fields: {
  // Basic text input
  title: { type: "text", label: "Title" },

  // Multi-line text
  description: { type: "textarea", label: "Description" },

  // Dropdown select
  variant: {
    type: "select",
    label: "Variant",
    options: [
      { label: "Default", value: "default" },
      { label: "Outlined", value: "outlined" },
    ],
  },

  // Radio buttons (use for boolean or small option sets)
  alignment: {
    type: "radio",
    label: "Alignment",
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
    ],
  },

  // Boolean as radio (Puck has no native checkbox)
  showBadge: {
    type: "radio",
    label: "Show Badge",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },

  // Array field (repeatable items)
  features: {
    type: "array",
    label: "Features",
    arrayFields: {
      icon: { type: "select", label: "Icon", options: [...] },
      title: { type: "text", label: "Title" },
      description: { type: "textarea", label: "Description" },
    },
    defaultItemProps: {
      icon: "zap",
      title: "Feature Title",
      description: "Feature description",
    },
  },

  // Number input
  columns: { type: "number", label: "Columns", min: 1, max: 6 },
}
```

### Field Tips

- **No native image picker** - Use `type: "text"` for image URLs
- **No native color picker** - Use `type: "select"` with predefined color options
- **Boolean values** - Use `type: "radio"` with `true`/`false` values
- **Nested objects** - Use `type: "object"` with `objectFields` (similar to array)

## Puck-Specific Patterns

- Use `<Render config={config} data={data} />` for production preview (not `Puck.Preview`)
- Force Puck re-render with key: `<Puck key={puckKey} ... />`
- Inject header actions via `overrides.headerActions`
- Nested content uses `<DropZone zone="zone-name" />` (see Grid component)

## Data Flow

```
WebBuilder (state: currentData)
  └─> Puck (onChange updates currentData)
       └─> onPublish calls parent's onSave
```

JSON Import/Export modals manipulate `currentData` directly and increment `puckKey` to trigger re-render.

## Commands

```bash
npm run dev          # Development server (http://localhost:5173)
npm run build        # Production build (no TypeScript check)
npm run build:typecheck  # Build with tsc type checking
npm run lint         # ESLint
```

## Deployment Notes

- Build dependencies (`vite`, `tailwindcss`, `@vitejs/plugin-react`) are in `dependencies` (not devDependencies) for Vercel compatibility
- No `tsc` in production build script to avoid Vercel failures
