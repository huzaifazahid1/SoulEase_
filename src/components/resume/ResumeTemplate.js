import React, { forwardRef } from "react";
//import ResumeHeader from "./ResumeHeader";
import ContactInfo from "./ContactInfo";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import LanguagesSection from "./LanguagesSection";
import PassionsSection from "./PassionsSection";
import SocialSection from "./SocialSection";

// Create a placeholder for ResumeHeader if it doesn't exist
const ResumeHeader = ({ personal, color, modern }) => {
  return (
    <div className={`p-6 ${modern ? "flex items-start gap-6" : ""}`}>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-1" style={{ color }}>
          {personal?.fullName || "Full Name"}
        </h1>
        <h2 className="text-xl text-gray-600 mb-3">
          {personal?.jobTitle || "Professional Title"}
        </h2>
        <p className="text-sm text-gray-600 leading-normal">
          {personal?.profileSummary ||
            "Professional profile summary will appear here. Add your career highlights and key skills to make a great first impression."}
        </p>
      </div>

      {personal?.avatar && (
        <div
          className={`${
            modern ? "w-24 h-24" : "w-20 h-20 mt-4"
          } rounded-full overflow-hidden border-2`}
          style={{ borderColor: color }}
        >
          <img
            src={personal.avatar}
            alt={personal.fullName || "Profile"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

const ResumeTemplate = forwardRef(({ resumeData }, ref) => {
  const {
    personal = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    passions = [],
    social = [],
    color = "#546ED6", // Default blue from template
    background = "none",
    template = "classic",
  } = resumeData || {};

  const renderBackgroundPattern = () => {
    switch (background) {
      case "dots":
        return {
          backgroundImage: `radial-gradient(circle, ${color}10 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        };
      case "lines":
        return {
          backgroundImage: `linear-gradient(0deg, transparent 24px, ${color}08 25px)`,
          backgroundSize: "25px 25px",
        };
      case "grid":
        return {
          backgroundImage: `linear-gradient(${color}08 1px, transparent 1px), linear-gradient(90deg, ${color}08 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        };
      case "diagonal-lines":
        return {
          backgroundImage: `linear-gradient(45deg, ${color}10 0%, ${color}10 25%, transparent 25%, transparent 100%)`,
          backgroundSize: "10px 10px",
        };
      case "checkered":
        return {
          backgroundImage: `linear-gradient(45deg, ${color}08 25%, transparent 25%, transparent 75%, ${color}08 75%, ${color}08), 
             linear-gradient(45deg, ${color}08 25%, transparent 25%, transparent 75%, ${color}08 75%, ${color}08)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        };
      case "zigzag":
        return {
          backgroundImage: `linear-gradient(135deg, ${color}10 25%, transparent 25%) 50px 0,
             linear-gradient(225deg, ${color}10 25%, transparent 25%) 50px 0,
             linear-gradient(315deg, ${color}10 25%, transparent 25%),
             linear-gradient(45deg, ${color}10 25%, transparent 25%)`,
          backgroundSize: "30px 30px",
        };
      case "waves":
        return {
          backgroundImage: `radial-gradient(ellipse at 50% 50%, ${color}08 0%, transparent 70%)`,
          backgroundSize: "30px 30px",
        };
      default:
        return {};
    }
  };

  // Determine template layout based on the selected template
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return (
          <>
            {/* Header with photo, name and profile */}
            <div className="bg-white shadow-sm relative z-10">
              <ResumeHeader personal={personal} color={color} modern={true} />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Left Sidebar */}
              <div className="md:col-span-1 bg-gray-50 p-6">
                <ContactInfo
                  email={personal.email}
                  phone={personal.phone}
                  location={personal.location}
                  color={color}
                />
                <LanguagesSection languages={languages} color={color} />
                <SkillsSection skills={skills} color={color} />
                <PassionsSection passions={passions} color={color} compact />
              </div>

              {/* Main Content */}
              <div className="md:col-span-2 p-6">
                <ExperienceSection experience={experience} color={color} />
                <EducationSection education={education} color={color} />
                <SocialSection social={social} color={color} />
              </div>
            </div>
          </>
        );

      case "classic":
      default:
        return (
          <>
            {/* Header with photo, name and profile */}
            <div
              className="p-6 text-white"
              style={{
                background: `linear-gradient(to right, ${color}, ${adjustColor(
                  color,
                  20
                )})`,
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
            >
              <ResumeHeader personal={personal} color="#fff" />
            </div>

            {/* Contact Information */}
            <ContactInfo
              email={personal.email}
              phone={personal.phone}
              location={personal.location}
              color={color}
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Left Column (Experience, Education) */}
              <div className="md:col-span-7 p-6 border-r border-gray-200">
                <ExperienceSection experience={experience} color={color} />
                <EducationSection education={education} color={color} />
              </div>

              {/* Right Column (Languages, Skills, Passions, Social) */}
              <div className="md:col-span-5 p-6">
                <LanguagesSection languages={languages} color={color} />
                <SkillsSection skills={skills} color={color} />
                <PassionsSection passions={passions} color={color} />
                <SocialSection social={social} color={color} />
              </div>
            </div>
          </>
        );
    }
  };

  // Helper function to adjust color brightness
  function adjustColor(color, amount) {
    return (
      "#" +
      color.replace(/^#/, "").replace(/../g, (color) => {
        const colorNum = parseInt(color, 16);
        const newColorNum = Math.min(Math.max(0, colorNum + amount), 255);
        return newColorNum.toString(16).padStart(2, "0");
      })
    );
  }

  return (
    <div
      ref={ref}
      className="w-full bg-white text-gray-800 shadow-xl rounded-lg overflow-hidden print:shadow-none"
      style={{
        ...renderBackgroundPattern(),
        minHeight: "1100px", // A4 height in pixels at 96 DPI
        width: "100%",
        maxWidth: "612px", // A4 width in pixels at 72 DPI
      }}
    >
      {renderTemplate()}
    </div>
  );
});

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
