import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import { Button } from "@/shared/components/ui/button";
import { useAssignmentTabs } from "../hooks/useMenuTabs";
import { CodeIcon, MoreVerticalIcon, PencilIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { usePublishAssignment } from "../hooks/useAssignmentQuery";
import type { Assignment } from "../apis/assignment.api";
import type { JSX } from "react";
import { BasePanelHeader } from "@/shared/components/layout/BasePanelHeader";

type Props = {
  classroomId: number
  assignment: Assignment;
  isEditing: boolean;
};

const AssignmentHeader = ({ classroomId, assignment, isEditing }: Props) => {
  const { activeTab, setActiveTab } = useAssignmentTabs();
  const { mutate: publishAssignment } = usePublishAssignment();

  if (!assignment) return <div className="p-4 text-red-600">Assignment data missing</div>;

  const showPublishedUI = assignment.published && !isEditing;

  const handlePublish = () => publishAssignment({classroomId, assignmentId: assignment.id});
  const handleUnpublish = () => console.log("Assignment unpublished");
  const handleDiscard = () => console.log("Assignment discarded");
  const handleEditTitle = () => console.log("Edit title clicked");
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
    <>
      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
        <CodeIcon className="w-4 h-4 text-white" />
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] truncate">{assignment.title}</h2>
        <button onClick={handleEditTitle} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] shrink-0">
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>
    </>
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