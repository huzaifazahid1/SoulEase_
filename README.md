# SoulEase - AI-Powered Islamic Mental Health & Career Platform

🌟 **Comprehensive Islamic guidance platform** combining AI-powered career counseling, emotional support, and spiritual growth tools for Muslim students and young professionals.

## 🚀 Overview

SoulEase is a next-generation platform that bridges modern AI technology with Islamic values, providing holistic support for career development, emotional well-being, and spiritual growth. Built with Next.js and Tailwind CSS, it offers a seamless, responsive experience across all devices.

## ✨ Core Features

### 🎯 **AI Career Navigator**
- **Intelligent Career Counseling**: AI-powered career guidance using Grok API
- **Skills Assessment**: Comprehensive evaluation with personalized recommendations
- **Future Insights**: Industry trends and growth predictions with dynamic analysis
- **Islamic Values Alignment**: Career paths that align with Islamic principles
- **Saved Career Paths**: Track and manage career exploration
- **Real-time Career Advisor**: Live AI consultation for career decisions

### 🧠 **Emotional AI Tracker**
- **Advanced Journal System**: Secure emotional journaling with AI insights
- **Mood Analytics**: Visual emotional tracking with comprehensive charts
- **Entry Management**: Create, edit, and organize journal entries
- **Historical Analysis**: Long-term emotional pattern recognition
- **Personalized Healing**: AI-generated therapeutic recommendations
- **Islamic Remedies**: Spiritual healing combined with modern psychology

### 📖 **Sacred Knowledge Hub**
- **Quran Integration**: Complete Quran with advanced search functionality
- **Hadith Collection**: Authentic Hadith database with smart categorization
- **Duas Library**: Comprehensive collection of supplications with categories
- **Daily Islamic Content**: Automated inspirational content delivery
- **Random Verse/Hadith API**: Daily spiritual reminders
- **Text-Based Content**: Pure textual experience, no audio dependencies

### 👥 **AI Mentor & Healing Space**
- **Three AI Mentors**: Distinct AI personalities for different guidance needs:
  - **🧔 Wise Imam**: Traditional Islamic guidance and religious counsel
  - **👩 Gentle Sister**: Supportive female perspective and emotional support
  - **👨 Friendly Brother**: Peer-to-peer masculine guidance and motivation
- **Personalized Conversations**: Context-aware AI responses
- **Emotional Healing**: Specialized therapeutic conversation flows
- **Safe Environment**: Gender-appropriate guidance spaces
- **Session Continuity**: Maintains conversation context and history

### 📊 **Comprehensive Dashboard**
- **Unified Overview**: All platform features in one centralized location
- **Progress Tracking**: Visual representation of personal growth
- **Quick Access**: Streamlined navigation to all major features
- **Daily Insights**: Personalized recommendations and reminders
- **Analytics Summary**: Mood, career, and spiritual growth metrics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom configurations
- **AI Integration**: Grok API for conversational AI and career analysis
- **Islamic Content APIs**: 
  - Custom Quran API for verses and translations
  - Hadith API for authentic narrations
  - Islamic calendar and prayer times integration
- **Data Storage**: Local Storage for user preferences and data persistence
- **Icons**: React Icons library
- **Animations**: CSS animations and Tailwind transitions
- **Configuration**: ESLint, PostCSS, and TypeScript support

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn package manager
- Grok API key for AI features

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd soulease

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Configuration
Create a `.env.local` file in the root directory:

```bash
# Grok AI API Configuration
GROK_API_KEY=your_grok_api_key_here

```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📁 Complete Project Structure

