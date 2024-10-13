'use client'
import React from 'react'
import {FaPaperPlane, FaToolbox} from "react-icons/fa6";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
    return (
        <header className={"min-h-12 border-b-2 border-b-gray-500 flex flex-wrap"}>
            <div className={"flex flex-wrap w-full mx-auto md:max-w-[800px] justify-between items-center"}>
                <div className={"flex gap-2"}>
                    <span><Link href={'/'}><FaPaperPlane title="Home" className={"text-2xl"}/></Link></span>
                    <span><Link href={'/'} className={"text-xl font-bold hover:underline"}>Home</Link></span>
                </div>

                <SignedOut>
                    <SignInButton/>
                </SignedOut>
                <SignedIn>
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Link href={'/profile'} label={"Manage Profile"} labelIcon={<FaToolbox/>}/>
                        </UserButton.MenuItems>
                    </UserButton>
                </SignedIn>
            </div>
        </header>
    )
}
