import type { Classroom } from "../apis/classroom.api"
import ClassroomItem from "./ClassroomItem"

type Props = {
    classes: Classroom[]
    selectedClassroomId: number | null
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

export function LeftBarClasses({ classes, selectedClassroomId, onDelete, onEdit }: Props) {
    return (
        <>
            <div className="flex flex-col gap-0.5 px-2 py-2 overflow-hidden flex-1">
                {classes.map((c) => (
                    <ClassroomItem c={c} selectedClassroomId={selectedClassroomId!} onDelete={onDelete} onEdit={onEdit} />
                ))}
            </div>

        </>
    )
}