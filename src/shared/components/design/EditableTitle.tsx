import { Edit2 } from "lucide-react";
import React from "react";

interface EditableTitleProps {
    value: string;
    onChange: (v: string) => void;
}

export function EditableTitle({ value, onChange }: EditableTitleProps) {
    const [editing, setEditing] = React.useState(false);

    return editing ? (
        <input
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
            }}
            className="text-lg font-semibold bg-transparent outline-none"
        />
    ) : (
        <div className="flex items-center gap-1">
            <h2 className="text-lg font-semibold truncate w-full">{value}</h2>
            <button onClick={() => setEditing(true)}>
                <Edit2 className="w-4 h-4" />
            </button>
        </div>
    );
}