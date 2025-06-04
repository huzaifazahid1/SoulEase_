"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import BuilderLayout from "@/components/builder/BuilderLayout";

export default function ResumeBuilderPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "professional";
  const [resumeName, setResumeName] = useState(
    `My ${template.charAt(0).toUpperCase() + template.slice(1)} Resume`
  );

  const handleSave = async () => {
    console.log("Saving resume with ID:", id);
    console.log("Using template:", template);
    // Here you would typically save the resume to your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Resume saved successfully!");
        resolve();
      }, 1000);
    });
  };

  return (
    <BuilderLayout resumeName={resumeName} onSave={handleSave}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Resume Builder</h2>
        <p className="text-gray-600">
          Select a section from the sidebar to edit your resume. All changes are
          automatically saved.
        </p>
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-500">
            Currently editing:{" "}
            <span className="font-medium">Personal Details</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Template: <span className="font-medium capitalize">{template}</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Resume ID: <span className="font-mono">{id}</span>
          </p>
        </div>
      </div>
    </BuilderLayout>
  );
}
