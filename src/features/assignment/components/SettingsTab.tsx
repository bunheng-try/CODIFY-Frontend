import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/components/ui/dialog";
import { CalendarIcon, ChevronDownIcon, ClockIcon, Edit, Save, StarIcon, Trash2, X } from "lucide-react";
import { useAssignmentSettings } from "../hooks/useAssignmentSettings";
import type { Assignment } from "../apis/assignment.api";

interface SettingsTabProps {
  assignment: Assignment;
  isEditing: boolean;
  onEditChange: (editing: boolean) => void;
  onAssignmentUpdate?: (updated: Partial<Assignment>) => void;
  onDelete?: () => void;
}

export const SettingsTab = ({ assignment, isEditing, onEditChange, onAssignmentUpdate }: SettingsTabProps) => {
  const {
    dueDate,
    setDueDate,
    timeDue,
    setTimeDue,
    // points,
    // setPoints,
    description,
    setDescription,
    showDeleteDialog,
    setShowDeleteDialog,
    handleSave,
    handleCancel,
    handleDeleteRequest,
    handleDeleteConfirm,
  } = useAssignmentSettings(assignment);

  const onSave = () => {
    const updated = handleSave();
    if (onAssignmentUpdate) onAssignmentUpdate(updated);
    onEditChange(false);
  };

  const onCancel = () => {
    handleCancel();
    onEditChange(false);
  };

  const displayDue = assignment.dueAt ? new Date(`${assignment.dueAt}`) : null;

  if (!isEditing) {
    return (
      <div className="p-6 max-w-3xl space-y-6">
        <div className="space-y-4 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Assignment Details</h2>
          <div className="flex justify-between">
            <span className="text-gray-600">Due</span>
            <span>
              {displayDue
                ? displayDue.toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
                : "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Points</span>
            <span>{assignment.points ?? "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className="capitalize">{assignment.published?"Published":"Not Publish"}</span>
          </div>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Description</h2>
          <p>{assignment.description || "No description provided"}</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onEditChange(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Assignment
          </Button>
          <Button variant="destructive" onClick={handleDeleteRequest}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Assignment
          </Button>
        </div>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Delete Assignment</DialogTitle>
              <DialogDescription>
                Do you want to delete this assignment?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-4">
              <Button variant="default" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Edit Assignment</h2>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Date due <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full h-12 pl-12 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Time Due <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <ClockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="time"
            value={timeDue}
            onChange={(e) => setTimeDue(e.target.value)}
            className="w-full h-12 pl-12 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Points <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <StarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            min={0}
            // value={points}
            // onChange={(e) => setPoints(e.target.value)}
            className="w-full h-12 pl-12 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Description
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="rounded-xl"
          placeholder="Enter assignment description..."
        />
      </div>

      <div className="flex gap-3">
        <Button variant="default" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

    </div>
  );
};