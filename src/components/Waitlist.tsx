import Container from '@/components/ui/Container'

export default function Waitlist() {
  return (
    <section>
      <div className="px-4">
        <Container>
          <div className="max-w-2xl mx-auto text-center py-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Be the first to know when we release new products
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Join the waitlist for early access.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-xs rounded-sm border border-[var(--foreground)]/10 bg-[var(--background)] px-4 py-2 text-base placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
              />
              <button className="rounded-sm bg-[var(--foreground)] px-4 py-2 text-base font-medium text-[var(--background)] hover:opacity-80">
                Subscribe
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}