import { cn } from "@/lib/utils";

interface SidebarActiveLineProps {
    active?: boolean;
}

export const SidebarActiveLine = ({
    active = false,
}: SidebarActiveLineProps) => {
    return (
        <span
            className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transition-all duration-200 ease-out",
                active ? "h-9 w-1 opacity-100" : "h-4 w-1 opacity-0"
            )}
            style={{
                backgroundColor: "hsl(var(--primary))",
            }}
        />
    );
};