import { AppBar, Toolbar, IconButton, Menu as MenuIcon, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export default function NavBar() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                        XR Lab Logo
                    </Typography>
                    <div>
                        <Button to="/" color='inherit' component={Link}>Home</Button>
                        <Button to="projects" color='inherit' component={Link}>Projects</Button>
                        <Button to="/" color='inherit' component={Link}>Research</Button>
                        <Button to="/" color='inherit' component={Link}>Equipment</Button>
                        <Button to="/" color='inherit' component={Link}>Lab Policy</Button>
                        <Button to="members" color='inherit' component={Link}>Members</Button>
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    )
}