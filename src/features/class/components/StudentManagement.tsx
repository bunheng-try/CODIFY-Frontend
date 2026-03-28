// pages/StudentManagement.tsx
import { useState } from "react";
import { useChangeMemberRole, useMembers, useRemoveMember } from "../hooks/useMemberQuery";
import StudentToolbar from "./students/Studenttoolbar";
import StudentTable from "./students/StudentTables";
import StudentDialogs from "./dialogs/StudentDialogs";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { Button } from "@/shared/components/ui/button";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { GraduationCap } from "lucide-react";
import type { Member } from "../apis/member.api";
import type { MemberRole } from "./MemberRoleSelect";
import { ConfirmDialog } from "@/shared/components/design/dialog";

export default function StudentManagement() {
  const { classroomId } = useClassroomRoute();
  const { data: members = [] } = useMembers(classroomId);
  const changeRoleMutation = useChangeMemberRole(classroomId);
  const removeMember = useRemoveMember(classroomId);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [confirmStudent, setConfirmStudent] = useState<any>(null);
  const [confirmRoleChange, setConfirmRoleChange] = useState<{ student: Member; newRole: MemberRole } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; student: any } | null>(null);
  
  const closeContextMenu = () => setContextMenu(null);
  const openConfirmRemove = (student: any) => setConfirmStudent(student);

  const handleRemoveConfirm = () => {
    if (!confirmStudent) return;
    removeMember.mutate(confirmStudent.userId);
    setConfirmStudent(null);
  };

  const handleRoleConfirm = () => {
    if (!confirmRoleChange) return;
    const { student, newRole } = confirmRoleChange;

    changeRoleMutation.mutate({
      userId: student.userId,
      dto: { role: newRole },
    });

    setConfirmRoleChange(null);
  };

  const exportStudents = () => {
    const csv = ["Student,Email", ...members.map(m => `${m.name},${m.userId}@student.cadt.com`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Panel>
        <PanelHeader
          topLeft={
            <div className="flex gap-(--spacing-sm) items-center">
              <WrapIcon icon={GraduationCap} size={"panel"} withBg/>
              <h2 className="typo-heading">Students</h2>
            </div>
            
          }
          bottomContent={
            <span className="typo-caption">{members.length} Member{ members.length > 1 ? "s" : "" }</span>   
          }

          topRight={
            <>
              <Button variant={"secondary"}>Copy ClassCode</Button>
              <Button onClick={() => setInviteOpen(true)} >Add Member</Button>
            </>
          }
        />
        <PanelContent>
          <StudentToolbar
            search="" 
            onSearchChange={() => { }}
            filterBy="all"
            onFilterChange={() => { }}
            onExport={exportStudents}
          />
            <StudentTable
              students={members}
              isFiltered={false}
              onRemove={(student) => setConfirmStudent(student)}
              onRoleChange={(student, newRole) => setConfirmRoleChange({ student, newRole })}
              isChangingRole={changeRoleMutation.isPending}
            />
        </PanelContent>
      </Panel>

      <StudentDialogs
        classroomId={classroomId}
        inviteOpen={inviteOpen}
        onInviteOpenChange={setInviteOpen}
        confirmStudent={confirmStudent}
        onConfirmRemoveOpenChange={(open) => { if (!open) setConfirmStudent(null) }}
        onConfirmRemove={handleRemoveConfirm}
        contextMenu={contextMenu}
        onContextMenuRemove={openConfirmRemove}
        onContextMenuClose={closeContextMenu}
        existingMembers={members}
      />
      <ConfirmDialog
        open={!!confirmRoleChange}
        onOpenChange={(open) => { if (!open) setConfirmRoleChange(null) }}
        title={`Change role of ${confirmRoleChange?.student.name} to ${confirmRoleChange?.newRole}?`}
        onConfirm={handleRoleConfirm}
        confirmText="Change"
        cancelText="Cancel"
      >
        This will change the member's role in the classroom.
      </ConfirmDialog>

      {/* <ConfirmDialog
        open={!!confirmStudent}
        onOpenChange={setConfirmStudent as any}
        title={`Remove ${confirmStudent?.name}?`}
        onConfirm={handleRemoveConfirm}
        confirmText="Remove"
        cancelText="Cancel"
      >
        Are you sure you want to remove this student from the class?
      </ConfirmDialog> */}
    </>
  );
}