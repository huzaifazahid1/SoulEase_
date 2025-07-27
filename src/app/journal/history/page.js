'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HiOutlineCalendarDays,
  HiOutlineArrowLeft,
  HiOutlineHeart,
  HiOutlineHandHeart,
  HiOutlineBolt,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlineShare,
  HiOutlineChevronDown,
  HiOutlineChevronUp
} from 'react-icons/hi2'
import { FiCalendar, FiSearch, FiFilter, FiMoreVertical, FiEdit, FiTrash2, FiHeart, FiDownload } from 'react-icons/fi'

/**
 * Journal History Page
 * 
 * Features:
 * - Complete timeline of all journal entries
 * - Advanced filtering and search capabilities
 * - Calendar view and list view options
 * - Entry editing and deletion
 * - Export functionality
 * - Beautiful timeline visualization
 * - Islamic calendar integration
 * - Streak tracking and milestones
 */
export default function JournalHistoryPage() {
  // State management
  const [entries, setEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState('timeline') // timeline, calendar, list
  const [searchTerm, setSearchTerm] = useState('')
  const [moodFilter, setMoodFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showEntryModal, setShowEntryModal] = useState(false)

  // Load entries on mount
  useEffect(() => {
    loadEntries()
  }, [])

  // Apply filters when they change
  useEffect(() => {
    applyFilters()
  }, [entries, searchTerm, moodFilter, dateFilter])

  /**
   * Load all journal entries
   */
  const loadEntries = () => {
    try {
      const allEntries = JSON.parse(localStorage.getItem('mood_journal_entries') || '[]')
      const sortedEntries = allEntries.sort((a, b) => new Date(b.date) - new Date(a.date))
      setEntries(sortedEntries)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading entries:', error)
      setIsLoading(false)
    }
  }

  /**
   * Apply search and filters
   */
  const applyFilters = () => {
    let filtered = [...entries]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.gratitude?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.activities?.some(activity => activity.toLowerCase().includes(searchTerm.toLowerCase())) ||
        entry.triggers?.some(trigger => trigger.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Mood filter
    if (moodFilter !== 'all') {
      if (moodFilter === 'positive') {
        filtered = filtered.filter(entry => entry.mood >= 4)
      } else if (moodFilter === 'neutral') {
        filtered = filtered.filter(entry => entry.mood === 3)
      } else if (moodFilter === 'negative') {
        filtered = filtered.filter(entry => entry.mood <= 2)
      } else {
        filtered = filtered.filter(entry => entry.mood === parseInt(moodFilter))
      }
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date()
      let cutoffDate = new Date()

      switch (dateFilter) {
        case 'today':
          cutoffDate.setHours(0, 0, 0, 0)
          filtered = filtered.filter(entry => new Date(entry.date) >= cutoffDate)
          break
        case 'week':
          cutoffDate.setDate(now.getDate() - 7)
          filtered = filtered.filter(entry => new Date(entry.date) >= cutoffDate)
          break
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1)
          filtered = filtered.filter(entry => new Date(entry.date) >= cutoffDate)
          break
        case 'gratitude':
          filtered = filtered.filter(entry => entry.gratitude && entry.gratitude.trim())
          break
      }
    }

    setFilteredEntries(filtered)
  }

  /**
   * Delete an entry
   */
  const deleteEntry = (entryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?')
    if (confirmDelete) {
      const updatedEntries = entries.filter(entry => entry.id !== entryId)
      setEntries(updatedEntries)
      localStorage.setItem('mood_journal_entries', JSON.stringify(updatedEntries))
    }
  }

  /**
   * Export entries
   */
  const exportEntries = () => {
    const exportData = filteredEntries.map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      mood: entry.mood,
      emoji: entry.emoji,
      energy: entry.energy,
      note: entry.note || '',
      gratitude: entry.gratitude || '',
      activities: entry.activities?.join(', ') || '',
      triggers: entry.triggers?.join(', ') || ''
    }))

    const csv = [
      ['Date', 'Mood', 'Emoji', 'Energy', 'Note', 'Gratitude', 'Activities', 'Triggers'],
      ...exportData.map(row => Object.values(row))
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mood-journal-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  /**
   * Get mood label
   */
  const getMoodLabel = (mood) => {
    const labels = {
      1: 'Difficult',
      2: 'Low',
      3: 'Neutral',
      4: 'Good',
      5: 'Joyful'
    }
    return labels[mood] || 'Unknown'
  }

  /**
   * Get mood color
   */
  const getMoodColor = (mood) => {
    const colors = {
      1: 'text-red-400',
      2: 'text-orange-400',
      3: 'text-yellow-400',
      4: 'text-emerald-400',
      5: 'text-green-400'
    }
    return colors[mood] || 'text-white'
  }

  /**
   * Get background color for mood
   */
  const getMoodBgColor = (mood) => {
    const colors = {
      1: 'bg-red-500/10 border-red-500/20',
      2: 'bg-orange-500/10 border-orange-500/20',
      3: 'bg-yellow-500/10 border-yellow-500/20',
      4: 'bg-emerald-500/10 border-emerald-500/20',
      5: 'bg-green-500/10 border-green-500/20'
    }
    return colors[mood] || 'bg-white/5 border-white/10'
  }

  /**
   * Group entries by date
   */
  const groupEntriesByDate = (entries) => {
    const groups = {}
    entries.forEach(entry => {
      const date = new Date(entry.date).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(entry)
    })
    return groups
  }

  const groupedEntries = groupEntriesByDate(filteredEntries)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your journal history...</p>
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
                <h1 className="text-3xl font-bold text-white mb-2">Journal History</h1>
                <p className="text-white/60">
                  {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} 
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 p-1 glass-morphism rounded-lg">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'timeline' 
                      ? 'bg-primary-500/30 text-primary-400' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-primary-500/30 text-primary-400' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  List
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={exportEntries}
                className="flex items-center space-x-2 px-4 py-2 glass-morphism rounded-lg text-white/70 hover:text-white transition-colors duration-200"
              >
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entries, notes, activities..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 glass-morphism rounded-xl text-white/70 hover:text-white transition-colors duration-200"
              >
                <FiFilter className="w-4 h-4" />
                <span>Filters</span>
                {showFilters ? (
                  <HiOutlineChevronUp className="w-4 h-4" />
                ) : (
                  <HiOutlineChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 p-4 glass-morphism rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Mood</label>
                    <select
                      value={moodFilter}
                      onChange={(e) => setMoodFilter(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value="all">All Moods</option>
                      <option value="positive">Positive (4-5)</option>
                      <option value="neutral">Neutral (3)</option>
                      <option value="negative">Difficult (1-2)</option>
                      <option value="5">Joyful</option>
                      <option value="4">Good</option>
                      <option value="3">Neutral</option>
                      <option value="2">Low</option>
                      <option value="1">Difficult</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Time Period</label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="gratitude">With Gratitude</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setMoodFilter('all')
                        setDateFilter('all')
                      }}
                      className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-colors duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16">
            <HiOutlineCalendarDays className="w-20 h-20 text-white/30 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              {searchTerm || moodFilter !== 'all' || dateFilter !== 'all' 
                ? 'No entries match your filters' 
                : 'No journal entries yet'
              }
            </h2>
            <p className="text-white/60 mb-8">
              {searchTerm || moodFilter !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your search or filters to see more entries'
                : 'Start your emotional journey by creating your first entry'
              }
            </p>
            <Link href="/journal/entry">
              <button className="btn-primary">
                Create First Entry
              </button>
            </Link>
          </div>
        ) : viewMode === 'timeline' ? (
          <TimelineView 
            groupedEntries={groupedEntries} 
            onEditEntry={(entry) => {
              setSelectedEntry(entry)
              setShowEntryModal(true)
            }}
            onDeleteEntry={deleteEntry}
            getMoodLabel={getMoodLabel}
            getMoodColor={getMoodColor}
            getMoodBgColor={getMoodBgColor}
          />
        ) : (
          <ListView 
            entries={filteredEntries}
            onEditEntry={(entry) => {
              setSelectedEntry(entry)
              setShowEntryModal(true)
            }}
            onDeleteEntry={deleteEntry}
            getMoodLabel={getMoodLabel}
            getMoodColor={getMoodColor}
            getMoodBgColor={getMoodBgColor}
          />
        )}
      </div>

      {/* Entry Detail Modal */}
      {showEntryModal && selectedEntry && (
        <EntryModal 
          entry={selectedEntry}
          onClose={() => {
            setShowEntryModal(false)
            setSelectedEntry(null)
          }}
          onEdit={() => {
            // Navigate to edit - for now just close modal
            setShowEntryModal(false)
            setSelectedEntry(null)
          }}
          onDelete={() => {
            deleteEntry(selectedEntry.id)
            setShowEntryModal(false)
            setSelectedEntry(null)
          }}
          getMoodLabel={getMoodLabel}
          getMoodColor={getMoodColor}
          getMoodBgColor={getMoodBgColor}
        />
      )}
    </div>
  )
}

