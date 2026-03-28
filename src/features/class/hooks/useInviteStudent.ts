import { useState, useMemo } from "react";
import type { Member, AddMemberDto, UserFromApi } from "../apis/member.api";
import { useAddMember, useUserByEmail } from "./useMemberQuery";

export type SelectedStudent = {
    userId: number;
    role: "STUDENT" | "TEACHER";
    name: string;
    email: string;
};

export type SearchStudentResult = {
    id: number;
    name: string;
    email: string;
    alreadySelected: boolean;
};

export function useInviteStudent(
    classroomId: number | null,
    existingMembers: Member[] = []
) {
    const [email, setEmail] = useState("");
    const [selectedStudents, setSelectedStudents] = useState<SelectedStudent[]>([]);

    const { data: users = [] } = useUserByEmail(email.trim() || null);
    const addMember = useAddMember(classroomId);

    const searchResults = useMemo<SearchStudentResult[]>(() => {
        const lower = email.trim().toLowerCase();

        return users
            .filter((u) => u.email.toLowerCase().includes(lower))
            .map((u) => ({
                id: u.id,
                name: u.name,
                email: u.email,
                alreadySelected:
                    selectedStudents.some((s) => s.userId === u.id) ||
                    existingMembers.some((m) => m.userId === u.id),
            }));
    }, [users, email, selectedStudents, existingMembers]);

    const selectStudent = (student: SearchStudentResult) => {
        if (!selectedStudents.find((s) => s.userId === student.id)) {
            setSelectedStudents((prev) => [
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

    const removeSelectedStudent = (userId: number) => {
        setSelectedStudents((prev) => prev.filter((s) => s.userId !== userId));
    };

    const updateStudentRole = (userId: number, role: "STUDENT" | "TEACHER") => {
        setSelectedStudents((prev) =>
            prev.map((s) => (s.userId === userId ? { ...s, role } : s))
        );
    };

    const onInvite = async (): Promise<{ success: boolean; error?: string }> => {
        if (!classroomId) {
            return { success: false, error: "Classroom not selected" };
        }

        if (selectedStudents.length === 0) {
            return { success: false, error: "No student selected" };
        }

        try {
            await addMember.mutateAsync({
                members: selectedStudents.map((s) => ({
                    userId: s.userId,
                    role: s.role,
                })),
            });

            setEmail("");
            setSelectedStudents([]);
            return { success: true };
        } catch (err: any) {
            return {
                success: false,
                error: err?.message || "Failed to invite student",
            };
        }
    };

    const searchByEmail = (value: string) => {
        setEmail(value);
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
    };
}