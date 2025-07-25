'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'

/**
 * Sound Effects System
 * 
 * Features:
 * - Subtle UI sound effects
 * - Islamic-themed audio cues
 * - User preference controls
 * - Web Audio API for high-quality sounds
 * - Preloaded sound buffers for smooth playback
 */

// Sound Context for global sound management
const SoundContext = createContext()

export function SoundProvider({ children }) {
  const [isEnabled, setIsEnabled] = useState(false) // Default off for better UX
  const [volume, setVolume] = useState(0.3)
  const audioContextRef = useRef(null)
  const soundBuffersRef = useRef({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        preloadSounds()
      } catch (error) {
        console.warn('Web Audio API not supported:', error)
      }
    }
  }, [])

  // Preload sound effects
  const preloadSounds = async () => {
    const sounds = {
      // UI Sounds (generated programmatically for better performance)
      hover: generateTone(800, 0.1, 'sine'),
      click: generateTone(1000, 0.15, 'square'),
      success: generateChord([523.25, 659.25, 783.99], 0.5), // C major chord
      error: generateTone(200, 0.3, 'sawtooth'),
      notification: generateTone(880, 0.2, 'sine'),
      
      // Islamic-themed sounds
      dhikr: generateTone(432, 0.8, 'sine'), // 432 Hz - healing frequency
      prayer: generateChord([261.63, 329.63, 392.00], 1.0), // F major chord
      blessing: generateTone(528, 0.6, 'triangle'), // 528 Hz - love frequency
    }

    soundBuffersRef.current = sounds
    setIsLoaded(true)
  }

  // Generate tone programmatically
  const generateTone = (frequency, duration, waveType = 'sine') => {
    if (!audioContextRef.current) return null

    const audioContext = audioContextRef.current
    const bufferLength = audioContext.sampleRate * duration
    const buffer = audioContext.createBuffer(1, bufferLength, audioContext.sampleRate)
    const channelData = buffer.getChannelData(0)

    for (let i = 0; i < bufferLength; i++) {
      const t = i / audioContext.sampleRate
      const fadeIn = Math.min(t * 10, 1) // Fade in over 0.1s
      const fadeOut = Math.min((duration - t) * 10, 1) // Fade out over 0.1s
      const envelope = fadeIn * fadeOut

      let sample = 0
      switch (waveType) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t)
          break
        case 'square':
          sample = Math.sign(Math.sin(2 * Math.PI * frequency * t))
          break
        case 'triangle':
          sample = 2 * Math.abs(2 * (t * frequency - Math.floor(t * frequency + 0.5))) - 1
          break
        case 'sawtooth':
          sample = 2 * (t * frequency - Math.floor(t * frequency + 0.5))
          break
      }

      channelData[i] = sample * envelope * 0.1 // Low volume
    }

    return buffer
  }

  // Generate chord (multiple frequencies)
  const generateChord = (frequencies, duration) => {
    if (!audioContextRef.current) return null

    const audioContext = audioContextRef.current
    const bufferLength = audioContext.sampleRate * duration
    const buffer = audioContext.createBuffer(1, bufferLength, audioContext.sampleRate)
    const channelData = buffer.getChannelData(0)

    for (let i = 0; i < bufferLength; i++) {
      const t = i / audioContext.sampleRate
      const fadeIn = Math.min(t * 5, 1)
      const fadeOut = Math.min((duration - t) * 5, 1)
      const envelope = fadeIn * fadeOut

      let sample = 0
      frequencies.forEach(freq => {
        sample += Math.sin(2 * Math.PI * freq * t) / frequencies.length
      })

      channelData[i] = sample * envelope * 0.1
    }

    return buffer
  }

  // Play sound effect
  const playSound = (soundName, customVolume = null) => {
    if (!isEnabled || !audioContextRef.current || !soundBuffersRef.current[soundName]) {
      return
    }

    try {
      const audioContext = audioContextRef.current
      
      // Resume AudioContext if suspended (required by browser policies)
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }

      const source = audioContext.createBufferSource()
      const gainNode = audioContext.createGain()

      source.buffer = soundBuffersRef.current[soundName]
      gainNode.gain.value = customVolume !== null ? customVolume : volume

      source.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      source.start()
    } catch (error) {
      console.warn('Error playing sound:', error)
    }
  }

  const contextValue = {
    isEnabled,
    setIsEnabled,
    volume,
    setVolume,
    playSound,
    isLoaded
  }

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  )
}

