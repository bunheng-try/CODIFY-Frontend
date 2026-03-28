import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Shield } from "lucide-react";

export type MemberRole = "STUDENT" | "TEACHER" | "OWNER";
export type EditableMemberRole = "STUDENT" | "TEACHER";

interface MemberRoleSelectProps {
    value: MemberRole;
    onChange: (role: EditableMemberRole) => void;
    disabled?: boolean;
    compact?: boolean;
}

export default function MemberRoleSelect({
    value,
    onChange,
    disabled,
    compact = false,
}: MemberRoleSelectProps) {
    const roleStyle =
        value === "TEACHER"
            ? "bg-[hsl(var(--primary)/0.10)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.20)]"
            : "bg-[hsl(var(--surface-muted))] text-[hsl(var(--foreground))] border-[hsl(var(--border))]";

    if (value === "OWNER") {
        return (
            <div
                className={`inline-flex items-center gap-1.5 rounded-full border
                bg-[hsl(var(--surface-muted))]
                text-[hsl(var(--foreground))]
                border-[hsl(var(--border))]
                ${compact ? "h-8 max-w-[110px] px-3 text-xs" : "h-9 px-3.5 max-w-[125px] text-sm"}`}
            >
                <Shield className="w-3.5 h-3.5" />
                <span className="font-medium">Owner</span>
            </div>
        );
    }

    return (
        <Select
            value={value}
            onValueChange={(val) => onChange(val as EditableMemberRole)}
            disabled={disabled}
        >
            <SelectTrigger
                className={`rounded-full shadow-none ${roleStyle} ${compact ? "h-8 max-w-[110px] text-xs px-3" : "h-9 max-w-[125px] text-sm px-3"
                    }`}
            >
                <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-md border border-[hsl(var(--border))] shadow-md p-1 mt-1 min-w-[8rem] overflow-hidden">
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="TEACHER">Teacher</SelectItem>
            </SelectContent>
        </Select>
    );
}