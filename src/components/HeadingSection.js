import { Typography, Grid, Divider } from "@mui/material";

export default function HeadingSection(props) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '65vh' }}
        >

            <Grid item xs={3}>
                <Typography variant="h1">FNA Lab Title Here</Typography>
                <Divider />
                <Typography align={"center"}>Dang... Zach really got it going in a night??</Typography>
                <Typography align="center"><i>Thats craaaazyyyy..... Someone should give him a sandwich cause rn its dinner time and he's hungry</i></Typography>
                <Typography align="center">Mmmmm... shrimp scampi sounds good... OOOH OR OR I HAVE SOME CORNISH HEN THAT LOOKS DELICIOUS</Typography>
            </Grid>

        </Grid >
    )
}