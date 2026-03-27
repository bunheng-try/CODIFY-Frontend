import { useState } from "react";
import { useChallenges } from "../hooks/useChallengeQuery";
import { ChallengeCard } from "./ChallengeCard";
import { ChallengeEmptyState } from "./empty/ChallengeEmptyState";
import { Input } from "@/shared/components/ui/input";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ContextMenu } from "@/shared/components/context-menu/ContextMenu";
import { useChallengeContextMenu } from "../hooks/useChallengeContextMenu";
import ListSkeleton from "@/shared/components/loading-skeleton/ListSkeleton";

interface ChallengeLibraryBarProps {
  onCreateChallenge: () => void;
  onEditChallenge: (id: number) => void;
  onDuplicateChallenge?: (id: number) => void;
  onRequestDeleteChallenge: (id: number) => void;
}

export const ChallengeLibraryBar = ({
  onCreateChallenge,
  onEditChallenge,
  onDuplicateChallenge,
  onRequestDeleteChallenge,
}: ChallengeLibraryBarProps) => {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const { data: challenges = [], isLoading } = useChallenges();
  const [search, setSearch] = useState("");

  const filtered = challenges.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  );

  const {
    contextMenu,
    contextMenuItems,
    handleChallengeContextMenu,
    closeContextMenu,
  } = useChallengeContextMenu({
    onEdit: onEditChallenge,
    onDuplicate: onDuplicateChallenge,
    onRequestDelete: onRequestDeleteChallenge,
  });

  return (
    <Panel className="h-full flex flex-col">
      <PanelHeader
        topLeft={<h2 className="typo-title">Library</h2>}
        topRight={
          <Button onClick={onCreateChallenge} variant="ghost" size="icon">
            <Plus className="w-5 h-5 text-[hsl(var(--primary))]" />
          </Button>
        }
        bottomContent={
          <>
            <span className="typo-caption">
              {isLoading ? "Loading..." : `${challenges.length} Challenge${challenges.length !== 1 ? "s" : ""}`}
            </span>
            <Input
              placeholder="Search challenge..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-xs"
            />
          </>
        }
      />

      <PanelContent className="flex flex-col gap-2 p-4">
        {isLoading ? (
          <ListSkeleton />
        ) : filtered.length === 0 ? (
          <ChallengeEmptyState onCreate={onCreateChallenge} />
        ) : (
          filtered.map((challenge) => (
            <div
              key={challenge.id}
              onContextMenu={(e) => handleChallengeContextMenu(e, challenge.id)}
            >
              <ChallengeCard
                challenge={challenge}
                variant="library"
                isSelected={Number(challengeId) === challenge.id}
                showDescription
                onSelect={(id) =>
                  navigate(`/challenge-library/challenges/${id}`)
                }
              />
            </div>
          ))
        )}
      </PanelContent>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={closeContextMenu}
        />
      )}
    </Panel>
  );
};