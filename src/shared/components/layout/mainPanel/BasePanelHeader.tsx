// components/BasePanelHeader.tsx
import type { ReactNode } from "react";

interface BasePanelHeaderProps {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
}

export const BasePanelHeader = ({ left, center, right }: BasePanelHeaderProps) => {
    return (
        <div className="sticky top-0 z-10 bg-[hsl(var(--background))] border-[hsl(var(--border))] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">{left}</div>
            {center && <div className="flex-1">{center}</div>}
            {right && <div className="flex items-center gap-2">{right}</div>}
        </div>
    );
};