import { useState } from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { AddChallengeLibraryModal } from "../components/AddChallengeLibraryModal";
import { useChallenges } from "@/features/challenge/hooks/useChallengeQuery";
import { useAssignmentAddChallenge } from "../hooks/useAssignmentQuery";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { ChallengeCard } from "@/features/challenge/components/ChallengeCard";
import type { Challenge } from "@/features/challenge/apis/challenge.api";



const ChallengeTab = ({ challenges = [] }: { challenges: Challenge[] }) => {
  const [libraryOpen, setLibraryOpen] = useState(false);

  const { assignmentId, classroomId } = useClassroomRoute();
  const { data: libraryChallenges } = useChallenges();
  const { mutate: addChallengeToAssignment } = useAssignmentAddChallenge();

  const addFromLibrary = (selected: Challenge[]) => {
    const ids = selected.map((c) => c.id);
    if (!classroomId || !assignmentId) return;
    addChallengeToAssignment({ classroomId, assignmentId, challengeIds: ids });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Action buttons */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={() => setLibraryOpen(true)}
          className="w-10 h-10 rounded-xl bg-[#7B57E0] flex items-center justify-center text-white shadow-lg shadow-purple-100 transition-all active:scale-95"
        >
          <Plus size={22} strokeWidth={3} />
        </button>
        <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400">
          <EllipsisVertical size={20} />
        </button>
      </div>

      {/* Challenge list */}
      <div className="flex flex-col gap-3">
        {challenges.length > 0 ? (
          challenges.map((c, i) => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              variant="assignment"        // show order number
              index={i + 1}               // order in the assignment
              showDescription={true}       // or false if you want
              onSelect={(id) => console.log("selected challenge", id)}
            />
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl text-gray-300 font-bold">
            No challenges added yet. Click + to get started.
          </div>
        )}
      </div>

      {/* Library modal */}
      <AddChallengeLibraryModal
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onCreateNew={() => console.log("navigate to challenge create")}
        onAddSelected={addFromLibrary}
        libraryChallenges={libraryChallenges || []}
      />
    </div>
  );
};

export default ChallengeTab;