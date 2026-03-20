import TestCase from "./TestCases"

const testCases = [
    { id: 1, input: "[1,2,4], [1,3,4]", expected: "[1,1,2,3,4,4]", output: "[1,1,2,3,4,4]", passed: true },
    { id: 2, input: " 1, 2", expected: "[1,2]", output: "[1,2]", passed: true },
    { id: 3, input: "Hidden", expected: "Hidden", passed: false, isHidden: true }
]

export default function TestResults() {
    return (
        <div className="space-y-2">
            {testCases.map((t) => (
                <TestCase
                    key={t.id}
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
