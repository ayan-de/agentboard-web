import Container from '@/components/ui/Container'
import ThemeSwatch from '@/components/ui/ThemeSwatch'
import { themes } from '@/lib/themes'
import { ThemeInfo } from '@/types'

interface ThemesProps {
  onSelectTheme?: (theme: ThemeInfo) => void
}

export default function Themes({ onSelectTheme }: ThemesProps) {
  return (
    <section className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Beautiful Themes
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Shipped with gorgeous themes. Bring your own JSON theme for full
            customization.
          </p>
        </div>
        <div className="mx-auto mt-16 flex flex-wrap justify-center gap-8">
          {themes.map((theme) => (
            <ThemeSwatch key={theme.name} theme={theme} onSelect={onSelectTheme} />
          ))}
        </div>
      </Container>
    </section>
  )
}