'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  HiOutlineHeart, 
  HiOutlinePaperAirplane,
  HiOutlineArrowLeft,
  HiOutlineSparkles,
  HiOutlineHandHeart,
  HiOutlineUserGroup,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHome,
  HiOutlineSun
} from 'react-icons/hi2'
import { FiMessageCircle, FiLoader, FiHeart, FiUsers, FiRefreshCw, FiSun } from 'react-icons/fi'

/**
 * Gentle Sister AI Mentor Chat Page
 * 
 * Features:
 * - Compassionate sisterly support and guidance
 * - Women's perspective on Islamic living
 * - Emotional support and practical advice
 * - Family and relationship guidance
 * - Real-time empathetic AI conversation
 * - Beautiful sister-themed interface with warm colors
 */
export default function SisterMentorPage() {
  // State management
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showQuickTopics, setShowQuickTopics] = useState(true)
  const [mood, setMood] = useState(null)
  const messagesEndRef = useRef(null)

  // Check API and load chat history on mount
  useEffect(() => {
    checkApiConfiguration()
    loadChatHistory()
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
      const { isGroqConfigured} = await import('@/lib/ai/groq-client')
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
      const history = localStorage.getItem('mentor_sister_history')
      if (history) {
        const parsedHistory = JSON.parse(history)
        setMessages(parsedHistory.slice(-20)) // Load last 20 messages
        setShowQuickTopics(parsedHistory.length === 0)
      } else {
        // Add welcome message
        const welcomeMessage = {
          id: Date.now(),
          type: 'sister',
          content: "Assalamu Alaikum, my dear sister! 💕 I'm so glad you're here. Whether you need someone to listen, advice on daily struggles, or just want to chat about life as a Muslim woman, I'm here for you. What's on your heart today?",
          timestamp: new Date().toISOString(),
          emotion: 'warm'
        }
        setMessages([welcomeMessage])
        setShowQuickTopics(true)
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  /**
   * Save chat history to localStorage
   */
  const saveChatHistory = (newMessages) => {
    try {
      localStorage.setItem('mentor_sister_history', JSON.stringify(newMessages))
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
   * Send message to AI Sister
   */
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    if (!hasApiKey) {
      alert('Please configure your groq API key to chat with your AI sister.')
      return
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      mood: mood
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputMessage('')
    setIsLoading(true)
    setShowQuickTopics(false)

    try {
      const { groqClient } = await import('@/lib/ai/groq-client')
      
      // Create sister-specific prompt
      const sisterPrompt = createSisterPrompt(userMessage.content, messages, mood)
      
      // Get AI response
      const aiResponse = await groqClient.makeRequest([
          {
            role: "system",
            content: `You are a warm, compassionate, and wise Muslim sister providing emotional support and guidance. You understand the unique challenges faced by Muslim women in today's world and provide advice that balances Islamic values with modern life.

PERSONALITY TRAITS:
- Gentle, empathetic, and understanding
- Warm and sisterly in communication style
- Knowledgeable about women's issues in Islam
- Supportive without being judgmental
- Uses occasional appropriate emojis to show warmth
- Relates to experiences of modern Muslim women

AREAS OF EXPERTISE:
- Emotional support and mental wellbeing
- Family relationships and marriage advice
- Balancing faith with modern life
- Women's rights and roles in Islam
- Personal development and self-care
- Practical daily life guidance
- Sisterhood and community building

COMMUNICATION STYLE:
- Use "sister" or "habibti" occasionally
- Be encouraging and uplifting
- Share relatable experiences when appropriate
- Provide practical solutions alongside emotional support
- Include Islamic perspective naturally, not forcefully
- Be understanding of different life situations
- Use warm, conversational language

IMPORTANT:
- Always be respectful of cultural differences
- Acknowledge when professional help might be needed
- Encourage seeking local community support
- Balance religious guidance with practical advice
- Be inclusive of different life stages and circumstances`
          },
          {
            role: "user",
            content: sisterPrompt
          }
        ]
      )

      const responseContent = aiResponse.choices[0]?.message?.content || "I'm here for you, sister. Let me try responding again in a moment 💕"

      // Parse response for emotional elements
      const parsedResponse = parseSisterResponse(responseContent)

      const sisterMessage = {
        id: Date.now() + 1,
        type: 'sister',
        content: parsedResponse.content,
        timestamp: new Date().toISOString(),
        emotion: parsedResponse.emotion,
        advice: parsedResponse.advice
      }

      const finalMessages = [...updatedMessages, sisterMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)

    } catch (error) {
      console.error('Error getting sister response:', error)
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'sister',
        content: `Oh sister, I'm having some technical difficulties right now 😔 But I'm still here for you! Please try again in a moment. Whatever you're going through, remember that Allah is with you. Error: ${error.message}`,
        timestamp: new Date().toISOString(),
        isError: true,
        emotion: 'supportive'
      }

      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)
    }

    setIsLoading(false)
  }

  /**
   * Create sister-specific prompt
   */
  const createSisterPrompt = (userMessage, chatHistory, userMood) => {
    const context = chatHistory.length > 1 
      ? `Previous conversation: ${chatHistory.slice(-3).map(msg => `${msg.type}: ${msg.content}`).join('\n')}\n\n`
      : ''
    
    const moodContext = userMood ? `The person seems to be feeling: ${userMood}\n\n` : ''
    
    return `${context}${moodContext}The person is sharing: "${userMessage}"

Please respond as a caring, understanding Muslim sister. Provide emotional support, practical advice, and Islamic wisdom where appropriate. Be warm, empathetic, and use a conversational sisterly tone.`
  }

  /**
   * Parse sister response for emotional elements
   */
  const parseSisterResponse = (response) => {
    const result = {
      content: response,
      emotion: 'supportive',
      advice: null
    }

    // Detect emotion from response content
    if (response.includes('💕') || response.includes('🤗') || response.toLowerCase().includes('love')) {
      result.emotion = 'loving'
    } else if (response.includes('💪') || response.toLowerCase().includes('strong')) {
      result.emotion = 'encouraging'
    } else if (response.includes('🤲') || response.toLowerCase().includes('dua')) {
      result.emotion = 'spiritual'
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
    const confirmClear = window.confirm('Are you sure you want to clear our conversation, sister?')
    if (confirmClear) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'sister',
        content: "Assalamu Alaikum! Fresh start - I'm here and ready to listen to whatever is on your mind 💕",
        timestamp: new Date().toISOString(),
        emotion: 'warm'
      }
      setMessages([welcomeMessage])
      setShowQuickTopics(true)
      localStorage.removeItem('mentor_sister_history')
    }
  }

  /**
   * Set user mood
   */
  const setUserMood = (selectedMood) => {
    setMood(selectedMood)
  }

  // Quick topic suggestions for sisters
  const quickTopics = [
    "I'm feeling overwhelmed with daily responsibilities",
    "How to balance career and family in Islam?",
    "Struggling with self-confidence and self-worth",
    "Need advice on marriage and relationships",
    "How to strengthen my connection with Allah?",
    "Dealing with family expectations and pressure",
    "Finding time for self-care as a Muslim woman",
    "Building strong sisterhood connections"
  ]

  // Mood options
  const moodOptions = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '🤗', label: 'Grateful', value: 'grateful' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' }
  ]

  const handleQuickTopic = (topic) => {
    setInputMessage(topic)
    setShowQuickTopics(false)
  }

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-gradient-mesh">
        <SisterHeader />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="glass-morphism-card rounded-2xl p-8">
            <HiOutlineHeart className="w-20 h-20 text-pink-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Your AI Sister is Here</h2>
            <p className="text-white/70 mb-6">
              Configure your groq API key to receive gentle guidance and sisterly support from your AI companion.
            </p>
            <button 
              onClick={checkApiConfiguration}
              className="btn-primary bg-gradient-to-r from-pink-600 to-rose-600"
            >
              Connect with Sister
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <SisterHeader onClearChat={clearChat} />
      
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

          {/* Quick Topics & Mood Selector */}
          {showQuickTopics && messages.length <= 1 && (
            <div className="px-6 pb-4 border-t border-white/10">
              <div className="mb-4">
                <p className="text-white/60 text-sm mb-3">How are you feeling today, sister?</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {moodOptions.map((moodOption) => (
                    <button
                      key={moodOption.value}
                      onClick={() => setUserMood(moodOption.value)}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
                        ${mood === moodOption.value 
                          ? 'bg-pink-500/30 text-pink-300 border border-pink-500/50' 
                          : 'bg-white/5 text-white/70 hover:bg-pink-500/10 border border-white/10'
                        }
                      `}
                    >
                      <span className="text-lg">{moodOption.emoji}</span>
                      <span>{moodOption.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-white/60 text-sm mb-3">Or share what's on your mind:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickTopics.slice(0, 8).map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickTopic(topic)}
                    className="text-left p-3 bg-pink-500/10 hover:bg-pink-500/20 rounded-lg text-white/80 hover:text-white transition-all duration-200 text-sm border border-pink-500/20"
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
                  placeholder="Share what's in your heart, sister..."
                  rows={2}
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`
                  px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center
                  ${inputMessage.trim() && !isLoading
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:scale-105'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }
                `}
              >
                <HiOutlinePaperAirplane className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">
              Press Enter to send • A safe space for sisterly conversation
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Sister Header Component
 */
function SisterHeader({ onClearChat }) {
  return (
    <div className="px-6 py-6 border-b border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/mentor" className="p-2 glass-morphism rounded-lg text-white/70 hover:text-white transition-colors duration-200">
              <HiOutlineArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center border border-pink-500/30">
                <HiOutlineHeart className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gentle Sister</h1>
                <p className="text-pink-400 font-medium">Compassionate Counselor & Friend</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                    <span className="text-white/60 text-sm">Here to listen</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white/60 text-sm">
                    <FiHeart className="w-3 h-3" />
                    <span>Sisterly support</span>
                  </div>
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
  const isSister = message.type === 'sister'
  
  return (
    <div className={`flex ${isSister ? 'justify-start' : 'justify-end'}`}>
      <div className={`
        max-w-[85%] p-4 rounded-2xl
        ${isSister 
          ? 'bg-pink-500/10 border border-pink-500/20' 
          : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white'
        }
      `}>
        <div className="flex items-start space-x-3">
          {isSister && (
            <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              {message.isError ? (
                <span className="text-red-400 text-xs">💔</span>
              ) : (
                <HiOutlineHeart className="w-4 h-4 text-pink-400" />
              )}
            </div>
          )}
          
          <div className="flex-1">
            <p className={`${isSister ? 'text-white/90' : 'text-white'} whitespace-pre-wrap leading-relaxed`}>
              {message.content}
            </p>
            
            {/* Emotional Support Indicator */}
            {message.emotion && message.emotion !== 'supportive' && (
              <div className="mt-3 p-2 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-pink-400 text-sm">
                    {message.emotion === 'loving' && '💕 Sending love'}
                    {message.emotion === 'encouraging' && '💪 You ve got this!'}
                    {message.emotion === 'spiritual' && '🤲 In my duas'}
                    {message.emotion === 'warm' && '🤗 Warm hugs'}
                  </span>
                </div>
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
      <div className="max-w-[85%] p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
            <FiLoader className="w-4 h-4 text-pink-400 animate-spin" />
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200" />
          </div>
          <span className="text-pink-400 text-sm">Sister is thinking... 💭</span>
        </div>
      </div>
    </div>
  )
}