import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Plus, Settings } from "lucide-react"
import { Button } from "../../ui/button"

export interface MainBarProps {
    title?: string
    meta?: React.ReactNode
    actions?: React.ReactNode
    children?: React.ReactNode
    create?: () => void
    openSetting?: (e: React.MouseEvent) => void
}

export const MainBar: React.FC<MainBarProps> = ({
    title,
    meta,
    openSetting,
    create,
    children,
}) => (
    <div className="flex flex-col px-8 h-full w-full border-r bg-[hsl(var(--surface-2))]">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b py-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold truncate">{title}</h1>
                <div className="flex items-center gap-2">
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
            {meta && <div className="mt-3 text-sm">{meta}</div>}
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4">{children}</div>
    </div>
)