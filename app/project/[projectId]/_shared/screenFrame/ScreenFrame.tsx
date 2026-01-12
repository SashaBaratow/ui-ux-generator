import React from 'react';
import {Rnd} from "react-rnd";
import {GripVertical} from "lucide-react";
import {THEMES, themeToCssVars} from "@/data/themes";
import {ProjectType} from "@/types/types";

type PropsT = {
    x: number,
    y: number,
    setPanningEnabled: (prop: boolean) => void,
    width: number,
    height: number,
    htmlCode: string | undefined,
    projectDetails: ProjectType | undefined
}

function ScreenFrame(
    {
        x,
        y,
        setPanningEnabled,
        width,
        height,
        htmlCode,
        projectDetails,
    }: PropsT) {


    const selectedTheme = projectDetails?.theme as any

    const theme = THEMES[selectedTheme];

    const html = `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Google Font -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">


<!-- Tailwind + Iconify -->
<script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>
    <style >
    ${themeToCssVars(theme)}
</style>
</head>
<body class="bg-[var(--background)] text-[var(--foreground)] w-full">
    ${htmlCode ?? ""}
</body>
</html>
    `;

    return (
        <Rnd
            default={{
                x: x,
                y: y,
                width: width,
                height: height,
            }}
            dragHandleClassName={'drag-handle'}
            enableResizing={{
                bottomRight: true,
                bottomLeft: true,
                topRight: true,
                topLeft: true,
            }}
            onDragStart={() => setPanningEnabled(false)}
            onDragStop={() => setPanningEnabled(true)}
            onResizeStart={() => setPanningEnabled(false)}
            onResizeStop={() => setPanningEnabled(true)}
        >
            <div className={'drag-handle cursor-move flex gap-2 items-center bg-gray-200'}>
                <GripVertical className={'text-gray-500 w-4 h-4'}/> Drag Here
            </div>
            <iframe
                className={'w-full h-[calc(100%-40px)] bg-white'}
                sandbox={'allow-same-origin allow-scripts'}
                srcDoc={html}
            />
        </Rnd>
    );
}

export default ScreenFrame;