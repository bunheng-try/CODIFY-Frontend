import { useState } from "react";
import { ResizablePanel, ResizablePanelContainer, ResizablePanelDivider } from "@/shared/components/layout/ResizablePanel";
import { Outlet } from "react-router-dom";
import { ChallengeLibraryBar } from "../components/ChallengeLibraryBar";
import { useCreateNewChallenge } from "../hooks/useCreateChallenge";
import { useDeleteChallenge } from "../hooks/useChallengeQuery";
import { ConfirmDialog } from "@/shared/components/design/dialog/ConfirmDialog";
import PanelSkeleton from "@/shared/components/loading-skeleton/PanelSkeleton";

export const ChallengeLibraryPage = () => {
    const { isCreating, createNewChallenge } = useCreateNewChallenge();
    const deleteMutation = useDeleteChallenge();

    const [deletingChallengeId, setDeletingChallengeId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCreateChallenge = async () => {
        try {
            await createNewChallenge();
        } catch (err) {
            console.error("Failed to create challenge:", err);
        }
    };

    const handleRequestDelete = (challengeId: number) => {
        setDeletingChallengeId(challengeId);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingChallengeId) return;
        try {
            await deleteMutation.mutateAsync(deletingChallengeId);
        } catch (err) {
            console.error("Failed to delete challenge:", err);
        } finally {
            setIsDialogOpen(false);
            setDeletingChallengeId(null);
        }
    };

    return (
        <>
            <ResizablePanelContainer direction="horizontal" className="flex-1">

                {/* LIBRARY BAR */}
                <ResizablePanel defaultSize={35} minSize={25} maxSize={45}>
                    <ChallengeLibraryBar
                        onCreateChallenge={handleCreateChallenge}
                        onEditChallenge={(id) => console.log("Edit", id)}
                        onRequestDeleteChallenge={handleRequestDelete}
                    // optionally: onDuplicateChallenge={(id) => console.log("Duplicate", id)}
                    />
                </ResizablePanel>

                <ResizablePanelDivider />

                {/* MAIN PANEL */}
                <ResizablePanel defaultSize={65} minSize={55} maxSize={75}>
                    {isCreating ? (
                        <PanelSkeleton />
                    ) : (
                        <Outlet />
                    )}
                </ResizablePanel>

            </ResizablePanelContainer>

            {/* DELETE CONFIRM DIALOG */}
            <ConfirmDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Delete Challenge"
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
            >
                Are you sure you want to delete this challenge? This action cannot be undone.
            </ConfirmDialog>
        </>
    );
};