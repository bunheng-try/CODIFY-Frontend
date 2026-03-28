import { MoreVertical } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/shared/components/design/Card";
import type { TestCase } from "../../apis/testcase.api";

interface Props {
    testCase: TestCase;
    index: number;
    onEdit: () => void;
    onDelete: () => void;
    isDirty?: boolean;
}

function previewLines(text: string, max = 2) {
    const lines = text.split("\n").filter(Boolean);
    return lines.slice(0, max);
}

export default function TestCasePreviewCard({
    testCase,
    index,
    onEdit,
    onDelete,
    isDirty = false,
}: Props) {
    const inputPreview = previewLines(testCase.input);
    const outputPreview = previewLines(testCase.expectedOutput);

    return (
        <Card className="p-(--spacing-lg)">
            <div className="flex items-start justify-between gap-(--spacing-md)">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-(--spacing-sm) mb-(--spacing-sm)">
                        <h3 className="typo-title">
                            Test Case {index + 1}
                        </h3>

                        {isDirty && (
                            <span className="badge bg-[hsl(var(--surface-active))] text-[hsl(var(--primary))]">
                                Unsaved
                            </span>
                        )}

                        <span className="badge bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]">
                            {testCase.score} pts
                        </span>

                        <span
                            className={`badge ${testCase.isHidden ? "status-draft" : "status-published"
                                }`}
                        >
                            {testCase.isHidden ? "Hidden" : "Visible"}
                        </span>
                    </div>

                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-(--spacing-lg)">
                        <div className="min-w-0">
                            <p className="typo-label mb-2 text-[hsl(var(--muted-foreground))]">
                                Input
                            </p>
                            <div className="rounded-lg border bg-[hsl(var(--surface-muted))] px-3 py-2">
                                <pre className="text-xs whitespace-pre-wrap break-words font-mono">
                                    {inputPreview.length > 0 ? inputPreview.join("\n") : "—"}
                                    {testCase.input.split("\n").filter(Boolean).length > 2 ? "\n..." : ""}
                                </pre>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <p className="typo-label mb-2 text-[hsl(var(--muted-foreground))]">
                                Expected Output
                            </p>
                            <div className="rounded-lg border bg-[hsl(var(--surface-muted))] px-3 py-2">
                                <pre className="text-xs whitespace-pre-wrap break-words font-mono">
                                    {outputPreview.length > 0 ? outputPreview.join("\n") : "—"}
                                    {testCase.expectedOutput.split("\n").filter(Boolean).length > 2 ? "\n..." : ""}
                                </pre>
                            </div>
                        </div>
                    </CardContent>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={onDelete}
                            variant="destructive"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    );
}