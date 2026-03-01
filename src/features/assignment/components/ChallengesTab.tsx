import { useState } from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { ChallengeCard } from "../components/ChallengeItemCard";
import { AddChallengeLibraryModal } from "../components/AddChallengeLibraryModal";
import { AddNewChallengeModal } from "../components/AddNewChallengeModal";
import type { Challenge } from "../types/assignment";


const LIBRARY_MOCK: Challenge[] = [
  { id: 'L1', title: 'Binary Search', level: 'Medium', score: '20', language: 'C++', topic: 'Algorithms', description: 'Implement recursive binary search.', author: 'Admin', date: new Date() },
  { id: 'L2', title: 'Two Sum', level: 'Easy', score: '10', language: 'Python', topic: 'Array', description: 'Find two indices that sum to target.', author: 'Admin', date: new Date() },
  { id: 'L3', title: 'N-Queens', level: 'High', score: '50', language: 'Java', topic: 'Backtracking', description: 'Solve the classical N-Queens problem.', author: 'Admin', date: new Date() },
];

interface ChallengeTabProps {
  assignmentId: number;
}


const ChallengeTab = ({assignmentId}: ChallengeTabProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const addFromLibrary = (selected: Challenge[]) => {
    const existingIds = challenges.map(c => c.id);
    const newOnes = selected.filter(s => !existingIds.includes(s.id));
    setChallenges(prev => [...prev, ...newOnes]);
  };

  const createNew = (challenge: Challenge) => {
    setChallenges(prev => [...prev, challenge]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex justify-end gap-2 mb-6">
        <button onClick={() => setLibraryOpen(true)} className="w-10 h-10 rounded-xl bg-[#7B57E0] flex items-center justify-center text-white shadow-lg shadow-purple-100 transition-all active:scale-95">
          <Plus size={22} strokeWidth={3} />
        </button>
        <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400"><EllipsisVertical size={20} /></button>
      </div>

      <div className="flex flex-col">
        {challenges.length > 0 ? (
          challenges.map((c) => <ChallengeCard key={c.id} challenge={c} />)
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl text-gray-300 font-bold">
            No challenges added yet. Click + to get started.
          </div>
        )}
      </div>

      <AddChallengeLibraryModal
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onCreateNew={() => { setLibraryOpen(false); setCreateOpen(true); }}
        onAddSelected={addFromLibrary}
        libraryChallenges={LIBRARY_MOCK}
      />

      <AddNewChallengeModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onAdd={createNew}
      />
    </div>
  );
};

export default ChallengeTab;