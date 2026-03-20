import { Card, CardHeader, CardMeta } from "@/shared/components/design/Card";
import { Badge } from "@/shared/components/ui/badge";
import { Check, Clock, AlertTriangle } from "lucide-react";
import type { Submission } from "@/shared/types/types";

interface SubmissionCardProps {
  submission: Submission;
}

export const SubmissionCard = ({ submission }: SubmissionCardProps) => {
  const { studentName, submittedAt, status, score } = submission;

  const formattedDate = new Date(submittedAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const initials = studentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const getStatus = () => {
    switch (status) {
      case "graded":
        return {
          label: "Graded",
          variant: "status-published",
          icon: Check,
        };
      case "pending":
        return {
          label: "Pending",
          variant: "secondary",
          icon: Clock,
        };
      case "late":
        return {
          label: "Late",
          variant: "destructive",
          icon: AlertTriangle,
        };
      default:
        return {
          label: "Unknown",
          variant: "outline",
          icon: AlertTriangle,
        };
    }
  };

  const config = getStatus();

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--spacing-md)]">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--surface-muted))] flex items-center justify-center font-medium">
            {initials}
          </div>

          <div>
            <p className="typo-body font-medium">{studentName}</p>
            <p className="typo-caption">
              Submitted {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Badge variant={config.variant as any}>
            <config.icon className="h-3.5 w-3.5" />
            {config.label}
          </Badge>

          {status === "graded" && score != null && (
            <span className="typo-body-sm text-[hsl(var(--primary))] font-medium">
              {score}%
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};