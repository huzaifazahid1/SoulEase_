'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HiOutlineUsers, 
  HiOutlineHeart,
  HiOutlineAcademicCap,
  HiOutlineHandHeart,
  HiOutlineSparkles,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineStar
} from 'react-icons/hi2'
import { FiMessageCircle, FiUser, FiHeart, FiZap } from 'react-icons/fi'

/**
 * AI Spiritual Mentor Selection Page
 * 
 * Features:
 * - Three distinct AI mentor personalities
 * - Islamic guidance and wisdom
 * - Real-time chat capabilities
 * - Personalized mentor recommendations
 * - Beautiful mentor cards with previews
 */
export default function MentorPage() {
  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [recentChats, setRecentChats] = useState([])

  // Load user data and check API availability
  useEffect(() => {
    loadUserData()
    checkApiAvailability()
    loadRecentChats()
  }, [])

  /**
   * Load user profile for personalized recommendations
   */
  const loadUserData = () => {
    try {
      const assessment = localStorage.getItem('career_assessment')
      if (assessment) {
        const data = JSON.parse(assessment)
        setUserProfile(data)
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading user data:', error)
      setIsLoading(false)
    }
  }

  /**
   * Check if API is configured
   */
  const checkApiAvailability = async () => {
    try {
      const { isGroqConfigured } = await import('@/lib/ai/groq-client')
      setHasApiKey(isGroqConfigured())
    } catch (error) {
      console.error('Error checking API:', error)
      setHasApiKey(false)
    }
  }

  /**
   * Load recent chat sessions
   */
  const loadRecentChats = () => {
    try {
      const imamChats = JSON.parse(localStorage.getItem('mentor_imam_history') || '[]')
      const sisterChats = JSON.parse(localStorage.getItem('mentor_sister_history') || '[]')
      const brotherChats = JSON.parse(localStorage.getItem('mentor_brother_history') || '[]')
      
      const allChats = [
        ...imamChats.map(chat => ({ ...chat, mentor: 'imam' })),
        ...sisterChats.map(chat => ({ ...chat, mentor: 'sister' })),
        ...brotherChats.map(chat => ({ ...chat, mentor: 'brother' }))
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      
      setRecentChats(allChats.slice(0, 3))
    } catch (error) {
      console.error('Error loading recent chats:', error)
    }
  }

  // Mentor configurations
  const mentors = [
    {
      id: 'imam',
      name: 'Wise Imam',
      title: 'Spiritual Guide & Scholar',
      description: 'Seek wisdom from an AI imam trained in Islamic scholarship, Quran, and Hadith. Get guidance on spiritual matters, religious questions, and life decisions through the lens of Islamic wisdom.',
      personality: 'Wise, patient, and deeply knowledgeable in Islamic teachings',
      specialties: ['Quranic guidance', 'Hadith interpretation', 'Spiritual growth', 'Life decisions', 'Islamic law'],
      icon: HiOutlineAcademicCap,
      gradient: 'from-emerald-600 to-primary-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      route: '/mentor/imam',
      greeting: 'Assalamu Alaikum, my child. I am here to provide guidance rooted in Islamic wisdom.',
      features: [
        'Quranic verse explanations',
        'Hadith-based guidance',
        'Spiritual counseling',
        'Religious Q&A',
        'Life advice through Islam'
      ]
    },
    {
      id: 'sister',
      name: 'Gentle Sister',
      title: 'Compassionate Counselor',
      description: 'Connect with a caring AI sister who understands the unique challenges faced by Muslim women. Get emotional support, practical advice, and sisterly guidance with Islamic wisdom.',
      personality: 'Gentle, empathetic, and understanding of modern Muslim life',
      specialties: ['Emotional support', 'Women\'s issues', 'Family guidance', 'Personal growth', 'Daily struggles'],
      icon: HiOutlineHeart,
      gradient: 'from-pink-600 to-secondary-600',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      textColor: 'text-pink-400',
      route: '/mentor/sister',
      greeting: 'Assalamu Alaikum, sister! I\'m here to listen and support you through anything you\'re facing.',
      features: [
        'Emotional support & listening',
        'Women\'s Islamic perspective',
        'Family relationship advice',
        'Personal development',
        'Daily life guidance'
      ]
    },
    {
      id: 'brother',
      name: 'Friendly Brother',
      title: 'Supportive Companion',
      description: 'Chat with a supportive AI brother who combines Islamic values with practical life advice. Get motivation, accountability, and brotherhood support for your personal and spiritual journey.',
      personality: 'Friendly, motivating, and focused on practical Islamic living',
      specialties: ['Motivation', 'Goal setting', 'Brotherhood', 'Career guidance', 'Personal development'],
      icon: HiOutlineUsers,
      gradient: 'from-blue-600 to-accent-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      route: '/mentor/brother',
      greeting: 'Assalamu Alaikum, brother! Ready to tackle your goals with Islamic wisdom and motivation?',
      features: [
        'Motivational support',
        'Goal achievement help',
        'Islamic brotherhood',
        'Career & life planning',
        'Accountability partnership'
      ]
    }
  ]

  /**
   * Get recommended mentor based on user profile
   */
  const getRecommendedMentor = () => {
    if (!userProfile?.answers) return mentors[0]

    const answers = userProfile.answers
    
    // Simple recommendation logic
    if (answers.ummah_service >= 4 || answers.halal_importance >= 4) {
      return mentors[0] // Imam for high spiritual focus
    } else if (answers.impact_importance >= 4) {
      return mentors[1] // Sister for emotional support focus
    } else {
      return mentors[2] // Brother for practical guidance
    }
  }

  const recommendedMentor = getRecommendedMentor()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your spiritual guides...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <div className="px-6 py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Spiritual Mentors
            </h1>
            <p className="text-white/70 text-lg max-w-3xl mx-auto mb-6">
              Connect with AI mentors trained in Islamic wisdom and modern life guidance. 
              Choose your spiritual companion for personalized support and growth.
            </p>
            
            {/* Status Indicators */}
            <div className="flex justify-center space-x-6">
              <div className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg
                ${hasApiKey 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-amber-500/20 text-amber-400'
                }
              `}>
                <FiZap className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {hasApiKey ? 'AI-Powered' : 'Limited Mode'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-primary-400">
                <HiOutlineSparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Islamic Guidance</span>
              </div>
              <div className="flex items-center space-x-2 text-accent-400">
                <FiHeart className="w-4 h-4" />  {/*HiOutlineHandHeart*/}
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Recommended Mentor */}
        {userProfile && (
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <HiOutlineStar className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
            </div>
            
            <div className="glass-morphism-card rounded-2xl p-6 border-2 border-yellow-500/30 relative overflow-hidden">
              {/* Recommendation Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium border border-yellow-500/30">
                Recommended
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${recommendedMentor.bgColor} rounded-2xl flex items-center justify-center border ${recommendedMentor.borderColor}`}>
                      <recommendedMentor.icon className={`w-8 h-8 ${recommendedMentor.textColor}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{recommendedMentor.name}</h3>
                      <p className={`${recommendedMentor.textColor} font-medium`}>{recommendedMentor.title}</p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-6">{recommendedMentor.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-white/60 text-sm mb-2">Specializes in:</p>
                    <div className="flex flex-wrap gap-2">
                      {recommendedMentor.specialties.slice(0, 3).map((specialty, index) => (
                        <span key={index} className={`px-3 py-1 ${recommendedMentor.bgColor} ${recommendedMentor.textColor} rounded-lg text-sm border ${recommendedMentor.borderColor}`}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link href={recommendedMentor.route}>
                    <button className={`btn-primary bg-gradient-to-r ${recommendedMentor.gradient}`}>
                      <HiOutlineChatBubbleLeftRight className="w-5 h-5 mr-2" />
                      Start Conversation
                    </button>
                  </Link>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-3">Preview Greeting</h4>
                  <div className="bg-white/10 rounded-lg p-4 border-l-4 border-primary-400">
                    <p className="text-white/90 italic">"{recommendedMentor.greeting}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Mentors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Choose Your Spiritual Guide</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <MentorCard 
                key={mentor.id} 
                mentor={mentor} 
                isRecommended={mentor.id === recommendedMentor.id}
                hasApiKey={hasApiKey}
              />
            ))}
          </div>
        </div>

        {/* Recent Conversations */}
        {recentChats.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Conversations</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {recentChats.map((chat, index) => {
                const mentor = mentors.find(m => m.id === chat.mentor)
                return (
                  <Link key={index} href={mentor?.route || '#'}>
                    <div className="glass-morphism-card rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 ${mentor?.bgColor} rounded-lg flex items-center justify-center border ${mentor?.borderColor}`}>
                          {mentor?.icon && <mentor.icon className={`w-5 h-5 ${mentor.textColor}`} />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{mentor?.name}</h4>
                          <p className="text-white/60 text-sm">
                            {new Date(chat.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {chat.content?.substring(0, 80)}...
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Features Overview */}
        <div className="glass-morphism-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            What Makes Our AI Mentors Special
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: HiOutlineBookOpen,
                title: 'Islamic Foundation',
                description: 'Trained on Quran, Hadith, and Islamic scholarship'
              },
              {
                icon: HiOutlineHeart,
                title: 'Emotional Intelligence',
                description: 'Understanding and empathetic responses'
              },
              {
                icon: HiOutlineLightBulb,
                title: 'Practical Wisdom',
                description: 'Modern solutions with traditional values'
              },
              {
                icon: HiOutlineSparkles,
                title: 'Personalized',
                description: 'Adapts to your unique situation and needs'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Individual Mentor Card Component
 */
function MentorCard({ mentor, isRecommended, hasApiKey }) {
  return (
    <div className={`
      glass-morphism-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 relative
      ${isRecommended ? 'ring-2 ring-yellow-500/50' : ''}
    `}>
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
          <HiOutlineStar className="w-4 h-4 text-white" />
        </div>
      )}
      
      {/* Mentor Avatar */}
      <div className={`w-20 h-20 bg-gradient-to-br ${mentor.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 border ${mentor.borderColor}`}>
        <mentor.icon className={`w-10 h-10 ${mentor.textColor}`} />
      </div>
      
      {/* Mentor Info */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{mentor.name}</h3>
        <p className={`${mentor.textColor} font-medium mb-3`}>{mentor.title}</p>
        <p className="text-white/70 text-sm mb-4">{mentor.personality}</p>
      </div>
      
      {/* Specialties */}
      <div className="mb-6">
        <p className="text-white/60 text-sm mb-3">Key Features:</p>
        <div className="space-y-2">
          {mentor.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
              <span className="text-white/80 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Action Button */}
      <Link href={mentor.route}>
        <button className={`
          w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2
          ${hasApiKey
            ? `bg-gradient-to-r ${mentor.gradient} text-white hover:scale-105 shadow-lg`
            : 'bg-white/10 text-white/70 hover:bg-white/20'
          }
        `}>
          <FiMessageCircle className="w-4 h-4" />
          <span>{hasApiKey ? 'Start Chat' : 'Preview (Demo)'}</span>
        </button>
      </Link>
      
      {/* Status Indicator */}
      <div className="mt-4 text-center">
        <div className={`
          inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-xs
          ${hasApiKey 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-amber-500/20 text-amber-400'
          }
        `}>
          <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span>{hasApiKey ? 'AI Powered' : 'Sample Mode'}</span>
        </div>
      </div>
    </div>
  )
}