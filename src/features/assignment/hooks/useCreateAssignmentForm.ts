import { useState } from "react";
import { useCreateAssignment } from "./useAssignmentQuery";
// import { useAssignmentUIStore } from "../stores/useAssignmentStore";
import type { CreateAssignmentDto } from "../apis/assignment.api";

export const useCreateAssignmentForm = (classroomId: number) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const {
    mutate: createAssignment,
    isPending,
    isError,
  } = useCreateAssignment(classroomId);

  const handleSubmit = async (onSuccessCallback?: () => void) => {
    if (title.trim().length < 2) {
      setError("Title must be at least 2 characters.");
      return;
    }

    const dto: CreateAssignmentDto = {
      classroomId,
      title,
      description,
      dueAt: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toISOString(),
      position: 0,
    };

    try {
      await createAssignment(dto);
      setTitle("");
      setDescription("");
      onSuccessCallback?.();
    } catch (err: any) {
      setError(err?.message || "Failed to create assignment.");
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    error,
    isLoading: isPending,
    isError,
    setError,
    handleSubmit,
  };
};