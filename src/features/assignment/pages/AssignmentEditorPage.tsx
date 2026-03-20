import AssignmentHeader from "../components/AssignmentHeader";
import ChallengeTab from "../components/ChallengesTab";
import { SettingsTab } from "../components/SettingsTab";
import { SubmissionsTab } from "../components/SubmissionTab";
import { useAssignmentTabs } from "../hooks/useMenuTabs";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { useClassroomRole } from "@/features/classes/hooks/useClassroomRole";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { useAssignmentEditorDirty } from "../hooks/useAssignmentEditorDirty";
import { mockSubmissions } from "@/shared/types/types";
import { useChallengesDirty } from "../hooks/useChallengeDirty";
import { useEffect } from "react";

const AssignmentEditor = () => {
  const { activeTab } = useAssignmentTabs();
  const { classroomId, assignmentId } = useClassroomRoute();
  const { data: roleData } = useClassroomRole(classroomId);
  const isAdmin = roleData?.role === "OWNER";

  const {
    draft,
    updateField,
    cancel,
    save,
    isDirty,
    isSaving,
    isLoading,
  } = useAssignmentEditorDirty(classroomId, assignmentId);

  const {
    draft: challengeDraft,
    addSelected: addChallenge,
    isAdding: isAddingChallenges,
    hasUnsaved: hasUnsavedChallenge,
    save: saveChallenge,
    cancel: cancelChallenge,
  } = useChallengesDirty(assignmentId, classroomId, draft?.assignmentChallenges || []);

  if (isLoading || !draft) {
    return <div className="p-6 text-muted-foreground">Loading assignment...</div>;
  }


  const handleCancelAll = () => {
    cancel();
    if (hasUnsavedChallenge) cancelChallenge();
  };

  const handleSaveAll = async () => {

    await save();
    if (hasUnsavedChallenge) saveChallenge(); 
  };

  return (
    <Panel>
      <AssignmentHeader
        classroomId={classroomId}
        assignment={draft}
        isDirty={isDirty || hasUnsavedChallenge}
        updateField={updateField}
        save={handleSaveAll}
        cancel={handleCancelAll}

      />

      <PanelContent>
        {activeTab === "challenge" && (
          <ChallengeTab challenges={challengeDraft} onAddSelected={addChallenge} />
        )}

        {isAdmin && activeTab === "settings" && (
          <SettingsTab
            draft={draft} 
            updateField={updateField}
          />
        )}

        {isAdmin && activeTab === "submission" && (
          <SubmissionsTab submissions={mockSubmissions ?? []} />
        )}
      </PanelContent>
    </Panel>
  );
};

export default AssignmentEditor;