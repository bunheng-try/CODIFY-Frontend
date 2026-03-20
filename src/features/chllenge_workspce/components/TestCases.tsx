import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { WrapIcon } from "@/shared/components/ui/wrapIcon"
import ValueCard from "./ValueCard"

interface TestCaseProps {
    input: string
    expected: string
    output?: string
    passed: boolean
    isHidden?: boolean 
}

export default function TestCase({
    input,
    expected,
    output,
    passed,
    isHidden = false,
}: TestCaseProps) {
    const [collapsed, setCollapsed] = useState(false)

    const Chip = ({ label }: { label: string }) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-gray-500">
            {label}
        </span>
    )

    return (
        <div
            className={`border rounded-md transition-all duration-200 ${passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
        >
            <div
                className="flex justify-between items-center px-3 py-2 cursor-pointer select-none text-sm"
                onClick={() => setCollapsed(!collapsed)}
            >
                <div className="flex items-center gap-2">
                    <WrapIcon icon={collapsed ? ChevronRight : ChevronDown} size={"sm"} />
                    <span className="font-medium text-sm">{passed ? "Passed" : "Failed"}</span>
                </div>

                {isHidden ? <Chip label="Hidden" /> : <Chip label="Sample" />}
            </div>

            {!collapsed && !isHidden && (
                <div className="p-3 flex flex-col gap-3">
                    <ValueCard label="Input" value={input} />
                    <ValueCard label="Expected" value={expected} />
                    {(!passed || output) && <ValueCard label="Output" value={output} />}
                </div>
            )}

            {isHidden && collapsed && (
                <div className="px-3 py-2 text-sm font-medium text-gray-700">
                    {passed ? "Passed" : "Failed"} (Hidden Test)
                </div>
            )}
        </div>
    )
}
