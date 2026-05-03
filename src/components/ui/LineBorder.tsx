export default function LineBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{ left: 'var(--content-offset)', backgroundColor: 'var(--foreground)', opacity: 0.4, zIndex: 999 }}
      />
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{ right: 'var(--content-offset)', backgroundColor: 'var(--foreground)', opacity: 0.4, zIndex: 999 }}
      />
      {children}
    </div>
  )
}
