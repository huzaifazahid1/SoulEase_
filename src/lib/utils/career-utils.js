/**
 * Career Utilities - Updated with Real API Integration
 * 
 * Centralized utilities for career-related functionality
 * Including real-time AI integration, data management, localStorage operations, and helper functions
 */

// Local storage keys
export const STORAGE_KEYS = {
    ASSESSMENT: 'career_assessment',
    ASSESSMENT_DRAFT: 'career_assessment_draft',
    RECOMMENDATIONS: 'career_recommendations',
    SAVED_PATHS: 'saved_career_paths',
    CAREER_NOTES: 'career_notes',
    LAST_ASSESSMENT_DATE: 'last_assessment_date',
    USER_PREFERENCES: 'career_user_preferences',
    CHAT_HISTORY: 'career_chat_history',
    API_USAGE_STATS: 'api_usage_stats'
  }
  
  /**
   * Real-time AI Integration Functions
   */
  
  /**
   * Generate real AI-powered career recommendations
   * @param {Object} assessmentData - The assessment answers
   * @returns {Promise<Array>} AI-generated career recommendations
   */
  export const generateAIRecommendations = async (assessmentData) => {
    try {
      const { groqClient, isGroqConfigured } = await import('@/lib/ai/groq-client')
      
      if (!isGroqConfigured()) {
        throw new Error('Groq API not configured')
      }
  
      // Track API usage
      trackApiUsage('generate_recommendations')
      
      const recommendations = await groqClient.generateCareerRecommendations(assessmentData)
      
      // Save recommendations with metadata
      const enhancedRecommendations = recommendations.map((rec, index) => ({
        ...rec,
        generatedDate: new Date().toISOString(),
        assessmentVersion: assessmentData.version || '1.0',
        isAiGenerated: true,
        rank: index + 1
      }))
  
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(enhancedRecommendations))
      
      return enhancedRecommendations
    } catch (error) {
      console.error('Error generating AI recommendations:', error)
      throw error
    }
  }
  
  /**
   * Get real-time career advice
   * @param {Object} userProfile - User's assessment data
   * @param {string} question - User's question
   * @returns {Promise<string>} AI-generated advice
   */
  export const getAICareerAdvice = async (userProfile, question) => {
    try {
      const { groqClient, isGroqConfigured } = await import('@/lib/ai/groq-client')
      
      if (!isGroqConfigured()) {
        throw new Error('Groq API not configured')
      }
  
      trackApiUsage('get_advice')
      
      const advice = await groqClient.getCareerAdvice(userProfile, question)
      
      // Save to chat history
      saveChatMessage('user', question)
      saveChatMessage('ai', advice)
      
      return advice
    } catch (error) {
      console.error('Error getting AI advice:', error)
      throw error
    }
  }
  
  /**
   * Analyze specific career compatibility
   * @param {Object} assessmentData - User's assessment
   * @param {string} careerTitle - Career to analyze
   * @returns {Promise<Object>} Detailed compatibility analysis
   */
  export const analyzeCareerCompatibility = async (assessmentData, careerTitle) => {
    try {
      const { groqClient, isGroqConfigured } = await import('@/lib/ai/groq-client')
      
      if (!isGroqConfigured()) {
        throw new Error('Groq API not configured')
      }
  
      trackApiUsage('analyze_compatibility')
      
      const analysis = await groqClient.analyzeCareerCompatibility(assessmentData, careerTitle)
      
      // Cache the analysis
      const cacheKey = `analysis_${careerTitle.replace(/\s+/g, '_').toLowerCase()}`
      const cachedData = {
        ...analysis,
        careerTitle,
        analyzedDate: new Date().toISOString(),
        cacheExpiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }
      
      localStorage.setItem(cacheKey, JSON.stringify(cachedData))
      
      return analysis
    } catch (error) {
      console.error('Error analyzing career compatibility:', error)
      throw error
    }
  }
  
  /**
   * Data Management Functions (Enhanced)
   */
  
  /**
   * Save career assessment data with AI metadata
   * @param {Object} assessmentData - The assessment answers and metadata
   */
  export const saveAssessmentWithAI = async (assessmentData) => {
    try {
      const dataToSave = {
        ...assessmentData,
        completedDate: new Date().toISOString(),
        version: '2.0', // Updated version with AI integration
        aiEnabled: await checkAiAvailability()
      }
      
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT, JSON.stringify(dataToSave))
      localStorage.setItem(STORAGE_KEYS.LAST_ASSESSMENT_DATE, dataToSave.completedDate)
      
      // Clear draft after saving
      localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_DRAFT)
      
      // Track completion
      trackApiUsage('complete_assessment')
      
      return true
    } catch (error) {
      console.error('Error saving assessment:', error)
      return false
    }
  }
  
  /**
   * Check if AI is available and configured
   * @returns {Promise<boolean>} AI availability status
   */
  export const checkAiAvailability = async () => {
    try {
      const { isGroqConfigured } = await import('@/lib/ai/groq-client')
      return isGroqConfigured()
    } catch (error) {
      return false
    }
  }
  
  /**
   * Get recommendations with real-time refresh option
   * @param {boolean} forceRefresh - Whether to generate new recommendations
   * @returns {Promise<Array>} Career recommendations
   */
  export const getRecommendations = async (forceRefresh = false) => {
    try {
      const assessmentData = loadAssessment()
      if (!assessmentData) {
        throw new Error('No assessment data found')
      }
  
      // Check if we should use cached recommendations
      if (!forceRefresh) {
        const cached = loadRecommendations()
        if (cached.length > 0 && !isDataStale(cached[0]?.generatedDate)) {
          return cached
        }
      }
  
      // Generate fresh AI recommendations
      if (await checkAiAvailability()) {
        return await generateAIRecommendations(assessmentData.answers)
      } else {
        // Fallback to enhanced mock recommendations
        return generateEnhancedMockRecommendations(assessmentData.answers)
      }
    } catch (error) {
      console.error('Error getting recommendations:', error)
      throw error
    }
  }
  
  /**
   * Chat and Messaging Functions
   */
  
  /**
   * Save chat message to history
   * @param {string} type - 'user' or 'ai'
   * @param {string} content - Message content
   */
  export const saveChatMessage = (type, content) => {
    try {
      const history = loadChatHistory()
      const message = {
        id: Date.now() + Math.random(),
        type,
        content,
        timestamp: new Date().toISOString()
      }
      
      const updatedHistory = [...history, message]
      
      // Keep only last 100 messages to prevent storage bloat
      if (updatedHistory.length > 100) {
        updatedHistory.splice(0, updatedHistory.length - 100)
      }
      
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('Error saving chat message:', error)
    }
  }
  
  /**
   * Load chat history
   * @returns {Array} Chat messages
   */
  export const loadChatHistory = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error loading chat history:', error)
      return []
    }
  }
  
  /**
   * Clear chat history
   */
  export const clearChatHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY)
      return true
    } catch (error) {
      console.error('Error clearing chat history:', error)
      return false
    }
  }
  
  /**
   * API Usage Tracking Functions
   */
  
  /**
   * Track API usage for analytics and rate limiting
   * @param {string} operation - Type of operation
   */
  export const trackApiUsage = (operation) => {
    try {
      const stats = getApiUsageStats()
      const today = new Date().toDateString()
      
      if (!stats[today]) {
        stats[today] = {}
      }
      
      if (!stats[today][operation]) {
        stats[today][operation] = 0
      }
      
      stats[today][operation]++
      stats.totalRequests = (stats.totalRequests || 0) + 1
      stats.lastRequest = new Date().toISOString()
      
      localStorage.setItem(STORAGE_KEYS.API_USAGE_STATS, JSON.stringify(stats))
    } catch (error) {
      console.error('Error tracking API usage:', error)
    }
  }
  
  /**
   * Get API usage statistics
   * @returns {Object} Usage statistics
   */
  export const getApiUsageStats = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.API_USAGE_STATS)
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error('Error getting API usage stats:', error)
      return {}
    }
  }
  
  /**
   * Enhanced Utility Functions
   */
  
  /**
   * Check if data is stale (older than 24 hours)
   * @param {string} timestamp - ISO timestamp
   * @returns {boolean} Whether data is stale
   */
  export const isDataStale = (timestamp) => {
    if (!timestamp) return true
    const age = Date.now() - new Date(timestamp).getTime()
    return age > (24 * 60 * 60 * 1000) // 24 hours
  }
  
  /**
   * Generate enhanced mock recommendations with better data
   * @param {Object} assessmentAnswers - User's answers
   * @returns {Array} Enhanced mock recommendations
   */
  export const generateEnhancedMockRecommendations = (assessmentAnswers) => {
    const mockCareers = getCareerDatabase()
    
    // Simple compatibility calculation
    const recommendations = mockCareers.map((career, index) => {
      const compatibility = calculateBasicCompatibility(assessmentAnswers, career)
      
      return {
        ...career,
        compatibility,
        generatedDate: new Date().toISOString(),
        isAiGenerated: false,
        rank: index + 1,
        matchReasons: generateBasicMatchReasons(assessmentAnswers, career)
      }
    })
    
    // Sort by compatibility and return top 8
    return recommendations
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, 8)
  }
  
  /**
   * Calculate basic compatibility for mock data
   * @param {Object} answers - User answers
   * @param {Object} career - Career data
   * @returns {number} Compatibility score
   */
  const calculateBasicCompatibility = (answers, career) => {
    let score = 60 // Base score
    
    // Skills matching
    if (answers.technical_skills && career.requirements?.requiredSkills) {
      const matches = answers.technical_skills.filter(skill => 
        career.requirements.requiredSkills.includes(skill)
      ).length
      score += (matches / career.requirements.requiredSkills.length) * 20
    }
    
    // Interests matching
    if (answers.work_areas && career.requirements?.industries) {
      const matches = answers.work_areas.filter(area => 
        career.requirements.industries.includes(area)
      ).length
      score += (matches / career.requirements.industries.length) * 15
    }
    
    // Add some randomness for variety
    score += Math.random() * 10 - 5
    
    return Math.min(Math.max(Math.round(score), 55), 95)
  }
  
  /**
   * Generate basic match reasons for mock data
   * @param {Object} answers - User answers
   * @param {Object} career - Career data
   * @returns {Array} Match reasons
   */
  const generateBasicMatchReasons = (answers, career) => {
    const reasons = []
    
    if (answers.technical_skills?.includes('Programming') && career.id === 1) {
      reasons.push('Strong programming aptitude matches this role')
    }
    
    if (answers.work_areas?.includes('Technology')) {
      reasons.push('Aligns with your technology interests')
    }
    
    if (answers.halal_importance >= 4) {
      reasons.push('Career path supports Islamic values')
    }
    
    reasons.push('Growth potential matches your career goals')
    
    return reasons.slice(0, 4)
  }
  
  /**
   * Real-time Data Validation
   */
  
  /**
   * Validate API response data
   * @param {Object} data - API response data
   * @returns {Object} Validation result
   */
  export const validateApiResponse = (data) => {
    const errors = []
    
    if (!data) {
      errors.push('No data received from API')
      return { isValid: false, errors }
    }
    
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (!item.title) errors.push(`Item ${index}: Missing title`)
        if (!item.compatibility || item.compatibility < 0 || item.compatibility > 100) {
          errors.push(`Item ${index}: Invalid compatibility score`)
        }
      })
    } else {
      if (!data.compatibility) errors.push('Missing compatibility score')
      if (!data.matchReasons) errors.push('Missing match reasons')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  /**
   * Export Functions (Enhanced)
   */
  
  /**
   * Export comprehensive career data including AI insights
   * @param {Array} careers - Careers to export
   * @param {string} format - Export format
   * @returns {string} Exported data
   */
  export const exportComprehensiveCareerData = (careers, format = 'csv') => {
    const enhancedCareers = careers.map(career => ({
      ...career,
      aiGenerated: career.isAiGenerated ? 'Yes' : 'No',
      exportDate: new Date().toISOString(),
      islamicAlignment: career.islamicPerspective?.alignment || 'Not specified'
    }))
    
    if (format === 'csv') {
      const headers = [
        'Title', 'Compatibility', 'Industry', 'Salary Range', 'Growth', 
        'AI Generated', 'Islamic Alignment', 'Generated Date', 'Description'
      ]
      
      const rows = enhancedCareers.map(career => [
        career.title,
        `${career.compatibility}%`,
        career.industry,
        career.salaryRange,
        career.growth,
        career.aiGenerated,
        career.islamicAlignment,
        career.generatedDate ? new Date(career.generatedDate).toLocaleDateString() : 'N/A',
        `"${career.description?.replace(/"/g, '""') || ''}"`
      ])
      
      return [headers, ...rows].map(row => row.join(',')).join('\n')
    }
    
    return JSON.stringify(enhancedCareers, null, 2)
  }
  
  // Note: This file contains all career utility functions
  
  // Mock career database remains the same but enhanced
  export const getEnhancedCareerDatabase = () => [
    {
      id: 1,
      title: 'Software Engineering',
      description: 'Design and develop software applications that solve real-world problems',
      industry: 'Technology',
      salaryRange: '$75,000 - $150,000',
      growth: 'Very High',
      workEnvironment: 'Office/Remote',
      educationRequired: "Bachelor's in Computer Science or related field",
      islamicPerspective: {
        alignment: 'High',
        description: 'Technology can be used to benefit humanity and serve Allah through innovation',
        considerations: 'Ensure your work contributes positively to society and avoid haram industries'
      },
      requirements: {
        requiredSkills: ['Programming', 'Problem Solving', 'Logical Thinking'],
        softSkills: ['Creativity', 'Teamwork', 'Communication'],
        industries: ['Technology'],
        values: ['Creative freedom', 'Career growth', 'Making a difference'],
        workStyle: 'Hybrid',
        islamicAlignment: 4
      },
      skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Creativity'],
      companies: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'],
      jobTitles: ['Software Developer', 'Full Stack Engineer', 'Frontend Developer', 'Backend Developer'],
      nextSteps: [
        'Learn programming fundamentals (Python, JavaScript)',
        'Build a portfolio of personal projects',
        'Contribute to open-source projects',
        'Network with software developers',
        'Consider coding bootcamps or CS degree'
      ]
    },
    // Add more enhanced career data as needed...
  ]
  
  /**
   * Career Data Management Functions
   */
  
  /**
   * Save career assessment data
   * @param {Object} assessmentData - The assessment answers and metadata
   */
  export const saveAssessment = (assessmentData) => {
    try {
      const dataToSave = {
        ...assessmentData,
        completedDate: new Date().toISOString(),
        version: '1.0'
      }
      
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT, JSON.stringify(dataToSave))
      localStorage.setItem(STORAGE_KEYS.LAST_ASSESSMENT_DATE, dataToSave.completedDate)
      
      // Clear draft after saving
      localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_DRAFT)
      
      return true
    } catch (error) {
      console.error('Error saving assessment:', error)
      return false
    }
  }
  
  /**
   * Load career assessment data
   * @returns {Object|null} Assessment data or null if not found
   */
  export const loadAssessment = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error loading assessment:', error)
      return null
    }
  }
  
  /**
   * Save career recommendations
   * @param {Array} recommendations - Array of career recommendations
   */
  export const saveRecommendations = (recommendations) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(recommendations))
      return true
    } catch (error) {
      console.error('Error saving recommendations:', error)
      return false
    }
  }
  
  /**
   * Load career recommendations
   * @returns {Array} Array of career recommendations
   */
  export const loadRecommendations = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error loading recommendations:', error)
      return []
    }
  }
  
  /**
   * Save a career path to saved list
   * @param {Object} career - Career object to save
   */
  export const saveCareerPath = (career) => {
    try {
      const savedPaths = loadSavedPaths()
      const existingIndex = savedPaths.findIndex(path => path.id === career.id)
      
      if (existingIndex === -1) {
        const careerToSave = {
          ...career,
          savedDate: new Date().toISOString()
        }
        savedPaths.push(careerToSave)
        localStorage.setItem(STORAGE_KEYS.SAVED_PATHS, JSON.stringify(savedPaths))
        return true
      }
      
      return false // Already saved
    } catch (error) {
      console.error('Error saving career path:', error)
      return false
    }
  }
  
  /**
   * Remove a career path from saved list
   * @param {string|number} careerId - ID of career to remove
   */
  export const removeSavedPath = (careerId) => {
    try {
      const savedPaths = loadSavedPaths()
      const filteredPaths = savedPaths.filter(path => path.id !== careerId)
      localStorage.setItem(STORAGE_KEYS.SAVED_PATHS, JSON.stringify(filteredPaths))
      return true
    } catch (error) {
      console.error('Error removing saved path:', error)
      return false
    }
  }
  
  /**
   * Load saved career paths
   * @returns {Array} Array of saved career paths
   */
  export const loadSavedPaths = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_PATHS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error loading saved paths:', error)
      return []
    }
  }
  
  /**
   * Check if a career is saved
   * @param {string|number} careerId - ID of career to check
   * @returns {boolean} True if career is saved
   */
  export const isCareerSaved = (careerId) => {
    const savedPaths = loadSavedPaths()
    return savedPaths.some(path => path.id === careerId)
  }
  
  /**
   * Save personal notes for a career
   * @param {string|number} careerId - Career ID
   * @param {string} notes - Personal notes
   */
  export const saveCareerNotes = (careerId, notes) => {
    try {
      const allNotes = loadCareerNotes()
      allNotes[careerId] = notes
      localStorage.setItem(STORAGE_KEYS.CAREER_NOTES, JSON.stringify(allNotes))
      return true
    } catch (error) {
      console.error('Error saving career notes:', error)
      return false
    }
  }
  
  /**
   * Load all career notes
   * @returns {Object} Object with career IDs as keys and notes as values
   */
  export const loadCareerNotes = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAREER_NOTES)
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error('Error loading career notes:', error)
      return {}
    }
  }
  
  /**
   * Assessment Scoring and Analysis Functions
   */
  
  /**
   * Calculate compatibility score between user answers and career requirements
   * @param {Object} userAnswers - User's assessment answers
   * @param {Object} careerProfile - Career's requirement profile
   * @returns {number} Compatibility score (0-100)
   */
  export const calculateCompatibilityScore = (userAnswers, careerProfile) => {
    let totalScore = 0
    let maxScore = 0
  
    // Skills matching (30% weight)
    if (userAnswers.technical_skills && careerProfile.requiredSkills) {
      const skillMatches = userAnswers.technical_skills.filter(skill => 
        careerProfile.requiredSkills.includes(skill)
      ).length
      const skillScore = (skillMatches / careerProfile.requiredSkills.length) * 30
      totalScore += skillScore
      maxScore += 30
    }
  
    // Interests matching (25% weight)
    if (userAnswers.work_areas && careerProfile.industries) {
      const interestMatches = userAnswers.work_areas.filter(area => 
        careerProfile.industries.includes(area)
      ).length
      const interestScore = (interestMatches / careerProfile.industries.length) * 25
      totalScore += interestScore
      maxScore += 25
    }
  
    // Values alignment (20% weight)
    if (userAnswers.work_values && careerProfile.values) {
      const valueMatches = userAnswers.work_values.filter(value => 
        careerProfile.values.includes(value)
      ).length
      const valueScore = (valueMatches / careerProfile.values.length) * 20
      totalScore += valueScore
      maxScore += 20
    }
  
    // Work environment fit (15% weight)
    if (userAnswers.work_style === careerProfile.workStyle) {
      totalScore += 15
    }
    maxScore += 15
  
    // Islamic alignment (10% weight)
    if (userAnswers.halal_importance && careerProfile.islamicAlignment) {
      const alignmentScore = (careerProfile.islamicAlignment / 5) * userAnswers.halal_importance * 2
      totalScore += alignmentScore
      maxScore += 10
    }
  
    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
  }
  
  /**
   * Generate career recommendations based on assessment answers
   * @param {Object} assessmentAnswers - User's assessment answers
   * @returns {Array} Array of recommended careers with scores
   */
  export const generateCareerRecommendations = (assessmentAnswers) => {
    const careerDatabase = getCareerDatabase()
    
    const recommendations = careerDatabase.map(career => {
      const compatibility = calculateCompatibilityScore(assessmentAnswers, career.requirements)
      const matchReasons = generateMatchReasons(assessmentAnswers, career)
      
      return {
        ...career,
        compatibility,
        matchReasons,
        generatedDate: new Date().toISOString()
      }
    })
  
    // Sort by compatibility score and return top matches
    return recommendations
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, 10) // Return top 10 matches
  }
  
  /**
   * Generate explanations for why a career matches the user
   * @param {Object} userAnswers - User's assessment answers
   * @param {Object} career - Career object
   * @returns {Array} Array of match reason strings
   */
  export const generateMatchReasons = (userAnswers, career) => {
    const reasons = []
  
    // Skill-based reasons
    if (userAnswers.technical_skills && career.requirements.requiredSkills) {
      const matchingSkills = userAnswers.technical_skills.filter(skill => 
        career.requirements.requiredSkills.includes(skill)
      )
      if (matchingSkills.length > 0) {
        reasons.push(`Strong match in ${matchingSkills.slice(0, 2).join(' and ')} skills`)
      }
    }
  
    // Interest-based reasons
    if (userAnswers.work_areas && career.requirements.industries) {
      const matchingInterests = userAnswers.work_areas.filter(area => 
        career.requirements.industries.includes(area)
      )
      if (matchingInterests.length > 0) {
        reasons.push(`Aligns with your interest in ${matchingInterests[0]}`)
      }
    }
  
    // Soft skills
    if (userAnswers.soft_skills && career.requirements.softSkills) {
      const matchingSoftSkills = userAnswers.soft_skills.filter(skill => 
        career.requirements.softSkills.includes(skill)
      )
      if (matchingSoftSkills.length > 0) {
        reasons.push(`Your ${matchingSoftSkills[0].toLowerCase()} skills are valuable here`)
      }
    }
  
    // Work style
    if (userAnswers.work_style === career.requirements.workStyle) {
      reasons.push(`Matches your preferred work style`)
    }
  
    // Islamic values
    if (userAnswers.halal_importance >= 4 && career.islamicPerspective?.alignment === 'High') {
      reasons.push(`Strongly aligns with Islamic values`)
    }
  
    return reasons.slice(0, 4) // Return top 4 reasons
  }
  
  /**
   * Filtering and Sorting Functions
   */
  
  /**
   * Filter careers by various criteria
   * @param {Array} careers - Array of careers to filter
   * @param {Object} filters - Filter criteria object
   * @returns {Array} Filtered array of careers
   */
  export const filterCareers = (careers, filters) => {
    let filtered = [...careers]
  
    if (filters.minCompatibility) {
      filtered = filtered.filter(career => career.compatibility >= filters.minCompatibility)
    }
  
    if (filters.industry && filters.industry !== 'all') {
      filtered = filtered.filter(career => 
        career.industry?.toLowerCase().includes(filters.industry.toLowerCase())
      )
    }
  
    if (filters.salaryRange) {
      filtered = filtered.filter(career => {
        const maxSalary = extractMaxSalary(career.salaryRange)
        return maxSalary >= filters.salaryRange
      })
    }
  
    if (filters.growth && filters.growth !== 'all') {
      filtered = filtered.filter(career => career.growth === filters.growth)
    }
  
    if (filters.islamicAlignment && filters.islamicAlignment !== 'all') {
      filtered = filtered.filter(career => 
        career.islamicPerspective?.alignment === filters.islamicAlignment
      )
    }
  
    if (filters.saved === true) {
      const savedIds = loadSavedPaths().map(path => path.id)
      filtered = filtered.filter(career => savedIds.includes(career.id))
    }
  
    return filtered
  }
  
  /**
   * Sort careers by various criteria
   * @param {Array} careers - Array of careers to sort
   * @param {string} sortBy - Sort criteria
   * @returns {Array} Sorted array of careers
   */
  export const sortCareers = (careers, sortBy) => {
    const sorted = [...careers]
  
    switch (sortBy) {
      case 'compatibility':
        return sorted.sort((a, b) => b.compatibility - a.compatibility)
      
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      
      case 'salary':
        return sorted.sort((a, b) => {
          const aSalary = extractMaxSalary(a.salaryRange)
          const bSalary = extractMaxSalary(b.salaryRange)
          return bSalary - aSalary
        })
      
      case 'growth':
        const growthOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
        return sorted.sort((a, b) => (growthOrder[b.growth] || 0) - (growthOrder[a.growth] || 0))
      
      case 'industry':
        return sorted.sort((a, b) => a.industry.localeCompare(b.industry))
      
      case 'savedDate':
        return sorted.sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate))
      
      default:
        return sorted
    }
  }
  
  /**
   * Helper Functions
   */
  
  /**
   * Extract maximum salary from salary range string
   * @param {string} salaryRange - Salary range string like "$50k - $100k"
   * @returns {number} Maximum salary as number
   */
  export const extractMaxSalary = (salaryRange) => {
    if (!salaryRange) return 0
    const matches = salaryRange.match(/\$(\d+)[k,]?\s*-\s*\$(\d+)[k,]?/i)
    if (matches) {
      return parseInt(matches[2]) * (matches[2].includes('k') ? 1000 : 1)
    }
    return 0
  }
  
  /**
   * Format salary range for display
   * @param {number} min - Minimum salary
   * @param {number} max - Maximum salary
   * @returns {string} Formatted salary range
   */
  export const formatSalaryRange = (min, max) => {
    const formatAmount = (amount) => {
      if (amount >= 1000) {
        return `$${Math.round(amount / 1000)}k`
      }
      return `$${amount}`
    }
    
    return `${formatAmount(min)} - ${formatAmount(max)}`
  }
  
  /**
   * Calculate days since last assessment
   * @returns {number} Days since last assessment
   */
  export const daysSinceLastAssessment = () => {
    const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_ASSESSMENT_DATE)
    if (!lastDate) return null
    
    const lastAssessment = new Date(lastDate)
    const today = new Date()
    const diffTime = Math.abs(today - lastAssessment)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  
  /**
   * Export career data to different formats
   * @param {Array} careers - Careers to export
   * @param {string} format - Export format ('csv', 'json')
   * @returns {string} Exported data as string
   */
  export const exportCareerData = (careers, format = 'csv') => {
    if (format === 'csv') {
      const headers = ['Title', 'Compatibility', 'Industry', 'Salary Range', 'Growth', 'Description']
      const rows = careers.map(career => [
        career.title,
        `${career.compatibility}%`,
        career.industry,
        career.salaryRange,
        career.growth,
        `"${career.description?.replace(/"/g, '""') || ''}"`
      ])
      
      return [headers, ...rows].map(row => row.join(',')).join('\n')
    }
    
    if (format === 'json') {
      return JSON.stringify(careers, null, 2)
    }
    
    return ''
  }
  
  /**
   * Validate assessment answers
   * @param {Object} answers - Assessment answers to validate
   * @returns {Object} Validation result with isValid and errors
   */
  export const validateAssessmentAnswers = (answers) => {
    const errors = []
    const requiredFields = [
      'age_range',
      'education_level',
      'technical_skills',
      'soft_skills',
      'work_areas',
      'work_values',
      'halal_importance'
    ]
  
    requiredFields.forEach(field => {
      if (!answers[field] || (Array.isArray(answers[field]) && answers[field].length === 0)) {
        errors.push(`${field.replace('_', ' ')} is required`)
      }
    })
  
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  /**
   * Mock Career Database
   * In a real application, this would come from an API
   */
  export const getCareerDatabase = () => [
    {
      id: 1,
      title: 'Software Engineering',
      description: 'Design and develop software applications that solve real-world problems',
      industry: 'Technology',
      salaryRange: '$75,000 - $150,000',
      growth: 'Very High',
      workEnvironment: 'Office/Remote',
      educationRequired: "Bachelor's in Computer Science or related field",
      islamicPerspective: {
        alignment: 'High',
        description: 'Technology can be used to benefit humanity and serve Allah through innovation',
        considerations: 'Ensure your work contributes positively to society and avoid haram industries'
      },
      requirements: {
        requiredSkills: ['Programming', 'Problem Solving', 'Logical Thinking'],
        softSkills: ['Creativity', 'Teamwork', 'Communication'],
        industries: ['Technology'],
        values: ['Creative freedom', 'Career growth', 'Making a difference'],
        workStyle: 'Hybrid',
        islamicAlignment: 4
      },
      skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Creativity'],
      companies: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'],
      jobTitles: ['Software Developer', 'Full Stack Engineer', 'Frontend Developer', 'Backend Developer'],
      nextSteps: [
        'Learn programming fundamentals (Python, JavaScript)',
        'Build a portfolio of personal projects',
        'Contribute to open-source projects',
        'Network with software developers',
        'Consider coding bootcamps or CS degree'
      ]
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Extract insights from complex data to drive business decisions and discoveries',
      industry: 'Technology/Analytics',
      salaryRange: '$85,000 - $160,000',
      growth: 'Very High',
      workEnvironment: 'Office/Remote',
      educationRequired: "Bachelor's in Statistics, Mathematics, or related field",
      islamicPerspective: {
        alignment: 'High',
        description: 'Use data to uncover truth and solve real-world problems',
        considerations: 'Ensure data is used ethically and for beneficial purposes'
      },
      requirements: {
        requiredSkills: ['Data Analysis', 'Programming', 'Research'],
        softSkills: ['Critical Thinking', 'Problem Solving', 'Communication'],
        industries: ['Technology', 'Science'],
        values: ['Making a difference', 'Career growth'],
        workStyle: 'Office-based',
        islamicAlignment: 4
      },
      skills: ['Statistics', 'Programming', 'Machine Learning', 'Data Visualization'],
      companies: ['Netflix', 'Uber', 'Airbnb', 'LinkedIn', 'Spotify'],
      jobTitles: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Research Scientist'],
      nextSteps: [
        'Master Python and R programming',
        'Learn machine learning algorithms',
        'Complete data science projects',
        'Obtain relevant certifications',
        'Build a data portfolio'
      ]
    }
    // Add more careers as needed...
  ]
  
  /**
   * Islamic Career Guidance Functions
   */
  
  /**
   * Get Islamic perspective for career choices
   * @param {string} industry - Industry name
   * @returns {Object} Islamic guidance object
   */
  export const getIslamicCareerGuidance = (industry) => {
    const guidance = {
      'Technology': {
        permissibility: 'Generally Permissible',
        benefits: ['Innovation for humanity', 'Educational advancement', 'Global connectivity'],
        considerations: ['Avoid developing harmful content', 'Ensure privacy protection', 'Consider societal impact']
      },
      'Healthcare': {
        permissibility: 'Highly Recommended',
        benefits: ['Saving lives', 'Relieving suffering', 'Serving community'],
        considerations: ['Maintain ethical standards', 'Respect patient dignity', 'Continue learning']
      },
      'Education': {
        permissibility: 'Highly Recommended',
        benefits: ['Spreading knowledge', 'Character building', 'Community development'],
        considerations: ['Teach with wisdom', 'Be just and fair', 'Continuous self-improvement']
      },
      'Finance': {
        permissibility: 'Conditional',
        benefits: ['Economic development', 'Poverty alleviation', 'Resource allocation'],
        considerations: ['Avoid riba (interest)', 'Ensure halal investments', 'Practice ethical finance']
      }
    }
  
    return guidance[industry] || {
      permissibility: 'Requires Research',
      benefits: ['Potential for positive impact'],
      considerations: ['Research Islamic compatibility', 'Consult with scholars', 'Consider societal benefit']
    }
  }
  
  /**
   * Progress Tracking Functions
   */
  
  /**
   * Calculate user progress through career exploration
   * @returns {Object} Progress metrics
   */
  export const calculateCareerProgress = () => {
    const assessment = loadAssessment()
    const savedPaths = loadSavedPaths()
    const recommendations = loadRecommendations()
  
    return {
      assessmentCompleted: !!assessment,
      pathsExplored: recommendations.length,
      pathsSaved: savedPaths.length,
      lastActivity: assessment?.completedDate || null,
      completionPercentage: assessment ? 75 : 25 // Simple calculation
    }
  }