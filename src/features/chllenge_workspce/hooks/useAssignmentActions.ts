// hooks/useAssignmentActions.ts
import { useWorkspaceStore } from "../stores/useWorkspaceStore";
import { useParams } from "react-router-dom";

export const useAssignmentActions = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    const codes = useWorkspaceStore((s) => s.codes);

    const saveDraft = () => {
        if (!assignmentId) return;
        console.log("Saving draft for assignment:", assignmentId, codes);
        // TODO: call API to save draft
    };

    const submitAssignment = () => {
        if (!assignmentId) return;
        console.log("Submitting assignment:", assignmentId, codes);
        // TODO: call API to submit assignment
    };

    return {
        saveDraft,
        submitAssignment,
        codes,
    };
};