import { useState } from "react";
import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import MainPanel from "@/shared/components/layout/mainPanel/MainPanel";
import { BasePanelHeader } from "@/shared/components/layout/mainPanel/BasePanelHeader";
import OverviewTab from "../components/OverviewTab";
import StarterCodeTab from "../components/StarterCodeTab";
import TestCaseTab from "../components/TestCaseTab";
import { useChallengeEditorPanel } from "../hooks/useChallengeEditorPanel";
import { getEditorTabs, type EditorTab } from "../components/tabs";
import { Button } from "@/shared/components/ui/button";

interface Props {
    mode: "create" | "edit";
    challengeId?: number;
    onClose: () => void;
}

export default function ChallengeEditorPanel({ mode: initialMode, challengeId: initialChallengeId, onClose }: Props) {
    const {
        mode,
        challengeId,
        draft,
        updateField,
        remove,
        isLoading,
        isSaving,
        isDeleting,
        handleSave,
        handleCancel,
    } = useChallengeEditorPanel(initialMode, initialChallengeId);

    const [activeTab, setActiveTab] = useState<EditorTab>("overview");
    const tabs = getEditorTabs(Boolean(challengeId));

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <MainPanel
            header={
                <>
                    <BasePanelHeader
                        left={<h2 className="text-lg font-semibold">{mode === "create" ? "Create Challenge" : "Edit Challenge"}</h2>}
                        right={
                            <>
                                <Button size="default" variant="outline" onClick={() => handleCancel(onClose)}>Cancel</ Button>
                                {mode === "edit" && <Button size="default" variant="destructive" onClick={remove}>Delete</ Button> }
                                <Button size="default" variant="default" onClick={() => handleSave(onClose)}>{mode === "create" ? "Create" : "Save"}</ Button>

                                {/* <button onClick={() => handleCancel(onClose)} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
                                {mode === "edit" && <button onClick={remove} disabled={isDeleting} className="px-4 py-2 border text-red-600 rounded-md text-sm">Delete</button>}
                                <button onClick={() => handleSave(onClose)} disabled={isSaving} className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm">{mode === "create" ? "Create" : "Save"}</button> */}
                            </>
                        }
                    />
                    <div className="px-6">
                        <MenuTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                    </div>
                </>
            }
        >
            <div className="p-6">
                {activeTab === "overview" && <OverviewTab draft={draft} updateField={updateField} />}
                {activeTab === "starter" && <StarterCodeTab draft={draft} updateField={updateField} />}
                {activeTab === "testcases" && challengeId && <TestCaseTab challengeId={challengeId} />}
            </div>
        </MainPanel>
    );
}