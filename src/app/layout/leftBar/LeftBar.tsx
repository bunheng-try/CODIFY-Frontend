import { useState } from "react"
import { Plus, Library, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { LeftBarButton } from "./LeftBarButton"
import { CreateClassDialog } from "@/features/classes/components/CreateClassDialog"
import { useClassrooms } from "@/features/classes/hooks/useClassroomQuery"
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute"
import { LeftBarClasses } from "@/features/classes/components/LeftBarClasses"
import { useClassroomActions } from "@/features/classes/hooks/useClassroomAction"
import { LeftBarClassesSkeleton } from "@/features/classes/components/LeftBarClassesSkeleton"
import { LeftBarClassesError } from "@/features/classes/components/LeftBarClassesError"
import { ConfirmDialog } from "@/shared/components/design/dialog"
import { EditClassDialog } from "@/features/classes/components/EditClassDialog"
import { useClassroomRole } from "@/features/classes/hooks/useClassroomRole"

export function LeftBar() {
  const navigate = useNavigate()
  const { classroomId } = useClassroomRoute()
  const { data: classes = [], isLoading, isError, refetch } = useClassrooms()
  const [openCreate, setOpenCreate] = useState(false)
  const { createClassroom, deleteClassroom, editClassroom } = useClassroomActions();
  const { data: roleData } = useClassroomRole(classroomId ?? 0)
  const isAdmin = roleData?.role === "ADMIN"
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [classToDelete, setClassToDelete] = useState<number | null>(null)

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedClass, setSelectedClass] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleEdit = (classroomId: number) => {
    const cls = classes.find((c) => c.id === classroomId);
    if (!cls) return;
    setSelectedClass({ id: classroomId, name: cls.name });
    setOpenEdit(true);
  };

  const handleOpenDelete = (id: number) => {
    setClassToDelete(id)
    setConfirmDeleteOpen(true)
  }

  return (
    <>
      <aside className="flex h-full w-16 flex-col border-r border-border bg-card">
        {classes.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 px-2 py-4 text-center text-sm text-[hsl(var(--muted-foreground))]">
            <p>No classes available</p>
          </div>
        )}

        {isLoading ? (
          <LeftBarClassesSkeleton />
        ) : isError ? (
          <LeftBarClassesError onRetry={refetch} />
        ) : (
          <LeftBarClasses
            classes={classes}
            selectedClassroomId={classroomId}
            onDelete={handleOpenDelete}
            onEdit={handleEdit}
          />
        )}

        <div className="flex-1" />

      
        <div className="flex flex-col gap-1 px-2 py-2">
          {isAdmin && (
            <LeftBarButton
              icon={<Plus className="h-5 w-5" />}
              tooltip="Create class"
              onClick={() => setOpenCreate(true)}
            />
          )}
          {isAdmin && (
            <LeftBarButton
              icon={<Library className="h-5 w-5" />}
              tooltip="Exercise library"
              onClick={() => navigate('challenge-library')}
            />
          )}
          <LeftBarButton
            icon={<User className="h-5 w-5 text-primary" />}
            tooltip="Profile"
          />
        </div>
      </aside>

      <CreateClassDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={createClassroom}
      />
      <ConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Are you sure you want to delete this class?"
        onConfirm={() => {
          if (classToDelete) {
            deleteClassroom(classToDelete);
            setClassToDelete(null);
            setConfirmDeleteOpen(false);
          }
        }}
        confirmText="Delete"
        cancelText="Cancel"
      >
        <p>This action cannot be undone.</p>
      </ConfirmDialog>
      <EditClassDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        initialName={selectedClass?.name || ""}
        onConfirm={(newName) => {
          if (!selectedClass) return;
          editClassroom(selectedClass.id, newName);
        }}
      />
    </>
  );
}