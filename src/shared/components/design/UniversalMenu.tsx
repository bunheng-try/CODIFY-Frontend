import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type MenuItem = {
    label: string;
    onClick?: () => void;
    danger?: boolean;
    type?: "default" | "separator";
    icon?: React.ReactNode;
};

type UniversalMenuProps = {
    items: MenuItem[];
    trigger?: React.ReactNode; // If you pass this, menu opens on click
    position?: { x: number; y: number }; // If you pass position, menu opens at coords (context menu)
    onClose?: () => void;
};

export function UniversalMenu({ items, trigger, position, onClose }: UniversalMenuProps) {
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Close menu if clicked outside
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose?.();
            }
        };
        if (position) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [position, onClose]);

    const contentStyle = position
        ? { position: "fixed", top: position.y, left: position.x, zIndex: 50, minWidth: 180 }
        : {};

    const menuContent = (
        <div ref={menuRef} style={contentStyle as React.CSSProperties} className="bg-popover rounded-md shadow-md py-1 border">
            {items.map((item, i) => {
                if (item.type === "separator") return <DropdownMenuSeparator key={i} />;
                return (
                    <DropdownMenuItem
                        key={i}
                        onClick={() => {
                            item.onClick?.();
                            onClose?.();
                        }}
                        className={cn(item.danger ? "text-destructive hover:bg-destructive/10" : "")}
                    >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.label}
                    </DropdownMenuItem>
                );
            })}
        </div>
    );

    // Right-click / context menu
    if (position) return menuContent;

    // Triggered menu (like three-dot)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">{menuContent}</DropdownMenuContent>
        </DropdownMenu>
    );
}