import "./OverlayPage.css";
import {Stack} from "@mui/material";

export default function OverlayPage(props: { children: React.ReactNode; onClick?: () => void }) {
    return (<div className="overlayPageMain" onClick={props.onClick}>
        <div className="overlayPageContent" onClick={(e) => e.stopPropagation()}>
            <Stack spacing={2} alignItems="center">
                {props.children}
            </Stack>
        </div>
    </div>)
}