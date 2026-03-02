// features/challenge/components/ChallengeInfoTab.tsx
// Description tab — Title + Description only

import type { LibraryChallenge } from "../../types/challenge";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

interface ChallengeInfoTabProps {
  data: LibraryChallenge;
  onChange: (updated: Partial<LibraryChallenge>) => void;
}

export const ChallengeInfoTab = ({ data, onChange }: ChallengeInfoTabProps) => {
  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Title <span className="text-[hsl(var(--destructive))]">*</span>
        </label>
        <Input
          value={String(data.title ?? "")}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="An Implement Binary Search"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Description
        </label>
        <Textarea
          value={String(data.description ?? "")}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Description what student need to implement..."
          rows={10}
          className="resize-none"
        />
      </div>

    </div>
  );
};