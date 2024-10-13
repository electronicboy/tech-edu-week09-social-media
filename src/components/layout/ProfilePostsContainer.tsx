'use client'
import {Box, Paper} from "@mui/material";
import React from "react";
import Posts from "@/components/layout/Posts";
import {PostType} from "@/types/PostType";

export default function ProfilePostsContainer({profile}: { profile: number }) {

    return (
        <Paper>
            <Box>
                <Posts type={PostType.USER} profile={profile}/>
            </Box>
        </Paper>
    )
}
