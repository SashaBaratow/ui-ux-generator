'use client'

import ProjectHeader from "@/app/project/[projectId]/_shared/ProjectHeader";
import SettingSection from "@/app/project/[projectId]/_shared/setttingsSection/SettingSection";
import {useParams} from "next/navigation";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {ProjectType, ScreenConfigType} from "@/types/types";
import {Loader2Icon} from "lucide-react";
import Canvas from "@/app/project/[projectId]/_shared/canvas/Canvas";
import {SettingContext} from "@/context/SettingContext";

function ProjectCanvasPlayground() {

    const {projectId} = useParams()

    const [projectDetails, setProjectDetails] = useState<ProjectType>()
    const [screenConfigOriginal, setScreenConfigOriginal] = useState<ScreenConfigType[]>()
    const [screenConfig, setScreenConfig] = useState<ScreenConfigType[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingMsg, setLoadingMsg] = useState<string>('Loading')
    const {settingDetails, setSettingDetails} = useContext(SettingContext)


    const getProjectDetails = async () => {
        setLoading(true)
        const res = await axios.get('/api/project?projectId=' + projectId)
        setProjectDetails(res?.data?.projectDetails)
        setScreenConfig(res?.data?.screenConfig)
        setScreenConfigOriginal(res?.data?.screenConfig)
        setSettingDetails(res?.data?.screenConfig)
        setLoading(false)
    }

    const generateScreenConfig = async () => {
        setLoading(true)
        setLoadingMsg('Generating screen...')
        const result = await axios.post('/api/generate-config', {
            projectId: projectId,
            deviceType: projectDetails?.device,
            userInput: projectDetails?.userInput
        })

        getProjectDetails()
        setLoading(false)
    }

    const generateScreenUiUx = async () => {
        setLoading(true)
        if (screenConfig && Array.isArray(screenConfig)) {
            for (let i = 0; i < screenConfig?.length; i++) {
                const screen = screenConfig[i]
                if (screen?.code) continue
                setLoadingMsg('Generating screen...' + ' ' + (i+1))

                const result = await axios.post(`/api/generate-screen-ui`, {
                    projectId,
                    screenId: screen.id,
                    screenName: screen?.screenName,
                    purpose: screen.purpose,
                    screenDescription: screen.screenDescription,
                })

                setScreenConfig( ( prev ) => prev?.map(( item, index) =>
                ( index === i ? result?.data : item)))

            }
        }
        setLoading(false)
    }

    useEffect(() => {
        getProjectDetails()
    }, [projectId])

    useEffect(() => {
        if (projectDetails && screenConfigOriginal && screenConfigOriginal?.length === 0) {
            generateScreenConfig()
        }else if (screenConfig && projectDetails) {
            generateScreenUiUx()
        }

    }, [projectDetails, screenConfigOriginal])




    return (
        <div className={'w-full px-2 py-3'}>
            <ProjectHeader/>
            <div className={'flex gap-5'}>
                {loading &&
                    <div className={'p-3 absolute left-1/2 top-20 bg-blue-300/20 border-b-blue-600 rounded-xl'}>
                        <h2 className={'flex gap-2 items-center text-primary'}><Loader2Icon
                            className={'animate-spin'}/> {loadingMsg}</h2>
                    </div>
                }
                <SettingSection projectDetails={projectDetails}/>
                <Canvas projectDetails={projectDetails} screenConfig={screenConfig} loading={loading} />
            </div>
        </div>
    );
}

export default ProjectCanvasPlayground;