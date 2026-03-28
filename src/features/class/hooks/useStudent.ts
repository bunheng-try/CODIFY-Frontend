import { useState, useMemo } from "react";
import type { Member } from "../apis/member.api";
import { useMembers, useUserByEmail } from "./useMemberQuery";
import { useAddMember, useRemoveMember } from "./useMemberQuery";

export type FilterBy = "all" | "name" | "email";

export function useStudents(classroomId: number | null) {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState<FilterBy>("all");

  // Use React Query to fetch members
  const { data: students = [], isLoading, error } = useMembers(classroomId);

  // Filtered students
  const filtered = useMemo(
    () =>
      students.filter((s) => {
        const lowerSearch = search.toLowerCase();
        if (filterBy === "name") return s.name.toLowerCase().includes(lowerSearch);
        if (filterBy === "email") return s.email.toLowerCase().includes(lowerSearch);
        return (
          s.name.toLowerCase().includes(lowerSearch) ||
          s.email.toString().includes(lowerSearch)
        );
      }),
    [students, search, filterBy]
  );

  // Mutations
  const addStudent = useAddMember(classroomId);
  const removeStudent = useRemoveMember(classroomId);

  // Export students as CSV
  const exportStudents = () => {
    const csv = ["Student,ID", ...students.map((s) => `${s.name},${s.userId}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    students,
    filtered,
    isLoading,
    error,
    search,
    setSearch,
    filterBy,
    setFilterBy,
    addStudent,
    removeStudent,
    exportStudents,
  };
}