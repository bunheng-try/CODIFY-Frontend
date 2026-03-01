// hooks/useClassrooms.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { classroomApi, type Classroom } from "../apis/classroom.api";

export const QUERY_KEYS = {
    CLASSROOMS: ["classrooms"] as const,
    CLASSROOM_DETAIL: (id: number) => ["classroom", id] as const,
};

// --- QUERIES ---

export const useClassrooms = () => {
    return useQuery<Classroom[], Error>({
        queryKey: QUERY_KEYS.CLASSROOMS,
        queryFn: classroomApi.getAll,
    });
};

export const useSelectedClassroom = (classroomId: number | null) => {
    return useQuery<Classroom, Error>({
        queryKey: classroomId
            ? QUERY_KEYS.CLASSROOM_DETAIL(classroomId)
            : ["classroom", "none"],
        queryFn: () => {
            if (!classroomId) throw new Error("No classroom selected");
            return classroomApi.getById(classroomId);
        },
        enabled: !!classroomId,
    });
};

// --- MUTATIONS ---

export const useCreateClassroom = () => {
    const queryClient = useQueryClient();

    return useMutation<Classroom, Error, { name: string; description?: string }>({
        mutationFn: (data) => classroomApi.create(data),
        onSuccess: (newClassroom) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLASSROOMS });
            queryClient.setQueryData(
                QUERY_KEYS.CLASSROOM_DETAIL(newClassroom.id),
                newClassroom
            );
        },
    });
};

export const useUpdateClassroom = () => {
    const queryClient = useQueryClient();

    return useMutation<
        Classroom,
        Error,
        { id: number; data: { name?: string; description?: string } }
    >({
        mutationFn: ({ id, data }) => classroomApi.update(id, data),
        onSuccess: (updatedClassroom) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLASSROOMS });
            queryClient.setQueryData(
                QUERY_KEYS.CLASSROOM_DETAIL(updatedClassroom.id),
                updatedClassroom
            );
        },
    });
};

export const useDeleteClassroom = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: (id) => classroomApi.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLASSROOMS });
            queryClient.removeQueries({
                queryKey: QUERY_KEYS.CLASSROOM_DETAIL(id),
            });
        },
    });
};