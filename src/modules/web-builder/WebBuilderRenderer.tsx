"use client";

import { Render } from "@measured/puck";
import { config, type ComponentProps } from "./config";
import type { Data } from "@measured/puck";

export type WebBuilderData = Data<ComponentProps>;

export interface WebBuilderRendererProps {
  /**
   * The page data to render (from WebBuilder's onSave)
   */
  data: WebBuilderData;

  /**
   * Optional className for the wrapper
   */
  className?: string;
}

/**
 * WebBuilderRenderer Component
 *
 * Use this component to render saved page data in production.
 * This component renders the final output without any editor features.
 * It properly handles all Puck components including Grid with DropZones.
 *
 * @example
 * ```tsx
 * import { WebBuilderRenderer } from '@/modules/web-builder';
 *
 * function PublicPage({ pageData }) {
 *   return <WebBuilderRenderer data={pageData} />;
 * }
 * ```
 *
 * @example Server Component (Next.js App Router)
 * ```tsx
 * import { WebBuilderRenderer } from '@/modules/web-builder';
 *
 * export default async function Page({ params }) {
 *   const pageData = await fetchPageData(params.id);
 *   return <WebBuilderRenderer data={pageData} />;
 * }
 * ```
 */
export function WebBuilderRenderer({
  data,
  className,
}: WebBuilderRendererProps) {
  return (
    <div className={className}>
      <Render config={config} data={data} />
    </div>
  );
}

export default WebBuilderRenderer;
