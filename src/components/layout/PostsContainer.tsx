'use client'
import {Box, Paper, Tab, Tabs} from "@mui/material";
import {PostEntry} from "@/types/PostEntry";
import React from "react";
import Image from "next/image";

export default function PostsContainer() {
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const rows: PostEntry[] = [{
        username: "shane",
        content: "hai",
        created_at: Date(),
        id: 1,
        clerk_id: 'user_2nCKQsw74EqcczWsyHlbvGp8nJT',
        profile_id: 1
    }, {
        username: "shane",
        content: "hai",
        created_at: Date(),
        id: 1,
        clerk_id: 'user_2nCKQsw74EqcczWsyHlbvGp8nJT',
        profile_id: 1
    }, {
        username: "shane",
        content: "hai",
        created_at: Date(),
        id: 1,
        clerk_id: 'user_2nCKQsw74EqcczWsyHlbvGp8nJT',
        profile_id: 1
    }, {
        username: "shane",
        content: "hai",
        created_at: Date(),
        id: 1,
        clerk_id: 'user_2nCKQsw74EqcczWsyHlbvGp8nJT',
        profile_id: 1
    }]




    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setSelectedTab(newValue);
    }


    return (
        <Paper>
            <Tabs variant={'fullWidth'} onChange={handleChange} value={selectedTab}>
                <Tab label={"Explore"}/>
                <Tab label={"Followers"}/>
            </Tabs>
            {selectedTab === 0 && (<Box>
                    {rows.map((row) => (
                        <div key={row.id}>
                            <Image width={60} height={60} src={`/api/user/${row.profile_id}/image`} alt={row.username} priority={true}/>
                        </div>
                    ))}
                </Box>
            )}

        </Paper>
    )
}
