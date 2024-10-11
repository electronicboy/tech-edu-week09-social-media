'use server'

import {auth} from "@clerk/nextjs/server";
import {db} from "@/util/db";
import {revalidatePath} from "next/cache";

export async function handlePost(formData: FormData) {
    'use server'
    const {userId} = auth()
    const post = formData.get('post');

    if (!post) {
        return {success: false, message: "Missing post"};
    }


    const dbRes = await db()
        .query( /* language=PostgreSQL */
            `INSERT INTO socialmedia_posts (profile_id, content)
             VALUES ((SELECT id FROM socialmedia_profile WHERE clerk_id = $1), $2)`,
            [userId, formData.get('post')])

    if (dbRes.rowCount != 0) {
        revalidatePath('/')
        return {success: true}
    }
}
