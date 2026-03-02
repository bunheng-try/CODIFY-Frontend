// features/challenge/hooks/useChallengeEditorPanel.ts
import { useState } from "react";
import { useChallengeEditor } from "./useChallengeEditor";
import { useDeleteChallenge } from "./useChallengeQuery";
import { useNavigate } from "react-router-dom";

export const useChallengeEditorPanel = (initialMode: "create" | "edit", initialId?: number) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<"create" | "edit">(initialMode);
    const [challengeId, setChallengeId] = useState<number | undefined>(initialId);

    const { draft, updateField, save: saveChallenge, remove, isLoading, isSaving, isDeleting } =
        useChallengeEditor({ mode, challengeId });

    const deleteChallenge = useDeleteChallenge();

    const handleSave = async (onClose: () => void) => {
        const saved = await saveChallenge();

        if (saved?.id) {
            if (mode === "create") {
                setChallengeId(saved.id);
                setMode("edit");

                // Navigate to the detail page
                navigate(`/challenge-library/${saved.id}`);
            }

            // Close the editor panel
            onClose();
        }

        return saved;
    };

    const handleCancel = async (onClose: () => void) => {
        if (mode === "create" && challengeId) {
            await deleteChallenge.mutateAsync(challengeId);
        }
        onClose();
    };

    return {
        mode,
        setMode,
        challengeId,
        draft,
        updateField,
        remove,
        isLoading,
        isSaving,
        isDeleting,
        handleSave,
        handleCancel,
    };
};