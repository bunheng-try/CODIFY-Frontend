import { useParams, useNavigate } from "react-router-dom";
import { Panel } from "@/shared/components/design/Panel";
import { BasePanelHeader } from "@/shared/components/layout/mainPanel/BasePanelHeader";
import MainPanel from "@/shared/components/layout/mainPanel/MainPanel";
import { useAssignment } from "../hooks/useAssignmentQuery";
import { ChallengeCard } from "@/features/challenge/components/ChallengeCard";
import { ButtonPrimary } from "@/shared/components/design/button";

const StudentAssignmentPage = () => {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();

  const classroomId = classId ? Number(classId) : null;
  const assignId = assignmentId ? Number(assignmentId) : null;

  const { data: assignment, isLoading, isError } = useAssignment(classroomId, assignId);

  const handleStart = (challengeId: number) => {
    navigate(`/classrooms/${classId}/assignments/${assignmentId}/workspace/${challengeId}`);
  };

  if (isLoading) {
    return (
      <Panel>
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Loading assignment...
        </div>
      </Panel>
    );
  }

  if (isError) {
    return (
      <Panel>
        <div className="flex items-center justify-center h-full text-destructive">
          Failed to load assignment. Please try again.
        </div>
      </Panel>
    );
  }

  if (!assignment) {
    return (
      <Panel>
        <div className="flex items-center justify-center h-full text-muted-foreground">
          No assignment found.
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

  const hasNoChallenges = assignment.assignmentChallenges.length === 0;
  const firstChallengeId = assignment.assignmentChallenges[0]?.id;

  return (
    <Panel>
      <MainPanel
        header={
          <BasePanelHeader
            left={<h2 className="text-lg font-semibold">{assignment.title}</h2>}
            right={
              firstChallengeId && (
                <ButtonPrimary onClick={() => handleStart()}>
                  Start
                </ButtonPrimary>
              )
            }
          />
        }
      >
        {/* Info cards */}
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

        {/* Challenges */}
        <div>
          <p className="text-sm font-semibold mb-3">Challenges</p>

          {hasNoChallenges ? (
            <div className="text-sm text-muted-foreground text-center py-10">
              No challenges available yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {assignment.codingChallenges.map((challenge, index) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  variant="assignment"
                  index={index + 1}
                />
              ))}
            </div>
          )}
        </div>
      </MainPanel>
    </Panel>
  );
};

export default StudentAssignmentPage;