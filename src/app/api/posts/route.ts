import { db } from "@/util/db";
import {NextRequest, NextResponse} from "next/server";
import {PostEntry} from "@/types/PostEntry";
import {currentUser} from "@clerk/nextjs/server";



export default async function GET(request: NextRequest): Promise<NextResponse<{success: boolean, message?: string}>> {
    const type = request.nextUrl.searchParams.get('type')
    const since = request.nextUrl.searchParams.get('since')
    const limit = request.nextUrl.searchParams.get('limit')
    let limitToFollowers = false;
    let since: number = -1;
    let limit: number = -1;
    if (type === "followers") {
        limitToFollowers = true;
    }

    let posts

    if (!limitToFollowers) {
        posts = db().query<PostEntry>( /* language=PostgreSQL */
            `SELECT post.id, profile.id as profile_id, profile.username, post.content, post.created_at, profile.clerk_id FROM socialmedia_posts post INNER JOIN socialmedia_profile profile ON post.profile_id = profile.id WHERE created_at < $1`)
    } else {
        const user = await currentUser()
        if (user === null) {
            return new NextResponse({success: false, message: "You are not logged in"}, )
        }

        posts = db().query()
    }

    return new NextResponse({success: posts.rowCount > 0})

}
