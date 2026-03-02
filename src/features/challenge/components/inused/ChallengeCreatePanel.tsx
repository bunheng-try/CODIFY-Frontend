// features/challenge/components/ChallengeCreatePanel.tsx
// Create challenge as inline panel — NOT a dialog
// Same tab structure as detail view

import { useState } from "react";
import { useChallengeStore } from "../../stores/challengeStore";
import type { LibraryChallenge, TestCase } from "../../types/challenge";
import { ChallengeCreateHeader } from "./ChallengeCreateHeader";
import { ChallengeInfoTab } from "./ChallengeInfoTab";
import { ChallengeStartCodeTab } from "./ChallengeStartCodeTab";
import { ChallengeTestCaseTab } from "./ChallengeTestCaseTab";
import { ChallengeSettingTab } from "./ChallengeSettingTab";
import type { ChallengeTabKey } from "./ChallengeDetailHeader";

interface ChallengeCreatePanelProps {
  onCancel: () => void;
}

const EMPTY_CHALLENGE: Omit<LibraryChallenge, "id" | "author" | "date"> = {
  title: "",
  description: "",
  language: "",
  level: "Easy",
  topic: "",
  score: 0,
  starterCode: "",
  testCases: [] as TestCase[],
};

type FormErrors = Partial<Record<string, string>>;

export const ChallengeCreatePanel = ({ onCancel }: ChallengeCreatePanelProps) => {
  const { addChallenge } = useChallengeStore();

  const [activeTab, setActiveTab] = useState<ChallengeTabKey>("description");
  const [form, setForm]           = useState({ ...EMPTY_CHALLENGE });
  const [errors, setErrors]       = useState<FormErrors>({});

  const handleChange = (updated: Partial<LibraryChallenge>) => {
    setForm((prev) => ({ ...prev, ...updated }));
    // Clear error when user types
    const key = Object.keys(updated)[0];
    if (key) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title.trim())       newErrors.title    = "Title is required";
    if (!form.description?.toString().trim()) newErrors.description = "Description is required";
    if (!form.language)           newErrors.language = "Language is required";
    if (!form.level)              newErrors.level    = "Difficulty is required";
    if (!form.topic)              newErrors.topic    = "Category is required";

    setErrors(newErrors);

    // Switch to the tab that has the first error
    if (newErrors.title || newErrors.description) {
      setActiveTab("description");
    } else if (newErrors.language) {
      setActiveTab("startCode");
    } else if (newErrors.level || newErrors.topic) {
      setActiveTab("setting");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;

    const newChallenge: LibraryChallenge = {
      ...form,
      id:     crypto.randomUUID(),
      author: "Me",
      date:   new Date(),
    };

    addChallenge(newChallenge);
    onCancel(); // Close create panel after success
  };

  // Cast form as LibraryChallenge for tab props
  const draftAsChallenge = form as unknown as LibraryChallenge;

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">

      {/* Header — Create New Challenge + Cancel/Create */}
      <ChallengeCreateHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCancel={onCancel}
        onCreate={handleCreate}
      />

      {/* Tab Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Description tab — Title + Description */}
        {activeTab === "description" && (
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[hsl(var(--foreground))]">
                Title <span className="text-[hsl(var(--destructive))]">*</span>
              </label>
              <input
                value={form.title}
                onChange={(e) => handleChange({ title: e.target.value })}
                placeholder="An Implement Binary Search"
                className="h-9 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              />
              {errors.title && (
                <p className="text-xs text-[hsl(var(--destructive))]">{errors.title}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[hsl(var(--foreground))]">
                Description
              </label>
              <textarea
                value={String(form.description ?? "")}
                onChange={(e) => handleChange({ description: e.target.value })}
                placeholder="Description what student need to implement..."
                rows={10}
                className="w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2 text-sm resize-none outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              />
              {errors.description && (
                <p className="text-xs text-[hsl(var(--destructive))]">{errors.description}</p>
              )}
            </div>
          </div>
        )}

        {/* Start Code tab — Language + Starter Code */}
        {activeTab === "startCode" && (
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[hsl(var(--foreground))]">
                Language <span className="text-[hsl(var(--destructive))]">*</span>
              </label>
              <select
                value={String(form.language ?? "")}
                onChange={(e) => handleChange({ language: e.target.value })}
                className="h-9 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm text-[hsl(var(--foreground))] outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              >
                <option value="">Select language</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
              {errors.language && (
                <p className="text-xs text-[hsl(var(--destructive))]">{errors.language}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[hsl(var(--foreground))]">
                Starter Code
              </label>
              <textarea
                value={form.starterCode ?? ""}
                onChange={(e) => handleChange({ starterCode: e.target.value })}
                placeholder={"void main(){\n  //Your Code\n}"}
                rows={14}
                spellCheck={false}
                className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--accent)/0.4)] px-3 py-2 font-mono text-sm resize-none outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              />
            </div>
          </div>
        )}

        {/* Test Case tab */}
        {activeTab === "testCase" && (
          <ChallengeTestCaseTab
            data={draftAsChallenge}
            onChange={handleChange}
          />
        )}

        {/* Setting tab — Points + Difficulty + Category + AI */}
        {activeTab === "setting" && (
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[hsl(var(--foreground))]">
                Points
              </label>
              <input
                type="number"
                value={String(form.score ?? "")}
                onChange={(e) => handleChange({ score: Number(e.target.value) })}
                placeholder="0-100"
                className="h-9 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[hsl(var(--foreground))]">
                  Difficulty <span className="text-[hsl(var(--destructive))]">*</span>
                </label>
                <select
                  value={form.level ?? ""}
                  onChange={(e) =>
                    handleChange({ level: e.target.value as LibraryChallenge["level"] })
                  }
                  className="h-9 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm text-[hsl(var(--foreground))] outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                {errors.level && (
                  <p className="text-xs text-[hsl(var(--destructive))]">{errors.level}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[hsl(var(--foreground))]">
                  Category <span className="text-[hsl(var(--destructive))]">*</span>
                </label>
                <input
                  value={String(form.topic ?? "")}
                  onChange={(e) => handleChange({ topic: e.target.value })}
                  placeholder="ex: Array"
                  className="h-9 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                />
                {errors.topic && (
                  <p className="text-xs text-[hsl(var(--destructive))]">{errors.topic}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};