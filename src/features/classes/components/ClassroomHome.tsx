import { useParams } from "react-router-dom"
import { BookOpen, PlusCircle } from "lucide-react"
import { useClassroomRole } from "../hooks/useClassroomRole"

export const ClassroomHome = () => {
  const { classId } = useParams()
  const { data: roleData } = useClassroomRole(Number(classId))
  const isAdmin = roleData?.role === "ADMIN"

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8">

      <div className="max-w-md">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--accent))]">
          <BookOpen className="h-7 w-7 text-[hsl(var(--primary))]" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          Classroom Ready
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
          {isAdmin
            ? "Select an assignment from the left panel or create a new one to get started."
            : "Select an assignment from the left panel to get started."}
        </p>

        {/* Action - Admin only */}
        {isAdmin && (
          <button
            className="
              mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium
              bg-[hsl(var(--primary))]
              text-[hsl(var(--primary-foreground))]
              hover:bg-[hsl(var(--primary)/0.9)]
              transition
            "
          >
            <PlusCircle className="h-4 w-4" />
            Create Assignment
          </button>
        )}

      </div>
    </div>
  )
}