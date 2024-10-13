import {PostEntry} from "@/types/PostEntry";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Post({post}: {post: PostEntry}) {

    return (
        <div className={"flex flex-col"}>
            <div className={"flex"}>
                <div>
                    <Image src={`/api/user/public/${post.profile_id}/image`} alt={post.username} width={64} height={64}/>
                </div>
                <div className={"ml-4"}>
                    <div className={"font-bold"}><Link href={`/profile/${post.profile_id}`}>{post.username}</Link></div>
                    <div>{post.content}</div>
                </div>

            </div>
            <div>
                <span className={"text-slate-400"}>{post.created_at}</span>
            </div>
        </div>
    )
}
