'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/islamic/SearchBar';
import ContentCard from '@/components/islamic/ContentCard';
import EmptyState from '@/components/islamic/EmptyState';
import LoadingSkelton from '@/components/LoadingSkelton';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.6 }
  }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Fallback dummy verses (quick initial content) ---
const FALLBACK_VERSES = [
  {
    id: 1,
    text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    surah: "Al-Fatiha",
    ayah: 1,
    surahNumber: 1,
    transliteration: "Bismillahir-Rahmanir-Raheem"
  },
  {
    id: 2,
    text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "[All] praise is [due] to Allah, Lord of the worlds.",
    surah: "Al-Fatiha",
    ayah: 2,
    surahNumber: 1,
    transliteration: "Alhamdu lillahi rabbil-alameen"
  },
  {
    id: 3,
    text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ",
    translation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
    surah: "Al-Baqarah",
    ayah: 2,
    surahNumber: 2,
    transliteration: "Thalikal-kitabu la rayba feeh, hudan lil-muttaqeen"
  },
  {
    id: 4,
    text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    translation: "And whoever fears Allah - He will make for him a way out.",
    surah: "At-Talaq",
    ayah: 2,
    surahNumber: 65,
    transliteration: "Wa man yattaqillaha yaj'al lahu makhrajan"
  }
];

// --- Component ---
export default function QuranPage() {
  const [verses, setVerses] = useState(FALLBACK_VERSES);
  const [filteredVerses, setFilteredVerses] = useState(FALLBACK_VERSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allSurahs, setAllSurahs] = useState(['All']);

  const VERSES_PER_PAGE = 30;

  // Initial load: show fallback first, fetch API in background
  useEffect(() => {
    filterVerses(); // show fallback instantly
    fetchFromAPI(); // then fetch real data
  }, []);

  useEffect(() => {
    filterVerses();
  }, [verses, searchQuery, selectedSurah, page]);

  const fetchFromAPI = async () => {
    try {
      // keep fallback visible
      const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
      if (!response.ok) throw new Error('API not available');
      const data = await response.json();

      const quranData = [];
      const surahNames = ['All'];

      data.data.surahs.forEach((surah) => {
        surahNames.push(surah.englishName);
        surah.ayahs.forEach((ayah) => {
          quranData.push({
            id: `${surah.number}-${ayah.numberInSurah}`,
            text: ayah.text, // Arabic
            translation: ayah.text, // English translation is limited in this API
            surah: surah.englishName,
            ayah: ayah.numberInSurah,
            surahNumber: surah.number,
            transliteration: ''
          });
        });
      });

      setVerses(quranData);
      setAllSurahs(surahNames);
      setPage(1);
      setHasMore(true);
      setError(null);
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to load Quran verses from API. Showing fallback data.');
    } finally {
      setLoading(false);
    }
  };

  const filterVerses = () => {
    let filtered = [...verses];

    if (selectedSurah !== 'All') {
      filtered = filtered.filter((verse) => verse.surah === selectedSurah);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (verse) =>
          verse.translation.toLowerCase().includes(query) ||
          verse.surah.toLowerCase().includes(query) ||
          verse.text.includes(searchQuery)
      );
    }

    const paginated = filtered.slice(0, page * VERSES_PER_PAGE);
    setFilteredVerses(paginated);
    setHasMore(filtered.length > paginated.length);
  };

  const loadMoreVerses = () => setPage((prev) => prev + 1);

  if (loading && verses === FALLBACK_VERSES) {
    // Only show skeleton on very first render (before fallback shows)
    return (
      <div className="min-h-screen bg-neural-950 container-padding section-padding">
        <div className="max-w-7xl mx-auto">
          <LoadingSkelton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neural-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float delay-1000" />

      <motion.div
        className="relative z-10 container-padding section-padding"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" variants={containerVariants}>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-primary mb-6">
              Holy Quran
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Explore the divine verses of the Holy Quran with translations
            </p>
          </motion.div>

          <motion.div className="mb-12 space-y-6" variants={containerVariants}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search verses by translation, surah name, or Arabic text..."
            />

            <motion.div
              className="overflow-x-auto pb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex space-x-3 min-w-max px-1">
                {allSurahs.map((surah) => (
                  <motion.button
                    key={surah}
                    onClick={() => {
                      setSelectedSurah(surah);
                      setPage(1);
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                      selectedSurah === surah
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                        : 'glass-morphism text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {surah}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="mb-8 flex items-center justify-between" variants={containerVariants}>
            <div className="text-white/60">
              {filteredVerses.length} {filteredVerses.length === 1 ? 'verse' : 'verses'} found
              {selectedSurah !== 'All' && ` in ${selectedSurah}`}
            </div>

            {(searchQuery || selectedSurah !== 'All') && (
              <motion.button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSurah('All');
                  setPage(1);
                }}
                className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Clear filters
              </motion.button>
            )}
          </motion.div>

          {error && (
            <motion.div
              className="glass-morphism rounded-2xl p-6 mb-8 border border-red-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-red-400 text-2xl">⚠️</div>
                <div>
                  <h3 className="text-red-400 font-semibold mb-1">Error Loading Verses</h3>
                  <p className="text-white/70 text-sm">{error}</p>
                </div>
                <motion.button
                  onClick={fetchFromAPI}
                  className="btn-primary ml-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  Retry
                </motion.button>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {filteredVerses.length > 0 ? (
              <motion.div
                key="verses-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredVerses.map((verse) => (
                  <ContentCard key={verse.id} type="verse" content={verse} />
                ))}
              </motion.div>
            ) : (
              <EmptyState
                icon="📕"
                title="No verses found"
                description={
                  searchQuery
                    ? `No verses match "${searchQuery}". Try different keywords or clear your search.`
                    : selectedSurah !== 'All'
                    ? `No verses found in ${selectedSurah}.`
                    : 'No verses available at the moment.'
                }
                actionText="Clear Search"
                onAction={() => {
                  setSearchQuery('');
                  setSelectedSurah('All');
                  setPage(1);
                }}
              />
            )}
          </AnimatePresence>

          {filteredVerses.length > 0 && hasMore && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={loadMoreVerses}
                className="btn-secondary inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Load More Verses</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
