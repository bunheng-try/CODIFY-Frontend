import ChallengeTab from "../components/ChallengesTab";
import { SettingsTab } from "../components/SettingsTab";
import { SubmissionsTab } from "../components/SubmissionTab";
import { useAssignmentTabs, type AssignmentTab } from "../hooks/useMenuTabs";
import { mockSubmissions } from "@/shared/types/types";
import { AssignmentHeader } from "../components/AssignmentHeader";
import { type TabItem } from "@/shared/components/menu_tabs/MenuTabs";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { useAssignmentEditor } from "../hooks/useAssignmentEditor";

const AssignmentEditor = () => {
  const { activeTab, setActiveTab } = useAssignmentTabs();

  const {
    assignment,
    isLoading,
    title,
    setTitle,
    isEditing,
    setIsEditing,
    publish,
    unpublish,
    deleteAssignment,
  } = useAssignmentEditor();

  if (isLoading) {
    return <div className="p-6">Loading assignment...</div>;
  }

  if (!assignment) {
    return <div className="p-6">Select an assignment</div>;
  }

  const tabs: TabItem<AssignmentTab>[] = [
    { key: "challenge", label: "Challenges" },
    { key: "settings", label: "Settings" },
    ...(assignment.isPublished
      ? [{ key: "submission" as AssignmentTab, label: "Submissions" }]
      : []),
  ];

  return (
    <Panel>
      <AssignmentHeader
        assignment={assignment}
        title={title}
        isEditing={isEditing}
        onTitleChange={setTitle}
        onEditStart={() => setIsEditing(true)}
        onEditDone={() => setIsEditing(false)}
        onPublish={publish}
        onUnpublish={unpublish}
        onDiscard={() => setIsEditing(false)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <PanelContent>
        {activeTab === "challenge" && (
          <ChallengeTab challenges={assignment.codingChallenges} />
        )}

        {activeTab === "settings" && (
          <SettingsTab
            assignment={assignment}
            isEditing={isEditing}
            onEditChange={setIsEditing}
            onDelete={deleteAssignment}
          />
        )}

        {activeTab === "submission" && assignment.isPublished && (
          <SubmissionsTab submissions={mockSubmissions ?? []} />
        )}
      </PanelContent>
    </Panel>
  );
};

export default AssignmentEditor;