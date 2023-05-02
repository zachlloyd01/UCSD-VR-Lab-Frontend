import { Grid } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios'
import Project from '../components/Project';



export default function Projects(props) {
    const [projects, setProjects] = useState([])

    React.useEffect(() => {

        async function fetchData() {
            const serverProjects = await axios.get("http://localhost:1337/api/projects?populate=*")
            console.log(serverProjects)
            setProjects(serverProjects.data.data)
        }
        fetchData()
    }, [])

    return (
        <div class="projects">
            <h1>Projects</h1>

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
                        return <Grid item align="center" xs={12} sm={6} md={3}><Project key={project.id} id={projectRaw.id} teamName="Temp" title={project.Title} summary={project.Summary} image={"http://localhost:1337" + project.Image.data.attributes.url} /></Grid>
                    })
                }

            </Grid>
        </div>
    )
}