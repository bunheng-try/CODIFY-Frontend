import * as React from "react";

interface FieldErrorProps {
    message?: string;
    className?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ message, className }) => {
    if (!message) return null;
    return <p className={`text-xs text-red-500 mt-1 ${className || ""}`}>{message}</p>;
};