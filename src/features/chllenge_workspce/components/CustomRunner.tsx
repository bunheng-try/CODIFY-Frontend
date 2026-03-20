import { useState } from "react"
import { Button } from "@/shared/components/ui/button"

export default function CustomRunner() {
    const [customInput, setCustomInput] = useState("")
    const [output, setOutput] = useState("")

    return (
        <div className="space-y-3">
            <textarea
                className="w-full border rounded-md p-2"
                placeholder="Enter custom input"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
            />
            <div className="flex gap-2">
                <Button size="sm" onClick={() => setOutput(`Run with input:\n${customInput}`)}>
                    Run Code
                </Button>
                <Button size="sm" variant="outline" onClick={() => setOutput("")}>
                    Clear
                </Button>
            </div>
            <div className="bg-black text-white p-3 rounded-md min-h-[80px] font-mono text-sm">
                {output || "Output will appear here"}
            </div>
        </div>
    )
}
