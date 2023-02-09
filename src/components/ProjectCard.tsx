import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VideoPlayer from "./VideoPlayer";


export default function ProjectCard(props: {name: string; subtitle: string; image?: string; video?: string; description: string;}) {
    const [show, setShow] = React.useState(false);

    return (
        <Card
            sx={[
                (theme) => ({
                    borderRadius: 4,
                    transition: "transform 0.05s ease-in-out",
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
                    },
                }),
            ]}
            style={{cursor:'pointer'}}

            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
        >
            <CardHeader
                title={props.name}
                subheader={props.subtitle}
            />
            {props.video? <CardMedia>
                    <VideoPlayer type="gfycat" videoLink={props.video} play={show}/>
            </CardMedia>: <CardMedia
                    component="img"
                    height="194"
                    src={props.image}
                    alt={props.name}
                />
            }
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}