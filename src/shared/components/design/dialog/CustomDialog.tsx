// src/shared/components/design/dialog/CustomDialog.tsx
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose } from "../../ui/dialog";

type ActionButton = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  disabled?: boolean;
};

type CustomDialogProps = {
  open: boolean;
  onCancel: () => void;
  title: string | React.ReactNode;
  bodyContent: React.ReactNode;
  actionButtons: ActionButton[];
  className?: string;
};

export function CustomDialog({
  open,
  onCancel,
  title,
  bodyContent,
  actionButtons,
  className,
}: CustomDialogProps) {
  // Handle ESC key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onCancel]);

  if (!open) return null;

  const getButtonStyles = (variant?: string) => {
    const base =
      "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    switch (variant) {
      case "primary":
        return `${base} bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 focus:ring-[hsl(var(--ring))]`;
      case "secondary":
        return `${base} bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]/80 focus:ring-[hsl(var(--ring))]`;
      case "destructive":
        return `${base} bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:opacity-90 focus:ring-[hsl(var(--destructive))]`;
      case "ghost":
        return `${base} hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] focus:ring-[hsl(var(--ring))]`;
      default:
        return `${base} bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 focus:ring-[hsl(var(--ring))]`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
        <DialogOverlay />
        <DialogContent
          className={cn(
            "max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden",
            className
          )}
        >
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-start justify-between">
            <DialogTitle className="text-lg font-semibold text-[hsl(var(--foreground))]">
              {title}
            </DialogTitle>
          </DialogHeader>

          {bodyContent}

          {/* Footer */}
          {actionButtons.length > 0 && (
            <DialogFooter className="px-6 py-4 border-t border-[hsl(var(--border))] flex justify-end gap-3">
              {actionButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  disabled={button.disabled}
                  className={cn(
                    getButtonStyles(button.variant),
                    button.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {button.label}
                </button>
              ))}
            </DialogFooter>
          )}
        </DialogContent>
    </Dialog>
  );
}