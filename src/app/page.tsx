import {Box, Paper} from "@mui/material";
import PostForm from "@/components/forms/PostForm";
import {handlePost} from "@/actions/posts";
import React from "react";
import PostsContainer from "@/components/layout/PostsContainer";
import {getPosts} from "@/repo/posts";
import {auth} from "@clerk/nextjs/server";
import {PostType} from "@/types/PostType";

export default async function Home() {

    const {userId} = auth();

    return (
        <>
            <Paper className={"max-w-xl mx-auto"} variant={"outlined"} >
                <PostForm onPost={handlePost}></PostForm>
            </Paper>
            <Box className={"mt-8"}>
                <PostsContainer/>
            </Box>
        </>
    );

}
