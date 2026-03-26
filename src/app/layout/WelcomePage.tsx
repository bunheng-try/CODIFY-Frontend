import { EmptyState } from '@/shared/components/empty_state/EmptyState'
import { HomeIcon } from 'lucide-react'

const WelcomePage = () => {
  return (
      <EmptyState
          variant="hero"
          icon={<HomeIcon className="w-12 h-12 text-[hsl(var(--primary))]" />}
          title="Welcome to Codify!"
          description="Start by selecting a classroom or exploring the challenge library."
          actionLabel="Get Started"
          onAction={() => console.log("Clicked Get Started")}
      />
  )
}

export default WelcomePage