// Hook to use sound effects
export function useSoundEffects() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundEffects must be used within a SoundProvider')
  }
  return context
}

// Sound Control Panel Component
export function SoundControls() {
  const { isEnabled, setIsEnabled, volume, setVolume, playSound } = useSoundEffects()

  const testSound = () => {
    playSound('blessing')
  }

  return (
    <div className="glass-morphism rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
        <span>🔊</span>
        <span>Sound Settings</span>
      </h3>
      
      <div className="space-y-4">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-white/80">Enable Sound Effects</span>
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`
              relative w-12 h-6 rounded-full transition-colors duration-300
              ${isEnabled ? 'bg-primary-600' : 'bg-neutral-600'}
            `}
          >
            <div className={`
              absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300
              ${isEnabled ? 'translate-x-7' : 'translate-x-1'}
            `} />
          </button>
        </div>

        {/* Volume Control */}
        {isEnabled && (
          <div className="space-y-2">
            <span className="text-white/80 text-sm">Volume: {Math.round(volume * 100)}%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
              }}
            />
          </div>
        )}

        {/* Test Button */}
        {isEnabled && (
          <button
            onClick={testSound}
            className="w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg text-white font-medium hover:opacity-80 transition-opacity"
          >
            Test Sound
          </button>
        )}

        {/* Sound Description */}
        <p className="text-white/60 text-xs leading-relaxed">
          Subtle audio feedback enhances your spiritual journey with gentle, Islamic-inspired tones.
        </p>
      </div>
    </div>
  )
}

// Enhanced Button with Sound Effects
export function SoundButton({ 
  children, 
  onClick, 
  soundType = 'click',
  className = '',
  disabled = false,
  ...props 
}) {
  const { playSound } = useSoundEffects()

  const handleClick = (e) => {
    if (!disabled) {
      playSound(soundType)
      onClick?.(e)
    }
  }

  const handleMouseEnter = () => {
    if (!disabled) {
      playSound('hover')
    }
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Enhanced Link with Sound Effects
export function SoundLink({ 
  children, 
  href, 
  onClick,
  soundType = 'click',
  className = '',
  ...props 
}) {
  const { playSound } = useSoundEffects()

  const handleClick = (e) => {
    playSound(soundType)
    onClick?.(e)
  }

  const handleMouseEnter = () => {
    playSound('hover')
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}

// Success Notification with Sound
export function SoundNotification({ type = 'success', message, onClose }) {
  const { playSound } = useSoundEffects()

  useEffect(() => {
    playSound(type === 'success' ? 'success' : 'notification')
  }, [])

  return (
    <div className={`
      fixed top-4 right-4 z-50 glass-morphism rounded-2xl p-4 border
      ${type === 'success' ? 'border-green-500/50' : 'border-blue-500/50'}
      animate-slide-in-right
    `}>
      <div className="flex items-center space-x-3">
        <div className={`
          w-2 h-2 rounded-full
          ${type === 'success' ? 'bg-green-400' : 'bg-blue-400'}
        `} />
        <span className="text-white">{message}</span>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Islamic Audio Cues
export function IslamicAudioCues() {
  const { playSound } = useSoundEffects()

  const cues = [
    { name: 'dhikr', label: 'Dhikr Tone', description: 'Peaceful remembrance tone' },
    { name: 'prayer', label: 'Prayer Call', description: 'Gentle prayer reminder' },
    { name: 'blessing', label: 'Blessing', description: 'Barakallahu feeki tone' }
  ]

  return (
    <div className="space-y-3">
      <h4 className="text-white font-medium">Islamic Audio Cues</h4>
      <div className="grid gap-2">
        {cues.map(cue => (
          <button
            key={cue.name}
            onClick={() => playSound(cue.name)}
            className="p-3 glass-morphism rounded-xl border border-white/10 hover:border-white/20 transition-all text-left"
          >
            <div className="text-white font-medium">{cue.label}</div>
            <div className="text-white/60 text-sm">{cue.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}