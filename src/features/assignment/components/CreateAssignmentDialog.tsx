import { FormDialog } from "@/shared/components/design/dialog/FormDialog";
import { useCreateAssignmentForm } from "../hooks/useCreateAssignmentForm";
import { FormField, TextAreaInput, TextInput } from "@/shared/components/design/FormField";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classroomId: number;
};

export const CreateAssignmentDialog = ({ open, onOpenChange, classroomId }: Props) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    isLoading,
    handleSubmit,
  } = useCreateAssignmentForm(classroomId);

  const onSubmit = () => {
    handleSubmit(() => onOpenChange(false));
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Assignment"
      onSubmit={onSubmit}
      submitText={isLoading ? "Creating..." : "Create"}
      cancelText="Cancel"
    >
      <div className="flex flex-col gap-4 py-4">

        <FormField label="Title" htmlFor="title" required>
          <TextInput
            id="title"
            placeholder="e.g. Week 1 Homework"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </FormField>

        <FormField label="Description" htmlFor="description">
          <TextAreaInput
            id="description"
            placeholder="Enter assignment details here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </FormField>

      </div>
    </FormDialog>
  );
};
