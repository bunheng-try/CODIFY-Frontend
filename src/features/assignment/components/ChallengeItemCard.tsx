import { Code2, MoreVertical, Star, Tag, Trophy, User, FileCode, CheckCircle2 } from "lucide-react";
import type { Challenge } from "../types/assignment";


interface Props {
  challenge: Challenge;
  showDescription?: boolean;
  selectable?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export const ChallengeCard = ({ challenge, showDescription, selectable, isSelected, onSelect }: Props) => {
  const getDifficultyStyle = (level: string) => {
    switch (level) {
      case "Easy": return "bg-[#E6F6EB] text-[#2DB755]";
      case "Medium": return "bg-[#FFF8E6] text-[#FFB800]";
      case "High": case "Hard": return "bg-[#FEECEC] text-[#FF4D4F]";
      default: return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div 
      onClick={() => selectable && onSelect?.(challenge.id.toString())}
      className={`bg-white rounded-xl px-4 py-4 border transition-all mb-3 flex items-center justify-between cursor-pointer
        ${isSelected ? "border-[#7B57E0] ring-1 ring-[#7B57E0]" : "border-gray-100 shadow-sm hover:border-gray-200"}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center ">
            <FileCode className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          {isSelected && (
            <div className="absolute -top-2 -right-2 bg-[#7B57E0] text-white rounded-full">
              <CheckCircle2 size={16} fill="white" className="text-[#7B57E0]" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[15px] text-[#1A1A1A]">{challenge.title}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getDifficultyStyle(challenge.level||"Easy")}`}>
              {challenge.level|| "Easy"}
            </span>
          </div>
          {showDescription && <p className="text-[12px] text-gray-400 font-medium">{challenge.description || "Challenge description..."}</p>}
          <div className="flex items-center gap-4 text-[12px] text-[#A0A0A0] font-semibold mt-0.5">
            <div className="flex items-center gap-1.5"><Trophy size={14} /><span>{challenge.score||100} Score</span></div>
            <div className="flex items-center gap-1.5"><Code2 size={14} /><span>{challenge.language}</span></div>
            <div className="flex items-center gap-1.5"><Tag size={14} /><span>{challenge.topic||"Array"}</span></div>
          </div>
        </div>
      </div>

      {!selectable && (
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#3B82F6]"><User size={18} fill="currentColor" /></button>
          <button className="p-2 text-gray-300"><Star size={18} /></button>
          <button className="p-2 text-gray-300"><MoreVertical size={18} /></button>
        </div>
      )}
    </div>
    
  );
};