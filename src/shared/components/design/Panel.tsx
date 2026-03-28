import React from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({ children, className }) => {
  return <div className={cn("flex flex-col border-r border-[hsl(var(--border))] w-full h-full bg-[hsl(var(--surface))]", className)}>{children}</div>;
};

export const PanelContent: React.FC<{ children: React.ReactNode; className?: string; noPadding?: boolean }> = ({ children, className, noPadding }) => (
  <div className={cn("flex-1 min-h-0 overflow-auto", !noPadding && "p-2 md:p-4", className)}>{children}</div>
);

export const PanelFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("flex-shrink-0 border-t p-2", className)}>
    {children}
  </div>
);