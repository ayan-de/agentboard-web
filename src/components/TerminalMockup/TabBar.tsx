interface Tab {
  id: string
  label: string
}

interface TabBarProps {
  tabs: Tab[]
  selectedIndex: number
  onTabClick: (index: number) => void
}

function TabBar({ tabs, selectedIndex, onTabClick }: TabBarProps) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="px-3 py-1 rounded-sm text-sm font-bold bg-[var(--primary)] text-[var(--background)] border border-[var(--primary)]">
        agentboard
      </div>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(i)}
          className={`px-3 py-1 rounded-sm text-sm font-bold transition-colors ${i === selectedIndex
            ? 'text-[var(--primary)]'
            : 'text-[var(--secondary)]'
          }`}
        >
          {i + 1}: {tab.label}
        </button>
      ))}
    </div>
  )
}

export { TabBar }
export type { Tab, TabBarProps }
