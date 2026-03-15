// hooks/useClassroomRole.ts
import { userApi, type ClassroomMember } from "@/features/user/apis/user.api";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEYS = {
    CLASSROOM_ROLE: (classroomId: number) => ["classroom-role", classroomId] as const,
};

export const useClassroomRole = (classroomId: number) => {
    return useQuery<ClassroomMember, Error>({
        queryKey: QUERY_KEYS.CLASSROOM_ROLE(classroomId),
        queryFn: () => userApi.getClassroomRole(classroomId),
        enabled: !!classroomId,

        
        // initialData: { userId: 1, name: "Test", role: "ADMIN" }, // test as teacher
        // initialData: { userId: 1, name: "Test", role: "STUDENT" }, // test as student
    });
};