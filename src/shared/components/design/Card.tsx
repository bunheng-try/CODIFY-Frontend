import * as React from "react";
import { cn } from "@/lib/utils";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import type { LucideIcon } from "lucide-react";

interface CardProps {
    children: React.ReactNode;
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
}

interface CardHeaderProps {
    title: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}

interface CardMetaProps {
    children: React.ReactNode;
    className?: string;
}


interface CardStatItemProps {
    icon: LucideIcon;
    label: React.ReactNode;
    size?: "sm" | "default" | "lg" | "xl"; // passed to WrapIcon
    withBg?: boolean;
    className?: string;
}

export const Card: React.FC<CardProps> = ({
    children,
    isSelected = false,
    onClick,
    className,
}) => {
    
    const clickable = !!onClick;
    
    return (
        <div
        onClick={onClick}
        className={cn(
            "group rounded-xl border",
            "px-(--card-padding-x) py-(--card-padding-y)",
            "bg-[hsl(var(--surface))]",
            "border-[hsl(var(--border))]",
            "transition-colors",
            
            clickable && "cursor-pointer hover:bg-[hsl(var(--surface-hover))]",
            
            isSelected &&
            "bg-[hsl(var(--surface-active))] border-[hsl(var(--primary))]",
            
            className
        )}
        >
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    actions,
    className,
}) => {
    return (
        <div className={cn("flex items-center justify-between mb-2", className)}>
            <h3 className="text-sm font-semibold truncate">{title}</h3>

            {actions && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {actions}
                </div>
            )}
        </div>
    );
};

export const CardStatItem: React.FC<CardStatItemProps> = ({
    icon,
    label,
    size = "sm",
    withBg = false,
    className,
}) => {
    return (
        <div className={`flex items-center gap-1.5 ${className}`}>
            <WrapIcon icon={icon} size={size} withBg={withBg} />
            <span>{label}</span>
        </div>
    );
};

export const CardMeta: React.FC<CardMetaProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "flex items-center gap-4 text-xs",
                "text-[hsl(var(--muted-foreground))]",
                className
            )}
        >
            {children}
        </div>
    );
};