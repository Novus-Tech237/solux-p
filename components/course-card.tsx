import Link from "next/link";
import Image from "next/image";
import { IconBadge } from "@/components/icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";


interface CourseCardProps{
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string
}

export const CourseCard = ({id, title, imageUrl, chaptersLength, price, progress, category}:CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-lg transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative -z-10 w-full rounded-md overflow-hidden">
          <Image
            width={400}
            height={400}
            className="flex items-center justify-center"
            alt={title}
            src={imageUrl}
          />
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-orange-700 line-clamp-2">
                {title}
            </div>
            <p className="text-xs text-muted-foreground">
                {category}
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                <div className="flex items-center gap-x-1 text-slate-500">
                    <IconBadge size="sm" icon={BookOpen}/>
                    <span>{chaptersLength} {chaptersLength === 1? "Chapter":"Chapters"}</span>
                </div>
            </div>
            {progress !== null ?(
                <CourseProgress
                variant={progress === 100 ? "success" : "default"}
                size="sm"
                value={progress}
              />
            ):(<p className="text-sm md:text-sm font-medium text-slate-700">{formatPrice(price)}</p>)}
          </div>
        </div>
      </div>
    </Link>
    )
}