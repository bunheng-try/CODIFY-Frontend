import { httpClient } from "@/app/services/httpClient";

export type Member = {
    userId: number;
    role: "STUDENT" | "ADMIN";
    name: string;
};

export type MemberRoleDto = {
    role: "STUDENT" | "ADMIN";
};

export type AddMemberDto = {
    userId: number;
    role: "STUDENT" | "ADMIN";
};

export const memberApi = {
    addMember: (classroomId: number, dto: AddMemberDto) =>
        httpClient.post<void, AddMemberDto>(`/classrooms/${classroomId}/members`, dto),

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
};