import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import AssignmentEditor from "./AssignmentEditorPage";
import StudentAssignmentPage from "./StudentAssignmentPage";
import { useClassroomRole } from "@/features/classes/hooks/useClassroomRole";

export const AssignmentPage = () => {
    const { classroomId } = useClassroomRoute();
    const { data: roleData, isLoading } = useClassroomRole(classroomId);

    if (isLoading) return <div>Loading...</div>;

    if (roleData?.role === "STUDENT") {
        return <StudentAssignmentPage />;
    }

    return <AssignmentEditor />;
};