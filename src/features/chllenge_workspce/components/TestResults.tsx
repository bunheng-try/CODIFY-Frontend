import TestCase from "./TestCases"
import Loading from "@/shared/components/loading/Loading"
import { StatusPanel } from "@/shared/components/empty_state/StatusPanel"
import type { TestCaseResult } from "../apis/code-runner.api"

interface ResultType {
    input: string
    expected: string
    output?: string
    passed: boolean
    isHidden?: boolean
}

interface TestResultsProps {
    results: TestCaseResult[],
    isError: boolean,
    isRunning: boolean,
}

export default function TestResults({ results, isError, isRunning }: TestResultsProps) {
    if (isRunning) {
        return <Loading message="Running tests..." />;
    }

    if (isError) {
        return (
            <StatusPanel
                type="error"
                title="Test run failed"
                description="Something went wrong while running the tests. Please check your code and try again."
            />
        );
    }

    if (results.length === 0) {
        return (
            <StatusPanel
                type="info"
                title="No test results yet"
                description="Run your tests to see results here."
            />
        );
    }

    return (
        <div className="space-y-2">
            {results.map((t, index) => (
                <TestCase
                    key={index}
                    input={t.input}
                    expected={t.expected}
                    output={t.output}
                    passed={t.passed}
                    isHidden={t.isHidden}
                />
            ))}
        </div>
    )
}