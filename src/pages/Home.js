import { Container, Typography, Paper, Grid, TableContainer, TableCell, Table, TableBody, TableHead, TableRow } from '@mui/material';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Need from '../components/Need'
import Project from '../components/Project';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Carousel from 'react-material-ui-carousel'

function App() {

    const [projects, setProjects] = useState([])

    const [splitProjects, setSplitProjects] = useState([])

    const [teams, setTeams] = useState([])

    const [events, setEvents] = useState([])

    const [needs, setNeeds] = useState([])

    const localizer = momentLocalizer(moment)

    React.useEffect(() => {

        async function fetchData() {
            const serverNeeds = await axios.get("http://localhost:1337/api/needs?populate=*")
            const serverTeams = await axios.get("http://localhost:1337/api/teams?populate=*")
            const serverProjects = await axios.get("http://localhost:1337/api/projects?populate=*")
            const serverEvents = await axios.get("http://localhost:1337/api/events?populate=*")


            console.log(serverProjects)
            setNeeds(serverNeeds.data.data)
            setTeams(serverTeams.data.data)
            setProjects(serverProjects.data.data)

            let splitProjs = []
            for (let i = 0; i < serverProjects.data.data.length; i += 2) {
                splitProjs.push([serverProjects.data.data[i], serverProjects.data.data[i + 1]])
            }

            console.log(splitProjs)
            setSplitProjects(splitProjs)

            let evts = []

            for (const event of serverEvents.data.data) {
                const evt = event.attributes

                evts.push(
                    {
                        title: evt.Title,
                        start: new Date(evt.Date),
                        end: new Date(evt.End_Time),
                        description: evt.Description
                    }
                )
            }

            setEvents(evts)
            //   const events = [
            //     {
            //       title: 'My Event'
            // start: new Date('2015-04-12T13:45:00-05:00'),
            //       end: new Date('2015-04-12T14:00:00-05:00')
            //     }

        }
        fetchData()
    }, [])

    const needsRef = useRef()

    return (
        <>

            <Container style={{ paddingTop: 50 }}>
                <h1>Welcome to the XR Lab!</h1>

                {
                    (splitProjects ?
                        <Paper style={{
                        }}>
                            <Container sx={{ width: '65%', paddingTop: '1em' }}>
                                <Typography variant='h3'>Projects</Typography>
                                <Carousel>
                                    {
                                        splitProjects.map(inProjects => {
                                            console.log(inProjects)
                                            const project0 = inProjects[0].attributes
                                            console.log(project0)
                                            const project1 = inProjects[1]?.attributes
                                            return (
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Project key={inProjects[0].id} teamName="Temp" id={inProjects[0].id} title={project0.Title} summary={project0.Summary} image={"http://localhost:1337" + project0.Image.data.attributes.url} />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {project1 ? <Project key={inProjects[1].id} teamName="Temp" id={inProjects[1].id} title={project1.Title} summary={project1.Summary} image={"http://localhost:1337" + project0.Image.data.attributes.url} /> : ''}
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Carousel>
                            </Container>
                        </Paper> : '')
                }

                <Paper id="needs" style={{ marginBottom: 50 }}>
                    <Container sx={{ marginTop: 15 }} ref={needsRef} style={{ paddingBottom: 25 }}>
                        <h1>FNA Lab Needs</h1>
                        {
                            needs.map(needRaw => {
                                const need = needRaw.attributes
                                return <Need key={need.id} project={need.project.data.attributes.Title} teamName="Temp" title={need.Title} desc={need.Description} type={need.Type} />
                            })
                        }
                    </Container>
                </Paper>

                <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
                    <Container>
                        <h1>Events</h1>


                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Title</b></TableCell>
                                    <TableCell><b>Start Date</b></TableCell>
                                    <TableCell><b>End Date</b></TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    events.map(event => {


                                        return (
                                            <TableRow>
                                                <TableCell>{event.title}</TableCell>
                                                <TableCell>{event.start.toLocaleString('en-us')}</TableCell>
                                                <TableCell>{event.end.toLocaleString('en-us')}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Container>
                </TableContainer>
            </Container >
        </>
    );
}

export default App;
