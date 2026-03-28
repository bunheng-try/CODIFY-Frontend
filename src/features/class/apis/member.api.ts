import { httpClient } from "@/app/services/httpClient";

export type Member = {
    userId: number;
    role: "STUDENT" | "OWNER" | "TEACHER";
    name: string;
    email: string;
};

export type MemberRoleDto = {
    role: "STUDENT" | "OWNER" | "TEACHER";
};

export type AddMemberDto = {
    userId: number;
    role: "STUDENT" | "OWNER" | "TEACHER";
};

export type AddMembersRequest = {
    members: AddMemberDto[];
};

export type UserFromApi = {
    id: number;
    name: string;
    email: string;
    profile?: any;
};

export const memberApi = {
    getUserByEmail: (email: string) =>
        httpClient.get<UserFromApi[]>(`/users/${encodeURIComponent(email)}`),

    addMember: (classroomId: number, dto: AddMembersRequest) =>
        httpClient.post<void, AddMembersRequest>(`/classrooms/${classroomId}/members`, dto),

    getMembers: (classroomId: number) =>
        httpClient.get<Member[]>(`/classrooms/${classroomId}/members`),

    removeMember: (classroomId: number, userId: number) =>
        httpClient.delete<void>(`/classrooms/${classroomId}/members/${userId}`),

    changeRole: (classroomId: number, userId: number, dto: MemberRoleDto) =>
        httpClient.patch<Member, MemberRoleDto>(
            `/classrooms/${classroomId}/members/${userId}/role`,
            dto
        ),

    getMemberById: (classroomId: number, memberId: number) =>
        httpClient.get<Member>(
            `/classrooms/${classroomId}/members/${memberId}`
        ),

    leaveClassroom: (classroomId: number) =>
        httpClient.post<void, any>(`/classrooms/${classroomId}/leave`, {}),
};