'use client'

import { useEffect, useRef } from 'react'
import {
  WORDMARK_HEIGHT,
  WORDMARK_ROWS,
  WORDMARK_WIDTH,
} from '@/data/agentboard-bitmap'

/** A pixel field that paints a Bayer-dithered, noise-driven texture behind the
 *  hero, lit by the cursor and stamped with the board glyph on press. The
 *  AGENTBOARD wordmark is painted as a separate pass on the same lattice, so
 *  it is always solid ink regardless of what the field is doing underneath.
 *  Reads its palette from the active theme's CSS variables. */

export type FieldGlyph = {
  rows: readonly string[]
  width: number
  height: number
}

export const WORDMARK_GLYPH: FieldGlyph = {
  rows: WORDMARK_ROWS,
  width: WORDMARK_WIDTH,
  height: WORDMARK_HEIGHT,
}

/** Palette tokens read from the active theme. Falls back to the site's
 *  monochrome defaults when a token is missing or the theme stylesheet has
 *  not landed yet. */
function readPalette() {
  const style = getComputedStyle(document.documentElement)
  const token = (name: string, fallback: string) =>
    style.getPropertyValue(name).trim() || fallback
  return {
    bg: token('--background', '#000000'),
    dim: token('--background-element', '#333333'),
    mid: token('--border', '#555555'),
    lit: token('--accent', '#ffffff'),
    hover: token('--secondary', '#888888'),
    crest: token('--foreground', '#ffffff'),
  }
}

/** Classic 8x8 ordered dither matrix, 0..63. */
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
]

const NOISE_SIZE = 128
/** Grid cells per unit of noise: how big the drifting blobs read. */
const CELLS_PER_NOISE = 9
/** Cursor reach, in grid cells. */
const CURSOR_CELLS = 12

/** How far down the word the ink starts easing off, and how far it travels
 *  from `crest` toward `hover` by the baseline. omarchy bands this in
 *  discrete steps because its theme inks already form a ramp; the themes
 *  here can be monochrome, where discrete steps read as a hard slice across
 *  the letters, so the fade is interpolated instead. */
const FADE_START = 0.55
const FADE_DEPTH = 0.72

/** The board mark stamped onto the field on press: a 15x15 frame holding
 *  three columns of cards. */
const STAMP_SIZE = 15
const STAMP_ROWS = [
  '111111111111111',
  '100000000000001',
  '101110111011101',
  '101110111011101',
  '100000000000001',
  '101110111011101',
  '101110111011101',
  '100000000000001',
  '101110111000001',
  '101110111000001',
  '100000000000001',
  '101110000000001',
  '101110000000001',
  '100000000000001',
  '111111111111111',
]

/* Match the hero slot width when rendering a field without a wordmark. */
const SLOT_INSET = 48
const SLOT_FRACTION = 0.88
const SLOT_MAX = 896
/** How far the field stands clear of the hero's own copy, in CSS px. */
const CLEAR_REACH = 90
const CLEAR_CURVE = 3

const CHARGE_TIME = 1.1
const CHARGE_FROM = 0.45
const CHARGE_GROWTH = 1.6

/** A click stamp: where the press landed and how it grows as it fades. */
type Ping = {
  x: number
  y: number
  born: number
  /** Cells per stamp pixel at launch and at full bloom. */
  from: number
  to: number
  /** Seconds the stamp takes to bloom out and dissolve. */
  life: number
}

function buildNoise(seed: number) {
  const size = NOISE_SIZE
  let state = seed >>> 0
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }

  let field = new Float32Array(size * size)
  for (let i = 0; i < field.length; i++) field[i] = random()

  // A couple of box passes turn white noise into soft blobs.
  for (let pass = 0; pass < 2; pass++) {
    const next = new Float32Array(size * size)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let sum = 0
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const sx = (x + dx + size) % size
            const sy = (y + dy + size) % size
            sum += field[sy * size + sx]
          }
        }
        next[y * size + x] = sum / 9
      }
    }
    field = next
  }

  // Box blurring collapses the range, so stretch it back out.
  let min = Infinity
  let max = -Infinity
  for (const v of field) {
    if (v < min) min = v
    if (v > max) max = v
  }
  const span = max - min || 1
  for (let i = 0; i < field.length; i++) field[i] = (field[i] - min) / span

  return field
}

