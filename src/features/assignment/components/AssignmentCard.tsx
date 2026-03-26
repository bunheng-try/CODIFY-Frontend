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
    classroomId: number
}

export const AssignmentCard = ({
    assignment,
    onClick,
    isSelect = false,
    totalStudent,
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

    return (
        <Card isSelected={isSelect} onClick={() => onClick(assignment)}>
            <CardContent>
                <CardHeader
                    title={assignment.title}
                    badge={
                        <Badge variant={status === "Published" ? "status-published" : "status-draft"}>
                            {status}
                        </Badge>
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