import React from 'react'
import {FaPaperPlane} from "react-icons/fa6";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

export default function Header() {
    return (
        <header className={"min-h-12 border-b-2 border-b-gray-500 flex flex-wrap"}>
            <div className={"flex flex-wrap w-full mx-auto md:max-w-[800px] justify-between items-center"}>
                <span><FaPaperPlane className={"text-2xl"}/> </span>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </header>
    )
}
