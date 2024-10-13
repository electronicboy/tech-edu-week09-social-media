'use client'
import {Box, FormGroup, FormHelperText, IconButton, Input, InputLabel, Snackbar} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function PostForm({onPost}: {onPost: (post: FormData) => Promise<{ success: boolean, message?: string }>}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>();
    const [postNotification, setPostNotification] = useState<{success: boolean, message: string}|null>(null);

    async function handlePost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const target = e.target as HTMLFormElement;
        const formData = new FormData(target)

        try {
            setLoading(true)

            const res = await onPost(formData)
            if (!res.success && res.message) {
                setPostNotification({success: res.success, message: res.message!})
            } else if (res.success) {
                setPostNotification({success: res.success, message: "Your new post has been published!"})
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        }
        finally {
            setLoading(false)
        }

        target.reset()
    }

    function handleClose() {
        setPostNotification(null)
    }

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

    return (
        <>
            <Box component={'form'} onSubmit={handlePost}>
                <FormGroup>
                    <InputLabel htmlFor={"post"}>How was your day?</InputLabel>
                    <Input id={"post"} name={"post"} multiline={true}></Input>
                </FormGroup>
                {error && <FormHelperText error={true}>{error}</FormHelperText>}
                <FormGroup>
                    <LoadingButton loading={loading} type={'submit'}>Post!</LoadingButton>
                </FormGroup>
            </Box>
            {postNotification && (<Snackbar message={postNotification.message} action={action} onClose={handleClose} open={true} autoHideDuration={3000} />)}
        </>
    )





}
