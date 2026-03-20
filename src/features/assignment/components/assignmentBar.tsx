import React,{useState} from "react";
import type { Section} from "@/shared/types/types";

const sections: Section[] = [
  {
    id: "week-1",
    title: "WEEK 1 – MOBILE APP INTRODUCTION",
    assignments: [
      { id: "a1", title: "Introduction Quiz" },
      { id: "a2", title: "Setup Environment" },
    ],
  }, 
  {
    id: "week-2",
    title: "WEEK 2 – UI & LAYOUT FUNDAMENTALS",
    assignments: [],
  },
  {
    id: "week-3",
    title: "WEEK 3 – NAVIGATION & STATE",
    assignments: [
      { id: "a3", title: "Navigation Exercise" },
    ],
  },
];

const AssigmentBar: React.FC = () => {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

  const handleToggle = (sectionId: string) => {
    setExpandedSectionId(
      expandedSectionId === sectionId ? null : sectionId
    );
  };

  return (
    <div className="w-full p-4 space-y-2">
      {sections.map((section) => {
        const isExpanded = expandedSectionId === section.id;

        return (
          <div key={section.id} >
            {/* SECTION HEADER */}
            <button
              onClick={() => handleToggle(section.id)}
              className="
                w-full flex items-start gap-2 
                py-3 px-1 
                font-semibold text-left text-xs text-white b
                "
            >
              <span>{isExpanded ? "▼" : "▶"}</span>
              {section.title}
            </button>

            {/* ASSIGNMENT LIST */}
            {isExpanded && (
              <div className=" space-y-1">
                {section.assignments.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    No assignments yet
                  </div>
                ) : (
                  section.assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      onClick={() => setSelectedAssignmentId(assignment.id)}
                      className={`
                        cursor-pointer rounded px-3 py-2 text-sm text-white
                        ${
                          selectedAssignmentId === assignment.id
                            ? "bg-primary"
                            : "bg-blue-200"
                        }
                      `}
                    >
                      {assignment.title}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AssigmentBar;