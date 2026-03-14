export interface TabItem<T extends string> {
  key: T;
  label: string;
  icon?: React.ReactNode;
}

interface MenuTabsProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (key: T) => void;
}

const MenuTabs = <T extends string>({
  tabs,
  activeTab,
  onChange,
}: MenuTabsProps<T>) => {
  return (
    <div className="flex gap-6 mt-4 -mb-px">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              flex items-center gap-2
              pb-3 text-sm font-medium transition-colors hover:cursor-pointer
              ${isActive
                ? "border-b-2 border-[hsl(var(--primary))] text-[hsl(var(--foreground))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"}
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}



export default MenuTabs;
