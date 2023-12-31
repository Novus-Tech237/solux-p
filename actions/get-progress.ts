import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export const getProgress = async(userId: string, courseId: string): Promise<number> => {
    try {
        const publishedChapters = await db.chapter.findMany({
            where: {courseId: courseId, isPublised: true,},
            select: {id: true}
        })
        const publishedChapterIds = publishedChapters.map((chapter)=>chapter.id)
        const validCompletedChapters = await db.userProgress.count({
            where:{userId: userId, chapterId: {in: publishedChapterIds}, isCompleted: true}
        })
        const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100
        return progressPercentage
    } catch (error) {
        console.log("[CHAPTER_ID_DELETE]", error);
        return 0;
    }
}