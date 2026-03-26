// shared/store/unsavedChangesStore.ts
import { create } from "zustand";

type UnsavedChangesState = {
    hasUnsavedChanges: boolean;
    pendingPath: string | null;
    dialogOpen: boolean;
    setHasUnsavedChanges: (value: boolean) => void;
    setPendingPath: (path: string | null) => void;
    setDialogOpen: (open: boolean) => void;
    reset: () => void;
};

export const useUnsavedChangesStore = create<UnsavedChangesState>((set) => ({
    hasUnsavedChanges: false,
    pendingPath: null,
    dialogOpen: false,

    setHasUnsavedChanges: (value) => {
        console.log("[STORE] setHasUnsavedChanges:", value);
        set({ hasUnsavedChanges: value });
    },

    setPendingPath: (path) => {
        console.log("[STORE] setPendingPath:", path);
        set({ pendingPath: path });
    },

    setDialogOpen: (open) => {
        console.log("[STORE] setDialogOpen:", open);
        set({ dialogOpen: open });
    },

    reset: () => {
        console.log("[STORE] reset");
        set({
            hasUnsavedChanges: false,
            pendingPath: null,
            dialogOpen: false,
        });
    },
}));