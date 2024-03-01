"use client"

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Divide, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { SearchInput } from "./search-input";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { UpgradeModal } from "./modals/upgrade-modal";


interface NavbarRoutesProps {
isPro?: boolean;
}

export const NavbarRoutes = ({ isPro }: NavbarRoutesProps) => {
    const { userId } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";
    const [loading, setLoading] = useState(false);
    const [isProState, setIsProState] = useState(isPro);
    const { toast } = useToast();

    useEffect(() => { setIsProState(isPro); }, [isPro]);

    const onSubscribe = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/stripe");
        if (response.data.subscriptionSuccess) {
          setIsProState(true);
        }
        router.refresh()
        router.refresh()
        router.refresh()
        window.location.href = response.data.url;
      } catch (error) {
          toast({
                 description: "Something went wrong",
                 variant: "destructive",
          });
        } finally {
            setLoading(false);
          }
      };

    return (
      <>
      {isSearchPage && <div className="hidden md:block"><SearchInput /></div>}
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

        {!isPro && !isTeacher(userId) && (
          <UpgradeModal onSubscribe={onSubscribe}>
            <Button disabled={loading} size="sm" variant="default">
              Upgrade
              <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
            </Button>
          </UpgradeModal>
        )}

          <UserButton afterSignOutUrl="/" />
      </div>
      </>
      );
};