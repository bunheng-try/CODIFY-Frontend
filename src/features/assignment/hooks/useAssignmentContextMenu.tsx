import { useMemo, useState } from "react";
import type React from "react";
import { Eye, Edit, Trash2, Upload } from "lucide-react";

import type { Assignment } from "@/features/assignment/apis/assignment.api";
import type { ContextMenuItem } from "@/shared/components/context-menu/types";

type UseAssignmentContextMenuProps = {
    classroomId: number;
    isStudent: boolean;
    navigate: (to: string) => void;
    publishAssignment: (args: { classroomId: number; assignmentId: number }) => void;
    onRequestDelete: (assignment: Assignment) => void;
};

export function useAssignmentContextMenu({
    classroomId,
    isStudent,
    navigate,
    publishAssignment,
    onRequestDelete,
}: UseAssignmentContextMenuProps) {
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        assignment: Assignment | null;
    } | null>(null);

    const handleAssignmentContextMenu = (
        e: React.MouseEvent,
        assignment: Assignment
    ) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            assignment,
        });
    };

    const closeContextMenu = () => setContextMenu(null);

    const contextMenuItems: ContextMenuItem[] = useMemo(() => {
        if (!contextMenu?.assignment) return [];

        const a = contextMenu.assignment;

        const items: ContextMenuItem[] = [
            {
                type: "item",
                label: "Open",
                icon: <Eye className="w-4 h-4" />,
                onClick: () => {
                    navigate(`/classrooms/${classroomId}/assignments/${a.id}`);
                    closeContextMenu();
                },
            },
        ];

        if (!isStudent) {
            // Edit option
            items.push({
                type: "item",
                label: "Edit",
                icon: <Edit className="w-4 h-4" />,
                onClick: () => {
                    navigate(`/classrooms/${classroomId}/assignments/${a.id}`);
                    closeContextMenu();
                },
            });

            if (!a.isPublished) {
                items.push({
                    type: "item",
                    label: "Publish",
                    icon: <Upload className="w-4 h-4" />,
                    onClick: () => {
                        publishAssignment({ classroomId, assignmentId: a.id });
                        closeContextMenu();
                    },
                });
            }

            items.push({ type: "separator" });

            items.push({
                type: "item",
                label: "Delete",
                icon: <Trash2 className="w-4 h-4" />,
                danger: true,
                onClick: () => {
                    onRequestDelete(a);
                    closeContextMenu();
                },
            });
        }

        return items;
    }, [contextMenu, classroomId, isStudent, navigate, publishAssignment, onRequestDelete]);

    return {
        contextMenu,
        contextMenuItems,
        handleAssignmentContextMenu,
        closeContextMenu,
    };
}