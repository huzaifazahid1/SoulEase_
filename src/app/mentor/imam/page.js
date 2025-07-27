'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  HiOutlineAcademicCap, 
  HiOutlinePaperAirplane,
  HiOutlineBookOpen,
  HiOutlineArrowLeft,
  HiOutlineSparkles,
  HiOutlineHandHeart,
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineGlobeAlt
} from 'react-icons/hi2'
import { FiMessageCircle, FiLoader, FiBook, FiStar, FiRefreshCw } from 'react-icons/fi'

/**
 * Wise Imam AI Mentor Chat Page
 * 
 * Features:
 * - Islamic scholarship and guidance
 * - Quranic verses and Hadith references
 * - Spiritual counseling and life advice
 * - Real-time AI conversation with Islamic knowledge
 * - Beautiful imam-themed interface
 */
export default function ImamMentorPage() {
  // State management
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showQuickTopics, setShowQuickTopics] = useState(true)
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
      const history = localStorage.getItem('mentor_imam_history')
      if (history) {
        const parsedHistory = JSON.parse(history)
        setMessages(parsedHistory.slice(-20)) // Load last 20 messages
        setShowQuickTopics(parsedHistory.length === 0)
      } else {
        // Add welcome message
        const welcomeMessage = {
          id: Date.now(),
          type: 'imam',
          content: "Assalamu Alaikum wa Rahmatullahi wa Barakatuh, my dear brother/sister. I am here to provide guidance rooted in the Quran and Sunnah. What spiritual matter would you like to discuss today?",
          timestamp: new Date().toISOString(),
          verse: {
            arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
            translation: "And whoever fears Allah - He will make for him a way out.",
            reference: "Quran 65:2"
          }
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
      localStorage.setItem('mentor_imam_history', JSON.stringify(newMessages))
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
   * Send message to AI Imam
   */
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    if (!hasApiKey) {
      alert('Please configure your Grok API key to chat with the AI Imam.')
      return
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputMessage('')
    setIsLoading(true)
    setShowQuickTopics(false)

    try {
      const { groqClient } = await import('@/lib/ai/groq-client')
      
      // Create imam-specific prompt
      const imamPrompt = createImamPrompt(userMessage.content, messages)
      
      // Get AI response
      const aiResponse = await groqClient.makeRequest( [
          {
            role: "system",
            content: `You are a wise and knowledgeable Islamic imam and scholar. You provide guidance based on the Quran and authentic Hadith. You are compassionate, patient, and deeply knowledgeable about Islamic teachings, jurisprudence, and spirituality. 

IMPORTANT GUIDELINES:
- Always begin responses with appropriate Islamic greetings when relevant
- Provide guidance rooted in Quran and Sunnah
- Include relevant Quranic verses or Hadith when appropriate
- Be compassionate and understanding
- Address spiritual, ethical, and practical matters
- Use respectful and scholarly language
- When quoting verses or Hadith, provide references
- Acknowledge when matters require consulting local scholars
- Focus on mainstream Sunni Islamic teachings
- Be mindful of different circumstances and show wisdom

FORMAT for Quranic verses (when relevant):
Arabic text (if you know it)
English translation
Reference (Surah:Verse)

Always prioritize authentic Islamic sources and encourage the person to also consult local scholars for complex matters.`
          },
          {
            role: "user",
            content: imamPrompt
          }
        ]
      )

      const responseContent = aiResponse.choices[0]?.message?.content || "I apologize, but I'm having difficulty responding right now. Please try again."

      // Parse response for Islamic elements
      const parsedResponse = parseImamResponse(responseContent)

      const imamMessage = {
        id: Date.now() + 1,
        type: 'imam',
        content: parsedResponse.content,
        timestamp: new Date().toISOString(),
        verse: parsedResponse.verse,
        hadith: parsedResponse.hadith
      }

      const finalMessages = [...updatedMessages, imamMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)

    } catch (error) {
      console.error('Error getting imam response:', error)
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'imam',
        content: `Forgive me, my dear brother/sister. I'm experiencing some difficulty in connecting right now. Please try again, and may Allah make it easy for us. Error: ${error.message}`,
        timestamp: new Date().toISOString(),
        isError: true
      }

      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)
    }

    setIsLoading(false)
  }

  /**
   * Create imam-specific prompt
   */
  const createImamPrompt = (userQuestion, chatHistory) => {
    const context = chatHistory.length > 1 
      ? `Previous conversation context: ${chatHistory.slice(-3).map(msg => `${msg.type}: ${msg.content}`).join('\n')}\n\n`
      : ''
    
    return `${context}The person is asking: "${userQuestion}"

Please provide wise Islamic guidance on this matter. If relevant, include a Quranic verse or authentic Hadith that relates to this topic. Be compassionate and scholarly in your response.`
  }

  /**
   * Parse imam response for Islamic elements
   */
  const parseImamResponse = (response) => {
    const result = {
      content: response,
      verse: null,
      hadith: null
    }

    // Look for Quranic verse patterns
    const versePattern = /Quran (\d+):(\d+)|Surah (\w+):(\d+)|Q(\d+):(\d+)/i
    const verseMatch = response.match(versePattern)
    
    if (verseMatch) {
      // Extract verse information if found
      const verseInfo = extractVerseInfo(response, verseMatch)
      if (verseInfo) {
        result.verse = verseInfo
      }
    }

    return result
  }

  /**
   * Extract verse information from response
   */
  const extractVerseInfo = (text, match) => {
    // This is a simplified version - in a real app, you'd have a verse database
    return {
      reference: match[0],
      translation: "Verse translation would be extracted here",
      context: "Verse context"
    }
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
    const confirmClear = window.confirm('Are you sure you want to clear the conversation history?')
    if (confirmClear) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'imam',
        content: "Assalamu Alaikum. How may I guide you today with Allah's wisdom?",
        timestamp: new Date().toISOString()
      }
      setMessages([welcomeMessage])
      setShowQuickTopics(true)
      localStorage.removeItem('mentor_imam_history')
    }
  }

  // Quick topic suggestions
  const quickTopics = [
    "How can I strengthen my relationship with Allah?",
    "I'm struggling with daily prayers, any advice?",
    "What does Islam say about dealing with anxiety?",
    "How to find peace during difficult times?",
    "Guidance on making important life decisions",
    "How to increase my knowledge of Islam?"
  ]

  const handleQuickTopic = (topic) => {
    setInputMessage(topic)
    setShowQuickTopics(false)
  }

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-gradient-mesh">
        <ImamHeader />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="glass-morphism-card rounded-2xl p-8">
            <HiOutlineAcademicCap className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">AI Imam Available</h2>
            <p className="text-white/70 mb-6">
              Configure your Grok API key to receive Islamic guidance and wisdom from our AI Imam.
            </p>
            <button 
              onClick={checkApiConfiguration}
              className="btn-primary bg-gradient-to-r from-emerald-600 to-primary-600"
            >
              Configure API Access
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <ImamHeader onClearChat={clearChat} />
      
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

          {/* Quick Topics */}
          {/* {showQuickTopics && messages.length <= 1 && (
            <div className="px-6 pb-4 border-t border-white/10">
              <p className="text-white/60 text-sm mb-3">Explore these spiritual topics:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickTopics.slice(0, 6).map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickTopic(topic)}
                    className="text-left p-3 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg text-white/80 hover:text-white transition-all duration-200 text-sm border border-emerald-500/20"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Input Area */}
          <div className="p-6 border-t border-white/10">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask for Islamic guidance and wisdom..."
                  rows={2}
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`
                  px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center
                  ${inputMessage.trim() && !isLoading
                    ? 'bg-gradient-to-r from-emerald-600 to-primary-600 text-white hover:scale-105'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }
                `}
              >
                <HiOutlinePaperAirplane className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">
              Press Enter to send • Seeking guidance through Islamic wisdom
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Imam Header Component
 */
