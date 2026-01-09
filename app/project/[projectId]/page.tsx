import ProjectHeader from "@/app/project/[projectId]/_shared/ProjectHeader";
import SettingSection from "@/app/project/[projectId]/_shared/setttingsSection/SettingSection";

function ProjectCanvasPlayground() {
    return (
        <div className={'w-full px-2 py-3'}>
            <ProjectHeader/>
            <div className={''}>
                <SettingSection/>
            </div>
        </div>
    );
}

export default ProjectCanvasPlayground;