"use client";

import { useState } from "react";
import { AddChallengeLibraryModal } from "../components/AddChallengeLibraryModal";
import { SectionContainer } from "@/shared/components/design/SectionContainer";
import { Button } from "@/shared/components/ui/button";
import { useChallenges } from "@/features/challenge/hooks/useChallengeQuery";
import type { Challenge } from "@/features/challenge/apis/challenge.api";
import { ChallengeCard } from "@/features/challenge/components/ChallengeCard";
import NoChallenge from "./empty/NoChallenge";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { Plus } from "lucide-react";

interface ChallengeTabProps {
  challenges: Challenge[];
  onAddSelected: (selected: Challenge[]) => void;
  isAdding?: boolean;
}

const ChallengeTab = ({
  challenges = [],
  onAddSelected,
  isAdding = false,
}: ChallengeTabProps) => {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const { data: libraryChallenges } = useChallenges();
  return (
    <SectionContainer title="Challenges">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Add challenges to your assignment.
        </p>
        <Button onClick={() => setLibraryOpen(true)} disabled={isAdding}>
          {isAdding ? "Adding..." : <WrapIcon icon={Plus} />}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {challenges.length > 0 ? (
          challenges.map((c) => <ChallengeCard key={c.id} challenge={c}/>)
        ) : (
          <NoChallenge onAction={() => setLibraryOpen(true)} />
        )}
      </div>

      <AddChallengeLibraryModal
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onCreateNew={() => {
          console.log("navigate to challenge create");
        }}
        onAddSelected={(selected: Challenge[]) => {
          onAddSelected(selected);
          setLibraryOpen(false);
        }}
        libraryChallenges={libraryChallenges!}
      />
    </SectionContainer>
  );
};

export default ChallengeTab;