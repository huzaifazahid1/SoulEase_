"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function NewResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "professional";

  useEffect(() => {
    // Generate a unique ID for the new resume
    const newResumeId = uuidv4();

    // Redirect to the resume builder with the new ID and template
    router.push(`/builder/${newResumeId}?template=${template}`);
  }, [router, template]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Creating your resume...
        </h1>
        <p className="text-gray-600">
          Please wait while we set up your resume builder with the {template}{" "}
          template.
        </p>
      </div>
    </div>
  );
}
