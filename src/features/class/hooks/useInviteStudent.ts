import { useState, useMemo } from "react";
import type { Member, UserFromApi, AddMemberDto } from "../apis/member.api";
import { useAddMember, useUserByEmail } from "./useMemberQuery";

export type SelectedStudent = AddMemberDto & { name: string; email: string };

export function useInviteStudent(classroomId: number | null, existingMembers: Member[] = []) {
    const [email, setEmail] = useState("");
    const [selectedStudents, setSelectedStudents] = useState<SelectedStudent[]>([]);

    // Fetch users by email
    const { data: users = [], refetch } = useUserByEmail(email.trim() || null);

    // Map and filter users for search results
    const searchResults = useMemo(() => {
        const lowerEmail = email.toLowerCase().trim();
        return users
            .filter(u => u.email.toLowerCase().includes(lowerEmail))
            .map(u => ({
                userId: u.id,
                name: u.name,
                email: u.email,
                role: "STUDENT" as const,
                alreadySelected:
                    selectedStudents.some(s => s.userId === u.id) ||
                    existingMembers.some(m => m.userId === u.id),
            }));
    }, [users, email, selectedStudents, existingMembers]);

    // Mutation hook (called at top-level, not inside functions)
    const addMember = useAddMember(classroomId);

    // Select a student
    const selectStudent = (student: UserFromApi) => {
        const alreadySelected =
            selectedStudents.some(s => s.userId === student.id) ||
            existingMembers.some(m => m.userId === student.id);

        if (!alreadySelected) {
            setSelectedStudents(prev => [
                ...prev,
                {
                    userId: student.id,
                    role: "STUDENT",
                    name: student.name,
                    email: student.email,
                },
            ]);
        }
    };

    // Remove from selection
    const removeSelectedStudent = (userId: number) => {
        setSelectedStudents(prev => prev.filter(s => s.userId !== userId));
    };

    // Update role for a selected student
    const updateStudentRole = (userId: number, role: "STUDENT" | "TEACHER") => {
        setSelectedStudents(prev =>
            prev.map(s => (s.userId === userId ? { ...s, role } : s))
        );
    };

    // Invite selected students
    const onInvite = async (): Promise<{ success: boolean; error?: string }> => {
        if (!classroomId) return { success: false, error: "Classroom not selected" };
        if (selectedStudents.length === 0) return { success: false, error: "No student selected" };

        try {
            await addMember.mutateAsync({
                members: selectedStudents.map(s => ({ userId: Number(s.userId), role: s.role })),
            });
            setEmail(""); // clear input
            setSelectedStudents([]); // clear selection
            return { success: true };
        } catch (err: any) {
            console.error("Invite failed:", err);
            return { success: false, error: err?.message || "Failed to invite student" };
        }
    };

    // Handle typing in email input
    const searchByEmail = (value: string) => {
        setEmail(value);
        if (value.trim()) refetch();
    };

    // Reset everything (call when dialog closes)
    const resetAll = () => {
        setEmail("");
        setSelectedStudents([]);
    };

    return {
        email,
        searchByEmail,
        searchResults,
        selectedStudents,
        selectStudent,
        removeSelectedStudent,
        updateStudentRole,
        onInvite,
        resetAll,
    };
}