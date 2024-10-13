'use client'
import {Box, Paper} from "@mui/material";
import React, {Suspense} from "react";
import {FaSpinner} from "react-icons/fa6";
import Posts from "@/components/layout/Posts";
import {PostType} from "@/types/PostType";

export default function ProfilePostsContainer({profile}: {profile: number}) {

    return (
        <Paper>
                <Suspense fallback={<><FaSpinner/></>}>
                    <Box>
                        <Posts type={PostType.USER} profile={profile} />
                    </Box>
                </Suspense>
        </Paper>
    )
}
