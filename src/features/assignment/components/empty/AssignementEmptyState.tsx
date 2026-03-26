import { EmptyState } from "@/shared/components/empty_state/EmptyState";
import { BookX } from "lucide-react";

export const AssignementEmptyState = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <EmptyState
      icon={<BookX className="w-7 h-7 text-[hsl(var(--muted-foreground))]" />}
      title="No assignemtns yet"
      description="Create your first assignment to get started"
      actionLabel="Create Assignment"
      onAction={onCreate}
    />
  );
};