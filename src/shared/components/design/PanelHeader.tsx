import { cn } from "@/lib/utils";

interface PanelHeaderProps {
    topLeft?: React.ReactNode;  // left content (e.g., title, icon)
    topRight?: React.ReactNode; // right content (e.g., buttons)
    bottomContent?: React.ReactNode; // optional extra content under top row
    tabs?: React.ReactNode; // optional tabs below everything
    className?: string;
}

export function PanelHeader({ topLeft, topRight, bottomContent, tabs, className }: PanelHeaderProps) {
    return (
        <div
            className={cn(
                "sticky top-0 z-10 flex flex-col bg-background border-b px-[var(--card-padding-x)] py-[var(--card-padding-y)]",
                className
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">{topLeft}</div>
                <div className="flex items-center gap-2">{topRight}</div>
            </div>

            {bottomContent && (
                <div className="flex flex-col gap-2 mt w-full">
                    {bottomContent}
                </div>
            )}

            {tabs && (
                <div className="mt-3 w-full">
                    {tabs}
                </div>
            )}
        </div>
    );
}
