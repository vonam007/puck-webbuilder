import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";

import { config, type ComponentProps } from "./config";

// Type definition for the WebBuilder data
export type WebBuilderData = Data<ComponentProps>;

// Props interface for the WebBuilder component
export interface WebBuilderProps {
  /**
   * Initial data to load into the builder.
   * Pass an empty object or previous saved data.
   */
  data: WebBuilderData;

  /**
   * Callback function when the user saves the page.
   * Receives the complete page data that can be persisted.
   */
  onSave: (data: WebBuilderData) => void;

  /**
   * Optional callback for when data changes (auto-save, etc.)
   */
  onChange?: (data: WebBuilderData) => void;

  /**
   * Optional header override for the Puck editor
   */
  headerTitle?: string;
}

/**
 * WebBuilder Component
 *
 * A fully encapsulated web page builder based on Puck.
 * This component provides a complete visual editor experience.
 *
 * @example
 * ```tsx
 * import { WebBuilder } from '@/modules/web-builder';
 *
 * function App() {
 *   const [pageData, setPageData] = useState(initialData);
 *
 *   return (
 *     <WebBuilder
 *       data={pageData}
 *       onSave={(data) => {
 *         setPageData(data);
 *         // Save to API/localStorage
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export function WebBuilder({
  data,
  onSave,
  onChange,
  headerTitle = "Web Builder",
}: WebBuilderProps) {
  return (
    <Puck
      config={config}
      data={data}
      onPublish={onSave}
      onChange={onChange}
      headerTitle={headerTitle}
    />
  );
}

/**
 * Render component for displaying saved pages (read-only)
 */
export { Render } from "@measured/puck";

/**
 * Export the config for advanced use cases
 */
export { config } from "./config";

/**
 * Export component types for external use
 */
export type { ComponentProps } from "./config";

/**
 * Helper function to create empty builder data
 */
export function createEmptyData(): WebBuilderData {
  return {
    root: { props: { title: "New Page" } },
    content: [],
    zones: {},
  };
}

/**
 * Helper function to create initial data with a Hero section
 */
export function createInitialData(): WebBuilderData {
  return {
    root: { props: { title: "My Website" } },
    content: [
      {
        type: "Hero",
        props: {
          id: "hero-1",
          title: "Welcome to Your Website",
          description:
            "Start building amazing pages with our drag-and-drop builder. Add components from the sidebar and customize them to your needs.",
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
    ],
    zones: {},
  };
}

export default WebBuilder;
