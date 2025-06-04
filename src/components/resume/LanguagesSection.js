import React from "react";

const LanguagesSection = ({ languages, color }) => {
  const defaultLanguages = [
    { id: "1", name: "Spanish", level: 95 },
    { id: "2", name: "English", level: 100 },
    { id: "3", name: "Italian", level: 95 },
  ];

  const languageItems = languages?.length > 0 ? languages : defaultLanguages;

  return (
    <div className="py-6 px-8">
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 flex items-center justify-center"
          style={{ color }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold uppercase" style={{ color }}>
          Languages
        </h2>
      </div>

      <div className="space-y-4">
        {languageItems.map((language, index) => (
          <div key={language.id || index} className="space-y-1">
            <div className="flex justify-between">
              <span className="font-medium">{language.name}</span>
              <span>{language.level}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${language.level}%`,
                  backgroundColor: color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesSection;
