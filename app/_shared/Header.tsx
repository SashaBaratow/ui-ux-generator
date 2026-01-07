'use client'

import {Button} from "@/components/ui/button";
import Image from "next/image";
import {SignInButton, UserButton, useUser} from "@clerk/nextjs";

function Header() {

    const {user} = useUser()

    return (
        <div className={'relative flex items-center justify-between z-20'}>
            <div className={'flex items-center justify-between gap-2'}>
                <Image src={'/logo.png'} alt={'logo'} width={40} height={40}/>
                <h2 className={'text-xl font-semibold'}><span className={'text-primary'}>UIUX</span>-Generator</h2>
            </div>
            <ul className={'flex gap-5 items-center text-lg'}>
                <li className={'hover:text-primary cursor-pointer'}>Home</li>
                <li className={'hover:text-primary cursor-pointer'}>Pricing</li>
            </ul>
            {!user ?
                <SignInButton mode={'modal'}>
                    <Button className={'cursor-pointer'}> Get Started </Button>
                </SignInButton> :
                <UserButton/>
            }
        </div>
    );
}

export default Header;