export default function Announcement() {
  return (
    <div className="mb-6 inline-flex items-center gap-4">
      <span className="inline-flex items-center justify-center rounded-sm bg-[var(--foreground)] px-4 py-1 text-sm font-bold text-[var(--background)]">
        New
      </span>
      <span className="text-lg text-[var(--muted)]">
        Jira + Vs Code Integration is under development...
      </span>
    </div>
  )
}