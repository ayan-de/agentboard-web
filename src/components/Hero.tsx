import Image from 'next/image'
import { Github, Terminal } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] bg-clip-text text-transparent">
            Orchestrate Your AI Agents
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            AgentBoard is a premium, terminal-based Kanban board designed to
            orchestrate and manage AI coding agents. Built for developers who
            want visual workflow management without leaving their terminal.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button variant="primary">Get Started</Button>
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="relative rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)]/50 p-2 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[var(--foreground)]/10 px-4 py-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Terminal className="h-4 w-4" />
                agentboard
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--background)]">
              <Image
                src="https://github-production-user-asset-6210df.s3.amazonaws.com/59247285/579415351-95cd3ac9-d3a4-4c49-91b6-dff6b6c4988a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260416%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260416T174544Z&X-Amz-Expires=300&X-Amz-Signature=a092b147f626f2c61c0bd7814d445ba3729ade629ac0876570d89c4a4657fdea&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng"
                alt="AgentBoard TUI Preview"
                width={1863}
                height={450}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
