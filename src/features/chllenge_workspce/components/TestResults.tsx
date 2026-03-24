import TestCase from "./TestCases"

interface ResultType {
    input: string
    expected: string
    output?: string
    passed: boolean
    isHidden?: boolean
}

interface TestResultsProps {
    results: ResultType[]
}

export default function TestResults({ results }: TestResultsProps) {
    if (results.length === 0) {
        return <div className="text-sm text-gray-500">No test results yet.</div>
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