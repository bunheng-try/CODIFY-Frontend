import { useEffect, useState } from "react";
import { useChallenges } from "@/features/challenge/hooks/useChallengeQuery";
import { useAssignmentAddChallenge } from "../hooks/useAssignmentQuery";
import type { Challenge } from "@/features/challenge/apis/challenge.api";

export const useChallengesDirty = (assignmentId: number | null, classroomId: number | null, challenges: Challenge[]) => {
    const addMutation = useAssignmentAddChallenge();

    const [draft, setDraft] = useState<Challenge[]>([]);
    const [initialized, setInitialized] = useState(false);
    const [added, setAdded] = useState<Challenge[]>([]);

    useEffect(() => {
        if (!initialized && challenges.length > 0) {
            setDraft(challenges.map(c => ({ ...c })));
            setInitialized(true);
        }
    }, [challenges, initialized]);

    const resetAll = () => {
        setDraft(challenges.map(c => ({ ...c })));
        setAdded([]);
    };

    const addSelected = (selected: Challenge[]) => {
        setDraft(prev => [...prev, ...selected]);
        setAdded(prev => [...prev, ...selected]);
    };

    const save = async () => {
        if (!assignmentId || !classroomId || added.length === 0) return;

        const ids = added.map(c => c.id);

        await addMutation.mutateAsync({ classroomId, assignmentId, challengeIds: ids });

        setAdded([]);
    };

    const cancel = () => {
        setDraft(prev => prev.filter(c => !added.includes(c)));
        setAdded([]);
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