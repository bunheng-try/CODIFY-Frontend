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
import type { CustomCodeResult, TestCaseResult } from "../apis/code-runner.api"

type Tab = "tests" | "custom"
export type RunState = "loading" | "idle";

export default function ResultPanel({ currentChallenge }: { currentChallenge: AssignmentChallenge }) {
    const [activeTab, setActiveTab] = useState<Tab>("tests")
    const [collapsed, setCollapsed] = useState(false)
    const [jobId, setJobId] = useState<string | null>(null)
    const [runState, setRunState] = useState<RunState>("idle")
    const [jobType, setJobType] = useState<Tab | null>(null)

    const [testResults, setTestResults] = useState<TestCaseResult[]>([])
    const [customResult, setCustomResult] = useState<CustomCodeResult | null>(null)

    const code = useWorkspaceStore((s) => s.codes[currentChallenge.id] ?? "")

    const runTestCodeMutation = useRunTestCode()
    const runCodeMutation = useRunCode()
    const jobQuery = useJobStatus(jobId)

    const handleRun = async () => {
        const challengeId = currentChallenge.originalChallenge_id
        const language = currentChallenge.language

        if (activeTab === "tests") {
            const res = await runTestCodeMutation.mutateAsync({ challengeId, language, code })
            setJobId(res.jobId)
            setJobType("tests")
            setTestResults([])
        } else if (activeTab === "custom") {
            const res = await runCodeMutation.mutateAsync({ language, code })
            setJobId(res.jobId)
            setJobType("custom")
            setCustomResult(null)
        }

        setRunState("loading")
    }

    useEffect(() => {
        if (!jobQuery.data || !jobType) return

        if (jobQuery.data.state === "completed") {
            if (jobType === "tests" && 'results' in jobQuery.data.result!) {
                setTestResults(jobQuery.data.result.results)
            } else if (jobType === "custom" && !('results' in jobQuery.data.result!)) {
                setCustomResult({
                    stdout: jobQuery.data.result?.stdout ?? "",
                    status: jobQuery.data.result?.status ?? "unknown"
                })
            }

            setRunState("idle")
        }

        if (jobQuery.data.state === "failed") {
            setRunState("idle")
            if (jobType === "custom") {
                setCustomResult({
                    stdout: "",
                    status: "failed"
                })
            }
        }
    }, [jobQuery.data, jobType])

    const isRunning = runState === "loading"
    const isError = jobQuery.data?.state === "failed"

    const tabs: TabItem<Tab>[] = [
        { key: "tests", label: "Tests Result" },
        { key: "custom", label: "Custom" }
    ]

    return (
        <Panel className="transition-all duration-300">
            <PanelHeader
                topLeft={
                    <div className="flex items-center gap-2">
                        <Button size="icon-sm" variant="ghost" onClick={() => setCollapsed(!collapsed)}>
                            <WrapIcon icon={collapsed ? ChevronLeft : ChevronRight} />
                        </Button>
                        <span className="text-sm font-medium">Results</span>
                    </div>
                }
                topRight={
                    <LoadingButton
                        size="sm"
                        spinnerSize="sm"
                        variant="outline"
                        isLoading={isRunning}
                        loadingText="Running…"
                        onClick={handleRun}
                        className="text-[hsl(var(--primary))] flex items-center gap-2"
                    >
                        <WrapIcon icon={Play} /> Run
                    </LoadingButton>
                }
                tabs={<MenuTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />}
            />
            <PanelContent>
                {activeTab === "tests" && (
                    <TestResults results={testResults} isError={isError} isRunning={isRunning} />
                )}
                {activeTab === "custom" && <CustomRunner result={customResult} isRunning={isRunning} isError={isError} />}
            </PanelContent>
        </Panel>
    )
}