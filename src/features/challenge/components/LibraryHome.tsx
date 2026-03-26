import { Library } from "lucide-react";
import { EmptyState } from "@/shared/components/empty_state/EmptyState";

export const LibraryHome = () => {
  return (
    <EmptyState
      icon={<Library className="h-7 w-7 text-[hsl(var(--primary))]" />}
      title="Classroom Ready"
      description={
          "Select a challenge from the left panel or create a new one to get started."
      }
      actionLabel={"Create Assignment"}
      onAction={() => console.log("Create assignment clicked")}
    />
  );
};