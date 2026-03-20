import { CLASSROOM_ROLE, STUDENT_ASSIGNMENT_TAB, TEACHER_ASSIGNMENT_TAB } from "@/shared/constansts/classroom";
import type { Assignment } from "../apis/assignment.api";
import type { Classroom } from "@/features/classes/apis/classroom.api";

interface useFilteredAssignmentsProp {
    assignments: Assignment[],
    classroom: Classroom,
    activeTab: string
}
export function useFilteredAssignments({assignments, classroom, activeTab} : useFilteredAssignmentsProp) {
    return assignments.filter((a) => {
        if (!classroom) return true;

        if (classroom.role === CLASSROOM_ROLE.STUDENT) {
            const isPast = new Date(a.dueAt) < new Date();

            if (activeTab === STUDENT_ASSIGNMENT_TAB.UPCOMING) return !isPast;
            if (activeTab === STUDENT_ASSIGNMENT_TAB.PAST_DUE) return isPast;
            return true;
        }

        if (activeTab === TEACHER_ASSIGNMENT_TAB.ACTIVE) return a.isPublished;
        if (activeTab === TEACHER_ASSIGNMENT_TAB.DRAFT) return !a.isPublished;

        return true;
    });
}