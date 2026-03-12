import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconColorMap = {
  default: "var(--foreground)",
  primary: "var(--primary)",
  secondary: "var(--secondary)",
  destructive: "var(--destructive)",
};

const iconVariants = cva("inline-flex items-center justify-center shrink-0 transition-colors", {
  variants: {
    size: {
      sm: "w-4 h-4 [&>svg]:w-4 [&>svg]:h-4",
      default: "w-5 h-5 [&>svg]:w-5 [&>svg]:h-5",
      lg: "w-6 h-6 [&>svg]:w-6 [&>svg]:h-6",
      xl: "w-8 h-8 [&>svg]:w-8 [&>svg]:h-8",
    },
    withBg: {
      true: "rounded-full p-1",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    withBg: false,
  },
});

export interface WrapIconProps
  extends React.SVGProps<SVGSVGElement>,
  VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  variantColor?: keyof typeof iconColorMap;
  bgColor?: string;
  asChild?: boolean;
}

const WrapIcon = React.forwardRef<SVGSVGElement, WrapIconProps>(
  ({ icon: Icon, size, withBg, variantColor = "default", bgColor, className, style, ...props }, ref) => {
    return (
      <span
        className={cn(iconVariants({ size, withBg }), className)}
        style={{
          color: iconColorMap[variantColor],
          backgroundColor: withBg ? bgColor ?? "var(--muted)" : undefined,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        <Icon ref={ref} {...props} />
      </span>
    );
  }
);

WrapIcon.displayName = "WrapIcon";

export { WrapIcon };