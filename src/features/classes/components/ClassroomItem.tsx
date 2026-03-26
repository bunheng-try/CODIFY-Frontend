import { LeftBarButton } from '@/app/layout/leftBar/LeftBarButton'
import { useContextMenu } from '@/shared/components/context-menu/ContextMenuProvider';
import { useNavigate } from 'react-router-dom';
import { useClassroomRole } from '../hooks/useClassroomRole';
import { getClassroomContextMenu } from './classContextMenu';
import type { Classroom } from '../apis/classroom.api';
import { getInitials } from '@/shared/utils/strings';

interface ClassroomItemProp {
    c: Classroom,
    selectedClassroomId: number,
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}
const ClassroomItem = ({ c, selectedClassroomId, onDelete, onEdit }: ClassroomItemProp) => {
    const navigate = useNavigate();
    const { openMenu } = useContextMenu();
    const { data: roleData } = useClassroomRole(c.id);
    
  return (
      <div>
          <LeftBarButton
              key={c.id}
              icon={<span className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-xs font-semibold text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))]"> {getInitials(c.name.toLocaleUpperCase())} </span>}
              tooltip={c.name}
              active={c.id === selectedClassroomId}
              onClick={() => navigate(`/classrooms/${c.id}`)}
              onContextMenu={(e) => {
                  e.preventDefault()
                  openMenu({
                      x: e.clientX,
                      y: e.clientY,
                      items: getClassroomContextMenu(c.id, roleData?.role ?? "STUDENT", {
                          deleteClassroom: onDelete,
                          editClassroom: onEdit,
                      }),
                  })
              }}
          />
    </div>
  )
}

export default ClassroomItem