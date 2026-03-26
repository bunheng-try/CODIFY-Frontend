import type { ReactNode } from "react";
import { ButtonPrimary } from "../design/button";

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
    variant?: "default" | "hero";   
}

export const EmptyState = ({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    className = "",
    variant = "default",
}: EmptyStateProps) => {
    const iconClasses =
        variant === "hero"
            ? "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--accent))]"
            : "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--accent))]";

    const titleClasses =
        variant === "hero"
            ? "text-xl font-bold text-[hsl(var(--foreground))]"
            : "text-lg font-semibold text-[hsl(var(--foreground))]";

    const descriptionClasses =
        variant === "hero"
            ? "mt-4 text-lg text-[hsl(var(--muted-foreground))]"
            : "mt-2 text-sm text-[hsl(var(--muted-foreground))]";

    const buttonClasses =
        variant === "hero"
            ? "mt-8 px-6 py-3 text-lg"
            : "mt-6 inline-flex items-center gap-2";

    return (
        <div
            className={`w-full h-full flex flex-col items-center justify-center text-center px-8 py-16 ${className}`}
        >
            <div className={variant === "hero" ? "max-w-3xl" : "max-w-md"}>

                <div className={iconClasses}>{icon}</div>

                <h2 className={titleClasses}>{title}</h2>

                {description && <p className={descriptionClasses}>{description}</p>}

                {actionLabel && onAction && (
                    <ButtonPrimary className={buttonClasses} onClick={onAction}>
                        {actionLabel}
                    </ButtonPrimary>
                )}
            </div>
        </div>
    );
};