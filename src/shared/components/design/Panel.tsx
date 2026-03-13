import React from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({ children, className }) => {
  return <div className={cn("flex flex-col w-full h-full", className)}>{children}</div>;
};

export const PanelContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("flex-1 overflow-auto", className)}>{children}</div>
);

export const PanelFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("flex-shrink-0 border-t p-2", className)}>{children}</div>
);