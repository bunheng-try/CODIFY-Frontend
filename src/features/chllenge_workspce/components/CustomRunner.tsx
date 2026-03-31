import Loading from "@/shared/components/loading/Loading"
import { StatusPanel } from "@/shared/components/empty_state/StatusPanel"

interface CustomCodeResult {
    stdout?: string
    stderr?: string
    status?: string
}

interface CustomRunnerProps {
    result: CustomCodeResult | null
    isRunning: boolean
    isError: boolean
}

export default function CustomRunner({ result, isRunning, isError }: CustomRunnerProps) {

    const displayOutput = result?.stdout || ""

    if (isError) {
            return (
                <StatusPanel
                    type="error"
                    title="Run failed"
                    description="Something went wrong while running the code. Please check your code and try again."
                />
            );
        }
    
        if (!result) {
            return (
                <StatusPanel
                    type="info"
                    title="No Result Yet"
                    description="Run to see results here."
                />
            );
    }
    
    return (
        <div className="space-y-3">
            {isRunning && <Loading size={30} message="Running your code..." className="w-full" />}

            {!isRunning && !isError && (
                <div className="bg-black text-white p-3 rounded-md min-h-[80px] font-mono text-sm whitespace-pre-wrap">
                    {displayOutput || "Output will appear here"}
                </div>
            )}
        </div>
    )
}