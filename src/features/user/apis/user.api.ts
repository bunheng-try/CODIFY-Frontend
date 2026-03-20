import { httpClient } from "@/app/services/httpClient";
import { useAuthStore } from "@/app/store/autStore";

export interface ClassroomMember {
    userId: number;
    name: string;
    role: "STUDENT" | "OWNER" | "TEACHER";
}

export const userApi = {

    getClassroomRole: (classroomId: number) => {
        const currentUserId = useAuthStore.getState().user?.id;
        if (!currentUserId) throw new Error("User not logged in");
        console.log("current user id: ", currentUserId)
        return httpClient.get<ClassroomMember>(
            `/classrooms/${classroomId}/members/${currentUserId}`
        );
    },
};
