import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import {
  ResizablePanel,
  ResizablePanelContainer,
  ResizablePanelDivider,
} from "@/shared/components/layout/ResizablePanel";
import ChallengeSidebar from "@/features/chllenge_workspce/components/ChallengeSidebar";
import InstructionPanel from "@/features/chllenge_workspce/components/InstructionPanel";
import IDEPanel from "@/features/chllenge_workspce/components/IDEPanel";
import WorkspaceSkeleton from "@/shared/components/loading-skeleton/WorkspaceSkeleton";
import { useAssignment } from "@/features/assignment/hooks/useAssignmentQuery";
import { useSubmission } from "@/features/assignment/hooks/useSubmissionQuery";
import { useWorkspaceStore } from "@/features/chllenge_workspce/stores/useWorkspaceStore";
import { Button } from "@/shared/components/ui/button";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { Badge } from "@/shared/components/ui/badge";
import StudentResultPanel from "../components/StudentResultPanel";

function StudentSubmissionViewPage() {
  const { classroomId, assignmentId, submissionId } = useParams();
  const navigate = useNavigate();

  const assignmentQuery = useAssignment(Number(classroomId), Number(assignmentId));
  const assignment = assignmentQuery.data;
  const challenges = assignment?.codingChallenges ?? [];
  const { data: submissionData, isLoading: isSubmissionLoading } = useSubmission(
    Number(classroomId),
    Number(assignmentId),
    Number(submissionId)
  );

  // Select first challenge on load
  const currentChallengeId = useWorkspaceStore((s) => s.currentChallengeId);
  const setCurrentChallenge = useWorkspaceStore((s) => s.setCurrentChallenge);

  useEffect(() => {
    if (!assignmentQuery.isSuccess || !assignment || challenges.length === 0) return;
    const validIds = challenges.map((c) => c.id);
    if (currentChallengeId == null || !validIds.includes(currentChallengeId)) {
      setCurrentChallenge(challenges[0].id);
    }
  }, [assignmentQuery.isSuccess, assignment, challenges, currentChallengeId, setCurrentChallenge]);

  // Load student's submitted code into workspace
  const setCode = useWorkspaceStore((s) => s.setCode);
  useEffect(() => {
    if (!submissionData?.codeSubmissions) return;
    submissionData.codeSubmissions.forEach((cs) => {
      setCode(cs.challengeId, cs.code);
    });
  }, [submissionData]);

  const currentChallenge = challenges.find((c) => c.id === currentChallengeId) ?? null;

  const handleBack = () => {
    navigate(`/classrooms/${classroomId}/assignments/${assignmentId}`);
  };

  if (assignmentQuery.isLoading || isSubmissionLoading) {
    return <WorkspaceSkeleton />;
  }

  if (!currentChallenge) {
    return (
      <div className="flex h-screen w-screen items-center justify-center typo-body text-[hsl(var(--muted-foreground))]">
        No challenge found for this assignment.
      </div>
    );
  }

  const isGraded =
    submissionData?.status === "GRADED" || submissionData?.status === "EVALUATED";
  const isSubmitted = submissionData?.status === "SUBMITTED";

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="flex items-center justify-between px-[var(--spacing-lg)] py-[var(--spacing-md)] border-b border-[hsl(var(--border-strong))] bg-[hsl(var(--workspace))]">
        <div className="flex items-center gap-[var(--spacing-md)]">
          <Button onClick={handleBack} variant="ghost" size="icon">
            <WrapIcon icon={ArrowLeft} />
          </Button>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium leading-tight">
              {assignment?.title ?? "Assignment"}
            </p>
            <p className="typo-caption text-[hsl(var(--muted-foreground))] leading-tight">
              My Submission
            </p>
          </div>
        </div>

        <Badge
          variant={isGraded ? "status-published" : isSubmitted ? "status-draft" : "secondary"}
          className="gap-1.5 px-3 py-1.5"
        >
          {isGraded ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              Graded · {submissionData?.totalScore ?? 0} / 100
            </>
          ) : (
            <>
              <Clock className="h-3.5 w-3.5" />
              {isSubmitted ? "Submitted – Awaiting Grade" : submissionData?.status ?? ""}
            </>
          )}
        </Badge>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0">
        <ChallengeSidebar challenges={challenges} />

        <ResizablePanelContainer direction="horizontal" className="flex-1 min-h-0">
          <ResizablePanel className="min-h-0">
            <InstructionPanel challenge={currentChallenge} />
          </ResizablePanel>

          <ResizablePanelDivider />

          <ResizablePanel className="flex flex-col min-h-0">
            <IDEPanel
              challengeId={currentChallenge.id}
              language={currentChallenge.language}
              readOnly
            />
          </ResizablePanel>

          <ResizablePanelDivider />

          <ResizablePanel className="min-h-0">
            {submissionData && (
              <StudentResultPanel submission={submissionData} />
            )}
          </ResizablePanel>
        </ResizablePanelContainer>
      </div>
    </div>
  );
}

export default StudentSubmissionViewPage;