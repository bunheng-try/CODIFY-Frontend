import { Card, CardHeader, CardMeta } from "@/shared/components/design/Card";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { Calendar, MoreVertical } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

import { useAssignmentCard } from "../hooks/useAssignmentCard";
import type { Assignment } from "@/features/assignment/apis/assignment.api";
import { Button } from "@/shared/components/ui/button";

interface Props {
  assignment: Assignment;
  onClick: (assignment: Assignment) => void;
  isSelect?: boolean;
  totalStudent: number;
  showActions?: boolean;
}

export const AssignmentCard = ({
  assignment,
  onClick,
  isSelect = false,
  totalStudent,
  showActions = false,
}: Props) => {

  const { status, submissions, dueDate } = useAssignmentCard({
    assignment,
    totalStudent,
  });

  return (
    <Card
      isSelected={isSelect}
      onClick={() => onClick(assignment)}
    >
      <div className="flex-1 flex flex-col gap-1">
        <CardHeader
          title={assignment.title}
          actions={
            showActions ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("Open context menu or settings")
                }}
              >
                <MoreVertical />
              </Button>
            ) : undefined
          }
        />
        <div>
          <Badge variant={status === "Published" ? "status-published" : "status-draft"}>
            {status}
          </Badge>
        </div>

        <CardMeta>
          <span>
            Due {dueDate}
          </span>

          <span>{submissions}</span>

        </CardMeta>
      </div>
      
    </Card>
  );
};