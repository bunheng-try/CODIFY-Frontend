import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SidebarActiveLine } from "@/shared/components/design/SidebarActiveLine";

type LeftBarButtonProps = {
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
  tooltip?: string;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const LeftBarButton = React.forwardRef<
  HTMLButtonElement,
  LeftBarButtonProps
>(({ icon, active = false, badge, tooltip, onClick, onContextMenu }, ref) => {
  const button = (
    <div className="relative w-full flex justify-center">
      <SidebarActiveLine active={active} />

      <button
        ref={ref}
        type="button"
        title={tooltip}
        onClick={onClick}
        onContextMenu={onContextMenu}
        className={cn(
          "group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ease-out",
          "hover:bg-[hsl(var(--leftbar-hover))]",
        )}
      >
        <span className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          {icon}
        </span>

        {badge ? (
          <span className="absolute top-1 right-1 min-w-4 h-4 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-[10px] flex items-center justify-center px-1">
            {badge}
          </span>
        ) : null}
      </button>
    </div>
  );

  if (!tooltip) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  );
});

LeftBarButton.displayName = "LeftBarButton";