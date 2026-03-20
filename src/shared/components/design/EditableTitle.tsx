import { Edit2 } from "lucide-react";
import React from "react";

interface EditableTitleProps {
    value: string;
    onChange: (v: string) => void;
}

export function EditableTitle({ value, onChange }: EditableTitleProps) {
    const [editing, setEditing] = React.useState(false);

    return <div className="max-w-[200px]">
        {editing ? (
            <input
                autoFocus
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => setEditing(false)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
                className="typo-title bg-transparent outline-none truncate w-full"
            />
        ) : (
            <div className="flex items-center gap-1 min-w-0 w-full">
                <h2 className="typo-title truncate w-full">{value}</h2>
                <button onClick={() => setEditing(true)}>
                    <Edit2 className="w-4 h-4" />
                </button>
            </div>
        )}
    </div>
}