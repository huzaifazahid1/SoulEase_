"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useResume } from "../../context/ResumeContext";
import { useAuth } from "../../context/AuthContext";
import BuilderLayout from "../../components/builder/BuilderLayout";
import PersonalInfoStep from "../../components/builder/steps/PersonalInfoStep";
import ExperienceStep from "../../components/builder/steps/ExperienceStep";
import EducationStep from "../../components/builder/steps/EducationStep";
import SkillsLanguagesStep from "../../components/builder/steps/SkillsLanguagesStep";
import PassionsSocialStep from "../../components/builder/steps/PassionsSocialStep";
import ColorPicker from "../../components/builder/ColorPicker";
import BackgroundPicker from "../../components/builder/BackgroundPicker";
import ResumePreview from "../../components/builder/ResumePreview";
import Stepper from "../../components/builder/Stepper";
import Button from "../../components/ui/Button";

const ResumeBuilder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  const { user } = useAuth();
  const { getResumeById, updateResume, createResume, defaultResumeData } =
    useResume();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ ...defaultResumeData });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedState, setSavedState] = useState(true);
  const [showSaveError, setShowSaveError] = useState(false);

  // Steps configuration
  const steps = [
    {
      id: "personal",
      title: "Personal Info",
      description: "Basic details and contact information",
    },
    {
      id: "experience",
      title: "Experience",
      description: "Work history and achievements",
    },
    {
      id: "education",
      title: "Education",
      description: "Academic background",
    },
    {
      id: "skills",
      title: "Skills & Languages",
      description: "Technical and language proficiency",
    },
    {
      id: "passions",
      title: "Interests & Social",
      description: "Hobbies and online profiles",
    },
    {
      id: "customize",
      title: "Customize",
      description: "Colors and visual style",
    },
  ];

  // Load resume data if editing an existing resume
  useEffect(() => {
    const loadResume = async () => {
      setLoading(true);

      if (resumeId) {
        try {
          const resume = await getResumeById(resumeId);
          if (resume) {
            setFormData(resume);
            setSavedState(true);
          } else {
            // If resume not found, initialize with default data
            setFormData({ ...defaultResumeData });
          }
        } catch (error) {
          console.error("Error loading resume:", error);
          setFormData({ ...defaultResumeData });
        }
      } else {
        // Creating a new resume
        setFormData({ ...defaultResumeData });
      }

      setLoading(false);
    };

    loadResume();
  }, [resumeId, getResumeById, defaultResumeData]);

  // Track changes for auto-save
  useEffect(() => {
    if (!loading) {
      setSavedState(false);
    }
  }, [formData, loading]);

  // Auto-save resume every 30 seconds
  useEffect(() => {
    if (!savedState && !loading && user) {
      const saveTimer = setTimeout(() => {
        handleSave(false); // Silent save
      }, 30000);

      return () => clearTimeout(saveTimer);
    }
  }, [savedState, formData, user, loading]);

  // Update form data
  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Save resume
  const handleSave = async (showFeedback = true) => {
    if (!user) {
      // Show error toast instead of redirect
      setShowSaveError(true);
      setTimeout(() => setShowSaveError(false), 3000);
      return;
    }

    setSaving(true);

    try {
      if (resumeId) {
        await updateResume(resumeId, formData);
      } else {
        const newResumeId = await createResume(formData);
        if (newResumeId) {
          // Update URL with the new resume ID without full page navigation
          window.history.pushState({}, "", `/builder?id=${newResumeId}`);
        }
      }
      setSavedState(true);
    } catch (error) {
      console.error("Error saving resume:", error);
      if (showFeedback) {
        setShowSaveError(true);
        setTimeout(() => setShowSaveError(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  // Navigate to dashboard
  const goToDashboard = useCallback(() => {
    // Auto-save before navigation if unsaved changes
    if (!savedState) {
      handleSave(false);
    }
    router.push("/dashboard");
  }, [savedState, router]);

  // Handle step navigation
  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
      // Auto-save on step change
      if (!savedState) {
        handleSave(false);
      }
    } else {
      // On last step, save and go to dashboard
      handleSave(true).then(() => {
        goToDashboard();
      });
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleFinish = () => {
    handleSave(true).then(() => {
      goToDashboard();
    });
  };

  // Render step content based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <ExperienceStep formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <EducationStep formData={formData} updateFormData={updateFormData} />
        );
      case 3:
        return (
          <SkillsLanguagesStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <PassionsSocialStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <div className="space-y-10">
            <section className="resume-section bg-white/70 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="section-heading text-2xl">
                  Customize Your Resume
                </h2>
                <p className="text-gray-600">
                  Choose a color scheme and background pattern for your resume.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Color Scheme</h3>
                  <ColorPicker
                    selectedColor={formData.color || "#3B82F6"}
                    onChange={(color) => updateFormData("color", color)}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Background Pattern
                  </h3>
                  <BackgroundPicker
                    selectedPattern={formData.background || "none"}
                    onChange={(pattern) =>
                      updateFormData("background", pattern)
                    }
                  />
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <BuilderLayout
      header={
        <div className="w-full flex justify-between items-center px-4">
          <Stepper
            steps={steps}
            activeStep={activeStep}
            onStepClick={setActiveStep}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave(true)}
              disabled={saving || savedState}
              className="hidden sm:flex items-center gap-1"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-1"></div>
                  Saving...
                </>
              ) : savedState ? (
                "Saved"
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      }
      preview={<ResumePreview resumeData={formData} />}
      navigation={
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={activeStep === 0}
            className="px-6"
          >
            Previous
          </Button>

          <Button
            variant={activeStep === steps.length - 1 ? "secondary" : "primary"}
            onClick={
              activeStep === steps.length - 1 ? handleFinish : handleNextStep
            }
            className="px-6 bg-gradient-to-r from-primary to-accent"
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      }
    />
  );
};

export default ResumeBuilder;
