import { useState } from "react";
import { useCreateAssignment } from "./useAssignmentQuery";
// import { useAssignmentUIStore } from "../stores/useAssignmentStore";
import type { CreateAssignmentDto } from "../apis/assignment.api";

export const useCreateAssignmentForm = (classroomId: number) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const { setCreateDialogOpen } = useAssignmentUIStore();

  const {
    mutate: createAssignment,
    isPending,
    isError,
  } = useCreateAssignment(classroomId);

  const handleSubmit = (onSuccessCallback?: () => void) => {
    if (!title.trim()) return;

    const dto: CreateAssignmentDto = {
      classroomId,
      title,
      description,
      dueAt: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toISOString(),
      position: 0,
    };

    createAssignment(dto, {
      onSuccess: () => {
        setTitle("");
        setDescription("");
        onSuccessCallback?.();
      },
    });
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    isLoading: isPending,
    isError,
    handleSubmit,
  };
};