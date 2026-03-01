import { GraduationCapIcon } from "lucide-react";
import { ClassroomBadge } from "../components/ClassesBadge";
import type { Classroom } from "../types/classroom";
import { useClassroomLeftBar } from "../hooks/useMemberQuery";
import { useNavigate } from "react-router-dom";


export const ClassroomLeftBar = () => {
  const navigate = useNavigate();
  const {
    classrooms,
    selectedClassroomId,
    isLoading,
    isError,
  } = useClassroomLeftBar();

  if (isLoading) return <div className="w-20 bg-[#2d3748] h-screen" />;
  if (isError) return null;

  return (
    <aside className="w-20 h-screen bg-[#1f2937] border-r border-white/10 flex flex-col items-center py-4">
      <div className="mb-2 p-3 bg-[#1a202c] rounded-2xl text-white">
        <GraduationCapIcon size={28} />
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide scroll-smooth">
        {classrooms.map((classroom: Classroom) => (
          <ClassroomBadge
            key={classroom.id}
            classroom={classroom}
            isActive={selectedClassroomId === classroom.id}
            onClick={(id) => navigate(`/classrooms/${id}`)}
          />
        ))}
      </div>
    </aside>
  );
};
