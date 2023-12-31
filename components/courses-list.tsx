import { Category, Course } from "@prisma/client";
import { CourseCard } from "@/components/course-card"

type Course_With_Progress_With_Category = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
} 

interface CoursesListProps{
    items: Course_With_Progress_With_Category[];
}
export const CoursesList = ({items}:CoursesListProps) => {
    return (
        <div>
             <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((items)=>(
                <CourseCard 
                    key={items.id}
                    id={items.id}
                    title={items.title}
                    imageUrl={items.imageUrl!}
                    chaptersLength={items.chapters.length}
                    price={items.price!}
                    progress={items.progress}
                    category={items?.category?.name!}
                />
            ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No Courses Found
                </div>
            )}
        </div>
    )
}