import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import type { Challenge } from "@/features/challenge/apis/challenge.api";
import { CustomDialog } from "@/shared/components/design/dialog/CustomDialog";
import { ChallengeCard } from "@/features/challenge/components/ChallengeCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateNew?: () => void;
  onAddSelected: (challenges: Challenge[]) => void;
  libraryChallenges: Challenge[];
}


export const AddChallengeLibraryModal = ({ 
  isOpen, 
  onClose, 
  onAddSelected, 
  libraryChallenges 
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  if (!isOpen) return null;

  const filtered = libraryChallenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLevel === "All" || c.difficulty === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selected = libraryChallenges.filter(c => selectedIds.includes(c.id));

    if (selected.length > 0) {
      onAddSelected(selected);
    }

    onClose();
  }

  const bodyContent = (
    <div className="space-y-4">
      {/* Create new challenge
      <div className="bg-[#7B57E0] rounded-xl p-4 flex items-center justify-between text-white shadow-lg shadow-purple-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/30 rounded-lg flex items-center justify-center">
            <Plus size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="typo-body-strong">Or Create a New Challenge</p>
            <p className="typo-body-sm text-white/70">
              Create new question by yourself without importing from the library
            </p>
          </div>
        </div>
        <button
          onClick={onCreateNew}
          className="bg-white text-[#7B57E0] px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
        >
          Create
        </button>
      </div> */}

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 typo-body border border-[hsl(var(--border))] rounded-xl outline-none
          bg-[hsl(var(--surface))]
          text-[hsl(var(--foreground))]
          placeholder:text-[hsl(var(--muted-foreground))]
          focus:border-[hsl(var(--primary))]
          focus:ring-2 focus:ring-[hsl(var(--ring)/0.2)]
          transition-all"
          />
        </div>

        <div className="relative">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white cursor-pointer focus:outline-none"
          >
            <option value="All">Filtering</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>
      </div>

      {/* Challenge List */}
      <div className="flex-1 overflow-y-auto max-h-80 space-y-3">
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              showDescription
              isSelected={selectedIds.includes(c.id)}
              onSelect={toggleSelect}
            />
            
          ))
        ) : (
          <div className="py-10 text-center text-gray-400">No challenges found matching your search.</div>
        )}
      </div>
    </div>
  );

  type ActionButton = {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "destructive" | "ghost";
    disabled?: boolean;
  };

  const actionButtons: ActionButton[] = [
    {
      label: "Cancel",
      onClick: onClose,
      variant: "ghost",
    },
    {
      label: `Add Challenge${selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}`,
      onClick: handleConfirm,
      variant: "primary",
      disabled: selectedIds.length === 0,
    },
  ];

  return (
    <CustomDialog
      open={isOpen}
      onCancel={onClose}
      title="Add Challenge"
      bodyContent={bodyContent}
      actionButtons={actionButtons}
      className="max-w-2xl"
    />
  );
};