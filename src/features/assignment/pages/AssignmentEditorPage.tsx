import AssignmentHeader from "../components/AssignmentHeader";
import ChallengeTab from "../components/ChallengesTab";
import { SettingsTab } from "../components/SettingsTab";
import { SubmissionsTab } from "../components/SubmissionTab";
import { useAssignmentTabs } from "../hooks/useMenuTabs";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { useClassroomRole } from "@/features/classes/hooks/useClassroomRole";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { useAssignmentEditorDirty } from "../hooks/useAssignmentEditorDirty";
import { useChallengesDirty } from "../hooks/useChallengeDirty";
import { useEffect, useMemo, useState } from "react";
import { useUnsavedChangesStore } from "@/shared/store/UnsavedChangesStore";
import { useSubmissions } from "../hooks/useSubmissionQuery";
import { useMembers } from "@/features/class/hooks/useMemberQuery";
import type { SubmissionWithStudentName } from "../apis/submission.api";
import { useNavigate } from "react-router-dom";
import { useDeleteAssignment } from "../hooks/useAssignmentQuery";
import { ConfirmDialog } from "@/shared/components/design/dialog/ConfirmDialog";

const AssignmentEditor = () => {
  const { activeTab } = useAssignmentTabs();
  const { classroomId, assignmentId } = useClassroomRoute();
  const { data: roleData } = useClassroomRole(classroomId);
  const isAdmin = roleData?.role === "OWNER";
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: deleteAssignment, isPending: isDeleting } = useDeleteAssignment();

  const handleDelete = () => {
    deleteAssignment({classroomId, assignmentId}, {
      onSuccess: () => {
        navigate(`/classrooms/${classroomId}`);
      },
    });
  };

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

  const { data: submissions = [], isLoading: isSubmissionsLoading, isError: isSubmissionsError } =
    useSubmissions(classroomId, assignmentId);

  const { data: members = [], isLoading: isMembersLoading, isError: isMembersError } =
    useMembers(classroomId);

  const submissionsWithNames: SubmissionWithStudentName[] = useMemo(() => {
    if (isSubmissionsLoading || isMembersLoading) return [];
    if (!members.length) return [];

    return submissions.map((sub) => ({
      ...sub,
      name: members.find((m) => m.userId === sub.userId)?.name ?? "Unknown",
    }));
  }, [submissions, members, isSubmissionsLoading, isMembersLoading]);
  

  useEffect(() => {
    console.log("Submissions:", submissions);
    console.log("Submission userIds:", submissions.map(s => s.userId));

    console.log("Members:", members);
    console.log("Member ids:", members.map(m => m.userId));
  }, [submissions, members, isSubmissionsLoading, isMembersLoading])

  const setHasUnsavedChanges = useUnsavedChangesStore(
    (s) => s.setHasUnsavedChanges
  );

  const hasUnsavedChanges = isDirty || hasUnsavedChallenge;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, isDirty, hasUnsavedChallenge, setHasUnsavedChanges]);
  
  if (isLoading || !draft) {
    return <div className="p-6 text-muted-foreground">Loading assignment...</div>;
  }

  const handleCancelAll = () => {
    cancel();

    if (hasUnsavedChallenge) {
      cancelChallenge();
    }

    setHasUnsavedChanges(false);
  };

  const handleSaveAll = async () => {
    await save();

    if (hasUnsavedChallenge) {
      await saveChallenge();
    }

    setHasUnsavedChanges(false);
  };
  return (
    <>
    <Panel>
      <AssignmentHeader
        classroomId={classroomId}
        assignment={draft}
        isDirty={hasUnsavedChanges}
        updateField={updateField}
        save={handleSaveAll}
        cancel={handleCancelAll}
        onDeleteRequest={() => setConfirmOpen(true)}
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
          <SubmissionsTab
            submissions={submissionsWithNames}
            isLoading={isSubmissionsLoading || isMembersLoading}
            isError={isSubmissionsError || isMembersError}
          />
        )}
      </PanelContent>
      </Panel>
      
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {setConfirmOpen(!open)}}
        title="Delete Assignment"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{draft?.title}</strong>?
        </p>
      </ConfirmDialog>
    </>
  );
};

export default AssignmentEditor;