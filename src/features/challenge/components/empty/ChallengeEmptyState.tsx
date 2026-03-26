import { EmptyState } from "@/shared/components/empty_state/EmptyState";
import { FileX } from "lucide-react";

export const ChallengeEmptyState = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <EmptyState
      icon={<FileX className="w-7 h-7 text-[hsl(var(--muted-foreground))]" />}
      title="No challenges yet"
      description="Create your first challenge to get started"
      actionLabel="Create Challenge"
      onAction={onCreate}
    />
  );
};