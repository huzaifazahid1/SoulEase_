'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/islamic/SearchBar';
import CategoryTabs from '@/components/islamic/CategoryTabs';
import ContentCard from '@/components/islamic/ContentCard';
import EmptyState from '@/components/islamic/EmptyState';
import AddDuaModal from '@/components/islamic/AddDuaModal';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function DuasPage() {
  const [duas, setDuas] = useState([]);
  const [filteredDuas, setFilteredDuas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dua categories
  const categories = [
    'All', 'Morning', 'Evening', 'Food', 'Travel', 'Prayer', 'Protection', 'Forgiveness', 'Gratitude', 'Health'
  ];

  // Initialize duas from localStorage or fallback data
  useEffect(() => {
    loadDuas();
  }, []);

  // Filter duas based on category, search, and favorites
  useEffect(() => {
    filterDuas();
  }, [duas, selectedCategory, searchQuery, showFavoritesOnly]);

  const loadDuas = () => {
    try {
      const saved = localStorage.getItem('islamic_duas');
      let duasData = [];

      if (saved) {
        duasData = JSON.parse(saved);
      } else {
        // Fallback data
        duasData = [
          {
            id: 1,
            title: "Morning Dua",
            arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
            transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namootu wa ilayka an-nushoor",
            translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection",
            category: "Morning",
            isFavorite: false,
            dateAdded: new Date().toISOString()
          },
          {
            id: 2,
            title: "Evening Dua",
            arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
            transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namootu wa ilayka al-maseer",
            translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final destination",
            category: "Evening",
            isFavorite: false,
            dateAdded: new Date().toISOString()
          },
          {
            id: 3,
            title: "Before Eating",
            arabic: "بِسْمِ اللَّهِ وَبَرَكَةِ اللَّهِ",
            transliteration: "Bismillahi wa barakatillah",
            translation: "In the name of Allah and with the blessings of Allah",
            category: "Food",
            isFavorite: false,
            dateAdded: new Date().toISOString()
          },
          {
            id: 4,
            title: "After Eating",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
            transliteration: "Alhamdulillahi allathee at'amana wa saqana wa ja'alana muslimeen",
            translation: "Praise be to Allah who has fed us and given us drink and made us Muslims",
            category: "Food",
            isFavorite: false,
            dateAdded: new Date().toISOString()
          },
          {
            id: 5,
            title: "Travel Dua",
            arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
            transliteration: "Subhana allathee sakhkhara lana hatha wa ma kunna lahu muqrineen",
            translation: "Glory be to Him who has subjected this to us, and we could never have it (by our efforts)",
            category: "Travel",
            isFavorite: false,
            dateAdded: new Date().toISOString()
          },
          {
            id: 6,
            title: "Protection Dua",
            arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
            transliteration: "A'oothu bikalimatillahi at-tammati min sharri ma khalaq",
            translation: "I seek refuge in the perfect words of Allah from the evil of what He has created",
            category: "Protection",
            isFavorite: false,
            dateAdded: new Date().toISOString()
          },
          {
            id: 7,
            title: "Forgiveness Dua",
            arabic: "رَبِّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي",
            transliteration: "Rabbi ghfir lee thanbee wa khata'ee wa jahlee",
            translation: "My Lord, forgive me my sin, my error, and my ignorance",
            category: "Forgiveness",
            isFavorite: false,
            dateAdded: new Date().toISOString()
          },
          {
            id: 8,
            title: "Gratitude Dua",
            arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
            transliteration: "Rabbi awzi'nee an ashkura ni'mataka allatee an'amta 'alayya",
            translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me",
            category: "Gratitude",
            isFavorite: false,
            dateAdded: new Date().toISOString()
          }
        ];
        
        // Save fallback data to localStorage
        localStorage.setItem('islamic_duas', JSON.stringify(duasData));
      }

      setDuas(duasData);
    } catch (error) {
      console.error('Error loading duas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDuas = () => {
    let filtered = [...duas];

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter(dua => dua.isFavorite);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(dua => dua.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dua =>
        dua.title.toLowerCase().includes(query) ||
        dua.translation.toLowerCase().includes(query) ||
        dua.transliteration.toLowerCase().includes(query) ||
        dua.category.toLowerCase().includes(query)
      );
    }

    setFilteredDuas(filtered);
  };

  const toggleFavorite = (duaId) => {
    const updatedDuas = duas.map(dua =>
      dua.id === duaId ? { ...dua, isFavorite: !dua.isFavorite } : dua
    );
    
    setDuas(updatedDuas);
    localStorage.setItem('islamic_duas', JSON.stringify(updatedDuas));
  };

  const addNewDua = (newDua) => {
    const duaWithId = {
      ...newDua,
      id: Date.now(), // Simple ID generation
      isFavorite: false,
      dateAdded: new Date().toISOString()
    };
    
    const updatedDuas = [duaWithId, ...duas];
    setDuas(updatedDuas);
    localStorage.setItem('islamic_duas', JSON.stringify(updatedDuas));
    setIsAddModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neural-950 container-padding section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-white/10 rounded-2xl w-1/3"></div>
            <div className="h-16 bg-white/10 rounded-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-white/10 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neural-950 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float delay-1000" />
      
      <motion.div
        className="relative z-10 container-padding section-padding"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            variants={containerVariants}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-accent mb-6">
              Duas Collection
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Beautiful supplications for every moment of your day
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div 
            className="mb-12 space-y-6"
            variants={containerVariants}
          >
            
            {/* Search and Add Button */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-2xl">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search duas by title, translation, or category..."
                />
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Favorites Toggle */}
                <motion.button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    showFavoritesOnly 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'glass-morphism text-white/70 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">Favorites</span>
                </motion.button>

                {/* Add Dua Button */}
                <motion.button
                  onClick={() => setIsAddModalOpen(true)}
                  className="btn-primary flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Dua</span>
                </motion.button>
              </div>
            </div>

            {/* Category Tabs */}
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
          </motion.div>

          {/* Results Info */}
          <motion.div 
            className="mb-8 flex items-center justify-between"
            variants={containerVariants}
          >
            <div className="text-white/60">
              {filteredDuas.length} {filteredDuas.length === 1 ? 'dua' : 'duas'} found
              {showFavoritesOnly && ' in favorites'}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </div>
            
            {(searchQuery || selectedCategory !== 'All' || showFavoritesOnly) && (
              <motion.button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setShowFavoritesOnly(false);
                }}
                className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Clear filters
              </motion.button>
            )}
          </motion.div>

          {/* Duas Grid */}
          <AnimatePresence mode="wait">
            {filteredDuas.length > 0 ? (
              <motion.div
                key="duas-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredDuas.map((dua) => (
                  <ContentCard
                    key={dua.id}
                    type="dua"
                    content={dua}
                    onToggleFavorite={() => toggleFavorite(dua.id)}
                  />
                ))}
              </motion.div>
            ) : (
              <EmptyState
                icon="🤲"
                title="No duas found"
                description={
                  searchQuery 
                    ? `No duas match "${searchQuery}". Try different keywords or clear your search.`
                    : showFavoritesOnly 
                    ? "You haven't favorited any duas yet. Start exploring and mark your favorites!"
                    : selectedCategory !== 'All'
                    ? `No duas found in the ${selectedCategory} category.`
                    : "No duas available. Add your first dua to get started!"
                }
                actionText="Add New Dua"
                onAction={() => setIsAddModalOpen(true)}
              />
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      {/* Add Dua Modal */}
      <AddDuaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addNewDua}
        categories={categories.filter(cat => cat !== 'All')}
      />
    </div>
  );
}