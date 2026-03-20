export interface TestResult {
    passed: number
    failed: number
    details: {
        test: number
        status: "pass" | "fail"
        output?: string
    }[]
}

export interface SubmissionResult {
    score: number
    total: number
    results: {
        challengeId: string
        passed: number
        failed: number
    }[]
}