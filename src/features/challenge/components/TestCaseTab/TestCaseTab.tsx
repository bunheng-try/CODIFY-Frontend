"use client";

import { useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { FormDialog } from "@/shared/components/design/dialog/FormDialog";

import { SectionContainer } from "@/shared/components/design/SectionContainer";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { Plus } from "lucide-react";
import TestCaseFormFields from "./TestCaseFormFields";
import TestCasePreviewCard from "./TestCasePreviewCard";
import type { CreateTestCaseDto, TestCase } from "../../apis/testcase.api";
import NoTestCase from "../empty/NoTestCase";

interface Props {
    challengeId: number;
    draft: TestCase[];
    updateField: (id: number, key: keyof TestCase, value: any) => void;
    addDraft: (tc: TestCase) => void;
    markDeleted: (id: number) => void;
    isDirty?: (id: number) => boolean;
}

export default function TestCasesTab({
    challengeId,
    draft,
    updateField,
    addDraft,
    markDeleted,
    isDirty,
}: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTestId, setEditingTestId] = useState<number | null>(null);

    const [newTest, setNewTest] = useState<CreateTestCaseDto>({
        challengeId,
        input: "",
        expectedOutput: "",
        score: 0,
        isHidden: false,
    });

    const [errors, setErrors] = useState<{
        input?: string;
        expectedOutput?: string;
        score?: string;
    }>({});

    const editingTest = useMemo(
        () => draft.find(tc => tc.id === editingTestId) ?? null,
        [draft, editingTestId]
    );

    const validateTest = (test: CreateTestCaseDto) => {
        const errs: typeof errors = {};

        if (!test.input.trim()) errs.input = "Input cannot be empty";
        if (!test.expectedOutput.trim()) errs.expectedOutput = "Expected output cannot be empty";

        if (isNaN(test.score)) {
            errs.score = "Score must be a number";
        } else if (test.score < 0) {
            errs.score = "Score cannot be negative";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const resetCreateForm = () => {
        setNewTest({
            challengeId,
            input: "",
            expectedOutput: "",
            score: 0,
            isHidden: false,
        });
        setErrors({});
    };

    const handleOpenCreate = () => {
        setEditingTestId(null);
        resetCreateForm();
        setDialogOpen(true);
    };

    const handleOpenEdit = (tc: TestCase) => {
        setEditingTestId(tc.id);
        setErrors({});
        setDialogOpen(true);
    };

    const handleCreate = () => {
        if (!validateTest(newTest)) return;

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
        resetCreateForm();
        setDialogOpen(false);
    };

    const handleEditSave = () => {
        if (!editingTest) return;

        const dto: CreateTestCaseDto = {
            challengeId,
            input: editingTest.input,
            expectedOutput: editingTest.expectedOutput,
            score: editingTest.score,
            isHidden: editingTest.isHidden,
        };

        if (!validateTest(dto)) return;

        setDialogOpen(false);
        setEditingTestId(null);
    };

    const dialogTitle = editingTest ? "Edit Test Case" : "Add Test Case";

    return (
        <SectionContainer title="Test Cases">
            <div className="flex justify-between items-center mb-(--spacing-lg)">
                <p className="typo-caption">
                    Manage the test cases for this challenge.
                </p>
                <Button onClick={handleOpenCreate}>
                    <WrapIcon icon={Plus} />
                </Button>
            </div>

            {draft.length === 0 ? (
                <NoTestCase onAction={handleOpenCreate} />
            ) : (
                <div className="space-y-(--spacing-md)">
                    {draft.map((tc, index) => (
                        <TestCasePreviewCard
                            key={tc.id}
                            testCase={tc}
                            index={index}
                            onEdit={() => handleOpenEdit(tc)}
                            onDelete={() => markDeleted(tc.id)}
                            isDirty={isDirty?.(tc.id)}
                        />
                    ))}
                </div>
            )}

            <FormDialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) {
                        setEditingTestId(null);
                        setErrors({});
                    }
                }}
                title={dialogTitle}
                onSubmit={editingTest ? handleEditSave : handleCreate}
                submitText={editingTest ? "Save Changes" : "Add"}
                cancelText="Cancel"
            >
                {editingTest ? (
                    <TestCaseFormFields
                        value={{
                            challengeId,
                            input: editingTest.input,
                            expectedOutput: editingTest.expectedOutput,
                            score: editingTest.score,
                            isHidden: editingTest.isHidden,
                        }}
                        onChange={(val) => {
                            updateField(editingTest.id, "input", val.input);
                            updateField(editingTest.id, "expectedOutput", val.expectedOutput);
                            updateField(editingTest.id, "score", val.score);
                            updateField(editingTest.id, "isHidden", val.isHidden);
                        }}
                        errors={errors}
                    />
                ) : (
                    <TestCaseFormFields
                        value={newTest}
                        onChange={setNewTest}
                        errors={errors}
                    />
                )}
            </FormDialog>
        </SectionContainer>
    );
}