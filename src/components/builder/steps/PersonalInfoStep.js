import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiUpload,
  FiX,
} from "react-icons/fi";
import Input from "../../ui/Input";

const PersonalInfoStep = ({ formData, updateFormData }) => {
  const [avatarPreview, setAvatarPreview] = useState(
    formData.personal?.avatar || null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("personal", { ...formData.personal, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      updateFormData("personal", {
        ...formData.personal,
        avatar: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    updateFormData("personal", { ...formData.personal, avatar: "" });
  };

  return (
    <div className="resume-section bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-border">
      <div className="border-b border-border pb-4 mb-6">
        <h2 className="section-heading text-2xl">
          <FiUser className="text-primary" />
          Personal Information
        </h2>
        <p className="text-muted-foreground">
          Start building your professional resume by filling out your personal
          details below.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col items-center justify-center mb-6 sm:flex-row sm:justify-start sm:space-x-6">
          <div className="relative mb-4 sm:mb-0">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-2 border-primary/30 shadow-md">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="w-12 h-12 text-primary/60" />
              )}
            </div>
            {avatarPreview && (
              <button
                onClick={removeAvatar}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors transform hover:scale-110"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-col">
            <label className="label mb-2 font-medium text-foreground">
              Profile Photo
            </label>
            <label className="cursor-pointer text-center flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 border border-primary/30 text-primary py-2.5 px-4 rounded-lg shadow-sm transition-all duration-300">
              <FiUpload className="text-primary" />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            <p className="text-xs text-muted-foreground mt-2">
              Recommended: Square JPG or PNG, at least 300x300 pixels
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <Input
              id="fullName"
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
              value={formData.personal?.fullName || ""}
              onChange={handleChange}
              prefixIcon={<FiUser className="text-primary" />}
            />
          </div>

          <div className="form-group">
            <Input
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              placeholder="UX/UI Designer"
              value={formData.personal?.jobTitle || ""}
              onChange={handleChange}
              prefixIcon={<FiBriefcase className="text-primary" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="john@example.com"
              value={formData.personal?.email || ""}
              onChange={handleChange}
              prefixIcon={<FiMail className="text-primary" />}
            />
          </div>

          <div className="form-group">
            <Input
              id="phone"
              name="phone"
              label="Phone"
              placeholder="+1 234 567 890"
              value={formData.personal?.phone || ""}
              onChange={handleChange}
              prefixIcon={<FiPhone className="text-primary" />}
            />
          </div>
        </div>

        <div className="form-group">
          <Input
            id="location"
            name="location"
            label="Location"
            placeholder="City, Country"
            value={formData.personal?.location || ""}
            onChange={handleChange}
            prefixIcon={<FiMapPin className="text-primary" />}
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="profileSummary"
            className="label flex items-center gap-2 font-medium text-foreground mb-1.5"
          >
            <span>Profile Summary</span>
            <span className="text-xs text-muted-foreground">
              (Recommended: 150-200 characters)
            </span>
          </label>
          <div className="relative">
            <textarea
              id="profileSummary"
              name="profileSummary"
              rows="4"
              className="input bg-card text-foreground resize-none transition-all duration-300 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg w-full p-3"
              placeholder="Write a brief summary about yourself and your professional experience..."
              value={formData.personal?.profileSummary || ""}
              onChange={handleChange}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Your profile summary should highlight your key strengths,
            experience, and career objectives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
