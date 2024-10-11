'use client'
import React from 'react'
import {Box, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {useRouter} from 'next/navigation';


export default function UserProfileInfo({onUpdate}: {
    onUpdate: (data: FormData) => Promise<{ success: boolean, error?: string, redirect?: string }>
}) {
    const [currLoading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<null | string>()
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data = new FormData(form)

        setLoading(true)

        let newTarget = null;
        try {
            const response = await onUpdate(data)
            if (response) {
                if (response.success) {
                    if (response.redirect) {
                        newTarget = decodeURIComponent(response.redirect);
                    }
                } else if (!response.success) {
                    setError(response?.error)
                }

            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message)
            }
        } finally {
            setLoading(false)
        }

        console.log(newTarget || '/')

        router.push(newTarget || '/')
    }


    return (
        <Box component='form' className={"mx-auto mx-w-2xl p-4 border shadow flex flex-col"} onSubmit={handleSubmit}>
            <FormControl>
                <InputLabel htmlFor={"username"}>Username</InputLabel>
                <Input id={"username"} name={"username"} type={"text"}
                       slotProps={{input: {required: true, minLength: 3, maxLength: 24}}}
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor={"bio"}>Tell us about yourself</InputLabel>
                <Input id={"bio"} name={"bio"} minRows={5} multiline={true}></Input>
            </FormControl>
            {error && <FormHelperText error={true}>{error}</FormHelperText>}
            <FormControl>
                <LoadingButton loading={currLoading} type={'submit'}>
                    Submit
                </LoadingButton>
            </FormControl>

        </Box>
    )
}
