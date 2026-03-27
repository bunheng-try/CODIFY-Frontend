import { Outlet } from "react-router-dom";
import {
  ResizablePanel,
  ResizablePanelContainer,
  ResizablePanelDivider,
} from "@/shared/components/layout/ResizablePanel";
import MainBarClassrooom from "@/features/classes/components/MainBarClassrooom";
import { useSelectedClassroom } from "../hooks/useClassroomQuery";
import { useClassroomRoute } from "../hooks/useClassroomRoute";
import FullPageSkeleton from "@/shared/components/loading-skeleton/FullPageSkeleton";

export const ClassroomLayout = () => {  
  const { classroomId } = useClassroomRoute();

  const { data: classroom, isPending: isClassroomLoading } = useSelectedClassroom(classroomId);
  console.log(isClassroomLoading, classroom);
  if (isClassroomLoading || !classroom)
    return <div className="flex-1"><FullPageSkeleton /></div>

  return (
    <ResizablePanelContainer direction="horizontal" className="flex-1">

      {/* MAIN BAR */}
      <ResizablePanel defaultSize={35} minSize={25} maxSize={45}>
        <MainBarClassrooom classroom={classroom} />
      </ResizablePanel>

      <ResizablePanelDivider />

      {/* MAIN PANEL */}
      <ResizablePanel defaultSize={65} minSize={55} maxSize={75}>
        <Outlet />
      </ResizablePanel>

    </ResizablePanelContainer>
  );
};
