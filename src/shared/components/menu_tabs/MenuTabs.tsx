import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem<T extends string> {
  key: T;
  label: string;
  icon?: React.ReactNode;
}

interface MenuTabsProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (key: T) => void;
  className?: string;
}

const MenuTabs = <T extends string>({
  tabs,
  activeTab,
  onChange,
  className,
}: MenuTabsProps<T>) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = React.useState({ left: 0, width: 0 });

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const index = tabs.findIndex((t) => t.key === activeTab);
    const button = container.children[index] as HTMLElement;
    if (button) {
      setUnderlineStyle({ left: button.offsetLeft, width: button.offsetWidth });
    }
  }, [activeTab, tabs]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "self-start relative flex gap-5 mt-4 -mb-[var(--card-padding-x)] overflow-x-auto whitespace-nowrap",
        className
      )}
      style={{ justifyContent: "flex-start" }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors truncate",
              isActive
                ? "typo-tab-active" : "typo-tab-inactive"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}

      <span
        className="absolute bottom-1 h-[2px] bg-[hsl(var(--primary))] rounded transition-all duration-300"
        style={{
          left: underlineStyle.left,
          width: underlineStyle.width,
        }}
      />
    </div>
  );
};

export default MenuTabs;