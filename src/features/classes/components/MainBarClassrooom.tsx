import { useState, useMemo, useEffect } from "react";
import { Panel, PanelContent } from "@/shared/components/design/Panel";
import { PanelHeader } from "@/shared/components/design/PanelHeader";
import MenuTabs from "@/shared/components/menu_tabs/MenuTabs";
import { AssignmentCard } from "@/features/assignment/components/AssignmentCard";
import { ConfirmDialog } from "@/shared/components/design/dialog";
import { EditClassDialog } from "./EditClassDialog";
import { CreateAssignmentDialog } from "@/features/assignment/components/CreateAssignmentDialog";
import { useClassroomRoute } from "@/features/classes/hooks/useClassroomRoute";
import {
  useAssignmentClassrooms,
  useDeleteAssignment,
  usePublishAssignment,
  useUnPublishAssignment,
} from "@/features/assignment/hooks/useAssignmentQuery";
import { useSelectedClassroom } from "../hooks/useClassroomQuery";
import { useClassroomActions } from "../hooks/useClassroomAction";
import { useLeaveClassroom, useMembers } from "../../class/hooks/useMemberQuery";
import { GraduationCap, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import SettingsMenu from "./SettingMenu";
import { AssignementEmptyState } from "@/features/assignment/components/empty/AssignementEmptyState";
import { getInitials } from "@/shared/utils/strings";
import { useGuardedNavigate } from "@/shared/hooks/useGuardedNavigated";
import type { Assignment } from "@/features/assignment/apis/assignment.api";
import { ContextMenu } from "@/shared/components/context-menu/ContextMenu";
import { useAssignmentContextMenu } from "@/features/assignment/hooks/useAssignmentContextMenu";

type DialogKey = "edit" | "create" | "delete" | "leave";

const MainBarClassroom = () => {
  const navigate = useGuardedNavigate();
  const { classroomId, assignmentId } = useClassroomRoute();

  // Queries
  const { data: classroom } = useSelectedClassroom(classroomId);
  const { data: assignments = [], isLoading } = useAssignmentClassrooms(classroomId);
  const { data: members = [] } = useMembers(classroomId);

  // Mutations
  const { deleteClassroom, editClassroom } = useClassroomActions();
  const { mutate: leaveClassroom } = useLeaveClassroom();
  const { mutate: deleteAssignment } = useDeleteAssignment();
  const { mutate: publishAssignment } = usePublishAssignment();
  const { mutate: unPublishAssignment } = useUnPublishAssignment();

  // Local state
  const [selectedClass, setSelectedClass] = useState<{ id: number; name: string } | null>(null);
  const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);

  const [dialogs, setDialogs] = useState<Record<DialogKey, boolean>>({
    edit: false,
    create: false,
    delete: false,
    leave: false,
  });

  const isStudent = classroom?.role === "STUDENT";
  const totalStudents = members.filter((m) => m.role === "STUDENT").length;
  const [activeTab, setActiveTab] = useState<string>(isStudent ? "Upcoming" : "All");

  const tabs = isStudent
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

  const filteredAssignments = useMemo(() => {
    return assignments.filter((a) => {
      if (isStudent) {
        const isPast = new Date(a.dueAt) < new Date();
        if (activeTab === "Upcoming") return !isPast;
        if (activeTab === "Past Due") return isPast;
        if (activeTab === "Completed") return false; // TODO
        return true;
      }

      if (activeTab === "Active") return a.isPublished;
      if (activeTab === "Draft") return !a.isPublished;
      return true;
    });
  }, [assignments, activeTab, isStudent]);

  const openDialog = (key: DialogKey) =>
    setDialogs((prev) => ({ ...prev, [key]: true }));

  const closeDialog = (key: DialogKey) =>
    setDialogs((prev) => ({ ...prev, [key]: false }));

  const {
    contextMenu,
    contextMenuItems,
    handleAssignmentContextMenu,
    closeContextMenu,
  } = useAssignmentContextMenu({
    classroomId,
    isStudent,
    navigate,
    publishAssignment,
    onRequestDelete: (assignment) => setAssignmentToDelete(assignment),
  });

  useEffect(() => {
    setActiveTab(isStudent ? "Upcoming" : "All");
  }, [classroomId, isStudent]);


  useEffect(() => {
    if (classroom === undefined) return;
    if (!classroom) navigate("/");
  }, [classroom, navigate]);

  if (!classroom) return null;

  return (
    <>
      <Panel className="h-full w-full">
        <PanelHeader
          topLeft={
            <>
              <div className="flex items-center justify-center min-w-11 min-h-11 bg-[hsl(var(--primary))] rounded-lg text-white font-bold text-lg">
                {getInitials(classroom.name?.toUpperCase() || "C")}
              </div>
              <h2 className="typo-title truncate">{classroom.name}</h2>
            </>
          }
          topRight={
            <>
              <SettingsMenu
                classroomId={classroomId}
                classroom={classroom}
                onEdit={(id) => {
                  setSelectedClass({ id, name: classroom.name });
                  openDialog("edit");
                }}
                onDelete={() => openDialog("delete")}
                onLeave={() => openDialog("leave")}
              />

              {!isStudent && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openDialog("create")}
                >
                  <Plus className="w-5 h-5 text-[hsl(var(--primary))]" />
                </Button>
              )}
            </>
          }
          bottomContent={
            !isStudent && (
              <div
                className="flex items-center gap-2 cursor-pointer typo-caption hover:text-[hsl(var(--foreground))]"
                onClick={() => navigate(`/classrooms/${classroomId}/students`)}
              >
                <GraduationCap className="w-4 h-4" />
                <span>
                  {members.length} Member{members.length > 1 ? "s" : ""}
                </span>
              </div>
            )
          }
          tabs={
            <MenuTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          }
        />

        <PanelContent className="flex flex-col gap-2 p-4">
          {isLoading ? (
            <p>Loading assignments...</p>
          ) : filteredAssignments.length === 0 ? (
            <AssignementEmptyState onCreate={() => openDialog("create")} />
          ) : (
            filteredAssignments.map((a) => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                isSelect={a.id === assignmentId}
                onClick={() =>
                  navigate(`/classrooms/${classroomId}/assignments/${a.id}`)
                }
                onContextMenu={handleAssignmentContextMenu}
                totalStudent={totalStudents}
                classroomId={classroomId}
              />
            ))
          )}
        </PanelContent>
      </Panel>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={closeContextMenu}
        />
      )}

      {/* Delete Assignment Confirm */}
      <ConfirmDialog
        open={!!assignmentToDelete}
        onOpenChange={(open) => {
          if (!open) setAssignmentToDelete(null);
        }}
        title="Delete Assignment"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (!assignmentToDelete) return;

          deleteAssignment({
            classroomId,
            assignmentId: assignmentToDelete.id,
          });

          setAssignmentToDelete(null);
        }}
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{assignmentToDelete?.title}</strong>?
        </p>
      </ConfirmDialog>

      {/* Delete Classroom Confirm */}
      <ConfirmDialog
        open={dialogs.delete}
        onOpenChange={() => closeDialog("delete")}
        title="Delete Classroom"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          deleteClassroom(classroomId);
          closeDialog("delete");
        }}
      >
        <p>This action cannot be undone.</p>
      </ConfirmDialog>

      {/* Leave Classroom Confirm */}
      <ConfirmDialog
        open={dialogs.leave}
        onOpenChange={() => closeDialog("leave")}
        title="Leave Classroom"
        confirmText="Leave"
        cancelText="Cancel"
        onConfirm={() =>
          leaveClassroom(classroomId, { onSuccess: () => navigate("/") })
        }
      >
        <p>Are you sure you want to leave this classroom?</p>
      </ConfirmDialog>

      {/* Edit Classroom */}
      <EditClassDialog
        open={dialogs.edit}
        onClose={() => closeDialog("edit")}
        initialName={selectedClass?.name || ""}
        onConfirm={(name) => {
          if (!selectedClass) return;
          editClassroom(selectedClass.id, name);
        }}
      />

      {/* Create Assignment */}
      <CreateAssignmentDialog
        open={dialogs.create}
        onOpenChange={(open) =>
          setDialogs((prev) => ({ ...prev, create: open }))
        }
        classroomId={classroomId}
      />
    </>
  );
};

export default MainBarClassroom;