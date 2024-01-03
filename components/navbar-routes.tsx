"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
    </>
  )
}
// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut } from "lucide-react";
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher } from "@/lib/teacher";

// export const NavbarRoutes = () => {
//   const { userId } = useAuth()
//   const pathname = usePathname();
//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.startsWith("/courses");
//   const isSearchPage = pathname === "/search";

//   let redirectPath = "";
//   let buttonLabel = "";
//   let showIcon = true;

//   if (isPlayerPage) {
//     redirectPath = "/search";
//     buttonLabel = "Exit";
//   } else if (isTeacherPage) {
//     redirectPath = "/";
//     buttonLabel = "Exit";
//   } else {
//     isTeacher(userId) ? redirectPath = "/teacher/courses" : null;
//     buttonLabel = "Teacher Board";
//     showIcon = false; // Set showIcon to false when the button label is "Teacher Board"
//   }

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}
//       <div className="flex gap-x-2 ml-auto">
//         <Link href={redirectPath}>
//           <Button size="sm" variant="ghost">
//             {showIcon && <LogOut className="h-4 w-4 mr-2" />} {/* Show the icon only when showIcon is true */}
//             {buttonLabel}
//           </Button>
//         </Link>
//         <UserButton />
//       </div>
//     </>
//   );
// };