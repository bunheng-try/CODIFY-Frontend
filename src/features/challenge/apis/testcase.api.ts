import { httpClient } from "@/app/services/httpClient";

export type TestCase = {
    id: number;
    challengeId: number;
    input: string;
    expectedOutput: string;
    score: number;
    isHidden: boolean;
};

export type CreateTestCaseDto = {
    challengeId: number;
    input: string;
    expectedOutput: string;
    score: number;
    isHidden: boolean;
};

export type UpdateTestCaseDto = {
    input?: string;
    expectedOutput?: string;
    score?: number;
    isHidden?: boolean;
};

export const testCaseApi = {
    getAllByChallenge: (challengeId: number) =>
        httpClient.get<TestCase[]>(`/challenges/${challengeId}/testcase`),

    getById: (id: number) =>
        httpClient.get<TestCase>(`/challenges/testcase/${id}`),

    create: (challengeId: number, dto: CreateTestCaseDto) =>
        httpClient.post<TestCase, CreateTestCaseDto>(
            `/challenges/${challengeId}/testcase`,
            dto
        ),

    update: (id: number, dto: UpdateTestCaseDto) =>
        httpClient.patch<TestCase, UpdateTestCaseDto>(
            `/challenges/testcase/${id}`,
            dto
        ),

    delete: (id: number) =>
        httpClient.delete<void>(`/challenges/testcase/${id}`),
};