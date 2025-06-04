import React from "react";

const SkillsSection = ({ skills, color }) => {
  const defaultSkills = [
    { id: "1", name: "Skill 1", level: 95 },
    { id: "2", name: "Skill 2", level: 90 },
    { id: "3", name: "Skill 3", level: 85 },
    { id: "4", name: "Skill 4", level: 80 },
    { id: "5", name: "Skill 5", level: 75 },
  ];

  const skillItems = skills?.length > 0 ? skills : defaultSkills;

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
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold uppercase" style={{ color }}>
          Skills
        </h2>
      </div>

      <div className="space-y-4">
        {skillItems.map((skill, index) => (
          <div key={skill.id || index} className="space-y-1">
            <div className="flex justify-between">
              <span className="font-medium">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${skill.level}%`,
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

export default SkillsSection;
