import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { Plus, MoreVertical } from "lucide-react"
import { Button } from "../../ui/button"

export interface MainBarProps {
    title?: string
    meta?: React.ReactNode
    actions?: React.ReactNode
    children?: React.ReactNode
    create?: () => void
    openSetting?: (e: React.MouseEvent) => void
    avatar?: React.ReactNode
}

export const MainBar: React.FC<MainBarProps> = ({
    title,
    meta,
    openSetting,
    create,
    children,
    avatar,
}) => (
    <div className="flex flex-col px-8 h-full w-full border-r">
        {/* Header */}
        <div className="sticky top-0 z-10 pt-6 ">
            <div className="flex items-start justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 pb-1">
                        {avatar}
                        <h1 className="text-2xl font-bold truncate">{title}</h1>
                    </div>
                    {meta && <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">{meta}</div>}
                </div>
                <div className="flex items-center gap-2">
                    {openSetting && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={(e) => openSetting?.(e)}>
                                    <MoreVertical className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={8}>
                                Options
                            </TooltipContent>
                        </Tooltip>
                    )}
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
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4">{children}</div>
    </div>
)