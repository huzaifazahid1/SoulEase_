'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HiOutlineSparkles, 
  HiOutlineBriefcase, 
  HiOutlineChartBarSquare, 
  HiOutlineBookmark,
  HiOutlineArrowRight,
  HiOutlineClipboardDocumentCheck,
  HiOutlineLightBulb,
  HiOutlineAcademicCap,
  HiOutlineTrophy,
  HiOutlineCog
} from 'react-icons/hi2'
import { FiTrendingUp, FiTarget, FiCompass, FiStar, FiRefreshCw, FiZap } from 'react-icons/fi'
import ApiConfigModal from '@/components/career/ApiConfigModal'

/**
 * Career Advisor Overview Page
 * 
 * Features:
 * - Quick stats and progress tracking
 * - Recent recommendations display
 * - Action cards for next steps
 * - Islamic perspective integration
 * - Data from localStorage
 */
export default function CareerPage() {
  // State management
  const [userProgress, setUserProgress] = useState(null)
  const [recentRecommendations, setRecentRecommendations] = useState([])
  const [careerStats, setCareerStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showApiModal, setShowApiModal] = useState(false)
  const [isAiPowered, setIsAiPowered] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    loadCareerData()
  }, [])

  /**
   * Load user career data from localStorage and check for real-time updates
   */
  const loadCareerData = async () => {
    try {
      // Get assessment progress
      const assessmentData = localStorage.getItem('career_assessment')
      const savedPaths = JSON.parse(localStorage.getItem('saved_career_paths') || '[]')
      const lastAssessment = localStorage.getItem('last_assessment_date')
      const storedRecommendations = localStorage.getItem('career_recommendations')

      // Calculate progress metrics
      const progress = {
        assessmentCompleted: !!assessmentData,
        savedPaths: savedPaths.length,
        lastAssessmentDate: lastAssessment,
        nextMilestone: !assessmentData ? 'Complete Assessment' : 'Explore Paths'
      }

      // Check if we have AI-powered recommendations
      let recommendations = []
      let aiPowered = false

      if (storedRecommendations) {
        recommendations = JSON.parse(storedRecommendations)
        // Check if recommendations have AI metadata
        aiPowered = recommendations.some(rec => rec.generatedDate && rec.assessmentId)
      }

      // If no recommendations but we have assessment, check API availability
      if (!recommendations.length && assessmentData) {
        const { isGroqConfigured } = await import('@/lib/ai/groq-client')
        if (isGroqConfigured()) {
          // Generate fresh AI recommendations
          await generateFreshRecommendations(JSON.parse(assessmentData))
          recommendations = JSON.parse(localStorage.getItem('career_recommendations') || '[]')
          aiPowered = true
        } else {
          // Use mock recommendations
          recommendations = getMockRecommendations()
          aiPowered = false
        }
      }

      // Use top 3 recommendations for overview
      const topRecommendations = recommendations.slice(0, 3)

      // Mock career stats (in real app, would be calculated from actual data)
      const stats = {
        totalExploredPaths: savedPaths.length + recommendations.length,
        compatibilityScore: assessmentData && recommendations.length > 0 
          ? Math.max(...recommendations.map(r => r.compatibility || 0))
          : 0,
        skillsAssessed: assessmentData ? 15 : 0,
        industryMatches: recommendations.length > 0 
          ? new Set(recommendations.map(r => r.industry)).size 
          : 0
      }

      setUserProgress(progress)
      setRecentRecommendations(topRecommendations)
      setCareerStats(stats)
      setIsAiPowered(aiPowered)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading career data:', error)
      setIsLoading(false)
    }
  }

  /**
   * Generate fresh AI recommendations
   */
  const generateFreshRecommendations = async (assessmentData) => {
    try {
      const { groqClient } = await import('@/lib/ai/groq-client')
      const recommendations = await groqClient.generateCareerRecommendations(assessmentData.answers)
      localStorage.setItem('career_recommendations', JSON.stringify(recommendations))
      return recommendations
    } catch (error) {
      console.error('Error generating fresh recommendations:', error)
      return []
    }
  }

  /**
   * Refresh recommendations with new AI analysis
   */
  const refreshRecommendations = async () => {
    setIsRefreshing(true)
    
    try {
      const assessmentData = localStorage.getItem('career_assessment')
      if (!assessmentData) {
        alert('Please complete the assessment first')
        setIsRefreshing(false)
        return
      }

      const { isGroqConfigured } = await import('@/lib/ai/groq-client')
      
      if (!isGroqConfigured()) {
        setShowApiModal(true)
        setIsRefreshing(false)
        return
      }

      // Generate new recommendations
      const recommendations = await generateFreshRecommendations(JSON.parse(assessmentData))
      
      // Update state
      setRecentRecommendations(recommendations.slice(0, 3))
      setIsAiPowered(true)
      
      // Update stats
      const savedPaths = JSON.parse(localStorage.getItem('saved_career_paths') || '[]')
      setCareerStats(prev => ({
        ...prev,
        totalExploredPaths: savedPaths.length + recommendations.length,
        compatibilityScore: recommendations.length > 0 
          ? Math.max(...recommendations.map(r => r.compatibility || 0))
          : 0,
        industryMatches: new Set(recommendations.map(r => r.industry)).size
      }))

      alert(`Successfully generated ${recommendations.length} new AI-powered recommendations!`)
      
    } catch (error) {
      console.error('Error refreshing recommendations:', error)
      alert(`Failed to refresh recommendations: ${error.message}`)
    }
    
    setIsRefreshing(false)
  }

  /**
   * Get mock recommendations as fallback
   */
  const getMockRecommendations = () => [
    {
      id: 1,
      title: 'Software Engineering',
      compatibility: 92,
      reason: 'Perfect match for your analytical skills and creativity',
      islamicPerspective: 'Technology can be used to benefit humanity and serve Allah',
      industry: 'Technology',
      salaryRange: '$70k - $120k',
      growth: 'High'
    },
    {
      id: 2,
      title: 'Data Science',
      compatibility: 88,
      reason: 'Strong alignment with your problem-solving abilities',
      islamicPerspective: 'Using data to find truth and solve real-world problems',
      industry: 'Technology',
      salaryRange: '$80k - $140k',
      growth: 'Very High'
    },
    {
      id: 3,
      title: 'UX/UI Design',
      compatibility: 85,
      reason: 'Great fit for your creative and empathetic nature',
      islamicPerspective: 'Design that serves people and improves their lives',
      industry: 'Design',
      salaryRange: '$60k - $110k',
      growth: 'High'
    }
  ]

  /**
   * Quick action cards configuration
   */
  const actionCards = [
    {
      title: 'Take Assessment',
      description: 'Discover careers that match your skills and interests',
      icon: HiOutlineClipboardDocumentCheck,
      href: '/career/assessment',
      color: 'from-primary-600 to-accent-600',
      isCompleted: userProgress?.assessmentCompleted
    },
    {
      title: 'View Results',
      description: 'See your personalized career recommendations',
      icon: HiOutlineChartBarSquare,
      href: '/career/results',
      color: 'from-secondary-600 to-primary-600',
      disabled: !userProgress?.assessmentCompleted
    },
    {
      title: 'Saved Paths',
      description: 'Review and manage your saved career options',
      icon: HiOutlineBookmark,
      href: '/career/saved',
      color: 'from-accent-600 to-secondary-600',
      badge: userProgress?.savedPaths || 0
    },
    {
      title: 'Islamic Guidance',
      description: 'Learn about careers from an Islamic perspective',
      icon: HiOutlineLightBulb,
      href: '/career/guidance',
      color: 'from-emerald-600 to-primary-600',
      comingSoon: true
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your career insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header Section */}
      <div className="px-6 py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Career Path Advisor
              </h1>
              <p className="text-white/60 text-lg">
                Discover your ideal career with AI-powered insights and Islamic guidance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* AI Status Indicator */}
              <div className={`
                flex items-center space-x-3 px-6 py-3 rounded-xl border
                ${isAiPowered 
                  ? 'glass-morphism border-emerald-500/30 bg-emerald-500/10' 
                  : 'glass-morphism border-amber-500/30 bg-amber-500/10'
                }
              `}>
                {isAiPowered ? (
                  <>
                    <FiZap className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-medium">AI-Powered</span>
                  </>
                ) : (
                  <>
                    <HiOutlineLightBulb className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-400 font-medium">Sample Data</span>
                  </>
                )}
              </div>

              {/* Refresh Button */}
              <button
                onClick={refreshRecommendations}
                disabled={isRefreshing}
                className={`
                  flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${isRefreshing
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-secondary-600 hover:bg-secondary-700 text-white hover:scale-105'
                  }
                `}
              >
                <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden md:block">
                  {isRefreshing ? 'Refreshing...' : 'Refresh AI'}
                </span>
              </button>

              {/* Settings Button */}
              <button
                onClick={() => setShowApiModal(true)}
                className="p-3 glass-morphism rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                title="Configure API Settings"
              >
                <HiOutlineCog className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Compatibility Score',
              value: careerStats?.compatibilityScore || 0,
              suffix: '%',
              icon: FiTarget,
              color: 'text-primary-400'
            },
            {
              label: 'Explored Paths',
              value: careerStats?.totalExploredPaths || 0,
              suffix: '',
              icon: FiCompass,
              color: 'text-accent-400'
            },
            {
              label: 'Skills Assessed',
              value: careerStats?.skillsAssessed || 0,
              suffix: '',
              icon: HiOutlineAcademicCap,
              color: 'text-secondary-400'
            },
            {
              label: 'Industry Matches',
              value: careerStats?.industryMatches || 0,
              suffix: '',
              icon: FiTrendingUp,
              color: 'text-emerald-400'
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.label}
                className="glass-morphism-card rounded-2xl p-6 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color === 'text-primary-400' ? 'from-primary-500/20 to-accent-500/20' : stat.color === 'text-accent-400' ? 'from-accent-500/20 to-secondary-500/20' : stat.color === 'text-secondary-400' ? 'from-secondary-500/20 to-primary-500/20' : 'from-emerald-500/20 to-primary-500/20'}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
            <div className="text-sm text-white/60">
              Next: {userProgress?.nextMilestone}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionCards.map((card, index) => {
              const Icon = card.icon
              const isDisabled = card.disabled || card.comingSoon
              
              return (
                <div key={card.title} className="relative group">
                  {isDisabled ? (
                    <div className="glass-morphism-card rounded-2xl p-6 opacity-50 cursor-not-allowed">
                      <ActionCardContent card={card} Icon={Icon} />
                    </div>
                  ) : (
                    <Link href={card.href}>
                      <div className="glass-morphism-card rounded-2xl p-6 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                        <ActionCardContent card={card} Icon={Icon} />
                      </div>
                    </Link>
                  )}
                  
                  {/* Completion indicator */}
                  {card.isCompleted && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-primary-500 rounded-full flex items-center justify-center">
                      <HiOutlineTrophy className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Badge */}
                  {card.badge && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {card.badge}
                    </div>
                  )}
                  
                  {/* Coming soon overlay */}
                  {card.comingSoon && (
                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                      <span className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-lg text-sm font-medium border border-secondary-500/30">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Recommendations */}
        {recentRecommendations.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Top Recommendations</h2>
              <Link 
                href="/career/results"
                className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                <span>View All</span>
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recentRecommendations.slice(0, 3).map((recommendation, index) => (
                <div 
                  key={recommendation.id}
                  className="glass-morphism-card rounded-2xl p-6 hover:scale-105 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
                        <HiOutlineBriefcase className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{recommendation.title}</h3>
                        <p className="text-xs text-white/60">{recommendation.industry}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <FiStar className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-white">{recommendation.compatibility}%</span>
                      </div>
                      <p className="text-xs text-emerald-400">{recommendation.growth} Growth</p>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <p className="text-white/70 text-sm mb-4">{recommendation.reason}</p>
                  
                  {/* Islamic Perspective */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mb-4">
                    <p className="text-emerald-400 text-xs font-medium mb-1">Islamic Perspective</p>
                    {/* Handle both string and object formats for islamicPerspective */}
                    {typeof recommendation.islamicPerspective === 'string' ? (
                      <p className="text-white/80 text-sm">{recommendation.islamicPerspective}</p>
                    ) : recommendation.islamicPerspective?.description ? (
                      <div>
                        <p className="text-white/80 text-sm mb-2">{recommendation.islamicPerspective.description}</p>
                        {recommendation.islamicPerspective.considerations && (
                          <p className="text-emerald-300 text-xs italic">{recommendation.islamicPerspective.considerations}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-white/80 text-sm">Islamic perspective not available</p>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-white/60 text-sm">{recommendation.salaryRange}</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-primary-600/20 to-accent-600/20 text-primary-400 rounded-lg text-sm font-medium hover:from-primary-600/30 hover:to-accent-600/30 transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Getting Started Section (for new users) */}
        {!userProgress?.assessmentCompleted && (
          <div className="glass-morphism-card rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineSparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Discover Your Perfect Career?
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Take our comprehensive assessment to get personalized recommendations based on your skills, 
              interests, and values - all guided by Islamic principles.
            </p>
            <Link href="/career/assessment">
              <button className="btn-primary">
                Start Assessment
                <HiOutlineArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* API Configuration Modal */}
      <ApiConfigModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSuccess={(useAI = true) => {
          if (useAI) {
            // Refresh with AI recommendations
            refreshRecommendations()
          } else {
            // Keep using sample data
            setIsAiPowered(false)
          }
          setShowApiModal(false)
        }}
      />
    </div>
  )
}

/**
 * Action Card Content Component
 * Reusable content for action cards
 */
function ActionCardContent({ card, Icon }) {
  return (
    <>
      <div className={`w-12 h-12 bg-gradient-to-br ${card.color.replace('from-', 'from-').replace('to-', 'to-').replace('-600', '/20')} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-white mb-2">{card.title}</h3>
      <p className="text-white/60 text-sm">{card.description}</p>
    </>
  )
}