// data/careerData.js
// Fallback data structure for Career Advisor module

export const assessmentQuestions = [
    {
      id: 1,
      category: "interests",
      question: "What type of activities energize you the most?",
      type: "single",
      options: [
        { id: "a", text: "Solving complex problems and analyzing data", value: "analytical" },
        { id: "b", text: "Creating and designing new things", value: "creative" },
        { id: "c", text: "Helping and mentoring others", value: "people-focused" },
        { id: "d", text: "Leading teams and making strategic decisions", value: "leadership" }
      ]
    },
    {
      id: 2,
      category: "work_style",
      question: "Which work environment suits you best?",
      type: "single",
      options: [
        { id: "a", text: "Quiet, focused spaces with minimal distractions", value: "independent" },
        { id: "b", text: "Collaborative, open spaces with team interaction", value: "collaborative" },
        { id: "c", text: "Dynamic environments with variety and travel", value: "dynamic" },
        { id: "d", text: "Structured, organized environments with clear processes", value: "structured" }
      ]
    },
    {
      id: 3,
      category: "strengths",
      question: "What are your strongest natural abilities?",
      type: "multiple",
      maxSelections: 3,
      options: [
        { id: "a", text: "Critical thinking and problem-solving", value: "analytical" },
        { id: "b", text: "Communication and presentation skills", value: "communication" },
        { id: "c", text: "Creativity and artistic vision", value: "creative" },
        { id: "d", text: "Technical and computer skills", value: "technical" },
        { id: "e", text: "Organization and attention to detail", value: "organizational" },
        { id: "f", text: "Empathy and emotional intelligence", value: "emotional" }
      ]
    },
    {
      id: 4,
      category: "values",
      question: "What matters most to you in your career?",
      type: "single",
      options: [
        { id: "a", text: "Making a positive impact on society", value: "impact" },
        { id: "b", text: "Financial success and stability", value: "financial" },
        { id: "c", text: "Work-life balance and flexibility", value: "balance" },
        { id: "d", text: "Recognition and professional growth", value: "growth" }
      ]
    },
    {
      id: 5,
      category: "learning",
      question: "How do you prefer to learn new skills?",
      type: "single",
      options: [
        { id: "a", text: "Hands-on practice and experimentation", value: "practical" },
        { id: "b", text: "Reading, research, and theoretical study", value: "theoretical" },
        { id: "c", text: "Learning from mentors and experts", value: "mentorship" },
        { id: "d", text: "Collaborative learning with peers", value: "collaborative" }
      ]
    }
  ];
  
  export const careerRecommendations = [
    {
      id: 1,
      title: "Software Engineer",
      category: "Technology",
      match: 95,
      description: "Design and develop software solutions that power the digital world.",
      keySkills: ["Programming", "Problem Solving", "Logical Thinking", "Innovation"],
      averageSalary: "$85,000 - $150,000",
      growthOutlook: "22% growth expected",
      workStyle: "Remote-friendly, collaborative",
      education: "Bachelor's in Computer Science or related field",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      matchingTraits: ["analytical", "technical", "independent"],
      dailyTasks: [
        "Write and test code for applications",
        "Collaborate with design and product teams",
        "Debug and optimize software performance",
        "Stay updated with latest technologies"
      ],
      pros: [
        "High earning potential",
        "Remote work opportunities",
        "Continuous learning",
        "Creative problem solving"
      ],
      cons: [
        "Can be stressful with tight deadlines",
        "Requires constant skill updates",
        "Long hours during project releases"
      ]
    },
    {
      id: 2,
      title: "UX/UI Designer",
      category: "Design",
      match: 88,
      description: "Create intuitive and beautiful digital experiences that users love.",
      keySkills: ["Design Thinking", "User Research", "Prototyping", "Visual Design"],
      averageSalary: "$65,000 - $120,000",
      growthOutlook: "13% growth expected",
      workStyle: "Creative, user-focused",
      education: "Bachelor's in Design, Psychology, or related field",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      matchingTraits: ["creative", "people-focused", "collaborative"],
      dailyTasks: [
        "Research user needs and behaviors",
        "Create wireframes and prototypes",
        "Design visual interfaces",
        "Test designs with real users"
      ],
      pros: [
        "High creative satisfaction",
        "Direct impact on user experience",
        "Growing field with opportunities",
        "Mix of art and science"
      ],
      cons: [
        "Subjective feedback can be challenging",
        "Need to balance aesthetics with functionality",
        "Tight project deadlines"
      ]
    },
    {
      id: 3,
      title: "Data Scientist",
      category: "Analytics",
      match: 92,
      description: "Turn complex data into actionable insights that drive business decisions.",
      keySkills: ["Statistics", "Machine Learning", "Python/R", "Data Visualization"],
      averageSalary: "$90,000 - $160,000",
      growthOutlook: "31% growth expected",
      workStyle: "Analytical, research-oriented",
      education: "Master's in Data Science, Statistics, or related field",
      icon: "📊",
      color: "from-green-500 to-teal-500",
      matchingTraits: ["analytical", "technical", "independent"],
      dailyTasks: [
        "Collect and clean large datasets",
        "Build predictive models",
        "Create data visualizations",
        "Present findings to stakeholders"
      ],
      pros: [
        "High demand and salary",
        "Intellectually stimulating",
        "Impact on business strategy",
        "Diverse industry applications"
      ],
      cons: [
        "Requires advanced education",
        "Can involve repetitive data cleaning",
        "Complex technical challenges"
      ]
    },
    {
      id: 4,
      title: "Product Manager",
      category: "Management",
      match: 85,
      description: "Guide product development from concept to launch, balancing user needs and business goals.",
      keySkills: ["Strategic Thinking", "Communication", "Leadership", "Market Analysis"],
      averageSalary: "$95,000 - $180,000",
      growthOutlook: "19% growth expected",
      workStyle: "Cross-functional, strategic",
      education: "Bachelor's in Business, Engineering, or related field",
      icon: "🚀",
      color: "from-orange-500 to-red-500",
      matchingTraits: ["leadership", "communication", "analytical"],
      dailyTasks: [
        "Define product roadmaps and strategies",
        "Coordinate with engineering and design teams",
        "Analyze market trends and user feedback",
        "Make data-driven product decisions"
      ],
      pros: [
        "High strategic impact",
        "Excellent career progression",
        "Cross-functional collaboration",
        "Strong earning potential"
      ],
      cons: [
        "High responsibility and pressure",
        "Need to balance competing priorities",
        "Success depends on team performance"
      ]
    },
    {
      id: 5,
      title: "Marketing Specialist",
      category: "Marketing",
      match: 78,
      description: "Create compelling campaigns that connect brands with their target audiences.",
      keySkills: ["Content Creation", "Analytics", "Social Media", "Brand Strategy"],
      averageSalary: "$45,000 - $85,000",
      growthOutlook: "10% growth expected",
      workStyle: "Creative, data-driven",
      education: "Bachelor's in Marketing, Communications, or related field",
      icon: "📱",
      color: "from-pink-500 to-purple-500",
      matchingTraits: ["creative", "communication", "collaborative"],
      dailyTasks: [
        "Develop marketing campaigns",
        "Create content for various channels",
        "Analyze campaign performance",
        "Collaborate with sales and product teams"
      ],
      pros: [
        "Creative and varied work",
        "Direct impact on business growth",
        "Opportunities in many industries",
        "Mix of creativity and analytics"
      ],
      cons: [
        "Results can be unpredictable",
        "Constantly changing digital landscape",
        "Pressure to show ROI"
      ]
    }
  ];
  
  export const sampleIntroCards = [
    {
      id: 1,
      title: "Discover Your Strengths",
      description: "Uncover your natural talents and abilities through our comprehensive assessment.",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Explore Career Paths",
      description: "Get personalized recommendations based on your interests, skills, and values.",
      icon: "🛤️",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Plan Your Journey",
      description: "Create actionable steps to reach your dream career with our guidance tools.",
      icon: "📋",
      color: "from-green-500 to-teal-500"
    }
  ];
  
  // Helper function to calculate career matches based on assessment answers
  export const calculateCareerMatches = (answers) => {
    // Simple matching algorithm - in real app, this would be more sophisticated
    const traits = [];
    
    answers.forEach(answer => {
      if (Array.isArray(answer.value)) {
        traits.push(...answer.value);
      } else {
        traits.push(answer.value);
      }
    });
  
    return careerRecommendations.map(career => {
      const matchCount = career.matchingTraits.filter(trait => 
        traits.includes(trait)
      ).length;
      
      const matchPercentage = Math.max(60, Math.min(98, 
        (matchCount / career.matchingTraits.length) * 100 + Math.random() * 10
      ));
  
      return {
        ...career,
        match: Math.round(matchPercentage)
      };
    }).sort((a, b) => b.match - a.match);
  };