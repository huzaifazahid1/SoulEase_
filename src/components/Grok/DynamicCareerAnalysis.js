'use client'

import { useState, useEffect } from 'react'
import { 
  HiOutlineSparkles, 
  HiOutlineChartBarSquare,
  HiOutlineLightBulb,
  HiOutlineExclamationTriangle,
  HiOutlineHandHeart
} from 'react-icons/hi2'
import { FiLoader, FiRefreshCw, FiMessageCircle } from 'react-icons/fi'

/**
 * Dynamic Career Analysis Component
 * 
 * Provides real-time AI analysis for specific careers
 * Fetches compatibility scores, match reasons, and Islamic perspectives
 */
export default function DynamicCareerAnalysis({ 
  careerTitle, 
  userAssessment, 
  onAnalysisComplete,
  className = '' 
}) {
  // State management
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)
  const [hasApiKey, setHasApiKey] = useState(false)

  // Check API configuration on mount
  useEffect(() => {
    checkApiConfiguration()
  }, [])

  /**
   * Check if API is configured
   */
  const checkApiConfiguration = async () => {
    try {
      const { isGroqConfigured } = await import('@/lib/ai/groq-client')
      setHasApiKey(isGroqConfigured())
    } catch (error) {
      console.error('Error checking API configuration:', error)
      setHasApiKey(false)
    }
  }

  /**
   * Analyze career compatibility using AI
   */
  const analyzeCareer = async () => {
    if (!careerTitle || !userAssessment) {
      setError('Missing career title or assessment data')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const { groqClient, isGroqConfigured } = await import('@/lib/ai/groq-client')

      if (!isGroqConfigured()) {
        setError('Groq API not configured. Please set up your API key.')
        setIsAnalyzing(false)
        return
      }

      // Perform AI analysis
      const result = await groqClient.analyzeCareerCompatibility(userAssessment, careerTitle)
      
      // Enhance result with additional metadata
      const enhancedAnalysis = {
        ...result,
        careerTitle,
        analyzedDate: new Date().toISOString(),
        analysisId: generateAnalysisId(careerTitle, userAssessment)
      }

      setAnalysis(enhancedAnalysis)
      
      // Cache the analysis
      cacheAnalysis(careerTitle, enhancedAnalysis)
      
      // Notify parent component
      if (onAnalysisComplete) {
        onAnalysisComplete(enhancedAnalysis)
      }

    } catch (error) {
      console.error('Error analyzing career:', error)
      setError(`Analysis failed: ${error.message}`)
    }

    setIsAnalyzing(false)
  }

  /**
   * Load cached analysis if available
   */
  const loadCachedAnalysis = () => {
    try {
      const cacheKey = `career_analysis_${careerTitle.replace(/\s+/g, '_').toLowerCase()}`
      const cached = localStorage.getItem(cacheKey)
      
      if (cached) {
        const cachedAnalysis = JSON.parse(cached)
        
        // Check if cache is less than 24 hours old
        const cacheAge = Date.now() - new Date(cachedAnalysis.analyzedDate).getTime()
        const maxAge = 24 * 60 * 60 * 1000 // 24 hours
        
        if (cacheAge < maxAge) {
          setAnalysis(cachedAnalysis)
          return true
        }
      }
    } catch (error) {
      console.error('Error loading cached analysis:', error)
    }
    
    return false
  }

  /**
   * Cache analysis result
   */
  const cacheAnalysis = (career, analysisData) => {
    try {
      const cacheKey = `career_analysis_${career.replace(/\s+/g, '_').toLowerCase()}`
      localStorage.setItem(cacheKey, JSON.stringify(analysisData))
    } catch (error) {
      console.error('Error caching analysis:', error)
    }
  }

  /**
   * Generate unique analysis ID
   */
  const generateAnalysisId = (career, assessment) => {
    const combined = career + JSON.stringify(assessment)
    return btoa(combined).slice(0, 12) + Date.now().toString(36)
  }

  /**
   * Start analysis (check cache first)
   */
  const startAnalysis = () => {
    if (!loadCachedAnalysis()) {
      analyzeCareer()
    }
  }

  // Auto-start analysis if data is available
  useEffect(() => {
    if (careerTitle && userAssessment && hasApiKey && !analysis) {
      startAnalysis()
    }
  }, [careerTitle, userAssessment, hasApiKey])

  if (!hasApiKey) {
    return (
      <div className={`glass-morphism-card rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <HiOutlineExclamationTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">AI Analysis Unavailable</h3>
          <p className="text-white/60 text-sm mb-4">
            Configure your Grok API key to get personalized career analysis
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Check Configuration
          </button>
        </div>
      </div>
    )
  }

  if (isAnalyzing) {
    return (
      <div className={`glass-morphism-card rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin opacity-20" />
            <div className="absolute inset-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-pulse" />
            <FiLoader className="absolute inset-0 w-6 h-6 text-white animate-spin m-auto" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Analyzing Career Match</h3>
          <p className="text-white/60 text-sm mb-4">
            AI is evaluating {careerTitle} compatibility...
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`glass-morphism-card rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <HiOutlineExclamationTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Analysis Failed</h3>
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <button 
            onClick={analyzeCareer}
            className="btn-secondary"
          >
            <FiRefreshCw className="w-4 h-4 mr-2" />
            Retry Analysis
          </button>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className={`glass-morphism-card rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <HiOutlineChartBarSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Ready for Analysis</h3>
          <p className="text-white/60 text-sm mb-4">
            Get AI-powered insights about {careerTitle}
          </p>
          <button 
            onClick={startAnalysis}
            className="btn-primary"
          >
            <HiOutlineSparkles className="w-4 h-4 mr-2" />
            Analyze Career
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`glass-morphism-card rounded-xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
            <HiOutlineSparkles className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Career Analysis</h3>
            <p className="text-white/60 text-sm">{careerTitle}</p>
          </div>
        </div>
        <button 
          onClick={analyzeCareer}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          title="Refresh Analysis"
        >
          <FiRefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Compatibility Score */}
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/10"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysis.compatibility / 100)}`}
              className="text-primary-400 transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{analysis.compatibility}%</span>
          </div>
        </div>
        <p className="text-white/60 text-sm">Compatibility Score</p>
      </div>

      {/* Match Reasons */}
      {analysis.matchReasons && analysis.matchReasons.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3 flex items-center">
            <HiOutlineLightBulb className="w-4 h-4 mr-2 text-yellow-400" />
            Why This Career Matches You
          </h4>
          <div className="space-y-2">
            {analysis.matchReasons.map((reason, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-white/80 text-sm">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Islamic Perspective */}
      {analysis.islamicPerspective && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <HiOutlineHandHeart className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-emerald-400">Islamic Perspective</span>
            {/* Handle both string and object formats for islamicPerspective */}
            {typeof analysis.islamicPerspective === 'string' ? (
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                Islamic Values
              </span>
            ) : analysis.islamicPerspective?.alignment ? (
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                {analysis.islamicPerspective.alignment} Alignment
              </span>
            ) : null}
          </div>
          {/* Display Islamic perspective content */}
          {typeof analysis.islamicPerspective === 'string' ? (
            <p className="text-white/80 text-sm mb-2">{analysis.islamicPerspective}</p>
          ) : analysis.islamicPerspective?.description ? (
            <>
              <p className="text-white/80 text-sm mb-2">{analysis.islamicPerspective.description}</p>
              {analysis.islamicPerspective.considerations && (
                <p className="text-emerald-300 text-xs italic">{analysis.islamicPerspective.considerations}</p>
              )}
            </>
          ) : (
            <p className="text-white/80 text-sm mb-2">Islamic perspective not available</p>
          )}
        </div>
      )}

      {/* Challenges */}
      {analysis.challenges && analysis.challenges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3 flex items-center">
            <HiOutlineExclamationTriangle className="w-4 h-4 mr-2 text-amber-400" />
            Areas for Development
          </h4>
          <div className="space-y-2">
            {analysis.challenges.map((challenge, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2" />
                <span className="text-white/70 text-sm">{challenge}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {analysis.nextSteps && analysis.nextSteps.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">Recommended Next Steps</h4>
          <div className="space-y-2">
            {analysis.nextSteps.slice(0, 3).map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-accent-500/20 text-accent-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-white/80 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Metadata */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-white/40">
          <div className="flex items-center space-x-2">
            <FiMessageCircle className="w-3 h-3" />
            <span>AI Analysis</span>
          </div>
          <span>
            {new Date(analysis.analyzedDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}