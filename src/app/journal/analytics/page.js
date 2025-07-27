'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HiOutlineChartBarSquare,
  HiOutlineArrowLeft,
  HiOutlineSparkles,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineCalendarDays,
  HiOutlineHeart,
  HiOutlineBolt,
  HiOutlineHandHeart,
  HiOutlineSun,
  HiOutlineRefreshCcw,
  HiOutlineDownload,
  HiOutlineAdjustmentsHorizontal
} from 'react-icons/hi2'
import { FiTrendingUp, FiTrendingDown, FiActivity, FiCalendar, FiFilter, FiHeart, FiRefreshCw } from 'react-icons/fi'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ComposedChart
} from 'recharts'

/**
 * Journal Analytics Page
 * 
 * Features:
 * - Comprehensive mood analytics with beautiful charts
 * - Trend analysis and pattern recognition
 * - AI-powered insights and recommendations
 * - Islamic wellness integration
 * - Exportable reports
 * - Interactive filtering and time ranges
 * - Competitive visualization quality
 */
export default function JournalAnalyticsPage() {
  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])
  const [timeRange, setTimeRange] = useState('30days') // 7days, 30days, 90days, 1year
  const [selectedMetrics, setSelectedMetrics] = useState(['mood', 'energy'])
  const [aiInsights, setAiInsights] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [hasApiKey, setHasApiKey] = useState(false)

  // Load data on component mount
  useEffect(() => {
    loadAnalyticsData()
    checkApiAvailability()
  }, [timeRange])

  /**
   * Load and process analytics data
   */
  const loadAnalyticsData = () => {
    try {
      const allEntries = JSON.parse(localStorage.getItem('mood_journal_entries') || '[]')
      
      // Filter by time range
      const filteredEntries = filterEntriesByTimeRange(allEntries, timeRange)
      setEntries(filteredEntries)
      
      // Calculate analytics
      const analyticsData = calculateAnalytics(filteredEntries)
      setAnalytics(analyticsData)
      
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading analytics data:', error)
      setIsLoading(false)
    }
  }

  /**
   * Check API availability for AI insights
   */
  const checkApiAvailability = async () => {
    try {
      const { isGroqConfigured } = await import('@/lib/ai/groq-client')
      const hasApi = isGroqConfigured()
      setHasApiKey(hasApi)
      
      if (hasApi && entries.length > 5) {
        generateAiInsights()
      }
    } catch (error) {
      console.error('Error checking API:', error)
      setHasApiKey(false)
    }
  }

  /**
   * Generate AI insights from mood data
   */
  const generateAiInsights = async () => {
    try {
      const { groqClient } = await import('@/lib/ai/groq-client')
      
      const insightPrompt = `Analyze this emotional data and provide insights in JSON format:

${JSON.stringify(analytics, null, 2)}

Recent entries sample:
${JSON.stringify(entries.slice(-10), null, 2)}

Provide analysis in this JSON format:
{
  "patterns": ["pattern1", "pattern2"],
  "insights": ["insight1", "insight2", "insight3"],
  "recommendations": ["rec1", "rec2", "rec3"],
  "islamicGuidance": "spiritual guidance based on patterns",
  "trends": {
    "improving": ["area1", "area2"],
    "declining": ["area1"],
    "stable": ["area1", "area2"]
  },
  "nextSteps": ["step1", "step2"]
}`

      const response = await groqClient.makeRequest({
        messages: [
          {
            role: "system",
            content: "You are an expert emotional wellness analyst with Islamic counseling knowledge. Analyze mood data and provide actionable insights combining psychological understanding with Islamic wisdom."
          },
          {
            role: "user",
            content: insightPrompt
          }
        ]
      })

      const aiResponse = response.choices[0]?.message?.content
      if (aiResponse) {
        try {
          const cleanResponse = aiResponse.replace(/```json|```/g, '').trim()
          const parsedInsights = JSON.parse(cleanResponse)
          setAiInsights(parsedInsights)
        } catch (parseError) {
          console.error('Error parsing AI insights:', parseError)
        }
      }
    } catch (error) {
      console.error('Error generating AI insights:', error)
    }
  }

  /**
   * Filter entries by time range
   */
  const filterEntriesByTimeRange = (entries, range) => {
    const now = new Date()
    let cutoffDate = new Date()

    switch (range) {
      case '7days':
        cutoffDate.setDate(now.getDate() - 7)
        break
      case '30days':
        cutoffDate.setDate(now.getDate() - 30)
        break
      case '90days':
        cutoffDate.setDate(now.getDate() - 90)
        break
      case '1year':
        cutoffDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        cutoffDate.setDate(now.getDate() - 30)
    }

    return entries
      .filter(entry => new Date(entry.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  /**
   * Calculate comprehensive analytics
   */
  const calculateAnalytics = (entries) => {
    if (entries.length === 0) return null

    // Basic statistics
    const moods = entries.map(e => e.mood).filter(m => m)
    const energies = entries.map(e => e.energy).filter(e => e)
    
    const avgMood = moods.reduce((sum, mood) => sum + mood, 0) / moods.length
    const avgEnergy = energies.reduce((sum, energy) => sum + energy, 0) / energies.length
    
    // Mood distribution
    const moodDistribution = [
      { name: 'Difficult', value: moods.filter(m => m === 1).length, color: '#ef4444' },
      { name: 'Low', value: moods.filter(m => m === 2).length, color: '#f97316' },
      { name: 'Neutral', value: moods.filter(m => m === 3).length, color: '#eab308' },
      { name: 'Good', value: moods.filter(m => m === 4).length, color: '#10b981' },
      { name: 'Joyful', value: moods.filter(m => m === 5).length, color: '#059669' }
    ]

    // Daily trends
    const dailyData = entries.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: entry.date,
      mood: entry.mood || 0,
      energy: entry.energy || 0,
      hasGratitude: entry.gratitude ? 1 : 0,
      activitiesCount: entry.activities?.length || 0
    }))

    // Weekly averages
    const weeklyData = calculateWeeklyAverages(entries)

    // Activity correlation
    const activityCorrelation = calculateActivityMoodCorrelation(entries)

    // Gratitude impact
    const gratitudeImpact = calculateGratitudeImpact(entries)

    // Trend analysis
    const trends = calculateTrends(entries)

    return {
      basic: {
        totalEntries: entries.length,
        avgMood: Number(avgMood.toFixed(1)),
        avgEnergy: Number(avgEnergy.toFixed(1)),
        gratitudeEntries: entries.filter(e => e.gratitude).length,
        streak: calculateCurrentStreak(entries)
      },
      distributions: {
        mood: moodDistribution,
        energy: calculateEnergyDistribution(entries)
      },
      trends: {
        daily: dailyData,
        weekly: weeklyData,
        analysis: trends
      },
      correlations: {
        activities: activityCorrelation,
        gratitude: gratitudeImpact
      }
    }
  }

  /**
   * Calculate weekly averages
   */
  const calculateWeeklyAverages = (entries) => {
    const weeks = {}
    
    entries.forEach(entry => {
      const date = new Date(entry.date)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekKey = weekStart.toISOString().split('T')[0]
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = { moods: [], energies: [], count: 0 }
      }
      
      if (entry.mood) weeks[weekKey].moods.push(entry.mood)
      if (entry.energy) weeks[weekKey].energies.push(entry.energy)
      weeks[weekKey].count++
    })

    return Object.entries(weeks).map(([week, data]) => ({
      week: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      avgMood: data.moods.length > 0 ? Number((data.moods.reduce((a, b) => a + b, 0) / data.moods.length).toFixed(1)) : 0,
      avgEnergy: data.energies.length > 0 ? Number((data.energies.reduce((a, b) => a + b, 0) / data.energies.length).toFixed(1)) : 0,
      entries: data.count
    })).slice(-12) // Last 12 weeks
  }

  /**
   * Calculate activity-mood correlation
   */
  const calculateActivityMoodCorrelation = (entries) => {
    const activityMoods = {}
    
    entries.forEach(entry => {
      if (entry.activities && entry.mood) {
        entry.activities.forEach(activity => {
          if (!activityMoods[activity]) {
            activityMoods[activity] = []
          }
          activityMoods[activity].push(entry.mood)
        })
      }
    })

    return Object.entries(activityMoods)
      .map(([activity, moods]) => ({
        activity,
        avgMood: Number((moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(1)),
        count: moods.length
      }))
      .filter(item => item.count >= 2)
      .sort((a, b) => b.avgMood - a.avgMood)
  }

  /**
   * Calculate gratitude impact
   */
  const calculateGratitudeImpact = (entries) => {
    const withGratitude = entries.filter(e => e.gratitude && e.mood)
    const withoutGratitude = entries.filter(e => !e.gratitude && e.mood)

    if (withGratitude.length === 0 || withoutGratitude.length === 0) return null

    const avgWithGratitude = withGratitude.reduce((sum, e) => sum + e.mood, 0) / withGratitude.length
    const avgWithoutGratitude = withoutGratitude.reduce((sum, e) => sum + e.mood, 0) / withoutGratitude.length

    return {
      withGratitude: Number(avgWithGratitude.toFixed(1)),
      withoutGratitude: Number(avgWithoutGratitude.toFixed(1)),
      difference: Number((avgWithGratitude - avgWithoutGratitude).toFixed(1)),
      gratitudeEntries: withGratitude.length,
      totalEntries: entries.length
    }
  }

  /**
   * Calculate energy distribution
   */
  const calculateEnergyDistribution = (entries) => {
    const energyLevels = entries.map(e => e.energy).filter(e => e)
    return [
      { name: 'Very Low (1)', value: energyLevels.filter(e => e === 1).length, color: '#ef4444' },
      { name: 'Low (2)', value: energyLevels.filter(e => e === 2).length, color: '#f97316' },
      { name: 'Medium (3)', value: energyLevels.filter(e => e === 3).length, color: '#eab308' },
      { name: 'High (4)', value: energyLevels.filter(e => e === 4).length, color: '#10b981' },
      { name: 'Very High (5)', value: energyLevels.filter(e => e === 5).length, color: '#059669' }
    ]
  }

  /**
   * Calculate trends
   */
  const calculateTrends = (entries) => {
    if (entries.length < 4) return null

    const recentEntries = entries.slice(-7)
    const previousEntries = entries.slice(-14, -7)

    if (previousEntries.length === 0) return null

    const recentAvgMood = recentEntries.reduce((sum, e) => sum + (e.mood || 0), 0) / recentEntries.length
    const previousAvgMood = previousEntries.reduce((sum, e) => sum + (e.mood || 0), 0) / previousEntries.length

    const moodTrend = recentAvgMood - previousAvgMood

    return {
      mood: {
        direction: moodTrend > 0.2 ? 'improving' : moodTrend < -0.2 ? 'declining' : 'stable',
        change: Number(moodTrend.toFixed(1))
      }
    }
  }

  /**
   * Calculate current streak
   */
  const calculateCurrentStreak = (entries) => {
    if (entries.length === 0) return 0

    let streak = 0
    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date))
    let checkDate = new Date()

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date)
      entryDate.setHours(0, 0, 0, 0)
      checkDate.setHours(0, 0, 0, 0)

      if (entryDate.getTime() === checkDate.getTime()) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else if (entryDate.getTime() < checkDate.getTime() - 86400000) {
        break
      }
    }

    return streak
  }

  /**
   * Custom tooltip for charts
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neural-800/95 backdrop-blur-xl border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Analyzing your emotional patterns...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gradient-mesh">
        <div className="px-6 py-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <Link href="/journal" className="p-2 glass-morphism rounded-lg text-white/70 hover:text-white transition-colors duration-200">
                <HiOutlineArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-3xl font-bold text-white">Emotion Analytics</h1>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <HiOutlineChartBarSquare className="w-20 h-20 text-white/40 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Not Enough Data</h2>
          <p className="text-white/60 mb-8">
            You need at least a few journal entries to see meaningful analytics. Start tracking your mood to unlock insights!
          </p>
          <Link href="/journal/entry">
            <button className="btn-primary">
              Start Tracking
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <div className="px-6 py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/journal" className="p-2 glass-morphism rounded-lg text-white/70 hover:text-white transition-colors duration-200">
                <HiOutlineArrowLeft className="w-5 h-5" />
              </Link>
              
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Emotion Analytics</h1>
                <p className="text-white/60">Deep insights into your emotional journey</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              {/* Time Range Selector */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 3 Months</option>
                <option value="1year">Last Year</option>
              </select>

              <button
                onClick={loadAnalyticsData}
                className="p-2 glass-morphism rounded-lg text-white/70 hover:text-white transition-colors duration-200"
              >
                <FiRefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-morphism-card rounded-2xl p-6 text-center">
            <HiOutlineHeart className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{analytics.basic.avgMood}</div>
            <div className="text-white/60 text-sm">Average Mood</div>
          </div>

          <div className="glass-morphism-card rounded-2xl p-6 text-center">
            <HiOutlineBolt className="w-12 h-12 text-accent-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{analytics.basic.avgEnergy}</div>
            <div className="text-white/60 text-sm">Average Energy</div>
          </div>

          <div className="glass-morphism-card rounded-2xl p-6 text-center">
            <HiOutlineCalendarDays className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{analytics.basic.totalEntries}</div>
            <div className="text-white/60 text-sm">Total Entries</div>
          </div>

          <div className="glass-morphism-card rounded-2xl p-6 text-center">
            <FiHeart className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{analytics.basic.gratitudeEntries}</div>
            <div className="text-white/60 text-sm">Gratitude Entries</div>
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Mood Trends */}
          <div className="glass-morphism-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Mood & Energy Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={analytics.trends.daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.6)"
                    fontSize={12}
                  />
                  <YAxis 
                    domain={[0, 5]}
                    stroke="rgba(255,255,255,0.6)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    fill="url(#moodGradient)"
                    stroke="#14b8a6"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#a855f7" 
                    strokeWidth={3}
                    dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
                  />
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mood Distribution */}
          <div className="glass-morphism-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Mood Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.distributions.mood}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {analytics.distributions.mood.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Trends */}
        <div className="glass-morphism-card rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Weekly Averages</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.trends.weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="week" 
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <YAxis 
                  domain={[0, 5]}
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avgMood" fill="#14b8a6" name="Avg Mood" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgEnergy" fill="#a855f7" name="Avg Energy" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Correlation & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Correlation */}
          {analytics.correlations.activities.length > 0 && (
            <div className="glass-morphism-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Activity Impact on Mood</h3>
              <div className="space-y-3">
                {analytics.correlations.activities.slice(0, 8).map((activity, index) => (
                  <div key={activity.activity} className="flex items-center justify-between">
                    <span className="text-white/80 capitalize">{activity.activity.replace('_', ' ')}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-white/10 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                          style={{ width: `${(activity.avgMood / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-primary-400 font-semibold text-sm w-8">
                        {activity.avgMood}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Insights */}
          {hasApiKey && aiInsights && (
            <div className="glass-morphism-card rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <HiOutlineSparkles className="w-6 h-6 text-primary-400" />
                <h3 className="text-xl font-bold text-white">AI Insights</h3>
              </div>
              
              <div className="space-y-4">
                {aiInsights.insights?.slice(0, 3).map((insight, index) => (
                  <div key={index} className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3">
                    <p className="text-white/90 text-sm">{insight}</p>
                  </div>
                ))}
                
                {aiInsights.islamicGuidance && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiHeart className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-medium text-sm">Islamic Guidance</span>
                    </div>
                    <p className="text-white/90 text-sm">{aiInsights.islamicGuidance}</p>
                  </div>
                )}

                {aiInsights.recommendations && aiInsights.recommendations.length > 0 && (
                  <div className="bg-secondary-500/10 border border-secondary-500/20 rounded-lg p-4">
                    <h4 className="text-secondary-400 font-medium text-sm mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {aiInsights.recommendations.slice(0, 3).map((rec, index) => (
                        <li key={index} className="text-white/80 text-sm flex items-start space-x-2">
                          <span className="text-secondary-400">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Gratitude Impact */}
        {analytics.correlations.gratitude && (
          <div className="glass-morphism-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">The Power of Gratitude (Shukr)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {analytics.correlations.gratitude.withGratitude}
                </div>
                <div className="text-white/70 text-sm">Avg Mood with Gratitude</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white/60 mb-2">
                  {analytics.correlations.gratitude.withoutGratitude}
                </div>
                <div className="text-white/70 text-sm">Avg Mood without Gratitude</div>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  analytics.correlations.gratitude.difference > 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {analytics.correlations.gratitude.difference > 0 ? '+' : ''}{analytics.correlations.gratitude.difference}
                </div>
                <div className="text-white/70 text-sm">Gratitude Impact</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <p className="text-emerald-300 text-sm italic text-center">
                "And whoever is grateful, is grateful for the benefit of his own self." - Quran 31:12
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}