'use client'

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useContext, useState} from "react";
import {SettingContext} from "@/context/SettingContext";
import {Loader2, Save} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

function ProjectHeader() {

    const {settingDetails, setSettingDetails} = useContext(SettingContext)

    const [loading, setLoading] = useState(false)

    const onSave = async () => {
       try {
           setLoading(true)
           console.log(settingDetails)
           const result = await axios.put('/api/project', {
               theme: settingDetails.theme,
               projectName: settingDetails.projectName,
               projectId: settingDetails.projectId,
           })
           setLoading(false)
           toast.success("Project saved successfully.")
       } catch (error) {
           setLoading(false)
           toast.error('Error saving project')
       }
    }

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
            <Button onClick={onSave}> {loading ? <Loader2 className={'animate-spin'}/> : <Save/>}  Save</Button>
        </div>
    );
}

export default ProjectHeader;