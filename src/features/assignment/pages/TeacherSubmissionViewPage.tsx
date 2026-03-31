import { useEffect, useState } from "react";
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
import { Panel } from "react-resizable-panels";
import { PanelContent } from "@/shared/components/design/Panel";
import { useFeedbackQuery } from "../hooks/useFeedback";

function TeacherSubmissionViewPage() {
  const { classroomId, assignmentId, submissionId } = useParams();
  const HOME_PAGE_ID = -1;

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
  const { data: feedbackData } = useFeedbackQuery({
    classroomId: Number(classroomId),
    assignmentId: Number(assignmentId),
    submissionId: Number(submissionId),
  });

  const studentName =
    members.find((m) => m.userId === submissionData?.userId)?.name ??
    "Unknown Student";

  const submittedAt = submissionData?.submittedAt ?? submissionData?.createdAt;

  const setScore = useGradingStore((s) => s.setScore);
  const setFeedback = useGradingStore((f) => f.setFeedback);
  useEffect(() => {
    if (submissionData?.totalScore != null && submissionData.totalScore > 0) {
      setScore(String(submissionData.totalScore));
    }
  }, [submissionData?.totalScore]);

  // Challenge sidebar — auto-select first challenge
  const currentChallengeId = useWorkspaceStore((s) => s.currentChallengeId);
  const setCurrentChallenge = useWorkspaceStore((s) => s.setCurrentChallenge);

  useEffect(() => {
    if (!assignmentQuery.isSuccess || !assignment) return;

    const validIds = challenges.map((c) => c.id);

    if (currentChallengeId == null || (!validIds.includes(currentChallengeId) && currentChallengeId !== HOME_PAGE_ID)) {
      setCurrentChallenge(HOME_PAGE_ID);
    }
  }, [assignmentQuery.isSuccess, assignment, challenges, currentChallengeId, setCurrentChallenge]);

  // IDEPanel reads from this store in readOnly mode — student code cannot be edited.
  const setCode = useWorkspaceStore((s) => s.setCode);
  useEffect(() => {
    if (!submissionData?.codeSubmissions) return;
    submissionData.codeSubmissions.forEach((cs) => {
      setCode(cs.challengeId, cs.code);
    });
    setScore(String(submissionData.totalScore ?? 0));
      setFeedback(submissionData.feedback?.toString() ?? "");

  }, [submissionData]);

  const currentChallenge = challenges.find((c) => c.id === currentChallengeId) ?? null;

  if (assignmentQuery.isLoading || isSubmissionLoading) {
    return <WorkspaceSkeleton />;
  }

  if (currentChallengeId !== HOME_PAGE_ID && !currentChallenge) {
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
        submissionStatus={submissionData?.status!}
      />

      <div className="flex flex-1 min-h-0">
        <ChallengeSidebar challenges={challenges} >
          <ChallengeItem
            name={"H"}
            active={currentChallengeId === Number(HOME_PAGE_ID)}
            onClick={() => setCurrentChallenge(Number(HOME_PAGE_ID))}
          />
        </ChallengeSidebar>        
        <ResizablePanelContainer direction="horizontal" className="flex-1 min-h-0">
          {
            currentChallengeId === Number(-1)
              ?
              <ResizablePanel className="min-h-0">
                <Panel>
                  <PanelContent>
                    <h1 className="text-4xl pb-4"
                    >{assignment?.title}</h1>
                    <p className='typo-body'>
                      {assignment?.description || "Undefined"}
                    </p>
                  </PanelContent>
                </ Panel>
              </ResizablePanel>
              :
              (
                <>
                  <ResizablePanel className="min-h-0">
                    <InstructionPanel challenge={currentChallenge!} />
                  </ResizablePanel>

                  <ResizablePanelDivider />

                  <ResizablePanel className="flex flex-col min-h-0">
                    <IDEPanel
                      challengeId={currentChallenge!.id}
                      language={currentChallenge!.language}
                      readOnly
                    />
                  </ResizablePanel></>
              )
          }
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
