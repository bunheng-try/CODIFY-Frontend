import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import { Badge } from "@/shared/components/ui/badge";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { CheckCircle2, Clock, MessageSquare, Trophy } from "lucide-react";
import type { Submission } from "../apis/submission.api";

interface StudentResultPanelProps {
  submission: Submission;
}

export default function StudentResultPanel({ submission }: StudentResultPanelProps) {
  const isGraded = submission.status === "GRADED" || submission.status === "EVALUATED";
  const isSubmitted = submission.status === "SUBMITTED";

  const formattedDate = submission.submittedAt
    ? new Date(submission.submittedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "—";

  return (
    <Panel>
      <PanelHeader
        topLeft={<span className="typo-body font-semibold">My Submission</span>}
      />

      <PanelContent className="flex flex-col gap-4">
        {/* Submission status */}
        <div className="rounded-md bg-[hsl(var(--surface-muted))] p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WrapIcon
                icon={isGraded ? Trophy : Clock}
                size="sm"
                className={
                  isGraded
                    ? "text-[hsl(var(--primary))]"
                    : "text-[hsl(var(--muted-foreground))]"
                }
              />
              <span className="typo-body font-medium">
                {isGraded ? "Result" : "Status"}
              </span>
            </div>

            <Badge
              variant={
                isGraded
                  ? "status-published"
                  : isSubmitted
                  ? "status-draft"
                  : "secondary"
              }
            >
              {isGraded ? (
                <>
                  <CheckCircle2 className="h-3 w-3" />
                  Graded
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3" />
                  {isSubmitted ? "Submitted" : submission.status}
                </>
              )}
            </Badge>
          </div>

          <p className="typo-caption text-[hsl(var(--muted-foreground))]">
            Turned in: {formattedDate}
          </p>
        </div>

        {/* Score*/}
        {isGraded && submission.totalScore != null && (
          <div className="rounded-md border border-[hsl(var(--border))] p-4 flex flex-col items-center gap-1 bg-[hsl(var(--surface))]">
            <span className="typo-caption text-[hsl(var(--muted-foreground))]">
              Your Score
            </span>
            <span className="text-4xl font-bold text-[hsl(var(--primary))]">
              {submission.totalScore}
            </span>
            <span className="typo-caption text-[hsl(var(--muted-foreground))]">
              / 100
            </span>
          </div>
        )}

        {/* Pending grading message */}
        {isSubmitted && (
          <div className="rounded-md border border-[hsl(var(--border))] p-4 text-center bg-[hsl(var(--surface))]">
            <p className="typo-body text-[hsl(var(--muted-foreground))]">
              Waiting for teacher to grade your submission.
            </p>
          </div>
        )}

        {/* Feedback only show when graded */}
        {isGraded && (
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2">
              <WrapIcon
                icon={MessageSquare}
                size="sm"
                className="text-[hsl(var(--muted-foreground))]"
              />
              <span className="typo-label font-medium text-[hsl(var(--foreground))]">
                Teacher's Feedback
              </span>
            </div>

            <div className="rounded-md bg-[hsl(var(--surface-muted))] p-3 min-h-[120px] flex-1">
              <p className="typo-body text-[hsl(var(--foreground))] whitespace-pre-wrap">
                {submission.feedback?.trim()
                  ? submission.feedback
                  : "No feedback provided."}
              </p>
            </div>
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}