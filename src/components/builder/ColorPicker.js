import React from "react";
import { useResume } from "@/context/ResumeContext";

const ColorPicker = ({ selectedColor, onChange }) => {
  const { templateColors } = useResume();

  const colorOptions = Object.entries(templateColors).map(([name, color]) => ({
    id: name,
    value: color,
    name: name.charAt(0).toUpperCase() + name.slice(1),
  }));

  return (
    <div className="flex flex-wrap gap-3 animate-fade-in">
      {colorOptions.map((color, index) => (
        <button
          key={color.id}
          className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-transform hover:scale-110 animate-fade-in ${
            selectedColor === color.value
              ? "ring-2 ring-offset-2 ring-gray-400"
              : ""
          }`}
          style={{
            background: color.value,
            animationDelay: `${index * 0.05}s`,
          }}
          onClick={() => onChange(color.value)}
          title={color.name}
        >
          {selectedColor === color.value && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6 animate-scale-in"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      ))}

      {/* Custom color picker */}
      <div
        className="ml-1 animate-fade-in"
        style={{ animationDelay: `${colorOptions.length * 0.05}s` }}
      >
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-full cursor-pointer border-0 p-0 bg-transparent"
          style={{
            appearance: "none",
            WebkitAppearance: "none",
          }}
          title="Custom color"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
