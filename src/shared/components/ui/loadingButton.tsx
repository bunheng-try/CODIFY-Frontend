import React from "react";
import { Button, type ButtonProps } from "./button";
import Spinner from "../loading/Spinner";

interface LoadingButtonProps extends ButtonProps {
    isLoading?: boolean;
    loadingText?: string;
    spinnerSize?: number | "sm" | "md" | "lg";
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
    isLoading = false,
    loadingText,
    spinnerSize = "md",
    children,
    disabled,
    ...props
}) => {
    const spinnerPixelSize =
        typeof spinnerSize === "number"
            ? spinnerSize
            : spinnerSize === "sm"
                ? 16
                : spinnerSize === "md"
                    ? 24
                    : 32;

    return (
        <Button {...props} disabled={isLoading || disabled} className="flex items-center justify-center gap-2">
            {isLoading && <Spinner size={spinnerPixelSize} />}
            {isLoading ? loadingText || children : children}
        </Button>
    );
};