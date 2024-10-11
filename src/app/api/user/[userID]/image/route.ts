import {db} from "@/util/db";
import {notFound} from "next/navigation";
import {clerkClient} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function GET(request: Request, params: { params: { userID: string } }) {
    const queryRes = await db().query(/* language=PostgreSQL */ "SELECT username, clerk_id FROM socialmedia_profile WHERE id = $1", [Number(params.params.userID)]);
    if (queryRes.rowCount === 0) {
        notFound()
    }

    const clerkID = queryRes.rows[0].clerk_id;
    const username = queryRes.rows[0].username

    const clerkUser = await clerkClient().users.getUser(clerkID);

    if (!clerkUser) {
        notFound()
    }

    const imgURL = clerkUser.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`

    const response = await fetch(imgURL)

    if (response.status === 200) {
        const img = await response.blob();

        const headers = new Headers()
        headers.set("Cache-Control", "max-age=3600")
        const contentType = headers.get("content-type")
        if (contentType != null) {
            headers.set("Content-Type", contentType)
        }
        return new NextResponse(img,
            {headers: headers})
    }
    notFound()
}
