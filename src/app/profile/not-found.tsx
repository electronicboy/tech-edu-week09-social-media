'use client'
import {Button, Paper} from "@mui/material";
import {useRouter} from "next/navigation";

export default function NotFound() {

    const router = useRouter();
    return (<Paper className={"flex flex-col text-center p-4"}>
        <span className={"text-xl"}>This is not the profile you are looking for</span>
        <Button onClick={() => {router.push('/')}}>Go home</Button>
        </Paper>)
}
