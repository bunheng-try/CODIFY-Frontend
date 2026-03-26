import type { Member } from "../../apis/member.api";
import StudentRow from "../students/Studentrow";
import EmptyState from "./NoStudentState";

interface StudentTableProps {
  students: Member[];
  isFiltered: boolean;
  onRemove: (student: Member) => void;
}

export default function StudentTable({ students, isFiltered, onRemove }: StudentTableProps) {
  return (
    <div>
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_3fr_2fr_1fr] px-4 py-3 bg-[hsl(var(--surface-muted))] border-b border-[hsl(var(--border))]">
          <span className="typo-table-header">Student</span>
          <span className="typo-table-header">Email</span>
          <span className="typo-table-header">Role</span>
          <span className="typo-table-header">Action</span>
        </div>

        {students.length === 0 ? (
          <EmptyState isFiltered={isFiltered} />
        ) : (
          students.map((student, i) => (
            <StudentRow
              key={student.id}
              student={student}
              isLast={i === students.length - 1}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}