import React, { useRef, useState, useEffect } from "react";
import { useResume } from "@/context/ResumeContext";
import ResumeTemplate from "../resume/ResumeTemplate";
import Button from "../ui/Button";
import {
  exportToPng,
  exportToJpeg,
  exportToPdfFromRef,
} from "@/utils/exportUtils";
import {
  FiDownload,
  FiImage,
  FiFile,
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiCopy,
} from "react-icons/fi";

const ResumePreview = ({ resumeData }) => {
  const resumeRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [fitToView, setFitToView] = useState(true);
  const [previewWidth, setPreviewWidth] = useState(0);
  const containerRef = useRef(null);

  // Recalculate preview width when container size changes or when fitToView is toggled
  useEffect(() => {
    const updatePreviewWidth = () => {
      if (!containerRef.current) return;

      if (fitToView) {
        // Set width to fit container with some padding
        const containerWidth = containerRef.current.clientWidth - 48; // 24px padding on each side
        setPreviewWidth(Math.min(containerWidth, 612)); // Max A4 width (612px)
      } else {
        // Set to A4 width
        setPreviewWidth(612); // A4 width at 72dpi
      }
    };

    updatePreviewWidth();

    // Add resize event listener
    window.addEventListener("resize", updatePreviewWidth);

    return () => {
      window.removeEventListener("resize", updatePreviewWidth);
    };
  }, [fitToView]);

  const handleExportPdf = async () => {
    setIsExporting(true);
    await exportToPdfFromRef(
      resumeRef,
      `resume-${resumeData?.personal?.fullName || "export"}`
    );
    setIsExporting(false);
  };

  const handleExportPng = async () => {
    setIsExporting(true);
    await exportToPng(
      resumeRef,
      `resume-${resumeData?.personal?.fullName || "export"}`
    );
    setIsExporting(false);
  };

  const handleExportJpg = async () => {
    setIsExporting(true);
    await exportToJpeg(
      resumeRef,
      `resume-${resumeData?.personal?.fullName || "export"}`
    );
    setIsExporting(false);
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5));
    setFitToView(false);
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
    setFitToView(false);
  };

  const toggleFitToView = () => {
    setFitToView(!fitToView);
    if (fitToView) {
      setScale(1);
    }
  };

  return (
    <div
      className="flex flex-col h-full opacity-100 animate-fade-in"
      ref={containerRef}
    >
      <div className="bg-gradient-to-r from-card to-card/80 p-4 border-b border-border sticky top-0 z-10 shadow-sm backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-primary">
            {resumeData?.personal?.fullName
              ? `${resumeData.personal.fullName}'s Resume`
              : "Resume Preview"}
          </h3>

          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-border">
            <button
              onClick={zoomOut}
              className="p-1.5 rounded-full text-foreground hover:bg-card transition-colors"
              disabled={scale <= 0.5}
              title="Zoom Out"
            >
              <FiZoomOut size={18} />
            </button>
            <span className="text-sm font-medium text-foreground min-w-[40px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1.5 rounded-full text-foreground hover:bg-card transition-colors"
              disabled={scale >= 1.5}
              title="Zoom In"
            >
              <FiZoomIn size={18} />
            </button>
            <button
              onClick={toggleFitToView}
              className={`p-1.5 rounded-full transition-colors ${
                fitToView
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-card"
              }`}
              title={fitToView ? "Actual Size" : "Fit to View"}
            >
              <FiMaximize size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gradient-to-br from-card/80 to-black/40 p-4 flex flex-col relative">
        <div className="mb-6 sticky top-0 z-10 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-border">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="primary"
              onClick={handleExportPdf}
              leftIcon={<FiFile size={18} />}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 py-2.5"
              disabled={isExporting}
            >
              {isExporting ? "Generating PDF..." : "Export PDF"}
            </Button>

            <Button
              variant="secondary"
              onClick={handleExportPng}
              leftIcon={<FiImage size={18} />}
              className="py-2.5"
              disabled={isExporting}
            >
              {isExporting ? "Generating..." : "Export PNG"}
            </Button>

            <Button
              variant="outline"
              onClick={handleExportJpg}
              leftIcon={<FiDownload size={18} />}
              className="py-2.5"
              disabled={isExporting}
            >
              {isExporting ? "Generating..." : "Export JPG"}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-start justify-center p-4 opacity-100 animate-slide-up">
          <div
            className="transform transition-transform duration-200 ease-in-out bg-white shadow-xl rounded-lg overflow-hidden"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              width: `${previewWidth}px`,
              height: "auto",
            }}
          >
            <ResumeTemplate resumeData={resumeData} ref={resumeRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
