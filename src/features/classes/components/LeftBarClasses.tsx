import { useRef, useState, useEffect } from "react"
import { Users, MoreHorizontal } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useContextMenu } from "@/shared/components/context-menu/ContextMenuProvider"
import { getClassroomContextMenu } from "@/features/classes/components/classContextMenu"
import type { Classroom } from "../apis/classroom.api"
import { LeftBarButton } from "@/app/layout/leftBar/LeftBarButton"
import { AllClassesDialog } from "./AllClassesDialog"
import { useClassroomRole } from "../hooks/useClassroomRole"
import ClassroomItem from "./ClassroomItem"

type Props = {
    classes: Classroom[]
    selectedClassroomId: number | null
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

const BUTTON_HEIGHT = 48

export function LeftBarClasses({ classes, selectedClassroomId, onDelete, onEdit }: Props) {
    const navigate = useNavigate()
    const { openMenu } = useContextMenu()
    const listRef = useRef<HTMLDivElement>(null)
    const [visibleCount, setVisibleCount] = useState(classes.length)
    const [openAll, setOpenAll] = useState(false)
    const { data: roleData } = useClassroomRole(selectedClassroomId ?? 0);

    const orderedClasses = [
        ...classes.filter((c) => c.id === selectedClassroomId),
        ...classes.filter((c) => c.id !== selectedClassroomId),
    ]

    useEffect(() => {
        const el = listRef.current
        if (!el) return
        const calculate = () => setVisibleCount(Math.floor(el.clientHeight / BUTTON_HEIGHT))
        calculate()
        window.addEventListener("resize", calculate)
        return () => window.removeEventListener("resize", calculate)
    }, [classes])

    const visibleClasses = orderedClasses.slice(0, visibleCount)
    const hiddenClasses = orderedClasses.slice(visibleCount)

    return (
        <>
            <div ref={listRef} className="flex flex-col gap-1 px-2 py-2 overflow-hidden flex-1">
                {visibleClasses.map((c) => (
                    <ClassroomItem c={c} selectedClassroomId={c.id} onDelete={onDelete} onEdit={onEdit} />
                ))}
            </div>

            {hiddenClasses.length > 0 && (
                <div className="px-2 py-1">
                    <LeftBarButton
                        icon={<MoreHorizontal className="h-5 w-5" />}
                        tooltip={`${hiddenClasses.length} more classes`}
                        badge={hiddenClasses.length}
                        onClick={() => setOpenAll(true)}
                    />
                </div>
            )}

            <AllClassesDialog
                open={openAll}
                onClose={() => setOpenAll(false)}
                classrooms={classes.map(c => ({ ...c, id: c.id }))}
                onSelect={(id) => navigate(`/classrooms/${id}`)}
            />

        </>
    )
}