import { useParams, useNavigate } from "react-router-dom";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { Button } from "@/shared/components/ui/button";
import { ChallengeCard } from "@/features/challenge/components/ChallengeCard";
import { useSubmissions } from "../hooks/useSubmissionQuery";
import { useAssignment } from "../hooks/useAssignmentQuery";
import { useCreateSubmission } from "../hooks/useSubmissionQuery";
import { useAuthStore } from "@/app/store/autStore";
import PanelSkeleton from "@/shared/components/loading-skeleton/PanelSkeleton";

const StudentAssignmentPage = () => {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.user);

  const classroomId = classId ? Number(classId) : null;
  const assignId = assignmentId ? Number(assignmentId) : null;

  const { data: assignment, isLoading: isAssignmentLoading, isError: isAssignmentError } = useAssignment(classroomId, assignId);

  const { data: submissions, isLoading: isSubmissionsLoading } = useSubmissions(classroomId, assignId);

  const mySubmission = submissions?.find(
    (s) => String(s.userId) === String(currentUser?.id)
  ) ?? null;

  let isSubmitted = mySubmission?.status === "SUBMITTED";
  const turnedInAt =
    isSubmitted && mySubmission?.submittedAt
      ? new Date(mySubmission.submittedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      : null;
  
  const hasSubmission = !!mySubmission;

  const createDraftMutation = useCreateSubmission(classroomId!, assignId!);


  const isLoading = isAssignmentLoading || isSubmissionsLoading;

  const handleStartOrResume = async () => {
    if (!classroomId || !assignId || !currentUser) return;

    try {
      if (hasSubmission) {
        navigate(`/classrooms/${classId}/assignments/${assignmentId}/workspace`);
        return;
      }

      await createDraftMutation.mutateAsync({ content: "" });

      navigate(`/classrooms/${classId}/assignments/${assignmentId}/workspace`);
    } catch (err: any) {
      if (err?.statusCode === 409) {
        navigate(`/classrooms/${classId}/assignments/${assignmentId}/workspace`);
      }
    }
  };

  if (isAssignmentLoading || isSubmissionsLoading) {
    return (
      <PanelSkeleton />
    );
  }

  if (isAssignmentError || !assignment) {
    return (
      <Panel>
        <div className="flex items-center justify-center h-full text-destructive">
          Failed to load assignment. Please try again.
        </div>
      </Panel>
    );
  }

  const formattedDue = assignment.dueAt
    ? new Date(assignment.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "—";

  const hasNoChallenges = assignment.assignmentChallenges.length === 0;

  return (
    <Panel>
      <PanelHeader
        topLeft={<h2 className="typo-heading">{assignment.title}</h2>}
        topRight={
          isSubmitted ? (
            <Button disabled className="bg-green-100 text-green-700 border border-green-200">
              ✔ Turned in: {turnedInAt}
            </Button>
          ) : (
            <Button
              onClick={handleStartOrResume}
              disabled={isLoading || createDraftMutation.isPending}
            >
              {hasSubmission ? "Continue / Turn In" : "Start"}
            </Button>
          )
        }
      />

      <PanelContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-border rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Description</p>
            <p className="text-sm text-muted-foreground">
              {assignment.description || "No description provided."}
            </p>
          </div>

          <div className="border border-border rounded-lg p-4">
            <p className="text-sm font-medium mb-3">Assignment Details</p>
            <div className="flex justify-between py-2 border-b border-border text-sm">
              <span className="text-muted-foreground">Due Date</span>
              <span>{formattedDue}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-muted-foreground">Total Points</span>
              <span>{assignment.assignmentChallenges.length * 25}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Challenges</p>
          {hasNoChallenges ? (
            <div className="text-sm text-muted-foreground text-center py-10">
              No challenges available yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {assignment.assignmentChallenges.map((challenge, index) => (
                <ChallengeCard key={challenge.id} challenge={challenge} variant="assignment" index={index + 1} />
              ))}
            </div>
          )}
        </div>
      </PanelContent>
    </Panel>
  );
};

export default StudentAssignmentPage;