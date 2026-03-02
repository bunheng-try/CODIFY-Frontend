import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import { Button } from "@/shared/components/ui/button";
import { useAssignmentTabs } from "../hooks/useMenuTabs";
import { CodeIcon, MoreVerticalIcon, PencilIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { usePublishAssignment, useUnPublishAssignment, useUpdateAssignment } from "../hooks/useAssignmentQuery";
import type { Assignment } from "../apis/assignment.api";
import type { JSX } from "react";
import { BasePanelHeader } from "@/shared/components/layout/mainPanel/BasePanelHeader";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  classroomId: number
  assignment: Assignment;
  isEditing: boolean;
};

const AssignmentHeader = ({ classroomId, assignment, isEditing}: Props) => {
  const { activeTab, setActiveTab } = useAssignmentTabs();
  const { mutate: publishAssignment } = usePublishAssignment();
  const { mutate: unpublishAssignment } = useUnPublishAssignment();
  const {mutate:updateAssignment}= useUpdateAssignment();
  const [titleInput, setTitleInput] = useState(assignment.title);

  if (!assignment) return <div className="p-4 text-red-600">Assignment data missing</div>;

  const showPublishedUI = assignment.isPublished && !isEditing;

  const titleInputRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const autoFocusTitle = location.state?.autoFocusTitle || false;

  useEffect(() => {
    if (autoFocusTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [autoFocusTitle]);

  const handlePublish = () => publishAssignment({classroomId, assignmentId: assignment.id});
  const handleUnpublish = () => unpublishAssignment({ classroomId, assignmentId: assignment.id });
  const handleDiscard = () => console.log("Assignment discarded");

  const handleMenuClick = () => console.log("Three-dot menu clicked");

  type TabKey = "challenge" | "settings" | "submission";

  interface Tab {
    key: TabKey;
    label: string;
    icon: JSX.Element;
  }

  const baseTabs: Tab[] = [
    { key: "challenge", label: "Challenges", icon: <CodeIcon className="w-4 h-4 mr-2" /> },
    { key: "settings", label: "Settings", icon: <SettingsIcon className="w-4 h-4 mr-2" /> },
  ];

  const tabs: Tab[] = showPublishedUI
    ? [
      ...baseTabs,
      { key: "submission", label: "Submission", icon: <UsersIcon className="w-4 h-4 mr-2" /> },
    ]
    : baseTabs;

  const left = (
    <div className="flex items-center gap-2 min-w-0">
      <input
        type="text"
        ref={titleInputRef}
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        onBlur={() => {
          if (titleInput !== assignment.title) {
            updateAssignment({
              classroomId,
              assignmentId: assignment.id,
              dto: { title: titleInput },
            });
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        className="
          text-lg font-semibold text-[hsl(var(--foreground))] truncate 
          w-full px-2 py-1 rounded-md 
          focus:border-[hsl(var(--accent))] focus:ring-1 focus:ring-[hsl(var(--accent))] 
          bg-[hsl(var(--background))] outline-none
        "
      />
    </div>
  );

  const right = (
    <>
      {!showPublishedUI ? (
        <>
          <Button variant="secondary" onClick={handleDiscard}>Discard</Button>
          <Button variant="default" onClick={handlePublish}>Publish</Button>
          <button onClick={handleMenuClick} className="p-2 rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </>
      ) : (
        <>
          <Button variant="outline" onClick={handleUnpublish}>Unpublish</Button>
          <button onClick={handleMenuClick} className="p-2 rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </>
      )}
    </>
  );

  return (
    <>
      <BasePanelHeader left={left} right={right} />
      <MenuTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </>
  );
};

export default AssignmentHeader;