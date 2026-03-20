import { ConfirmDialog } from "@/shared/components/design/dialog";
import { CreateAssignmentDialog } from "@/features/assignment/components/CreateAssignmentDialog";
import { EditClassDialog } from "@/features/classes/components/EditClassDialog";
import type { Dispatch, SetStateAction } from "react";

interface ClassroomDialogsProps {
    confirmDeleteOpen: boolean;
    setConfirmDeleteOpen: Dispatch<SetStateAction<boolean>>;
    confirmLeaveOpen: boolean;
    setConfirmLeaveOpen: Dispatch<SetStateAction<boolean>>;
    openEdit: boolean;
    setOpenEdit: Dispatch<SetStateAction<boolean>>;
    openCreate: boolean;
    setOpenCreate: Dispatch<SetStateAction<boolean>>;
    classToDelete: number | null;
    deleteClassroom: (id: number) => void;
    leaveClassroom: (
        classroomId: number,
        options?: { onSuccess?: () => void; onError?: (e: any) => void }
    ) => void;
    classroomId: number;
    selectedClass: { id: number; name: string } | null;
    editClassroom: (id: number, newName: string) => void;
    navigate: (path: string) => void;
}

export function ClassroomDialogs({
    confirmDeleteOpen,
    setConfirmDeleteOpen,
    confirmLeaveOpen,
    setConfirmLeaveOpen,
    openEdit,
    setOpenEdit,
    openCreate,
    setOpenCreate,
    classToDelete,
    deleteClassroom,
    leaveClassroom,
    classroomId,
    selectedClass,
    editClassroom,
    navigate,
}: ClassroomDialogsProps) {
    return (
        <>
            <ConfirmDialog
                open={confirmDeleteOpen}
                onOpenChange={setConfirmDeleteOpen}
                title="Are you sure you want to delete this class?"
                onConfirm={() => {
                    if (classToDelete) {
                        deleteClassroom(classToDelete);
                    }
                }}
                confirmText="Delete"
                cancelText="Cancel"
            >
                <p>This action cannot be undone.</p>
            </ConfirmDialog>

            <ConfirmDialog
                open={confirmLeaveOpen}
                onOpenChange={setConfirmLeaveOpen}
                title="Leave Classroom"
                onConfirm={() => {
                    leaveClassroom(classroomId, {
                        onSuccess: () => navigate("/"),
                    });
                }}
                confirmText="Leave"
                cancelText="Cancel"
            >
                <p>Are you sure you want to leave this classroom?</p>
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

            {classroomId && (
                <CreateAssignmentDialog
                    open={openCreate}
                    onOpenChange={setOpenCreate}
                    classroomId={classroomId}
                />
            )}
        </>
    );
}