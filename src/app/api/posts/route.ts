import {NextRequest, NextResponse} from "next/server";
import {PostType} from "@/types/PostType";
import {getPosts} from "@/repo/posts";


export async function GET(request: NextRequest) {
    console.log("get")
    const queryType = request.nextUrl.searchParams.get('type')
    const queryProfile = request.nextUrl.searchParams.get('profile')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const queryPage = request.nextUrl.searchParams.get('page')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const queryLimit = request.nextUrl.searchParams.get('limit')
    const queryTypeNum = queryType && !isNaN(Number(queryType)) ? Number(queryType) : null;

    let type: PostType|null;
    const profile = queryProfile && !isNaN(Number(queryProfile)) ? Number(queryProfile) : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const page: number = -1;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const limit: number = -1;

    if (queryTypeNum == null || queryTypeNum === 0) {
        type = PostType.DEFAULT;
    } else if (queryTypeNum == 1){
type = PostType.FOLLOWING
    } else if (queryTypeNum == 2 && queryTypeNum != null) {
        type = PostType.USER
    } else {
        return new NextResponse(JSON.stringify({success: false, message: "invalid post type/args"}))
    }

    try {
        const posts = await getPosts(type, profile)
        return new NextResponse(JSON.stringify({success: true, posts: posts}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({success: false, message: "an internal error occured"}))

    }

}
