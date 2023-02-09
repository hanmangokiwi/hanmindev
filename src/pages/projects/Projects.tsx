import {Box, Grid, IconButton, Paper, styled, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import ScrollPage from "../../components/ScrollPage";
import ProjectCard from "../../components/ProjectCard";
import {useWindowDimensions} from "../../helpers/hooks";
import OverlayPage from "../../components/OverlayPage";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'


const projects = [
    {
        key: "vidqr",
        name: "vidqr",
        subtitle: "Queue and Watch Videos Together",
        image: "https://cdn.discordapp.com/attachments/845801357646495787/1073088925746339860/image.png",
        description: `Karaoke is expensive, movie theaters are expensive, everything is expensive. Queue up videos with your friends and watch them together - for free.`
    },
    {
        key: "lucid",
        name: "Lucid - Hack the North 2022 Winner",
        subtitle: "Let's turn that book into a movie. Text to movie, directed by AI.",
        video: "https://thumbs.gfycat.com/DescriptivePiercingHorsefly-mobile.mp4",
        description: `Paste in a text and it will identify the key scenes before turning it into a narrated movie. Favourite book, historical battle, or rant about work. Anything and everything, if you can read it, Lucid can dream it.`
    },
    {
        key: "pitch",
        name: "Pitch.ai - nwHacks 2022 First Place",
        subtitle: "Real-time AI-powered presentation creation",
        image: "https://i.ytimg.com/vi/j1iAbKbSlD8/hqdefault.jpg",
        description: `Being unable to create visual presentations can be a barrier to learning, a reason for feeling left out, or a career disadvantage. Pitch.ai changes that.`
    },
    {
        key: "habifix",
        name: "HabiFix - Hack the 6ix 2021 Third Place",
        subtitle: "Successful people are the product of successful habits. Let's fix yours.",
        image: "https://i.ytimg.com/vi/r-5LTZLSj7Y/hqdefault.jpg",
        description: `We took the advice from a Harvard research paper to create a program that would not only help break unhealthy habits, but form healthy ones in place as well.`
    },
    {
        key: "mirrorboard",
        name: "Mirrorboard",
        subtitle: "One-handed Typing for Efficiency, Accessibility, and Fun",
        image: "https://i.imgur.com/RLtDT4C.png",
        description: `Tired of moving your hand back and forth from the mouse to the keyboard? The answer is probably no but here it is anyways.`,
        md: "https://raw.githubusercontent.com/hanmangokiwi/mirrorboard/main/README.md"
    },
    {
        key: "3dgrapher",
        name: "Real-Time 3D Graphing in Vanilla Minecraft",
        subtitle: "Who said games can't be educational?",
        video: "https://thumbs.gfycat.com/ColorfulTerribleBlackrhino-mobile.mp4",
        description: `The third iteration of this calculator brings incredible performance benefits and a new UI. At 8 kiloFLOPS, it is 100x faster than the SAT-approved TI-84.`
    },
    {
        key: "mcmv",
        name: "MCMV",
        subtitle: "Motion Capture to Voxel Animation Converter",
        video: "https://thumbs.gfycat.com/WholeLegalGalah-mobile.mp4",
        description: `Convert your motion capture data into a format compatible with Blockbench to export it as an .OBJ, as a .FBX, to Minecraft, and more!`,
        md: "https://raw.githubusercontent.com/hanmangokiwi/MCMV/master/README.md"
    },
    {
        key: "mcminer",
        name: "Bitcoin Miner in Minecraft",
        subtitle: "Mining the world-famous cryptocurrency on the world-famous mining software",
        image: "https://cdn.discordapp.com/attachments/845801357646495787/1073072934706499666/image.png",
        description: `Tuition is expensive. Bitcoin (was) at it's all-time high. Why not mine it in *Mine*craft?`
    },
    {
        key: "mccloth",
        name: "Cloth Physics in Minecraft",
        subtitle: "Wouldn't it be funny if someone actually made this?",
        video: "https://thumbs.gfycat.com/CarefreeGrandAkitainu-mobile.mp4",
        description: `I can't even remember why I made this, I was 16 and lockdowns made me bored`
    },
    {
        key: "mc4d",
        name: "4D Object Rendering in Minecraft",
        subtitle: "Hypercubes make my head hurt",
        image: "https://i.ytimg.com/vi/ZCv1B4-EwIk/hqdefault.jpg",
        description: `Surprisingly there aren't many places you can find a 4D object renderer. I made one.`
    },
    {
        key: "mcwave",
        name: "Wave Phenomenon using Huygens–Fresnel principle",
        subtitle: "Waves are hard",
        video: "https://thumbs.gfycat.com/AnchoredFrayedArmednylonshrimp-mobile.mp4",
        description: `During physics class, our class had disagreements on whether Huygens' principle was correct or not. I decided to make a program to prove it.`
    },
    {
        key: "soundmood",
        name: "A Sound Mood - XdHacks LA 2020 Second Place",
        subtitle: "Music is a powerful tool. Let's use it to help people.",
        image: "https://i.ytimg.com/vi/DTWPGfeU49o/hqdefault.jpg",
        description: `A Discord application that uses the Spotify API to track songs and provide feedback.`
    },
    {
        key: "covidtracker",
        name: "COVID Policy Tracker - XdHacks COVID 2020 First Place",
        subtitle: "Many policies have been implemented to combat COVID-19. But which ones are working?",
        image: "https://i.ytimg.com/vi/WGFpUuf27LQ/hqdefault.jpg",
        description: `Through statistical analysis and COVID-19 data from every participating country, we were able to determine which policies were most effective.`
    },
    {
        key: "buildandconquer",
        name: "Build and Conquer - Base-Builder RTS",
        subtitle: "Now with 100% more base-building",
        video: "https://thumbs.gfycat.com/ThoseHugeFlatfish-mobile.mp4",
        description: `A game where you build a base and then conquer the world. Build more power plants! Build more factories! Launch more satellites!`
    },
    {
        key: "reflections",
        name: "Reflections - Mirror and Laser Game",
        subtitle: "A game where the menu took longer than the actual game to make",
        video: "https://thumbs.gfycat.com/SorrowfulHeartyAcaciarat-mobile.mp4",
        description: `"I created most of the tools they use and I don’t know how they did that!" - "Michael "Searge" Stoyke" , Developer at Mojang AB (I don't know how we did it either)`
    },
    {
        key: "gravitysim",
        name: "3D Gravity Simulator",
        subtitle: "Watch the systems fly around",
        video: "https://thumbs.gfycat.com/UnconsciousEnchantingCod-mobile.mp4",
        description: `A 3D gravity simulator that uses the gravitational formula to calculate the forces between objects.`
    },
    {
        key: "herofair",
        name: "HeroFair Amusement Park",
        subtitle: "This is funding my education",
        video: "https://thumbs.gfycat.com/OptimalExcellentAcaciarat-mobile.mp4",
        description: `A huge, working amusement park, available on the Minecraft Marketplace!`
    },
    {
        key: "colors",
        name: "Colors - Puzzle Game v2",
        subtitle: "Mind-bending puzzle game, now with more colors!",
        video: "https://thumbs.gfycat.com/UnkemptSpryHoopoe-mobile.mp4",
        description: `Paint everything, don't run out of moves. Like Gray, but with more colors.`
    },
    {
        key: "gray",
        name: "Gray - Puzzle Game",
        subtitle: "Mind-bending puzzle game",
        video: "https://thumbs.gfycat.com/WideeyedSourApe-mobile.mp4",
        description: `Stepping on a tile changes it's color. Turn them all on to win.`
    },
    {
        key: "spacewars",
        name: "Space Wars - Minecraft Minigame",
        subtitle: "Endless fun in a 3D arena",
        video: "https://thumbs.gfycat.com/HelpfulLoathsomeKissingbug-mobile.mp4",
        description: `In space, there is no up or down.`
    }
]

function Projects() {
    const { width } = useWindowDimensions();

    const [focusedProject, setFocusedProject] = useState(-1);
    const [md, setMd] = useState("")

    useEffect(() => {
        if (focusedProject === -1) {
            setMd("");
            return;
        }

        let link = projects[focusedProject].md;

        if (!link) {
            link = `/markdown/projects/${projects[focusedProject].key}.md`;
        }

        fetch(link).then(res => res.text()).then(text => {
            if (text.includes("<!DOCTYPE html>")){
                text = "This project doesn't have a description yet. Check back later!";
            }
            setMd(text);
        });


    }, [focusedProject])

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
        <ScrollPage scrollbar={false}>
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
                        {projects.map((project, index) => (
                            <Grid item md={4} key={index}>
                                <div onClick={() => setFocusedProject(index)}>
                                <ProjectCard name={project.name} subtitle={project.subtitle} image={project.image} video={project.video} description={project.description}/>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>

            </div>
        </ScrollPage>
            {focusedProject !== -1 ? <OverlayPage onClick={() => setFocusedProject(-1)}>
                <div className="super-wide-viewer">
                    <Typography variant="h3" component="h2" align="center">
                        {projects[focusedProject].name}
                    </Typography>
                </div>
                <div className="wide-viewer">
                    <Typography variant="body1" paragraph={true} align="center">
                        {projects[focusedProject].subtitle}
                    </Typography>

                    <ReactMarkdown className="markdown-body" children={md} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={{img:({node,...props})=><img style={{width:'150%', marginLeft: '-25%'}}{...props}/>}}/>
                </div>
            </OverlayPage> : null}
        </>
    );
}

export default Projects;