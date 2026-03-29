export interface SubmissionCode {
    id?: number;
    challengeId: number;
    code: string;
}

export type SubmissionStatus =
    | "DRAFT"
    | "SUBMITTED"
    | "GRADING"
    | "GRADED"
    | "EVALUATED";

export interface Submission {
    id: number;
    assignmentId: number;
    userId: number;
    status: SubmissionStatus;
    totalScore?: number;
    feedback?: string; // changed from any to string for frontend use
    submittedAt?: string;
    createdAt: string;
    updatedAt: string;
    codeSubmissions?: SubmissionCode[];
}

export interface CreateSubmissionDto {
    content: string;
}

export interface UpdateSubmissionDto {
    codes: SubmissionCode[];
}

export interface GradeSubmissionDto {
    totalScore: number;
    feedback?: string;
}

// Joined with student name
export interface SubmissionWithStudentName extends Submission {
    name: string;
}

import { httpClient } from "@/app/services/httpClient";

export const submissionsApi = {
    create: (classroomId: number, assignmentId: number, dto: CreateSubmissionDto) =>
        httpClient.post<Submission, CreateSubmissionDto>(
            `/classrooms/${classroomId}/assignments/${assignmentId}/submissions`,
            dto
        ),

    getAll: (classroomId: number, assignmentId: number) =>
        httpClient.get<Submission[]>(
            `/classrooms/${classroomId}/assignments/${assignmentId}/submissions`
        ),

    getById: async (classroomId: number, assignmentId: number, submissionId: number) => {
        const submission = await httpClient.get<Submission>(
            `/classrooms/${classroomId}/assignments/${assignmentId}/submissions/${submissionId}`
        );

        // MOCK
        // TODO: remove this block once backend adds feedback to submission response
        // =========================================
        if (!submission.feedback) {
            submission.feedback =
                submission.status === "GRADED" || submission.status === "EVALUATED"
                    ? "Good effort! Review the test cases you missed and try to optimize your solution."
                    : undefined;
        }
        // END MOCK
        return submission;
    },

    update: (classroomId: number, assignmentId: number, submissionId: number, dto: UpdateSubmissionDto) =>
        httpClient.patch<Submission, UpdateSubmissionDto>(
            `/classrooms/${classroomId}/assignments/${assignmentId}/submissions/${submissionId}`,
            dto
        ),

    turnIn: (classroomId: number, assignmentId: number, submissionId: number) =>
        httpClient.post<Submission, void>(
            `/classrooms/${classroomId}/assignments/${assignmentId}/submissions/${submissionId}/turn-in`,
            undefined
        ),

    // TODO: uncomment this and delete the mock block below once backend implements /grade
    // grade: (classroomId: number, assignmentId: number, submissionId: number, dto: GradeSubmissionDto) =>
    //     httpClient.patch<Submission, GradeSubmissionDto>(
    //         `/classrooms/${classroomId}/assignments/${assignmentId}/submissions/${submissionId}/grade`,
    //         dto
    //     ),

    // MOCK 
    // TODO: remove this block and uncomment the real call above now just mock for test UI
    grade: async (
        _classroomId: number,
        assignmentId: number,
        submissionId: number,
        dto: GradeSubmissionDto
    ): Promise<Submission> => {
        await new Promise((res) => setTimeout(res, 300));
        return {
            id: submissionId,
            assignmentId,
            userId: 0,
            status: "GRADED",
            totalScore: dto.totalScore,
            feedback: dto.feedback ?? "",
            submittedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            codeSubmissions: [],
        };
    },
    // END MOCK
};