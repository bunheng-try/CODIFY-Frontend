export const CLASSROOM_ROLE = {
    STUDENT: "STUDENT",
    ADMIN: "ADMIN",
    OWNER: "OWNER",
} as const;

export type ClassroomRole =
    (typeof CLASSROOM_ROLE)[keyof typeof CLASSROOM_ROLE];

export const STUDENT_ASSIGNMENT_TAB = {
    UPCOMING: "Upcoming",
    PAST_DUE: "Past Due",
    COMPLETED: "Completed",
} as const;

export const TEACHER_ASSIGNMENT_TAB = {
    ALL: "All",
    ACTIVE: "Active",
    DRAFT: "Draft",
} as const;

export type StudentAssignmentTab =
    (typeof STUDENT_ASSIGNMENT_TAB)[keyof typeof STUDENT_ASSIGNMENT_TAB];

export type TeacherAssignmentTab =
    (typeof TEACHER_ASSIGNMENT_TAB)[keyof typeof TEACHER_ASSIGNMENT_TAB];