import React from "react";
import {Skeleton} from "@mui/material";

export default function PostSkeleton() {

    return (
        <>
            <div className={"flex flex-col w-full"}>
                <div className={"flex"}>
                    <div>
                        <Skeleton width={64} height={70} className={"h-16 w-16 block"}/>
                    </div>
                    <div className={"ml-4"}>
                        <Skeleton width={"8rem"}/>
                        <Skeleton width={"32rem"} height={"4rem"} className={"mt-[-0.5rem]"}/>
                    </div>

                </div>
                <div>
                    <Skeleton width={"16rem"}></Skeleton>
                </div>
            </div>
        </>
    )
}
