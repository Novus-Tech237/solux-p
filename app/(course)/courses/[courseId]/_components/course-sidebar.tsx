import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db"
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { Button } from "@/components/ui/button";
import { checkSubscription } from "@/lib/subscription";
import { FaRobot } from 'react-icons/fa'
import Link from "next/link";
interface CourseSidebarProps{
    course: Course & {
        chapters: (Chapter & {userProgress: UserProgress[] | null;})[]
    }
    progressCount: number;

}

export const CourseSidebar = async ({course, progressCount}:CourseSidebarProps) =>{
    const isPro = await checkSubscription();
    const { userId } = auth();
    if(!userId) {
        return redirect("/")
    }
    const purchase = await db.purchase.findUnique({
        where:{
            userId_courseId:{
                userId,
                courseId: course.id,
            }
        }
    })
    
    return(
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">{course.title}</h1>
                {purchase && (
                    <div className="mt-10">
                        <CourseProgress 
                            variant="success"
                            value={progressCount}
                        />
                    </div>
                )}
                {isPro && purchase && (
                    <div className="mt-10 justify-center items-center flex gap-x-2">
                        <Link href={`/courses/${course.id}/ana/chat`}>
                            <Button className="bg-orange-600 hover:bg-orange-400">
                                Ask ANA
                                <FaRobot size={21} className="ml-2"/>
                            </Button>
                        </Link>
                        
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter)=>(
                    <CourseSidebarItem 
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted = {!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchase}
                    />
                ))}
            </div>
        </div>
    )
}

