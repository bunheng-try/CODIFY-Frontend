import { EmptyState } from "@/shared/components/empty_state/EmptyState"
import { FileX } from "lucide-react"

interface NoChallengeProp {
    onAction: () => void;
}

const NoTestCase = ({ onAction } : NoChallengeProp) => {
  return (
      <EmptyState
        icon={<FileX className="w-7 h-7 text-[hsl(var(--muted-foreground))]" />}
          title="Add testcases to your assignment!"
          onAction={onAction}
          actionLabel="Add TestCase"
      />
  )
}

export default NoTestCase