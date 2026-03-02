// features/challenge/components/ChallengeDetailHeader.tsx

import { Save, X, Trash2 } from "lucide-react";
import { ButtonPrimary, ButtonSecondary, ButtonDestructive } from "@/shared/components/design/button";
import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import type { TabItem } from "@/shared/components/menu_tabs/MenuTabs";

export type ChallengeTabKey = "description" | "startCode" | "testCase" | "setting";

const CHALLENGE_TABS: TabItem<ChallengeTabKey>[] = [
  { key: "description", label: "Description" },
  { key: "startCode",   label: "Start Code"  },
  { key: "testCase",    label: "Test Case"   },
  { key: "setting",     label: "Setting"     },
];

interface ChallengeDetailHeaderProps {
  title: string;
  activeTab: ChallengeTabKey;
  onTabChange: (tab: ChallengeTabKey) => void;
  onSave: () => void;
  onDiscard: () => void;
  onDelete: () => void;
  isDirty: boolean;
}

export const ChallengeDetailHeader = ({
  title,
  activeTab,
  onTabChange,
  onSave,
  onDiscard,
  onDelete,
  isDirty,
}: ChallengeDetailHeaderProps) => {
  return (
    <div className="px-6 pt-5 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] shrink-0">

      {/* Top Row — Title + Actions */}
      <div className="flex items-center justify-between gap-4">

        {/* Icon + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-md bg-[hsl(var(--primary))] flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-[hsl(var(--primary-foreground))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-base font-semibold text-[hsl(var(--foreground))] truncate">
            {title}
          </h1>
        </div>

        {/* Actions — Delete + Discard + Save */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Delete */}
          <ButtonDestructive
            onClick={onDelete}
            className="gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </ButtonDestructive>

          {/* Discard */}
          <ButtonSecondary
            onClick={onDiscard}
            disabled={!isDirty}
            className="gap-1.5"
          >
            <X className="w-4 h-4" />
            Discard
          </ButtonSecondary>

          {/* Save */}
          <ButtonPrimary
            onClick={onSave}
            disabled={!isDirty}
            className="gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save
          </ButtonPrimary>
        </div>
      </div>

      {/* Tabs */}
      <MenuTabs
        tabs={CHALLENGE_TABS}
        activeTab={activeTab}
        onChange={onTabChange}
      />
    </div>
  );
};