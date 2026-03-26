import { getInitials } from '@/shared/utils/strings'
import { cn } from '@/lib/utils'

interface UserIconPlaceHolderProps {
    text: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    shape?: 'circle' | 'rounded' | 'square'
    bgColor?: string
    className?: string
}

const sizeMap = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
    xl: 'h-12 w-12 text-lg',
}

const shapeMap = {
    circle: 'rounded-full',
    rounded: 'rounded-md',
    square: 'rounded-none',
}

function getContrastColor(hexColor: string) {
    let hex = hexColor.replace('#', '')
    if (hex.length !== 6) return '#FFFFFF'
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

const UserIconPlaceHolder = ({
    text,
    size = 'lg',
    shape = 'circle',
    bgColor = 'var(--primary)',
    className,
}: UserIconPlaceHolderProps) => {
    const initials = getInitials(text)

    let textColor = 'inherit'
    if (/^#?[0-9A-Fa-f]{6}$/.test(bgColor)) {
        if (!bgColor.startsWith('#')) bgColor = `#${bgColor}`
        textColor = getContrastColor(bgColor)
    }

    return (
        <div
            className={cn(
                sizeMap[size],
                shapeMap[shape],
                'flex items-center justify-center font-semibold',
                className
            )}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {initials}
        </div>
    )
}

export default UserIconPlaceHolder