import { useEffect, useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Panel, PanelContent } from "@/shared/components/design/Panel"
import { PanelHeader } from "@/shared/components/design/PanelHeader"
import MenuTabs, { type TabItem } from "@/shared/components/menu_tabs/MenuTabs"
import { WrapIcon } from "@/shared/components/ui/wrapIcon"
import { ChevronRight, ChevronLeft, Play } from "lucide-react"
import TestResults from "./TestResults"
import CustomRunner from "./CustomRunner"
import { useWorkspaceStore } from "../stores/useWorkspaceStore"
import { useRunTestCode, useRunCode, useJobStatus } from "../hooks/useCodeRunnerQuery"
import type { AssignmentChallenge } from "@/features/assignment/apis/assignment.api"
import { LoadingButton } from "@/shared/components/ui/loadingButton"

type Tab = "tests" | "custom"
export type RunState = "loading" | "idle";

export default function ResultPanel({ currentChallenge }: { currentChallenge: AssignmentChallenge }) {
    const [activeTab, setActiveTab] = useState<Tab>("tests")
    const [collapsed, setCollapsed] = useState(false)
    const [jobId, setJobId] = useState<string | null>(null)
    const [results, setResults] = useState<any[]>([])

    const code = useWorkspaceStore((s) => s.codes[currentChallenge.id] ?? "")

    const runTestCodeMutation = useRunTestCode()
    const runCodeMutation = useRunCode()
    const jobQuery = useJobStatus(jobId)
    const [runState, setRunState] = useState<RunState>("idle");

    const handleRun = async () => {
        let challengeId = currentChallenge.originalChallenge_id;
        let language = currentChallenge.language;

        
        if (activeTab === "tests") {
            const res = await runTestCodeMutation.mutateAsync({
                challengeId,
                language,
                code,
            })
            setJobId(res.jobId)
        } else if (activeTab === "custom") {
            const res = await runCodeMutation.mutateAsync({
                language,
                code,
            })
            setJobId(res.jobId)
        }

        setRunState("loading");
    }
    
    useEffect(() => {
        if (jobQuery.data?.state === "completed" && jobQuery.data.result?.results) {
            const newResults = jobQuery.data.result.results.map((tc: any, index: number) => ({
                input: tc.input ?? `Test case ${index + 1}`,
                expected: tc.expectedOutput,
                output: tc.actualOutput,
                passed: tc.passed,
                isHidden: tc.isHidden,
            }));

            setResults(newResults);
        }

        if (jobQuery.data?.state === "completed") setRunState("idle")
    }, [jobQuery.data]);
    
    const isRunning = runState === "loading"
    const isError = jobQuery.data?.state === "failed";

    const tabs: TabItem<Tab>[] = [
        { key: "tests", label: "Tests Result" },
        { key: "custom", label: "Custom" }
    ]


    return (
        <Panel className="transition-all duration-300">
            <PanelHeader
                topLeft={
                    <div className="flex items-center gap-2">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <WrapIcon icon={collapsed ? ChevronLeft : ChevronRight} />
                        </Button>
                        <span className="text-sm font-medium">Results</span>
                    </div>
                }
                topRight={
                    <LoadingButton
                        size="sm"
                        spinnerSize={"sm"}
                        variant="outline"
                        isLoading={isRunning}
                        loadingText="Running…"
                        onClick={handleRun}
                        className="text-[hsl(var(--primary))] flex items-center gap-2"
                    >
                        <WrapIcon icon={Play} /> Run
                    </LoadingButton>
                }
                tabs={
                    <MenuTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                }
            />
            <PanelContent>
                {activeTab === "tests" && <TestResults results={results} isError={isError} isRunning={isRunning} />}
                {/* {activeTab === "custom" && <CustomRunner jobId={jobId} />} */}
            </PanelContent>
        </Panel>
    )
}