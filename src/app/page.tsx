import {Box, Paper} from "@mui/material";
import PostForm from "@/components/forms/PostForm";
import {handlePost} from "@/actions/posts";
import React from "react";
import PostsContainer from "@/components/layout/PostsContainer";

export default function Home() {



    return (
        <>
            <Paper className={"max-w-xl mx-auto"} variant={"outlined"} >
                <PostForm onPost={handlePost}></PostForm>
            </Paper>
            <Box className={"mt-8"}>
                {"aaaa"}
                <PostsContainer/>
            </Box>
        </>
    );

}
