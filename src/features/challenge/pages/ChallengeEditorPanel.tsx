"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";

import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import { Button } from "@/shared/components/ui/button";

import OverviewTab from "../components/OverviewTab";
import StarterCodeTab from "../components/StarterCodeTab";
import TestCasesTab from "../components/TestCaseTab";

import { useChallengeEditorDirty } from "../hooks/useChallengeEditorDirty";
import { useTestCasesDirty } from "../hooks/useTestCaseDirty";
import type { EditorTab } from "../components/tabs";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import PanelSkeleton from "@/shared/components/loading-skeleton/PanelSkeleton";

export default function ChallengeEditorPanel() {
    const { challengeId } = useParams();
    const numericChallengeId = challengeId ? Number(challengeId) : undefined;

    const {
        draft,
        updateField,
        cancel,
        save,
        isDirty,
        isSaving,
        isLoading,
    } = useChallengeEditorDirty(numericChallengeId!);

    const {
        draft: testCaseDraft,
        updateField: updateTestCase,
        addDraft,
        save: saveTestCase,
        cancel: cancelTestCase,
        isDirty: isTestCaseDirty,
    } = useTestCasesDirty(numericChallengeId!);

    const [activeTab, setActiveTab] = useState<EditorTab>("overview");

    if (isLoading || !draft) {
        return <PanelSkeleton />;
    }

    const tabs = [
        { key: "overview" as EditorTab, label: "Overview" },
        { key: "starter" as EditorTab, label: "Starter Code" },
        { key: "testcases" as EditorTab, label: "Test Cases" },
    ];

    const hasDirtyTestCases = testCaseDraft?.some(tc => isTestCaseDirty(tc.id)) ?? false;

    

    const handleCancelAll = () => {
        cancel();
        if (testCaseDraft) testCaseDraft.forEach(tc => cancelTestCase(tc.id));
    };

    const handleSaveAll = async () => {

        await save();
        if (testCaseDraft?.length) {
            for (const tc of testCaseDraft) {
                if (isTestCaseDirty(tc.id)) await saveTestCase(tc.id);
            }
        }
    };

    return (
        <Panel className="h-full bg-white">
            <PanelHeader
                topLeft={<h2 className="text-lg font-semibold">Edit Challenge</h2>}
                topRight={
                    <>
                        <Button variant="outline" onClick={handleCancelAll} disabled={isSaving}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveAll}
                            disabled={!isDirty && !hasDirtyTestCases || isSaving}
                        >
                            Save
                        </Button>
                    </>
                }
                tabs={<MenuTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />}
            />

            <PanelContent>
                {activeTab === "overview" && <OverviewTab draft={draft} updateField={updateField} />}
                {activeTab === "starter" && <StarterCodeTab draft={draft} updateField={updateField} />}
                {activeTab === "testcases" && testCaseDraft && (
                    <TestCasesTab
                        challengeId={numericChallengeId!}
                        draft={testCaseDraft}
                        updateField={updateTestCase}
                        addDraft={addDraft}
                    />
                )}
            </PanelContent>
        </Panel>
    );
}