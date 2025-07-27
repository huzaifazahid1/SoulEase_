// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { 
//   HiOutlineSparkles, 
//   HiOutlineBriefcase, 
//   HiOutlineBookmark,
//   HiOutlineBookmarkSlash,
//   HiOutlineArrowTopRightOnSquare,
//   HiOutlineChartBarSquare,
//   HiOutlineAcademicCap,
//   HiOutlineCurrencyDollar,
//   HiOutlineTrendingUp,
//   HiOutlineHandHeart,
//   HiOutlineClipboardDocumentCheck,
//   HiOutlineShare
// } from 'react-icons/hi2'
// import { FiStar, FiUsers, FiMapPin, FiClock, FiFilter, FiRefreshCw } from 'react-icons/fi'

// /**
//  * Career Results Page
//  * 
//  * Features:
//  * - Display AI-generated career recommendations
//  * - Detailed compatibility scores and explanations
//  * - Save/unsave career paths
//  * - Islamic perspective for each career
//  * - Next steps and resources
//  * - Filtering and sorting options
//  */
// export default function CareerResults() {
//   // State management
//   const [recommendations, setRecommendations] = useState([])
//   const [savedPaths, setSavedPaths] = useState([])
//   const [assessmentData, setAssessmentData] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [filterBy, setFilterBy] = useState('all')
//   const [sortBy, setSortBy] = useState('compatibility')
//   const [showDetails, setShowDetails] = useState({})

//   // Load data on component mount
//   useEffect(() => {
//     loadCareerData()
//   }, [])

//   /**
//    * Load career recommendations and user data
//    */
//   const loadCareerData = () => {
//     try {
//       // Get assessment data
//       const assessment = localStorage.getItem('career_assessment')
//       const savedCareerPaths = JSON.parse(localStorage.getItem('saved_career_paths') || '[]')
//       const storedRecommendations = localStorage.getItem('career_recommendations')

//       if (!assessment) {
//         // No assessment completed yet - redirect or show message
//         setIsLoading(false)
//         return
//       }

//       setAssessmentData(JSON.parse(assessment))
//       setSavedPaths(savedCareerPaths)

//       // Load recommendations or generate if none exist
//       if (storedRecommendations) {
//         setRecommendations(JSON.parse(storedRecommendations))
//       } else {
//         // Generate recommendations if none exist
//         generateRecommendations()
//       }

//       setIsLoading(false)
//     } catch (error) {
//       console.error('Error loading career data:', error)
//       setIsLoading(false)
//     }
//   }

