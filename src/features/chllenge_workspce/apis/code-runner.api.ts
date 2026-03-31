/* =========================
   Types
   ========================= */

export interface JobQueueDto {
    jobId: string;
    status: "queue";
}

// Single test case result
export interface TestCaseResult {
    testCasesId: number;
    passed: boolean;
    status: "ACCEPTED" | "ERROR" | "FAILED";
    actualOutput: string;
    expectedOutput: string;
    input: string
    expected: string
    output?: string
    isHidden?: boolean
}

// Job result for test code (array of test case results)
export interface TestCodeResult {
    results: TestCaseResult[];
}

export interface CustomCodeResult {
    stdout?: string;
    status?: string; // e.g., "success" or "failed"
}

export type JobResult = TestCodeResult | CustomCodeResult;

export type JobState = "queue" | "completed" | "failed";

// Job status response
export interface JobStatusResponse {
    jobId: string;
    state: JobState;
    result?: JobResult; // fixed to handle multiple test cases
}

// DTOs for running code
export interface RunCodeDto {
    language: string;
    code: string;
}

export interface TestCodeDto {
    challengeId: number;
    language: string;
    code: string;
}

/* =========================
   API
   ========================= */

import { httpClient } from "@/app/services/httpClient";

export const codeRunnerApi = {
    // Run custom code
    runCode: (dto: RunCodeDto) => httpClient.post<JobQueueDto, RunCodeDto>("/code-runner/run", dto),

    // Check job status
    getJobStatus: (jobId: string) => httpClient.get<JobStatusResponse>(`/code-runner/status/${jobId}`),

    // Run code against challenge test cases
    runTestCode: (dto: TestCodeDto) => httpClient.post<JobQueueDto, TestCodeDto>("/code-runner/test", dto),
};