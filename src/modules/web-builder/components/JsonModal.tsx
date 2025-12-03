import { useState, useEffect } from "react";
import { X, Copy, Check, Upload, AlertCircle } from "lucide-react";

export interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "import" | "export";
  data?: unknown;
  onSave?: (data: unknown) => void;
}

export function JsonModal({
  isOpen,
  onClose,
  type,
  data,
  onSave,
}: JsonModalProps) {
  const [jsonContent, setJsonContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update content when modal opens or data changes
  useEffect(() => {
    if (isOpen && type === "export" && data) {
      setJsonContent(JSON.stringify(data, null, 2));
      setError(null);
    } else if (isOpen && type === "import") {
      setJsonContent("");
      setError(null);
    }
  }, [isOpen, type, data]);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonContent);
      setCopied(true);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  const handleLoadData = () => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonContent);

      // Basic validation for Puck data structure
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid JSON structure");
      }

      if (!parsed.content || !Array.isArray(parsed.content)) {
        throw new Error('JSON must contain a "content" array');
      }

      if (onSave) {
        onSave(parsed);
        onClose();
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON syntax. Please check your input.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to parse JSON");
      }
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJsonContent(text);
      setError(null);
    } catch {
      setError("Failed to read from clipboard");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-semibold text-slate-900">
            {type === "export" ? "Export JSON Data" : "Import JSON Data"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <p className="text-sm text-slate-600 mb-4">
            {type === "export"
              ? "Copy the JSON data below to save or share your page configuration."
              : "Paste your JSON data below to load a page configuration."}
          </p>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={jsonContent}
              onChange={(e) => {
                setJsonContent(e.target.value);
                setError(null);
              }}
              readOnly={type === "export"}
              className={`w-full h-96 p-4 font-mono text-sm rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                type === "export"
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white border-slate-300 text-slate-900"
              } ${error ? "border-red-300 focus:ring-red-500" : ""}`}
              placeholder={
                type === "import"
                  ? '{\n  "root": { "props": { "title": "My Page" } },\n  "content": [],\n  "zones": {}\n}'
                  : ""
              }
              spellCheck={false}
            />

            {/* Line count indicator */}
            <div className="absolute bottom-3 right-3 text-xs text-slate-400">
              {jsonContent.split("\n").length} lines
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="text-xs text-slate-500">
            {type === "export"
              ? `${jsonContent.length.toLocaleString()} characters`
              : "Paste valid Puck JSON data"}
          </div>

          <div className="flex items-center gap-3">
            {type === "import" && (
              <button
                onClick={handlePasteFromClipboard}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Paste from Clipboard
              </button>
            )}

            {type === "export" ? (
              <button
                onClick={handleCopyToClipboard}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-500"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to Clipboard
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleLoadData}
                disabled={!jsonContent.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4" />
                Load Data
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JsonModal;
