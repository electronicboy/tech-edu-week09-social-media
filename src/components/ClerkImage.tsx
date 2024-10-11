// 'use client'
//
// import {Suspense} from "react";
// import dynamic from "next/dynamic";
//
// export async function ClerkImage({userID}: { userID: number }) {
//     console.log("id", userID)
//
//     return (
//         dynamic()
//         <Suspense>
//             <FetchImage userID={userID} />
//         </Suspense>
//     )
// }
//
//
// async function FetchImage({userID}: {userID: number}) {
//
//     throw fetch(`/api/user/${userID}/image`).then(res => {
//         if (res.status === 200) {
//             return res.json()
//         }
//     }).then(body => {
//         if (body?.img) {
//             return (<img src={body.img} alt="profile image"/>)
//         }
//     })
//
//
// }
