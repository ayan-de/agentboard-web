import Container from '@/components/ui/Container'
import LineBorder from '@/components/ui/LineBorder'

export default function Waitlist() {
  return (
    <LineBorder>
      <section>
        <div className="px-4">
          <Container>
            <div className="max-w-2xl mx-auto text-center py-14">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Be the first to know when we release new products
              </h2>
              <p className="mt-4 text-[var(--muted)]">
                Join the waitlist for early access.
              </p>
              <div className="mt-8 max-w-xl mx-auto flex items-center border border-[var(--foreground)]/10 bg-[var(--background)] p-1.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-6 py-4 text-lg placeholder:text-[var(--muted)] focus:outline-none"
                />
                <button className="bg-[var(--foreground)] px-10 py-4 text-lg font-medium text-[var(--background)] hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </LineBorder>
  )
}