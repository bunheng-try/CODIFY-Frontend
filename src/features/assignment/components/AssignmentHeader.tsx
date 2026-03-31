import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import { Button } from "@/shared/components/ui/button";
import { useAssignmentTabs } from "../hooks/useMenuTabs";
import { CodeIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { usePublishAssignment } from "../hooks/useAssignmentQuery";
import type { Assignment } from "../apis/assignment.api";
import type { JSX } from "react";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { EditableTitle } from "@/shared/components/design/EditableTitle";
import { ErrorDialog } from "@/shared/components/design/dialog";



type Props = {
  classroomId: number;
  isDirty: boolean;
  assignment: Assignment;
  updateField: <K extends keyof Assignment>(key: K, value: Assignment[K]) => void;
  save: () => void;
  cancel: () => void;
  onDeleteRequest: () => void;
};

const AssignmentHeader = ({ classroomId, isDirty, assignment, updateField, save, cancel, onDeleteRequest }: Props) => {
  const { activeTab, setActiveTab } = useAssignmentTabs();
  const { mutate: publishAssignment, isPending: isPublishing } = usePublishAssignment();
  const [showPublishedUI, setShowPublishedUI] = useState(assignment.isPublished);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const autoFocusTitle = location.state?.autoFocusTitle || false;

  useEffect(() => {
    if (autoFocusTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [autoFocusTitle]);
  
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const handlePublish = () => {
    if (!assignment.codingChallenges || assignment.codingChallenges.length === 0) {
      setOpenErrorDialog(true);
      return;
    }

    publishAssignment({ classroomId, assignmentId: assignment.id });
    setShowPublishedUI(assignment.isPublished);
  };

  type TabKey = "challenge" | "settings" | "submission";
  interface Tab { key: TabKey; label: string; icon: JSX.Element; }

  const tabs: Tab[] = [
    { key: "challenge", label: "Challenges", icon: <CodeIcon className="w-4 h-4 mr-2" /> },
    { key: "settings" as TabKey, label: "Settings", icon: <SettingsIcon className="w-4 h-4 mr-2" /> },
    { key: "submission" as TabKey, label: "Submission", icon: <UsersIcon className="w-4 h-4 mr-2" /> },
  ];

  return (
    <>
      <PanelHeader
        topLeft={
          <EditableTitle
            value={assignment.title}
            onChange={(val) => updateField("title", val)} />
        }
        topRight={
          <>
            {isDirty ? (
              <>
                <Button variant="secondary" onClick={cancel}>
                  Cancel
                </Button>
                <Button variant="default" onClick={save}>
                  Save
                </Button>
              </>
            ) : showPublishedUI ? (
              <>
                  <Button variant="secondary" onClick={onDeleteRequest}>Delete</Button>
                <Button variant="default" onClick={handlePublish}>{isPublishing ? "Publishing..." : "Publish"}</Button>
              </>
            ) : (
              <>
                    <Button variant="secondary" onClick={onDeleteRequest}>Delete</Button>
              </>
            )}
          </>
        }
        tabs={
          <MenuTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        }
      />
      <ErrorDialog
        open={openErrorDialog}
        onOpenChange={setOpenErrorDialog}
        title="Cannot Publish Assignment"
      >
        <p>You need to add at least one challenge before publishing this assignment.</p>
      </ErrorDialog>
    </>
  );
};

export default AssignmentHeader;