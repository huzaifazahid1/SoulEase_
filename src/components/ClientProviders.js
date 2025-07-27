// src/components/ClientProviders.js
'use client'

import { SoundProvider } from './SoundEffects'

export default function ClientProviders({ children }) {
  return (
    <SoundProvider>
      {children}
    </SoundProvider>
  )
}
