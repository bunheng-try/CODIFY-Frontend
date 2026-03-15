
import { MainBar } from "@/shared/components/layout/mainBar/MainBar";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { useAssignmentClassrooms, useDeleteAssignment } from "@/features/assignment/hooks/useAssignmentQuery";
import AssignmentCard from "@/shared/components/ui/assignmentCard";
import { useSelectedClassroom } from "../hooks/useClassroomQuery";
import { useNavigate } from "react-router-dom"
import { ConfirmDialog } from "@/shared/components/design/dialog";
import { EditClassDialog } from "./EditClassDialog";
import { useClassroomActions } from "../hooks/useClassroomAction";
import { useState } from "react";
import { getClassroomContextMenu } from "./classContextMenu";
import { useLeaveClassroom } from "../../class/hooks/useMemberQuery";
import { useContextMenu } from "@/shared/components/context-menu/ContextMenuProvider";
import { Users } from "lucide-react";
import { CreateAssignmentDialog } from "@/features/assignment/components/CreateAssignmentDialog";
import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";

const MainBarClassroom = () => {
  const navigate = useNavigate();
  const { openMenu, closeMenu } = useContextMenu()

  const { classroomId, assignmentId } = useClassroomRoute();
  const { data: classroom } = useSelectedClassroom(classroomId);
  const { deleteClassroom, editClassroom } = useClassroomActions();
  const { mutate: leaveClassroom } = useLeaveClassroom();

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false)
  const [classToDelete, setClassToDelete] = useState<number | null>(null)
  const { mutate: deleteAssignment } = useDeleteAssignment();

  const [activeTab, setActiveTab] = useState<string>("All");

  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedClass, setSelectedClass] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { data: assignments = [], isLoading } =
    useAssignmentClassrooms(classroomId);



  const handleLeave = () => {
    closeMenu();
    setConfirmLeaveOpen(true);
  };

  const handleManageMembers = (id: number) => {
    closeMenu();
    navigate(`/classrooms/${id}/students`);
  };

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


  const handleCreate = () => {
    setOpenCreate(true);
  };

  const handleEdit = (classroomId: number) => {
    closeMenu();
    const cls = classroom
    if (!cls) return;
    setSelectedClass({ id: classroomId, name: cls.name });
    setOpenEdit(true);
  };

  const handleOpenDelete = (id: number) => {
    closeMenu();
    setClassToDelete(id)
    setConfirmDeleteOpen(true)
  }

  return (
    <>
      <MainBar
        title={classroom?.name}
        avatar={
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg text-white font-bold text-lg">
            {classroom?.name.substring(0, 2).toUpperCase()}
          </div>
        }
        meta={
          classroom?.role === "ADMIN" || classroom?.role === "OWNER" ? (
            <div className="cursor-pointer flex gap-1 items-center" onClick={() => { navigate(`/classrooms/${classroomId}/students`)}}>
              <Users className="w-4 h-4" />
              <span>{classroom.student} students</span>
            </div>
          ) : null
        }
        openSetting={handleSetting}
        create={classroom?.role === "ADMIN" || classroom?.role === "OWNER" ? handleCreate : undefined}
      >
        <div className="border-b mb-4">
          <MenuTabs
            activeTab={activeTab}
            onChange={(tab) => setActiveTab(tab)}
            tabs={
              classroom?.role === "STUDENT"
                ? [
                  { key: "Upcoming", label: "Upcoming" },
                  { key: "Past Due", label: "Past Due" },
                  { key: "Completed", label: "Completed" },
                ]
                : [
                  { key: "All", label: "All" },
                  { key: "Active", label: "Active" },
                  { key: "Draft", label: "Draft" },
                ]
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <p>Loading assignments...</p>
          ) : assignments.length === 0 ? (
            <p>No assignments found</p>
          ) : (
            assignments
              .filter((a) => {
                if (classroom?.role === "STUDENT") {
                  const isPast = new Date(a.dueAt) < new Date();
                  if (activeTab === "Upcoming") return !isPast;
                  if (activeTab === "Past Due") return isPast;
                  if (activeTab === "Completed") return false;
                } else {
                  if (activeTab === "Active") return a.isPublished;
                  if (activeTab === "Draft") return !a.isPublished;
                }
                return true;
              })
              .slice().sort((a, b) => a.id - b.id).map((a) => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  isSelect={a.id == assignmentId}
                  onDelete={() => {
                    deleteAssignment({ classroomId, assignmentId: a.id })
                  }}
                  onClick={() => {
                    navigate(
                      `/classrooms/${classroomId}/assignments/${a.id}`
                    )
                  }}
                  totalStudent={67}
                />
              ))
          )}
        </div>
      </MainBar>
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
            onError: (error) => {
              alert(error?.message || "An error occurred while leaving the classroom.");
            }
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
