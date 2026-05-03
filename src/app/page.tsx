'use client'

import Hero from '@/components/Hero'
import Separator from '@/components/ui/Separator'
import Features from '@/components/Features'
import Themes from '@/components/Themes'
import Installation from '@/components/Installation'
import Documentation from '@/components/Documentation'
import FAQ from '@/components/FAQ'
import Waitlist from '@/components/Waitlist'
import Footer from '@/components/Footer'
import SocialLinks from '@/components/SocialLinks'
import ThemeCustomizer from '@/components/ThemeCustomizer'
import { useThemeColors } from '@/lib/ThemeContext'
import { ThemeInfo } from '@/types'
import MadeBy from '@/components/MadeBy'

export default function Home() {
  const { setColors } = useThemeColors()

  const handleSelectTheme = (theme: ThemeInfo) => {
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
        <Separator />
        <Themes onSelectTheme={handleSelectTheme} />
        <Separator />
        <Installation />
        <Separator />
        <Documentation />
        <Separator />
        <FAQ />
        <Separator />
        <Waitlist />
        <Separator />
        <Footer />
        <Separator />
        <SocialLinks />
        <Separator />
        <MadeBy />
      </main>
      <ThemeCustomizer />
    </>
  )
}
