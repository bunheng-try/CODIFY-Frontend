import { cn } from "@/lib/utils";

export const interactiveScale = (...classNames: (string | false | null | undefined)[]) =>
    cn(
        "transition-all duration-150 ease-out",
        "active:scale-[0.995]",
        ...classNames
    );

export const hoverScaleGroup = (...classNames: (string | false | null | undefined)[]) =>
    cn(
        "transition-transform duration-150 ease-out group-hover:scale-[1.005]",
        ...classNames
    );

export const subtleHoverSurface = (...classNames: (string | false | null | undefined)[]) =>
    cn(
        "transition-colors duration-150 ease-out hover:bg-[hsl(var(--leftbar-hover)/0.15)]",
        ...classNames
    );