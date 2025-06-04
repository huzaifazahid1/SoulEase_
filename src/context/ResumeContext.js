"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../config/firebase";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const ResumeContext = createContext({});

export const useResume = () => useContext(ResumeContext);

// Available template colors from the design
const templateColors = {
  blue: "#546ED6", // Primary blue from design
  orange: "#FFA94D", // Secondary orange from design
  purple: "#8B5CF6",
  green: "#10B981",
  red: "#EF4444",
  pink: "#EC4899",
  teal: "#06B6D4",
  cyan: "#22D3EE",
};

// Available background patterns
const backgroundPatterns = {
  none: "none",
  dots: "dots",
  lines: "lines",
  grid: "grid",
  diagonalLines: "diagonal-lines",
  checkered: "checkered",
  zigzag: "zigzag",
  waves: "waves",
};

const defaultResumeData = {
  id: null,
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    profileSummary: "",
    avatar: "", // Add avatar URL for profile photo
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  passions: [],
  social: [],
  color: templateColors.blue, // Default color is blue
  background: backgroundPatterns.none,
  template: "classic", // Default template
  createdAt: null,
  updatedAt: null,
};

export const ResumeContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [activeResume, setActiveResume] = useState(null);
  const [userResumes, setUserResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("personal"); // Track current editing step
  const [availableTemplates, setAvailableTemplates] = useState([
    { id: "classic", name: "Classic", premium: false },
    { id: "modern", name: "Modern", premium: false },
    { id: "creative", name: "Creative", premium: true },
    { id: "professional", name: "Professional", premium: true },
  ]);

  // Fetch user's resumes when auth state changes
  useEffect(() => {
    const fetchUserResumes = async () => {
      if (!user) {
        setUserResumes([]);
        return;
      }

      try {
        setLoading(true);
        const q = query(
          collection(db, "resumes"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const resumes = [];
        querySnapshot.forEach((doc) => {
          resumes.push({ id: doc.id, ...doc.data() });
        });

        setUserResumes(resumes);

        // Set active resume to the most recently updated one if available
        if (resumes.length > 0) {
          const sortedResumes = [...resumes].sort((a, b) => {
            return b.updatedAt?.toDate() - a.updatedAt?.toDate();
          });
          setActiveResume(sortedResumes[0].id);
          setResumeData(sortedResumes[0]);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserResumes();
  }, [user]);

  // Create new resume
  const createResume = async (initialData = {}) => {
    if (!user) return null;

    try {
      setLoading(true);
      const resumesRef = collection(db, "resumes");
      const newResumeData = {
        ...defaultResumeData,
        ...initialData,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = doc(resumesRef);
      await setDoc(docRef, newResumeData);

      const resumeWithId = {
        id: docRef.id,
        ...newResumeData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setUserResumes([...userResumes, resumeWithId]);
      setActiveResume(docRef.id);
      setResumeData(resumeWithId);
      setCurrentStep("personal"); // Reset to first step

      return docRef.id;
    } catch (error) {
      console.error("Error creating resume:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get resume by ID
  const getResumeById = async (resumeId) => {
    if (!user || !resumeId) return null;

    try {
      setLoading(true);
      const docRef = doc(db, "resumes", resumeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const resumeData = { id: docSnap.id, ...docSnap.data() };
        setResumeData(resumeData);
        setActiveResume(resumeId);
        return resumeData;
      }

      return null;
    } catch (error) {
      console.error("Error getting resume:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update resume
  const updateResume = async (data, moveToNextStep = false) => {
    if (!user || !activeResume) return false;

    try {
      setLoading(true);
      const docRef = doc(db, "resumes", activeResume);

      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(docRef, updateData);

      const updatedResumeData = {
        ...resumeData,
        ...data,
        updatedAt: new Date(),
      };

      setResumeData(updatedResumeData);

      // Update the resume in the userResumes array
      const updatedResumes = userResumes.map((resume) =>
        resume.id === activeResume ? updatedResumeData : resume
      );

      setUserResumes(updatedResumes);

      // Move to next step if requested
      if (moveToNextStep) {
        const steps = [
          "personal",
          "experience",
          "education",
          "skills",
          "languages",
          "passions",
          "social",
          "template",
        ];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
          setCurrentStep(steps[currentIndex + 1]);
        }
      }

      return true;
    } catch (error) {
      console.error("Error updating resume:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete resume
  const deleteResume = async (resumeId) => {
    if (!user || !resumeId) return false;

    try {
      setLoading(true);
      await deleteDoc(doc(db, "resumes", resumeId));

      const updatedResumes = userResumes.filter(
        (resume) => resume.id !== resumeId
      );
      setUserResumes(updatedResumes);

      // If the deleted resume was the active one, set a new active resume
      if (activeResume === resumeId) {
        if (updatedResumes.length > 0) {
          setActiveResume(updatedResumes[0].id);
          setResumeData(updatedResumes[0]);
        } else {
          setActiveResume(null);
          setResumeData(defaultResumeData);
        }
      }

      return true;
    } catch (error) {
      console.error("Error deleting resume:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        activeResume,
        setActiveResume,
        userResumes,
        createResume,
        getResumeById,
        updateResume,
        deleteResume,
        loading,
        currentStep,
        setCurrentStep,
        availableTemplates,
        templateColors,
        backgroundPatterns,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
