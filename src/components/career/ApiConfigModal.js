'use client'

import { useState, useEffect } from 'react'
import { 
  HiOutlineKey, 
  HiOutlineCheckCircle, 
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineSparkles
} from 'react-icons/hi2'
import { FiExternalLink, FiRefreshCw } from 'react-icons/fi'

/**
 * API Configuration Modal Component
 * 
 * Handles Grok API key configuration and testing
 * Provides clear instructions and validation
 */
export default function ApiConfigModal({ isOpen, onClose, onSuccess }) {
  // State management
  const [apiKey, setApiKey] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [currentKey, setCurrentKey] = useState('')

  // Load existing API key on mount
  useEffect(() => {
    if (isOpen) {
      const existingKey = localStorage.getItem('groq_api_key')
      if (existingKey) {
        setCurrentKey(existingKey.slice(0, 8) + '...' + existingKey.slice(-4))
        setApiKey(existingKey)
      }
    }
  }, [isOpen])

  /**
   * Test API connection
   */
  const testApiConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key' })
      return
    }

    setIsLoading(true)
    setTestResult(null)

    try {
      // Import Groq client and test connection
      const { groqClient } = await import('@/lib/ai/groq-client')
      groqClient.setApiKey(apiKey.trim())
      
      const isConnected = await groqClient.testConnection()
      
      if (isConnected) {
        setTestResult({ 
          success: true, 
          message: 'API connection successful! Lightning-fast AI recommendations are now enabled.' 
        })
      } else {
        setTestResult({ 
          success: false, 
          message: 'API connection failed. Please check your API key and try again.' 
        })
      }
    } catch (error) {
      setTestResult({ 
        success: false, 
        message: `Connection failed: ${error.message}` 
      })
    }

    setIsLoading(false)
  }

  /**
   * Save API key and close modal
   */
  const saveApiKey = () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key' })
      return
    }

    if (testResult?.success) {
      localStorage.setItem('grok_api_key', apiKey.trim())
      onSuccess?.()
      onClose()
    } else {
      setTestResult({ 
        success: false, 
        message: 'Please test the API connection first' 
      })
    }
  }

  /**
   * Use sample data instead
   */
  const useSampleData = () => {
    if (onSuccess) {
      onSuccess(false) // false indicates using sample data
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-neural-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
              <HiOutlineKey className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Configuration</h2>
              <p className="text-white/60">Setup Groq API for lightning-fast AI recommendations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Current Status */}
        {currentKey && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <HiOutlineCheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Current API Key</span>
            </div>
            <p className="text-white/80 text-sm font-mono">{currentKey}</p>
            <p className="text-emerald-300 text-xs mt-1">
              API key is configured. You can update it below or test the connection.
            </p>
          </div>
        )}

        {/* Information */}
        <div className="mb-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <HiOutlineInformationCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-primary-400 font-medium mb-2">About Groq API</h3>
              <p className="text-white/80 text-sm mb-3">
                Groq provides lightning-fast AI inference using specialized hardware. Your API key enables 
                real-time career recommendations with ultra-low latency. Free tier includes 30 requests per minute.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <a 
                  href="https://console.groq.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 transition-colors duration-200"
                >
                  <span>Get API Key</span>
                  <FiExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://docs.groq.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 transition-colors duration-200"
                >
                  <span>Documentation</span>
                  <FiExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* API Key Input */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Groq API Key
          </label>
          <div className="relative">
            <input
              type={isVisible ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Groq API key (gsk_...)..."
              className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200"
            >
              {isVisible ? (
                <HiOutlineEyeSlash className="w-5 h-5" />
              ) : (
                <HiOutlineEye className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-white/40 text-xs mt-2">
            Your API key is stored locally and never transmitted to our servers.
          </p>
        </div>

        {/* Test Connection */}
        <div className="mb-6">
          <button
            onClick={testApiConnection}
            disabled={!apiKey.trim() || isLoading}
            className={`
              w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200
              ${apiKey.trim() && !isLoading
                ? 'bg-secondary-600 hover:bg-secondary-700 text-white' 
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            {isLoading ? (
              <>
                <FiRefreshCw className="w-4 h-4 animate-spin" />
                <span>Testing Connection...</span>
              </>
            ) : (
              <>
                <HiOutlineSparkles className="w-4 h-4" />
                <span>Test API Connection</span>
              </>
            )}
          </button>
        </div>

        {/* Test Result */}
        {testResult && (
          <div className={`
            mb-6 p-4 rounded-lg border
            ${testResult.success 
              ? 'bg-emerald-500/10 border-emerald-500/20' 
              : 'bg-red-500/10 border-red-500/20'
            }
          `}>
            <div className="flex items-start space-x-3">
              {testResult.success ? (
                <HiOutlineCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <HiOutlineExclamationTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${testResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
                  {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                </p>
                <p className={`text-sm mt-1 ${testResult.success ? 'text-emerald-300' : 'text-red-300'}`}>
                  {testResult.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={saveApiKey}
            disabled={!testResult?.success}
            className={`
              flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2
              ${testResult?.success
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:scale-105 shadow-lg shadow-primary-600/25'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            <HiOutlineCheckCircle className="w-4 h-4" />
            <span>Save & Use AI</span>
          </button>
          
          <button
            onClick={useSampleData}
            className="flex-1 px-6 py-3 rounded-xl font-medium bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <HiOutlineInformationCircle className="w-4 h-4" />
            <span>Use Sample Data</span>
          </button>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <p className="text-white/60 text-xs text-center">
            <strong>Note:</strong> You can always change your API settings later in the dashboard preferences.
            Sample data provides realistic examples but won't be personalized to your specific assessment.
          </p>
        </div>
      </div>
    </div>
  )
}