//   /**
//    * Generate comprehensive career recommendations
//    */
//   const generateRecommendations = () => {
//     const mockRecommendations = [
//       {
//         id: 1,
//         title: 'Software Engineering',
//         compatibility: 94,
//         description: 'Design and develop software applications that solve real-world problems',
//         industry: 'Technology',
//         salaryRange: '$75,000 - $150,000',
//         growth: 'Very High',
//         workEnvironment: 'Office/Remote',
//         educationRequired: "Bachelor's in Computer Science or related field",
//         islamicPerspective: {
//           alignment: 'High',
//           description: 'Technology can be used to benefit humanity and serve Allah through innovation',
//           considerations: 'Ensure your work contributes positively to society and avoid haram industries'
//         },
//         matchReasons: [
//           'Strong analytical and problem-solving skills',
//           'Interest in technology and innovation',
//           'Preference for creative and logical work',
//           'Ability to work independently and in teams'
//         ],
//         nextSteps: [
//           'Learn programming fundamentals (Python, JavaScript)',
//           'Build a portfolio of personal projects',
//           'Contribute to open-source projects',
//           'Network with software developers',
//           'Consider coding bootcamps or CS degree'
//         ],
//         skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Creativity'],
//         companies: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'],
//         jobTitles: ['Software Developer', 'Full Stack Engineer', 'Frontend Developer', 'Backend Developer']
//       },
//       {
//         id: 2,
//         title: 'Data Science',
//         compatibility: 91,
//         description: 'Extract insights from complex data to drive business decisions and discoveries',
//         industry: 'Technology/Analytics',
//         salaryRange: '$85,000 - $160,000',
//         growth: 'Very High',
//         workEnvironment: 'Office/Remote',
//         educationRequired: "Bachelor's in Statistics, Mathematics, or related field",
//         islamicPerspective: {
//           alignment: 'High',
//           description: 'Use data to uncover truth and solve real-world problems',
//           considerations: 'Ensure data is used ethically and for beneficial purposes'
//         },
//         matchReasons: [
//           'Strong mathematical and statistical aptitude',
//           'Research-oriented mindset',
//           'Detail-oriented approach',
//           'Interest in discovering patterns and insights'
//         ],
//         nextSteps: [
//           'Master Python and R programming',
//           'Learn machine learning algorithms',
//           'Complete data science projects',
//           'Obtain relevant certifications',
//           'Build a data portfolio'
//         ],
//         skills: ['Statistics', 'Programming', 'Machine Learning', 'Data Visualization'],
//         companies: ['Netflix', 'Uber', 'Airbnb', 'LinkedIn', 'Spotify'],
//         jobTitles: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Research Scientist']
//       },
//       {
//         id: 3,
//         title: 'UX/UI Design',
//         compatibility: 88,
//         description: 'Create intuitive and beautiful digital experiences that delight users',
//         industry: 'Design/Technology',
//         salaryRange: '$65,000 - $120,000',
//         growth: 'High',
//         workEnvironment: 'Office/Remote',
//         educationRequired: "Bachelor's in Design, HCI, or relevant portfolio",
//         islamicPerspective: {
//           alignment: 'High',
//           description: 'Design with empathy to improve peoples daily lives and accessibility',
//           considerations: 'Focus on inclusive design that serves all people equally'
//         },
//         matchReasons: [
//           'Creative and visual thinking',
//           'Strong empathy for user needs',
//           'Attention to detail',
//           'Interest in psychology and human behavior'
//         ],
//         nextSteps: [
//           'Learn design tools (Figma, Sketch)',
//           'Study user psychology and research methods',
//           'Build a strong design portfolio',
//           'Complete UX/UI courses',
//           'Practice with redesign projects'
//         ],
//         skills: ['Design Thinking', 'Prototyping', 'User Research', 'Visual Design'],
//         companies: ['Adobe', 'Salesforce', 'Dropbox', 'Slack', 'Shopify'],
//         jobTitles: ['UX Designer', 'UI Designer', 'Product Designer', 'Design Researcher']
//       },
//       {
//         id: 4,
//         title: 'Digital Marketing',
//         compatibility: 85,
//         description: 'Promote products and services through digital channels and strategies',
//         industry: 'Marketing/Business',
//         salaryRange: '$50,000 - $100,000',
//         growth: 'High',
//         workEnvironment: 'Office/Remote',
//         educationRequired: "Bachelor's in Marketing, Business, or related field",
//         islamicPerspective: {
//           alignment: 'Medium',
//           description: 'Marketing can educate and connect people with beneficial products',
//           considerations: 'Ensure honesty in advertising and promote halal products/services'
//         },
//         matchReasons: [
//           'Strong communication skills',
//           'Creative and strategic thinking',
//           'Interest in consumer behavior',
//           'Data-driven approach'
//         ],
//         nextSteps: [
//           'Learn digital marketing fundamentals',
//           'Get certified in Google Ads and Analytics',
//           'Build personal brand on social media',
//           'Create marketing campaigns for practice',
//           'Network with marketing professionals'
//         ],
//         skills: ['Content Creation', 'Analytics', 'Strategy', 'Communication'],
//         companies: ['HubSpot', 'Mailchimp', 'Buffer', 'Hootsuite', 'Canva'],
//         jobTitles: ['Digital Marketer', 'Content Strategist', 'Social Media Manager', 'Growth Hacker']
//       },
//       {
//         id: 5,
//         title: 'Cybersecurity Specialist',
//         compatibility: 82,
//         description: 'Protect organizations and individuals from digital threats and attacks',
//         industry: 'Technology/Security',
//         salaryRange: '$80,000 - $140,000',
//         growth: 'Very High',
//         workEnvironment: 'Office/Remote',
//         educationRequired: "Bachelor's in Cybersecurity, IT, or relevant certifications",
//         islamicPerspective: {
//           alignment: 'High',
//           description: 'Protecting people and organizations from harm aligns with Islamic values',
//           considerations: 'Focus on defensive security and ethical practices'
//         },
//         matchReasons: [
//           'Strong analytical and problem-solving skills',
//           'Interest in technology and security',
//           'Detail-oriented approach',
//           'Desire to protect others'
//         ],
//         nextSteps: [
//           'Get CompTIA Security+ certification',
//           'Learn networking and system administration',
//           'Practice with cybersecurity labs',
//           'Join cybersecurity communities',
//           'Consider specialized certifications (CISSP, CEH)'
//         ],
//         skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Incident Response'],
//         companies: ['CrowdStrike', 'Palo Alto Networks', 'FireEye', 'Symantec', 'Check Point'],
//         jobTitles: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'CISO']
//       },
//       {
//         id: 6,
//         title: 'Healthcare Administration',
//         compatibility: 79,
//         description: 'Manage healthcare facilities and ensure quality patient care delivery',
//         industry: 'Healthcare',
//         salaryRange: '$60,000 - $120,000',
//         growth: 'High',
//         workEnvironment: 'Office/Healthcare Facilities',
//         educationRequired: "Bachelor's in Healthcare Administration or related field",
//         islamicPerspective: {
//           alignment: 'Very High',
//           description: 'Healthcare is considered a noble profession in Islam, serving humanity',
//           considerations: 'Ensure equitable access to care and ethical medical practices'
//         },
//         matchReasons: [
//           'Strong organizational and leadership skills',
//           'Desire to help others and improve health outcomes',
//           'Interest in healthcare systems',
//           'Business and management aptitude'
//         ],
//         nextSteps: [
//           'Get healthcare administration degree/certificate',
//           'Gain experience in healthcare settings',
//           'Learn healthcare regulations and compliance',
//           'Develop leadership and management skills',
//           'Network with healthcare professionals'
//         ],
//         skills: ['Healthcare Management', 'Compliance', 'Leadership', 'Operations'],
//         companies: ['Kaiser Permanente', 'Mayo Clinic', 'Cleveland Clinic', 'Johns Hopkins', 'HCA Healthcare'],
//         jobTitles: ['Healthcare Administrator', 'Hospital Manager', 'Clinical Manager', 'Operations Director']
//       }
//     ]

