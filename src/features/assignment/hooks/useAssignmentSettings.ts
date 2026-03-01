import { useState, useEffect } from "react";
import type { Assignment } from "../apis/assignment.api";

const DEFAULT_TIME = "23:59";

const parseDateTime = (iso?: string) => {
  if (!iso) return { date: "", time: DEFAULT_TIME };

  const d = new Date(iso);

  const date = d.toISOString().split("T")[0];
  const time = d.toTimeString().slice(0, 5);

  return { date, time };
};

export const useAssignmentSettings = (assignment: Assignment) => {
  const { date: initDate, time: initTime } = parseDateTime(
    assignment.dueAt
  );

  const [dueDate, setDueDate] = useState(initDate);
  const [timeDue, setTimeDue] = useState(initTime || DEFAULT_TIME);
  // const [points, setPoints] = useState(
  //   assignment.points != null ? String(assignment.points) : ""
  // );
  const [description, setDescription] = useState(
    assignment.description || ""
  );

  useEffect(() => {
    const { date, time } = parseDateTime(assignment.dueAt);

    setDueDate(date);
    setTimeDue(time || DEFAULT_TIME);
    // setPoints(assignment.points != null ? String(assignment.points) : "");
    setDescription(assignment.description || "");
  }, [assignment]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSave = () => {
    const updated = {
      dueDate:
        dueDate && timeDue
          ? `${dueDate}T${timeDue}:00`
          : assignment.dueAt,
      // points: points ? Number(points) : assignment.points,
      description: description || assignment.description,
    };

    return updated;
  };

  const handleCancel = () => {
    const { date, time } = parseDateTime(assignment.dueAt);

    setDueDate(date);
    setTimeDue(time || DEFAULT_TIME);
    // setPoints(assignment.points != null ? String(assignment.points) : "");
    setDescription(assignment.description || "");
  };

  const handleDeleteRequest = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleted assignment:", assignment.id);
    setShowDeleteDialog(false);
  };

  return {
    dueDate,
    setDueDate,
    timeDue,
    setTimeDue,
    // points,
    // setPoints,
    description,
    setDescription,
    showDeleteDialog,
    setShowDeleteDialog,
    handleSave,
    handleCancel,
    handleDeleteRequest,
    handleDeleteConfirm,
  };
};
