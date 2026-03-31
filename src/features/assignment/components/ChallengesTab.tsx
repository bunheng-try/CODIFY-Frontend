"use client";

import { useMemo, useState } from "react";
import { AddChallengeLibraryModal } from "../components/AddChallengeLibraryModal";
import { SectionContainer } from "@/shared/components/design/SectionContainer";
import { Button } from "@/shared/components/ui/button";
import { useChallenges } from "@/features/challenge/hooks/useChallengeQuery";
import type { Challenge } from "@/features/challenge/apis/challenge.api";
import { ChallengeCard } from "@/features/challenge/components/ChallengeCard";
import NoChallenge from "./empty/NoChallenge";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { Plus } from "lucide-react";
import { useAssignmentChallengeContextMenu } from "../hooks/UseAssignmentChallengeContextMenuProps";
import { ContextMenu } from "@/shared/components/context-menu/ContextMenu";
import { useAssignmentRemoveChallenge } from "../hooks/useAssignmentQuery";

interface ChallengeTabProps {
  classroomId: number;
  assignmentId: number;
  challenges: Challenge[];
  onAddSelected: (selected: Challenge[]) => void;
  isAdding?: boolean;
}

const ChallengeTab = ({
  classroomId,
  assignmentId,
  challenges = [],
  onAddSelected,
  isAdding = false,
}: ChallengeTabProps) => {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const { data: libraryChallenges = [] } = useChallenges();
  const removeChallengeMutation = useAssignmentRemoveChallenge();

  const availableLibraryChallenges = useMemo(() => {
    const existingIds = new Set(challenges.map((c) => c.id));
    return libraryChallenges.filter((c) => !existingIds.has(c.id));
  }, [libraryChallenges, challenges]);

  const {
    contextMenu,
    contextMenuItems,
    handleChallengeContextMenu,
    closeContextMenu,
  } = useAssignmentChallengeContextMenu({
    isStudent: false,
    navigate: (path) => {
      console.log("navigate to:", path);
    },
    onRemoveChallenge: (challengeId) => {
      if (!classroomId || !assignmentId) return;
      removeChallengeMutation.mutate({ classroomId, assignmentId, challengeId });
    },
  });

  return (
    <SectionContainer title="Challenges">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">Add challenges to your assignment.</p>
        <Button onClick={() => setLibraryOpen(true)} disabled={isAdding}>
          {isAdding ? "Adding..." : <WrapIcon icon={Plus} />}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {challenges.length > 0 ? (
          challenges.map((c) => (
            <div
              key={c.id}
              onContextMenu={(e) => handleChallengeContextMenu(e, c)}
            >
              <ChallengeCard challenge={c} />
            </div>
          ))
        ) : (
          <NoChallenge onAction={() => setLibraryOpen(true)} />
        )}
      </div>

      <AddChallengeLibraryModal
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onAddSelected={(selected: Challenge[]) => {
          onAddSelected(selected);
          setLibraryOpen(false);
        }}
        libraryChallenges={availableLibraryChallenges}
      />

      {/* Render your context menu UI if needed */}
      {contextMenu && contextMenuItems.length > 0 && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={closeContextMenu}
        />
      )}
    </SectionContainer>
  );
};

export default ChallengeTab;