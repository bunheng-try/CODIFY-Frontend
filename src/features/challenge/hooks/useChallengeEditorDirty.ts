import { useState, useEffect, useMemo } from "react";
import { useChallenge, useUpdateChallenge } from "./useChallengeQuery";
import type { ChallengeDto } from "../apis/challenge.api";

export const useChallengeEditorDirty = (challengeId: number) => {
    const { data: challenge, isLoading } = useChallenge(challengeId);
    const updateMutation = useUpdateChallenge();

    const [draft, setDraft] = useState<ChallengeDto | null>(null);

    // populate draft when challenge loads
    useEffect(() => {
        if (challenge) {
            setDraft({ ...challenge });
        }
    }, [challenge]);

    // update a field locally
    const updateField = <K extends keyof ChallengeDto>(key: K, value: ChallengeDto[K]) => {
        if (!draft) return;
        setDraft({ ...draft, [key]: value });
    };

    // cancel changes: revert to original
    const cancel = () => {
        if (challenge) setDraft({ ...challenge });
    };

    // compute dirty state
    const isDirty = useMemo(() => {
        if (!draft || !challenge) return false;
        return Object.keys(draft).some(
            (key) => draft[key as keyof ChallengeDto] !== challenge[key as keyof ChallengeDto]
        );
    }, [draft, challenge]);

    // save changes
    const save = async () => {
        if (!draft || !challengeId) return;
        await updateMutation.mutateAsync({
            id: challengeId,
            dto: draft,
        });
    };

    return {
        draft,
        updateField,
        cancel,
        isDirty,
        save,
        isSaving: updateMutation.isPending,
        isLoading,
    };
};