import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionsApi } from "../apis/submission.api";
import type { Submission, CreateSubmissionDto, UpdateSubmissionDto } from "../apis/submission.api";

export const QUERY_KEYS = {
    SUBMISSIONS: (classroomId: number, assignmentId: number) =>
        ["submissions", classroomId, assignmentId] as const,
    SUBMISSION: (classroomId: number, assignmentId: number, submissionId: number) =>
        ["submission", classroomId, assignmentId, submissionId] as const,
};

// ================= Get all submissions =================
export const useSubmissions = (classroomId: number | null, assignmentId: number | null) => {
    return useQuery<Submission[]>({
        queryKey:
            classroomId && assignmentId
                ? QUERY_KEYS.SUBMISSIONS(classroomId, assignmentId)
                : ["submissions", "none"],
        enabled: !!classroomId && !!assignmentId,
        queryFn: () => {
            if (!classroomId || !assignmentId) throw new Error("Missing IDs");
            return submissionsApi.getAll(classroomId, assignmentId);
        },
    });
};

// ================= Get single submission =================
export const useSubmission = (
    classroomId: number | null,
    assignmentId: number | null,
    submissionId: number | null
) => {
    return useQuery<Submission>({
        queryKey:
            classroomId && assignmentId && submissionId
                ? QUERY_KEYS.SUBMISSION(classroomId, assignmentId, submissionId)
                : ["submission", "none"],
        enabled: !!classroomId && !!assignmentId && !!submissionId,
        queryFn: () => {
            if (!classroomId || !assignmentId || !submissionId) throw new Error("Missing IDs");
            return submissionsApi.getById(classroomId, assignmentId, submissionId);
        },
    });
};

// ================= Create submission draft =================
export const useCreateSubmission = (classroomId: number, assignmentId: number) => {
    const queryClient = useQueryClient();
    return useMutation<Submission, unknown, CreateSubmissionDto>({
        mutationFn: (dto: CreateSubmissionDto) =>
            submissionsApi.create(classroomId, assignmentId, dto),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSIONS(classroomId, assignmentId),
            }),
    });
};

// ================= Update submission draft =================
export const useUpdateSubmission = (
    classroomId: number,
    assignmentId: number,
    submissionId: number
) => {
    const queryClient = useQueryClient();
    return useMutation<Submission, unknown, UpdateSubmissionDto>({
        mutationFn: (dto: UpdateSubmissionDto) =>
            submissionsApi.update(classroomId, assignmentId, submissionId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSIONS(classroomId, assignmentId),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSION(classroomId, assignmentId, submissionId),
            });
        },
    });
};

// ================= Turn in submission =================
export const useTurnInSubmission = (
    classroomId: number,
    assignmentId: number,
    submissionId: number
) => {
    const queryClient = useQueryClient();
    return useMutation<Submission, unknown, void>({
        mutationFn: () => submissionsApi.turnIn(classroomId, assignmentId, submissionId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSIONS(classroomId, assignmentId),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSION(classroomId, assignmentId, submissionId),
            });
        },
    });
};