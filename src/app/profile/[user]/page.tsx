import {ProfileData} from "@/types/ProfileData";
import {db} from "@/util/db";
import {notFound} from "next/navigation";
import UserProfileInfo from "@/components/forms/UserProfileInfo";
import {auth} from "@clerk/nextjs/server";
import ProfilePostsContainer from "@/components/layout/ProfilePostsContainer";

export default async function ProfilePage({params}: { params: { user: string } }) {

    const {userId} = auth();

    async function noopHandler() {
        'use server'
        return {success: false}
    }

    async function processUpdate(data: FormData) {
        'use server'

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

                return {success: true};
            }

        } catch (error) {
            console.error(error);
            return {success: false, error: "An internal error occurred"}
        }

        return {success: false, error: "Unexpected state"}
    }

    console.log(params.user)
    const userStr = params.user;
    const userNum = Number(params.user);

    let profileData: ProfileData = null;

    if (userNum) {
        const queryRes = await db().query<ProfileData>("SELECT * FROM socialmedia_profile WHERE id = $1", [Number(params.user)])
        if (queryRes.rowCount === 1) {
            profileData = queryRes.rows[0];
        }
    } else {
        const queryRes = await db().query<ProfileData>("SELECT * FROM socialmedia_profile WHERE username = $1", [userStr])
        if (queryRes.rowCount === 1) {
            profileData = queryRes.rows[0];
        }
    }

    if (!profileData) {
        notFound()
    }

    if (profileData.clerk_id === userId) {
        return (<UserProfileInfo onUpdate={processUpdate} profileData={profileData}/>)
    } else {
        return (<>
            <UserProfileInfo onUpdate={noopHandler} profileData={profileData} readOnly={true}/>
            <ProfilePostsContainer profile={userNum}/>
        </>)

    }


}
