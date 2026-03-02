// features/challenge/components/ChallengeTestCaseTab.tsx

import { useState } from "react";
import { Plus } from "lucide-react";
import type { LibraryChallenge, TestCase } from "../../types/challenge";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { TestCaseFormDialog } from "./TestCaseFormDialog";
import { cn } from "@/lib/utils";

interface ChallengeTestCaseTabProps {
  data: LibraryChallenge;
  onChange: (updated: Partial<LibraryChallenge>) => void;
}

export const ChallengeTestCaseTab = ({
  data,
  onChange,
}: ChallengeTestCaseTabProps) => {
  const [showCreate, setShowCreate] = useState(false);

  const handleAddTestCase = (testCase: TestCase) => {
    onChange({
      testCases: [...(data.testCases ?? []), testCase],
    });
  };

  const handleDeleteTestCase = (id: string) => {
    onChange({
      testCases: data.testCases.filter((tc) => tc.id !== id),
    });
  };

  return (
    <>
      <div className="flex flex-col h-full">

        {/* Tab Toolbar */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-b border-[hsl(var(--border))]">
          <Button
            variant="default"
            size="icon-sm"
            onClick={() => setShowCreate(true)}
            className="rounded-full w-8 h-8"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Test Case Table */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {data.testCases?.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
              <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                No test cases yet
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Click the + button to add your first test case
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="text-left py-2 px-3 text-xs font-medium text-[hsl(var(--muted-foreground))] w-[30%]">
                    Name
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-[hsl(var(--muted-foreground))] w-[25%]">
                    Input
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-[hsl(var(--muted-foreground))] w-[25%]">
                    Expected Output
                  </th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-[hsl(var(--muted-foreground))] w-[20%]">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.testCases.map((tc) => (
                  <tr
                    key={tc.id}
                    className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--accent)/0.5)] transition-colors"
                  >
                    {/* Name + Type badge */}
                    <td className="py-3 px-3">
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {tc.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs mt-0.5",
                          tc.type === "sample"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
                        )}
                      >
                        {tc.type}
                      </Badge>
                    </td>

                    {/* Input */}
                    <td className="py-3 px-3">
                      <code className="text-xs bg-[hsl(var(--accent))] px-1.5 py-0.5 rounded">
                        {tc.input}
                      </code>
                    </td>

                    {/* Expected Output */}
                    <td className="py-3 px-3">
                      <code className="text-xs bg-[hsl(var(--accent))] px-1.5 py-0.5 rounded">
                        {tc.expectedOutput}
                      </code>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDeleteTestCase(tc.id)}
                        className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))]"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create Test Case Modal */}
      <TestCaseFormDialog
        open={showCreate}
        onOpenChange={setShowCreate}
        onSubmit={handleAddTestCase}
      />
    </>
  );
};