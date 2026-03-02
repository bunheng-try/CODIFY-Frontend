import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    testCaseApi,
    type TestCase,
    type CreateTestCaseDto,
    type UpdateTestCaseDto,
} from "../apis/testcase.api";

// Query keys
export const QUERY_KEYS = {
    TESTCASES: (challengeId: number) => ["testcases", challengeId] as const,
    TESTCASE: (id: number) => ["testcase", id] as const,
};

// Get all test cases for a challenge
export const useTestCases = (challengeId: number) => {
    return useQuery<TestCase[]>({
        queryKey: QUERY_KEYS.TESTCASES(challengeId),
        queryFn: () => testCaseApi.getAllByChallenge(challengeId),
        enabled: !!challengeId,
    });
};

// Get single test case
export const useTestCase = (id: number | null) => {
    return useQuery<TestCase>({
        queryKey: id ? QUERY_KEYS.TESTCASE(id) : ["testcase", "none"],
        queryFn: () => {
            if (!id) throw new Error("No test case id provided");
            return testCaseApi.getById(id);
        },
        enabled: !!id,
    });
};

// Create test case
export const useCreateTestCase = (challengeId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateTestCaseDto) =>
            testCaseApi.create(challengeId, dto),
        onSuccess: (newTestCase) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TESTCASES(challengeId),
            });
            queryClient.setQueryData(
                QUERY_KEYS.TESTCASE(newTestCase.id),
                newTestCase
            );
        },
    });
};

// Update test case
export const useUpdateTestCase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            dto,
        }: {
            id: number;
            dto: UpdateTestCaseDto;
        }) => testCaseApi.update(id, dto),
        onSuccess: (updatedTestCase) => {
            queryClient.setQueryData(
                QUERY_KEYS.TESTCASE(updatedTestCase.id),
                updatedTestCase
            );
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TESTCASES(updatedTestCase.challenge_id),
            });
        },
    });
};

// Delete test case
export const useDeleteTestCase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => testCaseApi.delete(id),
        onSuccess: (_, id, context) => {
            queryClient.removeQueries({
                queryKey: QUERY_KEYS.TESTCASE(id),
                exact: true,
            });
            
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TESTCASES(id),
            });
        },
    });
};