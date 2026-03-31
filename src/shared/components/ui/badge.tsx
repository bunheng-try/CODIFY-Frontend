import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium gap-1 whitespace-nowrap shrink-0 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        secondary: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
        destructive: "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]",
        "challenge-easy": "bg-[hsl(var(--challenge-easy))] text-[hsl(var(--challenge-easy-foreground))]",
        "challenge-medium": "bg-[hsl(var(--challenge-medium))] text-[hsl(var(--challenge-medium-foreground))]",
        "challenge-hard": "bg-[hsl(var(--challenge-hard))] text-[hsl(var(--challenge-hard-foreground))]",
        "challenge-expert": "bg-[hsl(var(--challenge-expert))] text-[hsl(var(--challenge-expert-foreground))]",
        "status-draft": "bg-[hsl(var(--status-draft))] text-[hsl(var(--status-foreground))]",
        "status-published": "bg-[hsl(var(--status-published))] text-[hsl(var(--status-foreground))]",
        "status-archived": "bg-[hsl(var(--status-archived))] text-[hsl(var(--status-foreground))]",
        "status-submitted": "bg-green-100 text-green-800",
        "status-lated": "bg-yellow-100 text-yellow-800",
        "status-not-submitted": "bg-gray-100 text-gray-800",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return <Comp ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };