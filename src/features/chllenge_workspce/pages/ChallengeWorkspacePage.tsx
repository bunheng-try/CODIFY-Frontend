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
import { useAssignment } from "@/features/assignment/hooks/useAssignmentQuery";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWorkspaceStore } from "../stores/useWorkspaceStore";

function ChallengeWorkspace() {
  const { classroomId, assignmentId } = useParams();
  const assignmentQuery = useAssignment(Number(classroomId), Number(assignmentId));
  const assignment = assignmentQuery.data;
  const challenges = assignment?.assignmentChallenges ?? [];

  const { currentChallengeId, setCurrentChallenge } = useWorkspaceStore();
  const setStarterCode = useWorkspaceStore((s) => s.setStarterCode);

  useEffect(() => {
    if (challenges.length && currentChallengeId === null) {
      setCurrentChallenge(challenges[0].id);
    }
  }, [challenges, currentChallengeId]);

  const currentChallenge = challenges.find((c) => c.id === currentChallengeId);

  useEffect(() => {
    if (!currentChallenge) return;

    setStarterCode(currentChallenge.id, currentChallenge.starterCode);
  }, [currentChallenge?.id]);

  if (assignmentQuery.isLoading) return <div>Loading assignment...</div>;
  if (!currentChallenge) return <div>No challenge selected</div>;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <TopBar title={assignment?.title} />
      <div className="flex flex-1 min-h-0">
        <ChallengeSidebar challenges={challenges} />
        <ResizablePanelContainer direction="horizontal" className="flex-1 min-h-0">
          <ResizablePanel className="min-h-0">
            <InstructionPanel challenge={currentChallenge} />
          </ResizablePanel>

          <ResizablePanelDivider />

          <ResizablePanel className="flex flex-col min-h-0">
            <IDEPanel
              challengeId={currentChallengeId!}
              language={currentChallenge.language}
            />
          </ResizablePanel>

          <ResizablePanelDivider />

          <ResizablePanel className="min-h-0">
            <ResultPanel challengeId={currentChallengeId!} />
          </ResizablePanel>
        </ResizablePanelContainer>
      </div>
    </div>
  );
}

export default ChallengeWorkspace;