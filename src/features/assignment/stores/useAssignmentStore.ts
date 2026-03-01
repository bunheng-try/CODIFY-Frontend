import { create } from "zustand";

interface AssignmentState {
  selectedAssignmentId: number | null;
  setSelectedAssignmentId: (id: number | null) => void;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
  selectedAssignmentId: null,
  setSelectedAssignmentId: (id) =>
    set({ selectedAssignmentId: id }),
}));