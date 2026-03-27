import React from "react";

interface SpinnerProps {
    size?: "sm" | "md" | "lg" | number; // string variant or custom number
    className?: string;
    color?: "primary" | "white" | "gray";
}

const spinnerSizes: Record<string, number> = {
    sm: 16,
    md: 24,
    lg: 32,
};

export default function Spinner({ size = "md", className = "", color = "primary" }: SpinnerProps) {
    const pixelSize = typeof size === "number" ? size : spinnerSizes[size] || spinnerSizes.md;

    const colorClass = {
        primary: "border-blue-500 border-t-transparent",
        white: "border-white border-t-transparent",
        gray: "border-gray-500 border-t-transparent",
    }[color];

    return (
        <div
            className={`relative rounded-full animate-spin ${className}`}
            style={{ width: pixelSize, height: pixelSize }}
        >
            <div
                className={`absolute inset-0 rounded-full border-[3px] ${colorClass}`}
                style={{ borderStyle: "solid", boxSizing: "border-box" }}
            />
        </div>
    );
}