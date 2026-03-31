import { Card, CardContent, CardHeader, CardMeta, CardStatItem } from "@/shared/components/design/Card";
import { Calendar, MoreVertical, User } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

import { useAssignmentCard } from "../hooks/useAssignmentCard";
import type { Assignment } from "@/features/assignment/apis/assignment.api";
import { Button } from "@/shared/components/ui/button";
import { useSubmissions } from "../hooks/useSubmissionQuery";

interface Props {
    assignment: Assignment;
    onClick: (assignment: Assignment) => void;
    isSelect?: boolean;
    totalStudent: number;
    showActions?: boolean;
    totalSubmitted?: number;
    isStudent?: boolean;
    classroomId: number
    onContextMenu?: (e: React.MouseEvent, assignment: Assignment) => void;
}

export const AssignmentCard = ({
    assignment,
    onClick,
    onContextMenu,
    isSelect = false,
    totalStudent,
    isStudent,
    showActions = false,
    // totalSubmitted
    classroomId
}: Props) => {
    const { data: submissionsForAssignment = [] } = useSubmissions(classroomId, assignment.id);
    const totalSubmitted = submissionsForAssignment.length;

    const { status, submissions, dueDate } = useAssignmentCard({
        assignment,
        totalStudent,
        totalSubmitted
    });

    let badgeText: string;
    let badgeVariant: "status-published" | "status-draft" | "status-submitted" | "status-lated";

    if (isStudent) {
        // Student view
        switch (assignment.submissionStatus) {
            case "SUBMITTED":
                badgeText = "SUBMITTED";
                badgeVariant = "status-submitted";
                break;
            case "LATED":
                badgeText = "LATED";
                badgeVariant = "status-lated";
                break;
            case "NOT SUBMITTED":
            default:
                badgeText = "NOT SUBMITTED";
                badgeVariant = "status-draft";
                break;
        }
    } else {
        badgeText = assignment.isPublished ? "Published" : "Draft";
        badgeVariant = assignment.isPublished ? "status-published" : "status-draft";
    }

    return (
        <Card isSelected={isSelect} onClick={() => onClick(assignment)} onContextMenu={(e) => onContextMenu?.(e, assignment)}>
            <CardContent>
                <CardHeader
                    title={assignment.title}
                    badge={
                        <Badge variant={badgeVariant}>{badgeText}</Badge>
                    }
                    actions={
                        showActions ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MoreVertical />
                            </Button>
                        ) : undefined
                    }
                />
                
                <CardMeta>
                    <CardStatItem icon={Calendar} label={`Due ${dueDate}`} />
                    <CardStatItem icon={User} label={submissions} />
                </CardMeta>
            </CardContent>
        </Card>
    );
};