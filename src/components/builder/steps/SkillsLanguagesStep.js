import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const SkillsLanguagesStep = ({ formData, updateFormData }) => {
  // Skills handlers
  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];

    if (field === "level") {
      // Ensure level is within 0-100 range
      value = Math.max(0, Math.min(100, parseInt(value) || 0));
    }

    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };

    updateFormData("skills", updatedSkills);
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
      level: 80, // Default level
    };
    updateFormData("skills", [...(formData.skills || []), newSkill]);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    updateFormData("skills", updatedSkills);
  };

  // Languages handlers
  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.languages];

    if (field === "level") {
      // Ensure level is within 0-100 range
      value = Math.max(0, Math.min(100, parseInt(value) || 0));
    }

    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    };

    updateFormData("languages", updatedLanguages);
  };

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      name: "",
      level: 80, // Default level
    };
    updateFormData("languages", [...(formData.languages || []), newLanguage]);
  };

  const removeLanguage = (index) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages.splice(index, 1);
    updateFormData("languages", updatedLanguages);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <p className="text-gray-600 mb-6">
          Add your professional skills and rate your proficiency level.
        </p>

        <AnimatePresence>
          {formData.skills?.map((skill, index) => (
            <motion.div
              key={skill.id || index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-6 p-4 border border-gray-200 rounded-lg relative"
            >
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                aria-label="Remove skill"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="space-y-3">
                <Input
                  id={`skill-name-${index}`}
                  label="Skill"
                  placeholder="JavaScript"
                  value={skill.name || ""}
                  onChange={(e) =>
                    handleSkillChange(index, "name", e.target.value)
                  }
                />

                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor={`skill-level-${index}`} className="label">
                      Proficiency Level ({skill.level}%)
                    </label>
                  </div>
                  <input
                    id={`skill-level-${index}`}
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level || 80}
                    onChange={(e) =>
                      handleSkillChange(index, "level", e.target.value)
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="outline"
          onClick={addSkill}
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          }
          className="w-full"
        >
          Add Skill
        </Button>
      </section>

      {/* Languages Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Languages</h2>
        <p className="text-gray-600 mb-6">
          Add languages you speak and your proficiency level.
        </p>

        <AnimatePresence>
          {formData.languages?.map((language, index) => (
            <motion.div
              key={language.id || index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-6 p-4 border border-gray-200 rounded-lg relative"
            >
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                aria-label="Remove language"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="space-y-3">
                <Input
                  id={`language-name-${index}`}
                  label="Language"
                  placeholder="English"
                  value={language.name || ""}
                  onChange={(e) =>
                    handleLanguageChange(index, "name", e.target.value)
                  }
                />

                <div>
                  <div className="flex justify-between mb-1">
                    <label
                      htmlFor={`language-level-${index}`}
                      className="label"
                    >
                      Proficiency Level ({language.level}%)
                    </label>
                  </div>
                  <input
                    id={`language-level-${index}`}
                    type="range"
                    min="0"
                    max="100"
                    value={language.level || 80}
                    onChange={(e) =>
                      handleLanguageChange(index, "level", e.target.value)
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Basic</span>
                    <span>Intermediate</span>
                    <span>Fluent</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="outline"
          onClick={addLanguage}
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          }
          className="w-full"
        >
          Add Language
        </Button>
      </section>
    </motion.div>
  );
};

export default SkillsLanguagesStep;
