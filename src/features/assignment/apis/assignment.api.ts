import { httpClient } from "@/app/services/httpClient";
// import type { Assignment, AssignmentDto } from "@/shared/types/types";

/* =========================
   Types (based on Swagger)
   ========================= */

export interface Assignment {
    id: number;
    title: string;
    description: string;
    dueAt: string;
    published: boolean;
    sectionId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAssignmentDto {
    classroomId: number;
    title: string;
    description: string;
    dueAt: string;
    position: number;
}

export interface UpdateAssignmentDto {
    title?: string;
    description?: string;
    dueAt?: string;
}

/* =========================
   API
   ========================= */

export const assignmentsApi = {
    getByClassroomId: (classroomId: number) =>
        httpClient.get<Assignment[]>(
            `/classrooms/${classroomId}/assignments`
        ),

    getById: (classroomId: number, id: number) =>
        httpClient.get<Assignment>(
            `/classrooms/${classroomId}/assignments/${id}`
        ),

    create: (classroomId: number, dto: CreateAssignmentDto) =>
        httpClient.post<Assignment, CreateAssignmentDto>(
            `/classrooms/${classroomId}/assignments`,
            dto
        ),

    update: (classroomId: number, id: number, dto: UpdateAssignmentDto) =>
        httpClient.patch<Assignment, UpdateAssignmentDto>(
            `/classrooms/${classroomId}/assignments/${id}`,
            dto
        ),

    delete: (classroomId: number, id: number) =>
        httpClient.delete<void>(
            `/classrooms/${classroomId}/assignments/${id}`
        ),

    publish: (classroomId: number, id: number) =>
        httpClient.patch<Assignment, {}>(
            `/classrooms/${classroomId}/assignments/${id}/publish`,
            {}
        ),
};

