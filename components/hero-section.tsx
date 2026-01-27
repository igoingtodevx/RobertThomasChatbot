'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [showHelp, setShowHelp] = useState(false)
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Easter egg: Press 'H' to show help overlay
      if (e.key === 'h' || e.key === 'H') {
        if (!e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT') {
          setShowHelp(prev => !prev)
        }
      }
      // Press Escape to close
      if (e.key === 'Escape') {
        setShowHelp(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[hsl(var(--hero-dark))] to-[hsl(var(--hero-light))] overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Status indicator - subtle quality signal */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white mb-8 border border-white/20 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-sm font-medium">Online & bereit</span>
            {/* Easter egg: hover shows uptime */}
            <span className="text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
              24/7 verfügbar
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Robert Intelligence
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-4">
            KI-gestützte Beratung für THOMAS & ROTHO
          </p>
          
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            70+ Jahre deutsche Ingenieurskunst, jetzt mit modernster KI.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="#chat"
              className="group px-8 py-4 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary-light))] text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Chat starten →
            </Link>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { icon: '🏭', value: '2.500+', label: 'Installationen', detail: 'Weltweit im Einsatz' },
              { icon: '🌍', value: '50+', label: 'Länder', detail: 'Auf allen Kontinenten' },
              { icon: '🏆', value: '125+', label: 'Jahre', detail: 'Seit 1900' },
              { icon: '🇩🇪', value: 'Made in', label: 'Germany', detail: 'Neunkirchen, Siegerland' },
            ].map((item) => (
              <div 
                key={item.label} 
                className="text-center group cursor-default"
                title={item.detail}
              >
                <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-2xl font-bold text-white group-hover:text-[hsl(var(--secondary))] transition-colors">
                  {item.value}
                </div>
                <div className="text-sm text-white/60">
                  {item.label}
                </div>
                {/* Easter egg: Shows on hover */}
                <div className="text-xs text-white/40 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>

      {/* Easter egg: Press 'H' for help hint */}
      <div className="absolute bottom-20 right-8 text-white/40 text-xs opacity-0 hover:opacity-100 transition-opacity">
        <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">H</kbd> für Hilfe
      </div>

      {/* Help overlay easter egg */}
      {showHelp && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowHelp(false)}
        >
          <div className="bg-white rounded-xl p-8 max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Tastaturkürzel</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Hilfe anzeigen</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded border text-xs">H</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Zum Chat</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded border text-xs">↓</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Schließen</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded border text-xs">ESC</kbd>
              </div>
            </div>
            <button 
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full px-4 py-2 bg-[hsl(var(--secondary))] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Verstanden
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
