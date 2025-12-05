import { WebBuilderRenderer, type WebBuilderData } from "@/modules/web-builder";
import React from "react";

/**
 * Example: Rendering a saved page in production
 *
 * IMPORTANT: WebBuilderRenderer is a CLIENT COMPONENT ("use client")
 * because Grid uses DropZone which is client-side only.
 *
 * Best Practice for Next.js App Router:
 * - Server Component (page.tsx): Fetch data
 * - Client Component (WebBuilderRenderer): Render the page
 *
 * This pattern gives you:
 * ✅ Server-side data fetching (fast, SEO-friendly)
 * ✅ Client-side rendering (Grid with DropZone works)
 * ✅ No RSC import errors
 */

// Example page data (this would typically come from your database/API)
const examplePageData: WebBuilderData = {
  root: {
    props: {
      title: "My Landing Page",
    },
  },
  content: [
    {
      type: "Hero",
      props: {
        title: "Build Amazing Websites",
        description: "Our drag-and-drop builder makes it easy",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920",
        primaryButtonText: "Get Started",
        primaryButtonLink: "#",
        secondaryButtonText: "Learn More",
        secondaryButtonLink: "#",
        alignment: "center",
        showBadge: true,
        badgeText: "New Release",
      },
    },
    {
      type: "Grid",
      props: {
        columns: 3,
        gap: "medium",
        padding: "medium",
        backgroundColor: "transparent",
        maxWidth: "container",
        verticalAlign: "stretch",
      },
    },
  ],
  zones: {
    // Example: Components inside Grid columns
    "Grid-xyz:column-0": [
      {
        type: "Card",
        props: {
          image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
          title: "Feature 1",
          description: "Amazing feature description",
          buttonText: "Learn More",
          buttonLink: "#",
          variant: "default",
          imageAspect: "video",
        },
      },
    ],
    "Grid-xyz:column-1": [
      {
        type: "Card",
        props: {
          image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
          title: "Feature 2",
          description: "Another amazing feature",
          buttonText: "Explore",
          buttonLink: "#",
          variant: "default",
          imageAspect: "video",
        },
      },
    ],
    "Grid-xyz:column-2": [
      {
        type: "Card",
        props: {
          image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
          title: "Feature 3",
          description: "Third amazing feature",
          buttonText: "Discover",
          buttonLink: "#",
          variant: "default",
          imageAspect: "video",
        },
      },
    ],
  },
};

// Example 1: Simple usage
export function SimpleExample() {
  return <WebBuilderRenderer data={examplePageData} />;
}

// Example 2: With custom wrapper
export function StyledExample() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">My Website</h1>
        </div>
      </header>
      <main>
        <WebBuilderRenderer data={examplePageData} />
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Example 3: Dynamic data loading
export function DynamicExample({ pageId }: { pageId: string }) {
  const [pageData, setPageData] = React.useState<WebBuilderData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch page data from API
    fetch(`/api/pages/${pageId}`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load page:", error);
        setLoading(false);
      });
  }, [pageId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">Page not found</p>
        </div>
      </div>
    );
  }

  return <WebBuilderRenderer data={pageData} />;
}

// Example 4: Next.js App Router (RECOMMENDED PATTERN)
// Create this as a separate file: app/pages/[slug]/page.tsx
/*
import { WebBuilderRenderer, type WebBuilderData } from '@/modules/web-builder';

// THIS IS A SERVER COMPONENT - It fetches data on the server
export default async function Page({ params }: { params: { slug: string } }) {
  // ✅ Server-side data fetching (fast, SEO-friendly, secure)
  const res = await fetch(`https://api.example.com/pages/${params.slug}`, {
    cache: 'no-store', // or 'force-cache' for static pages
  });
  
  if (!res.ok) {
    return <div>Page not found</div>;
  }
  
  const pageData: WebBuilderData = await res.json();
  
  // ✅ WebBuilderRenderer is a Client Component
  // It receives server-fetched data and renders it client-side
  // This allows Grid's DropZone to work without RSC errors
  return <WebBuilderRenderer data={pageData} />;
}

// Why this works:
// 1. Server Component (this file) - Fetches data securely on server
// 2. Client Component (WebBuilderRenderer) - Renders with DropZone support
// 3. Grid with nested components works perfectly
// 4. No "Export DropZone doesn't exist" errors
*/

// Example 5: With error boundary
export function SafeExample({ pageData }: { pageData: WebBuilderData }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <WebBuilderRenderer data={pageData} />
    </ErrorBoundary>
  );
}

function ErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default SimpleExample;
