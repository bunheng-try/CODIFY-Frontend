import { useState, useEffect } from "react";
import MainPanel from "@/shared/components/layout/mainPanel/MainPanel";
import AssignmentHeader from "../components/AssignmentHeader";
import ChallengeTab from "../components/ChallengesTab";
import { SettingsTab } from "../components/SettingsTab";
import { SubmissionsTab } from "../components/SubmissionTab";
import { useAssignmentTabs } from "../hooks/useMenuTabs";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { useAssignment } from "../hooks/useAssignmentQuery";
import {mockSubmissions } from "@/shared/types/types";
import type { Assignment } from "../apis/assignment.api";

const AssignmentEditor = () => {
  const { activeTab } = useAssignmentTabs();
  const { classroomId, assignmentId } = useClassroomRoute();
  const { data: assignment, isLoading } = useAssignment(classroomId || null, assignmentId || null);

  const [isEditing, setIsEditing] = useState(false);


  if (isLoading) {
    return <div className="p-6 text-muted-foreground">Loading assignment...</div>;
  }

  if (!assignmentId || !assignment) {
    return <div className="p-6 text-muted-foreground">Select an assignment</div>;
  }

  const handleAssignmentUpdate = (updated: Partial<Assignment>) => {
    
  };

  const handleDelete = () => {
    // Ideally call a mutation to delete the assignment here
    
  };

  return (
    <MainPanel
      header={<AssignmentHeader classroomId={classroomId} assignment={assignment} isEditing={isEditing} />}
      emptyState={<div className="p-6 text-gray-400">No content</div>}
    >
      <div className="flex-1 overflow-auto">
        {activeTab === "challenge" && <ChallengeTab assignmentId={assignmentId} />}
        {activeTab === "settings" && (
          <SettingsTab
            assignment={assignment}
            isEditing={isEditing}
            onEditChange={setIsEditing}
            onAssignmentUpdate={handleAssignmentUpdate}
            onDelete={handleDelete}
          />
        )}
        {activeTab === "submission" && <SubmissionsTab submissions={mockSubmissions ?? []} />}
      </div>
    </MainPanel>
  );
};

export default AssignmentEditor;
