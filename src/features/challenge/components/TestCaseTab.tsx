"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { EditableField } from "@/shared/components/design/EditableField";
import { FormDialog } from "@/shared/components/design/dialog/FormDialog";

import type { TestCase, CreateTestCaseDto } from "../apis/testcase.api";
import { SectionContainer } from "@/shared/components/design/SectionContainer";
import { LabeledSection } from "@/shared/components/design/LabeledSection";
import { FieldError } from "@/shared/components/design/FieldError";

interface Props {
    challengeId: number;
    draft: TestCase[];
    updateField: (id: number, key: keyof TestCase, value: any) => void;
    addDraft: (tc: TestCase) => void;
}

export default function TestCasesTab({ challengeId, draft, updateField, addDraft }: Props) {
    const [editedValues, setEditedValues] = useState<Record<number, Partial<TestCase>>>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newTest, setNewTest] = useState<CreateTestCaseDto>({
        challengeId,
        input: "",
        expectedOutput: "",
        score: 0,
        isHidden: false,
    });
    const [errors, setErrors] = useState<{ input?: string; expectedOutput?: string; score?: string }>({});

    const validateNewTest = () => {
        const errs: typeof errors = {};

        if (!newTest.input.trim()) errs.input = "Input cannot be empty";
        if (!newTest.expectedOutput.trim()) errs.expectedOutput = "Expected output cannot be empty";

        if (isNaN(newTest.score)) {
            errs.score = "Score must be a number";
        } else if (newTest.score < 0) {
            errs.score = "Score cannot be negative";
        }

        setErrors(errs);

        return Object.keys(errs).length === 0;
    };

    const markDirty = (id: number, key: keyof TestCase, value: any) => {
        setEditedValues(prev => ({
            ...prev,
            [id]: { ...prev[id], [key]: value },
        }));
        updateField(id, key, value);
    };

    const handleCreate = () => {
        if (!validateNewTest()) return;

        const tempId = -Date.now();
        const newTC: TestCase = {
            id: tempId,
            challengeId,
            input: newTest.input,
            expectedOutput: newTest.expectedOutput,
            score: newTest.score,
            isHidden: newTest.isHidden,
        };

        addDraft(newTC);

        setNewTest({
            challengeId,
            input: "",
            expectedOutput: "",
            score: 0,
            isHidden: false,
        });

        setDialogOpen(false);
    };

    return (
        <SectionContainer title="Test Cases">
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                    Manage the test cases for this challenge.
                </p>
                <Button onClick={() => setDialogOpen(true)}>Add Test Case</Button>
            </div>

            {draft.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-400 text-sm">
                    No test cases found.
                </div>
            ) : (
                    <div className="space-y-4">
                        {draft.map(tc => {
                            const edited = editedValues[tc.id] || {};
                            return (
                                <div
                                    key={tc.id}
                                    className="
                    grid gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors
                    grid-cols-1 sm:grid-cols-5
                    items-center
                "
                                >
                                    <LabeledSection label="Input">
                                        <EditableField
                                            value={edited.input ?? tc.input}
                                            onChange={val => markDirty(tc.id, "input", val)}
                                        />
                                    </LabeledSection>
                                    <LabeledSection label="Expected Output">
                                        <EditableField
                                            value={edited.expectedOutput ?? tc.expectedOutput}
                                            onChange={val => markDirty(tc.id, "expectedOutput", val)}
                                        />
                                    </LabeledSection>
                                    <LabeledSection label="Score">
                                        <EditableField
                                            value={String(edited.score ?? tc.score)}
                                            onChange={val => markDirty(tc.id, "score", Number(val))}
                                        />
                                    </LabeledSection>
                                    <LabeledSection label="Hidden">
                                        <input
                                            type="checkbox"
                                            checked={edited.isHidden ?? tc.isHidden}
                                            onChange={e => markDirty(tc.id, "isHidden", e.target.checked)}
                                        />
                                    </LabeledSection>
                                </div>
                            );
                        })}
                    </div>
            )}

            <FormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Add Test Case"
                onSubmit={handleCreate}
                submitText="Add"
                cancelText="Cancel"
            >
                <div className="space-y-4">
                    <LabeledSection label="Score">
                        <EditableField
                            value={String(newTest.score)}
                            onChange={(val) => setNewTest({ ...newTest, score: Number(val) })}
                            placeholder="Score"
                            className={errors.score ? "border-red-500" : ""}
                        />
                        <FieldError message={errors.score} />
                    </LabeledSection>

                    <LabeledSection label="Input">
                        <EditableField
                            value={newTest.input}
                            onChange={(val) => setNewTest({ ...newTest, input: val })}
                            placeholder="Input"
                            className={errors.input ? "border-red-500" : ""}
                        />
                        <FieldError message={errors.input} />
                    </LabeledSection>

                    <LabeledSection label="Expected Output">
                        <EditableField
                            value={newTest.expectedOutput}
                            onChange={(val) => setNewTest({ ...newTest, expectedOutput: val })}
                            placeholder="Expected Output"
                            className={errors.expectedOutput ? "border-red-500" : ""}
                        />
                        <FieldError message={errors.expectedOutput} />
                    </LabeledSection>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={newTest.isHidden}
                            onChange={e => setNewTest({ ...newTest, isHidden: e.target.checked })}
                        />
                        <label>Hidden</label>
                    </div>
                </div>
            </FormDialog>
        </SectionContainer>
    );
}