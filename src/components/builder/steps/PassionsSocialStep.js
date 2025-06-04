import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const PassionsSocialStep = ({ formData, updateFormData }) => {
  // Passions handlers
  const handlePassionChange = (index, field, value) => {
    const updatedPassions = [...formData.passions];
    updatedPassions[index] = {
      ...updatedPassions[index],
      [field]: value,
    };
    updateFormData("passions", updatedPassions);
  };

  const addPassion = () => {
    const newPassion = {
      id: Date.now().toString(),
      name: "",
      icon: "default", // Default icon
    };
    updateFormData("passions", [...(formData.passions || []), newPassion]);
  };

  const removePassion = (index) => {
    const updatedPassions = [...formData.passions];
    updatedPassions.splice(index, 1);
    updateFormData("passions", updatedPassions);
  };

  // Social handlers
  const handleSocialChange = (index, field, value) => {
    const updatedSocial = [...formData.social];
    updatedSocial[index] = {
      ...updatedSocial[index],
      [field]: value,
    };
    updateFormData("social", updatedSocial);
  };

  const addSocial = () => {
    const newSocial = {
      id: Date.now().toString(),
      name: "",
      url: "",
      icon: "default", // Default icon
    };
    updateFormData("social", [...(formData.social || []), newSocial]);
  };

  const removeSocial = (index) => {
    const updatedSocial = [...formData.social];
    updatedSocial.splice(index, 1);
    updateFormData("social", updatedSocial);
  };

  // Available icon options for passions
  const passionIconOptions = [
    { value: "default", label: "Default" },
    { value: "pencil", label: "Art / Drawing" },
    { value: "camera", label: "Photography" },
    { value: "film", label: "Movies" },
    { value: "sport", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "gym", label: "Fitness" },
    { value: "travel", label: "Travel" },
    { value: "book", label: "Reading" },
    { value: "code", label: "Coding" },
  ];

  // Available icon options for social
  const socialIconOptions = [
    { value: "default", label: "Default" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "github", label: "GitHub" },
    { value: "youtube", label: "YouTube" },
    { value: "medium", label: "Medium" },
    { value: "behance", label: "Behance" },
    { value: "dribbble", label: "Dribbble" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Passions Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Interests & Passions</h2>
        <p className="text-gray-600 mb-6">
          Add your personal interests and passions to show more about yourself.
        </p>

        <AnimatePresence>
          {formData.passions?.map((passion, index) => (
            <motion.div
              key={passion.id || index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-6 p-4 border border-gray-200 rounded-lg relative"
            >
              <button
                type="button"
                onClick={() => removePassion(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                aria-label="Remove passion"
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
                  id={`passion-name-${index}`}
                  label="Interest/Passion"
                  placeholder="Photography"
                  value={passion.name || ""}
                  onChange={(e) =>
                    handlePassionChange(index, "name", e.target.value)
                  }
                />

                <div>
                  <label htmlFor={`passion-icon-${index}`} className="label">
                    Icon
                  </label>
                  <select
                    id={`passion-icon-${index}`}
                    className="input"
                    value={passion.icon || "default"}
                    onChange={(e) =>
                      handlePassionChange(index, "icon", e.target.value)
                    }
                  >
                    {passionIconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="outline"
          onClick={addPassion}
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
          Add Interest/Passion
        </Button>
      </section>

      {/* Social Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Social Links</h2>
        <p className="text-gray-600 mb-6">
          Add your social media profiles and online presence.
        </p>

        <AnimatePresence>
          {formData.social?.map((social, index) => (
            <motion.div
              key={social.id || index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-6 p-4 border border-gray-200 rounded-lg relative"
            >
              <button
                type="button"
                onClick={() => removeSocial(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                aria-label="Remove social link"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id={`social-name-${index}`}
                    label="Platform Name"
                    placeholder="LinkedIn"
                    value={social.name || ""}
                    onChange={(e) =>
                      handleSocialChange(index, "name", e.target.value)
                    }
                  />

                  <div>
                    <label htmlFor={`social-icon-${index}`} className="label">
                      Icon
                    </label>
                    <select
                      id={`social-icon-${index}`}
                      className="input"
                      value={social.icon || "default"}
                      onChange={(e) =>
                        handleSocialChange(index, "icon", e.target.value)
                      }
                    >
                      {socialIconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Input
                  id={`social-url-${index}`}
                  label="URL"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={social.url || ""}
                  onChange={(e) =>
                    handleSocialChange(index, "url", e.target.value)
                  }
                  prefixIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                      />
                    </svg>
                  }
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="outline"
          onClick={addSocial}
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
          Add Social Link
        </Button>
      </section>
    </motion.div>
  );
};

export default PassionsSocialStep;
