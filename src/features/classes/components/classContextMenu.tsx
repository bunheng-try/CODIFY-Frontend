import { Trash, LogOut, Users, Edit } from "lucide-react"
import type { ContextMenuItem } from "@/shared/components/context-menu/types"

export function getClassroomContextMenu(
  classroomId: number,
  role: string,
  actions: {
    editClassroom?: (id: number) => void
    deleteClassroom?: (id: number) => void
    leaveClassroom?: () => void
    manageMembers?: (id: number) => void
  }
): ContextMenuItem[] {
  if (role === "STUDENT") {
    return [
      {
        type: "item",
        label: "Leave class",
        icon: <LogOut className="h-4 w-4" />,
        danger: true,
        onClick: () => actions.leaveClassroom?.(),
      },
    ]
  }

  if (role==="OWNER") {
    return [
      {
        type: "item",
        label: "Edit class",
        icon: <Edit className="h-4 w-4" />,
        onClick: () => actions.editClassroom?.(classroomId),
      },
      {
        type: "item",
        label: "Manage Members",
        icon: <Users className="h-4 w-4" />,
        onClick: () => actions.manageMembers?.(classroomId),
      },
      {
        type: "separator",
      },
      {
        type: "item",
        label: "Delete class",
        icon: <Trash className="h-4 w-4" />,
        danger: true,
        onClick: () => actions.deleteClassroom?.(classroomId),
      },
    ]
  }
  if (role === "TEACHER") {
    return [
      {
        type: "item",
        label: "Edit class",
        icon: <Edit className="h-4 w-4" />,
        onClick: () => actions.editClassroom?.(classroomId),
      },
      {
        type: "item",
        label: "Manage Members",
        icon: <Users className="h-4 w-4" />,
        onClick: () => actions.manageMembers?.(classroomId),
      },
      {
        type: "separator",
      },
      {
        type: "item",
        label: "Leave class",
        icon: <LogOut className="h-4 w-4" />,
        danger: true,
        onClick: () => actions.leaveClassroom?.(),
      },
    ]
  }
  return [];
}