function ImamHeader({ onClearChat }) {
  return (
    <div className="px-6 py-6 border-b border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/mentor" className="p-2 glass-morphism rounded-lg text-white/70 hover:text-white transition-colors duration-200">
              <HiOutlineArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-primary-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                <HiOutlineAcademicCap className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Wise Imam</h1>
                <p className="text-emerald-400 font-medium">Islamic Scholar & Spiritual Guide</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-white/60 text-sm">Available 24/7</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white/60 text-sm">
                    <HiOutlineBookOpen className="w-3 h-3" />
                    <span>Quran & Sunnah</span>
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
              <span>Clear Chat</span>
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
  const isImam = message.type === 'imam'
  
  return (
    <div className={`flex ${isImam ? 'justify-start' : 'justify-end'}`}>
      <div className={`
        max-w-[85%] p-4 rounded-2xl
        ${isImam 
          ? 'bg-emerald-500/10 border border-emerald-500/20' 
          : 'bg-primary-600 text-white'
        }
      `}>
        <div className="flex items-start space-x-3">
          {isImam && (
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              {message.isError ? (
                <span className="text-red-400 text-xs">!</span>
              ) : (
                <HiOutlineAcademicCap className="w-4 h-4 text-emerald-400" />
              )}
            </div>
          )}
          
          <div className="flex-1">
            <p className={`${isImam ? 'text-white/90' : 'text-white'} whitespace-pre-wrap leading-relaxed`}>
              {message.content}
            </p>
            
            {/* Quranic Verse Display */}
            {message.verse && (
              <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <HiOutlineBookOpen className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium text-sm">Quranic Guidance</span>
                </div>
                {message.verse.arabic && (
                  <p className="text-white/90 text-right mb-2 text-lg font-arabic">{message.verse.arabic}</p>
                )}
                <p className="text-white/80 italic mb-2">"{message.verse.translation}"</p>
                <p className="text-emerald-300 text-sm">— {message.verse.reference}</p>
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
      <div className="max-w-[85%] p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <FiLoader className="w-4 h-4 text-emerald-400 animate-spin" />
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200" />
          </div>
          <span className="text-emerald-400 text-sm">Imam is reflecting...</span>
        </div>
      </div>
    </div>
  )
}