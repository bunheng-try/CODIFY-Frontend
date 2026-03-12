import React from "react"
import { GraduationCap, Settings, Plus } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/components/ui/tooltip"
import { Button } from "../ui/button"

export interface MainBarProps {
  title?: string
  student?: number
  children?: React.ReactNode
  create?: () => void
  openSetting?: (e: React.MouseEvent) => void
  openStudentList?: () => void
}

export const MainBar: React.FC<MainBarProps> = ({
  title,
  student,
  children,
  openSetting,
  openStudentList,
  create,
}) => {
  return (
    <div className="flex flex-col px-8 h-full w-full bg-[hsl(var(--surface-2))] text-[hsl(var(--foreground))]  border-r ">

      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[hsl(var(--border))]  py-6 flex flex-col">
        {/* Top row: title + actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] truncate">
            {title}
          </h1>

          <div className="flex items-center gap-2">
            {/* Settings */}
            {openSetting && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={openSetting}>
                    <Settings className="h-9 w-9 text-[hsl(var(--muted-foreground))]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  Settings
                </TooltipContent>
              </Tooltip>
            )}

            {/* Create */}
            {create && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={create}>
                    <Plus className="h-9 w-9 text-[hsl(var(--primary))]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  Create Assignment
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Bottom row: students */}
        {student !== undefined && (
          <div
            onClick={openStudentList}
            className="
              mt-3 flex items-center gap-2 text-sm
              text-[hsl(var(--muted-foreground))]
              hover:text-[hsl(var(--foreground))]
              cursor-pointer transition-colors duration-200
            "
          >
            <GraduationCap className="h-4 w-4" />
            <span className="truncate">{student} Students</span>
          </div>
        )}
      </div>
      {/* Content */}
      <div
        className="
          flex-1 overflow-y-auto py-4
          scrollbar-none
        "
      >
        {children}
      </div>
    </div>
  )
}
