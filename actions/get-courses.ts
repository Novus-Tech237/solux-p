import { Category, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type Course_With_Progress_With_Category = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}
type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
}
export const getCourses = async ({userId, title, categoryId}:GetCourses):Promise<Course_With_Progress_With_Category []> =>{
    try {
       const courses = await db.course.findMany({
        where: {isPublished: true, title: {contains: title}, categoryId},
        include: {category: true, chapters:{where:{isPublised: true}, select:{id: true}}, purchases:{where:{userId}}},
        orderBy: {createdAt: "desc"}
       }) 
       const coursesWithProgress: Course_With_Progress_With_Category[] = await Promise.all(
        courses.map(async course => {
            if (course.purchases.length === 0){
                return {...course, progress: null}
            }
            const progressPercentage = await getProgress(userId, course.id)
            return{...course, progress: progressPercentage}
        })
       )
       return coursesWithProgress
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
}