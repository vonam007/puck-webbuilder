import { useState, useCallback } from "react";
import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { Download, Upload, Eye, ArrowLeft, Save } from "lucide-react";

import { config, type ComponentProps } from "./config";
import { JsonModal, PreviewModal } from "./components";

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
   * Optional callback for back button navigation
   */
  onBack?: () => void;

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
  onBack,
  headerTitle = "Web Builder",
}: WebBuilderProps) {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"import" | "export">("export");
  const [currentData, setCurrentData] = useState<WebBuilderData>(data);
  const [puckKey, setPuckKey] = useState(0); // Key to force Puck re-render
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Handle data change from Puck
  const handleChange = useCallback(
    (newData: WebBuilderData) => {
      setCurrentData(newData);
      onChange?.(newData);
    },
    [onChange]
  );

  // Open Export Modal
  const openExportModal = useCallback(() => {
    setModalType("export");
    setIsModalOpen(true);
  }, []);

  // Open Import Modal
  const openImportModal = useCallback(() => {
    setModalType("import");
    setIsModalOpen(true);
  }, []);

  // Handle Import Data
  const handleImportData = useCallback((importedData: unknown) => {
    const newData = importedData as WebBuilderData;
    setCurrentData(newData);
    setPuckKey((prev) => prev + 1); // Force Puck to re-render with new data
  }, []);

  // Close Modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Preview handlers
  const openPreview = useCallback(() => {
    setIsPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setIsPreviewOpen(false);
  }, []);

  return (
    <>
      <Puck
        key={puckKey}
        config={config}
        data={currentData}
        onPublish={onSave}
        onChange={handleChange}
        headerTitle={headerTitle}
        overrides={{
          headerActions: () => (
            <>
              {onBack && (
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                  title="Back to Dashboard"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                onClick={openPreview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-500 transition-colors"
                title="Live Preview"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={openImportModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                title="Import JSON"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={openExportModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                title="Export JSON"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => onSave(currentData)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors"
                title="Save Page"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </>
          ),
        }}
      />

      {/* JSON Import/Export Modal */}
      <JsonModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
        data={currentData}
        onSave={handleImportData}
      />

      {/* Live Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={closePreview}
        config={config}
        data={currentData}
      />
    </>
  );
}

/**
 * Render component for displaying saved pages (read-only)
 */
export { Render } from "@measured/puck";

/**
 * WebBuilderRenderer - Production-ready component for rendering saved pages
 * Use this instead of Render for a cleaner API
 */
export { WebBuilderRenderer } from "./WebBuilderRenderer";

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
