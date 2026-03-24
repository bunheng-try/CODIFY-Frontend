import { useMutation, useQuery } from "@tanstack/react-query";
import { codeRunnerApi, type RunCodeDto, type TestCodeDto, type JobQueueDto, type JobStatusResponse } from "../apis/code-runner.api.ts";

export const useRunCode = () => {
    return useMutation<JobQueueDto, unknown, RunCodeDto>({
        mutationFn: (dto) => codeRunnerApi.runCode(dto),
    });
};

export const useRunTestCode = () => {
    return useMutation<JobQueueDto, unknown, TestCodeDto>({
        mutationFn: (dto) => codeRunnerApi.runTestCode(dto),
    });
};

export const useJobStatus = (jobId: string | null) => {
    return useQuery<JobStatusResponse, Error>({
        queryKey: jobId ? ["job", jobId] : ["job", "none"],
        enabled: !!jobId,
        queryFn: () => {
            if (!jobId) throw new Error("Missing jobId");
            return codeRunnerApi.getJobStatus(jobId);
        },
        refetchInterval: (query) => {
            const data = query.state.data;
            return data?.state === "queue" ? 300 : false;
        },
    });
};