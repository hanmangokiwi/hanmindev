import React, {useRef} from "react";

function VideoPlayer(props: { type: string; videoLink: string; play?: boolean; autoplay?: boolean }) {
    const wrapper = (inside: any) => <div className="videoWrapper" style={{marginBottom: "10px"}}>{inside}</div>
    const video = useRef<HTMLVideoElement>(null);

    if (video.current){
        if (props.play || props.autoplay) {
            video.current.play();
        }else{
            video.current.pause();
        }
    }


    if (props.type === "iframe") {
        return wrapper(<iframe title="Featured Video" width="100%" height="100%" src={props.videoLink}/>)

    } else if (props.type === "gfycat") {
        return wrapper(
            <video ref={video} autoPlay={props.autoplay} loop muted width="100%" height="100%" style={{margin: 0}}>
                <source src={props.videoLink} type="video/mp4" />
            </video>
        )

    } else if (props.type === "image") {
        return wrapper(
            <img width="100%" height="100%" src={props.videoLink} />
        )
    } else {
        return <p>VideoPlayer Error</p>
    }
}

export default VideoPlayer;