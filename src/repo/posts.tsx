import {PostEntry} from "@/types/PostEntry";
import {db} from "@/util/db";
import {currentUser} from "@clerk/nextjs/server";
import {PostType} from "@/types/PostType";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPosts(type: PostType, profile?: number|null, since?: number, limit?: number): Promise<PostEntry[] | null> {
    let posts: PostEntry[] | null = null;

    if (type == PostType.DEFAULT) {
        const queryRes = await db().query<PostEntry>( /* language=PostgreSQL */
            `SELECT post.id, profile.id as profile_id, profile.username, post.content, post.created_at, profile.clerk_id
             FROM socialmedia_posts post
                      INNER JOIN socialmedia_profile profile ON post.profile_id = profile.id`)

        posts = queryRes.rows;
    } else {

        const user = await currentUser()

        if (user !== null && type == PostType.FOLLOWING) {
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
        } else if (user != null && type == PostType.USER) {
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
                 WHERE socialmedia_follows.follower = (SELECT id FROM socialmedia_profile WHERE id = $1)`,
                [profile]
            )
            posts = queryRes.rows;
        }
    }
    return posts;
}
