import type {Metadata} from "next";
import {DM_Sans} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import Provider from "@/app/provider";
import {Toaster} from "react-hot-toast";

const appFont = DM_Sans({
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: "Ui UX Generator (AI)",
    description: "Generate UI UX with using AI",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${appFont.className} antialiased`}
                >
                    <Provider>
                        {children}
                    </Provider>
                </body>
            </html>
            <Toaster />
        </ClerkProvider>
    );
}
