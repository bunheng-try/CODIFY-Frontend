// features/common/pages/NotFoundPage.tsx
import { EmptyState } from "@/shared/components/empty_state/EmptyState";
import { FileX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <EmptyState
            className="h-screen w-screen"
            variant="hero"
            icon={<FileX className="w-12 h-12 text-[hsl(var(--primary))]" />}
            title="Page Not Found"
            description="Sorry, the page you’re looking for does not exist."
            actionLabel="Go Home"
            onAction={() => navigate("/")}
        />
    );
};