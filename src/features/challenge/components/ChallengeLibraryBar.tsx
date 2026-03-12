import { useState, useEffect } from "react";
import { useChallenges } from "../hooks/useChallengeQuery";
import { ChallengeCard } from "./ChallengeCard";
import { ChallengeEmptyState } from "./inused/ChallengeEmptyState";
import { Input } from "@/shared/components/ui/input";
import { MainBar } from "@/shared/components/layout/mainBar/MainBar";
import type { Challenge } from "../apis/challenge.api";

interface ChallengeLibraryBarProps {
  onCreateChallenge: () => void;
  selectedChallenge?: Challenge | null;
  setSelectedChallenge?: (c: Challenge | null) => void;
}

export const ChallengeLibraryBar = ({
  onCreateChallenge,
  selectedChallenge,
  setSelectedChallenge,
}: ChallengeLibraryBarProps) => {
  const { data: challenges = [], isLoading } = useChallenges();
  const [search, setSearch] = useState("");

  const filtered = challenges.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-select first challenge if none selected
  useEffect(() => {
    if (filtered.length > 0 && !selectedChallenge && setSelectedChallenge) {
      setSelectedChallenge(filtered[0]);
    }
  }, [filtered, selectedChallenge, setSelectedChallenge]);

  if (isLoading) return <div className="p-6">Loading...</div>;


  const handleSetting = () => {
    console.log('create')
  }


  return (
    <MainBar
      title="Library"
      meta={
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          {challenges.length} Challenge{challenges.length !== 1 ? "s" : ""}
        </p>
      }
      create={onCreateChallenge}
      openSetting={handleSetting}
    >
      <div className="px-2 mb-3">
        <Input
          placeholder="Search challenge..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 text-xs"
        />
      </div>

      {filtered.length === 0 ? (
        <ChallengeEmptyState onCreate={onCreateChallenge} />
      ) : (
        filtered.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            variant="library"
            isSelected={selectedChallenge?.id === challenge.id}
            showDescription
          />
        ))
      )}
    </MainBar>
  );
};