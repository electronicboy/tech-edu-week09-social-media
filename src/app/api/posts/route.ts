import {db} from "@/util/db";
import {NextRequest, NextResponse} from "next/server";
import {PostEntry} from "@/types/PostEntry";
import {currentUser} from "@clerk/nextjs/server";
import {PostType} from "@/types/PostType";
import {getPosts} from "@/repo/posts";


export async function GET(request: NextRequest) {
    console.log("get")
    const queryType = request.nextUrl.searchParams.get('type')
    const queryPage = request.nextUrl.searchParams.get('page')
    const queryLimit = request.nextUrl.searchParams.get('limit')
    let page: number = -1;
    let limit: number = -1;

    const type: PostType = queryType === "1" ? PostType.FOLLOWING : PostType.DEFAULT;

    try {
        const posts = await getPosts(type)
        return new NextResponse(JSON.stringify({success: true, posts: posts}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({success: false, message: "an internal error occured"}))

    }

}
