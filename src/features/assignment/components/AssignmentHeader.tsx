import { Button } from "@/shared/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";
import type { Assignment } from "../apis/assignment.api";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { EditableTitle } from "@/shared/components/design/EditableTitle";
import MenuTabs, { type TabItem } from "@/shared/components/menu_tabs/MenuTabs";
import type { AssignmentTab } from "../hooks/useMenuTabs";

type Props = {
  assignment: Assignment;
  title: string;
  isEditing: boolean;
  onTitleChange: (newTitle: string) => void;
  onEditStart: () => void;
  onEditDone: () => void;
  onPublish?: () => void;
  onUnpublish?: () => void;
  onDiscard?: () => void;
  onMenuClick?: () => void;
};

export const AssignmentHeader = ({
  assignment,
  title,
  isEditing,
  onTitleChange,
  onEditStart,
  onEditDone,
  onPublish,
  onUnpublish,
  onDiscard,
  onMenuClick,
  tabs,
  activeTab,
  onTabChange,
}: Props & {
    tabs: TabItem<AssignmentTab>[]
    activeTab: AssignmentTab
    onTabChange: (tab: AssignmentTab) => void
}) => {
  const showPublishedUI = assignment.isPublished && !isEditing;

  return (
    <PanelHeader
      topLeft={
        showPublishedUI ? (
          <h2 className="text-lg font-semibold truncate">{title}</h2>
        ) : (
          <EditableTitle value={title} onChange={onTitleChange} />
        )
      }
      topRight={
        showPublishedUI ? (
          <>
            <Button variant="outline" onClick={onUnpublish}>Unpublish</Button>
            <Button variant="ghost" size="icon-sm" onClick={onMenuClick} aria-label="More options">
              <MoreVerticalIcon className="w-5 h-5" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={onDiscard}>Discard</Button>
            <Button variant="default" onClick={onPublish}>Publish</Button>
            <Button variant="ghost" size="icon-sm" onClick={onMenuClick} aria-label="More options">
              <MoreVerticalIcon className="w-5 h-5" />
            </Button>
          </>
        )
      }
      tabs={
        <MenuTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={onTabChange}
          className="-mt-px"
        />
      }
    />
  );
};