import { Grid } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Members(props) {
    const [projects, setProjects] = useState([])

    React.useEffect(() => {

        async function fetchData() {
            const serverProjects = await axios.get("http://localhost:1337/api/authors?populate=*")
            setProjects(serverProjects.data.data)
        }
        fetchData()
    }, [])

    return (
        <div class="projects">
            <h1>Lab Members</h1>

            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {
                    projects.map(projectRaw => {
                        const project = projectRaw.attributes
                        console.log(project)
                        return (

                            <Grid item align="center" xs={12} sm={6} md={3} key={projectRaw.id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={''}
                                        title="Member Pic"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {project.Name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {project.Bio}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                        )
                    })
                }

            </Grid>
        </div>
    )
}