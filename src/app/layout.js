import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
// Font configurations with optimal settings
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

// Metadata for SEO and social sharing
export const metadata = {
  title: {
    default: 'SoulEase - AI-Powered Islamic Mental Health Platform',
    template: '%s | SoulEase'
  },
  description: 'Transform your mental journey with AI-powered Islamic spiritual guidance. Join 25,000+ students finding peace, purpose, and clarity through faith-based mental health support.',
  keywords: [
    'Islamic mental health',
    'AI spiritual guidance', 
    'Muslim students',
    'faith-based therapy',
    'Islamic counseling',
    'spiritual wellness',
    'mental health app',
    'Islamic psychology'
  ],
  authors: [{ name: 'SoulEase Team' }],
  creator: 'SoulEase',
  publisher: 'SoulEase',
  metadataBase: new URL('https://soulease.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://soulease.com',
    siteName: 'SoulEase',
    title: 'SoulEase - AI-Powered Islamic Mental Health Platform',
    description: 'Transform your mental journey with AI-powered Islamic spiritual guidance. Join 25,000+ students worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SoulEase - Islamic Mental Health Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SoulEase - AI-Powered Islamic Mental Health Platform',
    description: 'Transform your mental journey with AI-powered Islamic spiritual guidance.',
    images: ['/twitter-image.jpg'],
    creator: '@soulease',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#14b8a6',
      },
    ],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

// Viewport configuration for responsive design
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

/**
 * Root Layout Component
 * 
 * This component serves as the root layout for the entire application.
 * It includes:
 * - Font configurations (Inter and Plus Jakarta Sans)
 * - Global styles and theme setup
 * - SEO metadata and OpenGraph tags
 * - Accessibility features
 * - Performance optimizations
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 */
export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#14b8a6" />
        <meta name="msapplication-TileColor" content="#14b8a6" />
        
        {/* Apple-specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SoulEase" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured data for better search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "SoulEase",
              "description": "AI-Powered Islamic Mental Health Platform",
              "url": "https://soulease.com",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "25000"
              }
            })
          }}
        />
      </head>
      
      <body 
        className={`
          font-sans 
          antialiased 
          bg-neural-950 
          text-white 
          selection:bg-primary-500/20 
          selection:text-primary-100
          overflow-x-hidden
        `}
        suppressHydrationWarning
      >
        {/* Skip navigation link for accessibility */}
        <a 
          href="#main-content"
          className="
            sr-only 
            focus:not-sr-only 
            focus:absolute 
            focus:top-4 
            focus:left-4 
            focus:z-50 
            bg-primary-600 
            text-white 
            px-4 
            py-2 
            rounded-lg
            focus-visible
          "
        >
          Skip to main content
        </a>
        
        {/* Main application content */}
        <main id="main-content" className="min-h-screen">
          {/* <Navigation/> */}
          {children}
        </main>
        
        {/* Global background effects */}
        <div className="fixed inset-0 pointer-events-none z-[-1]">
          {/* Animated background mesh */}
          <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
          
          {/* Floating orbs for ambient effect */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl animate-float delay-1000" />
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-gradient-to-r from-accent-500/10 to-secondary-500/10 rounded-full blur-3xl animate-float delay-500" />
        </div>
        
        {/* Performance monitoring and analytics scripts would go here */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}