import { NavbarRoutes } from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { checkSubscription } from "@/lib/subscription";

interface CourseNavbarProps{
    course: Course &{
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[];
    }
    progressCount: number

}

export const CourseNavbar= async ({course, progressCount}:CourseNavbarProps)=>{
    const isPro = await checkSubscription
    return(
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <CourseMobileSidebar 
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes isPro/>
        </div>
    )
}