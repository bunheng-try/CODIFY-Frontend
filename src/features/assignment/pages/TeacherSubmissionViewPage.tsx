import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResizablePanel, ResizablePanelContainer, ResizablePanelDivider } from "@/shared/components/layout/ResizablePanel";
import ChallengeSidebar from "@/features/chllenge_workspce/components/ChallengeSidebar";
import InstructionPanel from "@/features/chllenge_workspce/components/InstructionPanel";
import IDEPanel from "@/features/chllenge_workspce/components/IDEPanel";
import WorkspaceSkeleton from "@/shared/components/loading-skeleton/WorkspaceSkeleton";
import { useAssignment } from "@/features/assignment/hooks/useAssignmentQuery";
import { useSubmission } from "@/features/assignment/hooks/useSubmissionQuery";
import { useMembers } from "@/features/class/hooks/useMemberQuery";
import { useWorkspaceStore } from "@/features/chllenge_workspce/stores/useWorkspaceStore";
import { useGradingStore } from "../stores/gradingScore";
import GradingPanel from "../components/GradingPanel";
import TeacherSubmissionTopBar from "../components/TeacherSubmissionTopBar";
import { ChallengeItem } from "@/features/chllenge_workspce/components/ChallengeItem";
import { Input } from "@/shared/components/ui/input";

function TeacherSubmissionViewPage() {
  const { classroomId, assignmentId, submissionId } = useParams();

  const reset = useGradingStore((s) => s.reset);
  useEffect(() => {
    reset();
  }, [submissionId]);

  // Data fetching
  const assignmentQuery = useAssignment(Number(classroomId), Number(assignmentId));
  const assignment = assignmentQuery.data;
  const challenges = assignment?.codingChallenges ?? [];

  const { data: submissionData, isLoading: isSubmissionLoading } = useSubmission(
    Number(classroomId),
    Number(assignmentId),
    Number(submissionId)
  );

  const { data: members = [] } = useMembers(Number(classroomId));

  const studentName =
    members.find((m) => m.userId === submissionData?.userId)?.name ??
    "Unknown Student";

  const submittedAt = submissionData?.submittedAt ?? submissionData?.createdAt;

  const setScore = useGradingStore((s) => s.setScore);
  useEffect(() => {
    if (submissionData?.totalScore != null && submissionData.totalScore > 0) {
      setScore(String(submissionData.totalScore));
    }
  }, [submissionData?.totalScore]);

  // Challenge sidebar — auto-select first challenge
  const currentChallengeId = useWorkspaceStore((s) => s.currentChallengeId);
  const setCurrentChallenge = useWorkspaceStore((s) => s.setCurrentChallenge);

  useEffect(() => {
    if (!assignmentQuery.isSuccess || !assignment || challenges.length === 0) return;
    const validIds = challenges.map((c) => c.id);
    if (currentChallengeId == null || !validIds.includes(currentChallengeId)) {
      setCurrentChallenge(challenges[0].id);
    }
  }, [assignmentQuery.isSuccess, assignment, challenges, currentChallengeId, setCurrentChallenge]);

  // IDEPanel reads from this store in readOnly mode — student code cannot be edited.
  const setCode = useWorkspaceStore((s) => s.setCode);
  useEffect(() => {
    if (!submissionData?.codeSubmissions) return;
    submissionData.codeSubmissions.forEach((cs) => {
      setCode(cs.challengeId, cs.code);
    });
  }, [submissionData]);

  const currentChallenge = challenges.find((c) => c.id === currentChallengeId) ?? null;

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

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <TeacherSubmissionTopBar
        assignmentTitle={assignment?.title}
        studentName={studentName}
        classroomId={Number(classroomId)}
        assignmentId={Number(assignmentId)}
        submissionId={Number(submissionId)}
      />

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
            <GradingPanel
              classroomId={Number(classroomId)}
              assignmentId={Number(assignmentId)}
              submissionId={Number(submissionId)}
              studentName={studentName}
              submittedAt={submittedAt}
              currentScore={submissionData?.totalScore}
            />
          </ResizablePanel>
      </ResizablePanelContainer>
      
      </div>
    </div>
  );
}

export default TeacherSubmissionViewPage;
