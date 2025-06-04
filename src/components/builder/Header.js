"use client";

import { useState } from "react";
import {
  PencilIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const Header = ({ resumeName = "Untitled Resume", onSave }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(resumeName);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsEditingName(false);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Resume name */}
        <div className="flex items-center">
          {isEditingName ? (
            <form onSubmit={handleNameSubmit} className="flex items-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b border-gray-300 focus:border-primary/90 focus:outline-none px-1 py-0.5 text-lg font-medium"
                autoFocus
                onBlur={handleNameSubmit}
              />
            </form>
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="group flex items-center text-lg font-medium"
            >
              <span className="mr-2">{name}</span>
              <PencilIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 py-1 px-3 rounded-md hover:bg-gray-50">
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </button>

          <button
            onClick={onSave}
            className="flex items-center text-sm bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-4 rounded-md"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Save
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
