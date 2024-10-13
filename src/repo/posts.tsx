import {PostEntry} from "@/types/PostEntry";
import {db} from "@/util/db";
import {currentUser} from "@clerk/nextjs/server";
import {PostType} from "@/types/PostType";




export async function getPosts(type: PostType, since?: number, limit?: number): Promise<PostEntry[]|null> {
    const limitToFollowers = type == PostType.FOLLOWING;
    let posts: PostEntry[] | null = null;

    if (!limitToFollowers) {
        const queryRes = await db().query<PostEntry>( /* language=PostgreSQL */
            `SELECT post.id, profile.id as profile_id, profile.username, post.content, post.created_at, profile.clerk_id FROM socialmedia_posts post INNER JOIN socialmedia_profile profile ON post.profile_id = profile.id`)

        posts = queryRes.rows;
    } else {

        const user = await currentUser()

        if (user !== null) {
            const queryRes = await db().query<PostEntry>( /* language=PostgreSQL */
                `SELECT posts.id   as id,
                        profile.id as profile_id,
                        username,
                        content,
                        created_at,
                        clerk_id
                 FROM socialmedia_follows
                          INNER JOIN socialmedia_posts posts ON followee = posts.profile_id
                          INNER JOIN socialmedia_profile profile ON posts.profile_id = profile.id
                 WHERE socialmedia_follows.follower = (SELECT id FROM socialmedia_profile WHERE clerk_id = $1)`,
                [user.id]
            )

            posts = queryRes.rows;

        }

    }

    return posts;
}
