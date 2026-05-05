function HelpBar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 px-1 text-xs text-[var(--muted)]">
        <div className="flex items-center gap-3">
          <span>a: add ticket</span>
          <span className="text-[var(--border)]">│</span>
          <span>d: delete ticket</span>
        </div>
        <div className="flex-1 text-center text-sm text-[var(--muted)]"><span className="text-[var(--primary)]">Project:</span> agent-board</div>
        <div className="flex items-center gap-3">
          <span>?: help</span>
          <span className="text-[var(--border)]">│</span>
          <span>r: refresh</span>
        </div>
      </div>
      <div className="border-b border-[var(--border)]" />
    </div>
  )
}

export { HelpBar }
