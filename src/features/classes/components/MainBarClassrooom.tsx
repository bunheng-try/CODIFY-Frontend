
import { MainBar } from "@/shared/components/layout/MainBar";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import { useAssignmentClassrooms, useCreateAssignment, useDeleteAssignment } from "@/features/assignment/hooks/useAssignmentQuery";
import AssignmentCard from "@/shared/components/ui/assignmentCard";
import { useSelectedClassroom } from "../hooks/useClassroomQuery";
import type {  AssignmentDto } from "@/shared/types/types";
import { useNavigate} from "react-router-dom"
import { MOCK_STUDENTS } from "@/features/class/Students.data";
import { ConfirmDialog } from "@/shared/components/design/dialog";
import { EditClassDialog } from "./EditClassDialog";
import { useClassroomActions } from "../hooks/useClassroomAction";
import { useState } from "react";
import { getClassroomContextMenu } from "./classContextMenu";
import { useContextMenu } from "@/shared/components/context-menu/ContextMenuProvider";
import type { CreateAssignmentDto } from "@/features/assignment/apis/assignment.api";

const MainBarClassroom = () => {
  const navigate = useNavigate();
  const { openMenu } = useContextMenu()
  
  const { classroomId,assignmentId } = useClassroomRoute();
  const { data: classroom} = useSelectedClassroom(classroomId);
  const { mutate: createAssignment } = useCreateAssignment(classroomId);
  const { deleteClassroom, editClassroom } = useClassroomActions();
  
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [classToDelete, setClassToDelete] = useState<number | null>(null)
  const {mutate:deleteAssignment}=useDeleteAssignment();

  const [openEdit, setOpenEdit] = useState(false);
    const [selectedClass, setSelectedClass] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { data: assignments = [], isLoading } =
    useAssignmentClassrooms(classroomId);

  const openStudentList = () => {
    navigate(`/classrooms/${classroomId}/students`)
  };

  const handleSetting = (e: React.MouseEvent) => {
    if (!classroomId) return;

    openMenu({
      x: e.clientX,
      y: e.clientY,
      items: getClassroomContextMenu(classroomId, {
        deleteClassroom: handleOpenDelete,
        editClassroom: handleEdit,
      }),
    });
  };


  const handleCreate = async () => {
    // TODO - Create Assignment

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // add 1 day
    tomorrow.setHours(23, 59, 0, 0);

    if(classroomId==null) return;
    
    const newAssignmentPayload: CreateAssignmentDto = {
      classroomId: classroomId,
      title: "New Assignment",
      dueAt: tomorrow.toISOString(),
      description:"",
      position:0
    };

    createAssignment(newAssignmentPayload)
  };

  const handleEdit = (classroomId: number) => {
    const cls = classroom
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
    <MainBar
      title={classroom?.name}
      student={MOCK_STUDENTS.length}
      openSetting={handleSetting}
      openStudentList={openStudentList}
      create={handleCreate}
    >
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <p>Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p>No assignments found</p>
        ) : (
          assignments.slice().sort((a, b) => a.id - b.id).map((a) => (
            <AssignmentCard
              key={a.id}           
              assignment={a}        
              isSelect={a.id==assignmentId}  
              onDelete={() => {
                deleteAssignment({classroomId,assignmentId:a.id})
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
};


export default MainBarClassroom;
