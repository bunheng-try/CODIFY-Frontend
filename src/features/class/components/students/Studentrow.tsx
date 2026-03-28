import { MoreHorizontal, Trash2 } from "lucide-react";
import { ButtonGhost } from "../../../../shared/components/design/button";
import type { Member, MemberRoleDto } from "../../apis/member.api";
import Avatar from "./Avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { useClassroomRole } from "@/features/classes/hooks/useClassroomRole";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { getInitials } from "@/shared/utils/strings";
import MemberRoleSelect, { type MemberRole } from "../MemberRoleSelect";

interface StudentRowProps {
  student: Member;
  isLast: boolean;
  onRemove: (student: Member) => void;
  onRoleChange?: (student: Member, newRole: MemberRole) => void;
  isChangingRole: boolean;
}

export default function StudentRow({ student, isLast, onRemove, onRoleChange, isChangingRole }: StudentRowProps) {
  const { classroomId } = useClassroomRoute();
  const { data: classroomRole } = useClassroomRole(classroomId);
  const initials = getInitials(student.name);
  
  const canRemove =
    classroomRole?.role === "OWNER" && student.role !== "OWNER" ||
    (classroomRole?.role === "TEACHER" && student.role !== "OWNER" && student.role !== "TEACHER");

  return (
    <div
      className={`grid grid-cols-[2fr_3fr_2fr_1fr] items-center px-4 py-3.5 transition-colors
  hover:bg-[hsl(var(--surface-hover))]
  ${!isLast ? "border-b border-[hsl(var(--border))]" : ""}`}
    >
      <div className="flex items-center gap-3 truncate">
        <Avatar name={student.name} initials={initials} />
        <span className="typo-body-strong truncate">
          {student.name}
        </span>
      </div>

      <span className="typo-caption truncate">
        {student.email ?? `${student.name.replace(/\s+/g, ".").toLowerCase()}@student.cadt.com`}
      </span>

      <MemberRoleSelect
        value={student.role}
        onChange={(newRole) => {
          if (student.role !== newRole) {
            onRoleChange?.(student, newRole);
          }
        }}
        disabled={isChangingRole}
      />

      <div className="flex justify-center">
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonGhost>
                <MoreHorizontal size={16} />
              </ButtonGhost>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canRemove ? (
                <DropdownMenuItem onClick={() => onRemove(student)} variant="destructive">
                  <WrapIcon icon={Trash2} size="sm" />
                  Remove
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled>
                  No actions
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}