import { Card, CardHeader, CardMeta } from "@/shared/components/design/Card";
import { WrapIcon } from "@/shared/components/ui/wrapIcon";
import { FileCode, MoreVertical, Star, Tag, Trophy, User } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

interface ChallengeCardProps {
  challenge: any;
  showDescription?: boolean;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
  index?: number; // order number
}

export const ChallengeCard = ({
  challenge,
  showDescription = false,
  isSelected = false,
  onSelect,
  index = 1,
}: ChallengeCardProps) => {
  return (
    <Card isSelected={isSelected} onClick={() => onSelect?.(challenge.id)}>
      <div className="flex items-start gap-3">
        {/* Lead / Order */}
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] font-semibold">
          {index}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          {/* Header with actions */}
          <CardHeader
            title={
              <p className="font-bold text-[15px] text-[hsl(var(--foreground))] break-words">
                {challenge.title}
              </p>
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

          <Badge variant={`challenge-${(challenge.level || "Easy").toLowerCase()}`}>
            {challenge.level || "Easy"}
          </Badge>

          {/* Optional description */}
          {showDescription && (
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{challenge.description}</p>
          )}

          {/* Stats / Meta */}
          <CardMeta>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Trophy size={14} />
              <span>{challenge.score || 100} Score</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <FileCode size={14} />
              <span>{challenge.language}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Tag size={14} />
              <span>{challenge.topic || "Array"}</span>
            </div>
          </CardMeta>
        </div>
      </div>
    </Card>
  );
};