import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useAssignmentActions } from "../hooks/useAssignmentActions";

export default function TopBar({ title }: { title?: string }) {
    const { assignmentId, classroomId } = useParams();
    const navigate = useNavigate();
    const { saveDraft, submitAssignment, isDraftDirty, isSaving, isBusy, isSubmitting } = useAssignmentActions();

    const handleBack = () => {
        navigate(`/classrooms/${classroomId}/assignments/${assignmentId}`);
    };

    return (
        <div className="flex items-center justify-between px-(--spacing-lg) py-(--spacing-md) border-b border-[hsl(var(--border-strong))] bg-[hsl(var(--workspace))]">
            <div className="flex items-center gap-(--spacing-md)">
                <Button onClick={handleBack} variant="ghost" size={"icon"}>
                    <WrapIcon icon={ArrowLeft} />
                </Button>
                <span className="text-sm font-medium">{title ?? "Untitled Assignment"}</span>
            </div>

            <div className="flex items-center gap-(--spacing-sm)">
                <Button
                    onClick={saveDraft}
                    variant="secondary"
                    disabled={!isDraftDirty || isBusy}
                >
                    {isSaving ? "Saving..." : "Save Draft"}
                </Button>

                <Button
                    onClick={submitAssignment}
                    disabled={isBusy}
                    className="bg-[hsl(var(--primary))]"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </div>
    );
}