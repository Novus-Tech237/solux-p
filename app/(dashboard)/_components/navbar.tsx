import { checkSubscription } from "@/lib/subscription";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "@/components/navbar-routes";

export const NavBar = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm relative z-50">
      <MobileSidebar />
      <NavbarRoutes isPro={isPro}/>
    </div>
  );
};