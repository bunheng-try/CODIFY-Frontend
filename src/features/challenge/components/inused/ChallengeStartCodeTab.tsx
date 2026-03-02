// features/challenge/components/ChallengeStartCodeTab.tsx
// Start Code tab — Language dropdown + Starter Code textarea

import type { LibraryChallenge } from "../../types/challenge";
import { Textarea } from "@/shared/components/ui/textarea";

interface ChallengeStartCodeTabProps {
  data: LibraryChallenge;
  onChange: (updated: Partial<LibraryChallenge>) => void;
}

export const ChallengeStartCodeTab = ({
  data,
  onChange,
}: ChallengeStartCodeTabProps) => {
  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Language dropdown */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Language <span className="text-[hsl(var(--destructive))]">*</span>
        </label>
        <select
          value={String(data.language ?? "")}
          onChange={(e) => onChange({ language: e.target.value })}
          className="h-9 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm text-[hsl(var(--foreground))] outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
        >
          <option value="">Select language</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
        </select>
      </div>

      {/* Starter Code */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Starter Code
        </label>
        <Textarea
          value={data.starterCode ?? ""}
          onChange={(e) => onChange({ starterCode: e.target.value })}
          placeholder={"void main(){\n  //Your Code\n}"}
          rows={14}
          className="font-mono text-sm resize-none bg-[hsl(var(--accent)/0.4)]"
          spellCheck={false}
        />
      </div>

    </div>
  );
};