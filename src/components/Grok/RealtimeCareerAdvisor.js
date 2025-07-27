'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  HiOutlineSparkles, 
  HiOutlinePaperAirplane,
  HiOutlineLightBulb,
  HiOutlineUser,
  HiOutlineRocketLaunch
} from 'react-icons/hi2'
import { FiMessageCircle, FiLoader } from 'react-icons/fi'

/**
 * Real-time Career Advisor Component
 * 
 * Interactive AI chat for career guidance and advice
 * Uses Grok API for real-time responses
 */
export default function RealtimeCareerAdvisor({ 
  userAssessment, 
  className = '',
  placeholder = "Ask about career paths, skill development, or Islamic guidance..." 
}) {
  // State management
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const messagesEndRef = useRef(null)

  // Check API configuration on mount
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
      const history = localStorage.getItem('career_chat_history')
      if (history) {
        const parsedHistory = JSON.parse(history)
        // Only load recent messages (last 20)
        setMessages(parsedHistory.slice(-20))
      } else {
        // Add welcome message
        setMessages([{
          id: Date.now(),
          type: 'ai',
          content: "Assalamu Alaikum! I'm your AI career advisor. I can help you with career planning, skill development, and finding paths that align with Islamic values. What would you like to know?",
          timestamp: new Date().toISOString()
        }])
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
      localStorage.setItem('career_chat_history', JSON.stringify(newMessages))
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
   * Send message to AI
   */
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    if (!hasApiKey) {
      alert('Please configure your Grok API key to use the real-time advisor.')
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

    try {
      const { grokClient } = await import('@/lib/ai/groq-client')
      
      // Get AI response
      const aiResponse = await grokClient.getCareerAdvice(
        userAssessment || {}, 
        userMessage.content
      )

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toISOString()
      }

      const finalMessages = [...updatedMessages, aiMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)

    } catch (error) {
      console.error('Error getting AI response:', error)
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I apologize, but I'm having trouble connecting right now. Error: ${error.message}. Please try again or check your API configuration.`,
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
    const confirmClear = window.confirm('Are you sure you want to clear the chat history?')
    if (confirmClear) {
      setMessages([{
        id: Date.now(),
        type: 'ai',
        content: "Chat cleared. How can I help you with your career journey today?",
        timestamp: new Date().toISOString()
      }])
      localStorage.removeItem('career_chat_history')
    }
  }

  /**
   * Suggest quick questions
   */
  const quickQuestions = [
    "What skills should I develop for my chosen career?",
    "How can I find halal career opportunities?",
    "What's the job market like for my field?",
    "How do I transition to a new career?",
    "What are some good remote career options?"
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
  }

  if (!hasApiKey) {
    return (
      <div className={`glass-morphism-card rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <HiOutlineSparkles className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">AI Advisor Available</h3>
          <p className="text-white/60 text-sm mb-4">
            Configure your Groq API key to chat with your lightning-fast personal career advisor
          </p>
          <button 
            onClick={checkApiConfiguration}
            className="btn-primary"
          >
            Configure API
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`glass-morphism-card rounded-xl flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
            <HiOutlineSparkles className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Career Advisor</h3>
            <p className="text-white/60 text-sm">Real-time guidance & support</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-white/60 hover:text-white/80 text-sm transition-colors duration-200"
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] p-3 rounded-lg
                ${message.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : message.isError
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-white/10 text-white/90'
                }
              `}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'ai' && (
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                    ${message.isError ? 'bg-red-500/20' : 'bg-primary-500/20'}
                  `}>
                    {message.isError ? (
                      <span className="text-red-400 text-xs">!</span>
                    ) : (
                      <HiOutlineSparkles className="w-3 h-3 text-primary-400" />
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <FiLoader className="w-3 h-3 text-primary-400 animate-spin" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-white/10">
          <p className="text-white/60 text-sm mb-3">Quick questions to get started:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-all duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              rows={1}
              className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              style={{ minHeight: '48px' }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={`
              px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center
              ${inputMessage.trim() && !isLoading
                ? 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            <HiOutlinePaperAirplane className="w-4 h-4" />
          </button>
        </div>
        <p className="text-white/40 text-xs mt-2">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}