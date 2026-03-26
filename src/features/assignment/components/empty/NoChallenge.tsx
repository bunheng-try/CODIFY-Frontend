import { EmptyState } from "@/shared/components/empty_state/EmptyState"
import { FileX } from "lucide-react"

interface NoChallengeProp {
    onAction: () => void;
}

const NoChallenge = ({ onAction } : NoChallengeProp) => {
  return (
      <EmptyState
        icon={<FileX className="w-7 h-7 text-[hsl(var(--muted-foreground))]" />}
          title="Add challenges to your assignment!"
          onAction={onAction}
          actionLabel="Add Challenge"
      />
  )
}

export default NoChallenge