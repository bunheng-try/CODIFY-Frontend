import { httpClient } from "@/app/services/httpClient";

export interface Classroom {
    id: number;
    name: string;
    classCode: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export const classroomApi = {
    getAll: () => httpClient.get<Classroom[]>("/classrooms"),
    getById: (id: number) => httpClient.get<Classroom>(`/classrooms/${id}`),
    create: (data: { name: string; description?: string }) =>
        httpClient.post<Classroom, { name: string; description?: string }>("/classrooms", data),
    update: (id: number, data: { name?: string; description?: string }) =>
        httpClient.patch<Classroom, { name?: string; description?: string }>(`/classrooms/${id}`, data),
    delete: (id: number) => httpClient.delete<void>(`/classrooms/${id}`),
};
