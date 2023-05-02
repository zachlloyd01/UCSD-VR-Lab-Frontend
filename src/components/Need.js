import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function Need(props) {
    return (
        <Paper sx={{ marginBottom: 2 }}>
            <Container>
                <Typography variant="h5">{props.title} - {props.type}</Typography>
                <Typography><i>{props.project}</i></Typography>
                <Typography>{props.desc}</Typography>
            </Container>
        </Paper>
    )
}