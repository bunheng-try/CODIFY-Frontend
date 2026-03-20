import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PanelHeader } from "@/shared/components/design/PanelHeader";
import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import { AssignmentCard } from "@/features/assignment/components/AssignmentCard";
import { ConfirmDialog } from "@/shared/components/design/dialog";
import { EditClassDialog } from "./EditClassDialog";
import { CreateAssignmentDialog } from "@/features/assignment/components/CreateAssignmentDialog";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { useAssignmentClassrooms, useDeleteAssignment } from "@/features/assignment/hooks/useAssignmentQuery";
import { useSelectedClassroom } from "../hooks/useClassroomQuery";
import { useClassroomActions } from "../hooks/useClassroomAction";
import { useLeaveClassroom } from "../../class/hooks/useMemberQuery";
import { useContextMenu } from "@/shared/components/context-menu/ContextMenuProvider";
import { GraduationCap, Plus, Settings, Users } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { MOCK_STUDENTS } from "@/features/class/Students.data";
import { getClassroomContextMenu } from "./classContextMenu";
import { Panel, PanelContent } from "@/shared/components/design/Panel";

const MainBarClassroom = () => {
  const navigate = useNavigate();
  const { classroomId, assignmentId } = useClassroomRoute();
  const { data: classroom } = useSelectedClassroom(classroomId);
  const { deleteClassroom, editClassroom } = useClassroomActions();
  const { mutate: deleteAssignment } = useDeleteAssignment();
  const { mutate: leaveClassroom } = useLeaveClassroom();
  const { openMenu, closeMenu } = useContextMenu();

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>(
    classroom?.role === "STUDENT" ? "Upcoming" : "All"
  );
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedClass, setSelectedClass] = useState<{ id: number; name: string } | null>(null);

  const { data: assignments = [], isLoading } = useAssignmentClassrooms(classroomId);

  // --- Handlers ---
  const handleSetting = (e: React.MouseEvent) => {
    if (!classroomId || !classroom) return;

    openMenu({
      x: e.clientX,
      y: e.clientY,
      items: getClassroomContextMenu(classroomId, classroom.role!, {
        deleteClassroom: handleOpenDelete,
        editClassroom: handleEdit,
        leaveClassroom: handleLeave,
        manageMembers: handleManageMembers,
      }),
    });
  };

  const handleOpenDelete = (id: number) => {
    closeMenu();
    setClassToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const handleLeave = () => {
    closeMenu();
    setConfirmLeaveOpen(true);
  };

  const handleEdit = (id: number) => {
    closeMenu();
    if (!classroom) return;
    setSelectedClass({ id, name: classroom.name });
    setOpenEdit(true);
  };

  const handleManageMembers = (id: number) => {
    closeMenu();
    navigate(`/classrooms/${id}/students`);
  };

  const handleCreate = () => setOpenCreate(true);

  const filteredAssignments = assignments.filter((a) => {
    if (!classroom) return true;

    if (classroom.role === "STUDENT") {
      const isPast = new Date(a.dueAt) < new Date();
      if (activeTab === "Upcoming") return !isPast;
      if (activeTab === "Past Due") return isPast;
      // if (activeTab === "Completed") return a.isSubmitted;
    } else {
      if (activeTab === "Active") return a.isPublished;
      if (activeTab === "Draft") return !a.isPublished;
      return true;
    }
  });

  const tabs = classroom?.role === "STUDENT"
    ? [
      { key: "Upcoming", label: "Upcoming" },
      { key: "Past Due", label: "Past Due" },
      { key: "Completed", label: "Completed" },
    ]
    : [
      { key: "All", label: "All" },
      { key: "Active", label: "Active" },
      { key: "Draft", label: "Draft" },
    ];

  return (
    <>
      <Panel className="h-full w-full">
        <PanelHeader
          topLeft={
            <>
              <div className="flex items-center justify-center min-w-11  min-h-11 bg-[hsl(var(--primary))] rounded-lg text-white font-bold text-lg">
                {classroom?.name?.substring(0, 2).toUpperCase()}
              </div>
              <h2 className="typo-title truncate">{classroom?.name}</h2>
            </>
          }
          topRight={
            <>
              <Button variant="ghost" size="icon" onClick={handleSetting}>
                <Settings className="w-5 h-5" />
              </Button>
              {(classroom?.role === "ADMIN" || classroom?.role === "OWNER") && (
                <Button variant="ghost" size="icon" onClick={handleCreate}>
                  <Plus className="w-5 h-5 text-[hsl(var(--primary))]" />
                </Button>
              )}
            </>
          }
          bottomContent={
            <div
              className="flex items-center gap-2 cursor-pointer typo-caption hover:text-[hsl(var(--foreground))]"
              onClick={() => navigate(`/classrooms/${classroomId}/students`)}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{MOCK_STUDENTS.length ?? 0} Students</span>
            </div>
          }

          tabs={
            <MenuTabs tabs={tabs} activeTab={activeTab} onChange={(t) => setActiveTab(t)} />

          }
        />

        <PanelContent className="flex flex-col gap-2 p-4">
          {isLoading ? (
            <p>Loading assignments...</p>
          ) : filteredAssignments.length === 0 ? (
            <p>No assignments found</p>
          ) : (
            filteredAssignments
              .slice()
              .sort((a, b) => a.id - b.id)
              .map((a) => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  isSelect={a.id === assignmentId}
                  onClick={() => navigate(`/classrooms/${classroomId}/assignments/${a.id}`)}
                  // onDelete={() => deleteAssignment({ classroomId, assignmentId: a.id })}
                  totalStudent={67}
                />
              ))
          )}
        </PanelContent>
      </Panel>

      {/* Confirm dialogs */}
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

      <ConfirmDialog
        open={confirmLeaveOpen}
        onOpenChange={setConfirmLeaveOpen}
        title="Leave Classroom"
        onConfirm={() => {
          leaveClassroom(classroomId, {
            onSuccess: () => navigate("/"),
            onError: (error) => alert(error?.message || "An error occurred."),
          });
          setConfirmLeaveOpen(false);
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
};

export default MainBarClassroom;