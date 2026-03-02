// features/challenge/components/ChallengeSettingTab.tsx
// Setting tab — Points, Difficulty, Category, AI Evaluation, Add Rubric

import { useState } from "react";
import type { LibraryChallenge } from "../../types/challenge";
import { Input } from "@/shared/components/ui/input";
import { ButtonSecondary } from "@/shared/components/design/button";
import { Paperclip } from "lucide-react";

interface ChallengeSettingTabProps {
  data: LibraryChallenge;
  onChange: (updated: Partial<LibraryChallenge>) => void;
}

export const ChallengeSettingTab = ({
  data,
  onChange,
}: ChallengeSettingTabProps) => {
  const [aiEnabled, setAiEnabled] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Points */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Points
        </label>
        <Input
          type="number"
          value={String(data.score ?? "")}
          onChange={(e) => onChange({ score: Number(e.target.value) })}
          placeholder="0-100"
        />
      </div>

      {/* Row — Difficulty + Category */}
      <div className="grid grid-cols-2 gap-4">

        {/* Difficulty */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">
            Difficulty <span className="text-[hsl(var(--destructive))]">*</span>
          </label>
          <select
            value={data.level ?? ""}
            onChange={(e) =>
              onChange({ level: e.target.value as LibraryChallenge["level"] })
            }
            className="h-9 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm text-[hsl(var(--foreground))] outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
          >
            <option value="">Easy</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">
            Category <span className="text-[hsl(var(--destructive))]">*</span>
          </label>
          <Input
            value={String(data.topic ?? "")}
            onChange={(e) => onChange({ topic: e.target.value })}
            placeholder="ex: Array"
          />
        </div>
      </div>

      {/* Enable AI Evaluation */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Enable AI Evaluation
        </label>

        {/* AI Evaluation Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-[hsl(var(--border))]">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">
              AI Evaluation
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Automatically evaluate submissions with AI
            </p>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={aiEnabled}
            onClick={() => setAiEnabled((prev) => !prev)}
            className={`
              relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out outline-none
              focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]
              ${aiEnabled
                ? "bg-[hsl(var(--primary))]"
                : "bg-[hsl(var(--input))]"
              }
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg
                transform transition duration-200 ease-in-out
                ${aiEnabled ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>
        </div>

        {/* Add Rubric Button */}
        <ButtonSecondary className="w-fit gap-2">
          <Paperclip className="w-4 h-4" />
          Add Rubric
        </ButtonSecondary>
      </div>

    </div>
  );
};