/** A fixed 64x64 tile of per-cell threshold offsets, tiled over the grid. */
function buildJitter(seed: number) {
  let state = seed >>> 0
  const tile = new Float32Array(64 * 64)
  for (let i = 0; i < tile.length; i++) {
    state = (state * 1664525 + 1013904223) >>> 0
    tile[i] = state / 4294967296
  }
  return tile
}

/** Bilinear, smoothstepped sample of the wrapping noise field. Takes
 *  fractional coordinates — truncating them to integers here collapses the
 *  texture into flat blocks. */
function sample(field: Float32Array, x: number, y: number) {
  const size = NOISE_SIZE
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const fx = x - xi
  const fy = y - yi
  const x0 = ((xi % size) + size) % size
  const y0 = ((yi % size) + size) % size
  const x1 = (x0 + 1) % size
  const y1 = (y0 + 1) % size
  const sx = fx * fx * (3 - 2 * fx)
  const sy = fy * fy * (3 - 2 * fy)
  const a = field[y0 * size + x0]
  const b = field[y0 * size + x1]
  const c = field[y1 * size + x0]
  const d = field[y1 * size + x1]
  return (a * (1 - sx) + b * sx) * (1 - sy) + (c * (1 - sx) + d * sx) * sy
}

type Props = {
  /** Fired once the field has painted its first frame, so any SSR wordmark
   *  can step aside. */
  onPainted?: () => void
  /** The word the field paints. Defaults to the AGENTBOARD wordmark. */
  glyph?: FieldGlyph
}

