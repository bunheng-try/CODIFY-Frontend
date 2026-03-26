import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu"
import { LeftBarButton } from "@/app/layout/leftBar/LeftBarButton"
import { LogOut, Settings, User } from "lucide-react"
import { useAuthStore } from "@/app/store/autStore"
import { authApi } from "@/features/auth/apis/auth.api"
import UserIconPlaceHolder from "./UserIconPlaceHolder"

export function UserProfileDropdown({bgColor} : {bgColor: string}) {
    const { user, clearAuth } = useAuthStore()

    const displayName = user?.name ?? "Guest"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className= "flex shrink-0 h-12 w-12 items-center justify-center rounded-lg transition-colors cursor-pointer hover:bg-[hsl(var(--leftbar-hover))]"
                    title={displayName}
                >
                    <UserIconPlaceHolder bgColor={bgColor} text={displayName} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" side="top" align="start" alignOffset={40} >
                <div className="flex flex-col items-center gap-1 px-3 py-2 select-none pointer-events-none">
                    <UserIconPlaceHolder bgColor={bgColor} text={displayName} />
                    <span className="text-sm font-medium">{displayName}</span>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={async () => {
                        try {
                            await authApi.logout()
                        } catch (err) {
                            console.error("Logout API failed:", err)
                        } finally {
                            clearAuth()
                        }
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}