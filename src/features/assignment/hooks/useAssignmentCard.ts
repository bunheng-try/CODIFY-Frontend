import type { Assignment } from "@/features/assignment/apis/assignment.api";

interface UseAssignmentCardProps {
  assignment: Assignment;
  totalStudent: number;
  totalSubmitted: number
}

export const useAssignmentCard = ({
  assignment,
  totalStudent,
  totalSubmitted
}: UseAssignmentCardProps) => {

  const status = assignment.isPublished ? "Published" : "Draft";

  const submissions = assignment.isPublished
    ? `Submitted: ${totalSubmitted || 0}/${totalStudent}`
    : "Inactive";

  const formatDueDate = () => {
    if (!assignment.dueAt) return "No date";

    return new Date(assignment.dueAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return {
    status,
    submissions,
    dueDate: formatDueDate(),
  };
};