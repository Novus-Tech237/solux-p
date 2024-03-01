import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/api/uploadthing", "/api/coursepayment", "/api/usersubscription"]
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"],
};