    import React from "react"

interface ValueCardProps {
    label: string
    value?: string
    className?: string
}

export default function ValueCard({ label, value = "-", className }: ValueCardProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="font-semibold mb-1 text-sm">{label}</div>
            <div className="flex-1 bg-white border rounded-md p-2 font-mono text-sm break-words">
                {value}
            </div>
        </div>
    )
}
