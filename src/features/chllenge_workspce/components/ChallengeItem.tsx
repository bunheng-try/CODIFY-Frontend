import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

interface ChallengeItemProps {
  name: string;
  active?: boolean;
  onClick?: () => void;
}

export function ChallengeItem({
  name,
  active = false,
  onClick,
}: ChallengeItemProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon-lg"
      className={cn(
        "rounded-md font-medium transition-all",
        active
          ? "border-2 border-[hsl(var(--primary))] font-semibold"
          : "border-none hover:border-[hsl(var(--primary))]",
      )}
    >
      {name}
    </Button>
  );
}
