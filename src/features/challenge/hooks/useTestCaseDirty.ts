import { useEffect, useState } from "react";
import { useCreateTestCase, useDeleteTestCase, useTestCases, useUpdateTestCase } from "./useTestCaseQuery";
import type { TestCase } from "../apis/testcase.api";

export const useTestCasesDirty = (challengeId: number) => {
    const { data: testCases = [] } = useTestCases(challengeId);
    const createMutation = useCreateTestCase(challengeId);
    const updateMutation = useUpdateTestCase();
    const deleteMutation = useDeleteTestCase();
    
    const [draft, setDraft] = useState<TestCase[]>([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized && testCases.length > 0) {
            setDraft(testCases.map(tc => ({ ...tc })));
            setInitialized(true);
        }
    }, [testCases, initialized]);

    const resetAll = () => {
        setDraft(testCases.map(tc => ({ ...tc })));
    };
    
    const updateField = (id: number, key: keyof TestCase, value: any) => {
        setDraft(prev =>
            prev.map(tc => tc.id === id ? { ...tc, [key]: value } : tc)
        );
    };

    const isDirty = (id: number) => {
        const original = testCases.find(tc => tc.id === id);
        const current = draft.find(tc => tc.id === id);

        if (!original && current) return true;
        if (!current) return false;

        const keys: (keyof TestCase)[] = ['input', 'expectedOutput', 'score', 'isHidden'];

        return keys.some(key => original?.[key] !== current?.[key]);
    };


    const addDraft = (tc: TestCase) => {
        setDraft(prev => [...prev, tc]);
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

    return { draft, updateField, isDirty, save, cancel, updateMutation, deleteMutation, addDraft };
};