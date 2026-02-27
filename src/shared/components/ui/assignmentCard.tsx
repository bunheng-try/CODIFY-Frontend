import { useContextMenu } from "@/shared/components/context-menu/ContextMenuProvider";
import type { ContextMenuItem } from "../context-menu/types";
import {Code } from "lucide-react";
import type { Assignment } from "@/features/assignment/apis/assignment.api";

interface Props {
  assignment: Assignment;
  onDelete: (id: number) => void;
  onClick: (assignment: Assignment) => void;
  isSelect?: boolean;
  totalStudent: number;
}

const AssignmentCard = ({
  assignment,
  onDelete,
  onClick,
  isSelect=false,
  totalStudent
}: Props) => {
  const { openMenu } = useContextMenu();


  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

  const items: ContextMenuItem[] = [
    {
      type: "item",
      label: "Edit",
      onClick: () => onClick(assignment),
    },
    {
      type: "separator",
    },
    {
      type: "item",
      label: "Delete assignment",
      danger: true,
      onClick: () => onDelete(assignment.id),
    },
  ];

    openMenu({
      x: e.clientX,
      y: e.clientY,
      items,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const optionsSameYear: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
    };

    const optionsDifferentYear: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
    };

    // Compare year
    if (date.getFullYear() === now.getFullYear()) {
        return date.toLocaleDateString("en-US", optionsSameYear); // Oct 21
    } else {
        return date.toLocaleDateString("en-US", optionsDifferentYear); // Oct 21, 2027
    }
  };

  return (
    <>
      <div
        onClick={() => onClick(assignment)}
        onContextMenu={handleContextMenu}
        className={`flex py-4 px-8 cursor-pointer items-center justify-between rounded-lg ${isSelect ? "bg-gray-300" : " hover:bg-gray-100"} `}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <span className="text-sm font-semibold"><Code /></span>
          </div>

          <div>
            <p className="font-medium text-gray-900">
              {assignment.title}
            </p>
            <p className="text-sm text-gray-500">
              Due {assignment.dueAt ? formatDate(assignment.dueAt) : "No date"}
            </p>
          </div>
        </div>

        <div className="w-20 flex items-center flex-col gap-2 text-sm capitalize text-gray-500">
        
        <button
            className={`w-full rounded-full py-1 px-2 ${assignment.published?'bg-green-50 text-green-600':'bg-white text-gray-800'}`}
        >
            {assignment.published?"Published":"Draft"}
        </button>
          {assignment.published 
            ?`${10}/${totalStudent}`
            :"Inactive"
            }
        </div>
      </div>
    </>
  );
};



export default AssignmentCard;
