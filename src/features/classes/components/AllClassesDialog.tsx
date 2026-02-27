import { useState } from "react"
import { Users } from "lucide-react"
import type { Classroom } from "../apis/classroom.api"
import { CustomDialog } from "@/shared/components/design/dialog/CustomDialog"
import { cn } from "@/lib/utils"

type AllClassesDialogProps = {
  open: boolean
  onClose: () => void
  classrooms: Classroom[]
  selectedClassroomId?: number
  onSelect: (id: number) => void
}

export function AllClassesDialog({
  open,
  onClose,
  classrooms,
  selectedClassroomId,
  onSelect,
}: AllClassesDialogProps) {
  const [search, setSearch] = useState("")

  const filteredClasses = classrooms.filter((cls) =>
    cls.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <CustomDialog
      open={open}
      onCancel={onClose}
      title="All Classes"
      bodyContent={
        <div className="flex flex-col gap-2">
          {/* Search input */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search classes..."
            className="
              h-10 rounded-md px-3
              border border-border
              bg-background
              text-foreground
              outline-none
              focus:ring-2 focus:ring-ring
            "
          />

          <div className="max-h-[420px] overflow-y-auto mt-2">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => {
                const isSelected = cls.id === selectedClassroomId
                return (
                  <button
                    key={cls.id}
                    onClick={() => {
                      onSelect(cls.id)
                      onClose()
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2 text-left rounded-md transition-colors",
                      isSelected
                        ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                        : "hover:bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]",
                      "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-offset-1"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md",
                        isSelected
                          ? "bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))]"
                          : "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
                      )}
                    >
                      <Users className="h-4 w-4" />
                    </div>

                    <span className="truncate text-sm font-medium">
                      {cls.name}
                    </span>
                  </button>
                )
              })
            ) : (
              <div className="p-4 text-center text-sm text-[hsl(var(--muted-foreground))]">
                No classes found
              </div>
            )}
          </div>
        </div>
      }
      actionButtons={[
        {
          label: "Close",
          variant: "ghost",
          onClick: onClose,
        },
      ]}
    />
  )
}
