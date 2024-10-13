import {auth} from "@clerk/nextjs/server";
import {db} from "@/util/db";
import {notFound, redirect} from "next/navigation";

export default async function ProfilePageRedirector() {
    const {userId} = auth();

    if (userId) {
        const queryRes = await db().query<{ id: number }>(/* language=PostgreSQL */ "SELECT id FROM socialmedia_profile WHERE clerk_id = $1", [userId])
        if (queryRes.rows.length > 0) {
            redirect(`/profile/${queryRes.rows[0].id}`);
        } else {
            notFound()
        }

    }

}
