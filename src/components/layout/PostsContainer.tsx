'use client'
import {Box, Paper, Tab, Tabs} from "@mui/material";
import {PostEntry} from "@/types/PostEntry";
import React, {Suspense} from "react";
import {FaSpinner} from "react-icons/fa6";
import Posts from "@/components/layout/Posts";
import {PostType} from "@/types/PostType";

export default function PostsContainer() {
    const [selectedTab, setSelectedTab] = React.useState<number>(0);


    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setSelectedTab(newValue);
    }


    return (
        <Paper>
            <Tabs variant={'fullWidth'} onChange={handleChange} value={selectedTab}>
                <Tab label={"Explore"}/>
                <Tab label={"Followers"}/>
            </Tabs>
            {selectedTab === 0 && (
                <Suspense fallback={<><FaSpinner/></>}>
                    <Box>
                        <Posts type={PostType.DEFAULT}/>
                    </Box>
                </Suspense>
            )}
            {selectedTab === 1 && (
                <Suspense fallback={<><FaSpinner/></>}>
                    <Box>
                        <Posts type={PostType.FOLLOWING}/>
                    </Box>
                </Suspense>
            )}

        </Paper>
    )
}
