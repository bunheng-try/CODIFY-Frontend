import { useEffect, useState } from "react";
import {
    useCreateTestCase,
    useDeleteTestCase,
    useTestCases,
    useUpdateTestCase
} from "./useTestCaseQuery";
import type { TestCase } from "../apis/testcase.api";

export const useTestCasesDirty = (challengeId: number) => {
    const { data: testCases = [] } = useTestCases(challengeId);
    const createMutation = useCreateTestCase(challengeId);
    const updateMutation = useUpdateTestCase();
    const deleteMutation = useDeleteTestCase();

    const [draft, setDraft] = useState<TestCase[]>([]);
    const [deletedIds, setDeletedIds] = useState<number[]>([]);

    // Reset local draft whenever fetched test cases change
    useEffect(() => {
        setDraft(testCases.map(tc => ({ ...tc })));
        setDeletedIds([]);
    }, [challengeId, testCases]);

    const updateField = (id: number, key: keyof TestCase, value: any) => {
        setDraft(prev =>
            prev.map(tc => (tc.id === id ? { ...tc, [key]: value } : tc))
        );
    };

    const isDirty = (id: number) => {
        if (deletedIds.includes(id)) return true;

        const original = testCases.find(tc => tc.id === id);
        const current = draft.find(tc => tc.id === id);

        if (!original && current) return true; // new draft test case
        if (original && !current) return true; // deleted from draft
        if (!original && !current) return false;

        const keys: (keyof TestCase)[] = ["input", "expectedOutput", "score", "isHidden"];

        return keys.some(key => original?.[key] !== current?.[key]);
    };

    const hasDirty = () => {
        return draft.some(tc => isDirty(tc.id)) || deletedIds.length > 0;
    };

    const addDraft = (tc: TestCase) => {
        setDraft(prev => [...prev, tc]);
    };

    const markDeleted = (id: number) => {
        setDraft(prev => prev.filter(tc => tc.id !== id));

        if (id > 0) {
            setDeletedIds(prev => (prev.includes(id) ? prev : [...prev, id]));
        }
    };

    const save = async (id: number) => {
        const current = draft.find(tc => tc.id === id);
        if (!current) return;

        const { input, expectedOutput, score, isHidden } = current;

        if (id < 0) {
            await createMutation.mutateAsync({
                challengeId,
                input,
                expectedOutput,
                score,
                isHidden,
            });
        } else {
            await updateMutation.mutateAsync({
                id,
                dto: { input, expectedOutput, score, isHidden },
            });
        }
    };

    const resetAll = () => {
        setDraft(testCases.map(tc => ({ ...tc })));
        setDeletedIds([]);
    };

    const cancel = (id: number) => {
        const original = testCases.find(tc => tc.id === id);

        if (!original) {
            setDraft(prev => prev.filter(tc => tc.id !== id));
            return;
        }

        setDraft(prev =>
            prev.map(tc => (tc.id === id ? { ...original } : tc))
        );
    };

    return {
        draft,
        updateField,
        isDirty,
        hasDirty,
        save,
        resetAll,
        updateMutation,
        deleteMutation,
        addDraft,
        deletedIds,
        setDeletedIds,
        markDeleted,
    };
};