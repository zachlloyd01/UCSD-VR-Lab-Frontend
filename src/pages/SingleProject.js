import React, { useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';



export default function SingleProject(props) {

    const { id } = useParams()
    const [project, setProject] = useState([])

    React.useEffect(() => {

        async function fetchData() {
            const gotProj = await axios.get(`http://localhost:1337/api/projects/${id}?populate=*`)
            console.log(gotProj)
            setProject(gotProj.data.data.attributes)
        }
        fetchData()
    }, [])

    function renderProject() {
        if (!project)
            return ''
        return (
            <div>
                <h1>{project.Title}</h1>
                {
                    'team' in project ? <p><i>By: {project.team.data.attributes.Name} </i></p> : ''
                }

                {
                    'Image' in project ? <img src={"http://localhost:1337" + project.Image.data.attributes.url} style={{ width: '35vw' }} /> : ''
                }

                <h4>Hypothesis:</h4>
                <p>{project.Hypothesis}</p>

                <h4>Description:</h4>
                <p>{project.Description}</p>
                {
                    ('deliverables' in project) ? <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Title</b></TableCell>
                                    <TableCell><b>Due Date</b></TableCell>
                                    <TableCell><b>Explanation</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    project.deliverables.data.map(deliverableRaw => {
                                        const deliverable = deliverableRaw.attributes


                                        return (
                                            <TableRow>
                                                <TableCell>{deliverable.Title}</TableCell>
                                                <TableCell>{deliverable.Date}</TableCell>
                                                <TableCell>{deliverable.Explanation}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer> : ''
                }

            </div>
        )
    }

    return (
        <div class={`project-${id}`}>
            {
                renderProject()
            }

        </div>
    )
}