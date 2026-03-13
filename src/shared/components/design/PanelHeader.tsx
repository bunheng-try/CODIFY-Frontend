import { cn } from "@/lib/utils";

interface PanelHeaderProps {
    topLeft?: React.ReactNode; // what goes in start
    topRight?: React.ReactNode; // what goes in end
    bottomContent?: React.ReactNode; // optional tabs or extra content
    className?: string;
    tabs?: React.ReactNode;
}

export function PanelHeader({ topLeft, topRight, bottomContent, className, tabs }: PanelHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-[var(--spacing-xl)] sticky top-0 px-[var(--card-padding-x)] py-[var(--card-padding-y)] border-b bg-background",
                className
            )}
        >
            <div className="flex flex-col gap-[var(--spacing-lg)]">                
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 min-w-0 flex-1">{topLeft}</div>
                    <div className="flex items-center gap-2">{topRight}</div>
                </div>  

                {bottomContent && (
                    <div className="w-full">
                        {bottomContent}
                    </div>
                )}
            </div>

            {tabs && (
                <div className="w-full">
                    {tabs}
                </div>
            )}
        </div>
    );
}