'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  HiOutlineHeart,
  HiOutlineChartBarSquare,
  HiOutlineCalendarDays,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineSun,
  HiOutlineCloudArrowUp,
  HiOutlineAcademicCap,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineArrowRight
} from 'react-icons/hi2'
import {
  FiCalendar,
  FiTrendingUp,
  FiHeart,
  FiSmile,
  FiMeh,
  FiFrown,
  FiZap,
  FiSun
} from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

/**
 * Emotion Tracker Main Page
 * 
 * Features:
 * - Beautiful dashboard with mood trends
 * - Quick mood entry with Islamic gratitude
 * - AI-powered insights and recommendations
 * - Visual analytics with Recharts
 * - Recent entries timeline
 * - Streak tracking and motivation
 */
export default function JournalPage() {
  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [todaysMood, setTodaysMood] = useState(null)
  const [recentEntries, setRecentEntries] = useState([])
  const [moodTrends, setMoodTrends] = useState([])
  const [weeklyStats, setWeeklyStats] = useState(null)
  const [streak, setStreak] = useState(0)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [aiInsights, setAiInsights] = useState(null)

  // Load data on component mount
  useEffect(() => {
    loadJournalData()
    checkApiAvailability()
  }, [])

  /**
   * Load all journal data from localStorage
   */
  const loadJournalData = () => {
    try {
      // Load all entries
      const entries = JSON.parse(localStorage.getItem('mood_journal_entries') || '[]')

      // Get today's entry
      const today = new Date().toDateString()
      const todayEntry = entries.find(entry =>
        new Date(entry.date).toDateString() === today
      )
      setTodaysMood(todayEntry)

      // Get recent entries (last 7 days)
      const recentEntries = entries
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 7)
      setRecentEntries(recentEntries)

      // Calculate mood trends (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const trendData = entries
        .filter(entry => new Date(entry.date) >= thirtyDaysAgo)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(entry => ({
          date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          mood: entry.mood,
          energy: entry.energy || 3,
          gratitude: entry.gratitude ? 5 : 3
        }))
      setMoodTrends(trendData)

      // Calculate weekly stats
      const weeklyData = calculateWeeklyStats(entries)
      setWeeklyStats(weeklyData)

      // Calculate streak
      const currentStreak = calculateMoodStreak(entries)
      setStreak(currentStreak)

      setIsLoading(false)
    } catch (error) {
      console.error('Error loading journal data:', error)
      setIsLoading(false)
    }
  }

  /**
   * Check if AI is available
   */
  const checkApiAvailability = async () => {
    try {
      const { isGroqConfigured } = await import('@/lib/ai/groq-client')
      const hasApi = isGroqConfigured()
      setHasApiKey(hasApi)

      if (hasApi) {
        console.log("api key found")
        generateAiInsights()
        console.log("after api key found")

      }
    } catch (error) {
      console.error('Error checking API:', error)
      setHasApiKey(false)
    }
  }

  /**
   * Generate AI insights based on mood data
   */
  const generateAiInsights = async () => {
    try {
      const entries = JSON.parse(localStorage.getItem('mood_journal_entries') || '[]')
      // if (entries.length < 3) return // Need some data for insights

      const { groqClient } = await import('@/lib/ai/groq-client')

      //       const insightPrompt = `Based on this mood journal data, provide 2-3 brief insights and Islamic-based recommendations:

      // Recent mood entries: ${JSON.stringify(entries.slice(-7), null, 2)}

      // Please provide:
      // 1. Key mood patterns or trends
      // 2. Islamic guidance for emotional well-being
      // 3. Practical recommendations for improvement

      // Keep responses concise and spiritually uplifting. Format as JSON:
      // {
      //   "insights": ["insight1", "insight2"],
      //   "islamicGuidance": "brief guidance",
      //   "recommendations": ["rec1", "rec2"]
      // }`
      const insightPrompt = `
You are a JSON generator. Analyze the following mood journal data (last 7 entries) and respond ONLY with valid JSON. 
Do NOT include explanations, notes, extra text, or markdown. 
Your entire response MUST be a single JSON object that strictly follows this format:

{
  "insights": ["insight1", "insight2", "insight3"],
  "islamicGuidance": "brief guidance",
  "recommendations": ["rec1", "rec2", "rec3"]
}

Data:
${JSON.stringify(entries.slice(-7), null, 2)}

Generate 2-3 insights, 1 short islamicGuidance string, and 2-3 recommendations.
Return ONLY JSON. If you include anything else, it will break the parser.
`


      const response = await groqClient.makeRequest([
        {
          role: "system",
          content: "You are a compassionate Islamic counselor providing mood and emotional wellness insights. Be brief, practical, and spiritually uplifting."
        },
        {
          role: "user",
          content: insightPrompt
        }
      ]
      )

      const aiResponse = response.choices[0]?.message?.content
      console.log("aiResponse ", aiResponse)
      if (aiResponse) {
        try {
          const parsedInsights = JSON.parse(aiResponse)
          console.log("parsedInsights ", parsedInsights)
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
   * Calculate weekly mood statistics
   */
  const calculateWeeklyStats = (entries) => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const weekEntries = entries.filter(entry => new Date(entry.date) >= oneWeekAgo)

    if (weekEntries.length === 0) return null

    const avgMood = weekEntries.reduce((sum, entry) => sum + entry.mood, 0) / weekEntries.length
    const moodCounts = weekEntries.reduce((acc, entry) => {
      const moodLevel = entry.mood <= 2 ? 'low' : entry.mood <= 3 ? 'neutral' : 'high'
      acc[moodLevel] = (acc[moodLevel] || 0) + 1
      return acc
    }, {})

    return {
      avgMood: avgMood.toFixed(1),
      totalEntries: weekEntries.length,
      moodDistribution: [
        { name: 'Low', value: moodCounts.low || 0, color: '#ef4444' },
        { name: 'Neutral', value: moodCounts.neutral || 0, color: '#f59e0b' },
        { name: 'High', value: moodCounts.high || 0, color: '#10b981' }
      ]
    }
  }

  /**
   * Calculate current mood tracking streak
   */
  const calculateMoodStreak = (entries) => {
    if (entries.length === 0) return 0

    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date))
    let currentStreak = 0
    let checkDate = new Date()

    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date)
      const expectedDate = new Date(checkDate)
      expectedDate.setHours(0, 0, 0, 0)
      entryDate.setHours(0, 0, 0, 0)

      if (entryDate.getTime() === expectedDate.getTime()) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    return currentStreak
  }

  /**
   * Quick mood entry
   */
  const quickMoodEntry = (mood, emoji) => {
    const today = new Date().toISOString()
    const entry = {
      id: Date.now(),
      date: today,
      mood: mood,
      emoji: emoji,
      quickEntry: true,
      timestamp: today
    }

    const entries = JSON.parse(localStorage.getItem('mood_journal_entries') || '[]')
    const updatedEntries = entries.filter(e =>
      new Date(e.date).toDateString() !== new Date().toDateString()
    )
    updatedEntries.push(entry)

    localStorage.setItem('mood_journal_entries', JSON.stringify(updatedEntries))
    setTodaysMood(entry)
    loadJournalData() // Refresh data
  }

  // Mood options for quick entry
  const moodOptions = [
    { mood: 5, emoji: '😊', label: 'Joyful', color: 'text-green-400' },
    { mood: 4, emoji: '🙂', label: 'Good', color: 'text-emerald-400' },
    { mood: 3, emoji: '😐', label: 'Okay', color: 'text-yellow-400' },
    { mood: 2, emoji: '😔', label: 'Low', color: 'text-orange-400' },
    { mood: 1, emoji: '😢', label: 'Difficult', color: 'text-red-400' }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your emotional journey...</p>
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
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Emotion Tracker
              </h1>
              <p className="text-white/70 text-lg">
                Track your emotional journey with AI insights and Islamic wisdom
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              {/* Streak Display */}
              <div className="flex items-center space-x-3 px-6 py-3 glass-morphism rounded-xl">
                <HiOutlineFire className="w-6 h-6 text-orange-400" />
                <div>
                  <div className="text-xl font-bold text-white">{streak}</div>
                  <div className="text-white/60 text-sm">Day Streak</div>
                </div>
              </div>

              {/* Quick Actions */}
              <Link href="/journal/entry">
                <button className="btn-primary">
                  <HiOutlinePlus className="w-5 h-5 mr-2" />
                  New Entry
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Today's Mood Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">How are you feeling today?</h2>

          {todaysMood ? (
            <div className="glass-morphism-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{todaysMood.emoji}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {moodOptions.find(m => m.mood === todaysMood.mood)?.label} Day
                    </h3>
                    <p className="text-white/60">
                      Logged at {new Date(todaysMood.date).toLocaleTimeString()}
                    </p>
                    {todaysMood.note && (
                      <p className="text-white/80 mt-2 italic">"{todaysMood.note}"</p>
                    )}
                  </div>
                </div>
                <Link href="/journal/entry">
                  <button className="btn-secondary">
                    Add Details
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="glass-morphism-card rounded-2xl p-6">
              <div className="text-center mb-6">
                <HiOutlineHeart className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Track Today's Mood</h3>
                <p className="text-white/60">Quick tap to log how you're feeling</p>
              </div>

              <div className="flex justify-center space-x-4">
                {moodOptions.map((option) => (
                  <button
                    key={option.mood}
                    onClick={() => quickMoodEntry(option.mood, option.emoji)}
                    className="flex flex-col items-center p-4 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-200">
                      {option.emoji}
                    </div>
                    <span className={`text-sm font-medium ${option.color}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Mood Trends Chart */}
          <div className="lg:col-span-2">
            <div className="glass-morphism-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">30-Day Mood Trends</h3>
                <Link href="/journal/analytics" className="text-primary-400 hover:text-primary-300 flex items-center space-x-1">
                  <span>View Details</span>
                  <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {moodTrends.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis
                        dataKey="date"
                        stroke="rgba(255,255,255,0.6)"
                        fontSize={12}
                      />
                      <YAxis
                        domain={[1, 5]}
                        stroke="rgba(255,255,255,0.6)"
                        fontSize={12}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#14b8a6"
                        strokeWidth={3}
                        dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#14b8a6', strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="energy"
                        stroke="#a855f7"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <HiOutlineChartBarSquare className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60">Start tracking to see your mood trends</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Weekly Stats */}
          <div className="space-y-6">
            {/* Weekly Overview */}
            {weeklyStats && (
              <div className="glass-morphism-card rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">This Week</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Average Mood</span>
                    <span className="text-2xl font-bold text-primary-400">{weeklyStats.avgMood}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Entries</span>
                    <span className="text-white font-semibold">{weeklyStats.totalEntries}/7</span>
                  </div>

                  {weeklyStats.moodDistribution.length > 0 && (
                    <div className="mt-4">
                      <p className="text-white/70 text-sm mb-2">Mood Distribution</p>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={weeklyStats.moodDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={50}
                              dataKey="value"
                            >
                              {weeklyStats.moodDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Insights */}
            {hasApiKey && aiInsights && (
              <div className="glass-morphism-card rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <HiOutlineSparkles className="w-5 h-5 text-primary-400" />
                  <h3 className="text-lg font-bold text-white">AI Insights</h3>
                </div>

                <div className="space-y-3">
                  {aiInsights.insights?.map((insight, index) => (
                    <div key={index} className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3">
                      <p className="text-white/90 text-sm">{insight}</p>
                    </div>
                  ))}

                  {aiInsights.islamicGuidance && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-emerald-400 text-xs font-medium mb-1">Islamic Guidance</p>
                      <p className="text-white/90 text-sm">{aiInsights.islamicGuidance}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Entries */}
        {recentEntries.length > 0 && (
          <div className="glass-morphism-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Recent Entries</h3>
              <Link href="/journal/history" className="text-primary-400 hover:text-primary-300 flex items-center space-x-1">
                <span>View All</span>
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentEntries.slice(0, 6).map((entry) => (
                <div key={entry.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{entry.emoji}</span>
                    <span className="text-white/60 text-sm">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white font-medium mb-1">
                    {moodOptions.find(m => m.mood === entry.mood)?.label}
                  </p>
                  {entry.note && (
                    <p className="text-white/70 text-sm line-clamp-2">
                      {entry.note}
                    </p>
                  )}
                  {entry.gratitude && (
                    <div className="mt-2 text-emerald-400 text-xs">
                      🤲 Included gratitude
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/journal/entry">
            <div className="glass-morphism-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <HiOutlinePlus className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">New Entry</h3>
                <p className="text-white/60 text-sm">Record your current mood and thoughts</p>
              </div>
            </div>
          </Link>

          <Link href="/journal/analytics">
            <div className="glass-morphism-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <HiOutlineChartBarSquare className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
                <p className="text-white/60 text-sm">Deep dive into your emotional patterns</p>
              </div>
            </div>
          </Link>

          <Link href="/journal/history">
            <div className="glass-morphism-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <HiOutlineCalendarDays className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">History</h3>
                <p className="text-white/60 text-sm">Browse your complete emotional journey</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}