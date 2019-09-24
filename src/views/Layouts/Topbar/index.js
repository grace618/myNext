import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Link, Grid, IconButton, Hidden, MenuItem, Menu } from '@material-ui/core';
import { Language, Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles'
import logo from 'assets/imgs/logo.png'
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        height: theme.spacing(10),
    },
    container: {
        height: '100%',
    },
    content: {
        height: '100%'
    },
    navLink: {
        '& a': {
            color: theme.palette.white,
            margin: '0 10px',
            fontFamily: "Microsoft YaHei",
            fontSize: 12
        }
    },
    svg: {
        color: 'white'
    },

}))
function Topbar() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Grid container alignItems="center" justify="space-between" className={classes.content}>
                    <Hidden mdUp>
                        <Grid>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MenuIcon className={classes.svg} />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}> <Link to="/publishing" component={RouterLink}>GlOBAL PUBLISHING</Link></MenuItem>
                                <MenuItem onClick={handleClose}> <Link to="/gameslist" component={RouterLink}>ULU GAMES</Link></MenuItem>
                                <MenuItem onClick={handleClose}> <Link to="/jobs" component={RouterLink}>JOBS</Link></MenuItem>
                                {/* <MenuItem onClick={handleClose}> <Link to="/login" component={RouterLink}>LOG IN</Link></MenuItem>
                                <MenuItem onClick={handleClose}> <Link to="signup" component={RouterLink}>SIGN UP</Link></MenuItem> */}
                            </Menu>
                        </Grid>
                    </Hidden>
                    <Grid item>
                        <Link to="/" component={RouterLink}><img src={logo} alt="uluLogo" /></Link>
                    </Grid>
                    <Grid item className={classes.navLink}>
                        <Hidden only={['sm', 'xs']}>
                            <Link to="/publishing" component={RouterLink}>GlOBAL PUBLISHING</Link>
                            <Link to="/gameslist" component={RouterLink}>ULU GAMES</Link>
                            <Link to="/jobs" component={RouterLink}>JOBS</Link>
                            {/* <Link to="/login" component={RouterLink}>LOG IN</Link>
                            <Link to="signup" component={RouterLink}>SIGN UP</Link> */}
                        </Hidden>
                        <IconButton aria-label="select" >
                            <Language color="primary" className={classes.svg} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default Topbar