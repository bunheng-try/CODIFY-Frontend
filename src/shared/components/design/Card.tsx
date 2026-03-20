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
  size?: "sm" | "default" | "lg" | "xl";
  withBg?: boolean;
  className?: string;
}

// ----------------------
// Card Component
// ----------------------
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
        "group rounded-xl border transition-colors",
        "px-[var(--card-padding-x)] py-[var(--card-padding-y)]",
        "bg-[hsl(var(--surface))]",
        "border-[hsl(var(--border))]",
        clickable && "cursor-pointer hover:bg-[hsl(var(--surface-hover))]",
        isSelected && "bg-[hsl(var(--surface-active))] border-[hsl(var(--primary))]",
        className
      )}
    >
      {children}
    </div>
  );
};

// ----------------------
// CardHeader Component
// ----------------------
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  actions,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between mb-[var(--spacing-sm)]", className)}>
      <h3 className="typo-title truncate">{title}</h3>
      {actions && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {actions}
        </div>
      )}
    </div>
  );
};

// ----------------------
// CardMeta Component
// ----------------------
export const CardMeta: React.FC<CardMetaProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-[var(--spacing-lg)] text-xs text-[hsl(var(--muted-foreground))]",
        className
      )}
    >
      {children}
    </div>
  );
};

// ----------------------
// CardStatItem Component
// ----------------------
export const CardStatItem: React.FC<CardStatItemProps> = ({
  icon,
  label,
  size = "sm",
  withBg = false,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-[var(--spacing-sm)]", className)}>
      <WrapIcon icon={icon} size={size} withBg={withBg} />
      <span>{label}</span>
    </div>
  );
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-[var(--spacing-sm)] ${className || ""}`}>
      {children}
    </div>
  );
};