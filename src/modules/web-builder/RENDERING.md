# Web Builder - Rendering in Production

## Overview

The Web Builder module provides two main components:

1. **`WebBuilder`** - The interactive editor (for admin/content creators)
2. **`WebBuilderRenderer`** - Production rendering (**Client Component** with `"use client"`)

## Architecture: Client Component Pattern

### Why WebBuilderRenderer is a Client Component

`WebBuilderRenderer` **MUST be a Client Component** because:

- Grid uses `DropZone` from `@measured/puck`
- `DropZone` is **client-side only** (not in `@measured/puck/dist/rsc.mjs`)
- Using it without `"use client"` causes: `"Export DropZone doesn't exist in target module"`

### The Recommended Pattern (Next.js App Router)

```
┌─────────────────────────────────────────┐
│  Server Component (page.tsx)            │
│  - Fetches data from API/database       │
│  - Runs on server only                  │
│  - Fast, secure, SEO-friendly           │
└──────────────┬──────────────────────────┘
               │ passes data as props
               ▼
┌─────────────────────────────────────────┐
│  Client Component (WebBuilderRenderer)  │
│  - "use client" directive               │
│  - Renders Grid with DropZone           │
│  - Receives data from parent            │
└─────────────────────────────────────────┘
```

**Benefits**:
✅ Server-side data fetching (fast, SEO-friendly)
✅ Grid with nested components works perfectly
✅ No RSC import errors
✅ Client-side interactivity when needed

## Production Rendering

### Basic Usage

```tsx
import { WebBuilderRenderer } from "@/modules/web-builder";

function PublicPage({ pageData }) {
  return <WebBuilderRenderer data={pageData} />;
}
```

### With Next.js App Router (⭐ Recommended Pattern)

```tsx
// app/pages/[slug]/page.tsx
// THIS IS A SERVER COMPONENT (no "use client")

import { WebBuilderRenderer } from "@/modules/web-builder";
import type { WebBuilderData } from "@/modules/web-builder";

export default async function Page({ params }: { params: { slug: string } }) {
  // ✅ Server-side data fetching
  // - Runs on server only
  // - Secure (API keys, database credentials)
  // - Fast (no client round-trip)
  // - SEO-friendly (content in HTML)
  const res = await fetch(`https://api.example.com/pages/${params.slug}`, {
    cache: "no-store", // or 'force-cache' for static pages
  });

  if (!res.ok) {
    return <div>Page not found</div>;
  }

  const pageData: WebBuilderData = await res.json();

  // ✅ Pass data to WebBuilderRenderer (Client Component)
  // WebBuilderRenderer renders client-side but receives server-fetched data
  return <WebBuilderRenderer data={pageData} />;
}
```

**Why this works**:

1. **Server Component** (page.tsx) - Fetches data securely on server
2. **Client Component** (WebBuilderRenderer) - Renders with DropZone support
3. Grid with nested components works perfectly
4. No "Export DropZone doesn't exist" errors

### With Client-Side Data Fetching

```tsx
"use client";

import { WebBuilderRenderer } from "@/modules/web-builder";
import { useEffect, useState } from "react";

export default function ClientPage({ slug }) {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then((res) => res.json())
      .then((data) => setPageData(data));
  }, [slug]);

  if (!pageData) return <div>Loading...</div>;

  return <WebBuilderRenderer data={pageData} />;
}
```

### With Custom Styling

```tsx
import { WebBuilderRenderer } from "@/modules/web-builder";

function PublicPage({ pageData }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <WebBuilderRenderer data={pageData} className="max-w-full" />
    </div>
  );
}
```

## How Grid Works in Production

The Grid component has `"use client"` and uses `DropZone` internally:

### In Editor (WebBuilder)

- DropZones are **interactive** - users drag/drop components into columns

### In Production (WebBuilderRenderer)

- DropZones render **static content** - no drag/drop UI
- Components inside grid columns render as regular React
- Uses `<Render>` from Puck to handle zones automatically

**Result**:

1. ✅ **No interactive editor UI** - Clean, production-ready output
2. ✅ **Static output** - Pure React components
3. ✅ **No RSC issues** - Client Component with DropZone works perfectly
4. ✅ **Nested components** - Cards, Buttons, Text, etc. render correctly

## Complete Example

```tsx
// Editor page (admin only)
import { WebBuilder } from "@/modules/web-builder";

