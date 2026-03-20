import { AssignmentCard } from "@/features/assignment/components/AssignmentCard";
import { useNavigate } from "react-router-dom";
import type { Assignment } from "../apis/assignment.api";

interface AssignmentListProp {
    assignments: Assignment[],
    classroomId: Number,
    assignmentId: Number
}
export function AssignmentList({ assignments, classroomId, assignmentId }: AssignmentListProp) {
    const navigate = useNavigate();

    if (assignments.length === 0) {
        return <p>No assignments found</p>;
    }

    return (
        <>
            {assignments
                .slice()
                .sort((a, b) => a.id - b.id)
                .map((a) => (
                    <AssignmentCard
                        key={a.id}
                        assignment={a}
                        isSelect={a.id === assignmentId}
                        onClick={() =>
                            navigate(`/classrooms/${classroomId}/assignments/${a.id}`)
                        }
                        totalStudent={67}
                    />
                ))}
        </>
    );
}