import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "@/components/layout/Header";
import {ClerkProvider} from "@clerk/nextjs";

import {ThemeProvider} from '@mui/material/styles';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Socialing media",
    description: "Socialising! people, woo!",
};

// const theme = createTheme({
//     colorSchemes: {
//         dark: true,
//     },
// });

export default async function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {

    return (
        <ClerkProvider>
            <ThemeProvider theme={{}}>
                <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh`}
                >
                <Header/>
                <div className={"mx-auto md:max-w-3xl pt-4"}>
                    {children}
                </div>
                </body>
                </html>
            </ThemeProvider>
        </ClerkProvider>
    );
}
