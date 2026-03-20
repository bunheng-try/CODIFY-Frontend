import { Card, CardHeader, CardMeta, CardStatItem } from "@/shared/components/design/Card";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { FileCode, MoreVertical, Star, Tag, Trophy, User } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import type { Challenge } from "../apis/challenge.api";

const challengeLevelMap: Record<string, "challenge-easy" | "challenge-medium" | "challenge-hard" | "challenge-expert"> = {
  Easy: "challenge-easy",
  Medium: "challenge-medium",
  Hard: "challenge-hard",
  Expert: "challenge-expert",
};

interface ChallengeCardProps {
  challenge: Challenge;
  showDescription?: boolean;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
  variant?: "assignment" | "library";
  index?: number;
}

export const ChallengeCard = ({
  challenge,
  isSelected = false,
  onSelect,
  variant = "library",
  index = 1,
}: ChallengeCardProps) => {
  const leadContent =
    (
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] font-semibold">
        {index}
      </div>
    )

  return (
    <Card isSelected={isSelected} onClick={() => onSelect?.(challenge.id)}>
      <div className="flex items-start gap-3">
        { variant === "assignment" &&
          <div>{leadContent}</div>
        }

        <div className="flex-1 flex flex-col gap-1">
          <CardHeader
            title={
              challenge.title
            }
            actions={
              <div className="flex items-center gap-2">
                <WrapIcon icon={User} size="default" variantColor="default" />
                <WrapIcon icon={Star} size="default" variantColor="default" />
                <WrapIcon icon={MoreVertical} size="default" variantColor="default" />
              </div>
            }
            className="items-start"
          />

          <div>
            <Badge variant={challengeLevelMap[challenge.difficulty || "Easy"]}>
              {challenge.difficulty || "Easy"}
            </Badge>
          </div>

          <CardMeta className="flex flex-wrap gap-3 mt-1 truncate">
            {/* Compute challenge score from its test case */}
            <CardStatItem icon={Trophy} label={`${challenge.score || 100} Score`} />
            <CardStatItem icon={FileCode} label={challenge.language} />
            
            {challenge.tag && <CardStatItem icon={Tag} label={challenge.tag} />}
          </CardMeta>
        </div>
      </div>
    </Card>
  );
};  