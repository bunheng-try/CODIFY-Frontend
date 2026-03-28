import { CustomDialog } from "@/shared/components/design/dialog/CustomDialog";
import type { Member } from "../../apis/member.api";
import type { SelectedStudent } from "../../hooks/useInviteStudent";
import { Badge } from "@/shared/components/ui/badge";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onEmailChange: (email: string) => void;
  searchResults: (Member & { alreadySelected?: boolean })[];
  selectedStudents: SelectedStudent[];
  selectStudent: (student: Member) => void;
  removeSelectedStudent: (userId: number) => void;
  updateStudentRole: (userId: number, role: "STUDENT" | "TEACHER") => void;
  onInvite: () => Promise<{ success: boolean; error?: string }>;
}

export default function InviteDialog({
  open,
  onOpenChange,
  email,
  onEmailChange,
  searchResults,
  selectedStudents,
  selectStudent,
  removeSelectedStudent,
  updateStudentRole,
  onInvite,
}: InviteDialogProps) {
  const handleInvite = async () => {
    const result = await onInvite();
    if (result.success) onOpenChange(false);
  };

  return (
    <CustomDialog
      open={open}
      onCancel={() => onOpenChange(false)}
      title="Invite Students"
      bodyContent={
        <div className="flex flex-col gap-3">
          {/* Email input */}
          <input
            type="email"
            value={email}
            placeholder="Enter student email"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            onChange={(e) => onEmailChange(e.target.value)}
          />

          {/* Selected students badges */}
          {selectedStudents.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedStudents.map((s) => (
                <Badge
                  key={`${s.userId}-${s.email}`} // ✅ unique key
                  className="flex items-center gap-2 bg-[hsl(var(--surface-muted))] text-[hsl(var(--foreground))] px-3 py-1"
                >
                  <div className="flex flex-col leading-tight mr-2">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-[0.7rem] text-[hsl(var(--muted-foreground))]">{s.email}</span>
                  </div>

                  {/* Role selector */}
                  <select
                    value={s.role}
                    onChange={(e) =>
                      updateStudentRole(s.userId, e.target.value as "STUDENT" | "TEACHER")
                    }
                    className="border rounded px-1 py-0.5 text-xs bg-white"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                  </select>

                  {/* Circular X button */}
                  <button
                    type="button"
                    onClick={() => removeSelectedStudent(s.userId)}
                    className="ml-2 w-5 h-5 flex items-center justify-center rounded-full border border-[hsl(var(--destructive))] text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/10)]"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Search results */}
          {searchResults.length > 0 && (
            <div className="border rounded-md mt-1 bg-white shadow max-h-44 overflow-y-auto">
              {searchResults.map((s) => (
                <div
                  key={`${s.userId}-${s.email}`} // ✅ unique key
                  className={`p-2 flex flex-col cursor-pointer ${s.alreadySelected ? "opacity-50 cursor-not-allowed" : "hover:bg-[hsl(var(--surface-hover))]"
                    }`}
                  onClick={() => !s.alreadySelected && selectStudent(s)}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-[0.75rem] text-[hsl(var(--muted-foreground))]">{s.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      }
      actionButtons={[
        { label: "Cancel", onClick: () => onOpenChange(false), variant: "secondary" },
        {
          label: "Invite",
          onClick: handleInvite,
          variant: "primary",
          disabled: selectedStudents.length === 0,
        },
      ]}
    />
  );
}