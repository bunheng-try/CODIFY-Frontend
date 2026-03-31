import { CalendarIcon, ClockIcon } from "lucide-react";
import type { Assignment } from "../apis/assignment.api";
import { SectionContainer } from "@/shared/components/design/SectionContainer";
import { LabeledSection } from "@/shared/components/design/LabeledSection";
import { EditableField } from "@/shared/components/design/EditableField";

interface SettingsTabProps {
  draft: Assignment;
  updateField: <K extends keyof Assignment>(key: K, value: Assignment[K]) => void;
}

export const SettingsTab = ({ draft, updateField }: SettingsTabProps) => {
  const dueDate = draft.dueAt ? new Date(draft.dueAt).toISOString().split("T")[0] : "";
  const timeDue = draft.dueAt ? new Date(draft.dueAt).toTimeString().slice(0, 5) : "";

  const handleDueDateChange = (date: string) => {
    if (!draft.dueAt) {
      updateField("dueAt", new Date(date).toISOString());
      return;
    }
    const current = new Date(draft.dueAt);
    const [year, month, day] = date.split("-").map(Number);
    current.setFullYear(year, month - 1, day);
    updateField("dueAt", current.toISOString());
  };

  const handleTimeChange = (time: string) => {
    if (!draft.dueAt) return;
    const current = new Date(draft.dueAt);
    const [hours, minutes] = time.split(":").map(Number);
    current.setHours(hours, minutes);
    updateField("dueAt", current.toISOString());
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <SectionContainer title="Assignment Details">
        <div className="grid grid-cols-2 gap-4">

          {/* Due Date */}
          <LabeledSection label="Due Date">
            <EditableField
              value={dueDate}
              onChange={handleDueDateChange}
              icon={<CalendarIcon className="w-5 h-5 text-gray-400" />}
              placeholder="Select due date"
              type="date"
            />
          </LabeledSection>

          {/* Time Due */}
          <LabeledSection label="Time Due">
            <EditableField
              value={timeDue}
              onChange={handleTimeChange}
              icon={<ClockIcon className="w-5 h-5 text-gray-400" />}
              placeholder="Select due time"
              type="time"
            />
          </LabeledSection>

          {/* <LabeledSection label="Points">
            Timer option with toggle button
          </LabeledSection> */}

          <LabeledSection label="Status">
            <span className="capitalize">{draft.isPublished ? "Published" : "Not Published"}</span>
          </LabeledSection>

        </div>
      </SectionContainer>

      <SectionContainer title="Description">
        <EditableField
          value={draft.description}
          onChange={(val) => updateField("description", val)}
          multiline
          placeholder="Enter assignment description..."
        />
      </SectionContainer>
    </div>
  );
};