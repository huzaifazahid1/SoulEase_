'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  HiOutlineHeart,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineSparkles,
  HiOutlineHandHeart,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineCloudRain,
  HiOutlineBolt,
  HiOutlineHome,
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineMusicalNote,
  HiOutlineBookOpen
} from 'react-icons/hi2'
import { FiSave, FiSmile, FiMeh, FiFrown, FiZap, FiCalendar, FiHeart } from 'react-icons/fi'

/**
 * Journal Entry Page
 * 
 * Features:
 * - Comprehensive mood tracking with multiple dimensions
 * - Islamic gratitude integration
 * - Activity and trigger tracking
 * - Energy level monitoring
 * - Beautiful step-by-step interface
 * - Auto-save functionality
 * - AI-powered mood suggestions
 */
export default function JournalEntryPage() {
  const router = useRouter()
  
  // State management
  const [currentStep, setCurrentStep] = useState(0)
  const [entry, setEntry] = useState({
    date: new Date().toISOString(),
    mood: null,
    emoji: null,
    energy: 3,
    note: '',
    gratitude: '',
    activities: [], // Initialize as empty array to prevent undefined errors
    triggers: [], // Initialize as empty array to prevent undefined errors
    weather: null,
    sleep: null,
    isPrivate: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [existingEntry, setExistingEntry] = useState(null)

  // Check for existing entry today
  useEffect(() => {
    checkExistingEntry()
    loadDraftEntry()
  }, [])

  // Auto-save draft
  useEffect(() => {
    if (entry.mood || entry.note) {
      localStorage.setItem('journal_entry_draft', JSON.stringify(entry))
    }
  }, [entry])

  /**
   * Check if user already has an entry for today
   */
  const checkExistingEntry = () => {
    try {
      const entries = JSON.parse(localStorage.getItem('mood_journal_entries') || '[]')
      const today = new Date().toDateString()
      const todayEntry = entries.find(e => 
        new Date(e.date).toDateString() === today
      )
      
      if (todayEntry) {
        setExistingEntry(todayEntry)
        // Ensure arrays are properly initialized when loading existing entry
        setEntry({ 
          ...todayEntry,
          activities: todayEntry.activities || [], // Ensure activities is always an array
          triggers: todayEntry.triggers || [] // Ensure triggers is always an array
        })
      }
    } catch (error) {
      console.error('Error checking existing entry:', error)
    }
  }

  /**
   * Load draft entry if exists
   */
  const loadDraftEntry = () => {
    try {
      const draft = localStorage.getItem('journal_entry_draft')
      if (draft && !existingEntry) {
        const parsedDraft = JSON.parse(draft)
        // Only load if it's from today
        if (new Date(parsedDraft.date).toDateString() === new Date().toDateString()) {
          // Ensure arrays are properly initialized when loading draft
          setEntry({
            ...parsedDraft,
            activities: parsedDraft.activities || [], // Ensure activities is always an array
            triggers: parsedDraft.triggers || [] // Ensure triggers is always an array
          })
        }
      }
    } catch (error) {
      console.error('Error loading draft:', error)
    }
  }

  /**
   * Save journal entry
   */
  const saveEntry = async () => {
    if (!entry.mood) {
      alert('Please select your mood first')
      return
    }

    setIsLoading(true)

    try {
      const entries = JSON.parse(localStorage.getItem('mood_journal_entries') || '[]')
      
      const entryToSave = {
        ...entry,
        id: existingEntry?.id || Date.now(),
        timestamp: new Date().toISOString(),
        version: existingEntry ? (existingEntry.version || 1) + 1 : 1
      }

      // Remove existing entry for today if updating
      const filteredEntries = entries.filter(e => 
        e.id !== entryToSave.id && 
        new Date(e.date).toDateString() !== new Date().toDateString()
      )
      
      filteredEntries.push(entryToSave)
      localStorage.setItem('mood_journal_entries', JSON.stringify(filteredEntries))
      
      // Clear draft
      localStorage.removeItem('journal_entry_draft')
      
      // Track streak and achievements
      trackAchievements(filteredEntries)
      
      router.push('/journal')
    } catch (error) {
      console.error('Error saving entry:', error)
      alert('Error saving entry. Please try again.')
    }
    
    setIsLoading(false)
  }

  /**
   * Track achievements and streaks
   */
  const trackAchievements = (entries) => {
    try {
      const achievements = JSON.parse(localStorage.getItem('journal_achievements') || '[]')
      const today = new Date().toDateString()
      
      // Check for new achievements
      if (entries.length === 1) {
        achievements.push({
          id: 'first_entry',
          title: 'First Entry! 🎉',
          description: 'You started your emotional journey',
          date: today,
          type: 'milestone'
        })
      }
      
      if (entries.length === 7) {
        achievements.push({
          id: 'week_warrior',
          title: 'Week Warrior 📅',
          description: '7 days of mood tracking',
          date: today,
          type: 'streak'
        })
      }
      
      // Check for gratitude achievements
      const gratitudeEntries = entries.filter(e => e.gratitude)
      if (gratitudeEntries.length === 5) {
        achievements.push({
          id: 'grateful_heart',
          title: 'Grateful Heart 🤲',
          description: '5 entries with gratitude',
          date: today,
          type: 'gratitude'
        })
      }
      
      localStorage.setItem('journal_achievements', JSON.stringify(achievements))
    } catch (error) {
      console.error('Error tracking achievements:', error)
    }
  }

  /**
   * Update entry field
   */
  const updateEntry = (field, value) => {
    setEntry(prev => ({
      ...prev,
      [field]: value
    }))
  }

  /**
   * Toggle activity selection
   */
  const toggleActivity = (activity) => {
    setEntry(prev => ({
      ...prev,
      activities: (prev.activities || []).includes(activity)
        ? (prev.activities || []).filter(a => a !== activity)
        : [...(prev.activities || []), activity]
    }))
  }

  /**
   * Toggle trigger selection
   */
  const toggleTrigger = (trigger) => {
    setEntry(prev => ({
      ...prev,
      triggers: (prev.triggers || []).includes(trigger)
        ? (prev.triggers || []).filter(t => t !== trigger)
        : [...(prev.triggers || []), trigger]
    }))
  }

  // Assessment steps configuration
  const steps = [
    {
      id: 'mood',
      title: 'How are you feeling?',
      description: 'Select your current mood',
      icon: HiOutlineHeart
    },
    {
      id: 'energy',
      title: 'Energy Level',
      description: 'How energetic do you feel?',
      icon: HiOutlineBolt
    },
    {
      id: 'activities',
      title: 'Activities & Context',
      description: 'What did you do today?',
      icon: HiOutlineUsers
    },
    {
      id: 'reflection',
      title: 'Reflection & Gratitude',
      description: 'Thoughts and gratitude',
      icon: FiHeart
    }
  ]

  // Mood options with Islamic context
  const moodOptions = [
    { 
      mood: 5, 
      emoji: '😊', 
      label: 'Joyful', 
      color: 'text-green-400',
      description: 'Alhamdulillah! Feeling blessed and happy',
      islamicContext: 'Joy is a blessing from Allah'
    },
    { 
      mood: 4, 
      emoji: '🙂', 
      label: 'Good', 
      color: 'text-emerald-400',
      description: 'Feeling positive and content',
      islamicContext: 'Contentment is a treasure that never diminishes'
    },
    { 
      mood: 3, 
      emoji: '😐', 
      label: 'Neutral', 
      color: 'text-yellow-400',
      description: 'Balanced, neither high nor low',
      islamicContext: 'Every state has wisdom in it'
    },
    { 
      mood: 2, 
      emoji: '😔', 
      label: 'Low', 
      color: 'text-orange-400',
      description: 'Feeling down or unmotivated',
      islamicContext: 'After hardship comes ease'
    },
    { 
      mood: 1, 
      emoji: '😢', 
      label: 'Difficult', 
      color: 'text-red-400',
      description: 'Having a really tough time',
      islamicContext: 'Allah tests those He loves'
    }
  ]

  // Activity options
  const activityOptions = [
    { id: 'prayer', label: 'Prayer/Worship', icon: FiHeart, category: 'spiritual' },
    { id: 'work', label: 'Work/Study', icon: HiOutlineBriefcase, category: 'productivity' },
    { id: 'family', label: 'Family Time', icon: HiOutlineHome, category: 'social' },
    { id: 'friends', label: 'Friends', icon: HiOutlineUsers, category: 'social' },
    { id: 'exercise', label: 'Exercise', icon: HiOutlineBolt, category: 'health' },
    { id: 'reading', label: 'Reading', icon: HiOutlineBookOpen, category: 'learning' },
    { id: 'music', label: 'Music/Arts', icon: HiOutlineMusicalNote, category: 'creative' },
    { id: 'learning', label: 'Learning', icon: HiOutlineAcademicCap, category: 'learning' },
    { id: 'rest', label: 'Rest/Relax', icon: HiOutlineMoon, category: 'wellness' },
    { id: 'nature', label: 'Nature/Outdoors', icon: HiOutlineSun, category: 'wellness' }
  ]

  // Trigger/factor options
  const triggerOptions = [
    { id: 'stress', label: 'Stress', type: 'negative' },
    { id: 'anxiety', label: 'Anxiety', type: 'negative' },
    { id: 'success', label: 'Achievement', type: 'positive' },
    { id: 'social', label: 'Social Interaction', type: 'neutral' },
    { id: 'weather', label: 'Weather', type: 'neutral' },
    { id: 'health', label: 'Physical Health', type: 'neutral' },
    { id: 'sleep', label: 'Sleep Quality', type: 'neutral' },
    { id: 'conflict', label: 'Conflict', type: 'negative' },
    { id: 'gratitude', label: 'Gratitude Practice', type: 'positive' },
    { id: 'spirituality', label: 'Spiritual Practice', type: 'positive' }
  ]

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/journal" className="p-2 glass-morphism rounded-lg text-white/70 hover:text-white transition-colors duration-200">
                <HiOutlineArrowLeft className="w-5 h-5" />
              </Link>
              
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {existingEntry ? 'Update Entry' : 'New Journal Entry'}
                </h1>
                <p className="text-white/60">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={saveEntry}
              disabled={!entry.mood || isLoading}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                ${entry.mood && !isLoading
                  ? 'bg-gradient-to-r from-emerald-600 to-primary-600 text-white hover:scale-105'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  <span>Save Entry</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-white/60">Progress</span>
              <span className="text-sm text-primary-400 font-medium">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 p-2 glass-morphism rounded-2xl">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep || (index === 0 && entry.mood)
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary-600/30 to-accent-600/30 text-primary-400 border border-primary-500/30'
                      : isCompleted
                      ? 'text-emerald-400 hover:bg-emerald-500/10'
                      : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                    }
                  `}
                >
                  {isCompleted && index !== currentStep ? (
                    <HiOutlineCheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="hidden md:block font-medium">{step.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="glass-morphism-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <currentStepData.icon className="w-16 h-16 text-primary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">{currentStepData.title}</h2>
            <p className="text-white/70">{currentStepData.description}</p>
          </div>

          {/* Step Content */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {moodOptions.map((option) => (
                  <button
                    key={option.mood}
                    onClick={() => {
                      updateEntry('mood', option.mood)
                      updateEntry('emoji', option.emoji)
                    }}
                    className={`
                      p-6 rounded-2xl border transition-all duration-200 text-center
                      ${entry.mood === option.mood
                        ? 'bg-primary-500/20 border-primary-500/50 scale-105'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105'
                      }
                    `}
                  >
                    <div className="text-4xl mb-3">{option.emoji}</div>
                    <div className={`font-semibold mb-2 ${option.color}`}>{option.label}</div>
                    <div className="text-white/60 text-sm mb-2">{option.description}</div>
                    <div className="text-emerald-400 text-xs italic">{option.islamicContext}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-white/70 mb-4">Rate your energy level from 1 (very low) to 5 (very high)</p>
                <div className="flex justify-center space-x-4">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateEntry('energy', level)}
                      className={`
                        w-16 h-16 rounded-2xl border-2 font-bold text-lg transition-all duration-200
                        ${entry.energy === level
                          ? 'border-accent-400 bg-accent-400/20 text-accent-400 scale-110'
                          : 'border-white/20 text-white/60 hover:border-white/40 hover:scale-105'
                        }
                      `}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-white/60 text-sm mt-4 max-w-xs mx-auto">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>
              </div>

              {/* Visual Energy Indicator */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-500/20 rounded-lg">
                  <HiOutlineBolt className="w-5 h-5 text-accent-400" />
                  <span className="text-accent-400 font-medium">
                    Energy Level: {entry.energy}/5
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What did you do today?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                  {activityOptions.map((activity) => {
                  const Icon = activity.icon
                  // Add null check to prevent "Cannot read properties of undefined" error
                  const isSelected = entry.activities?.includes(activity.id) || false
                    
                    return (
                      <button
                        key={activity.id}
                        onClick={() => toggleActivity(activity.id)}
                        className={`
                          p-4 rounded-xl border transition-all duration-200 text-center
                          ${isSelected
                            ? 'bg-secondary-500/20 border-secondary-500/50 text-secondary-400'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
                          }
                        `}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">{activity.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What influenced your mood?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                  {triggerOptions.map((trigger) => {
                  // Add null check to prevent "Cannot read properties of undefined" error
                  const isSelected = entry.triggers?.includes(trigger.id) || false
                    const colorClass = trigger.type === 'positive' ? 'text-emerald-400' : 
                                     trigger.type === 'negative' ? 'text-red-400' : 'text-yellow-400'
                    
                    return (
                      <button
                        key={trigger.id}
                        onClick={() => toggleTrigger(trigger.id)}
                        className={`
                          p-3 rounded-lg border transition-all duration-200 text-center
                          ${isSelected
                            ? `bg-${trigger.type === 'positive' ? 'emerald' : trigger.type === 'negative' ? 'red' : 'yellow'}-500/20 border-${trigger.type === 'positive' ? 'emerald' : trigger.type === 'negative' ? 'red' : 'yellow'}-500/50 ${colorClass}`
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
                          }
                        `}
                      >
                        <span className="text-sm font-medium">{trigger.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <label className="block text-white font-medium mb-3">
                  How was your day? (Optional)
                </label>
                <textarea
                  value={entry.note}
                  onChange={(e) => updateEntry('note', e.target.value)}
                  placeholder="Reflect on your day, thoughts, feelings, or anything on your mind..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-medium mb-3 flex items-center space-x-2">
                  <FiHeart className="w-5 h-5" />
                  <span>What are you grateful for today? (Gratitude/Shukr)</span>
                </label>
                <textarea
                  value={entry.gratitude}
                  onChange={(e) => updateEntry('gratitude', e.target.value)}
                  placeholder="Alhamdulillah for... (List 3 things you're grateful for)"
                  rows={3}
                  className="w-full px-4 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-white placeholder-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
                <p className="text-emerald-300/60 text-sm mt-2">
                  "And whoever is grateful, is grateful for the benefit of his own self." - Quran 31:12
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={entry.isPrivate}
                    onChange={(e) => updateEntry('isPrivate', e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500"
                  />
                  <span className="text-white/80">Keep this entry private</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                ${currentStep === 0
                  ? 'opacity-50 cursor-not-allowed text-white/40'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <HiOutlineArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === 0 && !entry.mood}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                  ${(currentStep === 0 && !entry.mood)
                    ? 'opacity-50 cursor-not-allowed bg-white/10 text-white/40'
                    : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:scale-105'
                  }
                `}
              >
                <span>Next</span>
                <HiOutlineArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            ) : (
              <button
                onClick={saveEntry}
                disabled={!entry.mood || isLoading}
                className={`
                  flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200
                  ${entry.mood && !isLoading
                    ? 'bg-gradient-to-r from-emerald-600 to-primary-600 text-white hover:scale-105 shadow-lg shadow-emerald-600/25'
                    : 'opacity-50 cursor-not-allowed bg-white/10 text-white/40'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <HiOutlineCheckCircle className="w-5 h-5" />
                    <span>Complete Entry</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}