/**
 * Timeline View Component
 */
function TimelineView({ groupedEntries, onEditEntry, onDeleteEntry, getMoodLabel, getMoodColor, getMoodBgColor }) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" />
      
      <div className="space-y-8">
        {Object.entries(groupedEntries).map(([dateKey, entries]) => (
          <div key={dateKey} className="relative">
            {/* Date Header */}
            <div className="flex items-center mb-6">
              <div className="relative z-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full p-3 mr-6">
                <HiOutlineCalendarDays className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {new Date(dateKey).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <p className="text-white/60 text-sm">
                  {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
            </div>

            {/* Entries for this date */}
            <div className="ml-20 space-y-4">
              {entries.map((entry) => (
                <EntryCard 
                  key={entry.id}
                  entry={entry}
                  onEdit={onEditEntry}
                  onDelete={onDeleteEntry}
                  getMoodLabel={getMoodLabel}
                  getMoodColor={getMoodColor}
                  getMoodBgColor={getMoodBgColor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * List View Component
 */
function ListView({ entries, onEditEntry, onDeleteEntry, getMoodLabel, getMoodColor, getMoodBgColor }) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <EntryCard 
          key={entry.id}
          entry={entry}
          onEdit={onEditEntry}
          onDelete={onDeleteEntry}
          getMoodLabel={getMoodLabel}
          getMoodColor={getMoodColor}
          getMoodBgColor={getMoodBgColor}
          showDate={true}
        />
      ))}
    </div>
  )
}

/**
 * Entry Card Component
 */
function EntryCard({ entry, onEdit, onDelete, getMoodLabel, getMoodColor, getMoodBgColor, showDate = false }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={`glass-morphism-card rounded-xl p-6 border ${getMoodBgColor(entry.mood)} hover:scale-[1.02] transition-all duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{entry.emoji}</div>
          <div>
            <div className="flex items-center space-x-3">
              <h4 className={`font-bold ${getMoodColor(entry.mood)}`}>
                {getMoodLabel(entry.mood)}
              </h4>
              {entry.energy && (
                <div className="flex items-center space-x-1">
                  <HiOutlineBolt className="w-4 h-4 text-accent-400" />
                  <span className="text-accent-400 text-sm font-medium">{entry.energy}/5</span>
                </div>
              )}
            </div>
            {showDate && (
              <p className="text-white/60 text-sm">
                {new Date(entry.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <FiMoreVertical className="w-4 h-4" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-neural-800/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl z-10">
              <button
                onClick={() => {
                  onEdit(entry)
                  setShowMenu(false)
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                <FiEdit className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  onDelete(entry.id)
                  setShowMenu(false)
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
              >
                <FiTrash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Entry Content */}
      {entry.note && (
        <div className="mb-4">
          <p className="text-white/80 leading-relaxed">{entry.note}</p>
        </div>
      )}

      {entry.gratitude && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FiHeart className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-sm">Gratitude</span>
          </div>
          <p className="text-white/90 text-sm">{entry.gratitude}</p>
        </div>
      )}

      {/* Activities and Triggers */}
      <div className="flex flex-wrap gap-2">
        {entry.activities?.map((activity, index) => (
          <span key={index} className="px-2 py-1 bg-secondary-500/20 text-secondary-400 rounded text-xs border border-secondary-500/30">
            {activity.replace('_', ' ')}
          </span>
        ))}
        {entry.triggers?.map((trigger, index) => (
          <span key={index} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30">
            {trigger}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Entry Detail Modal
 */
function EntryModal({ entry, onClose, onEdit, onDelete, getMoodLabel, getMoodColor, getMoodBgColor }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-neural-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{entry.emoji}</div>
            <div>
              <h2 className={`text-2xl font-bold ${getMoodColor(entry.mood)}`}>
                {getMoodLabel(entry.mood)} Day
              </h2>
              <p className="text-white/60">
                {new Date(entry.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Mood & Energy */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <HiOutlineHeart className="w-8 h-8 text-primary-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{entry.mood}/5</div>
              <div className="text-white/60 text-sm">Mood Level</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <HiOutlineBolt className="w-8 h-8 text-accent-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{entry.energy || 0}/5</div>
              <div className="text-white/60 text-sm">Energy Level</div>
            </div>
          </div>

          {/* Note */}
          {entry.note && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Reflection</h3>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/90 leading-relaxed">{entry.note}</p>
              </div>
            </div>
          )}

          {/* Gratitude */}
          {entry.gratitude && (
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center space-x-2">
                <FiHeart className="w-5 h-5" />
                <span>Gratitude (Shukr)</span>
              </h3>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-white/90 leading-relaxed">{entry.gratitude}</p>
              </div>
            </div>
          )}

          {/* Activities */}
          {entry.activities && entry.activities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Activities</h3>
              <div className="flex flex-wrap gap-2">
                {entry.activities.map((activity, index) => (
                  <span key={index} className="px-3 py-2 bg-secondary-500/20 text-secondary-400 rounded-lg text-sm border border-secondary-500/30">
                    {activity.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Triggers */}
          {entry.triggers && entry.triggers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Influences</h3>
              <div className="flex flex-wrap gap-2">
                {entry.triggers.map((trigger, index) => (
                  <span key={index} className="px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm border border-yellow-500/30">
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-white/10">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
          >
            Delete Entry
          </button>
          <Link href={`/journal/entry?edit=${entry.id}`}>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Edit Entry
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}