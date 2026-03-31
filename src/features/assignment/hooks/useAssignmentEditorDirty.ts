import { useState, useEffect, useMemo } from "react";
import { useAssignment, useUpdateAssignment } from "../hooks/useAssignmentQuery";
import type { Assignment } from "../apis/assignment.api";

export const useAssignmentEditorDirty = (classroomId: number | null, assignmentId: number | null) => {
    const { data: assignment, isLoading } = useAssignment(classroomId, assignmentId);
    const updateMutation = useUpdateAssignment();

    const [draft, setDraft] = useState<Assignment | null>(null);

    useEffect(() => {
        if (assignment) setDraft({ ...assignment });
    }, [assignment, assignmentId, classroomId]);


    const updateField = <K extends keyof Assignment>(key: K, value: Assignment[K]) => {
        if (!draft) return;
        setDraft({ ...draft, [key]: value });
    };

    const cancel = () => {
        if (assignment) setDraft({ ...assignment });
    };

    const isDirty = useMemo(() => {
        if (!draft || !assignment) return false;
        return Object.keys(draft).some(
            (key) => draft[key as keyof Assignment] !== assignment[key as keyof Assignment]
        );
    }, [draft, assignment]);

    const save = async () => {
        if (!draft || !assignmentId) return;
        await updateMutation.mutateAsync({
            classroomId: Number(classroomId),
            assignmentId: Number(assignmentId),
            dto: draft,
        });

        if (assignment) setDraft({ ...draft });
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