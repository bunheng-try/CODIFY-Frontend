import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import type { CreateTestCaseDto, TestCase, UpdateTestCaseDto } from "../apis/testcase.api";
import { FormDialog } from "@/shared/components/design/dialog";
import { useCreateTestCase, useDeleteTestCase, useTestCases, useUpdateTestCase } from "../hooks/useTestCaseQuery";

interface Props {
    challengeId: number;
}

export default function TestCasesTab({ challengeId }: Props) {
    const { data: testCases = [] } = useTestCases(challengeId);
    const createTestCase = useCreateTestCase(challengeId);
    const updateTestCase = useUpdateTestCase();
    const deleteTestCase = useDeleteTestCase();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [newTest, setNewTest] = useState<CreateTestCaseDto>({
        challenge_id: challengeId,
        input: "",
        expected_output: "",
        score: 0,
        is_hidden: false,
    });

    const handleCreate = () => {
        createTestCase.mutate(newTest, {
            onSuccess: () => {
                setNewTest({ ...newTest, input: "", expected_output: "", score: 0, is_hidden: false });
                setDialogOpen(false);
            },
        });
    };

    const handleUpdate = (id: number, dto: Partial<UpdateTestCaseDto>) => {
        updateTestCase.mutate({ id, dto });
    };

    const handleDelete = (id: number) => {
        deleteTestCase.mutate(id);
    };

    return (
        <div className="px-1 pb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">Test Cases</h3>
                <Button onClick={() => setDialogOpen(true)}>Add Test Case</Button>
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[3fr_3fr_1fr_1fr_1fr] px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Input</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expected Output</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Score</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hidden</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</span>
                </div>

                {/* Table Rows */}
                {testCases.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-400 text-sm">No test cases found.</div>
                ) : (
                    testCases.map((tc: TestCase, i: number) => (
                        <div
                            key={tc.id}
                            className={`grid grid-cols-[3fr_3fr_1fr_1fr_1fr] items-center px-4 py-3.5 hover:bg-gray-50 transition-colors ${i !== testCases.length - 1 ? "border-b border-gray-100" : ""
                                }`}
                        >
                            <input
                                type="text"
                                value={tc.input}
                                className="w-full border rounded px-2 py-1 text-sm"
                                onChange={(e) => handleUpdate(tc.id, { input: e.target.value })}
                            />
                            <input
                                type="text"
                                value={tc.expected_output}
                                className="w-full border rounded px-2 py-1 text-sm"
                                onChange={(e) => handleUpdate(tc.id, { expected_output: e.target.value })}
                            />
                            <input
                                type="number"
                                value={tc.score}
                                className="w-full border rounded px-2 py-1 text-sm"
                                onChange={(e) => handleUpdate(tc.id, { score: Number(e.target.value) })}
                            />
                            <div className="flex justify-center">
                                <input
                                    type="checkbox"
                                    checked={tc.is_hidden}
                                    onChange={(e) => handleUpdate(tc.id, { is_hidden: e.target.checked })}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="text-red-500 hover:underline text-sm"
                                    onClick={() => handleDelete(tc.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Test Case Dialog */}
            <FormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Add Test Case"
                onSubmit={handleCreate}
                submitText="Add"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Input</label>
                        <input
                            type="text"
                            value={newTest.input}
                            onChange={(e) => setNewTest({ ...newTest, input: e.target.value })}
                            className="mt-1 block w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Expected Output</label>
                        <input
                            type="text"
                            value={newTest.expected_output}
                            onChange={(e) => setNewTest({ ...newTest, expected_output: e.target.value })}
                            className="mt-1 block w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Score</label>
                        <input
                            type="number"
                            value={newTest.score}
                            onChange={(e) => setNewTest({ ...newTest, score: Number(e.target.value) })}
                            className="mt-1 block w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={newTest.is_hidden}
                            onChange={(e) => setNewTest({ ...newTest, is_hidden: e.target.checked })}
                        />
                        <label className="text-sm text-[hsl(var(--foreground))]">Hidden</label>
                    </div>
                </div>
            </FormDialog>
        </div>
    );
}