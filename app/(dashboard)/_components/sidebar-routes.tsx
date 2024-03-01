"use client";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { Compass, Layout, List, BarChart, MessageCircle } from "lucide-react";
import { IoLogoWhatsapp, IoMdCash } from "react-icons/io";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
    {
        icon: MessageCircle,
        label: "ChatMe",
        href: "/message",
    },
    {
        icon: IoMdCash,
        label: "Subscription",
        href: "/subscription",
    },
    {
        icon: IoLogoWhatsapp,
        label: "Channel",
        href: "https://whatsapp.com/channel/0029VaBbZhqI7BeNzi1rr41U",
    },
]
const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    }
]
export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher")
    const routes = isTeacherPage ? teacherRoutes : guestRoutes
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col mb-40">
                {routes.map((route)=>(
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))}
            </div>

        </div>
    )
}