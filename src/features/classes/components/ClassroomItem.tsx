import { LeftBarButton } from '@/app/layout/leftBar/LeftBarButton'
import { useContextMenu } from '@/shared/components/context-menu/ContextMenuProvider';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useClassroomRole } from '../hooks/useClassroomRole';
import { getClassroomContextMenu } from './classContextMenu';
import { Users } from 'lucide-react';
import type { Classroom } from '../apis/classroom.api';

interface ClassroomItemProp {
    c: Classroom,
    selectedClassroomId: Number,
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
              icon={<Users className="h-5 w-5" />}
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