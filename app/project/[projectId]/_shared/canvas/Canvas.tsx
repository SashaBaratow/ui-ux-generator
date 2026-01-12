import {
    TransformWrapper,
    TransformComponent,
    useControls,
} from "react-zoom-pan-pinch";
import ScreenFrame from "@/app/project/[projectId]/_shared/screenFrame/ScreenFrame";
import {useState} from "react";
import {ProjectType, ScreenConfigType} from "@/types/types";
import {Skeleton} from "@/components/ui/skeleton";

type PropsT = {
    projectDetails: ProjectType | undefined,
    screenConfig: ScreenConfigType[],
    loading: boolean,
}

function Canvas({projectDetails, screenConfig, loading}: PropsT) {

    const [panongEnabled, setPanongEnabled] = useState(false);

    const isMobile = projectDetails?.device === "mobile";

    const SCREEN_WIDTH = isMobile ? 400 : 1200;
    const SCREEN_HEIGHT = isMobile ? 800 : 800;
    const GAP = isMobile ? 10 : 20;


    return (
        <div
            className={'w-full h-[100vh] bg-gray-100'}
            style={{
                backgroundImage: 'radial-gradient(rgb(0,0,0,0.15) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}
        >
            <TransformWrapper
                initialScale={0.7}
                initialPositionX={50}
                initialPositionY={50}
                limitToBounds={false}
                wheel={{step: 0.8}}
                minScale={0.2}
                maxScale={4}
                doubleClick={{disabled: false}}
                panning={{disabled: !panongEnabled}}

            >
                <TransformComponent
                    wrapperStyle={{width: '100%', height: '100%'}}
                >
                    {screenConfig?.map((screen, index) => (
                        <div key={index} className={'flex gap-4'}>
                            {screen?.code ? <ScreenFrame
                                x={index * (SCREEN_WIDTH + GAP)}
                                y={0}
                                width={SCREEN_WIDTH}
                                height={SCREEN_HEIGHT}
                                setPanningEnabled={setPanongEnabled}
                                htmlCode={screen?.code}
                                projectDetails={projectDetails}
                            /> : <div className={'bg-white rounded-2xl p-5 flex flex-col gap-4'}
                                style={{
                                    width: SCREEN_WIDTH,
                                    height: SCREEN_HEIGHT
                                }}
                            >
                                <Skeleton className={'w-full rounded-lg h-10'}/>
                                <Skeleton className={'w-[50%] rounded-lg h-20'}/>
                                <Skeleton className={'w-[70%] rounded-lg h-10'}/>
                                <Skeleton className={'w-[30%] rounded-lg h-10'}/>
                                <Skeleton className={'w-full rounded-lg h-10'}/>
                                <Skeleton className={'w-[50%] rounded-lg h-20'}/>
                                <Skeleton className={'w-[70%] rounded-lg h-10'}/>
                                <Skeleton className={'w-[30%] rounded-lg h-10'}/>
                            </div>
                            }
                        </div>

                    ))}
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}

export default Canvas;