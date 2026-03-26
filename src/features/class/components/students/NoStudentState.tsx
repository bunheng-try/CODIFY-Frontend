import { GraduationCap } from "lucide-react";

interface EmptyStateProps {
  isFiltered: boolean;
}

export default function NoStudentState({ isFiltered }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <GraduationCap size={30} className="text-gray-400" />
      </div>
      <h3 className="text-base font-bold text-gray-800 mb-1">
        {isFiltered ? "No matching students" : "No students yet"}
      </h3>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        {isFiltered
          ? "Try adjusting your search query to find who you're looking for."
          : "Invite students to your class using the button above or share the class code."}
      </p>
    </div>
  );
}
