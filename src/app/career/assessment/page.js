'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  HiOutlineSparkles, 
  HiOutlineArrowRight, 
  HiOutlineArrowLeft,
  HiOutlineClipboardDocumentCheck,
  HiOutlineHeart,
  HiOutlineCog,
  HiOutlineBookOpen,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineHandHeart
} from 'react-icons/hi2'
import { FiCheck, FiSave } from 'react-icons/fi'

/**
 * Career Assessment Component
 * 
 * Features:
 * - Multi-step assessment form
 * - Progress tracking
 * - Islamic values integration
 * - Auto-save functionality
 * - Smooth transitions
 * - Comprehensive scoring system
 */
export default function CareerAssessment() {
  const router = useRouter()
  
  // State management
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [autoSaved, setAutoSaved] = useState(false)

  // Assessment steps configuration
  const assessmentSteps = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: HiOutlineUsers,
      description: 'Tell us about yourself'
    },
    {
      id: 'skills',
      title: 'Skills & Abilities',
      icon: HiOutlineCog,
      description: 'What are you good at?'
    },
    {
      id: 'interests',
      title: 'Interests & Passions',
      icon: HiOutlineHeart,
      description: 'What excites you?'
    },
    {
      id: 'values',
      title: 'Work Values',
      icon: HiOutlineBookOpen,
      description: 'What matters to you?'
    },
    {
      id: 'islamic',
      title: 'Islamic Perspective',
      icon: FiSave,  //HiOutlineHandHeart
      description: 'Faith-based considerations'
    },
    {
      id: 'environment',
      title: 'Work Environment',
      icon: HiOutlineGlobeAlt,
      description: 'Your ideal workplace'
    }
  ]

  // Load saved answers on component mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem('career_assessment_draft')
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  // Auto-save answers
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('career_assessment_draft', JSON.stringify(answers))
      setAutoSaved(true)
      setTimeout(() => setAutoSaved(false), 2000)
    }
  }, [answers])

  /**
   * Update answer for a specific question
   */
  const updateAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  /**
   * Navigate to next step
   */
  const nextStep = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  /**
   * Navigate to previous step
   */
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  /**
   * Submit assessment and generate real AI recommendations
   */
  const submitAssessment = async () => {
    setIsLoading(true)
    
    try {
      // Import Groq client
      const { groqClient, isGroqConfigured } = await import('@/lib/ai/groq-client')
      
      // Check if API is configured
      if (!isGroqConfigured()) {
        // Show API key setup modal or fallback to mock data
        const useAI = window.confirm(
          'Groq API is not configured. Would you like to enter your API key for AI-powered recommendations? (Click Cancel to use sample data)'
        )
        
        if (useAI) {
          const apiKey = prompt('Please enter your Groq API key:')
          if (apiKey) {
            groqClient.setApiKey(apiKey)
          } else {
            generateMockRecommendations(answers)
            completeAssessment()
            return
          }
        } else {
          generateMockRecommendations(answers)
          completeAssessment()
          return
        }
      }

      // Generate real AI recommendations
      setIsLoading(true)
      const recommendations = await groqClient.generateCareerRecommendations(answers)
      
      // Save recommendations
      localStorage.setItem('career_recommendations', JSON.stringify(recommendations))
      
      // Complete assessment
      completeAssessment()
      
    } catch (error) {
      console.error('Error generating AI recommendations:', error)
      
      // Show user-friendly error and offer fallback
      const useFallback = window.confirm(
        'Unable to generate AI recommendations. Would you like to use sample recommendations instead?'
      )
      
      if (useFallback) {
        generateMockRecommendations(answers)
        completeAssessment()
      } else {
        setIsLoading(false)
        alert('Please check your internet connection and try again.')
      }
    }
  }

  /**
   * Complete assessment process
   */
  const completeAssessment = () => {
    // Save completed assessment
    const assessmentData = {
      answers,
      completedDate: new Date().toISOString(),
      score: calculateAssessmentScore(answers)
    }
    
    localStorage.setItem('career_assessment', JSON.stringify(assessmentData))
    localStorage.setItem('last_assessment_date', new Date().toISOString())
    
    // Clear draft
    localStorage.removeItem('career_assessment_draft')
    
    // Navigate to results
    router.push('/career/results')
  }

  /**
   * Calculate assessment score based on answers
   */
  const calculateAssessmentScore = (answers) => {
    // Simple scoring algorithm - in real app, this would be more sophisticated
    const totalQuestions = Object.keys(getQuestionsByStep()).reduce((acc, step) => 
      acc + getQuestionsByStep()[step].length, 0
    )
    const answeredQuestions = Object.keys(answers).length
    return Math.round((answeredQuestions / totalQuestions) * 100)
  }

  /**
   * Generate mock career recommendations based on answers
   */
  const generateMockRecommendations = (answers) => {
    const mockRecommendations = [
      {
        id: 1,
        title: 'Software Engineering',
        compatibility: 92,
        description: 'Build innovative solutions that impact millions of users',
        salaryRange: '$70k - $120k',
        growth: 'High',
        islamicAlignment: 'Use technology to benefit society and serve humanity',
        matchReasons: ['Strong analytical skills', 'Creative problem solving', 'Technology interest'],
        nextSteps: ['Learn programming fundamentals', 'Build portfolio projects', 'Network with developers']
      },
      {
        id: 2,
        title: 'Data Science',
        compatibility: 88,
        description: 'Discover insights and patterns in complex data to drive decisions',
        salaryRange: '$80k - $140k',
        growth: 'Very High',
        islamicAlignment: 'Use data to uncover truth and solve real-world problems',
        matchReasons: ['Mathematical aptitude', 'Research mindset', 'Detail-oriented'],
        nextSteps: ['Master statistics & Python', 'Complete data projects', 'Obtain relevant certifications']
      },
      {
        id: 3,
        title: 'UX/UI Design',
        compatibility: 85,
        description: 'Create intuitive and beautiful digital experiences',
        salaryRange: '$60k - $110k',
        growth: 'High',
        islamicAlignment: 'Design with empathy to improve peoples daily lives',
        matchReasons: ['Creative thinking', 'User empathy', 'Visual skills'],
        nextSteps: ['Learn design tools', 'Build design portfolio', 'Study user psychology']
      }
    ]
    
    localStorage.setItem('career_recommendations', JSON.stringify(mockRecommendations))
  }

  /**
   * Get questions for each step
   */
  const getQuestionsByStep = () => ({
    personal: [
      {
        id: 'age_range',
        type: 'select',
        question: 'What is your age range?',
        options: ['16-20', '21-25', '26-30', '31-35', '36-40', '40+']
      },
      {
        id: 'education_level',
        type: 'select',
        question: 'What is your highest level of education?',
        options: ['High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Other']
      },
      {
        id: 'experience_level',
        type: 'select',
        question: 'How much work experience do you have?',
        options: ['No experience', '1-2 years', '3-5 years', '6-10 years', '10+ years']
      }
    ],
    skills: [
      {
        id: 'technical_skills',
        type: 'multiselect',
        question: 'Which technical skills do you have or want to develop?',
        options: ['Programming', 'Data Analysis', 'Design', 'Writing', 'Research', 'Project Management', 'Public Speaking', 'Marketing']
      },
      {
        id: 'soft_skills',
        type: 'multiselect',
        question: 'Which soft skills are your strongest?',
        options: ['Leadership', 'Communication', 'Problem Solving', 'Creativity', 'Teamwork', 'Adaptability', 'Time Management', 'Critical Thinking']
      },
      {
        id: 'learning_preference',
        type: 'select',
        question: 'How do you prefer to learn new things?',
        options: ['Hands-on practice', 'Reading and research', 'Video tutorials', 'Mentorship', 'Group discussions', 'Trial and error']
      }
    ],
    interests: [
      {
        id: 'work_areas',
        type: 'multiselect',
        question: 'Which areas of work interest you most?',
        options: ['Technology', 'Healthcare', 'Education', 'Business', 'Arts & Design', 'Science', 'Social Impact', 'Finance']
      },
      {
        id: 'activities',
        type: 'multiselect',
        question: 'What activities do you enjoy?',
        options: ['Solving puzzles', 'Creating things', 'Helping others', 'Analyzing data', 'Leading teams', 'Teaching', 'Writing', 'Building systems']
      },
      {
        id: 'passion_level',
        type: 'scale',
        question: 'How important is it that your work aligns with your personal passions?',
        min: 1,
        max: 5,
        labels: ['Not important', 'Somewhat important', 'Important', 'Very important', 'Essential']
      }
    ],
    values: [
      {
        id: 'work_values',
        type: 'rank',
        question: 'Rank these work values by importance to you:',
        options: ['High salary', 'Work-life balance', 'Job security', 'Career growth', 'Making a difference', 'Creative freedom', 'Recognition', 'Flexibility']
      },
      {
        id: 'company_size',
        type: 'select',
        question: 'What size company would you prefer to work for?',
        options: ['Startup (1-50 employees)', 'Small (51-200)', 'Medium (201-1000)', 'Large (1000+)', 'No preference']
      },
      {
        id: 'impact_importance',
        type: 'scale',
        question: 'How important is making a positive social impact through your work?',
        min: 1,
        max: 5,
        labels: ['Not important', 'Slightly important', 'Moderately important', 'Very important', 'Essential']
      }
    ],
    islamic: [
      {
        id: 'halal_importance',
        type: 'scale',
        question: 'How important is it that your work is completely halal?',
        min: 1,
        max: 5,
        labels: ['Not important', 'Somewhat important', 'Important', 'Very important', 'Essential']
      },
      {
        id: 'islamic_values',
        type: 'multiselect',
        question: 'Which Islamic values would you like to see in your workplace?',
        options: ['Honesty & integrity', 'Justice & fairness', 'Compassion & mercy', 'Knowledge seeking', 'Community service', 'Environmental stewardship', 'Work-life balance', 'Respect for diversity']
      },
      {
        id: 'ummah_service',
        type: 'scale',
        question: 'How important is serving the Muslim community through your career?',
        min: 1,
        max: 5,
        labels: ['Not important', 'Somewhat important', 'Important', 'Very important', 'Essential']
      }
    ],
    environment: [
      {
        id: 'work_style',
        type: 'select',
        question: 'What work style do you prefer?',
        options: ['Remote work', 'Office-based', 'Hybrid', 'Field work', 'Travel required', 'No preference']
      },
      {
        id: 'collaboration',
        type: 'select',
        question: 'How much collaboration do you prefer?',
        options: ['Work mostly alone', 'Small team collaboration', 'Large team projects', 'Cross-functional work', 'Client-facing roles', 'No preference']
      },
      {
        id: 'schedule_preference',
        type: 'select',
        question: 'What schedule works best for you?',
        options: ['Traditional 9-5', 'Flexible hours', 'Part-time', 'Project-based', 'Shift work', 'Seasonal work']
      }
    ]
  })

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / assessmentSteps.length) * 100

  // Get current step questions
  const currentStepQuestions = getQuestionsByStep()[assessmentSteps[currentStep]?.id] || []

  // Check if current step is complete
  const isStepComplete = currentStepQuestions.every(q => answers[q.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">Processing Your Assessment</h3>
          <p className="text-white/60 mb-4">Our AI is analyzing your responses...</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <div className="px-6 py-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Career Assessment</h1>
              <p className="text-white/60">
                Step {currentStep + 1} of {assessmentSteps.length}: {assessmentSteps[currentStep]?.description}
              </p>
            </div>
            {autoSaved && (
              <div className="flex items-center space-x-2 text-emerald-400">
                <FiSave className="w-4 h-4" />
                <span className="text-sm">Auto-saved</span>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-white/60">Progress</span>
              <span className="text-sm text-primary-400 font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 p-2 glass-morphism rounded-2xl">
            {assessmentSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary-600/30 to-accent-600/30 text-primary-400 border border-primary-500/30'
                      : isCompleted
                      ? 'text-emerald-400 hover:bg-emerald-500/10'
                      : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                    }
                  `}
                >
                  {isCompleted ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="hidden md:block font-medium">{step.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Questions */}
        <div className="glass-morphism-card rounded-2xl p-8">
          <div className="space-y-8">
            {currentStepQuestions.map((question, index) => (
              <QuestionComponent
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={(value) => updateAnswer(question.id, value)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
              ${currentStep === 0
                ? 'opacity-50 cursor-not-allowed text-white/40'
                : 'text-white/70 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep === assessmentSteps.length - 1 ? (
            <button
              onClick={submitAssessment}
              disabled={!isStepComplete}
              className={`
                flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200
                ${isStepComplete
                  ? 'bg-gradient-to-r from-emerald-600 to-primary-600 text-white hover:scale-105 shadow-lg shadow-emerald-600/25'
                  : 'opacity-50 cursor-not-allowed bg-white/10 text-white/40'
                }
              `}
            >
              <HiOutlineClipboardDocumentCheck className="w-5 h-5" />
              <span>Complete Assessment</span>
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isStepComplete}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                ${isStepComplete
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:scale-105'
                  : 'opacity-50 cursor-not-allowed bg-white/10 text-white/40'
                }
              `}
            >
              <span>Next</span>
              <HiOutlineArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Question Component
 * Renders different question types with appropriate UI
 */
function QuestionComponent({ question, value, onChange, index }) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'select':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => onChange(option)}
                className={`
                  p-4 rounded-xl text-left transition-all duration-200 border
                  ${value === option
                    ? 'bg-gradient-to-r from-primary-600/20 to-accent-600/20 border-primary-500/50 text-primary-400'
                    : 'glass-morphism border-white/10 text-white/70 hover:text-white hover:border-white/20'
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        )

      case 'multiselect':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option) => {
              const isSelected = value?.includes(option)
              return (
                <button
                  key={option}
                  onClick={() => {
                    const currentValues = value || []
                    const newValues = isSelected
                      ? currentValues.filter(v => v !== option)
                      : [...currentValues, option]
                    onChange(newValues)
                  }}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-200 border flex items-center space-x-3
                    ${isSelected
                      ? 'bg-gradient-to-r from-primary-600/20 to-accent-600/20 border-primary-500/50 text-primary-400'
                      : 'glass-morphism border-white/10 text-white/70 hover:text-white hover:border-white/20'
                    }
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center
                    ${isSelected ? 'border-primary-400 bg-primary-400' : 'border-white/30'}
                  `}>
                    {isSelected && <FiCheck className="w-3 h-3 text-white" />}
                  </div>
                  <span>{option}</span>
                </button>
              )
            })}
          </div>
        )

      case 'scale':
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              {question.labels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => onChange(i + 1)}
                  className={`
                    flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-200
                    ${value === i + 1
                      ? 'bg-gradient-to-r from-primary-600/20 to-accent-600/20 text-primary-400'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
                    ${value === i + 1 ? 'border-primary-400 bg-primary-400 text-white' : 'border-white/30'}
                  `}>
                    {i + 1}
                  </div>
                  <span className="text-xs text-center max-w-20">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case 'rank':
        // Simplified ranking - would be more sophisticated in real app
        return (
          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={option}
                onClick={() => {
                  const currentRanking = value || []
                  const newRanking = currentRanking.includes(option)
                    ? currentRanking.filter(item => item !== option)
                    : [...currentRanking, option]
                  onChange(newRanking)
                }}
                className={`
                  w-full p-4 rounded-xl text-left transition-all duration-200 border flex items-center justify-between
                  ${value?.includes(option)
                    ? 'bg-gradient-to-r from-primary-600/20 to-accent-600/20 border-primary-500/50 text-primary-400'
                    : 'glass-morphism border-white/10 text-white/70 hover:text-white hover:border-white/20'
                  }
                `}
              >
                <span>{option}</span>
                {value?.includes(option) && (
                  <span className="text-sm bg-primary-400 text-white px-2 py-1 rounded-lg">
                    #{value.indexOf(option) + 1}
                  </span>
                )}
              </button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div 
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <h3 className="text-xl font-semibold text-white mb-6">{question.question}</h3>
      {renderQuestionInput()}
    </div>
  )
}