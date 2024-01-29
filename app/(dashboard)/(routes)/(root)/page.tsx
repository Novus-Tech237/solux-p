import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { CheckCircle, Clock, Layout } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { IoMdCash } from "react-icons/io";
import { IconBadge } from "@/components/icon-badge";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
        <div className="flex flex-row items-center gap-x-2 pt-5">
            <Layout className="text-orange-600"/>
            <h1 className="text-2xl font-bold text-orange-600">Dashboard</h1>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
       />
      {/* <div className="border rounded-md flex items-center gap-x-2 p-3">
        <IconBadge
          icon={IoMdCash}
          variant="default"
        />
        <p className="font-medium">
          Subscription Status/ TimeOut
        </p>
        <p className="text-gray-500 text-sm">
          Developer Pack
        </p>

      </div> */}
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}