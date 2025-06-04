import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Exports a DOM element to PDF
 * @param {string} elementId - The ID of the element to export
 * @param {string} filename - The name of the PDF file to download
 * @returns {Promise<void>}
 */
export const exportToPdf = async (elementId, filename = "resume.pdf") => {
  try {
    // Get the element to export
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id ${elementId} not found`);
    }

    // Show a loading state or notification
    const loadingToast = showToast("Generating PDF...");

    // Create a canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Calculate the dimensions
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm (210mm)
    const pageHeight = 297; // A4 height in mm (297mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create a PDF document
    const pdf = new jsPDF("p", "mm", "a4");
    let position = 0;

    // Add image to PDF, creating new pages if needed
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    // If the image is larger than one page, create additional pages
    const heightLeft = imgHeight - pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    }

    // Save the PDF file
    pdf.save(filename);

    // Remove loading toast and show success
    hideToast(loadingToast);
    showToast("PDF downloaded successfully!", "success");
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
