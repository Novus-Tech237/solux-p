import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: {courseId: string; chapterId: string}}){
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        const ownCourse = await db.course.findUnique({
            where: {id: params.courseId, userId}
        })
        if(!ownCourse){
            return new NextResponse("Unauthorized", {status: 401})
        }
        const chapter = await db.chapter.update({
            where: {id: params.chapterId, courseId: params.courseId},
            data: {...values}
        })
        /* ToDo Video Upload */

        // Return a success response
        return new NextResponse("Chapter updated successfully", {status: 200});
    } catch (error) {
        console.log("[COURSES_CHAPTER_ID]", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}