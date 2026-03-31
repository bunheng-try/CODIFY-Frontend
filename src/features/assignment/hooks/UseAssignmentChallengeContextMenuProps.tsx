import { useMemo, useState } from "react";
import type React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { AssignmentChallenge } from "@/features/assignment/apis/assignment.api";
import type { ContextMenuItem } from "@/shared/components/context-menu/types";
import type { Challenge } from "@/features/challenge/apis/challenge.api";

type UseAssignmentChallengeContextMenuProps = {
    isStudent: boolean;
    navigate: (to: string) => void;
    onRemoveChallenge: (challengeId: number) => void;
};

export function useAssignmentChallengeContextMenu({
    isStudent,
    navigate,
    onRemoveChallenge,
}: UseAssignmentChallengeContextMenuProps) {
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        challenge: Challenge | null;
    } | null>(null);

    const handleChallengeContextMenu = (
        e: React.MouseEvent,
        challenge: Challenge
    ) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            challenge,
        });
    };

    const closeContextMenu = () => setContextMenu(null);

    const contextMenuItems: ContextMenuItem[] = useMemo(() => {
        if (!contextMenu?.challenge) return [];

        const c = contextMenu.challenge;
        const items: ContextMenuItem[] = [
            {
                type: "item",
                label: "View",
                icon: <Eye className="w-4 h-4" />,
        onClick: () => {
                    navigate(`/challenges/${c.id}`);
                    closeContextMenu();
                },
            },
        ];

        if (!isStudent) {
            items.push({
                type: "item",
                label: "Edit",
                icon: <Edit className="w-4 h-4" />,
        onClick: () => {
                    navigate(`/challenges/${c.id}/edit`);
                    closeContextMenu();
                },
            });

            items.push({ type: "separator" });

            items.push({
                type: "item",
                label: "Remove from Assignment",
                icon: <Trash2 className="w-4 h-4" />,
        danger: true,
                onClick: () => {
                    onRemoveChallenge(c.id);
                    console.log("delted chllegne id: ", c.id)
                    closeContextMenu();
                },
            });
        }

        return items;
    }, [contextMenu, isStudent, navigate, onRemoveChallenge]);

    return {
        contextMenu,
        contextMenuItems,
        handleChallengeContextMenu,
        closeContextMenu,
    };
}