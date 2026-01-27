'use client'

import { Home, Factory, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function ModeSelector() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950" id="chat">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-zinc-800">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Willkommen!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Wählen Sie Ihren Bereich:
              </p>
            </div>
            
            {/* Mode Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* THOMAS Card */}
              <Link
                href="/chat?mode=thomas"
                className="group text-left p-8 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-[hsl(var(--primary))]/10 hover:from-[hsl(var(--primary))]/10 hover:to-[hsl(var(--primary))]/20 border-2 border-[hsl(var(--primary))]/20 hover:border-[hsl(var(--primary))] rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl active:scale-[0.98]"
              >
                <Home className="w-12 h-12 text-[hsl(var(--primary))] mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">THOMAS</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Staubsauger für Zuhause</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[hsl(var(--primary))]" />
                    Produktberatung
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[hsl(var(--primary))]" />
                    AQUA+ Technologie
                  </li>
                </ul>
              </Link>
              
              {/* ROTHO Card */}
              <Link
                href="/chat?mode=rotho"
                className="group text-left p-8 bg-gradient-to-br from-[hsl(var(--secondary))]/5 to-[hsl(var(--secondary))]/10 hover:from-[hsl(var(--secondary))]/10 hover:to-[hsl(var(--secondary))]/20 border-2 border-[hsl(var(--secondary))]/20 hover:border-[hsl(var(--secondary))] rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl active:scale-[0.98]"
              >
                <Factory className="w-12 h-12 text-[hsl(var(--secondary))] mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">ROTHO</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Industrieanlagen</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[hsl(var(--secondary))]" />
                    Ziegeltrocknung
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[hsl(var(--secondary))]" />
                    ROI-Beratung
                  </li>
                </ul>
              </Link>
              
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
