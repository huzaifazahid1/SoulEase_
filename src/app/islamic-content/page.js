'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DailyContentCard from '@/components/islamic/DailyContentCard';
import LoadingSkelton from '@/components/LoadingSkelton';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            duration: 0.6
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export default function IslamicContentPage() {
    const [dailyContent, setDailyContent] = useState({
        verse: null,
        hadith: null,
        dua: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch daily content on component mount
    useEffect(() => {
        fetchDailyContent();
    }, []);

    const fetchDailyContent = async () => {
        try {
          setLoading(true);
      
          // 1. Fetch random Quran verse directly from external API
          const verseResponse = await fetch('https://api.alquran.cloud/v1/ayah/random');
          const verseJson = await verseResponse.json();
          const verseApiData = verseJson.data;
      
          console.log("Verse API:", verseApiData);
      
          // 2. Fetch random hadith (you can keep your own API for this)
          const hadithResponse = await fetch('/api/islamic/random-hadith');
          const hadithData = await hadithResponse.json();
          console.log("Hadith:", hadithData);
      
          // 3. Transform verse data
          const transformVerseData = (data) => {
            if (!data) return null;
      
            // Arabic text is available as data.text
            return {
              text: data.text,
              translation: data.edition?.englishName
                ? `Translation (${data.edition.englishName}) not fetched yet`
                : 'Translation not available yet',
              surah: data.surah?.englishName || `Surah ${data.surah?.number}`,
              ayah: data.numberInSurah,
            };
          };
      
          // 4. Transform hadith data
          const transformHadithData = (hadithApiData) => {
            if (!hadithApiData) return null;
      
            return {
              text: hadithApiData.hadith_english,
              narrator:
                hadithApiData.header?.replace('Narrated', '').replace(':', '').trim() ||
                'Unknown',
              grade: hadithApiData.book,
            };
          };
      
          // 5. Get random dua from local
          const randomDua = getRandomDua();
      
          // 6. Set state
          setDailyContent({
            verse: transformVerseData(verseApiData),
            hadith: transformHadithData(hadithData),
            dua: randomDua,
          });
      
        } catch (err) {
          console.error('Error fetching daily content:', err);
          setError('Failed to load daily content');
          loadFallbackContent();
        } finally {
          setLoading(false);
        }
      };
      

    const getRandomDua = () => {
        // Try to get from localStorage first
        const savedDuas = localStorage.getItem('islamic_duas');
        let duas = [];

        if (savedDuas) {
            duas = JSON.parse(savedDuas);
        } else {
            // Fallback duas
            duas = [
                {
                    id: 1,
                    title: "Morning Dua",
                    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا",
                    transliteration: "Allahumma bika asbahna wa bika amsayna",
                    translation: "O Allah, by You we enter the morning and by You we enter the evening",
                    category: "Morning",
                    isFavorite: false
                },
                {
                    id: 2,
                    title: "Evening Dua",
                    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا",
                    transliteration: "Allahumma bika amsayna wa bika asbahna",
                    translation: "O Allah, by You we enter the evening and by You we enter the morning",
                    category: "Evening",
                    isFavorite: false
                },
                {
                    id: 3,
                    title: "Before Eating",
                    arabic: "بِسْمِ اللَّهِ",
                    transliteration: "Bismillah",
                    translation: "In the name of Allah",
                    category: "Food",
                    isFavorite: false
                }
            ];
            // Save fallback to localStorage
            localStorage.setItem('islamic_duas', JSON.stringify(duas));
        }

        return duas[Math.floor(Math.random() * duas.length)];
    };

    const loadFallbackContent = () => {
        setDailyContent({
            verse: {
                text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
                translation: "And whoever fears Allah - He will make for him a way out",
                surah: "At-Talaq",
                ayah: 2
            },
            hadith: {
                text: "The best of people are those who benefit others.",
                narrator: "Ibn Majah",
                grade: "Hasan"
            },
            dua: getRandomDua()
        });
    };

    // Quick access cards data
    const quickAccessCards = [
        {
            title: "Duas",
            description: "Collection of daily prayers and supplications",
            href: "/islamic-content/duas",
            icon: "🤲",
            gradient: "from-primary-500 to-accent-500",
            count: "50+ Duas"
        },
        {
            title: "Hadiths",
            description: "Prophetic traditions and sayings",
            href: "/islamic-content/hadiths",
            icon: "📖",
            gradient: "from-secondary-500 to-primary-500",
            count: "1000+ Hadiths"
        },
        {
            title: "Quran",
            description: "Verses from the Holy Quran",
            href: "/islamic-content/quran",
            icon: "📕",
            gradient: "from-accent-500 to-secondary-500",
            count: "6236 Verses"
        }
    ];

    if (loading) {
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
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float delay-1000" />

            <motion.div
                className="relative z-10 container-padding section-padding"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto">

                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-16"
                        variants={itemVariants}
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-primary mb-6">
                            Daily Islamic Reminders
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Start your day with wisdom from the Quran, guidance from Hadith, and heartfelt duas
                        </p>
                    </motion.div>

                    {/* Daily Content Cards */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
                        variants={itemVariants}
                    >
                        <DailyContentCard
                            type="verse"
                            title="Today's Verse"
                            content={dailyContent.verse}
                            icon="📖"
                        />
                        <DailyContentCard
                            type="hadith"
                            title="Today's Hadith"
                            content={dailyContent.hadith}
                            icon="🕌"
                        />
                        <DailyContentCard
                            type="dua"
                            title="Today's Dua"
                            content={dailyContent.dua}
                            icon="🤲"
                        />
                    </motion.div>

                    {/* Quick Access Section */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
                            Explore Collections
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {quickAccessCards.map((card, index) => (
                                <motion.div
                                    key={card.title}
                                    variants={cardHoverVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    className="group"
                                >
                                    <Link href={card.href}>
                                        <div className="glass-morphism-card rounded-3xl p-8 h-full hover-glow-primary transition-all duration-500">
                                            {/* Card Header */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div className={`text-4xl p-4 bg-gradient-to-r ${card.gradient} rounded-2xl shadow-lg`}>
                                                    {card.icon}
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm text-white/60 font-medium">
                                                        {card.count}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-gradient-primary transition-all duration-300">
                                                {card.title}
                                            </h3>
                                            <p className="text-white/70 leading-relaxed mb-6">
                                                {card.description}
                                            </p>

                                            {/* Card Footer */}
                                            <div className="flex items-center text-primary-400 font-semibold group-hover:text-primary-300 transition-colors">
                                                <span>Explore Collection</span>
                                                <svg
                                                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Refresh Button */}
                    <motion.div
                        className="text-center mt-16"
                        variants={itemVariants}
                    >
                        <motion.button
                            onClick={fetchDailyContent}
                            className="btn-primary inline-flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                        >
                            <svg
                                className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>{loading ? 'Refreshing...' : 'Get New Content'}</span>
                        </motion.button>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}