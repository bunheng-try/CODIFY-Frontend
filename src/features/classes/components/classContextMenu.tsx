import { Archive, Trash } from "lucide-react"
import type { ContextMenuItem } from "@/shared/components/context-menu/types"

export function getClassroomContextMenu(
  classroomId: number,
  actions: {
    editClassroom?: (id: number) => void
    deleteClassroom?: (id: number) => void
  }
): ContextMenuItem[] {
  return [
    {
      type: "item",
      label: "edit class",
      icon: <Archive className="h-4 w-4" />,
      onClick: () => actions.editClassroom?.(classroomId),
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