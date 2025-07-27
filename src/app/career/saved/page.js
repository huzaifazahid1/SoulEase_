'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HiOutlineBookmark,
  HiOutlineTrash,
  HiOutlineBriefcase,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineClipboardDocumentList,
  HiOutlineShare,
  HiOutlineSparkles,
  HiOutlineHandHeart,
  HiOutlineFolderOpen,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare
} from 'react-icons/hi2'
import { FiStar, FiFilter, FiDownload, FiEdit3, FiTrendingUp, FiDollarSign } from 'react-icons/fi'

/**
 * Saved Career Paths Page
 * 
 * Features:
 * - Display saved career recommendations
 * - Organize by categories/tags
 * - Compare saved careers
 * - Export/share career lists
 * - Add personal notes to saved careers
 * - Track application status
 */
export default function SavedCareerPaths() {
  // State management
  const [savedPaths, setSavedPaths] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('savedDate')
  const [selectedCareers, setSelectedCareers] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [editingNotes, setEditingNotes] = useState({})
  const [personalNotes, setPersonalNotes] = useState({})

  // Load saved careers on mount
  useEffect(() => {
    loadSavedCareers()
  }, [])

  /**
   * Load saved career paths from localStorage
   */
  const loadSavedCareers = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('saved_career_paths') || '[]')
      const notes = JSON.parse(localStorage.getItem('career_notes') || '{}')
      
      setSavedPaths(saved)
      setPersonalNotes(notes)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading saved careers:', error)
      setIsLoading(false)
    }
  }

  /**
   * Remove career from saved list
   */
  const removeSavedCareer = (careerId) => {
    const updatedPaths = savedPaths.filter(career => career.id !== careerId)
    setSavedPaths(updatedPaths)
    localStorage.setItem('saved_career_paths', JSON.stringify(updatedPaths))
    
    // Also remove from selected if it was selected
    setSelectedCareers(prev => prev.filter(id => id !== careerId))
  }

  /**
   * Update personal notes for a career
   */
  const updateNotes = (careerId, notes) => {
    const updatedNotes = { ...personalNotes, [careerId]: notes }
    setPersonalNotes(updatedNotes)
    localStorage.setItem('career_notes', JSON.stringify(updatedNotes))
    setEditingNotes(prev => ({ ...prev, [careerId]: false }))
  }

  /**
   * Toggle career selection for comparison
   */
  const toggleCareerSelection = (careerId) => {
    setSelectedCareers(prev => {
      if (prev.includes(careerId)) {
        return prev.filter(id => id !== careerId)
      } else if (prev.length < 3) { // Limit to 3 careers for comparison
        return [...prev, careerId]
      } else {
        return prev
      }
    })
  }

  /**
   * Filter and sort saved careers
   */
  const getFilteredCareers = () => {
    let filtered = [...savedPaths]

    // Apply filters
    if (filterBy === 'high-match') {
      filtered = filtered.filter(career => career.compatibility >= 85)
    } else if (filterBy === 'tech') {
      filtered = filtered.filter(career => career.industry?.includes('Technology'))
    } else if (filterBy === 'recent') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(career => new Date(career.savedDate) > weekAgo)
    } else if (filterBy === 'with-notes') {
      filtered = filtered.filter(career => personalNotes[career.id])
    }

    // Apply sorting
    if (sortBy === 'savedDate') {
      filtered.sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate))
    } else if (sortBy === 'compatibility') {
      filtered.sort((a, b) => b.compatibility - a.compatibility)
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'salary') {
      filtered.sort((a, b) => {
        const aSalary = parseInt(a.salaryRange?.split(' - ')[1]?.replace(/[^0-9]/g, '') || '0')
        const bSalary = parseInt(b.salaryRange?.split(' - ')[1]?.replace(/[^0-9]/g, '') || '0')
        return bSalary - aSalary
      })
    }

    return filtered
  }

  /**
   * Export saved careers as PDF/CSV
   */
  const exportCareers = (format) => {
    const data = savedPaths.map(career => ({
      title: career.title,
      compatibility: career.compatibility,
      industry: career.industry,
      salaryRange: career.salaryRange,
      growth: career.growth,
      savedDate: new Date(career.savedDate).toLocaleDateString(),
      notes: personalNotes[career.id] || ''
    }))

    if (format === 'csv') {
      const csv = [
        ['Title', 'Compatibility', 'Industry', 'Salary Range', 'Growth', 'Saved Date', 'Notes'],
        ...data.map(row => Object.values(row))
      ].map(row => row.join(',')).join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'saved-careers.csv'
      a.click()
    }
  }

  const filteredCareers = getFilteredCareers()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your saved careers...</p>
        </div>
      </div>
    )
  }

  if (savedPaths.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-mesh">
        <div className="px-6 py-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Saved Career Paths</h1>
            <p className="text-white/60">Your bookmarked career recommendations</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <HiOutlineFolderOpen className="w-24 h-24 text-white/30 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">No Saved Careers Yet</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Start by taking the assessment and saving careers that interest you. 
            They'll appear here for easy access and comparison.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/career/assessment">
              <button className="btn-primary">
                <HiOutlineClipboardDocumentList className="w-5 h-5 mr-2" />
                Take Assessment
              </button>
            </Link>
            <Link href="/career/results">
              <button className="btn-secondary">
                <HiOutlineBriefcase className="w-5 h-5 mr-2" />
                Browse Careers
              </button>
            </Link>
          </div>
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
              <h1 className="text-3xl font-bold text-white mb-2">
                Saved Career Paths
              </h1>
              <p className="text-white/60 text-lg mb-4">
                {savedPaths.length} career{savedPaths.length !== 1 ? 's' : ''} saved for future exploration
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <HiOutlineBookmark className="w-4 h-4" />
                  <span className="text-sm">Organized & Ready</span>
                </div>
                {selectedCareers.length > 0 && (
                  <div className="flex items-center space-x-2 text-primary-400">
                    <HiOutlineChartBarSquare className="w-4 h-4" />
                    <span className="text-sm">{selectedCareers.length} selected for comparison</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              {selectedCareers.length >= 2 && (
                <button
                  onClick={() => setShowCompare(true)}
                  className="btn-primary"
                >
                  <HiOutlineChartBarSquare className="w-4 h-4 mr-2" />
                  Compare ({selectedCareers.length})
                </button>
              )}
              <button
                onClick={() => exportCareers('csv')}
                className="flex items-center space-x-2 btn-secondary"
              >
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiFilter className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-sm">Filter:</span>
            </div>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Saved</option>
              <option value="high-match">High Match (85%+)</option>
              <option value="tech">Technology</option>
              <option value="recent">Recently Saved</option>
              <option value="with-notes">With Notes</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/60 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="savedDate">Date Saved</option>
              <option value="compatibility">Compatibility</option>
              <option value="title">Alphabetical</option>
              <option value="salary">Salary Range</option>
            </select>
          </div>
        </div>

        {/* Saved Careers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCareers.map((career) => {
            const isSelected = selectedCareers.includes(career.id)
            const isEditingNote = editingNotes[career.id]
            const hasNotes = personalNotes[career.id]

            return (
              <div 
                key={career.id}
                className={`
                  glass-morphism-card rounded-2xl p-6 transition-all duration-300 relative
                  ${isSelected ? 'ring-2 ring-primary-500 bg-primary-500/10' : 'hover:scale-[1.02]'}
                `}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <button
                    onClick={() => toggleCareerSelection(career.id)}
                    className={`
                      w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200
                      ${isSelected 
                        ? 'border-primary-400 bg-primary-400' 
                        : 'border-white/30 hover:border-white/50'
                      }
                    `}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => removeSavedCareer(career.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>

                {/* Header */}
                <div className="flex items-start space-x-4 mb-4 pr-16">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
                    <HiOutlineBriefcase className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{career.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{career.industry}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FiStar className="w-4 h-4 text-primary-400" />
                        <span className="text-primary-400 font-semibold">{career.compatibility}%</span>
                      </div>
                      <div className="flex items-center space-x-1 text-emerald-400">
                        <FiTrendingUp className="w-4 h-4" />
                        <span className="text-sm">{career.growth}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary and Date */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-white/70">
                    <FiDollarSign className="w-4 h-4" />
                    <span className="text-sm">{career.salaryRange}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70">
                    <HiOutlineCalendarDays className="w-4 h-4" />
                    <span className="text-sm">
                      Saved {new Date(career.savedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Islamic Perspective */}
                {career.islamicPerspective && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <FiStar className="w-4 h-4 text-emerald-400" /> {/* HiOutlineHandHeart */}
                      <span className="text-emerald-400 text-sm font-medium">Islamic Perspective</span>
                    </div>
                    {/* Handle both string and object formats for islamicPerspective */}
                    {typeof career.islamicPerspective === 'string' ? (
                      <p className="text-white/80 text-xs">{career.islamicPerspective}</p>
                    ) : career.islamicPerspective?.description ? (
                      <p className="text-white/80 text-xs">{career.islamicPerspective.description}</p>
                    ) : (
                      <p className="text-white/80 text-xs">Islamic perspective not available</p>
                    )}
                  </div>
                )}

                {/* Personal Notes */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 text-sm font-medium">Personal Notes</span>
                    <button
                      onClick={() => setEditingNotes(prev => ({ ...prev, [career.id]: !prev[career.id] }))}
                      className="text-primary-400 hover:text-primary-300 text-sm flex items-center space-x-1"
                    >
                      <FiEdit3 className="w-3 h-3" />
                      <span>{hasNotes ? 'Edit' : 'Add'}</span>
                    </button>
                  </div>
                  
                  {isEditingNote ? (
                    <div className="space-y-2">
                      <textarea
                        placeholder="Add your thoughts, pros/cons, next steps..."
                        className="w-full h-20 bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                        defaultValue={personalNotes[career.id] || ''}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.ctrlKey) {
                            updateNotes(career.id, e.target.value)
                          }
                        }}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            const textarea = e.target.parentElement.previousElementSibling
                            updateNotes(career.id, textarea.value)
                          }}
                          className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 transition-colors duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotes(prev => ({ ...prev, [career.id]: false }))}
                          className="px-3 py-1 bg-white/10 text-white/70 rounded text-sm hover:bg-white/20 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/5 rounded-lg p-3 min-h-16">
                      {hasNotes ? (
                        <p className="text-white/80 text-sm whitespace-pre-wrap">{personalNotes[career.id]}</p>
                      ) : (
                        <p className="text-white/40 text-sm italic">No notes yet. Click "Add" to start writing.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link href={`/career/results#career-${career.id}`} className="flex-1">
                    <button className="w-full btn-primary text-sm py-2">
                      <HiOutlineArrowTopRightOnSquare className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                  </Link>
                  <button className="px-4 py-2 glass-morphism rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
                    <HiOutlineShare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <HiOutlineBookmark className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No careers match your current filter</h3>
            <p className="text-white/60 mb-4">Try adjusting your filters to see your saved careers.</p>
            <button
              onClick={() => setFilterBy('all')}
              className="btn-primary"
            >
              Show All Saved
            </button>
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      {showCompare && selectedCareers.length >= 2 && (
        <ComparisonModal 
          careers={savedPaths.filter(career => selectedCareers.includes(career.id))}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  )
}

/**
 * Career Comparison Modal Component
 */
function ComparisonModal({ careers, onClose }) {
  const comparisonMetrics = [
    { key: 'compatibility', label: 'Compatibility Score', format: (val) => `${val}%` },
    { key: 'salaryRange', label: 'Salary Range', format: (val) => val },
    { key: 'growth', label: 'Growth Potential', format: (val) => val },
    { key: 'industry', label: 'Industry', format: (val) => val },
    { key: 'workEnvironment', label: 'Work Environment', format: (val) => val }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-neural-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Career Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 text-white/60 font-medium border-b border-white/10">Metric</th>
                {careers.map((career) => (
                  <th key={career.id} className="text-center p-4 border-b border-white/10">
                    <div className="text-white font-semibold">{career.title}</div>
                    <div className="text-white/60 text-sm">{career.industry}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonMetrics.map((metric) => (
                <tr key={metric.key} className="border-b border-white/5">
                  <td className="p-4 text-white/80 font-medium">{metric.label}</td>
                  {careers.map((career) => (
                    <td key={career.id} className="p-4 text-center text-white">
                      {metric.format(career[metric.key] || 'N/A')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Islamic Perspective Comparison */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Islamic Perspective</h3>
          <div className="grid gap-4">
            {careers.map((career) => (
              <div key={career.id} className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-medium text-emerald-400 mb-2">{career.title}</h4>
                <p className="text-white/80 text-sm">
                  {/* Handle both string and object formats for islamicPerspective */}
                  {typeof career.islamicPerspective === 'string' 
                    ? career.islamicPerspective 
                    : career.islamicPerspective?.description || 'No Islamic perspective available'
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}