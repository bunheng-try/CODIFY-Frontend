// features/challenge/components/ChallengeCreateHeader.tsx

import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import type { TabItem } from "@/shared/components/menu_tabs/MenuTabs";
import { ButtonPrimary, ButtonSecondary } from "@/shared/components/design/button";
import type { ChallengeTabKey } from "./ChallengeDetailHeader";

const CREATE_TABS: TabItem<ChallengeTabKey>[] = [
  { key: "description", label: "Description" },
  { key: "startCode",   label: "Start Code"  },
  { key: "testCase",    label: "Test Case"   },
  { key: "setting",     label: "Setting"     },
];

interface ChallengeCreateHeaderProps {
  activeTab: ChallengeTabKey;
  onTabChange: (tab: ChallengeTabKey) => void;
  onCancel: () => void;
  onCreate: () => void;
}

export const ChallengeCreateHeader = ({
  activeTab,
  onTabChange,
  onCancel,
  onCreate,
}: ChallengeCreateHeaderProps) => {
  return (
    <div className="px-6 pt-5 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] shrink-0">

      {/* Top Row — Icon + Title + Cancel/Create */}
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
          <h1 className="text-base font-semibold text-[hsl(var(--foreground))]">
            Create New Challenge
          </h1>
        </div>

        {/* Cancel + Create buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <ButtonSecondary onClick={onCancel}>
            Cancel
          </ButtonSecondary>
          <ButtonPrimary onClick={onCreate}>
            Create
          </ButtonPrimary>
        </div>
      </div>

      {/* Tabs */}
      <MenuTabs
        tabs={CREATE_TABS}
        activeTab={activeTab}
        onChange={onTabChange}
      />
    </div>
  );
};