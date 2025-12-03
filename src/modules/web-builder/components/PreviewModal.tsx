import { Render, type Config, type Data } from "@measured/puck";
import { X, Monitor, Tablet, Smartphone } from "lucide-react";
import { useState } from "react";

type ViewportSize = "desktop" | "tablet" | "mobile";

export interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: Config;
  data: Data;
}

export function PreviewModal({
  isOpen,
  onClose,
  config,
  data,
}: PreviewModalProps) {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col bg-slate-100">
      {/* Fixed Toolbar - Same position for all viewports */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 shadow-sm">
        {/* Left: Browser Dots + URL Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-lg border border-slate-200 min-w-[300px]">
            <span className="text-xs text-green-600">🔒</span>
            <span className="text-sm text-slate-500">
              https://your-website.com
            </span>
          </div>
        </div>

        {/* Center: Viewport Switcher - FIXED POSITION */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setViewport("desktop")}
            className={`p-2 rounded-md transition-colors ${
              viewport === "desktop"
                ? "bg-white text-purple-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`p-2 rounded-md transition-colors ${
              viewport === "tablet"
                ? "bg-white text-purple-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`p-2 rounded-md transition-colors ${
              viewport === "mobile"
                ? "bg-white text-purple-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Close Button */}
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Close Preview"
        >
          <X className="w-4 h-4" />
          Close
        </button>
      </div>

      {/* Preview Content Area */}
      <div
        className={`flex-1 overflow-auto transition-colors duration-300 ${
          viewport === "desktop" ? "bg-white" : "bg-slate-200"
        }`}
      >
        {viewport === "desktop" ? (
          /* Desktop: Full width content */
          <Render config={config} data={data} />
        ) : (
          /* Tablet/Mobile: Centered device frame */
          <div className="flex justify-center py-8 min-h-full">
            <div
              className={`bg-white shadow-2xl transition-all duration-300 overflow-hidden ${
                viewport === "tablet"
                  ? "w-[768px] rounded-lg"
                  : "w-[375px] rounded-[2rem]"
              }`}
            >
              <Render config={config} data={data} />
            </div>
          </div>
        )}
      </div>

      {/* Footer: Device Info */}
      <div className="px-4 py-2 bg-white border-t border-slate-200 text-center">
        <span className="text-xs text-slate-500">
          {viewport === "desktop" && "Desktop • Full Width"}
          {viewport === "tablet" && "Tablet • 768px"}
          {viewport === "mobile" && "Mobile • 375px"}
        </span>
      </div>
    </div>
  );
}

export default PreviewModal;
