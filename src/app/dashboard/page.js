"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiEdit,
  FiDownload,
  FiTrash2,
  FiPlus,
  FiUser,
  FiBriefcase,
  FiFile,
  FiArrowRight,
} from "react-icons/fi";

export default function Dashboard() {
  // Mock data for resume list
  const [resumes, setResumes] = useState([
    {
      id: "1",
      title: "Software Developer Resume",
      lastUpdated: "2023-06-15",
      template: "Professional",
    },
    {
      id: "2",
      title: "Marketing Specialist",
      lastUpdated: "2023-05-22",
      template: "Creative",
    },
    {
      id: "3",
      title: "Project Manager Resume",
      lastUpdated: "2023-04-30",
      template: "Modern",
    },
  ]);

  const deleteResume = (id) => {
    setResumes(resumes.filter((resume) => resume.id !== id));
  };

  return (
    <div className="min-h-screen bg-mesh-2 py-12">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-secondary/20 to-primary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="glass rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                My Resume Dashboard
              </h1>
              <p className="text-gray-600">
                Manage all your resumes in one place
              </p>
            </div>
            <Link
              href="/builder/new"
              className="mt-4 md:mt-0 inline-flex items-center px-5 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FiPlus className="mr-2" />
              Create New Resume
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className="glass-card p-6 border-t-4 border-primary animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <FiFile className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Resumes
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {resumes.length}
                </p>
              </div>
            </div>
          </div>

          <div
            className="glass-card p-6 border-t-4 border-secondary animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary/10 mr-4">
                <FiUser className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Profile Completeness
                </p>
                <p className="text-2xl font-bold text-gray-800">85%</p>
              </div>
            </div>
          </div>

          <div
            className="glass-card p-6 border-t-4 border-accent animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent/10 mr-4">
                <FiBriefcase className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Job Applications
                </p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resume List */}
        <div
          className="glass rounded-xl shadow-md overflow-hidden animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <div className="p-6 border-b border-gray-200/30">
            <h2 className="text-xl font-semibold text-gray-800">My Resumes</h2>
          </div>

          <div className="divide-y divide-gray-200/30">
            {resumes.length > 0 ? (
              resumes.map((resume, index) => (
                <div
                  key={resume.id}
                  className="p-6 hover:bg-white/40 transition-colors"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">
                        {resume.title}
                      </h3>
                      <div className="flex items-center flex-wrap text-sm text-gray-500 mb-2">
                        <span className="mr-3 flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1"></span>
                          Template: {resume.template}
                        </span>
                        <span className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-1"></span>
                          Last updated: {resume.lastUpdated}
                        </span>
                      </div>
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Ready to use
                      </div>
                    </div>

                    <div className="flex items-center mt-4 md:mt-0 space-x-3">
                      <Link
                        href={`/builder/${resume.id}`}
                        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center space-x-1"
                        title="Edit Resume"
                      >
                        <FiEdit className="w-5 h-5" />
                        <span className="hidden md:inline text-sm">Edit</span>
                      </Link>

                      <button
                        className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center space-x-1"
                        title="Download Resume"
                      >
                        <FiDownload className="w-5 h-5" />
                        <span className="hidden md:inline text-sm">
                          Download
                        </span>
                      </button>

                      <button
                        onClick={() => deleteResume(resume.id)}
                        className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center space-x-1"
                        title="Delete Resume"
                      >
                        <FiTrash2 className="w-5 h-5" />
                        <span className="hidden md:inline text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <FiFile className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No resumes found
                </h3>
                <p className="text-gray-500 mb-4">
                  Create your first resume to get started
                </p>
                <Link
                  href="/builder/new"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-md hover:shadow-md transition-all duration-300"
                >
                  <FiPlus className="mr-2" />
                  Create Resume
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tips section */}
        <div
          className="mt-8 glass-card p-6 animate-fade-in"
          style={{ animationDelay: "700ms" }}
        >
          <h2 className="text-xl font-semibold mb-4 gradient-text">
            Tips for a great resume
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1 text-gray-800">
                  Keep it concise
                </h3>
                <p className="text-sm text-gray-600">
                  Recruiters spend only 6-7 seconds scanning your resume
                  initially
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1 text-gray-800">
                  Quantify achievements
                </h3>
                <p className="text-sm text-gray-600">
                  Use numbers to demonstrate the impact of your work
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-right">
            <Link
              href="/tips"
              className="inline-flex items-center text-sm text-primary hover:text-accent transition-colors font-medium"
            >
              View all resume tips
              <FiArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