//     setRecommendations(mockRecommendations)
//     localStorage.setItem('career_recommendations', JSON.stringify(mockRecommendations))
//   }

//   /**
//    * Toggle save status for a career path
//    */
//   const toggleSavePath = (career) => {
//     const isCurrentlySaved = savedPaths.some(path => path.id === career.id)
//     let newSavedPaths

//     if (isCurrentlySaved) {
//       newSavedPaths = savedPaths.filter(path => path.id !== career.id)
//     } else {
//       newSavedPaths = [...savedPaths, { ...career, savedDate: new Date().toISOString() }]
//     }

//     setSavedPaths(newSavedPaths)
//     localStorage.setItem('saved_career_paths', JSON.stringify(newSavedPaths))
//   }

//   /**
//    * Toggle detailed view for a career
//    */
//   const toggleDetails = (careerId) => {
//     setShowDetails(prev => ({
//       ...prev,
//       [careerId]: !prev[careerId]
//     }))
//   }

//   /**
//    * Filter and sort recommendations
//    */
//   const getFilteredRecommendations = () => {
//     let filtered = [...recommendations]

//     // Apply filters
//     if (filterBy === 'saved') {
//       filtered = filtered.filter(career => savedPaths.some(path => path.id === career.id))
//     } else if (filterBy === 'high-match') {
//       filtered = filtered.filter(career => career.compatibility >= 85)
//     } else if (filterBy === 'tech') {
//       filtered = filtered.filter(career => career.industry.includes('Technology'))
//     }

//     // Apply sorting
//     if (sortBy === 'compatibility') {
//       filtered.sort((a, b) => b.compatibility - a.compatibility)
//     } else if (sortBy === 'salary') {
//       filtered.sort((a, b) => {
//         const aSalary = parseInt(a.salaryRange.split(' - ')[1].replace(/[^0-9]/g, ''))
//         const bSalary = parseInt(b.salaryRange.split(' - ')[1].replace(/[^0-9]/g, ''))
//         return bSalary - aSalary
//       })
//     } else if (sortBy === 'growth') {
//       const growthOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
//       filtered.sort((a, b) => (growthOrder[b.growth] || 0) - (growthOrder[a.growth] || 0))
//     }

//     return filtered
//   }

//   const filteredRecommendations = getFilteredRecommendations()

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-4" />
//           <p className="text-white/60">Loading your career recommendations...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!assessmentData) {
//     return (
//       <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
//         <div className="text-center max-w-md">
//           <HiOutlineClipboardDocumentCheck className="w-20 h-20 text-white/40 mx-auto mb-6" />
//           <h2 className="text-2xl font-bold text-white mb-4">Assessment Required</h2>
//           <p className="text-white/60 mb-6">
//             Complete your career assessment to see personalized recommendations.
//           </p>
//           <Link href="/career/assessment">
//             <button className="btn-primary">
//               Take Assessment
//             </button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-mesh">
//       {/* Header */}
//       <div className="px-6 py-8 border-b border-white/10">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 Your Career Recommendations
//               </h1>
//               <p className="text-white/60 text-lg">
//                 Based on your assessment, here are your top career matches
//               </p>
//               <div className="flex items-center space-x-4 mt-4">
//                 <div className="flex items-center space-x-2 text-primary-400">
//                   <HiOutlineSparkles className="w-5 h-5" />
//                   <span className="text-sm font-medium">AI-Powered Analysis</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-emerald-400">
//                   <FiUsers className="w-5 h-5" /> {/* HiOutlineHandHeart */}
//                   <span className="text-sm font-medium">Islamic Perspective Included</span>
//                 </div>
//                 <div className="text-white/60 text-sm">
//                   Completed: {new Date(assessmentData.completedDate).toLocaleDateString()}
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center space-x-4 mt-6 lg:mt-0">
//               <button
//                 onClick={generateRecommendations}
//                 className="flex items-center space-x-2 px-4 py-2 glass-morphism rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
//               >
//                 <FiRefreshCw className="w-4 h-4" />
//                 <span>Refresh</span>
//               </button>
//               <Link href="/career/saved">
//                 <button className="flex items-center space-x-2 btn-secondary">
//                   <HiOutlineBookmark className="w-4 h-4" />
//                   <span>Saved ({savedPaths.length})</span>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Filters and Controls */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <FiFilter className="w-4 h-4 text-white/60" />
//               <span className="text-white/60 text-sm">Filter:</span>
//             </div>
//             <select
//               value={filterBy}
//               onChange={(e) => setFilterBy(e.target.value)}
//               className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
//             >
//               <option value="all">All Careers</option>
//               <option value="high-match">High Match (85%+)</option>
//               <option value="saved">Saved Only</option>
//               <option value="tech">Technology</option>
//             </select>
//           </div>

//           <div className="flex items-center space-x-4">
//             <span className="text-white/60 text-sm">Sort by:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
//             >
//               <option value="compatibility">Compatibility</option>
//               <option value="salary">Salary Range</option>
//               <option value="growth">Growth Potential</option>
//             </select>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-white/60">
//             Showing {filteredRecommendations.length} of {recommendations.length} recommendations
//           </p>
//         </div>

