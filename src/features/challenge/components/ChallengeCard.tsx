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
  // Lead content: order number for assignment, icon for library
  const leadContent =
    variant === "assignment" ? (
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] font-semibold">
        {index}
      </div>
    ) : (
      <WrapIcon icon={FileCode} size="xl" variantColor="primary" withBg />
    );

  return (
    <Card isSelected={isSelected} onClick={() => onSelect?.(challenge.id)}>
      <div className="flex items-start gap-3">
        <div>{leadContent}</div>

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
            <Badge variant={challengeLevelMap[challenge.level || "Easy"]}>
              {challenge.level || "Easy"}
            </Badge>
          </div>

          <CardMeta className="flex flex-wrap gap-3 mt-1">
            <CardStatItem icon={Trophy} label={`${challenge.score || 100} Score`} />
            <CardStatItem icon={FileCode} label={challenge.language} />
            <CardStatItem icon={Tag} label={challenge.topic || "Array"} />
          </CardMeta>
        </div>
      </div>
    </Card>
  );
}; 