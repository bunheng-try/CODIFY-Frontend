import { useState, useMemo } from "react";
import type { Member, AddMemberDto, UserFromApi } from "../apis/member.api";
import { useAddMember, useUserByEmail } from "./useMemberQuery";

export type SelectedStudent = AddMemberDto & { name: string; email: string };

export function useInviteStudent(classroomId: number | null, existingMembers: Member[] = []) {
    const [email, setEmail] = useState("");
    const [selectedStudents, setSelectedStudents] = useState<SelectedStudent[]>([]);

    const { data: users = [], refetch } = useUserByEmail(email.trim() || null);
    const addMember = useAddMember(classroomId);

    const searchResults = useMemo(() => {
        const lower = email.trim().toLowerCase();
        return users
            .filter(u => u.email.toLowerCase().includes(lower))
            .map(u => ({
                userId: Number(u.id),
                name: u.name,
                email: u.email,
                role: "STUDENT" as const,
                alreadySelected: selectedStudents.some(s => s.userId === u.id)
                    || existingMembers.some(m => m.userId === u.id),
            }));
    }, [users, email, selectedStudents, existingMembers]);

    const selectStudent = (student: UserFromApi) => {
        const id = Number(student.id);
        if (!selectedStudents.find(s => s.userId === id)) {
            setSelectedStudents(prev => [
                ...prev,
                { userId: id, role: "STUDENT", name: student.name, email: student.email }
            ]);
        }
    };

    const removeSelectedStudent = (userId: number) => {
        setSelectedStudents(prev => prev.filter(s => s.userId !== userId));
    };

    const updateStudentRole = (userId: number, role: "STUDENT" | "TEACHER") => {
        setSelectedStudents(prev =>
            prev.map(s => (s.userId === userId ? { ...s, role } : s))
        );
    };

    const onInvite = async (): Promise<{ success: boolean; error?: string }> => {
        if (!classroomId) return { success: false, error: "Classroom not selected" };
        if (selectedStudents.length === 0) return { success: false, error: "No student selected" };

        try {
            await addMember.mutateAsync({
                members: selectedStudents.map(s => ({ userId: Number(s.userId), role: s.role }))
            });
            setEmail("");
            setSelectedStudents([]);
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err?.message || "Failed to invite student" };
        }
    };

    const searchByEmail = (value: string) => {
        setEmail(value);
        if (value.trim()) refetch();
    };

    return { email, searchByEmail, searchResults, selectedStudents, selectStudent, removeSelectedStudent, updateStudentRole, onInvite };
}