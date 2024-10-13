'use client'
import {PostEntry} from "@/types/PostEntry";
import {PostType} from "@/types/PostType";
import useSWR from "swr";
import {FaSpinner} from "react-icons/fa6";
import React from "react";
import Post from "@/components/Post";
import PostSkeleton from "@/components/PostSkeleton";

const fetcher = (...args: string[]) => fetch(args.join("")).then(res => res.json())

export default function Posts({type, profile}: { type: PostType, profile?: number }) {
    // SWR supports suspense, but, not for SSR...
    const profileSWRKey = profile ? `&profile=${profile}` : '';
    const {data, error, isLoading} = useSWR<{
        success: boolean,
        message?: string,
        posts: PostEntry[]
    }>([`/api/posts?type=${type}${profileSWRKey}`], fetcher)


    // if loading, show spinner, fail container is probably not aptly named
    if (isLoading) {
        return (
            <>
                <div className={"*:border-b *:border-b-gray-500 last:border-none"}>
                    <PostSkeleton/>
                    <PostSkeleton/>
                </div>
            </>
        )
    } else {
        // validate more explict failure states here
        if (error || data?.success === false || (!isLoading && data === undefined)) {
            if (error) {
                return <FailContainer>{JSON.stringify(error)}</FailContainer>;
            } else if (data?.message) {
                return <FailContainer>{data!.message}</FailContainer>
            } else {
                return <FailContainer>{"An unexpected error occurred!"}</FailContainer>
            }
        }
    }

    // At this point, we should have data, so this is an unexpected state...
    const posts = data?.posts;
    if (!data) {
        console.log(data, error, isLoading)
        return <FailContainer>{JSON.stringify({data: data, error: error, isLoading: isLoading})}</FailContainer>
    }

    // This is not ideal, but, outside of extracting out the fetch response into an object of its own, this is the easiest
    if (data.success && data.posts == null) {
        return <FailContainer>Looks like there is nothing here for you, are you logged in?</FailContainer>
    }


    if (posts && posts.length === 0) {
        return <FailContainer>{"Looks like there is nothing here yet, why don't you change that?"}</FailContainer>
    }

    // "This should not happen" - also, appeases the access below
    if (posts == undefined) {
        console.log("unexpected data state", data)
        return <FailContainer>{"Unexpected client state."}</FailContainer>
    }

    console.log("posts", posts, "data", data);
    return (
        <>
            <div>
                {JSON.stringify(posts)}
            </div>
            <div className={"*:border-b *:border-b-gray-500 last:border-none"}>
                {posts.map((post) => (
                    <Post post={post} key={post.id}/>

                ))}
            </div>
        </>

    )
}

export function FailContainer({children}: { children: React.ReactNode }) {
    return (
        <div className={"text-center py-4 text-xl"}>
            {children}
        </div>
    )
}