export default function EditorPage() {
  const [pageData, setPageData] = useState(initialData);

  return (
    <WebBuilder
      data={pageData}
      onSave={async (data) => {
        setPageData(data);
        await fetch("/api/pages", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }}
    />
  );
}

// Public page (production rendering)
import { WebBuilderRenderer } from "@/modules/web-builder";

export default async function PublicPage({ params }) {
  const pageData = await fetch(`/api/pages/${params.id}`).then((r) => r.json());

  return <WebBuilderRenderer data={pageData} />;
}
```

## Data Structure

The `data` prop expects this structure:

```typescript
{
  root: {
    props: { title: "Page Title" }
  },
  content: [
    {
      type: "Grid",
      props: {
        columns: 3,
        gap: "medium",
        // ... other props
      }
    },
    // ... more components
  ],
  zones: {
    "Grid-abc123:column-0": [
      {
        type: "Card",
        props: { /* ... */ }
      }
    ],
    "Grid-abc123:column-1": [
      {
        type: "Button",
        props: { /* ... */ }
      }
    ],
    // ... other zones
  }
}
```

## Performance Tips

1. **Server-Side Data Fetching**: Fetch data in Server Components (parent), pass to WebBuilderRenderer

   ```tsx
   // ✅ Fast: Data fetched on server
   export default async function Page() {
     const data = await fetchData(); // Server-side
     return <WebBuilderRenderer data={data} />;
   }
   ```

2. **Static Generation**: Pre-render pages at build time with `generateStaticParams`

   ```tsx
   export async function generateStaticParams() {
     const pages = await fetchAllPages();
     return pages.map((p) => ({ slug: p.slug }));
   }
   ```

3. **Caching**: Use Next.js cache directives

   ```tsx
   fetch(url, { cache: "force-cache" }); // Static
   fetch(url, { next: { revalidate: 60 } }); // ISR
   ```

4. **Code Splitting**: WebBuilderRenderer is automatically code-split as a Client Component

## Troubleshooting

### Issue: "Export DropZone doesn't exist in target module"

**Error**: When using Grid in a Server Component

**Solution**: Use the Client Component pattern:

```tsx
// ✅ CORRECT: Server Component fetches, Client Component renders
export default async function Page() {
  const data = await fetchData();
  return <WebBuilderRenderer data={data} />; // Client Component
}

// ❌ WRONG: Trying to use Grid directly in Server Component
export default async function Page() {
  return <Grid columns={3}>...</Grid>; // Error!
}
```

### Issue: Components not rendering inside Grid

**Solution**: Make sure you're using `WebBuilderRenderer`, not trying to manually render. The Grid's zones are automatically handled by Puck's `<Render>` component.

### Issue: Styles not applying

**Solution**: Ensure Tailwind CSS is properly configured and the Puck CSS is imported:

```tsx
import "@measured/puck/puck.css";
```

### Issue: "Cannot use DropZone in Server Component"

**Solution**: WebBuilderRenderer already has `"use client"`. If you see this error, you're likely trying to use Grid or Puck components directly. Always use `WebBuilderRenderer` for production rendering.

## API Reference

### WebBuilderRenderer Props

| Prop        | Type             | Required | Description                            |
| ----------- | ---------------- | -------- | -------------------------------------- |
| `data`      | `WebBuilderData` | Yes      | The page data from WebBuilder          |
| `className` | `string`         | No       | Additional CSS classes for the wrapper |

### WebBuilderData Type

```typescript
type WebBuilderData = Data<ComponentProps>;

// Where Data is from @measured/puck and ComponentProps includes:
type ComponentProps = {
  Hero: HeroProps;
  Features: FeaturesProps;
  Grid: GridProps;
  Card: CardProps;
  Text: TextProps;
  Heading: HeadingProps;
  Button: ButtonProps;
  Spacer: SpacerProps;
};
```
