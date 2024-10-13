'use client' // oh noez
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useState} from "react";
import {IconButton, Snackbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ProfileData} from "@/types/ProfileData";

export default function UserFollowButton({isFollowing, profile, toggleFollow}: {
    isFollowing: boolean,
    profile: ProfileData,
    toggleFollow: () => Promise<{ success: boolean, newState?: boolean }>
}) {
    const [isProcessing, setProcessing] = useState<boolean>(false)
    const [followNotification, setFollowNotification] = useState<{success: boolean, newState: boolean}|null>(null);

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
        </>
    )

    function handleClose() {
        setFollowNotification(null)
    }

    async function handleToggle() {
        try {
            setProcessing(true)
            const res = await toggleFollow()
            if (res.success && res.newState != undefined) {
                setFollowNotification({success: res.success, newState: res.newState!})
            }
        } finally {
            setProcessing(false)
        }
    }



    return (<>
            <LoadingButton loading={isProcessing} variant={isFollowing ? 'text' : 'contained'}
                           onClick={handleToggle}>{isFollowing ? "Unfollow" : "Follow"}</LoadingButton>
            {followNotification && (<Snackbar message={followNotification.newState ? `You are now following ${profile.username}` : `You have unfollowed ${profile.username}` } action={action} onClose={handleClose} open={true} autoHideDuration={3000} />)}
        </>
    )


}
