'use client'

import { useCallback, useState } from 'react'
import { Download } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Announcement from '@/components/ui/Announcement'
import LineBorder from '@/components/ui/LineBorder'
import TerminalMockup from '@/components/TerminalMockup'
import { HeroPixelField } from '@/components/HeroPixelField'
import { WORDMARK_ROWS, WORDMARK_WIDTH, WORDMARK_HEIGHT } from '@/data/agentboard-bitmap'

/** The wordmark as flat SVG runs, on the same lattice the canvas paints on.
 *  It holds the slot until the canvas has its first frame up, so the hero
 *  never shows an empty rectangle where the word belongs. */
function WordmarkFallback() {
  const runs: { x: number; y: number; w: number }[] = []
  WORDMARK_ROWS.forEach((bits, y) => {
    let run = 0
    for (let x = 0; x <= WORDMARK_WIDTH; x++) {
      if (bits[x] === '1') {
        run++
        continue
      }
      if (run > 0) runs.push({ x: x - run, y, w: run })
      run = 0
    }
  })
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_WIDTH} ${WORDMARK_HEIGHT}`}
      preserveAspectRatio="none"
      className="h-full w-full"
      fill="var(--foreground)"
      shapeRendering="crispEdges"
    >
      {runs.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} />
      ))}
    </svg>
  )
}

export default function Hero() {
  // The field paints the AGENTBOARD wordmark into itself on first frame, so
  // the SSR placeholder steps aside as soon as that happens. If for any
  // reason the canvas never paints (JS disabled, etc.) the accessible
  // heading stays put for screen readers and SEO.
  const [painted, setPainted] = useState(false)
  // Stable, or the canvas effect would tear down and rebuild on every render.
  const onPainted = useCallback(() => setPainted(true), [])

  return (
    <LineBorder>
      <section
        className="relative overflow-hidden border-b border-[var(--border)] pb-16 sm:pb-24"
        style={{ background: 'var(--background)' }}
      >
        {/* The field is bounded to this zone rather than the whole section,
            so it stops above the board mockup instead of drifting behind it.
            The zone carries the hero's top padding and the gap above the
            board as its own padding, so the canvas fills those too instead
            of leaving bare bands at either end.
            Its left/right edges land on the same rails LineBorder draws, so
            the drift is contained between them, and the section's
            overflow-hidden clips anything that would stray past them. */}
        <div className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              left: 'var(--content-offset)',
              right: 'var(--content-offset)',
            }}
          >
            <HeroPixelField onPainted={onPainted} />
          </div>

          <Container className="relative">
            <div data-hero-quiet className="flex justify-center">
              <Announcement />
            </div>

            {/* The wordmark slot. The canvas measures its size from this
                element's box and paints the AGENTBOARD bitmap into the same
                rectangle. Keep the aspect ratio locked to the bitmap so the
                letters stay square at every width. The accessible heading
                below is the real <h1> for screen readers and SEO; this slot
                is decorative. */}
            <div
              data-hero-wordmark
              aria-hidden="true"
              className="mx-auto mt-10 w-[70%] max-w-3xl"
              style={{ aspectRatio: `${WORDMARK_WIDTH} / ${WORDMARK_HEIGHT}` }}
            >
              {!painted && <WordmarkFallback />}
            </div>

            <div
              data-hero-quiet
              className="mx-auto mt-10 max-w-2xl text-center sm:mt-14"
            >
              <h1 className="sr-only">
                The terminal-based Kanban board for AI agents
              </h1>
              <p className="text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8 [text-wrap:balance]">
                AgentBoard orchestrate your AI coding agents — Claude Code, Cursor,
                OpenCode — from a beautiful terminal interface. Built for developers
                who want visual workflow management without leaving their terminal.
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <Button variant="primary" href="#installation">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  href="https://github.com/ayan-de/agent-board"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Outside the field zone: the board sits on plain background. */}
        <Container className="relative">
          <div className="relative">
            <TerminalMockup columns={[
              {
                id: 'backlog',
                title: 'Backlog',
                tickets: [
                  { id: 'AB-01', title: 'Implement context carry', status: 'backlog', priority: 'high', tags: ['feature', 'mcp'] },
                  { id: 'AB-02', title: 'Add Claude Code detection', status: 'backlog', priority: 'medium', tags: ['detection'] },
                  { id: 'AB-03', title: 'Write tests for orchestrator', status: 'backlog', priority: 'high', tags: ['testing'] },
                ],
              },
              {
                id: 'in_progress',
                title: 'In_progress',
                tickets: [
                  { id: 'AB-04', title: 'Build theme registry', status: 'in_progress', priority: 'critical', tags: ['core', 'feature'] },
                  { id: 'AB-05', title: 'Design proposal flow', status: 'in_progress', priority: 'medium', tags: ['orchestration'] },
                ],
              },
              {
                id: 'review',
                title: 'Review',
                tickets: [
                  { id: 'AB-06', title: 'Set up SQLite persistence', status: 'done', priority: 'high', tags: ['storage'] },
                ],
              },
              {
                id: 'done',
                title: 'Done',
                tickets: [
                  { id: 'AB-06', title: 'Set up SQLite persistence', status: 'done', priority: 'high', tags: ['storage'] },
                ],
              }
            ]} />
          </div>
        </Container>
      </section>
    </LineBorder>
  )
}
