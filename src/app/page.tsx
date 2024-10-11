import {Box, Container, Paper} from "@mui/material";
import PostForm from "@/components/forms/PostForm";
import {db} from "@/util/db";
import {handlePost} from "@/actions/posts";
import Post from "@/components/Post";
import React from "react";

export default function Home() {


    //db().query("")

    const fauxPosts = [{username: "shane", post: "hai", time: Date()}, {username: "shane", post: "hai", time: Date()}, {username: "shane", post: "hai", time: Date()}, {username: "shane", post: "hai", time: Date()}]

    return (
        <>
            <Paper className={"max-w-xl mx-auto"}>
                <PostForm onPost={handlePost}></PostForm>
            </Paper>
            <Box>
                <Container>
                    {fauxPosts.map((post, i) => (
                        <Post key={i} {...post}/>
                    ))}
                </Container>
            </Box>
        </>
    );

}
