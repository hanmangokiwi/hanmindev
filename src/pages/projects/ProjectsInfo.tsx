import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import React, {ReactElement, useEffect, useState} from "react";

import './ProjectsMarkdown.css'
import VideoPlayer from "../../components/VideoPlayer";
import {Skeleton} from "@mui/material";


function Markdown(props: {md: string}) {
    const [md, setMd] = useState("");

    useEffect(() => {
        fetch(`/markdown/projects/${props.md}.md`).then(res => res.text()).then(text => {
            if (text.includes("html>")){
                text = "This project doesn't have a description yet. Check back later!";
            }
            setMd(text);
        });
    }, [props.md])



    return (
        md? <ReactMarkdown className="markdown-body" children={md} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}
                       components={
                           {
                               // eslint-disable-next-line jsx-a11y/alt-text
                               img:({node,...props})=><img style={{maxWidth:'100%'}}{...props} />,
                               // eslint-disable-next-line jsx-a11y/anchor-has-content
                               a:({node,...props})=><a target="_blank" rel="noreferrer" style={{color: "#3ea0fd"}} {...props}/>
                           }}/> :
            (
                <Skeleton variant="rectangular" animation="wave" height={100} />
            )
    )
}

const projects: {[projectKey: string]: {name: string; subtitle: string; image?: string; video?: string; description: string; content?: ReactElement}} = {
    'vidqr': {
        name: "vidqr",
        subtitle: "Queue and Watch Videos Together",
        image: "https://cdn.discordapp.com/attachments/845801357646495787/1073088925746339860/image.png",
        description: `Karaoke is expensive, movie theaters are expensive, everything is expensive. Queue up videos with your friends and watch them together - for free.`,
        content: (
            <Markdown md="vidqr"/>
        )
    },
    'lucid': {
        name: "Lucid - Hack the North 2022 Winner",
        subtitle: "Let's turn that book into a movie. Text to movie, directed by AI.",
        video: "https://thumbs.gfycat.com/DescriptivePiercingHorsefly-mobile.mp4",
        description: `Paste in a text and it will identify the key scenes before turning it into a narrated movie. Favourite book, historical battle, or rant about work. Anything and everything, if you can read it, Lucid can dream it.`,
        content: (
            <>
                <VideoPlayer type="gfycat" videoLink="https://thumbs.gfycat.com/DescriptivePiercingHorsefly-mobile.mp4" autoplay={true}/>
                <Markdown md="lucid"/>
            </>
        )
},
    'pitch': {
        name: "Pitch.ai - nwHacks 2022 First Place",
        subtitle: "Real-time AI-powered presentation creation",
        image: "https://i.ytimg.com/vi/j1iAbKbSlD8/hqdefault.jpg",
        description: `Being unable to create visual presentations can be a barrier to learning, a reason for feeling left out, or a career disadvantage. Pitch.ai changes that.`,
        content: (
            <>
                <VideoPlayer type="iframe" videoLink="https://www.youtube.com/embed/j1iAbKbSlD8"/>
                <Markdown md="pitch"/>
            </>
        )
    },
    'habifix': {
        name: "HabiFix - Hack the 6ix 2021 Third Place",
        subtitle: "Successful people are the product of successful habits. Let's fix yours.",
        image: "https://i.ytimg.com/vi/r-5LTZLSj7Y/hqdefault.jpg",
        description: `We took the advice from a Harvard research paper to create a program that would not only help break unhealthy habits, but form healthy ones in place as well.`,
        content: (
            <>
                <VideoPlayer type="iframe" videoLink="https://www.youtube.com/embed/r-5LTZLSj7Y"/>
                <Markdown md="habifix"/>
            </>
        )
    },
    'mirrorboard': {
        name: "Mirrorboard",
        subtitle: "One-handed Typing for Efficiency, Accessibility, and Fun",
        image: "https://i.imgur.com/RLtDT4C.png",
        description: `Tired of moving your hand back and forth from the mouse to the keyboard? The answer is probably no but here it is anyways.`,
        content: (
            <Markdown md="mirrorboard"/>
        )
    },
    '3dgrapher': {
        name: "Real-Time 3D Graphing in Vanilla Minecraft",
        subtitle: "Who said games can't be educational?",
        video: "https://thumbs.gfycat.com/ColorfulTerribleBlackrhino-mobile.mp4",
        description: `The third iteration of this calculator brings incredible performance benefits and a new UI. At 8 kiloFLOPS, it is 100x faster than the SAT-approved TI-84.`,
        content: (
            <>
                <VideoPlayer type="iframe" videoLink="https://www.youtube.com/embed/qeyp5FN_WKk"/>
                <Markdown md="3dgrapher"/>
            </>
        )
    },
    'mcmv': {
        name: "MCMV",
        subtitle: "Motion Capture to Voxel Animation Converter",
        video: "https://thumbs.gfycat.com/WholeLegalGalah-mobile.mp4",
        description: `Convert your motion capture data into a format compatible with Blockbench to export it as an .OBJ, as a .FBX, to Minecraft, and more!`
    },
    'mcminer': {
        name: "Bitcoin Miner in Minecraft",
        subtitle: "Mining the world-famous cryptocurrency on the world-famous mining software",
        image: "https://cdn.discordapp.com/attachments/845801357646495787/1073072934706499666/image.png",
        description: `Tuition is expensive. Bitcoin (was) at it's all-time high. Why not mine it in *Mine*craft?`
    },
    'mccloth': {
        name: "Cloth Physics in Minecraft",
        subtitle: "Wouldn't it be funny if someone actually made this?",
        video: "https://thumbs.gfycat.com/CarefreeGrandAkitainu-mobile.mp4",
        description: `I can't even remember why I made this, I was 16 and lockdowns made me bored`
    },
    'mc4d': {
        name: "4D Object Rendering in Minecraft",
        subtitle: "Hypercubes make my head hurt",
        image: "https://i.ytimg.com/vi/ZCv1B4-EwIk/hqdefault.jpg",
        description: `Surprisingly there aren't many places you can find a 4D object renderer. I made one.`
    },
    'mcwave': {
        name: "Wave Phenomenon using Huygens–Fresnel principle",
        subtitle: "Waves are hard",
        video: "https://thumbs.gfycat.com/AnchoredFrayedArmednylonshrimp-mobile.mp4",
        description: `During physics class, our class had disagreements on whether Huygens' principle was correct or not. I decided to make a program to prove it.`
    },
    'soundmood': {
        name: "A Sound Mood - XdHacks LA 2020 Second Place",
        subtitle: "Music is a powerful tool. Let's use it to help people.",
        image: "https://i.ytimg.com/vi/DTWPGfeU49o/hqdefault.jpg",
        description: `A Discord application that uses the Spotify API to track songs and provide feedback.`
    },
    'covidtracker': {
        name: "COVID Policy Tracker - XdHacks COVID 2020 First Place",
        subtitle: "Many policies have been implemented to combat COVID-19. But which ones are working?",
        image: "https://i.ytimg.com/vi/WGFpUuf27LQ/hqdefault.jpg",
        description: `Through statistical analysis and COVID-19 data from every participating country, we were able to determine which policies were most effective.`
    },
    'buildandconquer': {
        name: "Build and Conquer - Base-Builder RTS",
        subtitle: "Now with 100% more base-building",
        video: "https://thumbs.gfycat.com/ThoseHugeFlatfish-mobile.mp4",
        description: `A game where you build a base and then conquer the world. Build more power plants! Build more factories! Launch more satellites!`
    },
    'reflections': {
        name: "Reflections - Mirror and Laser Game",
        subtitle: "A game where the menu took longer than the actual game to make",
        video: "https://thumbs.gfycat.com/SorrowfulHeartyAcaciarat-mobile.mp4",
        description: `"I created most of the tools they use and I don’t know how they did that!" - "Michael "Searge" Stoyke" , Developer at Mojang AB (I don't know how we did it either)`
    },
    'gravitysim': {
        name: "3D Gravity Simulator",
        subtitle: "Watch the systems fly around",
        video: "https://thumbs.gfycat.com/UnconsciousEnchantingCod-mobile.mp4",
        description: `A 3D gravity simulator that uses the gravitational formula to calculate the forces between objects.`
    },
    'herofair': {
        name: "HeroFair Amusement Park",
        subtitle: "This is funding my education",
        video: "https://thumbs.gfycat.com/OptimalExcellentAcaciarat-mobile.mp4",
        description: `A huge, working amusement park, available on the Minecraft Marketplace!`
    },
    'colors': {
        name: "Colors - Puzzle Game v2",
        subtitle: "Mind-bending puzzle game, now with more colors!",
        video: "https://thumbs.gfycat.com/UnkemptSpryHoopoe-mobile.mp4",
        description: `Paint everything, don't run out of moves. Like Gray, but with more colors.`
    },
    'gray': {
            name: "Gray - Puzzle Game",
            subtitle: "Mind-bending puzzle game",
            video: "https://thumbs.gfycat.com/WideeyedSourApe-mobile.mp4",
            description: `Stepping on a tile changes it's color. Turn them all on to win.`
        },
    'spacewars': {
            name: "Space Wars - Minecraft Minigame",
            subtitle: "Endless fun in a 3D arena",
            video: "https://thumbs.gfycat.com/HelpfulLoathsomeKissingbug-mobile.mp4",
            description: `In space, there is no up or down.`
        },
}

export default function getProject(projectName: string) {
    const project = projects[projectName];
    if (!project) {
        return {name: "404", subtitle: "Project not found", description: "This project does not exist", content: <p>This project does not exist</p>}
    }
    return project;
}

export {projects}