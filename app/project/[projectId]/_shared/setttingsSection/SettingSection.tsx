'use client'

import {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Camera, Share, Sparkle} from "lucide-react";
import {THEME_NAME_LIST, THEMES} from "@/app/project/[projectId]/_shared/setttingsSection/themes";

function SettingSection() {

    const [selectedTheme, setSelectedTheme] = useState<string>('AURORA_INK');
    const [projectname, setProjectname] = useState<string>('');
    const [userNewScreenINput, setUserNewScreenINput] = useState<string>('');

    return (
        <div className={'w-[300px] h-[90vh] p-5 border-r'}>
            <h2 className={'font-medium text-lg'}>Settings</h2>
            <div className={'mt-3'}>
                <b className={'text-sm mb-1'}>Project Name</b>
                <Input
                    placeholder={'Project Name'}
                    onChange={(e) => setProjectname(e.target.value)}
                />
            </div>
            <div className={'mt-3'}>
                <b className={'text-sm mb-1'}>Project Name</b>
                <Textarea
                    placeholder={'Enter promt to generate screen using AI'}
                    onChange={(e) => setUserNewScreenINput(e.target.value)}
                />
                <Button className={'mt-4 w-full'}><Sparkle/> Generate With AI</Button>
            </div>

            <div className={'mt-3'}>
                <b className={'text-sm mb-1'}>Themes</b>
                <div className={'h-[200px] overflow-auto'}>
                    <div>
                        {THEME_NAME_LIST?.map((theme, index) => (
                            <div
                                key={index}
                                className={`p-3 border-2 rounded-xl mt-2 cursor-pointer
                                 ${theme === selectedTheme && 'border-primary, bg-primary/20'}`}
                                onClick={() => setSelectedTheme(theme)}
                            >
                                <h2>{theme}</h2>
                                <div className={'flex gap-2'}>
                                    <div className={`h-4 w-4 rounded-full`}
                                         style={{
                                             background: `linear-gradient(
                                             135deg,
                                             ${THEMES[theme]?.background},
                                             ${THEMES[theme]?.primary},
                                             ${THEMES[theme].accent}
                                             )`,
                                    }}
                                    />
                                    <div className={`h-4 w-4 rounded-full`}
                                         style={{
                                             background: `linear-gradient(
                                             135deg,
                                             ${THEMES[theme]?.secondary},
                                             ${THEMES[theme]?.background},
                                             ${THEMES[theme].primary}
                                             )`,
                                         }}
                                    />
                                    <div className={`h-4 w-4 rounded-full`}
                                         style={{
                                             background: `linear-gradient(
                                             135deg,
                                             ${THEMES[theme]?.accent},
                                             ${THEMES[theme]?.secondary},
                                             ${THEMES[theme].primary}
                                             )`,
                                         }}
                                    />
                                    <div className={`h-4 w-4 rounded-full`}
                                         style={{
                                             background: `linear-gradient(
                                             135deg,
                                             ${THEMES[theme]?.muted},
                                             ${THEMES[theme]?.secondary},
                                             ${THEMES[theme].primary}
                                             )`,
                                         }}
                                    />
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className={'mt-3'}>
                <b className={'text-sm mb-1'}>Extras</b>
                <div className={'flex gap-2'}>
                    <Button className={'mt-4 w-1/2 cursor-pointer'}><Camera/> Screenshot </Button>
                    <Button className={'mt-4 w-1/2 cursor-pointer'}><Share/> Share </Button>
                </div>
            </div>
        </div>
    );
}

export default SettingSection;