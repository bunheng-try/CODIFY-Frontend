import type { Challenge } from "@/shared/types/types";
import React, { useEffect } from "react";
import { ChallengeItem } from "./ChallengeItem";
import { useWorkspaceStore } from "../stores/useWorkspaceStore";

interface ChallengeSidebarProps {
  challenges: Challenge[];
}

const ChallengeSidebar: React.FC<ChallengeSidebarProps> = ({ challenges }) => {
  const { currentChallengeId, setCurrentChallenge } = useWorkspaceStore();

  return (
    <div
      className="
        flex flex-col items-center
        w-16
        h-full
        bg-[hsl(var(--workspace))] 
        border-r border-[hsl(var(--border-strong))] 
        p-2 
        gap-2
        overflow-y-auto
        scrollbar-thin scrollbar-thumb-[hsl(var(--border))] scrollbar-track-[hsl(var(--workspace))]
      "
    >
      {challenges.map((c, index) => (
        <ChallengeItem
          key={c.id}
          name={(index + 1).toString()}
          active={currentChallengeId === Number(c.id)}
          onClick={() => setCurrentChallenge(Number(c.id))}
        />
      ))}
    </div>
  );
};

export default ChallengeSidebar;
