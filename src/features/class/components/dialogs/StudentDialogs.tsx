import InviteDialog from "./addMemberDialog";
import ConfirmRemoveDialog from "./ConfirmremoveDialog";
import ContextMenu from "../students/Contextmenu";
import type { Member } from "../../apis/member.api";
import { useInviteStudent } from "../../hooks/useInviteStudent";

interface StudentDialogsProps {
  inviteOpen: boolean;
  onInviteOpenChange: (open: boolean) => void;
  confirmStudent: Member | null;
  onConfirmRemoveOpenChange: (open: boolean) => void;
  onConfirmRemove: () => void;
  contextMenu: { x: number; y: number; student: Member } | null;
  onContextMenuRemove: (student: Member) => void;
  onContextMenuClose: () => void;
  classroomId: number | null;
}

export default function StudentDialogs({
  inviteOpen,
  onInviteOpenChange,
  confirmStudent,
  onConfirmRemoveOpenChange,
  onConfirmRemove,
  contextMenu,
  onContextMenuRemove,
  onContextMenuClose,
  classroomId,
}: StudentDialogsProps) {

  const {
    email,
    searchByEmail,
    searchResults,
    selectedStudents,
    selectStudent,
    removeSelectedStudent,
    onInvite,
    resetAll
  } = useInviteStudent(classroomId);

  return (
    <>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onRemove={() => onContextMenuRemove(contextMenu.student)}
          onClose={onContextMenuClose}
        />
      )}

      <InviteDialog
        open={inviteOpen}
        onOpenChange={onInviteOpenChange}
        email={email}
        onEmailChange={searchByEmail}
        searchResults={searchResults}
        selectedStudents={selectedStudents}
        selectStudent={selectStudent}
        removeSelectedStudent={removeSelectedStudent}
        onInvite={onInvite}
      />

      <ConfirmRemoveDialog
        student={confirmStudent}
        onOpenChange={onConfirmRemoveOpenChange}
        onConfirm={onConfirmRemove}
      />
    </>
  );
}