// features/challenge/components/ChallengeEmptyState.tsx

import { FileX } from "lucide-react";
import { ButtonPrimary } from "@/shared/components/design/button";

interface ChallengeEmptyStateProps {
  onCreate: () => void;
}

export const ChallengeEmptyState = ({ onCreate }: ChallengeEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6 py-16">

      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center">
        <FileX className="w-7 h-7 text-[hsl(var(--muted-foreground))]" />
      </div>

      {/* Message */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
          No challenges yet
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Create your first challenge to get started
        </p>
      </div>

      {/* CTA — no size prop, ButtonPrimary doesn't support it */}
      <ButtonPrimary onClick={onCreate}>
        + Create Challenge
      </ButtonPrimary>

    </div>
  );
};