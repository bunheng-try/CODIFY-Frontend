import { EmptyState } from "@/shared/components/empty_state/EmptyState";
import { FolderOpen } from "lucide-react";

export function NoClassSelected() {
  return (
    <EmptyState
      icon={<FolderOpen className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />}
      title="No class selected"
      description="Select a class from the sidebar to get started."
    />
  );
}