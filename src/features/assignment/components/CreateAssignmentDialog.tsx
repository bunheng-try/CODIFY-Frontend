import { FormDialog } from "@/shared/components/design/dialog/FormDialog";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useCreateAssignmentForm } from "../hooks/useCreateAssignmentForm";

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
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            placeholder="e.g. Week 1 Homework"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Enter assignment details here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </FormDialog>
  );
};
