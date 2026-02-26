import { useParams } from "react-router-dom"

export function useClassroomRoute() {
  const { classId, assignmentId } = useParams()

  return {
    classroomId: Number(classId) ?? null,
    assignmentId: Number(assignmentId) ?? null,
  }
}
