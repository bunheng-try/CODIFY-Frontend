// features/challenge/components/ChallengeListTitle.tsx
import { FileCode, CheckCircle2, MoreVertical, Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Challenge } from "../apis/challenge.api";

interface ChallengeListTitleProps {
  challenge: Challenge;
  selectable?: boolean;
  isSelected?: boolean;
}

export const ChallengeListTitle = ({
  challenge,
  selectable = true,
  isSelected = false,
}: ChallengeListTitleProps) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    if (selectable) navigate(`/challenge-library/${challenge.id}`);
  };

  return (
    <div
      onClick={handleSelect}
      className={`bg-[hsl(var(--card))] rounded-xl px-4 py-4 border transition-all mb-3 flex items-center justify-between cursor-pointer
        ${isSelected
          ? "border-l-[3px] border-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary))]"
          : "border-[hsl(var(--border))] shadow-sm hover:border-[hsl(var(--primary))] hover:shadow-md"} 
      `}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative">
          <div className="w-10 h-10 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center">
            <FileCode className="w-5 h-5 text-[hsl(var(--primary-foreground))]" strokeWidth={2.5} />
          </div>

          {isSelected && (
            <div className="absolute -top-2 -right-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full">
              <CheckCircle2 size={16} fill="currentColor" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-0.5 truncate min-w-0">
          <h3 className="font-bold text-[15px] text-[hsl(var(--foreground))] truncate">{challenge.title}</h3>
          <p className="text-[12px] text-[hsl(var(--muted-foreground))] font-medium truncate">
            {challenge.description || "No description"}
          </p>
          <div className="flex items-center gap-4 text-[12px] text-[hsl(var(--muted-foreground))] font-semibold mt-0.5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <FileCode size={14} />
              <span>{challenge.language}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} />
              <span>{new Date(challenge.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {!selectable && (
        <div className="flex items-center gap-2">
          <button className="p-2 text-[hsl(var(--primary))]"><User size={18} fill="currentColor" /></button>
          <button className="p-2 text-[hsl(var(--muted-foreground))]"><Star size={18} /></button>
          <button className="p-2 text-[hsl(var(--muted-foreground))]"><MoreVertical size={18} /></button>
        </div>
      )}
    </div>
  );
};