import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Project(props) {
    console.log(props)
    return (
        <div style={{ paddingBottom: 10 }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.image}
                    title="Project Icon"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.summary}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant='contained' component={Link} state={{ id: props.id }} to={`/projects/${props.id}`}>Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}