import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useAssignmentActions } from "../hooks/useAssignmentActions";

export default function TopBar({ title }: { title?: string }) {
    const { assignmentId, classroomId } = useParams();
    const navigate = useNavigate();
    const { saveDraft, submitAssignment } = useAssignmentActions();

    const handleBack = () => {
        navigate(`/classrooms/${classroomId}/assignments/${assignmentId}`);
    };

    return (
        <div
            className="
        flex items-center justify-between
        px-[var(--spacing-lg)] py-[var(--spacing-md)]
        border-b border-[hsl(var(--border-strong))]
        bg-[hsl(var(--workspace))]
      "
        >
            <div className="flex items-center gap-[var(--spacing-md)]">
                <Button onClick={handleBack} variant="ghost" size={"icon"}>
                    <WrapIcon icon={ArrowLeft} />
                </Button>
                <span className="text-sm font-medium">{title ?? "Untitled Assignment"}</span>
            </div>

            <div className="flex items-center gap-[var(--spacing-sm)]">
                <Button
                    onClick={submitAssignment}
                    className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)]"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}