'use client'

import {useState} from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton, InputGroupTextarea,
} from "@/components/ui/input-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ChevronRight, Loader, Send} from "lucide-react";
import {cn} from "@/lib/utils";
import {AnimatedGradientText} from "@/components/ui/animated-gradient-text";
import {suggestList} from "@/app/_shared/hero/suggestList";
import Image from "next/image";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


function Hero() {

    const {user} = useUser()
    const router = useRouter()

    const [userPromt, setUserPromt] = useState<string>('')
    const [device, setDevice] = useState<string>('website')
    const [loading, setLoading] = useState<boolean>(false);


    const onCreateProject = async () => {
        if(!user) {
            router.push("/sign-in")
            return
        }
        if (!userPromt || userPromt === '') {
            toast.error("Please be sure to describe the promt")
            return
        }
        setLoading(true)
        const projectId = crypto.randomUUID()
        const result = await axios.post("/api/project", {
            userInput: userPromt,
            device,
            projectId,
        })
        setLoading(false)
        router.push(`/project/${projectId}`)
    }

    return (
        <div className={'p-20 md:px-24 lg:px-48 xl:px-72'}>
            <div className={'flex items-center justify-center w-full mb-4'}>
                <div
                    className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
                  <span
                      className={cn(
                          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                      )}
                      style={{
                          WebkitMask:
                              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "destination-out",
                          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          maskComposite: "subtract",
                          WebkitClipPath: "padding-box",
                      }}
                  />
                    🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500"/>
                    <AnimatedGradientText className="text-sm font-medium">
                        Introducing Magic UI
                    </AnimatedGradientText>
                    <ChevronRight
                        className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"/>
                </div>

            </div>
            <h2 className={'text-5xl font-bold text-center'}>Create High Quality <span className={'text-primary'}>Website and Mobile App</span> Designs
            </h2>
            <p className={'text-center text-gray-600 text-lg mt-3'}>Imagine your idea and turn into reality</p>
            <div className="flex items-center justify-center w-full gap-6 mt-5">
                <InputGroup className={'max-w-xl bg-white z-10 rounded-2xl'}>
                    <InputGroupTextarea
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                        placeholder="Enter what design you want to create"
                        value={userPromt}
                        onChange={(e) => {setUserPromt(e.target.value)}}
                    />
                    <InputGroupAddon align="block-end">
                        <Select
                            defaultValue={'website'}
                            onValueChange={(value) => {setDevice(value)}}
                        >
                            <SelectTrigger className="w-[180px] cursor-pointer">
                                <SelectValue placeholder="Type"/>
                            </SelectTrigger>
                            <SelectContent className={'cursor-pointer'}>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="mobile">Mobile</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputGroupButton
                            className="ml-auto cursor-pointer" size="sm" variant="default"
                            onClick={onCreateProject}
                            disabled={loading}
                        >
                            {loading ?
                                <Loader className={'animate-spin'}/> :
                                <Send/>
                            }
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <div className={'flex gap-3 items-center text-center justify-center mt-5'}>
                {suggestList?.map(( suggest ) => (
                    <div
                        key={suggest?.id}
                        className={'flex flex-col justify-center items-center gap-1 p-2 bg-white z-20 rounded-xl cursor-pointer'}
                        onClick={() => { setUserPromt(suggest?.description)}}
                    >
                        <Image src={suggest?.icon} alt={suggest?.title}  width={25} height={25}/>
                        <h2 className={'font-bold text-[14px] text-center max-w-[100px] leading-none'}>{suggest?.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hero;