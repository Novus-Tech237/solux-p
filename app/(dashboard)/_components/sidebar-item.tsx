"use client"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps{
    icon: LucideIcon;
    label: string;
    href: string;
};

export const SidebarItem = ({icon:Icon, label, href}:SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname ==="/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`)

    const onClick = () =>{router.push(href)}

    return (
        <button
         onClick={onClick} 
         type="button"
         className={ cn(
            "flex items-center gap-x-2 text-slate-500 font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-orange-300/20",
            isActive && "text-orange-500 bg-orange-200/20 hover:bg-orange-200/20 hover:text-orange-700")} 
        >
        <div className="flex items-center gap-x-2 py-4">
            <Icon
                size={22}
                className={cn("text-slate-500", isActive && "text-orange-500")}
            />
            {label}
        </div>
        <div className={cn("ml-auto opacity-0 border-2 border-orange-500 w-full transition-all", isActive && "opacity-100")}></div>
        </button>
    )
}   