import { useState } from "react";
import {
  WebBuilder,
  createInitialData,
  type WebBuilderData,
} from "../../modules/web-builder";

function WebBuilderPage() {
  // Initialize with sample data containing a Hero section
  const [pageData, setPageData] = useState<WebBuilderData>(createInitialData());

  const handleSave = (data: WebBuilderData) => {
    console.log("📦 Page saved:", data);

    // In a real app, you would save to an API or localStorage
    setPageData(data);

    // Example: Save to localStorage
    localStorage.setItem("page-data", JSON.stringify(data));

    // Show success feedback
    alert("Page saved successfully!");
  };

  const handleChange = (data: WebBuilderData) => {
    // Optional: Auto-save on change
    console.log("📝 Page changed:", data);
  };

  return (
    <div className="h-screen w-screen">
      <WebBuilder
        data={pageData}
        onSave={handleSave}
        onChange={handleChange}
        headerTitle="My Page Builder"
      />
    </div>
  );
}

export default WebBuilderPage;
