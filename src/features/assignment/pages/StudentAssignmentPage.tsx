import { useParams, useNavigate } from "react-router-dom";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ChallengeCard } from "@/features/challenge/components/ChallengeCard";
import { useSubmissions } from "../hooks/useSubmissionQuery";
import { useAssignment } from "../hooks/useAssignmentQuery";
import { useCreateSubmission } from "../hooks/useSubmissionQuery";
import { useAuthStore } from "@/app/store/autStore";
import PanelSkeleton from "@/shared/components/loading-skeleton/PanelSkeleton";
import { CheckCircle2, Clock, Trophy } from "lucide-react";

const StudentAssignmentPage = () => {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.user);

  const classroomId = classId ? Number(classId) : null;
  const assignId = assignmentId ? Number(assignmentId) : null;

  const { data: assignment, isLoading: isAssignmentLoading, isError: isAssignmentError } =
    useAssignment(classroomId, assignId);
  const { data: submissions, isLoading: isSubmissionsLoading } =
    useSubmissions(classroomId, assignId);
  const mySubmission =
    submissions?.find((s) => String(s.userId) === String(currentUser?.id)) ?? null;

  const status = mySubmission?.status ?? null;
  const isGraded = status === "GRADED" || status === "EVALUATED";
  const isSubmitted = status === "SUBMITTED";
  const hasDraft = status === "DRAFT";
  const hasSubmission = !!mySubmission;

  const turnedInAt =
    (isSubmitted || isGraded) && mySubmission?.submittedAt
      ? new Date(mySubmission.submittedAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

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

  const handleViewResult = () => {
    if (!mySubmission) return;
    navigate(
      `/classrooms/${classId}/assignments/${assignmentId}/submissions/${mySubmission.id}/view`
    );
  };

  const renderTopRight = () => {
    if (isGraded) {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="status-published" className="gap-1.5 px-3 py-1.5">
            <Trophy className="h-3.5 w-3.5" />
            {mySubmission?.totalScore ?? 0} / 100
          </Badge>
          <Button variant="default" onClick={handleViewResult}>
            View Result
          </Button>
        </div>
      );
    }

    if (isSubmitted) {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="status-draft" className="gap-1.5 px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Turned in{turnedInAt ? ` · ${turnedInAt}` : ""}
          </Badge>
          <Button variant="secondary" onClick={handleViewResult}>
            View Submission
          </Button>
        </div>
      );
    }

    if (hasDraft) {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
            <Clock className="h-3.5 w-3.5" />
            In Progress
          </Badge>
          <Button
            onClick={handleStartOrResume}
            disabled={isLoading || createDraftMutation.isPending}
          >
            Continue / Turn In
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={handleStartOrResume}
        disabled={isLoading || createDraftMutation.isPending}
      >
        Start
      </Button>
    );
  };

  if (isAssignmentLoading || isSubmissionsLoading) return <PanelSkeleton />;

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
    ? new Date(assignment.dueAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "—";

  const hasNoChallenges = assignment.codingChallenges.length === 0;

  return (
    <Panel>
      <PanelHeader
        topLeft={<h2 className="typo-heading">{assignment.title}</h2>}
        topRight={renderTopRight()}
      />

      <PanelContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-[hsl(var(--border))] rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Description</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {assignment.description || "No description provided."}
            </p>
          </div>

          <div className="border border-[hsl(var(--border))] rounded-lg p-4">
            <p className="text-sm font-medium mb-3">Assignment Details</p>
            <div className="flex justify-between py-2 border-b border-[hsl(var(--border))] text-sm">
              <span className="text-[hsl(var(--muted-foreground))]">Due Date</span>
              <span>{formattedDue}</span>
            </div>
            {mySubmission && (
              <div className="flex justify-between py-2 border-[hsl(var(--border))] text-sm mt-1">
                <span className="text-[hsl(var(--muted-foreground))]">My Status</span>
                <span className="font-medium text-[hsl(var(--foreground))]">
                  {isGraded
                    ? `Graded · ${mySubmission.totalScore ?? 0}/100`
                    : isSubmitted
                    ? "Submitted"
                    : "In Progress"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Challenges</p>
          {hasNoChallenges ? (
            <div className="text-sm text-[hsl(var(--muted-foreground))] text-center py-10">
              No challenges available yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {assignment.codingChallenges.map((challenge, index) => (
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