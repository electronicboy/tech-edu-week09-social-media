import {db} from "@/util/db";
import {PostEntry} from "@/types/PostEntry";

export default async function Posts() {

    const res = await db().query<PostEntry>(/* language=PostgreSQL */ "SELECT posts.id as id, profile_id, content, created_at FROM socialmedia_posts posts INNER JOIN socialmedia_profile profile ON profile_id = profile.id");
    if (res.rowCount === 0) {
        return (
            <span>Theres nothing here jim!</span>
        )
    }


    return (
        <div>Posts</div>
    )
}
