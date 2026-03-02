import { ResizablePanel, ResizablePanelContainer, ResizablePanelDivider } from "@/shared/components/layout/ResizablePanel";
import { Outlet, useNavigate } from "react-router-dom";
import { ChallengeLibraryBar } from "../components/ChallengeLibraryBar";
import { useState } from "react";
import ChallengeEditorPanel from "./ChallengeEditorPanel";

export const ChallengeLibraryPage = () => {
    const [creatingChallenge, setCreatingChallenge] = useState(false);
    const [editingChallengeId, setEditingChallengeId] = useState<number | null>(null);

    const handleEdit = (id: number) => {
        setEditingChallengeId(id);
    };

    return (
        <ResizablePanelContainer direction="horizontal" className="flex-1">

            {/* MAIN BAR */}
            <ResizablePanel defaultSize={35} minSize={25} maxSize={45}>
                <ChallengeLibraryBar
                    onCreateChallenge={() => setCreatingChallenge(true)}
                />
            </ResizablePanel>

            <ResizablePanelDivider />

            {/* MAIN PANEL */}
            <ResizablePanel defaultSize={65} minSize={55} maxSize={75}>
                {creatingChallenge ? (
                    <ChallengeEditorPanel
                        mode="create"
                        onClose={() => setCreatingChallenge(false)}
                    />
                ) : editingChallengeId ? (
                    <ChallengeEditorPanel
                        mode="edit"
                        challengeId={editingChallengeId}
                        onClose={() => setEditingChallengeId(null)}
                    />
                ) : (
                    <Outlet context={{ onEdit: handleEdit }} />
                )}
            </ResizablePanel>

        </ResizablePanelContainer>
    );
};