//         {/* Recommendations Grid */}
//         <div className="space-y-6">
//           {filteredRecommendations.map((career, index) => {
//             const isSaved = savedPaths.some(path => path.id === career.id)
//             const showingDetails = showDetails[career.id]
            
//             return (
//               <div 
//                 key={career.id}
//                 className="glass-morphism-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
//               >
//                 {/* Header */}
//                 <div className="flex items-start justify-between mb-6">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
//                       <HiOutlineBriefcase className="w-8 h-8 text-primary-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-white mb-2">{career.title}</h3>
//                       <p className="text-white/70 mb-3">{career.description}</p>
//                       <div className="flex items-center space-x-4 text-sm">
//                         <span className="text-white/60">{career.industry}</span>
//                         <span className="text-emerald-400">{career.growth} Growth</span>
//                         <span className="text-primary-400">{career.workEnvironment}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     {/* Compatibility Score */}
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-gradient-primary mb-1">
//                         {career.compatibility}%
//                       </div>
//                       <div className="text-xs text-white/60">Match</div>
//                     </div>

//                     {/* Save Button */}
//                     <button
//                       onClick={() => toggleSavePath(career)}
//                       className={`
//                         p-3 rounded-xl transition-all duration-200
//                         ${isSaved 
//                           ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
//                           : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
//                         }
//                       `}
//                     >
//                       {isSaved ? (
//                         <HiOutlineBookmark className="w-5 h-5 fill-current" />
//                       ) : (
//                         <HiOutlineBookmarkSlash className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Key Metrics */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                   <div className="text-center p-3 bg-white/5 rounded-lg">
//                     <HiOutlineCurrencyDollar className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
//                     <div className="text-sm text-white/60">Salary Range</div>
//                     <div className="font-semibold text-white">{career.salaryRange}</div>
//                   </div>
//                   <div className="text-center p-3 bg-white/5 rounded-lg">
//                     <FiStar className="w-5 h-5 text-primary-400 mx-auto mb-2" /> 
//                     <div className="text-sm text-white/60">Growth</div>
//                     <div className="font-semibold text-white">{career.growth}</div>
//                   </div>
//                   <div className="text-center p-3 bg-white/5 rounded-lg">
//                     <HiOutlineAcademicCap className="w-5 h-5 text-secondary-400 mx-auto mb-2" />
//                     <div className="text-sm text-white/60">Education</div>
//                     <div className="font-semibold text-white text-xs">{career.educationRequired}</div>
//                   </div>
//                   <div className="text-center p-3 bg-white/5 rounded-lg">
//                     <FiMapPin className="w-5 h-5 text-accent-400 mx-auto mb-2" />
//                     <div className="text-sm text-white/60">Environment</div>
//                     <div className="font-semibold text-white">{career.workEnvironment}</div>
//                   </div>
//                 </div>

//                 {/* Match Reasons */}
//                 <div className="mb-6">
//                   <h4 className="font-semibold text-white mb-3">Why this career matches you:</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                     {career.matchReasons.map((reason, i) => (
//                       <div key={i} className="flex items-center space-x-2">
//                         <FiStar className="w-4 h-4 text-primary-400" />
//                         <span className="text-white/80 text-sm">{reason}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Islamic Perspective */}
//                 <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6">
//                   <div className="flex items-center space-x-2 mb-2"> {/* HiOutlineHandHeart */}
//                     <FiStar className="w-5 h-5 text-emerald-400" />
//                     <span className="font-semibold text-emerald-400">Islamic Perspective</span>
//                     <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
//                      alignment {/* {career.islamicPerspective.alignment} Alignment */}
//                     </span>
//                   </div>
//                   <p className="text-white/80 text-sm mb-2">
//                   description{/* {career.islamicPerspective.description} */}
//                   </p>
//                   <p className="text-emerald-300 text-xs italic">
//                     considerations{/* {career.islamicPerspective.considerations} */}
//                     </p>
//                 </div>

//                 {/* Toggle Details Button */}
//                 <button
//                   onClick={() => toggleDetails(career.id)}
//                   className="w-full p-3 glass-morphism rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2"
//                 >
//                   <HiOutlineChartBarSquare className="w-4 h-4" />
//                   <span>{showingDetails ? 'Hide Details' : 'View Details'}</span>
//                 </button>

