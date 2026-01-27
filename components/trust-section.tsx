'use client'

import { Award, Globe, Shield, Factory } from 'lucide-react'

export function TrustSection() {
  const stats = [
    { icon: Factory, number: '2.500+', label: 'Installationen', detail: 'Weltweit im Einsatz' },
    { icon: Globe, number: '50+', label: 'Länder', detail: 'Auf allen Kontinenten' },
    { icon: Award, number: '125+', label: 'Jahre', detail: 'Seit 1900' },
    { icon: Shield, number: '100%', label: 'Made in Germany', detail: 'Neunkirchen, Siegerland' },
  ]

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Vertrauen durch Erfahrung
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Seit 1900 entwickeln wir Lösungen für höchste Ansprüche.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => {
            const Icon = item.icon
            return (
              <div 
                key={item.label} 
                className="group text-center p-8 rounded-xl bg-gray-50 dark:bg-zinc-900 hover:shadow-xl transition-all border border-gray-100 dark:border-zinc-800 hover:border-[hsl(var(--secondary))]/50 cursor-default"
                title={item.detail}
              >
                <div className="inline-flex p-4 rounded-full bg-[hsl(var(--secondary))]/10 mb-4 group-hover:bg-[hsl(var(--secondary))]/20 transition-colors">
                  <Icon className="w-8 h-8 text-[hsl(var(--secondary))] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[hsl(var(--secondary))] transition-colors">
                  {item.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {item.label}
                </div>
                {/* Easter egg: Shows on hover */}
                <div className="text-xs text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  {item.detail}
                </div>
              </div>
            )
          })}
        </div>
        
      </div>
    </section>
  )
}