export function HeroPixelField({ onPainted, glyph = WORDMARK_GLYPH }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paintedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches
    const noise = buildNoise(0x9ece6a)
    const jitter = buildJitter(0x0a1f14)

    let palette = readPalette()

    /** A CSS colour as [r, g, b], or null if it is not a plain hex/rgb. */
    const parse = (css: string): [number, number, number] | null => {
      const hex = /^#([0-9a-f]{6})$/i.exec(css.trim())
      if (hex) {
        const n = parseInt(hex[1], 16)
        return [n >> 16, (n >> 8) & 255, n & 255]
      }
      const rgb = /^rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i.exec(css.trim())
      return rgb ? [+rgb[1], +rgb[2], +rgb[3]] : null
    }

    const mix = (from: string, to: string, t: number) => {
      if (t <= 0) return from
      if (t >= 1) return to
      const a = parse(from)
      const b = parse(to)
      if (!a || !b) return t < 0.5 ? from : to
      const c = a.map((v, i) => Math.round(v + (b[i] - v) * t))
      return `rgb(${c[0]},${c[1]},${c[2]})`
    }

    /** The resting ink of each row of the word, in this theme: crest at the
     *  top, easing toward hover over the last rows. */
    let restInks: string[] = []
    const buildRestInks = () => {
      restInks = []
      const last = Math.max(1, glyph.height - 1)
      for (let row = 0; row < glyph.height; row++) {
        const down = row / last
        const fade = Math.max(0, (down - FADE_START) / (1 - FADE_START))
        restInks.push(mix(palette.crest, palette.hover, fade * FADE_DEPTH))
      }
    }
    buildRestInks()

    // Device-pixel geometry, recomputed on resize. Everything is drawn on
    // whole device pixels so cell edges stay razor sharp at any DPR.
    let dpr = 1
    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    // One grid for everything, anchored on the wordmark: the slot rect in
    // device px, divided into fractional cells. Field cells are the same
    // cells as logo pixels, addressed by the same indices, with the wordmark
    // occupying columns 0..glyph.width and rows 0..glyph.height, and the rest
    // of the field running into negative and larger indices. Every drawn edge
    // rounds the same grid line, so cells butt pixel-perfectly everywhere.
    let wmX = 0
    let wmY = 0
    let wmCW = 10
    let wmCH = 10
    let cMin = 0
    let rMin = 0
    let ramp = new Float32Array(0)

    // Everything the field should stand clear of: every line of the hero's
    // own copy, and the bar's controls.
    const quietElements = [
      ...host.parentElement!.querySelectorAll<HTMLElement>(
        '[data-hero-quiet], header a, header button',
      ),
    ].flatMap((el) =>
      el.matches('[data-hero-quiet]')
        ? ([...el.children] as HTMLElement[])
        : [el],
    )

    const sectionEl = host.closest<HTMLElement>('section, main')
    const pointer = { x: -1e4, y: -1e4 }
    let visible = true
    let strength = 0
    let targetStrength = 0
    let pings: Ping[] = []
    let holding: { x: number; y: number; start: number } | null = null

    const measure = () => {
      const box = host.getBoundingClientRect()
      if (box.width < 1 || box.height < 1) return false

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const nextWidth = Math.round(box.width * dpr)
      const nextHeight = Math.round(box.height * dpr)
      // Assigning canvas.width wipes the buffer, so only do it when the size
      // has actually changed.
      if (nextWidth !== width || nextHeight !== height) {
        width = nextWidth
        height = nextHeight
        canvas.width = width
        canvas.height = height
      }
      canvas.style.width = `${box.width}px`
      canvas.style.height = `${box.height}px`

      // Scope slot measurements to this hero so other sections cannot use
      // its geometry.
      const slot = document.querySelector<HTMLElement>('[data-hero-wordmark]')
      const slotBox = slot?.getBoundingClientRect()
      const slotWidth =
        (slotBox?.width ??
          Math.min(SLOT_FRACTION * (box.width - SLOT_INSET), SLOT_MAX)) * dpr
      wmX = slotBox ? (slotBox.left - box.left) * dpr : (width - slotWidth) / 2
      wmY = ((slotBox?.top ?? box.top) - box.top) * dpr
      wmCW = (slotBox ? slotBox.width * dpr : slotWidth) / glyph.width
      wmCH =
        (slotBox
          ? slotBox.height * dpr
          : (slotWidth * glyph.height) / glyph.width) / glyph.height

      cMin = -Math.ceil(wmX / wmCW) - 1
      rMin = -Math.ceil(wmY / wmCH) - 1
      cols = Math.ceil((width - wmX) / wmCW) - cMin + 1
      rows = Math.ceil((height - wmY) / wmCH) - rMin + 1

      const quietBoxes = quietElements
        .map((el) => el.getBoundingClientRect())
        .filter((rect) => rect.width >= 1 && rect.height >= 1)
        .map((rect) => ({
          l: (rect.left - box.left) * dpr,
          t: (rect.top - box.top) * dpr,
          r: (rect.right - box.left) * dpr,
          b: (rect.bottom - box.top) * dpr,
        }))
      const clearReach = CLEAR_REACH * dpr
      const clearOf = (x: number, y: number) => {
        if (quietBoxes.length === 0) return 1
        let nearest = Infinity
        for (const q of quietBoxes) {
          const dx = Math.max(q.l - x, 0, x - q.r)
          const dy = Math.max(q.t - y, 0, y - q.b)
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < nearest) nearest = dist
        }
        if (nearest >= clearReach) return 1
        return (nearest / clearReach) ** CLEAR_CURVE
      }

      // The field is densest at the edges of the canvas and thins toward the
      // middle, where the word sits: a radial mask, squared so the falloff is
      // gentle. It runs to the zone's top and bottom edges — the hero's
      // padding is inside the zone, so those edges are the section's.
      ramp = new Float32Array(cols * rows)
      for (let r = 0; r < rows; r++) {
        const y = wmY + (rMin + r + 0.5) * wmCH
        const ny = (y / height) * 2 - 1
        for (let c = 0; c < cols; c++) {
          const x = wmX + (cMin + c + 0.5) * wmCW
          const nx = (x / width) * 2 - 1
          const rr = Math.sqrt(nx * nx + ny * ny * 0.82)
          const eased = Math.min(1, Math.max(0, (rr - 0.42) / 0.85))
          ramp[r * cols + c] = eased * eased * clearOf(x, y)
        }
      }
      return true
    }

    const chargeOf = (now: number, start: number) =>
      Math.min((now - start) / 1000 / CHARGE_TIME, 1)

    let lastDraw = 0
    let frame = 0
    const draw = (time: number) => {
      const t = reducedMotion ? 0 : time / 1000

      // The pointer itself is never smoothed: the cells under the cursor are
      // the cells that light. Only the fade in and out of the field's
      // response is eased.
      strength += (targetStrength - strength) * 0.3

      ctx.fillStyle = palette.bg
      ctx.fillRect(0, 0, width, height)
      if (cols === 0 || rows === 0) return

      /** The glows alive this frame. Only the pointer's, for now. */
      const glows: { x: number; y: number; strength: number; reach: number }[] =
        []
      if (strength > 0.01) {
        glows.push({
          x: pointer.x,
          y: pointer.y,
          strength,
          reach: CURSOR_CELLS * wmCW * (0.45 + 0.55 * strength),
        })
      }

      // Resolve each live click stamp once per frame, not once per cell.
      const stamps: { x: number; y: number; cellPx: number; amp: number }[] = []
      if (pings.length > 0) {
        pings = pings.filter((ping) => (time - ping.born) / 1000 < ping.life)
        for (const ping of pings) {
          const age = (time - ping.born) / 1000 / ping.life
          const grow = 1 - (1 - age) ** 3
          stamps.push({
            x: ping.x,
            y: ping.y,
            cellPx: wmCW * (ping.from + (ping.to - ping.from) * grow),
            amp: (1 - age) ** 1.7,
          })
        }
      }
      if (holding) {
        stamps.push({
          x: holding.x,
          y: holding.y,
          cellPx:
            wmCW * (CHARGE_FROM + CHARGE_GROWTH * chargeOf(time, holding.start)),
          amp: 0.9,
        })
      }

      /** The strongest live stamp covering a device-px point, if any. */
      const stampAt = (cx: number, cy: number) => {
        let amp = 0
        for (const stamp of stamps) {
          const lx = Math.floor((cx - stamp.x) / stamp.cellPx + STAMP_SIZE / 2)
          const ly = Math.floor((cy - stamp.y) / stamp.cellPx + STAMP_SIZE / 2)
          if (lx < 0 || ly < 0 || lx >= STAMP_SIZE || ly >= STAMP_SIZE) continue
          if (STAMP_ROWS[ly][lx] === '1' && stamp.amp > amp) amp = stamp.amp
        }
        return amp
      }

      // Pass one: the field. Cells the wordmark occupies are skipped here and
      // painted solid by pass two, so the letters never dissolve into the
      // dither.
      for (let r = 0; r < rows; r++) {
        const row = rMin + r
        const yTop = wmY + row * wmCH
        const y = Math.round(yTop)
        const cellH = Math.round(yTop + wmCH) - y
        const cy = yTop + wmCH / 2
        for (let c = 0; c < cols; c++) {
          const col = cMin + c
          if (
            col >= 0 &&
            col < glyph.width &&
            row >= 0 &&
            row < glyph.height &&
            glyph.rows[row][col] === '1'
          ) {
            continue
          }

          const shade = ramp[r * cols + c]
          let lum = 0

          if (shade > 0.002) {
            // Two octaves of drifting noise, sampled at fractional grid
            // coordinates so the blobs stay smooth between cells.
            const u = col / CELLS_PER_NOISE
            const v = row / CELLS_PER_NOISE
            const base =
              0.6 * sample(noise, u + t * 0.14, v - t * 0.055) +
              0.4 * sample(noise, u * 0.55 - t * 0.08, v * 0.55 + t * 0.06)

            const twinkle =
              0.5 +
              0.5 *
                Math.sin(t * 1.1 + jitter[(row * 37 + col * 11) & 4095] * 6.283)

            lum = shade * (0.3 + 0.52 * base * base + 0.18 * twinkle) * 0.62
          }

          const xLeft = wmX + col * wmCW
          const cx = xLeft + wmCW / 2

          let glowAmount = 0
          for (const glow of glows) {
            const dx = cx - glow.x
            const dy = cy - glow.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < glow.reach) {
              const falloff = 1 - dist / glow.reach
              const amount = falloff * falloff * glow.strength
              if (amount > glowAmount) glowAmount = amount
            }
          }
          lum += glowAmount * 0.6

          let waveAmount = 0
          if (stamps.length > 0) {
            waveAmount = stampAt(cx, cy)
            lum += waveAmount * 1.15
          }

          // Pure Bayer would light the same low-index cells everywhere and
          // read as a regular lattice at this density, so a fixed per-cell
          // offset scatters the resting field while the ordered structure
          // still shows up where the cursor pushes luminance high.
          const threshold =
            0.78 * ((BAYER[(row & 7) * 8 + (col & 7)] + 0.5) / 64) +
            0.22 * jitter[(row & 63) * 64 + (col & 63)]
          if (lum <= threshold) continue

          const heat = Math.max(glowAmount, waveAmount)
          ctx.fillStyle =
            heat > 0.34 ? palette.lit : heat > 0.1 ? palette.mid : palette.dim
          const x = Math.round(xLeft)
          ctx.fillRect(x, y, Math.round(xLeft + wmCW) - x, cellH)
        }
      }

      const glowsOnWordmark = glows.filter(
        (glow) =>
          glow.x > wmX - glow.reach &&
          glow.x < wmX + glyph.width * wmCW + glow.reach &&
          glow.y > wmY - glow.reach &&
          glow.y < wmY + glyph.height * wmCH + glow.reach,
      )
      const cursorOnWordmark = glowsOnWordmark.length > 0

      /** The ink a wordmark cell takes at a device-px centre: its resting
       *  band, lifted by a stamp washing over it or the cursor passing near
       *  it. */
      const wordmarkInk = (cx: number, cy: number, row: number) => {
        let crest = stamps.length > 0 ? stampAt(cx, cy) : 0
        for (const glow of glowsOnWordmark) {
          const dx = cx - glow.x
          const dy = cy - glow.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < glow.reach) {
            const falloff = 1 - dist / glow.reach
            const hit = falloff * falloff * glow.strength
            if (hit > crest) crest = hit
          }
        }
        return crest > 0.45
          ? palette.crest
          : crest > 0.12
            ? palette.hover
            : restInks[row]
      }

      // Pass two: the word. Cell edges snap to whole device px with rounding
      // against the shared fractional grid, so adjacent cells always meet
      // exactly and there are no seams inside letters. At rest a whole run of
      // lit cells goes down as one rect.
      for (let row = 0; row < glyph.height; row++) {
        const bits = glyph.rows[row]
        const yTop = wmY + row * wmCH
        const y = Math.round(yTop)
        const rowHeight = Math.round(yTop + wmCH) - y

        if (stamps.length === 0 && !cursorOnWordmark) {
          ctx.fillStyle = restInks[row]
          let run = 0
          for (let col = 0; col <= glyph.width; col++) {
            if (bits[col] === '1') {
              run++
              continue
            }
            if (run > 0) {
              const x = Math.round(wmX + (col - run) * wmCW)
              ctx.fillRect(x, y, Math.round(wmX + col * wmCW) - x, rowHeight)
              run = 0
            }
          }
          continue
        }

        for (let col = 0; col < glyph.width; col++) {
          if (bits[col] !== '1') continue
          const xLeft = wmX + col * wmCW
          const x = Math.round(xLeft)
          ctx.fillStyle = wordmarkInk(xLeft + wmCW / 2, yTop + wmCH / 2, row)
          ctx.fillRect(x, y, Math.round(xLeft + wmCW) - x, rowHeight)
        }
      }

      lastDraw = time
      if (!paintedRef.current) {
        paintedRef.current = true
        onPainted?.()
      }
    }

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop)
      draw(time)
    }

    const onTheme = () => {
      palette = readPalette()
      buildRestInks()
      if (reducedMotion) draw(0)
    }
    // Themes here are switched by writing on <html>, so watch the document
    // element for changes and rebuild the palette without a custom event.
    const themeObserver = new MutationObserver(onTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style'],
    })

    const nearestTo = (
      list: HTMLElement[],
      clientX: number,
      clientY: number,
    ) => {
      let nearest = Infinity
      for (const el of list) {
        const rect = el.getBoundingClientRect()
        if (rect.width < 1 || rect.height < 1) continue
        const dx = Math.max(rect.left - clientX, 0, clientX - rect.right)
        const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom)
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < nearest) nearest = dist
      }
      return nearest
    }

    const strengthAt = (clientX: number, clientY: number) => {
      const dist = nearestTo(quietElements, clientX, clientY)
      return dist >= CLEAR_REACH ? 1 : (dist / CLEAR_REACH) ** CLEAR_CURVE
    }

    const locate = (event: PointerEvent) => {
      const box = host.getBoundingClientRect()
      const inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom
      return {
        inside,
        strength: strengthAt(event.clientX, event.clientY),
        x: (event.clientX - box.left) * dpr,
        y: (event.clientY - box.top) * dpr,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!visible) return
      const { inside, strength: level, x, y } = locate(event)
      if (!holding) targetStrength = inside ? level : 0
      if (sectionEl) sectionEl.style.cursor = inside ? 'crosshair' : ''
      if (!inside) return
      pointer.x = x
      pointer.y = y
      if (reducedMotion) draw(0)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!visible) return
      const { inside, x, y } = locate(event)
      if (!inside) return
      pointer.x = x
      pointer.y = y
      if (reducedMotion) return
      targetStrength = 0
      holding = { x, y, start: performance.now() }
    }

    const onPointerUp = (event: PointerEvent) => {
      if (!holding) return
      if (finePointer) {
        const { inside, strength: level } = locate(event)
        targetStrength = inside ? level : 0
      }
      const now = performance.now()
      const charge = chargeOf(now, holding.start)
      const from = CHARGE_FROM + CHARGE_GROWTH * charge
      pings = [
        ...pings.slice(-3),
        {
          x: holding.x,
          y: holding.y,
          born: now,
          from,
          to: (from + 1.0 + 3.2 * charge) * (0.92 + Math.random() * 0.16),
          life: (0.65 + 0.55 * charge) * (0.92 + Math.random() * 0.16),
        },
      ]
      holding = null
    }

    const onPointerCancel = () => {
      holding = null
    }

    let drawing = false
    const startDrawing = () => {
      if (drawing) return
      drawing = true
      if (reducedMotion) draw(0)
      else frame = requestAnimationFrame(loop)
    }
    if (measure()) startDrawing()

    // Pause drawing while the field is outside the viewport.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (reducedMotion) return
        if (visible && frame === 0) {
          frame = requestAnimationFrame(loop)
        } else if (!visible && frame !== 0) {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { rootMargin: '64px' },
    )
    visibility.observe(host)

    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointercancel', onPointerCancel, {
      passive: true,
    })
    const observer = new ResizeObserver(() => {
      if (!measure()) return
      startDrawing()
      draw(reducedMotion ? 0 : lastDraw)
    })
    observer.observe(host)
    const slot = document.querySelector('[data-hero-wordmark]')
    if (slot) observer.observe(slot)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      visibility.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerCancel)
      if (sectionEl) sectionEl.style.cursor = ''
    }
  }, [onPainted, glyph])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full select-none"
    />
  )
}
