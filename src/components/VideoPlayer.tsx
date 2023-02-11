import React, {useRef} from "react";
import useOnScreen from "../helpers/hooks";

function VideoPlayer(props: { raw?: boolean; type: string; videoLink: string; play?: boolean; autoplay?: boolean }) {
    const wrapper = (inside: any) => <div className="videoWrapper" style={{marginBottom: "10px"}}>{inside}</div>
    const video = useRef<HTMLVideoElement>(null);

    const isVisible = useOnScreen(video)

    if (video.current){
        if ((props.play || props.autoplay) && isVisible) {
            video.current.play();
        }else{
            video.current.pause();
        }
    }

    let videoLink = props.videoLink;




    if (props.type === "iframe") {
        if (props.raw){
            videoLink = `https://www.youtube.com/embed/${props.videoLink}`
        }

        return wrapper(<iframe title="Featured Video" width="100%" height="100%" src={videoLink}/>)

    } else if (props.type === "gfycat") {
        if (props.raw){
            videoLink = `https://thumbs.gfycat.com/${props.videoLink}-mobile.mp4`
        }
        return wrapper(
            <video ref={video} autoPlay={props.autoplay} loop muted width="100%" height="100%" style={{margin: 0}}>
                <source src={videoLink} type="video/mp4" />
            </video>
        )

    } else if (props.type === "image") {
        return wrapper(
            <img width="100%" height="100%" src={videoLink}  alt={videoLink}/>
        )
    } else {
        return <p>VideoPlayer Error</p>
    }
}

export default VideoPlayer;