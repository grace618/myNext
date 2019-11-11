import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Container, Typography, Grid, Box } from '@material-ui/core'
import { ReactComponent as Facebook } from 'icons/svg/facebook.svg'
import { ReactComponent as Twitter } from 'icons/svg/twitter.svg'
import { ReactComponent as Youtube } from 'icons/svg/youtube.svg'
import { ReactComponent as Wechat } from 'icons/svg/wechat.svg'
const useStyles = makeStyles(theme => ({
    ico: {
        marginRight: theme.spacing(6),
        '& svg:hover': {
            '& path': {
                fill: 'orange'
            }
        },
        '& path': {
            fill: '#787676'
        }
    }
}))
function Footer() {
    const classes = useStyles()
    return (
        <Box bgcolor="background.default" color="text.light" p={7}>
            <Container>
                <Grid container justify="space-between" alignItems="center">
                    <Typography align="center">Copyright © U.LU Games all right reserved.</Typography>
                    <Box display={{ xs: 'none', sm: 'block' }}>
                        <a href="https://twitter.com/ULUGames1" target="_blank" rel="noopener noreferrer" className={classes.ico}> <Twitter /></a>
                        <a href="https://www.youtube.com/channel/UC3PCMQ6sbpCZVdIqZaWf4-g" target="_blank" rel="noopener noreferrer" className={classes.ico}><Youtube /></a>
                        <span className={classes.ico}><Facebook /></span>
                        <span className={classes.ico}><Wechat /></span>
                    </Box>
                </Grid>
            </Container>
        </Box>
    )
}
export default Footer