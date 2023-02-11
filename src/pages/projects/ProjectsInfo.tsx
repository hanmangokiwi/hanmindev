import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import React, {ReactElement, useEffect, useState} from "react";

import './ProjectsMarkdown.css'
import VideoPlayer from "../../components/VideoPlayer";
import {IconButton, Skeleton, SvgIcon, Tooltip, Typography} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from '@mui/icons-material/YouTube';
import LaunchIcon from '@mui/icons-material/Launch';


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
                               img:({node,...props})=><img style={{maxWidth:'100%'}}{...props} alt={props.alt}/>,
                               // eslint-disable-next-line jsx-a11y/anchor-has-content
                               a:({node,...props})=><a target="_blank" rel="noreferrer" style={{color: "#3ea0fd"}} {...props}/>,
                               // @ts-ignore
                               video: ({node, ...props}) => <p>{<VideoPlayer raw type={props.children.toString().split(';')[0]} videoLink={props.children.toString().split(';')[1]} play={true} autoplay={true} />}</p>
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
            <>
                <Markdown md="vidqr"/>

                <Typography variant="body1" color="text.secondary" align="center">
                    Check out the project!
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="Go to Website">
                        <IconButton>
                            <a href="https://vidqr.fly.dev/"
                               target="_blank"
                               rel="noreferrer">
                                <LaunchIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="GitHub">
                        <IconButton>
                            <a href="https://github.com/hanmangokiwi/vidqr"
                               target="_blank"
                               rel="noreferrer">
                                <GitHubIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                </div>
            </>

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
                <Typography variant="body1" color="text.secondary" align="center">
                    Check out the project!
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="YouTube">
                        <IconButton>
                            <a href="https://youtu.be/9e8J4VNFXOM"
                               target="_blank"
                               rel="noreferrer">
                                <YouTubeIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Devpost">
                        <IconButton>
                            <a href="https://devpost.com/software/lucid-ai-95nerk"
                               target="_blank"
                               rel="noreferrer">
                                <SvgIcon>
                                    <path d="M 11.449219 7.542969 L 10.101562 7.542969 L 10.101562 16.457031 L 11.363281 16.457031 C 14.007812 16.457031 15.222656 14.664062 15.222656 12 C 15.222656 9.019531 14.121094 7.542969 11.449219 7.542969 Z M 11.449219 7.542969 "/>
                                    <path d="M 17.996094 0.0117188 L 6.003906 0.0117188 L 0 12 L 6.003906 23.988281 L 17.996094 23.988281 L 24 12 Z M 11.363281 19.332031 L 7.621094 19.332031 L 7.621094 4.667969 L 11.542969 4.667969 C 15.148438 4.667969 17.816406 6.660156 17.816406 12 C 17.816406 17.132812 14.605469 19.332031 11.363281 19.332031 Z M 11.363281 19.332031 "/>
                                </SvgIcon>
                            </a>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="GitHub">
                        <IconButton>
                            <a href="https://github.com/underHA/htn-2022"
                               target="_blank"
                               rel="noreferrer">
                                <GitHubIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                </div>
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
                <Typography variant="body1" color="text.secondary" align="center">
                    Check out the project!
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="Devpost">
                        <IconButton>
                            <a href="https://devpost.com/software/pitch-ai"
                               target="_blank"
                               rel="noreferrer">
                                <SvgIcon>
                                    <path d="M 11.449219 7.542969 L 10.101562 7.542969 L 10.101562 16.457031 L 11.363281 16.457031 C 14.007812 16.457031 15.222656 14.664062 15.222656 12 C 15.222656 9.019531 14.121094 7.542969 11.449219 7.542969 Z M 11.449219 7.542969 "/>
                                    <path d="M 17.996094 0.0117188 L 6.003906 0.0117188 L 0 12 L 6.003906 23.988281 L 17.996094 23.988281 L 24 12 Z M 11.363281 19.332031 L 7.621094 19.332031 L 7.621094 4.667969 L 11.542969 4.667969 C 15.148438 4.667969 17.816406 6.660156 17.816406 12 C 17.816406 17.132812 14.605469 19.332031 11.363281 19.332031 Z M 11.363281 19.332031 "/>
                                </SvgIcon>
                            </a>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="GitHub">
                        <IconButton>
                            <a href="https://github.com/underHA/nwhacks-2022"
                               target="_blank"
                               rel="noreferrer">
                                <GitHubIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                </div>
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
                <Typography variant="body1" color="text.secondary" align="center">
                    Check out the project!
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="Devpost">
                        <IconButton>
                            <a href="https://devpost.com/software/habifix"
                               target="_blank"
                               rel="noreferrer">
                                <SvgIcon>
                                    <path d="M 11.449219 7.542969 L 10.101562 7.542969 L 10.101562 16.457031 L 11.363281 16.457031 C 14.007812 16.457031 15.222656 14.664062 15.222656 12 C 15.222656 9.019531 14.121094 7.542969 11.449219 7.542969 Z M 11.449219 7.542969 "/>
                                    <path d="M 17.996094 0.0117188 L 6.003906 0.0117188 L 0 12 L 6.003906 23.988281 L 17.996094 23.988281 L 24 12 Z M 11.363281 19.332031 L 7.621094 19.332031 L 7.621094 4.667969 L 11.542969 4.667969 C 15.148438 4.667969 17.816406 6.660156 17.816406 12 C 17.816406 17.132812 14.605469 19.332031 11.363281 19.332031 Z M 11.363281 19.332031 "/>
                                </SvgIcon>
                            </a>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="GitHub">
                        <IconButton>
                            <a href="https://github.com/eqzhou81/HabiFix/"
                               target="_blank"
                               rel="noreferrer">
                                <GitHubIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                </div>
            </>
        )
    },
    'mirrorboard': {
        name: "Mirrorboard",
        subtitle: "One-handed Typing for Efficiency, Accessibility, and Fun",
        image: "https://i.imgur.com/RLtDT4C.png",
        description: `Tired of moving your hand back and forth from the mouse to the keyboard? The answer is probably no but here it is anyways.`,
        content: (
            <>
                <Markdown md="mirrorboard"/>

                <Typography variant="body1" color="text.secondary" align="center">
                    Check out the project!
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="Discord">
                        <IconButton>
                            <a href="https://discord.gg/rwNn9HcD56"
                               target="_blank"
                               rel="noreferrer">
                                <SvgIcon viewBox='0 0 127.14 96.36'>
                                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                                </SvgIcon>
                            </a>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="GitHub">
                        <IconButton>
                            <a href="https://github.com/hanmangokiwi/mirrorboard"
                               target="_blank"
                               rel="noreferrer">
                                <GitHubIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                </div>
            </>
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

                <Typography variant="body1" color="text.secondary" align="center">
                    Check out the project!
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="GitHub">
                        <IconButton>
                            <a href="https://github.com/hanmangokiwi/Hmmm"
                               target="_blank"
                               rel="noreferrer">
                                <GitHubIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                </div>
            </>
        )
    },
    'mcmv': {
        name: "MCMV",
        subtitle: "Motion Capture to Voxel Animation Converter",
        video: "https://thumbs.gfycat.com/FatLivelyArcticseal-mobile.mp4",
        description: `Convert your motion capture data into a format compatible with Blockbench to export it as an .OBJ, as a .FBX, to Minecraft, and more!`,
        content: (
            <>
                <VideoPlayer type="gfycat" videoLink="https://thumbs.gfycat.com/FatLivelyArcticseal-mobile.mp4" autoplay={true}/>
                <Markdown md="mcmv"/>

                <Typography variant="body1" color="text.secondary" align="center">
                    Check out the project!
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="GitHub">
                        <IconButton>
                            <a href="https://github.com/hanmangokiwi/MCMV"
                               target="_blank"
                               rel="noreferrer">
                                <GitHubIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                </div>
            </>
        )
    },
    'mcminer': {
        name: "Bitcoin Miner in Minecraft",
        subtitle: "Mining the world-famous cryptocurrency on the world-famous mining software",
        image: "https://cdn.discordapp.com/attachments/845801357646495787/1073072934706499666/image.png",
        description: `Tuition is expensive. Bitcoin (was) at it's all-time high. Why not mine it in *Mine*craft?`,
        content: (
            <>
                <VideoPlayer type="iframe" videoLink="https://www.youtube.com/embed/sLClfQdmzPw"/>
                <Markdown md="mcminer"/>
                <Typography variant="body1" color="text.secondary" align="center">
                    Check out the project!
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="GitHub">
                        <IconButton>
                            <a href="https://github.com/hanmangokiwi/minecraft-ntgbtminer"
                               target="_blank"
                               rel="noreferrer">
                                <GitHubIcon />
                            </a>
                        </IconButton>
                    </Tooltip>
                </div>
            </>
        )
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