import { Plus, BookOpen } from "lucide-react";

type Props = {
    onCreate?: () => void;
};

export function LeftBarClassesEmpty({ onCreate }: Props) {
    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-1 px-1 text-center">
            <BookOpen className="w-6 h-6 text-[hsl(var(--muted-foreground))]" />

            <p className="text-[10px] text-[hsl(var(--muted-foreground))] truncate">
                No classes
            </p>

            {onCreate && (
                <button
                    onClick={onCreate}
                    className="flex items-center gap-1 text-[10px] text-[hsl(var(--primary))] hover:underline"
                >
                    <Plus className="w-3 h-3" /> Add
                </button>
            )}
        </div>
    );
}