//                 {/* Detailed Information */}
//                 {showingDetails && (
//                   <div className="mt-6 space-y-6 pt-6 border-t border-white/10">
//                     {/* Next Steps */}
//                     <div>
//                       <h4 className="font-semibold text-white mb-3">Next Steps to Get Started:</h4>
//                       <div className="space-y-2">
//                         {career.nextSteps.map((step, i) => (
//                           <div key={i} className="flex items-start space-x-3">
//                             <span className="flex-shrink-0 w-6 h-6 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center text-sm font-bold">
//                               {i + 1}
//                             </span>
//                             <span className="text-white/80 text-sm">{step}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Key Skills */}
//                     <div>
//                       <h4 className="font-semibold text-white mb-3">Key Skills Required:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {career.skills.map((skill, i) => (
//                           <span key={i} className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-lg text-sm border border-secondary-500/30">
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Job Titles */}
//                     <div>
//                       <h4 className="font-semibold text-white mb-3">Common Job Titles:</h4>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                         {career.jobTitles.map((title, i) => (
//                           <div key={i} className="text-white/70 text-sm p-2 bg-white/5 rounded-lg text-center">
//                             {title}
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Top Companies */}
//                     <div>
//                       <h4 className="font-semibold text-white mb-3">Top Companies in this Field:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {career.companies.map((company, i) => (
//                           <span key={i} className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-lg text-sm border border-accent-500/30">
//                             {company}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                       <button className="flex-1 btn-primary">
//                         <HiOutlineArrowTopRightOnSquare className="w-4 h-4 mr-2" />
//                         Explore Resources
//                       </button>
//                       <button className="flex-1 btn-secondary">
//                         <HiOutlineShare className="w-4 h-4 mr-2" />
//                         Share Career
//                       </button>
//                       <button 
//                         onClick={() => toggleSavePath(career)}
//                         className={`
//                           flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2
//                           ${isSaved 
//                             ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30' 
//                             : 'bg-primary-500/20 text-primary-400 border border-primary-500/30 hover:bg-primary-500/30'
//                           }
//                         `}
//                       >
//                         {isSaved ? (
//                           <>
//                             <HiOutlineBookmark className="w-4 h-4 fill-current" />
//                             <span>Saved</span>
//                           </>
//                         ) : (
//                           <>
//                             <HiOutlineBookmark className="w-4 h-4" />
//                             <span>Save Career</span>
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })}
//         </div>

//         {/* No Results */}
//         {filteredRecommendations.length === 0 && (
//           <div className="text-center py-12">
//             <HiOutlineBriefcase className="w-16 h-16 text-white/40 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-white mb-2">No careers match your current filter</h3>
//             <p className="text-white/60 mb-4">Try adjusting your filters or taking the assessment again.</p>
//             <button
//               onClick={() => setFilterBy('all')}
//               className="btn-primary"
//             >
//               Show All Careers
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HiOutlineSparkles, 
  HiOutlineBriefcase, 
  HiOutlineBookmark,
  HiOutlineBookmarkSlash,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineChartBarSquare,
  HiOutlineAcademicCap,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
  HiOutlineHandHeart,
  HiOutlineClipboardDocumentCheck,
  HiOutlineShare
} from 'react-icons/hi2'
import { FiStar, FiUsers, FiMapPin, FiClock, FiFilter, FiRefreshCw } from 'react-icons/fi'

/**
 * Career Results Page
 * 
 * Features:
 * - Display AI-generated career recommendations
 * - Detailed compatibility scores and explanations
 * - Save/unsave career paths
 * - Islamic perspective for each career
 * - Next steps and resources
 * - Filtering and sorting options
 */
