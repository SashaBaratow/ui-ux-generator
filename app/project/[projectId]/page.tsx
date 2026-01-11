'use client'

import ProjectHeader from "@/app/project/[projectId]/_shared/ProjectHeader";
import SettingSection from "@/app/project/[projectId]/_shared/setttingsSection/SettingSection";
import {useParams} from "next/navigation";
import axios from "axios";
import {useEffect, useState} from "react";
import {ProjectType, ScreenConfigType} from "@/types/types";
import {Loader2Icon} from "lucide-react";

function ProjectCanvasPlayground() {

    const {projectId} = useParams()

    const [projectDetails, setProjectDetails] = useState<ProjectType>()
    const [screenConfig, setScreenConfig] = useState<ScreenConfigType[]>()
    const [loading, setLoading] = useState<boolean>(false)


    const getProjectDetails = async () => {
        setLoading(true)
        const res = await axios.get('/api/project?projectId=' + projectId)
        setProjectDetails(res?.data?.projectDetails)
        setScreenConfig(res?.data?.screenConfig)
        setLoading(false)
    }

    const generateScreenConfig = async () => {
        setLoading(true)
        const result = await axios.post('/api/generate-config', {
            projectId: projectId,
            deviceType: projectDetails?.device,
            userInput: projectDetails?.userInput
        })

        getProjectDetails()
        setLoading(false)
    }

    useEffect(() => {
        getProjectDetails()
    }, [projectId])

    useEffect(() => {
        if (projectDetails && screenConfig && screenConfig?.length === 0) {
            generateScreenConfig()
        }

    }, [projectDetails, screenConfig])

    return (
        <div className={'w-full px-2 py-3'}>
            <ProjectHeader/>
            <div className={''}>
                {loading &&
                    <div className={'p-3 absolute left-1/2 top-20 bg-blue-300/20 border-b-blue-600 rounded-xl'}>
                        <h2 className={'flex gap-2 items-center text-primary'}><Loader2Icon className={'animate-spin'}/> Loading...</h2>
                    </div>
                }
                <SettingSection projectDetails={projectDetails}/>
            </div>
        </div>
    );
}

export default ProjectCanvasPlayground;