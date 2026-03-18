import type { Challenge } from "@/features/challenge/apis/challenge.api";
import { ButtonPrimary } from "@/shared/components/design/button";
import { cn } from "@/lib/utils";

interface StudentChallengeRowProps {
  index: number;
  challenge: Challenge;
  onStart: () => void;
}

const levelColor: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export const StudentChallengeRow = ({ index, challenge, onStart }: StudentChallengeRowProps) => {
  return (
    <div className="flex items-center justify-between border border-border rounded-lg px-4 py-3">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-5">{index}</span>
        <div>
          <p className="text-sm font-medium">{challenge.title}</p>
          <div className="flex items-center gap-2 mt-1">
            {challenge.level && (
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  levelColor[challenge.level] ?? "bg-muted text-muted-foreground"
                )}
              >
                {challenge.level}
              </span>
            )}
            {challenge.score && (
              <span className="text-xs text-muted-foreground">{challenge.score} points</span>
            )}
          </div>
        </div>
      </div>
      <ButtonPrimary onClick={onStart}>Start</ButtonPrimary>
    </div>
  );
};