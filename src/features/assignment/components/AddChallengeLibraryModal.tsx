import { useState } from "react";
import { Search, ChevronDown, X, Plus } from "lucide-react";
import type { Challenge } from "../types/assignment";
import { ChallengeCard } from "@/features/challenge/components/ChallengeCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateNew: () => void;
  onAddSelected: (challenges: Challenge[]) => void;
  libraryChallenges: Challenge[];
}


export const AddChallengeLibraryModal = ({ 
  isOpen, 
  onClose, 
  onCreateNew, 
  onAddSelected, 
  libraryChallenges 
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  if (!isOpen) return null;

  // Filter Logic
  const filtered = libraryChallenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLevel === "All" || c.level === filterLevel;
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

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-8 pb-2">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h2 className="text-[28px] font-bold text-[#1A1A1A]">Add Challenge</h2>
              <p className="text-gray-400 text-[15px] mt-1">
                Create a new coding challenge for this assignment.
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="bg-[#7B57E0] rounded-xl p-4 flex items-center justify-between text-white mt-6 mb-5 shadow-lg shadow-purple-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-white/30 rounded-lg flex items-center justify-center">
                <Plus size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-[15px]">Or Create a New Challenge</p>
                <p className="text-white/70 text-[12px] font-medium">
                  Create new question by yourself without import from the library
                </p>
              </div>
            </div>
            <button 
              onClick={onCreateNew} 
              className="bg-white text-[#7B57E0] px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Create
            </button>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Question..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7B57E0] transition-all placeholder:text-gray-400" 
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
        </div>
        <div className="flex-1 overflow-y-auto px-8 pb-6 space-y-3">
          {filtered.length > 0 ? (
            filtered.map(c => (
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
        <div className="p-6 px-8 border-t border-gray-50 flex justify-end gap-3 bg-white">
          <button 
            onClick={onClose} 
            className="px-8 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            disabled={selectedIds.length === 0}
            onClick={handleConfirm}
            className={`px-8 py-3 rounded-xl font-bold text-sm text-white transition-all
              ${selectedIds.length > 0 
                ? "bg-[#7B57E0] hover:bg-[#6847c9] shadow-lg shadow-purple-100" 
                : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Add Challenge {selectedIds.length > 0 && `(${selectedIds.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};