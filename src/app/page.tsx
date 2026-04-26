import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Themes from '@/components/Themes'
import Installation from '@/components/Installation'
import Documentation from '@/components/Documentation'
import Footer from '@/components/Footer'
import ThemeCustomizer from '@/components/ThemeCustomizer'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Themes />
        <Installation />
        <Documentation />
        <Footer />
      </main>
      <ThemeCustomizer />
    </>
  )
}
