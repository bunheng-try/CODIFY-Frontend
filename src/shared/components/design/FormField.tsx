import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

// ----------------------
// FormField wrapper
// ----------------------
type FormFieldProps = {
    label: string;
    htmlFor: string;
    required?: boolean;
    children: React.ReactNode;
};

export const FormField = ({
    label,
    htmlFor,
    required,
    children,
}: FormFieldProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={htmlFor} className="typo-label">
                {label} {required && <span className="text-destructive">*</span>}
            </label>
            {children}
        </div>
    );
};

// ----------------------
// TextInput with theme animations
// ----------------------
type TextInputProps = React.ComponentProps<typeof Input>;

export const TextInput = (props: TextInputProps) => {
    return (
        <Input
            {...props}
            className={cn(
                "h-10 rounded-xl border border-[hsl(var(--border))] px-3 py-2",
                "bg-[hsl(var(--surface))] text-[hsl(var(--foreground))]",
                "transition-all duration-150 ease-out",
                "hover:border-[hsl(var(--border-strong))] hover:shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--primary))]",
                "active:scale-[0.995]"
            )}
        />
    );
};

// ----------------------
// TextAreaInput with theme animations
// ----------------------
type TextAreaInputProps = React.ComponentProps<typeof Textarea>;

export const TextAreaInput = (props: TextAreaInputProps) => {
    return (
        <Textarea
            {...props}
            className={cn(
                "min-h-[100px] rounded-xl border border-[hsl(var(--border))] px-3 py-2 resize-none",
                "bg-[hsl(var(--surface))] text-[hsl(var(--foreground))]",
                "transition-all duration-150 ease-out",
                "hover:border-[hsl(var(--border-strong))] hover:shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--primary))]",
                "active:scale-[0.995]"
            )}
        />
    );
};