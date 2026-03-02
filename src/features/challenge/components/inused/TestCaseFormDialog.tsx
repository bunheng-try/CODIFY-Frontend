// features/challenge/components/TestCaseFormDialog.tsx

import { useState, useEffect } from "react";
import { FormDialog } from "@/shared/components/design/dialog/FormDialog";
import { Input } from "@/shared/components/ui/input";
import type { TestCase } from "../../types/challenge";

type FormErrors = Partial<Record<keyof TestCase, string>>;

interface TestCaseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (testCase: TestCase) => void;
}

const EMPTY_FORM = {
  name: "",
  type: "" as TestCase["type"],
  input: "",
  expectedOutput: "",
};

export const TestCaseFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: TestCaseFormDialogProps) => {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [open]);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim())           newErrors.name           = "Name is required";
    if (!form.type)                  newErrors.type           = "Type is required";
    if (!form.input.trim())          newErrors.input          = "Input is required";
    if (!form.expectedOutput.trim()) newErrors.expectedOutput = "Expected output is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({
      id:             crypto.randomUUID(),
      name:           form.name,
      type:           form.type,
      input:          form.input,
      expectedOutput: form.expectedOutput,
    });
    onOpenChange(false);
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Test Case"
      submitText="Create"
      cancelText="Cancel"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 py-4">

        {/* Row — Name + Type */}
        <div className="grid grid-cols-2 gap-4">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">
              Name <span className="text-[hsl(var(--destructive))]">*</span>
            </label>
            <Input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Test Case"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-[hsl(var(--destructive))]">{errors.name}</p>
            )}
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">
              Type <span className="text-[hsl(var(--destructive))]">*</span>
            </label>
            <select
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
              aria-invalid={!!errors.type}
              className="h-9 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm text-[hsl(var(--foreground))] outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
            >
              <option value="">Select type</option>
              <option value="sample">Sample</option>
              <option value="hidden">Hidden</option>
            </select>
            {errors.type && (
              <p className="text-xs text-[hsl(var(--destructive))]">{errors.type}</p>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">
            Input <span className="text-[hsl(var(--destructive))]">*</span>
          </label>
          <Input
            value={form.input}
            onChange={(e) => update("input", e.target.value)}
            placeholder="0 5"
            aria-invalid={!!errors.input}
          />
          {errors.input && (
            <p className="text-xs text-[hsl(var(--destructive))]">{errors.input}</p>
          )}
        </div>

        {/* Expected Output */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">
            Expected Output <span className="text-[hsl(var(--destructive))]">*</span>
          </label>
          <Input
            value={form.expectedOutput}
            onChange={(e) => update("expectedOutput", e.target.value)}
            placeholder="1"
            aria-invalid={!!errors.expectedOutput}
          />
          {errors.expectedOutput && (
            <p className="text-xs text-[hsl(var(--destructive))]">{errors.expectedOutput}</p>
          )}
        </div>

      </div>
    </FormDialog>
  );
};