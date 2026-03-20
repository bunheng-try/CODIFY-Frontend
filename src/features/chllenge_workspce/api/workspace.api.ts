import { httpClient } from "@/app/services/httpClient";

export type RunCodeDto = {
    language: string;
    code: string;
};

export type RunCodeResponse = {
    jobId: string;
    status: "queue";
};

export type JobStatusResponse = {
    jobId: string;
    state: "queue" | "completed" | "failed";
    result?: {
        stdout: string;
        status: "success" | "error";
    };
};

export const codeRunnerApi = {
    run: (dto: RunCodeDto) =>
        httpClient.post<RunCodeResponse, RunCodeDto>(
            "/code-runner/run",
            dto
        ),

    getStatus: (jobId: string) =>
        httpClient.get<JobStatusResponse>(
            `/code-runner/status/${jobId}`
        ),
};