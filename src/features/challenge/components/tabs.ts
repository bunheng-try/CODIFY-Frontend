export type EditorTab = "overview" | "starter" | "testcases";

export const getEditorTabs = (challengeCreated: boolean) => {
    const tabs: { key: EditorTab; label: string }[] = [
        { key: "overview", label: "Overview" },
        { key: "starter", label: "Starter Code" },
    ];

    if (challengeCreated) {
        tabs.push({ key: "testcases", label: "Test Cases" });
    }

    return tabs;
};