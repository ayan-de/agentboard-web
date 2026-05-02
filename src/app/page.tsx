'use client'

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Themes from '@/components/Themes'
import Installation from '@/components/Installation'
import Documentation from '@/components/Documentation'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import ThemeCustomizer from '@/components/ThemeCustomizer'
import { useThemeColors } from '@/lib/ThemeContext'

export default function Home() {
  const { setColors } = useThemeColors()

  const handleSelectTheme = (theme: { name: string; primary: string; secondary: string; accent: string; background: string }) => {
    setColors(theme)
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.style.setProperty('--foreground', theme.primary)
      root.style.setProperty('--muted', theme.secondary)
      root.style.setProperty('--accent', theme.accent)
      root.style.setProperty('--background', theme.background)
    }
  }

  return (
    <>
      <main>
        <Hero />
        <Features />
        <Themes onSelectTheme={handleSelectTheme} />
        <Installation />
        <Documentation />
        <FAQ />
        <Footer />
      </main>
      <ThemeCustomizer />
    </>
  )
}
