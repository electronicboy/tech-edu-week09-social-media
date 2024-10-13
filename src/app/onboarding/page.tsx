import React from 'react'
import {Container} from "@mui/material";
import UserProfileInfo from "../../components/forms/UserProfileInfo";
import {db} from "@/util/db";
import {auth, clerkClient} from "@clerk/nextjs/server";

export default function OnboardingPage({searchParams}: { searchParams: { redirect?: string } }) {

    async function processUpdate(data: FormData) {
        'use server'

        const {userId} = auth();

        if (userId == null) {
            return {success: false, message: "You are not logged in"};
        }

        const username = data.get("username")
        const bio = data.get("bio")

        try {
            const query = await db()
                .query(/* language=PostgreSQL */ `INSERT INTO socialmedia_profile (clerk_id, username, bio)
                                                  VALUES ($1, $2, $3)
                                                  ON CONFLICT (clerk_id) DO UPDATE
                                                      SET username = excluded.username,
                                                          bio      = excluded.bio`,
                    [userId, username, bio]);
            if (query.rowCount != 0) {


                await clerkClient().users.updateUser(userId, {
                    publicMetadata: {
                        onboardingComplete: true
                    }
                })

                return {success: true, redirect: searchParams.redirect || '/'};
            }

        } catch (error) {
            console.error(error);
            return {success: false, error: "An internal error occurred"}
        }

        return {success: false, error: "Unexpected state"}
    }


    return (<>
        <Container maxWidth={"md"} fixed>

            <UserProfileInfo onUpdate={processUpdate}/>

        </Container>
    </>)
}