export default function CareerResults() {
  // State management
  const [recommendations, setRecommendations] = useState([])
  const [savedPaths, setSavedPaths] = useState([])
  const [assessmentData, setAssessmentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('compatibility')
  const [showDetails, setShowDetails] = useState({})

  // Load data on component mount
  useEffect(() => {
    loadCareerData()
  }, [])

  /**
   * Load career recommendations and user data
   */
  const loadCareerData = () => {
    try {
      // Get assessment data
      const assessment = localStorage.getItem('career_assessment')
      const savedCareerPaths = JSON.parse(localStorage.getItem('saved_career_paths') || '[]')
      const storedRecommendations = localStorage.getItem('career_recommendations')

      if (!assessment) {
        // No assessment completed yet - redirect or show message
        setIsLoading(false)
        return
      }

      setAssessmentData(JSON.parse(assessment))
      setSavedPaths(savedCareerPaths)

      // Load recommendations or generate if none exist
      if (storedRecommendations) {
        setRecommendations(JSON.parse(storedRecommendations))
      } else {
        // Generate recommendations if none exist
        generateRecommendations()
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Error loading career data:', error)
      setIsLoading(false)
    }
  }

  /**
   * Generate comprehensive career recommendations using real AI
   */
  const generateRecommendations = async () => {
    if (!assessmentData) return
    
    setIsLoading(true)
    
    try {
      // Import Groq client
      const { groqClient, isGroqConfigured } = await import('@/lib/ai/groq-client')
      
      // Check if API is configured
      if (!isGroqConfigured()) {
        const useAI = window.confirm(
          'Groq API is not configured. Would you like to enter your API key for AI-powered recommendations?'
        )
        
        if (useAI) {
          const apiKey = prompt('Please enter your Groq API key:')
          if (apiKey) {
            groqClient.setApiKey(apiKey)
          } else {
            generateMockRecommendations()
            setIsLoading(false)
            return
          }
        } else {
          generateMockRecommendations()
          setIsLoading(false)
          return
        }
      }

      // Show progress indicator
      const progressMessages = [
        'Analyzing your assessment responses...',
        'Matching your skills with career opportunities...',
        'Considering Islamic perspectives...',
        'Generating personalized recommendations...',
        'Finalizing your career matches...'
      ]
      
      let messageIndex = 0
      const progressInterval = setInterval(() => {
        // In a real implementation, you might show these messages in the UI
        console.log(progressMessages[messageIndex])
        messageIndex = (messageIndex + 1) % progressMessages.length
      }, 1000)

      // Generate real AI recommendations
      const aiRecommendations = await groqClient.generateCareerRecommendations(assessmentData.answers)
      
      clearInterval(progressInterval)
      console.log("Ai recommentationds: ", aiRecommendations)
      // Save and set recommendations
      localStorage.setItem('career_recommendations', JSON.stringify(aiRecommendations))
      setRecommendations(aiRecommendations)
      setIsLoading(false)
      
      // Show success message
      alert(`Successfully generated ${aiRecommendations.length} AI-powered career recommendations!`)
      
    } catch (error) {
      console.error('Error generating AI recommendations:', error)
      
      // Show user-friendly error and offer fallback
      const useFallback = window.confirm(
        `AI recommendation failed: ${error.message}\n\nWould you like to use sample recommendations instead?`
      )
      
      if (useFallback) {
        generateMockRecommendations()
      }
      
      setIsLoading(false)
    }
  }

  /**
   * Generate mock recommendations as fallback
   */
  const generateMockRecommendations = () => {
    const mockRecommendations = [
      {
        id: 1,
        title: 'Software Engineering',
        compatibility: 94,
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
        matchReasons: [
          'Strong analytical and problem-solving skills',
          'Interest in technology and innovation',
          'Preference for creative and logical work',
          'Ability to work independently and in teams'
        ],
        nextSteps: [
          'Learn programming fundamentals (Python, JavaScript)',
          'Build a portfolio of personal projects',
          'Contribute to open-source projects',
          'Network with software developers',
          'Consider coding bootcamps or CS degree'
        ],
        skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Creativity'],
        companies: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'],
        jobTitles: ['Software Developer', 'Full Stack Engineer', 'Frontend Developer', 'Backend Developer']
      },
      {
        id: 2,
        title: 'Data Science',
        compatibility: 91,
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
        matchReasons: [
          'Strong mathematical and statistical aptitude',
          'Research-oriented mindset',
          'Detail-oriented approach',
          'Interest in discovering patterns and insights'
        ],
        nextSteps: [
          'Master Python and R programming',
          'Learn machine learning algorithms',
          'Complete data science projects',
          'Obtain relevant certifications',
          'Build a data portfolio'
        ],
        skills: ['Statistics', 'Programming', 'Machine Learning', 'Data Visualization'],
        companies: ['Netflix', 'Uber', 'Airbnb', 'LinkedIn', 'Spotify'],
        jobTitles: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Research Scientist']
      },
      {
        id: 3,
        title: 'UX/UI Design',
        compatibility: 88,
        description: 'Create intuitive and beautiful digital experiences that delight users',
        industry: 'Design/Technology',
        salaryRange: '$65,000 - $120,000',
        growth: 'High',
        workEnvironment: 'Office/Remote',
        educationRequired: "Bachelor's in Design, HCI, or relevant portfolio",
        islamicPerspective: {
          alignment: 'High',
          description: 'Design with empathy to improve peoples daily lives and accessibility',
          considerations: 'Focus on inclusive design that serves all people equally'
        },
        matchReasons: [
          'Creative and visual thinking',
          'Strong empathy for user needs',
          'Attention to detail',
          'Interest in psychology and human behavior'
        ],
        nextSteps: [
          'Learn design tools (Figma, Sketch)',
          'Study user psychology and research methods',
          'Build a strong design portfolio',
          'Complete UX/UI courses',
          'Practice with redesign projects'
        ],
        skills: ['Design Thinking', 'Prototyping', 'User Research', 'Visual Design'],
        companies: ['Adobe', 'Salesforce', 'Dropbox', 'Slack', 'Shopify'],
        jobTitles: ['UX Designer', 'UI Designer', 'Product Designer', 'Design Researcher']
      },
      {
        id: 4,
        title: 'Digital Marketing',
        compatibility: 85,
        description: 'Promote products and services through digital channels and strategies',
        industry: 'Marketing/Business',
        salaryRange: '$50,000 - $100,000',
        growth: 'High',
        workEnvironment: 'Office/Remote',
        educationRequired: "Bachelor's in Marketing, Business, or related field",
        islamicPerspective: {
          alignment: 'Medium',
          description: 'Marketing can educate and connect people with beneficial products',
          considerations: 'Ensure honesty in advertising and promote halal products/services'
        },
        matchReasons: [
          'Strong communication skills',
          'Creative and strategic thinking',
          'Interest in consumer behavior',
          'Data-driven approach'
        ],
        nextSteps: [
          'Learn digital marketing fundamentals',
          'Get certified in Google Ads and Analytics',
          'Build personal brand on social media',
          'Create marketing campaigns for practice',
          'Network with marketing professionals'
        ],
        skills: ['Content Creation', 'Analytics', 'Strategy', 'Communication'],
        companies: ['HubSpot', 'Mailchimp', 'Buffer', 'Hootsuite', 'Canva'],
        jobTitles: ['Digital Marketer', 'Content Strategist', 'Social Media Manager', 'Growth Hacker']
      },
      {
        id: 5,
        title: 'Cybersecurity Specialist',
        compatibility: 82,
        description: 'Protect organizations and individuals from digital threats and attacks',
        industry: 'Technology/Security',
        salaryRange: '$80,000 - $140,000',
        growth: 'Very High',
        workEnvironment: 'Office/Remote',
        educationRequired: "Bachelor's in Cybersecurity, IT, or relevant certifications",
        islamicPerspective: {
          alignment: 'High',
          description: 'Protecting people and organizations from harm aligns with Islamic values',
          considerations: 'Focus on defensive security and ethical practices'
        },
        matchReasons: [
          'Strong analytical and problem-solving skills',
          'Interest in technology and security',
          'Detail-oriented approach',
          'Desire to protect others'
        ],
        nextSteps: [
          'Get CompTIA Security+ certification',
          'Learn networking and system administration',
          'Practice with cybersecurity labs',
          'Join cybersecurity communities',
          'Consider specialized certifications (CISSP, CEH)'
        ],
        skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Incident Response'],
        companies: ['CrowdStrike', 'Palo Alto Networks', 'FireEye', 'Symantec', 'Check Point'],
        jobTitles: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'CISO']
      },
      {
        id: 6,
        title: 'Healthcare Administration',
        compatibility: 79,
        description: 'Manage healthcare facilities and ensure quality patient care delivery',
        industry: 'Healthcare',
        salaryRange: '$60,000 - $120,000',
        growth: 'High',
        workEnvironment: 'Office/Healthcare Facilities',
        educationRequired: "Bachelor's in Healthcare Administration or related field",
        islamicPerspective: {
          alignment: 'Very High',
          description: 'Healthcare is considered a noble profession in Islam, serving humanity',
          considerations: 'Ensure equitable access to care and ethical medical practices'
        },
        matchReasons: [
          'Strong organizational and leadership skills',
          'Desire to help others and improve health outcomes',
          'Interest in healthcare systems',
          'Business and management aptitude'
        ],
        nextSteps: [
          'Get healthcare administration degree/certificate',
          'Gain experience in healthcare settings',
          'Learn healthcare regulations and compliance',
          'Develop leadership and management skills',
          'Network with healthcare professionals'
        ],
        skills: ['Healthcare Management', 'Compliance', 'Leadership', 'Operations'],
        companies: ['Kaiser Permanente', 'Mayo Clinic', 'Cleveland Clinic', 'Johns Hopkins', 'HCA Healthcare'],
        jobTitles: ['Healthcare Administrator', 'Hospital Manager', 'Clinical Manager', 'Operations Director']
      }
    ]

    setRecommendations(mockRecommendations)
    localStorage.setItem('career_recommendations', JSON.stringify(mockRecommendations))
  }

  /**
   * Toggle save status for a career path
   */
  const toggleSavePath = (career) => {
    const isCurrentlySaved = savedPaths.some(path => path.id === career.id)
    let newSavedPaths

    if (isCurrentlySaved) {
      newSavedPaths = savedPaths.filter(path => path.id !== career.id)
    } else {
      newSavedPaths = [...savedPaths, { ...career, savedDate: new Date().toISOString() }]
    }

    setSavedPaths(newSavedPaths)
    localStorage.setItem('saved_career_paths', JSON.stringify(newSavedPaths))
  }

  /**
   * Toggle detailed view for a career
   */
  const toggleDetails = (careerId) => {
    setShowDetails(prev => ({
      ...prev,
      [careerId]: !prev[careerId]
    }))
  }

  /**
   * Filter and sort recommendations
   */
  const getFilteredRecommendations = () => {
    let filtered = [...recommendations]

    // Apply filters
    if (filterBy === 'saved') {
      filtered = filtered.filter(career => savedPaths.some(path => path.id === career.id))
    } else if (filterBy === 'high-match') {
      filtered = filtered.filter(career => career.compatibility >= 85)
    } else if (filterBy === 'tech') {
      filtered = filtered.filter(career => career.industry.includes('Technology'))
    }

    // Apply sorting
    if (sortBy === 'compatibility') {
      filtered.sort((a, b) => b.compatibility - a.compatibility)
    } else if (sortBy === 'salary') {
      filtered.sort((a, b) => {
        const aSalary = parseInt(a.salaryRange.split(' - ')[1].replace(/[^0-9]/g, ''))
        const bSalary = parseInt(b.salaryRange.split(' - ')[1].replace(/[^0-9]/g, ''))
        return bSalary - aSalary
      })
    } else if (sortBy === 'growth') {
      const growthOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
      filtered.sort((a, b) => (growthOrder[b.growth] || 0) - (growthOrder[a.growth] || 0))
    }

    return filtered
  }

  const filteredRecommendations = getFilteredRecommendations()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your career recommendations...</p>
        </div>
      </div>
    )
  }

  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center max-w-md">
          <HiOutlineClipboardDocumentCheck className="w-20 h-20 text-white/40 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Assessment Required</h2>
          <p className="text-white/60 mb-6">
            Complete your career assessment to see personalized recommendations.
          </p>
          <Link href="/career/assessment">
            <button className="btn-primary">
              Take Assessment
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
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Your Career Recommendations
              </h1>
              <p className="text-white/60 text-lg">
                Based on your assessment, here are your top career matches
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2 text-primary-400">
                  <HiOutlineSparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <FiStar className="w-5 h-5" />
                  <span className="text-sm font-medium">Islamic Perspective Included</span>
                </div>
                <div className="text-white/60 text-sm">
                  Completed: {new Date(assessmentData.completedDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              <button
                onClick={generateRecommendations}
                className="flex items-center space-x-2 px-4 py-2 glass-morphism rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <Link href="/career/saved">
                <button className="flex items-center space-x-2 btn-secondary">
                  <HiOutlineBookmark className="w-4 h-4" />
                  <span>Saved ({savedPaths.length})</span>
                </button>
              </Link>
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
              <option value="all">All Careers</option>
              <option value="high-match">High Match (85%+)</option>
              <option value="saved">Saved Only</option>
              <option value="tech">Technology</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/60 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="compatibility">Compatibility</option>
              <option value="salary">Salary Range</option>
              <option value="growth">Growth Potential</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/60">
            Showing {filteredRecommendations.length} of {recommendations.length} recommendations
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-6">
          {filteredRecommendations.map((career, index) => {
            const isSaved = savedPaths.some(path => path.id === career.id)
            const showingDetails = showDetails[career.id]
            
            return (
              <div 
                key={career.id}
                className="glass-morphism-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
                      <HiOutlineBriefcase className="w-8 h-8 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{career.title}</h3>
                      <p className="text-white/70 mb-3">{career.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-white/60">{career.industry}</span>
                        <span className="text-emerald-400">{career.growth} Growth</span>
                        <span className="text-primary-400">{career.workEnvironment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Compatibility Score */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gradient-primary mb-1">
                        {career.compatibility}%
                      </div>
                      <div className="text-xs text-white/60">Match</div>
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={() => toggleSavePath(career)}
                      className={`
                        p-3 rounded-xl transition-all duration-200
                        ${isSaved 
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      {isSaved ? (
                        <HiOutlineBookmark className="w-5 h-5 fill-current" />
                      ) : (
                        <HiOutlineBookmarkSlash className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <HiOutlineCurrencyDollar className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                    <div className="text-sm text-white/60">Salary Range</div>
                    <div className="font-semibold text-white">{career.salaryRange}</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <FiStar className="w-5 h-5 text-primary-400 mx-auto mb-2" />
                    <div className="text-sm text-white/60">Growth</div>
                    <div className="font-semibold text-white">{career.growth}</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <HiOutlineAcademicCap className="w-5 h-5 text-secondary-400 mx-auto mb-2" />
                    <div className="text-sm text-white/60">Education</div>
                    <div className="font-semibold text-white text-xs">{career.educationRequired}</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <FiMapPin className="w-5 h-5 text-accent-400 mx-auto mb-2" />
                    <div className="text-sm text-white/60">Environment</div>
                    <div className="font-semibold text-white">{career.workEnvironment}</div>
                  </div>
                </div>

                {/* Match Reasons */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Why this career matches you:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {career.matchReasons.map((reason, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <FiStar className="w-4 h-4 text-primary-400" />
                        <span className="text-white/80 text-sm">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Islamic Perspective */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiStar className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">Islamic Perspective</span>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                      {career.islamicPerspective.alignment} Alignment
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-2">{career.islamicPerspective.description}</p>
                  <p className="text-emerald-300 text-xs italic">{career.islamicPerspective.considerations}</p>
                </div>

                {/* Toggle Details Button */}
                <button
                  onClick={() => toggleDetails(career.id)}
                  className="w-full p-3 glass-morphism rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <HiOutlineChartBarSquare className="w-4 h-4" />
                  <span>{showingDetails ? 'Hide Details' : 'View Details'}</span>
                </button>

                {/* Detailed Information */}
                {showingDetails && (
                  <div className="mt-6 space-y-6 pt-6 border-t border-white/10">
                    {/* Next Steps */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Next Steps to Get Started:</h4>
                      <div className="space-y-2">
                        {career.nextSteps.map((step, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center text-sm font-bold">
                              {i + 1}
                            </span>
                            <span className="text-white/80 text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Skills */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Key Skills Required:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-lg text-sm border border-secondary-500/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Job Titles */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Common Job Titles:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {career.jobTitles.map((title, i) => (
                          <div key={i} className="text-white/70 text-sm p-2 bg-white/5 rounded-lg text-center">
                            {title}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Top Companies */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Top Companies in this Field:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.companies.map((company, i) => (
                          <span key={i} className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-lg text-sm border border-accent-500/30">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button className="flex-1 btn-primary">
                        <HiOutlineArrowTopRightOnSquare className="w-4 h-4 mr-2" />
                        Explore Resources
                      </button>
                      <button className="flex-1 btn-secondary">
                        <HiOutlineShare className="w-4 h-4 mr-2" />
                        Share Career
                      </button>
                      <button 
                        onClick={() => toggleSavePath(career)}
                        className={`
                          flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2
                          ${isSaved 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30' 
                            : 'bg-primary-500/20 text-primary-400 border border-primary-500/30 hover:bg-primary-500/30'
                          }
                        `}
                      >
                        {isSaved ? (
                          <>
                            <HiOutlineBookmark className="w-4 h-4 fill-current" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <HiOutlineBookmark className="w-4 h-4" />
                            <span>Save Career</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <HiOutlineBriefcase className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No careers match your current filter</h3>
            <p className="text-white/60 mb-4">Try adjusting your filters or taking the assessment again.</p>
            <button
              onClick={() => setFilterBy('all')}
              className="btn-primary"
            >
              Show All Careers
            </button>
          </div>
        )}
      </div>
    </div>
  )
}