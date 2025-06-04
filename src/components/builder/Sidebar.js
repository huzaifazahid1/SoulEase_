"use client";

import { useState } from "react";
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  LanguageIcon,
  TrophyIcon,
  DocumentTextIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

const sidebarSections = [
  { id: "personal", name: "Personal Details", icon: UserIcon },
  { id: "education", name: "Education", icon: AcademicCapIcon },
  { id: "experience", name: "Work Experience", icon: BriefcaseIcon },
  { id: "skills", name: "Skills", icon: WrenchScrewdriverIcon },
  { id: "languages", name: "Languages", icon: LanguageIcon },
  { id: "certifications", name: "Certifications", icon: TrophyIcon },
  { id: "summary", name: "Professional Summary", icon: DocumentTextIcon },
  { id: "links", name: "Links", icon: LinkIcon },
];

const Sidebar = ({ activeSection = "personal", onSectionChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          <span>
            {sidebarSections.find((s) => s.id === activeSection)?.name ||
              "Select Section"}
          </span>
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar for mobile and desktop */}
      <div
        className={`${
          isMobileOpen ? "block" : "hidden"
        } md:block md:min-w-[240px] md:w-60 bg-gray-50 border-r border-gray-200`}
      >
        <nav className="sticky top-0 p-4 space-y-1">
          {sidebarSections.map((section) => {
            const Icon = section.icon;
            const isActive = section.id === activeSection;

            return (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  setIsMobileOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                } transition-colors`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {section.name}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
