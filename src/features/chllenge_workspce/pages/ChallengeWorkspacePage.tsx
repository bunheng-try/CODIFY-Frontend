import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAssignment } from "@/features/assignment/hooks/useAssignmentQuery";
import { useWorkspaceStore } from "../stores/useWorkspaceStore";
import TopBar from "../components/TopBar";
import {
  ResizablePanel,
  ResizablePanelContainer,
  ResizablePanelDivider,
} from "@/shared/components/layout/ResizablePanel";
import ChallengeSidebar from "../components/ChallengeSidebar";
import InstructionPanel from "../components/InstructionPanel";
import IDEPanel from "../components/IDEPanel";
import ResultPanel from "../components/ResultPanel";

function ChallengeWorkspace() {
  const { classroomId, assignmentId } = useParams();

  // Fetch assignment
  const assignmentQuery = useAssignment(Number(classroomId), Number(assignmentId));
  const assignment = assignmentQuery.data;
  const challenges = assignment?.codingChallenges ?? [];

  // Zustand store
  const currentChallengeId = useWorkspaceStore((s) => s.currentChallengeId);
  const setCurrentChallenge = useWorkspaceStore((s) => s.setCurrentChallenge);
  const setStarterCode = useWorkspaceStore((s) => s.setStarterCode);
  const starterCode = useWorkspaceStore((s) => s.starterCodes);

  useEffect(() => {
    if (!assignmentQuery.isSuccess || !assignment || challenges.length === 0) return;

    const firstChallengeId = challenges[0].id;
    const validChallengeIds = challenges.map((c) => c.id);

    if (currentChallengeId == null || !validChallengeIds.includes(currentChallengeId)) {
      setCurrentChallenge(firstChallengeId);
    }
  }, [assignmentQuery.isSuccess, assignment, challenges, currentChallengeId, setCurrentChallenge]);

  const currentChallenge = challenges.find((c) => c.id === currentChallengeId) ?? null;

  useEffect(() => {
    if (!currentChallenge?.starterCode) return;
    setStarterCode(currentChallenge.id, currentChallenge.starterCode);
    console.log(`challenge has changed!!!!!!!!!!!!!!!!!!!! ${starterCode[currentChallengeId!]}`)
  }, [currentChallenge, setStarterCode]);

  if (assignmentQuery.isLoading) return <div>Loading assignment...</div>;
  if (!currentChallenge) return <div>No challenge selected</div>;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <TopBar title={assignment?.title} />
      <div className="flex flex-1 min-h-0">
        <ChallengeSidebar challenges={challenges} />
        <ResizablePanelContainer
          direction="horizontal"
          className="flex-1 min-h-0"
        >
          <ResizablePanel className="min-h-0">
            <InstructionPanel challenge={currentChallenge} />
          </ResizablePanel>

          <ResizablePanelDivider />

          <ResizablePanel className="flex flex-col min-h-0">
            <IDEPanel
              challengeId={currentChallenge.id}
              language={currentChallenge.language}
            />
          </ResizablePanel>

          <ResizablePanelDivider />

          <ResizablePanel className="min-h-0">
            <ResultPanel currentChallenge={currentChallenge} />
          </ResizablePanel>
        </ResizablePanelContainer>
      </div>
    </div>
  );
}

export default ChallengeWorkspace;