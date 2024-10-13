'use client'
import {PostEntry} from "@/types/PostEntry";
import {PostType} from "@/types/PostType";
import useSWR from "swr";
import {FaSpinner} from "react-icons/fa6";
import {Card, Paper} from "@mui/material";

const fetcher = (...args: string[]) => fetch(args.join('')).then(res => res.json())

export default function Posts({type}: { type: PostType }) {
    // SWR supports suspense, but, not for SSR...
    const {data, error, isLoading} = useSWR<{success: boolean, message?: string, posts: PostEntry[]}>([`/api/posts?type=${type}`], fetcher)

    if (isLoading) {
        return <div><FaSpinner/></div>
    }
    if (error || data?.success === false || (!isLoading && data === undefined)) {
        if (error) {
            return <div>{JSON.stringify(error)}</div>;
        } else if (data?.message) {
            return <div>{data!.message}</div>
        } else {
            return <div>{"An unexpected error occured!"}</div>
        }
    }

    const posts = data!.posts;


    console.log("posts", posts);
    if (posts.length === 0) {
        return (<div>
            {"Looks like there is nothing here yet, why don't you change that?"}
        </div>)
    }
    return (
        <>
            <div>
                {JSON.stringify(posts)}
            </div>
            <div>
                {posts.map((post, i) => (
                    <div key={i} className={"*:border-b *:last:border-none"}>

                        <div key={i}>{post.content}</div>
                    </div>

                ))}
            </div>
        </>

    )
}
