import { useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FormField } from "./FormField"; // import your reusable FormField

interface EditableFieldProps {
    value?: string; // current value
    onChange: (val: string) => void;
    placeholder?: string;
    className?: string;
    multiline?: boolean;
    icon?: ReactNode;
    showDirtyIndicator?: boolean;
    label?: string; // optional label
    htmlFor?: string; // optional id for label
    type?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
    value = "",
    onChange,
    placeholder,
    className,
    multiline = false,
    icon,
    showDirtyIndicator = true,
    label,
    htmlFor,
    type = "text",
}) => {
    const [localValue, setLocalValue] = useState(value);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setLocalValue(value ?? "");
        setIsDirty(false);
    }, [value]);

    const handleChange = (val: string) => {
        setLocalValue(val);
        setIsDirty(val !== (value ?? ""));
        onChange(val);
    };

    const inputClasses = cn(
        "w-full rounded-xl border border-[hsl(var(--border))] px-3 py-2 transition-all duration-150 ease-out",
        "bg-[hsl(var(--surface))] text-[hsl(var(--foreground))]",
        "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--primary))]",
        "hover:border-[hsl(var(--border-strong))] hover:shadow-sm",
        "active:scale-[0.995]",
        multiline && "min-h-[100px] resize-none",
        icon && "pl-12",
        className
    );

    const fieldContent = multiline ? (
        <textarea
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={inputClasses}
            id={htmlFor}
        />
    ) : (
        <input
            type={type}
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={inputClasses}
            id={htmlFor}
        />
    );

    return (
        <FormField label={label ?? ""} htmlFor={htmlFor!}>
            <div className="relative w-full">
                {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
                {fieldContent}
                {showDirtyIndicator && isDirty && (
                    <span className="absolute right-3 top-1 text-blue-500 font-medium">*</span>
                )}
            </div>
        </FormField>
    );
};