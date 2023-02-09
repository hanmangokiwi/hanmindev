import React from "react";
import {Link} from "@mui/material";

function ExternalLink(props: {href: string; text?: string; underline?: "none" | "hover" | "always" | boolean | undefined; blue?: boolean}){
    let underline = props.underline;
    if (!underline) {
        underline = "none";
    }else if (underline === true){
        underline = "always";
    }

    let blue = props.blue;

    return (
        <Link
            target="_blank"
            rel="noreferrer"
            href={props.href}
            underline={underline}
            color={blue ? undefined : "textPrimary"}>
            {props.text}
        </Link>
    )
}

export {ExternalLink};