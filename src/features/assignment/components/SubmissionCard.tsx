import { Card, CardHeader, CardMeta } from "@/shared/components/design/Card";
import { Badge } from "@/shared/components/ui/badge";
import { Check, Clock, AlertTriangle } from "lucide-react";
import type {  } from "@/shared/types/types";
import { getInitials } from "@/shared/utils/strings";
import type { SubmissionWithStudentName } from "../apis/submission.api";

interface SubmissionCardProps {
  submission: SubmissionWithStudentName;
}

export const SubmissionCard = ({ submission }: SubmissionCardProps) => {
  const { name, submittedAt, status, totalScore, createdAt } = submission;

  const formattedDate = new Date(submittedAt ?? createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const initials = getInitials(name)

  const getStatus = () => {
    switch (status) {
      case "SUBMITTED":
        return {
          label: "Graded",
          variant: "status-published",
          icon: Check,
        };
      case "DRAFT":
        return {
          label: "Pending",
          variant: "secondary",
          icon: Clock,
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
    <Card >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--spacing-md)]">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--surface-muted))] flex items-center justify-center font-medium">
            {initials}
          </div>

          <div>
            <p className="typo-body font-medium">{name}</p>
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

          {status === "SUBMITTED" && totalScore != null && (
            <span className="typo-body-sm text-[hsl(var(--primary))] font-medium">
              {totalScore}%
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};