/**
 * Groq API Client
 * 
 * Real-time AI integration for career recommendations using Groq's lightning-fast inference
 * Handles authentication, prompt engineering, and response processing
 */

// Groq API Configuration
const GROQ_API_CONFIG = {
    model: 'llama-3.1-8b-instant', // Fast Llama model for career advice
    maxTokens: 4000,
    temperature: 0.7
  }
  
  /**
   * Groq API Client Class
   */
  class GroqClient {
    constructor() {
      this.apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || localStorage.getItem('groq_api_key')
      this.groq = null
    }
  
    /**
     * Initialize Groq client
     */
    async initializeClient() {
      if (!this.apiKey) {
        throw new Error('Groq API key not configured. Please set your API key.')
      }
  
      try {
        // Dynamic import for client-side compatibility
        const { default: Groq } = await import('groq-sdk')
        this.groq = new Groq({
          apiKey: this.apiKey,
          dangerouslyAllowBrowser: true // Enable browser usage
        })
        return this.groq
      } catch (error) {
        console.error('Failed to initialize Groq client:', error)
        throw new Error('Failed to initialize AI client. Please check your setup.')
      }
    }
  
    /**
     * Set API key (for client-side usage)
     * @param {string} apiKey - Groq API key
     */
    setApiKey(apiKey) {
      this.apiKey = apiKey
      localStorage.setItem('groq_api_key', apiKey)
      this.groq = null // Reset client to use new key
    }
  
    /**
     * Make API call to Groq
     * @param {Array} messages - Chat messages array
     * @returns {Promise<Object>} API response
     */
    async makeRequest(messages) {
      if (!this.groq) {
        await this.initializeClient()
      }
  
      try {
        const completion = await this.groq.chat.completions.create({
          model: GROQ_API_CONFIG.model,
          messages: messages,
          max_tokens: GROQ_API_CONFIG.maxTokens,
          temperature: GROQ_API_CONFIG.temperature,
          top_p: 1,
          stream: false
        })
  
        return completion
      } catch (error) {
        console.error('Groq API request failed:', error)
        
        // Handle specific error cases
        if (error.status === 401) {
          throw new Error('Invalid API key. Please check your Groq API key.')
        } else if (error.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.')
        } else if (error.status === 403) {
          throw new Error('API access forbidden. Please check your account status.')
        } else {
          throw new Error(`Groq API Error: ${error.message || 'Unknown error'}`)
        }
      }
    }
  
    /**
     * Generate career recommendations based on assessment data
     * @param {Object} assessmentData - User's assessment answers
     * @returns {Promise<Array>} Career recommendations
     */
    async generateCareerRecommendations(assessmentData) {
      const prompt = this.buildCareerRecommendationPrompt(assessmentData)
      
      try {
        const response = await this.makeRequest([
          {
            role: "system",
            content: `You are an expert career counselor with deep knowledge of Islamic principles and values. You help Muslim professionals find careers that align with their skills, interests, and faith. Always provide practical, actionable advice while considering Islamic perspectives on work and career choices. You respond in structured JSON format only.`
          },
          {
            role: "user",
            content: prompt
          }
        ])
  
        const aiResponse = response.choices[0]?.message?.content
        if (!aiResponse) {
          throw new Error('No response from Groq API')
        }
  
        return this.parseCareerRecommendations(aiResponse, assessmentData)
      } catch (error) {
        console.error('Error generating career recommendations:', error)
        throw error
      }
    }
  
    /**
     * Analyze career compatibility for a specific career
     * @param {Object} assessmentData - User's assessment data
     * @param {string} careerTitle - Career to analyze
     * @returns {Promise<Object>} Detailed compatibility analysis
     */
    async analyzeCareerCompatibility(assessmentData, careerTitle) {
      const prompt = `
      You are an expert career analyst. Analyze the compatibility between this user profile and the career "${careerTitle}".
  
      User Profile:
      ${JSON.stringify(assessmentData, null, 2)}
  
      Provide a detailed analysis in EXACTLY this JSON format (no additional text):
      {
        "compatibility": number (0-100),
        "matchReasons": [
          "reason 1",
          "reason 2", 
          "reason 3",
          "reason 4"
        ],
        "challenges": [
          "challenge 1",
          "challenge 2",
          "challenge 3"
        ],
        "islamicPerspective": {
          "alignment": "High|Medium|Low",
          "description": "detailed description of Islamic alignment",
          "considerations": "important Islamic considerations"
        },
        "nextSteps": [
          "step 1",
          "step 2",
          "step 3",
          "step 4",
          "step 5"
        ]
      }
  
      Ensure all JSON fields are properly filled with realistic, helpful content.
      `
  
      try {
        const response = await this.makeRequest([
          {
            role: "system",
            content: "You are an expert career counselor. Provide detailed, accurate career analysis in valid JSON format only. No additional text outside the JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ])
  
        const aiResponse = response.choices[0]?.message?.content
        
        // Extract and parse JSON from response
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
          throw new Error('Invalid response format from AI')
        }
  
        return JSON.parse(jsonMatch[0])
      } catch (error) {
        console.error('Error analyzing career compatibility:', error)
        throw error
      }
    }
  
    /**
     * Get personalized career advice
     * @param {Object} assessmentData - User's assessment data
     * @param {string} question - Specific question about career
     * @returns {Promise<string>} AI-generated advice
     */
    async getCareerAdvice(assessmentData, question) {
      const prompt = `
      Based on this user's profile, provide personalized career advice for their question.
  
      User Profile:
      - Age: ${assessmentData.age_range || 'Not specified'}
      - Education: ${assessmentData.education_level || 'Not specified'}
      - Technical Skills: ${assessmentData.technical_skills?.join(', ') || 'Not specified'}
      - Interests: ${assessmentData.work_areas?.join(', ') || 'Not specified'}
      - Values: ${assessmentData.work_values?.join(', ') || 'Not specified'}
      - Islamic Values Importance: ${assessmentData.halal_importance || 'Not specified'}/5
      - Work Style: ${assessmentData.work_style || 'Not specified'}
  
      Question: ${question}
  
      Please provide thoughtful, practical advice (2-3 paragraphs) that considers both career development and Islamic principles. Be specific and actionable.
      `
  
      try {
        const response = await this.makeRequest([
          {
            role: "system",
            content: "You are a wise career counselor who understands both professional development and Islamic values. Provide practical, compassionate advice in a conversational tone."
          },
          {
            role: "user",
            content: prompt
          }
        ])
  
        return response.choices[0]?.message?.content
      } catch (error) {
        console.error('Error getting career advice:', error)
        throw error
      }
    }
  
    /**
     * Build comprehensive prompt for career recommendations
     * @param {Object} assessmentData - User's assessment data
     * @returns {string} Formatted prompt
     */
    buildCareerRecommendationPrompt(assessmentData) {
      return `
      Analyze this career assessment and provide 6-8 personalized career recommendations in JSON format.
  
      ASSESSMENT DATA:
      Personal Information:
      - Age Range: ${assessmentData.age_range || 'Not specified'}
      - Education Level: ${assessmentData.education_level || 'Not specified'}
      - Experience Level: ${assessmentData.experience_level || 'Not specified'}
  
      Skills & Abilities:
      - Technical Skills: ${assessmentData.technical_skills?.join(', ') || 'Not specified'}
      - Soft Skills: ${assessmentData.soft_skills?.join(', ') || 'Not specified'}
      - Learning Preference: ${assessmentData.learning_preference || 'Not specified'}
  
      Interests & Passions:
      - Work Areas: ${assessmentData.work_areas?.join(', ') || 'Not specified'}
      - Enjoyed Activities: ${assessmentData.activities?.join(', ') || 'Not specified'}
      - Passion Importance: ${assessmentData.passion_level || 'Not specified'}/5
  
      Work Values:
      - Top Values: ${Array.isArray(assessmentData.work_values) ? assessmentData.work_values.slice(0, 4).join(', ') : 'Not specified'}
      - Company Size Preference: ${assessmentData.company_size || 'Not specified'}
      - Social Impact Importance: ${assessmentData.impact_importance || 'Not specified'}/5
  
      Islamic Values:
      - Halal Work Importance: ${assessmentData.halal_importance || 'Not specified'}/5
      - Preferred Islamic Values: ${assessmentData.islamic_values?.join(', ') || 'Not specified'}
      - Ummah Service Importance: ${assessmentData.ummah_service || 'Not specified'}/5
  
      Work Environment:
      - Work Style: ${assessmentData.work_style || 'Not specified'}
      - Collaboration Preference: ${assessmentData.collaboration || 'Not specified'}
      - Schedule Preference: ${assessmentData.schedule_preference || 'Not specified'}
  
      Respond with ONLY valid JSON in this exact format:
      {
        "recommendations": [
          {
            "id": 1,
            "title": "Career Title",
            "description": "Brief description of the career",
            "industry": "Industry name", 
            "compatibility": 85,
            "salaryRange": "$XX,000 - $XX,000",
            "growth": "Very High|High|Medium|Low",
            "workEnvironment": "Office|Remote|Hybrid|Field",
            "educationRequired": "Education requirements",
            "matchReasons": [
              "Specific reason 1",
              "Specific reason 2", 
              "Specific reason 3",
              "Specific reason 4"
            ],
            "islamicPerspective": {
              "alignment": "High|Medium|Low",
              "description": "How this career aligns with Islamic values",
              "considerations": "Important Islamic considerations"
            },
            "skills": ["skill1", "skill2", "skill3", "skill4"],
            "companies": ["Company1", "Company2", "Company3", "Company4"],
            "jobTitles": ["Title1", "Title2", "Title3", "Title4"],
            "nextSteps": [
              "Actionable step 1",
              "Actionable step 2",
              "Actionable step 3", 
              "Actionable step 4",
              "Actionable step 5"
            ]
          }
        ]
      }
  
      Requirements:
      - Provide exactly 6-8 career recommendations
      - Compatibility scores should be realistic (60-95 range)
      - Include diverse career paths across different industries
      - Consider Islamic principles for each recommendation
      - Ensure all fields are properly filled
      - Response must be valid JSON only, no additional text
      `
    }
  
    /**
     * Parse AI response and format career recommendations
     * @param {string} aiResponse - Raw AI response
     * @param {Object} assessmentData - Original assessment data
     * @returns {Array} Formatted career recommendations
     */
    parseCareerRecommendations(aiResponse, assessmentData) {
      try {
        // Clean the response and extract JSON
        let cleanResponse = aiResponse.trim()
        
        // Remove any markdown formatting
        cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '')
        
        // Find JSON object
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
          throw new Error('No valid JSON found in AI response')
        }
  
        const parsedResponse = JSON.parse(jsonMatch[0])
        const recommendations = parsedResponse.recommendations || []
  
        if (recommendations.length === 0) {
          throw new Error('No recommendations found in response')
        }
  
        // Add metadata and ensure all required fields
        return recommendations.map((career, index) => ({
          ...career,
          id: career.id || Date.now() + index,
          generatedDate: new Date().toISOString(),
          assessmentId: this.generateAssessmentId(assessmentData),
          isAiGenerated: true,
          // Ensure all required fields have defaults
          compatibility: Math.max(60, Math.min(95, career.compatibility || 75)),
          description: career.description || 'AI-recommended career path',
          industry: career.industry || 'Various',
          salaryRange: career.salaryRange || 'Competitive',
          growth: career.growth || 'Medium',
          workEnvironment: career.workEnvironment || 'Office',
          educationRequired: career.educationRequired || 'Varies by position',
          matchReasons: career.matchReasons || ['AI analysis indicates good fit'],
          islamicPerspective: career.islamicPerspective || {
            alignment: 'Medium',
            description: 'Consider Islamic principles when pursuing this career',
            considerations: 'Ensure work aligns with Islamic values'
          },
          skills: career.skills || [],
          companies: career.companies || [],
          jobTitles: career.jobTitles || [],
          nextSteps: career.nextSteps || ['Research the field further']
        }))
      } catch (error) {
        console.error('Error parsing AI recommendations:', error)
        // Return fallback recommendations
        return this.getFallbackRecommendations(assessmentData)
      }
    }
  
    /**
     * Generate unique assessment ID for tracking
     * @param {Object} assessmentData - Assessment data
     * @returns {string} Unique ID
     */
    generateAssessmentId(assessmentData) {
      const dataString = JSON.stringify(assessmentData)
      return btoa(dataString).slice(0, 16) + Date.now().toString(36)
    }
  
    /**
     * Fallback recommendations if AI fails
     * @param {Object} assessmentData - Assessment data
     * @returns {Array} Basic recommendations
     */
    getFallbackRecommendations(assessmentData) {
      const fallbackCareers = [
        {
          id: 1,
          title: 'Software Development',
          description: 'Build applications and systems that solve real-world problems',
          industry: 'Technology',
          compatibility: 82,
          salaryRange: '$70,000 - $130,000',
          growth: 'Very High',
          workEnvironment: 'Hybrid',
          educationRequired: "Bachelor's degree or bootcamp",
          matchReasons: ['Strong problem-solving skills', 'Technology interest', 'Logical thinking', 'Creative potential'],
          islamicPerspective: {
            alignment: 'High',
            description: 'Technology can benefit humanity and advance knowledge',
            considerations: 'Ensure projects serve beneficial purposes'
          },
          skills: ['Programming', 'Problem Solving', 'Logic', 'Creativity'],
          companies: ['Microsoft', 'Google', 'Meta', 'Apple'],
          jobTitles: ['Software Engineer', 'Developer', 'Programmer', 'Full Stack Engineer'],
          nextSteps: ['Learn a programming language', 'Build portfolio projects', 'Join coding communities', 'Practice algorithms', 'Apply for entry positions']
        },
        {
          id: 2,
          title: 'Data Analysis',
          description: 'Extract insights from data to drive business decisions',
          industry: 'Analytics',
          compatibility: 78,
          salaryRange: '$60,000 - $110,000',
          growth: 'High',
          workEnvironment: 'Office/Remote',
          educationRequired: "Bachelor's in related field",
          matchReasons: ['Analytical mindset', 'Attention to detail', 'Research skills', 'Mathematical aptitude'],
          islamicPerspective: {
            alignment: 'High',
            description: 'Data analysis seeks truth and supports informed decisions',
            considerations: 'Ensure data is used ethically and beneficially'
          },
          skills: ['Statistics', 'Excel', 'SQL', 'Critical Thinking'],
          companies: ['Amazon', 'Netflix', 'Uber', 'LinkedIn'],
          jobTitles: ['Data Analyst', 'Business Analyst', 'Research Analyst', 'BI Analyst'],
          nextSteps: ['Learn Excel and SQL', 'Study statistics', 'Complete online courses', 'Build analysis portfolio', 'Apply for analyst roles']
        }
      ]
  
      return fallbackCareers
    }
  
    /**
     * Test API connection
     * @returns {Promise<boolean>} Connection status
     */
    async testConnection() {
      try {
        const response = await this.makeRequest([
          {
            role: "user",
            content: "Please respond with exactly: 'API connection successful' to test the connection."
          }
        ])
  
        const content = response.choices?.[0]?.message?.content || ''
        return content.toLowerCase().includes('api connection successful')
      } catch (error) {
        console.error('API connection test failed:', error)
        return false
      }
    }
  }
  
  // Export singleton instance
  export const groqClient = new GroqClient()
  
  // Export configuration and utilities
  export { GROQ_API_CONFIG }
  
  /**
   * Helper function to check if API is configured
   * @returns {boolean} Configuration status
   */
  export const isGroqConfigured = () => {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || localStorage.getItem('groq_api_key')
    return !!apiKey
  }
  
  /**
   * Helper function to get stored API key
   * @returns {string|null} API key
   */
  export const getStoredApiKey = () => {
    return process.env.NEXT_PUBLIC_GROQ_API_KEY || localStorage.getItem('groq_api_key')
  }
  
  /**
   * Error handling for common API issues
   */
  export class GroqAPIError extends Error {
    constructor(message, code, details) {
      super(message)
      this.name = 'GroqAPIError'
      this.code = code
      this.details = details
    }
  }
  
  /**
   * Rate limiting handler for Groq API
   */
  export class RateLimitHandler {
    constructor() {
      this.requests = []
      this.maxRequests = 30 // Groq free tier: 30 requests per minute
      this.timeWindow = 60 * 1000 // 1 minute in ms
    }
  
    canMakeRequest() {
      const now = Date.now()
      // Remove old requests outside time window
      this.requests = this.requests.filter(time => now - time < this.timeWindow)
      
      return this.requests.length < this.maxRequests
    }
  
    recordRequest() {
      this.requests.push(Date.now())
    }
  
    getTimeUntilReset() {
      if (this.requests.length === 0) return 0
      const oldestRequest = Math.min(...this.requests)
      return Math.max(0, this.timeWindow - (Date.now() - oldestRequest))
    }
  
    getRemainingRequests() {
      const now = Date.now()
      this.requests = this.requests.filter(time => now - time < this.timeWindow)
      return Math.max(0, this.maxRequests - this.requests.length)
    }
  }
  
