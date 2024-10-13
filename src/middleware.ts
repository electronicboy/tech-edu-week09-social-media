import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

// https://clerk.com/blog/add-onboarding-flow-for-your-application-with-clerk
const isPublicRoute = createRouteMatcher(['/', '/onboarding', '/sign-in', '/sign-up', '/api/posts', '/api/user/public/(.*)'])
const signinRoutes = createRouteMatcher(['/sign-in', '/sign-up', '/onboarding'])

export default clerkMiddleware((auth, req) => {
    const {userId, sessionClaims, redirectToSignIn} = auth();
    console.log("middleware", userId)

    if (!userId) {
        if (isPublicRoute(req)) {
            return NextResponse.next();
        }
        return redirectToSignIn();
    }

    if (userId && !sessionClaims?.metadata?.onboardingComplete && !signinRoutes(req)) {
        const onboarding = new URL("/onboarding?redirect=" + encodeURIComponent(req.nextUrl.pathname), req.url)
        return NextResponse.redirect(onboarding)
    }

    return NextResponse.next()

});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
