import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@/shared/components/ui/loadingButton";
import { useGradingStore } from "../stores/gradingScore";
import { useFeedbackMutation } from "../hooks/useFeedback";
import { useState } from "react";

interface TeacherSubmissionTopBarProps {
  assignmentTitle?: string;
  studentName?: string;
  classroomId: number;
  assignmentId: number;
  submissionId: number;
  submissionStatus: String;
}

export default function TeacherSubmissionTopBar({
  assignmentTitle,
  studentName,
  classroomId,
  assignmentId,
  submissionId,
  submissionStatus
}: TeacherSubmissionTopBarProps) {
  const navigate = useNavigate();
  const { score, feedback } = useGradingStore();
  const [localStatus, setLocalStatus] = useState(submissionStatus);
  

  const { mutate: applyFeedback, isPending } = useFeedbackMutation();

  const handleBack = () => {
    navigate(`/classrooms/${classroomId}/assignments/${assignmentId}`);
  };

  const handleApplyGrade = async () => {
    applyFeedback({
      classroomId,
      assignmentId,
      submissionId,
      dto: {
        text: feedback ?? "",
        score: parseInt(score),
      },
    });
    setLocalStatus("GRADED");
    
  };

  return (
    <div className="flex items-center justify-between px-(--spacing-lg) py-(--spacing-md) border-b border-[hsl(var(--border-strong))] bg-[hsl(var(--workspace))]">
      <div className="flex items-center gap-(--spacing-md)">
        <Button onClick={handleBack} variant="ghost" size="icon">
          <WrapIcon icon={ArrowLeft} />
        </Button>

        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium leading-tight">
            {assignmentTitle ?? "Untitled Assignment"}
          </p>

          <p className="typo-caption text-[hsl(var(--muted-foreground))] leading-tight">
            Reviewing: {studentName ?? "Unknown Student"}
          </p>
        </div>
      </div>

      <LoadingButton
        isLoading={isPending}
        loadingText="Applying..."
        spinnerSize="sm"
        onClick={handleApplyGrade}
        className="bg-[hsl(var(--primary))]"
        disabled={localStatus === "GRADED"}
      >
        {localStatus=="GRADED"?"GRADED":"Apply Grade"}
      </LoadingButton>
    </div>
  );
}