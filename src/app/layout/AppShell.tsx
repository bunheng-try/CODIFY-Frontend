import { Outlet, useNavigate } from "react-router-dom";
import { LeftBar } from "./leftBar/LeftBar";
import { useUnsavedChangesStore } from "@/shared/store/UnsavedChangesStore";
import { ConfirmDialog } from "@/shared/components/design/dialog";
import { useState } from "react";
import { CreateClassDialog } from "@/features/classes/components/CreateClassDialog";
import { useClassroomActions } from "@/features/classes/hooks/useClassroomAction";

export const AppShell = () => {
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);
  const { createClassroom } = useClassroomActions();

  const {
    dialogOpen,
    setDialogOpen,
    pendingPath,
    setPendingPath,
    setHasUnsavedChanges,
  } = useUnsavedChangesStore();

  const handleStay = () => {
    setDialogOpen(false);
    setPendingPath(null);
  };

  const handleLeave = () => {
    setDialogOpen(false);

    const path = pendingPath;

    setPendingPath(null);
    setHasUnsavedChanges(false);

    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <LeftBar onOpenCreateClass={() => setOpenCreate(true)} />

      <Outlet context={{ openCreateClass: () => setOpenCreate(true) }} />

      <ConfirmDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) handleStay();
        }}
        title="Unsaved Changes"
        confirmText="Leave"
        cancelText="Stay"
        onConfirm={handleLeave}
      >
        <p>
          You have unsaved changes. If you leave now, your edits will be lost.
        </p>
      </ConfirmDialog>

      <CreateClassDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={createClassroom}
      />
    </div>
  );
};