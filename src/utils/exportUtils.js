import { toPng, toJpeg } from "html-to-image";
import { Canvg } from "canvg";
import { exportToPdf } from "./pdfExport";

// Helper to fix SVG issues when exporting to image
const fixSvgForExport = async (node) => {
  const allSvgs = node.querySelectorAll("svg");

  for (let i = 0; i < allSvgs.length; i++) {
    const svg = allSvgs[i];
    const bBox = svg.getBBox();

    if (!svg.getAttribute("viewBox")) {
      svg.setAttribute("viewBox", `0 0 ${bBox.width} ${bBox.height}`);
    }

    // Convert SVG to canvas for better image conversion
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = svg.clientWidth;
    canvas.height = svg.clientHeight;

    const v = await Canvg.from(ctx, svg.outerHTML);
    await v.render();

    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    img.width = svg.clientWidth;
    img.height = svg.clientHeight;
    img.style.cssText = window.getComputedStyle(svg).cssText;

    svg.parentNode.replaceChild(img, svg);
  }

  return node;
};

// Option configuration for html-to-image
const getExportOptions = () => {
  return {
    quality: 1,
    pixelRatio: 2,
    skipFonts: false,
    fontEmbedCSS: "",
    backgroundColor: "white",
    style: {
      margin: 0,
      padding: 0,
    },
    filter: (node) => {
      // Skip any elements that shouldn't be in the exported image
      return (
        node.tagName !== "BUTTON" &&
        !node.classList?.contains("no-export") &&
        !node.style?.display === "none"
      );
    },
  };
};

/**
 * Exports a React ref to a PNG image
 * @param {React.RefObject} nodeRef - React ref of the node to export
 * @param {string} fileName - Name of the file to download (without extension)
 */
export const exportToPng = async (nodeRef, fileName = "resume") => {
  try {
    if (!nodeRef.current) {
      throw new Error("Node reference is invalid");
    }

    // Show loading toast
    const toast = showToast("Generating PNG...");

    const dataUrl = await toPng(nodeRef.current, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: "white",
    });

    // Create download link
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();

    // Show success toast
    hideToast(toast);
    showToast("PNG downloaded successfully!", "success");
  } catch (error) {
    console.error("Error exporting to PNG:", error);
    showToast("Failed to generate PNG. Please try again.", "error");
  }
};

/**
 * Exports a React ref to a JPEG image
 * @param {React.RefObject} nodeRef - React ref of the node to export
 * @param {string} fileName - Name of the file to download (without extension)
 */
export const exportToJpeg = async (nodeRef, fileName = "resume") => {
  try {
    if (!nodeRef.current) {
      throw new Error("Node reference is invalid");
    }

    // Show loading toast
    const toast = showToast("Generating JPEG...");

    const dataUrl = await toJpeg(nodeRef.current, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: "white",
    });

    // Create download link
    const link = document.createElement("a");
    link.download = `${fileName}.jpeg`;
    link.href = dataUrl;
    link.click();

    // Show success toast
    hideToast(toast);
    showToast("JPEG downloaded successfully!", "success");
  } catch (error) {
    console.error("Error exporting to JPEG:", error);
    showToast("Failed to generate JPEG. Please try again.", "error");
  }
};

/**
 * Exports a React ref to a PDF document (re-exports from pdfExport.js)
 * Uses the element ID instead of a React ref
 * @param {React.RefObject} nodeRef - React ref of the node to export
 * @param {string} fileName - Name of the file to download (without extension)
 */
export const exportToPdfFromRef = async (nodeRef, fileName = "resume") => {
  try {
    if (!nodeRef.current) {
      throw new Error("Node reference is invalid");
    }

    // Ensure element has an ID, or create a temporary one
    const elementId = nodeRef.current.id || `export-element-${Date.now()}`;
    if (!nodeRef.current.id) {
      nodeRef.current.id = elementId;
    }

    // Call the PDF export function
    await exportToPdf(elementId, `${fileName}.pdf`);

    // Remove the temporary ID if we created one
    if (!nodeRef.current.id) {
      nodeRef.current.removeAttribute("id");
    }
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    showToast("Failed to generate PDF. Please try again.", "error");
  }
};

/**
 * Helper function to show a toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (info, success, error)
 * @returns {number} Toast ID for hiding
 */
const showToast = (message, type = "info") => {
  // Simple toast implementation - could be replaced with a real toast library
  const toast = document.createElement("div");
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white z-50 animate-fade-in ${
    type === "error"
      ? "bg-red-500"
      : type === "success"
      ? "bg-green-500"
      : "bg-blue-500"
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  const id = setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);

  return id;
};

/**
 * Helper function to hide a toast notification
 * @param {number} id - Toast ID to hide
 */
const hideToast = (id) => {
  clearTimeout(id);
};
