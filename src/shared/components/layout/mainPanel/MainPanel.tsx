import { type ReactNode } from "react";

interface MainPanelProps {
  header?: ReactNode;
  children?: ReactNode;
  emptyState?: ReactNode;
}

const MainPanel = ({ header, children, emptyState }: MainPanelProps) => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {header && (
        <div className="sticky top-0 z-10 bg-[hsl(var(--background))] border-b border-[hsl(var(--border))]">
          {header}
        </div>
      )}


      <div className="flex-1 overflow-y-auto">
        {children ?? emptyState}
      </div>
    </div>
  );
};

export default MainPanel;
