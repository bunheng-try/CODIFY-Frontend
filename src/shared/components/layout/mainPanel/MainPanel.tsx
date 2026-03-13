import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MainPanelProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  emptyState?: ReactNode;
  className?: string;
}

const MainPanel = ({ header, footer, children, emptyState, className }: MainPanelProps) => {
  return (
    <div className={cn("flex flex-col h-full w-full overflow-hidden", className)}>

      {header && (
        <div className="sticky top-0 z-20 bg-[hsl(var(--background))]">
          {header}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        {children ?? emptyState ?? <div className="text-gray-400 text-center py-10">Nothing here</div>}
      </div>

      {footer && (
        <div className="border-t border-[hsl(var(--border))] px-4 sm:px-6 py-3 bg-[hsl(var(--surface))]">
          {footer}
        </div>
      )}
    </div>
  );
};

export default MainPanel;