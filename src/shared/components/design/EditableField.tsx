import { useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
    value?: string; // current value
    onChange: (val: string) => void;
    placeholder?: string;
    className?: string;
    multiline?: boolean;
    icon?: ReactNode;
    showDirtyIndicator?: boolean;
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

    const baseClasses = cn(
        "w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
        "px-3 py-2",
        multiline && "min-h-[100px] resize-none",
        icon && "pl-12",
        className
    );

    return (
        <div className="relative w-full">
            {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
            {multiline ? (
                <textarea
                    value={localValue}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    className={baseClasses}
                />
            ) : (
                <input
                    type={type}
                    value={localValue}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    className={baseClasses}
                />
            )}
            {showDirtyIndicator && isDirty && (
                <span className="absolute right-3 top-1 text-blue-500 font-medium">*</span>
            )}
        </div>
    );
};