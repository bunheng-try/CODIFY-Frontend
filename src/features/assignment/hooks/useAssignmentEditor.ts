import { useState, useEffect } from "react";
import {
    useAssignment,
    useUpdateAssignment,
    usePublishAssignment,
    useUnPublishAssignment,
    useDeleteAssignment,
} from "./useAssignmentQuery";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";

export const useAssignmentEditor = () => {
    const { classroomId, assignmentId } = useClassroomRoute();

    const { data: assignment, isLoading } = useAssignment(
        classroomId || null,
        assignmentId || null
    );

    const updateMutation = useUpdateAssignment();
    const publishMutation = usePublishAssignment();
    const unpublishMutation = useUnPublishAssignment();
    const deleteMutation = useDeleteAssignment();

    const [title, setTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (assignment) setTitle(assignment.title);
    }, [assignment]);

    const saveTitle = () => {
        if (!assignment || !classroomId) return;

        updateMutation.mutate({
            classroomId,
            assignmentId: assignment.id,
            dto: { title },
        });
    };

    const publish = () => {
        if (!assignment || !classroomId) return;

        publishMutation.mutate({
            classroomId,
            assignmentId: assignment.id,
        });
    };

    const unpublish = () => {
        if (!assignment || !classroomId) return;

        unpublishMutation.mutate({
            classroomId,
            assignmentId: assignment.id,
        });
    };

    const deleteAssignment = () => {
        if (!assignment || !classroomId) return;

        deleteMutation.mutate({
            classroomId,
            assignmentId: assignment.id,
        });
    };

    return {
        assignment,
        isLoading,
        title,
        setTitle,
        isEditing,
        setIsEditing,
        saveTitle,
        publish,
        unpublish,
        deleteAssignment,
    };
};