import { useWorkspaceStore } from "../stores/useWorkspaceStore";
import { useSubmissions, useCreateSubmission, useUpdateSubmission, useTurnInSubmission } from "@/features/assignment/hooks/useSubmissionQuery";
import { useAuthStore } from "@/app/store/autStore";
import { useNavigate, useParams } from "react-router-dom";

export function useAssignmentActions() {
    const { classroomId, assignmentId } = useParams();
    const navigate = useNavigate();
    const currentUser = useAuthStore((s) => s.user);
    const state = useWorkspaceStore((s) => s);
    
    const { data: submissions } = useSubmissions(Number(classroomId), Number(assignmentId));
    const mySubmission = submissions?.find(
        (s) => String(s.userId) === String(currentUser?.id)
    ) ?? null;
    
    const createDraftMutation = useCreateSubmission(Number(classroomId), Number(assignmentId));
    const updateDraftMutation = useUpdateSubmission(Number(classroomId), Number(assignmentId), Number(mySubmission?.id));
    const turnInMutation = useTurnInSubmission(Number(classroomId), Number(assignmentId), Number(mySubmission?.id));

    const isSaving =
        createDraftMutation.isPending ||
        updateDraftMutation.isPending;

    const isSubmitting =
        turnInMutation.isPending;

    const isBusy = isSaving || isSubmitting;

    const dirtyChallengeIds = Array.from(state.dirtyChallenges);
    const isDraftDirty = dirtyChallengeIds.length > 0;

    const saveDraft = async () => {
        if (dirtyChallengeIds.length === 0 || isSaving) return;

        let submissionId = mySubmission?.id;

        if (!submissionId) {
            const created = await createDraftMutation.mutateAsync({ content: "" });
            submissionId = created.id;
        }

        if (submissionId) {
            await updateDraftMutation.mutateAsync({
                codes: dirtyChallengeIds.map((id) => ({
                    challengeId: id,
                    code: state.codes[id],
                })),
            });
        }

        useWorkspaceStore.setState({ dirtyChallenges: [] });
    };

    const submitAssignment = async () => {
        if (isSubmitting) return;

        let submissionId = mySubmission?.id;

        if (dirtyChallengeIds.length > 0 || !submissionId) {
            const state = useWorkspaceStore.getState();

            if (!submissionId) {
                const created = await createDraftMutation.mutateAsync({ content: "" });
                submissionId = created.id;
            }

            if (dirtyChallengeIds.length > 0) {
                await updateDraftMutation.mutateAsync({
                    codes: dirtyChallengeIds.map((id) => ({
                        challengeId: id,
                        code: state.codes[id],
                    })),
                });

                useWorkspaceStore.setState({ dirtyChallenges: [] });
            }
        }

        await turnInMutation.mutateAsync();
        
        useWorkspaceStore.persist.clearStorage();
        useWorkspaceStore.setState({ codes: {}, starterCodes: {}, dirtyChallenges: [] });
        
        navigate(`/classrooms/${classroomId}/assignments/${assignmentId}`);
    };

    return { saveDraft, submitAssignment, isDraftDirty, isBusy, isSaving, isSubmitting };
}