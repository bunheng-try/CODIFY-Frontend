import { AlertCircle } from "lucide-react";

type Props = {
    onRetry?: () => void;
};

export function LeftBarClassesError({ onRetry }: Props) {
    return (
        <div className="flex flex-col items-center justify-center flex-1 px-1 text-center gap-1">
            <AlertCircle className="w-6 h-6 text-[hsl(var(--muted-foreground))]" />

            <p className="text-[10px] text-[hsl(var(--muted-foreground))] truncate">
                Error
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="text-[10px] text-[hsl(var(--primary))] hover:underline"
                >
                    Retry
                </button>
            )}
        </div>
    );
}