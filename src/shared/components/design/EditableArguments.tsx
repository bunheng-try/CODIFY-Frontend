import { Button } from "@/shared/components/ui/button";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { Plus, X } from "lucide-react";

interface EditableArgumentsProps {
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    maxHeight?: number;
}

export const EditableArguments = ({
    values,
    onChange,
    placeholder,
    maxHeight = 100,
}: EditableArgumentsProps) => {
    const handleChange = (index: number, val: string) => {
        const newValues = [...values];
        newValues[index] = val;
        onChange(newValues);
    };

    const handleAdd = () => onChange([...values, ""]);
    const handleRemove = (index: number) => onChange(values.filter((_, i) => i !== index));

    return (
        <div
            className="space-y-1.5"
        >
            
            <div className="space-y-1.5 overflow-y-auto" style={{ maxHeight }}>
                {values.map((val, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            value={val}
                            onChange={(e) => handleChange(i, e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 rounded-lg border px-2 py-1 text-sm transition focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--primary))] w-full"
                        />
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleRemove(i)}
                        >
                            <WrapIcon icon={X} size="sm" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-xs"
                onClick={handleAdd}
            >
                <WrapIcon icon={Plus} size="sm" /> Add
            </Button>
        </div>
    );
};