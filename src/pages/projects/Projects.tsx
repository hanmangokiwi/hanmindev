import {Grid, Typography} from "@mui/material";
import React, {ReactElement, useEffect, useState} from "react";
import ScrollPage from "../../components/ScrollPage";
import ProjectCard from "../../components/ProjectCard";
import {useWindowDimensions} from "../../helpers/hooks";
import OverlayPage from "../../components/OverlayPage";

import getProject, {projects} from "./ProjectsInfo";
import {useNavigate, useParams} from "react-router-dom";



function Projects() {
    const params = useParams();
    const navigate = useNavigate();


    const { width } = useWindowDimensions();

    const [focusedProject, setFocusedProject] = useState("");
    const [projectDOM, setProjectDOM] = useState<ReactElement | null>(null)
    const [externalDOM, setExternalDOM] = useState<ReactElement | null>(null)

    useEffect(() => {
        if (focusedProject === "") {
            document.body.style.overflow = 'auto';
            if (params.projectName) {
                setFocusedProject(params.projectName);
                return;
            }

            setProjectDOM(null);
            setExternalDOM(null);
            return;
        }
        else{
            if (!params.projectName) {
                setFocusedProject("");
                return;
            }

            const content = getProject(focusedProject).content;
            const externalLink = getProject(focusedProject).externalLinks;
            document.body.style.overflow = 'hidden';

            if(content){
                setProjectDOM(content);
            }else{
                setProjectDOM(<p>This project doesn't have a description yet. Check back later!</p>);
            }

            if(externalLink){
                setExternalDOM(externalLink);
            }else{
                setExternalDOM(null);
            }

        }


    }, [focusedProject, params.projectName])

    let projectsPerColumn;
    if (width >= 1500) {
        projectsPerColumn = 4;
    }else if (width >= 1280) {
        projectsPerColumn = 3;
    }else if (width >= 770) {
        projectsPerColumn = 2;
    }else {
        projectsPerColumn = 1;
    }

    return (
        <>
        <ScrollPage>
            <div className="wide-viewer">
                <div className="center-text-box">
                    <Typography variant="h3" component="h2" align="center">
                        Projects
                    </Typography>
                    <Typography variant="body1" paragraph={true}>
                        Feel free to filter through the projects below!
                    </Typography>
                </div>
            </div>

            <div className="super-duper-wide-viewer">
                <div>
                    <Grid container spacing={2} columns={4 * projectsPerColumn}>
                        {Object.keys(projects).map((project, index) => (
                            <Grid style={{width: "100%"}} item md={4} key={index}>
                                <div onClick={() => {setFocusedProject(project); navigate(`/projects/${project}`)}}>
                                    <ProjectCard
                                        project={getProject(project)}
                                    />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>

            </div>
        </ScrollPage>
            {focusedProject !== "" ? <OverlayPage onClick={() => {setFocusedProject(""); navigate("/projects")}}>
                <div className="super-wide-viewer">
                    <Typography variant="h3" component="h2" align="center">
                        {getProject(focusedProject).name}
                    </Typography>
                </div>
                <div className="wide-viewer">
                    <Typography variant="body1" paragraph={true} align="center">
                        {getProject(focusedProject).subtitle}
                    </Typography>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        {externalDOM}
                    </div>

                    {projectDOM}
                    {externalDOM? (
                        <>
                            <Typography variant="body1" color="text.secondary" align="center">
                                Check out the project!
                            </Typography>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                {externalDOM}
                            </div>
                        </>

                    ) : <></>
                    }
                </div>
            </OverlayPage> : null}
        </>
    );
}

export default Projects;