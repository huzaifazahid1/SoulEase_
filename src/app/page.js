"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50 via-purple-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Build a standout resume</span>{" "}
                that lands your dream job
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our professional resume builder helps you create impressive
                resumes in minutes with expert-designed templates that will get
                you more interviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/builder/new"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg font-medium btn-hover-raise"
                >
                  Create My Resume
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center px-6 py-3.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
                >
                  View Resume Templates
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 card-hover-lift">
                  <div className="w-full h-[600px] bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
                    <div className="w-2/3 h-5/6 border border-gray-300 rounded-lg bg-white shadow-sm p-6 transform transition-transform hover:scale-[1.02] duration-300">
                      <div className="w-full h-16 bg-gradient-to-r from-primary to-accent mb-4 rounded-lg"></div>
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/3 h-[500px] bg-gray-100 rounded-lg"></div>
                        <div className="w-2/3 space-y-4">
                          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
                          <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
                          <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-secondary to-amber-400 rounded-full opacity-70 blur-xl"></div>
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full opacity-70 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What our customers say section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              What our customers say about ResumeNerd
            </h2>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Trustpilot 4.8/5
              </div>
              <div className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                G2 4.9/5
              </div>
              <div className="px-4 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Capterra 4.7/5
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create your resume in 3 simple steps */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-14 gradient-text">
            Create your resume in 3 simple steps:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 card-hover-lift">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose a template</h3>
              <p className="text-gray-600">
                Select from our professionally designed templates that employers
                love.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 card-hover-lift">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter your info</h3>
              <p className="text-gray-600">
                Our builder guides you through each section with expert tips and
                suggestions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 card-hover-lift">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Download your resume
              </h3>
              <p className="text-gray-600">
                Instantly download as PDF, or save and come back to edit
                whenever you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
            Everything You Need: Features of ResumeNerd
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Get expert suggestions on what to add to your resume
                </h3>
                <p className="text-gray-600">
                  Our AI-powered suggestion tool helps you include the most
                  relevant skills and experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-7 h-7 text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Add a cover letter in a matching style
                </h3>
                <p className="text-gray-600">
                  Create professional cover letters that perfectly complement
                  your resume design.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-7 h-7 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  We make your resume ATS-friendly
                </h3>
                <p className="text-gray-600">
                  Our templates are optimized to pass Applicant Tracking Systems
                  and reach hiring managers.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-7 h-7 text-indigo-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Download in multiple formats
                </h3>
                <p className="text-gray-600">
                  Export your resume as PDF, DOCX, or JPG to suit all
                  application requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to build your professional resume?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who've successfully landed their dream
            jobs using our resume builder
          </p>
          <Link
            href="/builder/new"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg transform hover:scale-105"
          >
            Start Building For Free
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                ResumeNerd
              </h3>
              <p className="text-sm mb-4">
                Building professional resumes made simple.
              </p>
            </div>

            <div>
              <h4 className="text-white text-base font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/templates"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-base font-medium mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-base font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} ResumeNerd. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
