'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  HiOutlineUsers, 
  HiOutlinePaperAirplane,
  HiOutlineArrowLeft,
  HiOutlineSparkles,
  HiOutlineHandRaised,
  HiOutlineTrophy,
  HiOutlineRocketLaunch,
  HiOutlineTarget,
  HiOutlineLightBulb,
  HiOutlineFire
} from 'react-icons/hi2'
import { FiMessageCircle, FiLoader, FiTarget, FiTrendingUp, FiRefreshCw, FiZap, FiHeart } from 'react-icons/fi'

/**
 * Friendly Brother AI Mentor Chat Page
 * 
 * Features:
 * - Motivational brotherhood support and guidance
 * - Goal-setting and achievement focus
 * - Islamic values with practical life approach
 * - Career and personal development advice
 * - Real-time encouraging AI conversation
 * - Beautiful brother-themed interface with energetic colors
 */
export default function BrotherMentorPage() {
  // State management
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showQuickTopics, setShowQuickTopics] = useState(true)
  const [currentGoal, setCurrentGoal] = useState(null)
  const messagesEndRef = useRef(null)

  // Check API and load chat history on mount
  useEffect(() => {
    checkApiConfiguration()
    loadChatHistory()
    loadCurrentGoal()
  }, [])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
   * Load chat history from localStorage
   */
  const loadChatHistory = () => {
    try {
      const history = localStorage.getItem('mentor_brother_history')
      if (history) {
        const parsedHistory = JSON.parse(history)
        setMessages(parsedHistory.slice(-20)) // Load last 20 messages
        setShowQuickTopics(parsedHistory.length === 0)
      } else {
        // Add welcome message
        const welcomeMessage = {
          id: Date.now(),
          type: 'brother',
          content: "Assalamu Alaikum, brother! 💪 Ready to level up your life with some Islamic wisdom and practical motivation? I'm here to help you crush your goals and grow as a person. What are you working on today?",
          timestamp: new Date().toISOString(),
          energy: 'high'
        }
        setMessages([welcomeMessage])
        setShowQuickTopics(true)
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  /**
   * Load current goal from localStorage
   */
  const loadCurrentGoal = () => {
    try {
      const goal = localStorage.getItem('brother_current_goal')
      if (goal) {
        setCurrentGoal(JSON.parse(goal))
      }
    } catch (error) {
      console.error('Error loading current goal:', error)
    }
  }

  /**
   * Save chat history to localStorage
   */
  const saveChatHistory = (newMessages) => {
    try {
      localStorage.setItem('mentor_brother_history', JSON.stringify(newMessages))
    } catch (error) {
      console.error('Error saving chat history:', error)
    }
  }

  /**
   * Scroll to bottom of messages
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Send message to AI Brother
   */
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    if (!hasApiKey) {
      alert('Please configure your groq API key to chat with your AI brother.')
      return
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      goal: currentGoal
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputMessage('')
    setIsLoading(true)
    setShowQuickTopics(false)

    try {
      const { groqClient } = await import('@/lib/ai/groq-client')
      
      // Create brother-specific prompt
      const brotherPrompt = createBrotherPrompt(userMessage.content, messages, currentGoal)
      
      // Get AI response
      const aiResponse = await groqClient.makeRequest([
          {
            role: "system",
            content: `You are an encouraging, motivational Muslim brother providing support and guidance. You help people achieve their goals while staying true to Islamic values. You're enthusiastic, practical, and focused on action and growth.

PERSONALITY TRAITS:
- Motivational and energetic
- Practical and solution-oriented
- Supportive and encouraging
- Goal-focused and accountability-minded
- Uses brother-to-brother communication style
- Balances Islamic wisdom with modern life challenges

AREAS OF EXPERTISE:
- Goal setting and achievement
- Personal development and growth
- Career advancement and planning
- Building good habits and breaking bad ones
- Time management and productivity
- Islamic brotherhood and community
- Overcoming challenges and obstacles
- Health and fitness motivation

COMMUNICATION STYLE:
- Use "brother" or "akhi" occasionally
- Be encouraging and motivational
- Focus on actionable advice and next steps
- Share practical strategies and tips
- Include Islamic perspective naturally
- Use energy and enthusiasm in responses
- Ask follow-up questions to keep engagement
- Celebrate wins and progress

APPROACH:
- Help set SMART goals aligned with Islamic values
- Provide accountability and check-ins
- Break down big challenges into manageable steps
- Encourage consistent daily actions
- Balance dunya (worldly) success with akhirah (afterlife) preparation
- Promote brotherhood and community support
- Focus on continuous improvement (Kaizen approach)

Always be positive, practical, and provide concrete next steps. Remember that success in this life should align with Islamic principles and prepare for the hereafter.`
          },
          {
            role: "user",
            content: brotherPrompt
          }
        ]
      )

      const responseContent = aiResponse.choices[0]?.message?.content || "Let's keep pushing forward, brother! Give me a moment to get back to you 💪"

      // Parse response for motivational elements
      const parsedResponse = parseBrotherResponse(responseContent)

      const brotherMessage = {
        id: Date.now() + 1,
        type: 'brother',
        content: parsedResponse.content,
        timestamp: new Date().toISOString(),
        energy: parsedResponse.energy,
        actionItems: parsedResponse.actionItems,
        goalUpdate: parsedResponse.goalUpdate
      }

      // Update current goal if new goal is detected
      if (parsedResponse.goalUpdate) {
        setCurrentGoal(parsedResponse.goalUpdate)
        localStorage.setItem('brother_current_goal', JSON.stringify(parsedResponse.goalUpdate))
      }

      const finalMessages = [...updatedMessages, brotherMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)

    } catch (error) {
      console.error('Error getting brother response:', error)
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'brother',
        content: `No worries, brother! Even the best of us hit technical snags 😅 But that's not stopping us! Let's try again and keep moving forward. Error: ${error.message}`,
        timestamp: new Date().toISOString(),
        isError: true,
        energy: 'supportive'
      }

      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)
    }

    setIsLoading(false)
  }

  /**
   * Create brother-specific prompt
   */
  const createBrotherPrompt = (userMessage, chatHistory, userGoal) => {
    const context = chatHistory.length > 1 
      ? `Previous conversation: ${chatHistory.slice(-3).map(msg => `${msg.type}: ${msg.content}`).join('\n')}\n\n`
      : ''
    
    const goalContext = userGoal ? `Current goal the person is working on: ${JSON.stringify(userGoal)}\n\n` : ''
    
    return `${context}${goalContext}The person is sharing: "${userMessage}"

Please respond as an encouraging Muslim brother. Provide motivational support, practical advice, and actionable next steps. If they mention a goal or challenge, help them break it down into manageable actions. Keep the energy positive and focused on growth and achievement through Islamic principles.`
  }

  /**
   * Parse brother response for motivational elements
   */
  const parseBrotherResponse = (response) => {
    const result = {
      content: response,
      energy: 'motivational',
      actionItems: [],
      goalUpdate: null
    }

    // Detect energy level from response
    if (response.includes('💪') || response.includes('🔥') || response.toLowerCase().includes('let\'s go')) {
      result.energy = 'high'
    } else if (response.includes('🎯') || response.toLowerCase().includes('goal')) {
      result.energy = 'focused'
    } else if (response.includes('📈') || response.toLowerCase().includes('progress')) {
      result.energy = 'growth'
    }

    // Extract action items if present
    const actionPattern = /(?:action|step|next|todo).*?:.*?(?:\n|$)/gi
    const actionMatches = response.match(actionPattern)
    if (actionMatches) {
      result.actionItems = actionMatches.slice(0, 3) // Limit to 3 actions
    }

    return result
  }

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  /**
   * Clear chat history
   */
  const clearChat = () => {
    const confirmClear = window.confirm('Ready for a fresh start, brother?')
    if (confirmClear) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'brother',
        content: "Fresh start! Let's make this conversation even better than the last one 🚀 What are we working on today?",
        timestamp: new Date().toISOString(),
        energy: 'high'
      }
      setMessages([welcomeMessage])
      setShowQuickTopics(true)
      localStorage.removeItem('mentor_brother_history')
    }
  }

  // Quick topic suggestions for brothers
  const quickTopics = [
    "I want to build better daily habits",
    "How to balance career growth with Islamic values?",
    "Need motivation to achieve my goals",
    "Struggling with time management and productivity",
    "Want to improve my physical and mental health",
    "How to build stronger relationships and brotherhood?",
    "Need guidance on financial planning and success",
    "How to overcome procrastination and take action?"
  ]

  // Goal categories for quick setup
  const goalCategories = [
    { emoji: '📚', label: 'Learning & Education', value: 'education' },
    { emoji: '💼', label: 'Career & Business', value: 'career' },
    { emoji: '💪', label: 'Health & Fitness', value: 'health' },
    { emoji: '🤲', label: 'Spiritual Growth', value: 'spiritual' },
    { emoji: '💰', label: 'Financial Goals', value: 'financial' },
    { emoji: '👨‍👩‍👧‍👦', label: 'Family & Relationships', value: 'family' }
  ]

  const handleQuickTopic = (topic) => {
    setInputMessage(topic)
    setShowQuickTopics(false)
  }

  const setQuickGoal = (category) => {
    const goal = {
      category: category.value,
      label: category.label,
      emoji: category.emoji,
      createdAt: new Date().toISOString()
    }
    setCurrentGoal(goal)
    localStorage.setItem('brother_current_goal', JSON.stringify(goal))
  }

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-gradient-mesh">
        <BrotherHeader />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="glass-morphism-card rounded-2xl p-8">
            <HiOutlineUsers className="w-20 h-20 text-blue-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Your AI Brother is Ready</h2>
            <p className="text-white/70 mb-6">
              Configure your groq API key to get motivational support and brotherhood guidance from your AI companion.
            </p>
            <button 
              onClick={checkApiConfiguration}
              className="btn-primary bg-gradient-to-r from-blue-600 to-accent-600"
            >
              Let's Get Started, Brother!
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <BrotherHeader onClearChat={clearChat} currentGoal={currentGoal} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="glass-morphism-card rounded-2xl h-[70vh] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {isLoading && <LoadingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Topics & Goal Selector */}
          {showQuickTopics && messages.length <= 1 && (
            <div className="px-6 pb-4 border-t border-white/10">
              <div className="mb-4">
                <p className="text-white/60 text-sm mb-3">What area do you want to focus on, brother?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                  {goalCategories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setQuickGoal(category)}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
                        ${currentGoal?.category === category.value 
                          ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50' 
                          : 'bg-white/5 text-white/70 hover:bg-blue-500/10 border border-white/10'
                        }
                      `}
                    >
                      <span className="text-lg">{category.emoji}</span>
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-white/60 text-sm mb-3">Or choose a topic to get started:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickTopics.slice(0, 8).map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickTopic(topic)}
                    className="text-left p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-white/80 hover:text-white transition-all duration-200 text-sm border border-blue-500/20"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-white/10">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What's the plan, brother? Let's make it happen!"
                  rows={2}
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`
                  px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center
                  ${inputMessage.trim() && !isLoading
                    ? 'bg-gradient-to-r from-blue-600 to-accent-600 text-white hover:scale-105'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }
                `}
              >
                <HiOutlinePaperAirplane className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">
              Press Enter to send • Let's achieve greatness together!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Brother Header Component
 */
function BrotherHeader({ onClearChat, currentGoal }) {
  return (
    <div className="px-6 py-6 border-b border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/mentor" className="p-2 glass-morphism rounded-lg text-white/70 hover:text-white transition-colors duration-200">
              <HiOutlineArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                <HiOutlineUsers className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Friendly Brother</h1>
                <p className="text-blue-400 font-medium">Supportive Companion & Motivator</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-white/60 text-sm">Ready to help</span>
                  </div>
                  {currentGoal && (
                    <div className="flex items-center space-x-1 text-white/60 text-sm">
                      <span>{currentGoal.emoji}</span>
                      <span>Focus: {currentGoal.label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {onClearChat && (
            <button
              onClick={onClearChat}
              className="text-white/60 hover:text-white/80 text-sm transition-colors duration-200 flex items-center space-x-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Fresh Start</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Message Bubble Component
 */
function MessageBubble({ message }) {
  const isBrother = message.type === 'brother'
  
  return (
    <div className={`flex ${isBrother ? 'justify-start' : 'justify-end'}`}>
      <div className={`
        max-w-[85%] p-4 rounded-2xl
        ${isBrother 
          ? 'bg-blue-500/10 border border-blue-500/20' 
          : 'bg-gradient-to-r from-blue-600 to-accent-600 text-white'
        }
      `}>
        <div className="flex items-start space-x-3">
          {isBrother && (
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              {message.isError ? (
                <span className="text-red-400 text-xs">⚡</span>
              ) : message.energy === 'high' ? (
                <HiOutlineFire className="w-4 h-4 text-blue-400" />
              ) : (
                <HiOutlineUsers className="w-4 h-4 text-blue-400" />
              )}
            </div>
          )}
          
          <div className="flex-1">
            <p className={`${isBrother ? 'text-white/90' : 'text-white'} whitespace-pre-wrap leading-relaxed`}>
              {message.content}
            </p>
            
            {/* Action Items Display */}
            {message.actionItems && message.actionItems.length > 0 && (
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FiHeart className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm">Action Steps</span>
                </div>
                <ul className="space-y-1">
                  {message.actionItems.map((action, index) => (
                    <li key={index} className="text-white/80 text-sm flex items-start space-x-2">
                      <span className="text-blue-400 font-bold">{index + 1}.</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Energy Indicator */}
            {message.energy && message.energy !== 'motivational' && (
              <div className="mt-2 inline-flex items-center space-x-1 text-xs">
                <span className="text-blue-400">
                  {message.energy === 'high' && '🔥 High Energy'}
                  {message.energy === 'focused' && '🎯 Focused'}
                  {message.energy === 'growth' && '📈 Growth Mindset'}
                  {message.energy === 'supportive' && '💪 Supportive'}
                </span>
              </div>
            )}
            
            <p className="text-xs opacity-60 mt-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Loading Indicator Component
 */
function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
            <FiLoader className="w-4 h-4 text-blue-400 animate-spin" />
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
          </div>
          <span className="text-blue-400 text-sm">Brother is strategizing... 💭</span>
        </div>
      </div>
    </div>
  )
}