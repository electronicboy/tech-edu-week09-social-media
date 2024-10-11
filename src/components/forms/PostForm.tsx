'use client'
import {Box, Container, FormGroup, FormHelperText, Input, InputLabel} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useState} from "react";
import Post from "@/components/Post";

export default function PostForm({onPost}: {onPost: (post: FormData) => Promise<void>}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>();

    async function handlePost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const target = e.target as HTMLFormElement;
        const formData = new FormData(target)



        try {
            setLoading(true)

            await onPost(formData)
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
        </>
    )





}
