'use client'

import Image from "next/image";
import {Button} from "@/components/ui/button";

function ProjectHeader() {

    return (
        <div className={'relative flex items-center justify-between z-20 shadow mb-4'}>
            <div className={'flex items-center justify-between gap-2'}>
                <Image src={'/logo.png'} alt={'logo'} width={40} height={40}/>
                <h2 className={'text-xl font-semibold'}><span className={'text-primary'}>UIUX</span>-Generator</h2>
            </div>
            <ul className={'flex gap-5 items-center text-lg'}>
                <li className={'hover:text-primary cursor-pointer'}>Home</li>
                <li className={'hover:text-primary cursor-pointer'}>Pricing</li>
            </ul>
            <Button> Save </Button>
        </div>
    );
}

export default ProjectHeader;