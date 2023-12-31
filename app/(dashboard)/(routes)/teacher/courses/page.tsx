import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import App from "next/app";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { List } from "lucide-react";


const CoursesPage = async () => {
    const { userId } = auth();
    if(!userId){
        return redirect("/")
    }
    const courses = await db.course.findMany({
        where: { userId},
        orderBy: { createdAt: "desc"}
    })
    return ( 
        <div className="p-6">
            <div className="flex flex-row items-center gap-x-2">
                <List className="text-orange-600"/>
                <h1 className="text-2xl font-bold text-orange-600">Courses</h1>
            </div>
            <DataTable columns={columns} data={courses} />
        </div>
     );
}
 
export default CoursesPage;