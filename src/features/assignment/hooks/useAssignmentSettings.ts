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
  const { date: initDate, time: initTime } = parseDateTime(assignment.dueAt);

  const [dueDate, setDueDate] = useState(initDate);
  const [timeDue, setTimeDue] = useState(initTime || DEFAULT_TIME);
  const [points, setPoints] = useState<number | null>(assignment.points ?? null);
  const [description, setDescription] = useState(assignment.description || "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const { date, time } = parseDateTime(assignment.dueAt);

    setDueDate(date);
    setTimeDue(time || DEFAULT_TIME);
    setPoints(assignment.points ?? null);
    setDescription(assignment.description || "");
  }, [assignment]);

  const combineDateTimeToISO = (date: string, time: string) => {
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);

    const d = new Date(year, month - 1, day, hours, minutes);

    return d.toISOString();
  };

  const handleSave = () => {
    return {
      title: assignment.title,
      description: description || assignment.description,
      dueAt:
        dueDate && timeDue
          ? combineDateTimeToISO(dueDate, timeDue)
          : assignment.dueAt,
      points: points ?? undefined,
    };
  };

  const handleCancel = () => {
    const { date, time } = parseDateTime(assignment.dueAt);

    setDueDate(date);
    setTimeDue(time || DEFAULT_TIME);
    setPoints(assignment.points ?? null);
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
    points,
    setPoints,
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