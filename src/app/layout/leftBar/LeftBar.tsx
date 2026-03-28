import { useEffect, useState } from "react"
import { Plus, Library } from "lucide-react"
import { useLocation } from "react-router-dom"

import { LeftBarButton } from "./LeftBarButton"
import { CreateClassDialog } from "@/features/classes/components/CreateClassDialog"
import { useClassrooms } from "@/features/classes/hooks/useClassroomQuery"
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute"
import { LeftBarClasses } from "@/features/classes/components/LeftBarClasses"
import { useClassroomActions } from "@/features/classes/hooks/useClassroomAction"
import { LeftBarClassesSkeleton } from "@/features/classes/components/LeftBarClassesSkeleton"
import { LeftBarClassesError } from "@/features/classes/components/emptyState/LeftBarClassesError"
import { ConfirmDialog } from "@/shared/components/design/dialog"
import { EditClassDialog } from "@/features/classes/components/EditClassDialog"
import { UserProfileDropdown } from "@/features/auth/components/UserProfileDropdown"
import { useAuthStore } from '@/app/store/autStore';
import { useGuardedNavigate } from "@/shared/hooks/useGuardedNavigated"
import { LeftBarClassesEmpty } from "@/features/classes/components/emptyState/LeftBarEmpty"

interface LeftBarProps {
  onOpenCreateClass: () => void;
}

export function LeftBar({ onOpenCreateClass }: LeftBarProps) {
  const navigate = useGuardedNavigate();
  const location = useLocation();
  const isLibraryActive = location.pathname.startsWith("/challenge-library");
  const { classroomId } = useClassroomRoute()
  const { data: classes = [], isLoading, isError, refetch } = useClassrooms()
  const [openCreate, setOpenCreate] = useState(false)
  const { createClassroom, deleteClassroom, editClassroom } = useClassroomActions();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [classToDelete, setClassToDelete] = useState<number | null>(null)
  const currentUser = useAuthStore((s) => s.user);
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
      <aside className="flex h-full w-16 flex-col border-r border-border bg-card items-center">

        {isLoading ? (
          <LeftBarClassesSkeleton />
        ) : isError ? (
          <LeftBarClassesError onRetry={refetch} />
          ) : classes.length == 0 ?(
          <LeftBarClassesEmpty />
        ) : (
          <LeftBarClasses
            classes={classes}
            selectedClassroomId={classroomId}
            onDelete={handleOpenDelete}
            onEdit={handleEdit}
          />
        )}

      
        <div className="flex flex-col gap-1 py-2 items-center justify-end w-full">
          <LeftBarButton
            icon={<Plus className="h-5 w-5" />}
            tooltip="Create class"
            onClick={onOpenCreateClass}
          />
          <LeftBarButton
            icon={<Library className="h-5 w-5" />}
            tooltip="Exercise library"
            onClick={() => navigate('challenge-library')}
            active={isLibraryActive}
          />
          <UserProfileDropdown bgColor={currentUser?.profile.color || "var(--primary)"}/>
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