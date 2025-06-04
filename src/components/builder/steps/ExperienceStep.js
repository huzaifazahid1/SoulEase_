import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const ExperienceStep = ({ formData, updateFormData }) => {
  const handleChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    updateFormData("experience", updatedExperience);
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    updateFormData("experience", [
      ...(formData.experience || []),
      newExperience,
    ]);
  };

  const removeExperience = (index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    updateFormData("experience", updatedExperience);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <p className="text-gray-600 mb-6">
        Add your work experience, starting with the most recent position.
      </p>

      <AnimatePresence>
        {formData.experience?.map((exp, index) => (
          <motion.div
            key={exp.id || index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-6 border border-gray-200 rounded-lg relative"
          >
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              aria-label="Remove experience"
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>

            <h3 className="text-lg font-medium mb-4">Experience {index + 1}</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id={`job-title-${index}`}
                  label="Job Title"
                  placeholder="Software Engineer"
                  value={exp.title || ""}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                />

                <Input
                  id={`company-${index}`}
                  label="Company"
                  placeholder="ABC Corporation"
                  value={exp.company || ""}
                  onChange={(e) =>
                    handleChange(index, "company", e.target.value)
                  }
                />
              </div>

              <Input
                id={`location-${index}`}
                label="Location"
                placeholder="City, Country"
                value={exp.location || ""}
                onChange={(e) =>
                  handleChange(index, "location", e.target.value)
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id={`start-date-${index}`}
                  label="Start Date"
                  placeholder="Jan 2020"
                  value={exp.startDate || ""}
                  onChange={(e) =>
                    handleChange(index, "startDate", e.target.value)
                  }
                />

                <Input
                  id={`end-date-${index}`}
                  label="End Date"
                  placeholder="Present"
                  value={exp.endDate || ""}
                  onChange={(e) =>
                    handleChange(index, "endDate", e.target.value)
                  }
                />
              </div>

              <div>
                <label htmlFor={`description-${index}`} className="label">
                  Description
                </label>
                <textarea
                  id={`description-${index}`}
                  rows="3"
                  className="input resize-none"
                  placeholder="Describe your responsibilities and achievements..."
                  value={exp.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        onClick={addExperience}
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
        Add Work Experience
      </Button>
    </motion.div>
  );
};

export default ExperienceStep;
