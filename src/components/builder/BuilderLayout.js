"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiEye,
  FiEyeOff,
  FiSave,
  FiDownload,
  FiCheck,
} from "react-icons/fi";

const BuilderLayout = ({ children, header, preview, navigation }) => {
  const [showPreview, setShowPreview] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle, saving, success, error
  const router = useRouter();

  const handleSave = async () => {
    try {
      setSaveStatus("saving");
      // This would be replaced with actual save logic
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-secondary/20 to-primary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      {/* Header Bar */}
      <header className="bg-gradient-to-r from-primary to-accent text-white shadow-lg z-10 relative backdrop-blur-sm bg-black/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 lg:hidden"
            >
              {showSidebar ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <h1 className="text-2xl font-bold tracking-tight">
              Resume Builder
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              className={`p-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                saveStatus === "saving"
                  ? "bg-white/20 animate-pulse"
                  : saveStatus === "success"
                  ? "bg-green-500 text-white"
                  : saveStatus === "error"
                  ? "bg-red-500 text-white"
                  : "hover:bg-white/20"
              }`}
              title="Save"
              disabled={saveStatus === "saving"}
            >
              {saveStatus === "saving" ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : saveStatus === "success" ? (
                <FiCheck size={20} />
              ) : (
                <FiSave size={20} />
              )}
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              title="Download PDF"
            >
              <FiDownload size={20} />
            </button>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="py-2 px-4 rounded-full hover:bg-white/20 transition-colors duration-200 flex items-center gap-2 border border-white/30"
            >
              {showPreview ? (
                <>
                  <FiEyeOff size={18} />
                  <span className="hidden sm:inline">Hide Preview</span>
                </>
              ) : (
                <>
                  <FiEye size={18} />
                  <span className="hidden sm:inline">Show Preview</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Stepper Header - Fixed at top */}
        <div className="absolute top-0 left-0 right-0 bg-card/90 backdrop-blur-sm z-10 shadow-sm border-b border-border">
          {header}
        </div>

        {/* Content Area */}
        <div className="flex flex-1 pt-16 h-full w-full">
          {/* Main Content */}
          <main
            className={`flex-1 overflow-y-auto h-full transition-all duration-300 ease-in-out opacity-100 animate-fade-in bg-card/90 backdrop-blur-sm ${
              showPreview ? "lg:w-1/2" : "lg:w-3/4"
            }`}
          >
            <div className="container mx-auto px-6 py-8 max-w-3xl">
              {children}

              {/* Navigation controls - Fixed at bottom */}
              <div className="sticky bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm py-4 border-t mt-10 px-4 rounded-t-xl shadow-[0_-5px_15px_rgba(0,0,0,0.2)]">
                {navigation}
              </div>
            </div>
          </main>

          {/* Resume Preview */}
          {showPreview && (
            <div className="hidden lg:block w-1/2 h-full bg-black/40 backdrop-blur-sm border-l border-border overflow-auto p-6 animate-slide-right">
              <div className="max-w-[612px] mx-auto bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                {preview}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Preview Toggle */}
      <div
        className="fixed bottom-6 right-6 lg:hidden animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200"
        >
          {showPreview ? <FiEyeOff size={24} /> : <FiEye size={24} />}
        </button>
      </div>

      {/* Mobile Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center lg:hidden animate-fade-in"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-card w-11/12 h-5/6 rounded-xl overflow-auto animate-slide-up shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-primary to-accent text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Resume Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 flex justify-center">
              <div className="w-full max-w-[512px]">{preview}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderLayout;
