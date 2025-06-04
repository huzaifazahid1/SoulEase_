"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Footer from "@/components/ui/Footer";

const templates = [
  { id: "professional", name: "Professional", color: "hsl(245, 83%, 67%)" },
  { id: "modern", name: "Modern", color: "hsl(199, 89%, 48%)" },
  { id: "creative", name: "Creative", color: "hsl(31, 91%, 51%)" },
  { id: "executive", name: "Executive", color: "hsl(222, 47%, 15%)" },
  { id: "simple", name: "Simple", color: "hsl(215, 16%, 46%)" },
  { id: "elegant", name: "Elegant", color: "hsl(250, 91%, 65%)" },
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("professional");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl font-bold mb-4">
              Choose Your Resume Template
            </h1>
            <p className="text-xl mb-0 max-w-3xl mx-auto">
              Select from our professionally designed templates to start
              building your resume
            </p>
          </div>
        </section>

        {/* Template Gallery */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`
                    border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer
                    ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-primary"
                        : "hover:border-gray-300"
                    }
                  `}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  {/* Template Preview */}
                  <div className="p-4 bg-gray-50">
                    <div className="w-full h-80 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                      <div className="w-4/5 h-5/6 flex flex-col">
                        <div
                          className="h-16"
                          style={{ backgroundColor: template.color }}
                        ></div>
                        <div className="flex-1 p-4 flex">
                          <div className="w-1/3 pr-2">
                            <div className="w-full h-8 bg-gray-200 rounded mb-2"></div>
                            <div className="w-full h-32 bg-gray-100 rounded"></div>
                          </div>
                          <div className="w-2/3 pl-2 space-y-2">
                            <div className="w-full h-6 bg-gray-200 rounded"></div>
                            <div className="w-full h-6 bg-gray-200 rounded"></div>
                            <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                            <div className="w-full h-6 mt-4 bg-gray-100 rounded"></div>
                            <div className="w-full h-6 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Template Name */}
                  <div className="p-4 flex justify-between items-center">
                    <h3 className="font-medium text-lg">{template.name}</h3>
                    <span
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: template.color }}
                    ></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div className="mt-12 text-center">
              <Link
                href={`/builder/new?template=${selectedTemplate}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-lg font-medium"
              >
                Continue with{" "}
                {templates.find((t) => t.id === selectedTemplate)?.name}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