```
soulease/
├── 📂 src/
│   └── 📂 app/
│       ├── layout.js                    # Root layout with metadata
│       ├── page.js                      # Landing page
│       ├── globals.css                  # Global styles and animations
│       │
│       ├── 📂 api/
│       │   └── 📂 islamic/
│       │       ├── 📂 random-hadith/    # Random Hadith API endpoint
│       │       └── 📂 random-verse/     # Random Quran verse API
│       │
│       ├── 📂 career/
│       │   ├── layout.js                # Career section layout
│       │   ├── page.js                  # Career advisor main dashboard
│       │   ├── 📂 assessment/
│       │   │   └── page.js              # Career assessment form
│       │   ├── 📂 results/
│       │   │   └── page.js              # AI career recommendations
│       │   └── 📂 saved/
│       │       └── page.js              # Saved career paths & favorites
│       │
│       ├── 📂 dashboard/
│       │   ├── layout.js                # Dashboard layout
│       │   └── page.js                  # Main user dashboard
│       │
│       ├── 📂 islamic-content/
│       │   ├── page.js                  # Islamic content hub
│       │   ├── 📂 duas/
│       │   │   └── page.js              # Comprehensive Dua collection
│       │   ├── 📂 hadiths/
│       │   │   └── page.js              # Hadith database with search
│       │   └── 📂 quran/
│       │       └── page.js              # Quran reader with translations
│       │
│       ├── 📂 journal/
│       │   ├── page.js                  # Emotion tracker main dashboard
│       │   ├── 📂 analytics/
│       │   │   └── page.js              # Mood analytics & visual charts
│       │   ├── 📂 entry/
│       │   │   └── page.js              # Create new journal entry
│       │   └── 📂 history/
│       │       └── page.js              # Journal entry history & search
│       │
│       └── 📂 mentor/
│           ├── page.js                  # AI mentor selection interface
│           ├── 📂 brother/
│           │   └── page.js              # Friendly Brother AI chat
│           ├── 📂 imam/
│           │   └── page.js              # Wise Imam AI guidance
│           └── 📂 sister/
│               └── page.js              # Gentle Sister AI support
│
├── 📂 components/
│   ├── 📂 career/
│   │   ├── DynamicCareerAnalysis.js     # Real-time career analysis
│   │   └── RealtimeCareerAdvisor.js     # Live career consultation
│   │
│   ├── 📂 Grok/
│   │   ├── DynamicCareerAnalysis.js     # Grok AI career integration
│   │   └── RealtimeCareerAdvisor.js     # Grok AI real-time advisor
│   │
│   ├── 📂 islamic/
│   │   ├── AddDuaModal.js               # Add custom Duas modal
│   │   ├── CategoryTabs.js              # Content category navigation
│   │   ├── ContentCard.js               # Islamic content display cards
│   │   ├── DailyContentCard.js          # Daily Islamic content widget
│   │   ├── EmptyState.js                # Empty state placeholders
│   │   └── SearchBar.js                 # Islamic content search
│   │
│   ├── ClientProviders.js               # Context providers wrapper
│   ├── CTASection.js                    # Call-to-action sections
│   ├── FeaturesSection.js               # Landing page features
│   ├── Footer.js                        # Site footer
│   ├── HeroSection.js                   # Landing page hero
│   ├── HowItWorksSection.js             # Process explanation
│   ├── LoadingSkeleton.js               # Loading state components
│   ├── Navigation.js                    # Main navigation header
│   ├── PricingSection.js                # Pricing plans display
│   └── ScrollToTop.js                   # Scroll to top button
│
├── 📂 lib/
│   ├── 📂 ai/
│   │   └── groq-client.js               # Grok AI client integration
│   ├── 📂 data/
│   │   └── duas.json                    # Static Duas database
│   └── 📂 utils/
│       └── career-utils.js              # Career-related utility functions
│
├── 📂 data/                             # Static data files
├── .env.local                           # Environment variables
├── .gitignore                           # Git ignore rules
├── eslint.config.mjs                    # ESLint configuration
├── jsconfig.json                        # JavaScript configuration
├── next.config.mjs                      # Next.js configuration
├── package-lock.json                    # Dependency lock file
├── package.json                         # Project dependencies
├── postcss.config.js                    # PostCSS configuration
├── postcss.config.mjs                   # PostCSS ES module config
├── README.md                            # Project documentation
└── tailwind.config.js                   # Tailwind CSS configuration
```

## 🤖 AI Integration Details

### Grok API Implementation
- **Career Analysis**: Advanced career path recommendations using machine learning
- **Emotional Intelligence**: AI-powered mood analysis and therapeutic responses
- **Islamic Guidance**: AI mentors trained on Islamic principles and teachings
- **Dynamic Content**: Real-time content generation based on user interactions
- **Conversation Context**: Maintains context across multiple chat sessions
- **Personality Adaptation**: Different AI personalities for varied user needs

### Islamic Content APIs
- **Random Hadith Endpoint**: `/api/islamic/random-hadith`
- **Random Verse Endpoint**: `/api/islamic/random-verse`
- **Quran Integration**: Complete Quran with verse-by-verse access
- **Hadith Database**: Categorized authentic Hadith collections
- **Prayer Times**: Real-time prayer calculations based on location

## 🎨 Key Features & Components

### Dynamic UI Components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Comprehensive skeleton loading components
- **Interactive Cards**: Hover effects and smooth transitions
- **Modal Systems**: Context-aware modal dialogs
- **Search Functionality**: Advanced search across all Islamic content

### Data Management
- **Local Storage**: Persistent user data and preferences
- **Session Management**: Secure user session handling
- **Progress Tracking**: Comprehensive analytics and progress monitoring
- **Export Features**: Data export capabilities for journal entries
- **Backup System**: Automatic data backup to prevent loss

### User Experience
- **Intuitive Navigation**: Streamlined user interface design
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized loading and smooth interactions
- **Cross-Platform**: Consistent experience across all devices

## 🚀 Deployment & Production

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables in Vercel dashboard
vercel env add GROK_API_KEY
vercel env add NEXT_PUBLIC_QURAN_API_URL
```

### Environment Variables Setup
Configure the following in your deployment platform:
- `NEXT_PUBLIC_GROQ_API_KEY`: Your Grok AI API key

### Build Optimization
```bash
# Production build with optimizations
npm run build

# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
```

## 🔐 Security & Privacy

### Data Protection
- **Local Storage Encryption**: Sensitive data encrypted before storage
- **API Key Security**: Environment variables for secure API access
- **Input Validation**: Comprehensive input sanitization
- **XSS Protection**: Cross-site scripting prevention measures

### Islamic Compliance
- **Halal Data Practices**: Data handling compliant with Islamic principles
- **Privacy Focused**: Minimal data collection and user privacy respect
- **Content Verification**: All Islamic content verified for authenticity
- **Gender-Appropriate**: Separate guidance spaces for brothers and sisters

## 📈 Competitive Analysis

### vs. Replika
- ✅ **Islamic Values**: Faith-based conversations and Islamic guidance
- ✅ **Educational Focus**: Career development and academic support
- ✅ **Cultural Relevance**: Deep understanding of Muslim lifestyle and challenges
- ✅ **Multiple Mentors**: Three distinct AI personalities vs. single bot

### vs. BetterHelp
- ✅ **Islamic Therapy**: Spiritually-aligned mental health support
- ✅ **AI Accessibility**: 24/7 AI support vs. scheduled human sessions
- ✅ **Cost Effective**: More affordable than traditional therapy
- ✅ **Community Focused**: Ummah-centered approach to healing

### vs. LinkedIn Learning
- ✅ **Holistic Development**: Combines career, mental health, and spirituality
- ✅ **AI-Powered**: Personalized learning paths vs. generic courses
- ✅ **Islamic Integration**: Career guidance aligned with Islamic values
- ✅ **Real-time Support**: Live AI consultation vs. pre-recorded content

### vs. Headspace/Calm
- ✅ **Islamic Meditation**: Dhikr and Islamic mindfulness practices
- ✅ **Comprehensive Platform**: Mental health + career + spiritual growth
- ✅ **AI Personalization**: Adaptive content vs. static meditation tracks
- ✅ **Cultural Alignment**: Islamic principles integrated throughout

## 📄 License & Usage

**⚠️ Commercial License** - This project is proprietary software and is **NOT** available under any free or open-source license.

### Usage Rights
- ❌ **No Free Usage**: This software requires a valid commercial license
- ❌ **No Redistribution**: Cannot be shared, copied, or redistributed
- ❌ **No Modification**: Source code modifications require explicit permission
- ✅ **Commercial Licensing**: Available for businesses and organizations

### Contact for Licensing
- **Email**: zahidhuzaifa006@gmail.com
- **Business Inquiries**: zahidhuzaifa006@gmail.com
- **Partnership**: zahidhuzaifa006@gmail.com

## 🛠️ Development & Contributing

### Development Setup
```bash
# Install dependencies
npm install

# Start development with hot reload
npm run dev

# Run in development mode with debugging
npm run dev:debug

# Build and test production build locally
npm run build && npm run start
```

### Code Standards
- **ES6+ JavaScript**: Modern JavaScript features
- **Component-Based**: Modular React component architecture
- **Responsive Design**: Mobile-first Tailwind CSS approach
- **Islamic Ethics**: Code comments and practices aligned with Islamic values

### Contributing Guidelines
We welcome contributions from the Muslim developer community:

1. **Fork** the repository (requires licensing agreement)
2. **Create** a feature branch with descriptive naming
3. **Follow** Islamic coding ethics and best practices
4. **Test** thoroughly across different devices and browsers
5. **Submit** pull request with detailed description and Islamic motivation


## 🎯 Development Roadmap

### Phase 1: Core Enhancement (Q3 2025)
- [ ] **Advanced Grok Integration**: Enhanced AI conversation capabilities
- [ ] **Voice Recognition**: Arabic and English voice input support
- [ ] **Offline Mode**: Core features available without internet
- [ ] **Performance Optimization**: 50% faster loading times

### Phase 2: Community Features (Q4 2025)
- [ ] **User Authentication**: Secure account system with Islamic identity
- [ ] **Peer Mentoring**: Connect users with verified Muslim mentors
- [ ] **Study Circles**: Virtual Islamic study groups and discussions
- [ ] **Progress Sharing**: Anonymous progress sharing within community

### Phase 3: Advanced Analytics (Q1 2026)
- [ ] **Predictive Analytics**: AI-powered life path predictions
- [ ] **Goal Achievement**: Advanced goal setting with Islamic milestones
- [ ] **Spiritual Growth Metrics**: Comprehensive spiritual development tracking
- [ ] **Career Success Indicators**: Long-term career path optimization

### Phase 4: Global Expansion (Q2 2026)
- [ ] **Multi-Language**: Arabic, Urdu, Malay, Turkish, Persian support
- [ ] **Regional Customization**: Country-specific Islamic guidance
- [ ] **Local Mentor Network**: Region-based human mentor connections
- [ ] **Cultural Adaptation**: Local Islamic practices and customs integration


**بسم الله الرحمن الرحيم**

**Built with ❤️ and Islamic Values for the Ummah**

*"And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose."* - **Quran 65:3**

*Empowering Muslim students and professionals worldwide through AI-powered Islamic guidance, career development, and spiritual growth.*

---

**© 2025 SoulEase Platform. All Rights Reserved. | Commercial License Required**
