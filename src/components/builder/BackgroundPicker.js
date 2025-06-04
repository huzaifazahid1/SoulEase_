import React from "react";
import { useResume } from "@/context/ResumeContext";

const BackgroundPicker = ({ selectedPattern, onChange }) => {
  const { backgroundPatterns } = useResume();

  // Create array from the background patterns object
  const patternOptions = Object.entries(backgroundPatterns).map(
    ([key, value]) => ({
      id: key,
      name:
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
      value,
    })
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in">
      {patternOptions.map((pattern, index) => (
        <button
          key={pattern.id}
          className={`bg-white border rounded-lg p-4 h-24 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md hover:-translate-y-1 animate-fade-in ${
            selectedPattern === pattern.value
              ? "ring-2 ring-primary border-primary"
              : "border-gray-200"
          }`}
          onClick={() => onChange(pattern.value)}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="w-full h-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
            {renderPatternPreview(pattern.value)}
          </div>
          <span className="text-xs font-medium text-gray-700 text-center">
            {pattern.name}
          </span>
        </button>
      ))}
    </div>
  );
};

// Helper function to render background pattern previews
const renderPatternPreview = (pattern) => {
  switch (pattern) {
    case "dots":
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary opacity-70"
              ></div>
            ))}
          </div>
        </div>
      );
    case "lines":
      return (
        <div className="w-full h-full flex flex-col justify-center gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-0.5 w-full bg-primary opacity-70"></div>
          ))}
        </div>
      );
    case "grid":
      return (
        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-primary opacity-50"></div>
          ))}
        </div>
      );
    case "diagonal-lines":
      return (
        <div className="w-full h-full relative overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-primary opacity-70 w-12"
              style={{
                transform: `rotate(45deg)`,
                top: `${i * 5 + 2}px`,
                left: `-5px`,
              }}
            ></div>
          ))}
        </div>
      );
    case "checkered":
      return (
        <div className="w-full h-full grid grid-cols-4 grid-rows-4">
          {[...Array(16)].map((_, i) => {
            const isEven = (Math.floor(i / 4) + (i % 4)) % 2 === 0;
            return (
              <div
                key={i}
                className={isEven ? "bg-primary opacity-30" : ""}
              ></div>
            );
          })}
        </div>
      );
    case "zigzag":
      return (
        <div className="w-full h-full flex items-center">
          <svg width="100%" height="8" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,4 L5,0 L10,4 L15,0 L20,4 L25,0 L30,4 L35,0 L40,4 L45,0 L50,4"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-primary opacity-70"
            />
          </svg>
        </div>
      );
    case "waves":
      return (
        <div className="w-full h-full flex items-center">
          <svg width="100%" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,6 C5,0 10,12 15,6 C20,0 25,12 30,6 C35,0 40,12 45,6 C50,0 55,12 60,6"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-primary opacity-70"
            />
          </svg>
        </div>
      );
    case "none":
    default:
      return (
        <div className="flex items-center justify-center text-sm text-gray-400">
          None
        </div>
      );
  }
};

export default BackgroundPicker;
