import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import VideoPlayer from "./VideoPlayer";


export default function ProjectCard(props: {project: any}) {
    const [show, setShow] = React.useState(false);

    return (
        <Card
            sx={[
                () => ({
                    borderRadius: 4,
                    transition: "transform 0.05s ease-in-out",
                    '@media (hover: hover)': {
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
                        }
                    }
                }),
            ]}
            style={{cursor:'pointer', width: 'auto', maxWidth: '100%'}}

            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
        >
            <CardHeader
                title={props.project.name}
                subheader={props.project.subtitle}
            />
            {props.project.video? <CardMedia>
                    <VideoPlayer type="gfycat" videoLink={props.project.video} play={show}/>
            </CardMedia>: <CardMedia
                    component="img"
                    height="194"
                    src={props.project.image}
                    alt={props.project.name}
                />
            }
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.project.description}
                </Typography>
            </CardContent>
        </Card>
    );
}