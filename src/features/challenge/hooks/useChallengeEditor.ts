import { useEffect, useState } from "react";
import {
    useChallenge,
    useCreateChallenge,
    useUpdateChallenge,
    useDeleteChallenge,
} from "./useChallengeQuery"
import type { ChallengeDto } from "../apis/challenge.api";

interface Options {
    mode: "create" | "edit";
    challengeId?: number;
}

export const useChallengeEditor = ({ mode, challengeId }: Options) => {
    const { data: challenge, isLoading } = useChallenge(
        mode === "edit" ? challengeId ?? null : null
    );

    const createMutation = useCreateChallenge();
    const updateMutation = useUpdateChallenge();
    const deleteMutation = useDeleteChallenge();

    const [draft, setDraft] = useState<ChallengeDto>({
        title: "",
        description: "",
        starterCode: "",
        language: "",
    });

    useEffect(() => {
        if (challenge && mode === "edit") {
            setDraft({
                title: challenge.title,
                description: challenge.description,
                starterCode: challenge.starterCode,
                language: challenge.language,
            });
        }
    }, [challenge, mode]);


    const updateField = <K extends keyof ChallengeDto>(
        key: K,
        value: ChallengeDto[K]
    ) => {
        setDraft((prev) => ({ ...prev, [key]: value }));
    };

    const save = async () => {
        if (mode === "create") {
            return createMutation.mutateAsync(draft);
        }

        if (mode === "edit" && challengeId) {
            return updateMutation.mutateAsync({
                id: challengeId,
                dto: draft,
            });
        }
    };

    const remove = async () => {
        if (!challengeId) return;
        return deleteMutation.mutateAsync(challengeId);
    };

    return {
        draft,
        updateField,
        save,
        remove,
        isLoading,
        isSaving: createMutation.isPending || updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};