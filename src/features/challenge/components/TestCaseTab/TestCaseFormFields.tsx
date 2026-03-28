import { EditableField } from "@/shared/components/design/EditableField";
import { EditableArguments } from "@/shared/components/design/EditableArguments";
import { LabeledSection } from "@/shared/components/design/LabeledSection";
import { FieldError } from "@/shared/components/design/FieldError";
import type { CreateTestCaseDto } from "../../apis/testcase.api";

interface Props {
    value: CreateTestCaseDto;
    onChange: (val: CreateTestCaseDto) => void;
    errors?: {
        input?: string;
        expectedOutput?: string;
        score?: string;
    };
}

export default function TestCaseFormFields({ value, onChange, errors = {} }: Props) {
    return (
        <div className="space-y-(--spacing-lg)">
            <LabeledSection label="Score">
                <EditableField
                    value={String(value.score)}
                    onChange={(val) => onChange({ ...value, score: Number(val) })}
                    placeholder="Score"
                    type="number"
                    className={errors.score ? "border-[hsl(var(--destructive))]" : ""}
                />
                <FieldError message={errors.score} />
            </LabeledSection>

            <LabeledSection label="Input">
                <EditableArguments
                    values={value.input ? value.input.split("\n") : [""]}
                    onChange={(args) => onChange({ ...value, input: args.join("\n") })}
                    placeholder="Enter one argument per row"
                />
                <FieldError message={errors.input} />
            </LabeledSection>

            <LabeledSection label="Expected Output">
                <EditableArguments
                    values={value.expectedOutput ? value.expectedOutput.split("\n") : [""]}
                    onChange={(args) => onChange({ ...value, expectedOutput: args.join("\n") })}
                    placeholder="Enter one output per row"
                />
                <FieldError message={errors.expectedOutput} />
            </LabeledSection>

            <div className="flex items-center gap-(--spacing-sm)">
                <input
                    id="hidden-test-case"
                    type="checkbox"
                    checked={value.isHidden}
                    onChange={(e) => onChange({ ...value, isHidden: e.target.checked })}
                />
                <label htmlFor="hidden-test-case" className="typo-body">
                    Hidden
                </label>
            </div>
        </div>
    );
}