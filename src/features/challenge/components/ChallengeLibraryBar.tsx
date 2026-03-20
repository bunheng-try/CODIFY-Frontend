import { useState } from "react";
import { useChallenges } from "../hooks/useChallengeQuery";
import { ChallengeCard } from "./ChallengeCard";
import { ChallengeEmptyState } from "./inused/ChallengeEmptyState";
import { Input } from "@/shared/components/ui/input";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ChallengeLibraryBarProps {
  onCreateChallenge: () => void;
}

export const ChallengeLibraryBar = ({
  onCreateChallenge,
}: ChallengeLibraryBarProps) => {
  const navigate = useNavigate()
  const { data: challenges = [], isLoading } = useChallenges();
  const [search, setSearch] = useState("");
  const { challengeId } = useParams()

  const filtered = challenges.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="p-6">Loading...</div>;

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
              {challenges.length} Challenge{challenges.length !== 1 ? "s" : ""}
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
        {filtered.length === 0 ? (
          <ChallengeEmptyState onCreate={onCreateChallenge} />
        ) : (
          filtered.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              variant="library"
              isSelected={Number(challengeId) === challenge.id}
              showDescription
              onSelect={(id) => navigate(`/challenge-library/challenges/${id}`)}
            />
          ))
        )}
      </PanelContent>
    </Panel>
  );
};