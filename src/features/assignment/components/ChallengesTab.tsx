import { useState } from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { ChallengeCard } from "../components/ChallengeItemCard";
import { AddChallengeLibraryModal } from "../components/AddChallengeLibraryModal";
import type { Challenge } from "../types/assignment";
import { useChallenges } from "@/features/challenge/hooks/useChallengeQuery";
import { useAssignmentAddChallenge } from "../hooks/useAssignmentQuery";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { useClassroomRole } from "@/features/classes/hooks/useClassroomRole";

const ChallengeTab = ({ challenges = [] }: { challenges: Challenge[] }) => {
  const [libraryOpen, setLibraryOpen] = useState(false);

  const { assignmentId, classroomId } = useClassroomRoute();
  const { data: roleData } = useClassroomRole(classroomId);
  const isAdmin = roleData?.role === "ADMIN";

  const { data: challenge } = useChallenges();
  const { mutate: addChallengeToAssignment } = useAssignmentAddChallenge();

  const addFromLibrary = (selected: Challenge[]) => {
    const ids = selected.map((c) => c.id);
    if (!classroomId || !assignmentId) return;
    addChallengeToAssignment({ classroomId, assignmentId, challengeIds: ids });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {isAdmin && (
        <div className="flex justify-end gap-2 mb-6">
          <button onClick={() => setLibraryOpen(true)} className="w-10 h-10 rounded-xl bg-[#7B57E0] flex items-center justify-center text-white shadow-lg shadow-purple-100 transition-all active:scale-95">
            <Plus size={22} strokeWidth={3} />
          </button>
          <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400">
            <EllipsisVertical size={20} />
          </button>
        </div>
      )}

      <div className="flex flex-col">
        {challenges.length > 0 ? (
          challenges.map((c) => <ChallengeCard key={c.id} challenge={c} />)
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl text-gray-300 font-bold">
            {isAdmin
              ? "No challenges added yet. Click + to get started."
              : "No challenges available yet."}
          </div>
        )}
      </div>

      {isAdmin && (
        <AddChallengeLibraryModal
          isOpen={libraryOpen}
          onClose={() => setLibraryOpen(false)}
          onCreateNew={() => { console.log("navigate to challenge create") }}
          onAddSelected={addFromLibrary}
          libraryChallenges={challenge || []}
        />
      )}

    </div>
  );
};

export default ChallengeTab;