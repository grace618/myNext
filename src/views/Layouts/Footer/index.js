import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Container, Typography, Grid, Box } from '@material-ui/core'
import { ReactComponent as Facebook } from 'icons/svg/facebook.svg'
import { ReactComponent as Twitter } from 'icons/svg/twitter.svg'
import { ReactComponent as Wechat } from 'icons/svg/wechat.svg'
import { ReactComponent as Youtube } from 'icons/svg/youtube.svg'
const useStyles = makeStyles(theme => ({
    box: {
        '& a': {
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
    }
}))
function Footer() {
    const classes = useStyles()
    return (
        <Box bgcolor="background.default" color="text.light" p={7}>
            <Container>
                <Grid container justify="space-between" alignItems="center">
                    <Typography align="center">Copyright © U.LU Games all right reserved.</Typography>
                    <Box display={{ xs: 'none', sm: 'block' }} className={classes.box}>
                        <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                            <Facebook />
                        </a>
                        <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                            <Twitter />
                        </a>
                        <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                            <Wechat />
                        </a>
                        <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                            <Youtube />
                        </a>
                    </Box>
                </Grid>
            </Container>
        </Box>
    )
}
export default Footer