import { BookOpen } from "lucide-react";
import { useParams } from "react-router-dom";
import { useClassroomRole } from "../hooks/useClassroomRole";
import { EmptyState } from "@/shared/components/empty_state/EmptyState";

export const ClassroomHome = () => {
  const { classId } = useParams();
  const { data: roleData } = useClassroomRole(Number(classId));
  const isAdmin = roleData?.role === "OWNER" || "TEACHER";

  return (
    <EmptyState
      icon={<BookOpen className="h-7 w-7 text-[hsl(var(--primary))]" />}
      title="Classroom Ready"
      description={
        isAdmin
          ? "Select an assignment from the left panel or create a new one to get started."
          : "Select an assignment from the left panel to get started."
      }
      actionLabel={isAdmin ? "Create Assignment" : undefined}
      onAction={isAdmin ? () => console.log("Create assignment clicked") : undefined}
    />
  );
};