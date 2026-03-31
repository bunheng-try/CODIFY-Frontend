import { useEffect, useMemo, useState } from "react";
import { useAssignmentAddChallenge } from "../hooks/useAssignmentQuery";
import type { Challenge } from "@/features/challenge/apis/challenge.api";

export const useChallengesDirty = (
    assignmentId: number | null,
    classroomId: number | null,
    challenges: Challenge[]
) => {
    const addMutation = useAssignmentAddChallenge();

    const [draft, setDraft] = useState<Challenge[]>([]);

    useEffect(() => {
        if (!assignmentId || !classroomId) {
            setDraft([]);
            return;
        }

        setDraft(challenges.map((c) => ({ ...c })));
    }, [assignmentId, classroomId, challenges]);

    const originalIds = useMemo(() => {
        return new Set(challenges.map((c) => c.id));
    }, [challenges]);

    const added = useMemo(() => {
        return draft.filter((c) => !originalIds.has(c.id));
    }, [draft, originalIds]);

    const resetAll = () => {
        setDraft(challenges.map((c) => ({ ...c })));
    };

    const addSelected = (selected: Challenge[]) => {
        setDraft((prev) => {
            const existingIds = new Set(prev.map((c) => c.id));
            const newOnes = selected.filter((c) => !existingIds.has(c.id));
            return [...prev, ...newOnes];
        });
    };

    const save = async () => {
        if (!assignmentId || !classroomId || added.length === 0) return;

        const ids = added.map((c) => c.id);

        await addMutation.mutateAsync({
            classroomId,
            assignmentId,
            challengeIds: ids,
        });
    };

    const cancel = () => {
        setDraft(challenges.map((c) => ({ ...c })));
    };

    return {
        draft,
        addSelected,
        resetAll,
        save,
        cancel,
        isAdding: addMutation.isPending,
        hasUnsaved: added.length > 0,
    };
};