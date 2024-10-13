import React from 'react'
import {Box} from "@mui/material";
import {ProfileData} from "@/types/ProfileData";
import Image from "next/image";
import {db} from "@/util/db";
import {auth} from "@clerk/nextjs/server";
import UserFollowButton from "@/components/UserFollowButton";
import {revalidatePath} from "next/cache";

export default async function UserProfileInfoView({profileData}: {
    profileData: ProfileData,
}) {
    const {userId} = auth()


    const query = await db().query( /* language=PostgreSQL */
        "SELECT follower, followee FROM socialmedia_follows WHERE follower = (SELECT id FROM socialmedia_profile profile WHERE profile.clerk_id = $1) AND followee = $2", [userId, profileData.id])
    const isFollowing = query.rowCount != 0;


    async function toggleFollowing(): Promise<{success: boolean, newState?: boolean}> {
        'use server'

        let changed = false;
        try {
            if (isFollowing) {
                const query = await db().query(`DELETE FROM socialmedia_follows WHERE follower = (SELECT id FROM socialmedia_profile profile WHERE profile.clerk_id = $1) AND followee = $2`, [userId, profileData.id])
                if (query.rowCount != 0) {
                    changed = true;
                    return {success: true, newState: false}
                }
            } else {
                const query = await db().query(/* language=PostgreSQL */
                    `INSERT INTO socialmedia_follows (follower, followee)
                     VALUES ((SELECT id FROM socialmedia_profile profile WHERE profile.clerk_id = $1), $2)`, [userId, profileData.id])
                if (query.rowCount != 0) {
                    changed = true;
                    return {success: true, newState: true}
                }
            }

        } finally {
            if (changed) {
                revalidatePath(`/profile/${profileData.id}`)
            }
        }


        return {success: false}

    }


    return (
        <Box className={"mx-auto mx-w-2xl p-4 border shadow flex flex-col gap-4"}>
            <Box className={"flex items-center flex-col"}>
                <Image src={`/api/user/public/${profileData.id}/image`} alt={profileData.username} width={128}
                       height={128}/>
                <span>{profileData.username}</span>
                <UserFollowButton isFollowing={isFollowing} profile={profileData} toggleFollow={toggleFollowing}/>
            </Box>
            <Box>
                <h2 className={"text-slate-600"}>About</h2>
                <Box>{profileData.bio}</Box>
            </Box>
        </Box>
    )
}
