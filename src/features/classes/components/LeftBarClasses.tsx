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
        <div className="flex flex-col flex-1 overflow-hidden w-full">
            <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-0.5">
                {classes.map((c) => (
                    <ClassroomItem
                        key={c.id}
                        c={c}
                        selectedClassroomId={selectedClassroomId!}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
}