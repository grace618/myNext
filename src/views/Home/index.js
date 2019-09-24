import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden } from '@material-ui/core'
import Slider from "react-slick";
import './index.css'

import pic1 from 'assets/imgs/pic1.jpg'
import pic2 from 'assets/imgs/pic2.jpg'
import pic3 from 'assets/imgs/pic3.jpg'
import pic4 from 'assets/imgs/pic4.jpg'
import headerBg from 'assets/imgs/headerBg.jpg'
import person from 'assets/imgs/person.png'

const useStyles = makeStyles(theme => ({
    header: {
        background: `url(${headerBg}) 20% top`,
        width: '100%',
        height: 889
    },
    container: {
        height: '100%'
    },
    publishBtn: {
        height: '100%'
    },
    panelContainer: {
        paddingTop: 1
    },
    t1: {
        fontSize: 38,
        fontFamily: "Arial",
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        marginRight: theme.spacing(2),
        display: 'inline-block'
    },
    t2: {
        fontSize: 38,
        fontFamily: "Arial",
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        display: 'inline-block'
    },
    t3: {
        fontSize: 20,
        fontFamily: "Arial",
        color: theme.palette.text.primary,
        marginRight: theme.spacing(2)
    },
    t4: {
        fontSize: 20,
        fontFamily: "Arial",
        color: theme.palette.primary.main,
    },
    word: {
        fontSize: 24,
        fontFamily: "Microsoft YaHei",
        color: theme.palette.text.light,
        fontWeight: 'lighter'
    },
    desc: {
        fontSize: 14,
        fontFamily: "Arial",
        color: theme.palette.text.secondary,
        lineHeight: 2.252
    },
    line: {
        backgroundColor: 'rgb(68, 68, 68)',
        width: theme.spacing(5),
        height: 2,
        display: 'block',
        margin: '40px 0 30px 0'
    },
    more: {
        background: 'white'
    },
    slide: {
        margin: '70px auto 80px auto'
    },
    slogan: {
        fontSize: 16,
        color: theme.palette.text.light,
    },
    slideWrap: {
        width: '100%',
        marginTop: '20px'
    },
    gName: {
        fontSize: 18,
        fontFamily: "Arial",
        color: theme.palette.text.primary,
        margin: '20px 0 10px 0'
    },
    box: {
        marginBottom: theme.spacing(5)
    },
    gTitle: {
        padding: '0 10%'
    },
    padding: {
        padding: '0 10%'
    },
    role: {
        marginLeft: -340,
        margin: '15% 0 0 -340px',
        [theme.breakpoints.down('md')]: {
            width: '90%',
            marginLeft: 0
        },
    },
    right: {
        boxSizing: 'border-box',
        paddingRight: 55,
        [theme.breakpoints.down('md')]: {
            padding: '9% 10%'
        },
    }
}))
function Home() {
    const classes = useStyles()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    return (
        <div>
            <div className={classes.header}>
                <Container className={classes.container}>
                    <Grid container alignItems="center" direction="column" justify="center" className={classes.publishBtn}>
                        <Typography variant="h4" gutterBottom color="textSecondary" align="center">PUBLISH YOUR GAME/APP GLOBALLY NOW</Typography>
                        <Hidden smDown>
                            <Typography variant="h6" gutterBottom color="textSecondary" align="center">Start self-publishing, or as a publishing partner with ULU GAMES</Typography>
                        </Hidden>
                        <Box mt={8} display={{ xs: 'none', sm: 'block' }}>
                            <Button variant="contained" color="primary" size="large" >GLOBAL PUBLISHING</Button>
                        </Box>
                    </Grid>
                </Container>
            </div>
            <Box bgcolor="background.light">
                <Container className={classes.panelContainer}>
                    <Grid container justify="space-between" >
                        <Grid item className={classes.left} xs={12} sm={12} md={12} lg={6} xl={6}>
                            <img src={person} alt="role" className={classes.role} />
                        </Grid>
                        <Grid item container direction="column" justify="center" className={classes.right} xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Box width="100%">
                                <Typography>
                                    <span className={classes.t1}>PUBLISHER</span>
                                    <span className={classes.t2}>ULU GAMES</span>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className={classes.word}>
                                    Publish globally with a partner
                            </Typography>
                                <span className={classes.line}></span>
                                <Typography variant="h6" color="textSecondary" className={classes.desc}>
                                    We do publishing by targeting the global market with high quality and unique <br />mobile games.
                            Quality games are sourced, then improvements are made through <br /> our polishing process.
                            We've proven the success of the process with our games <br /> being downloaded over 2 million times. Our major projects include 'ARKA', 'ETERNAL STORM', and 'ERA of DISCORD'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          2 million times. Our major projects include 'ARKA', 'ETERNAL STORM', and 'ERA of DISCORD'.
                            </Typography>
                                <Box mt={5}>
                                    <Button variant="outlined" size="large" className={classes.more}>SEE MORE</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container className={classes.slide}>
                <Grid container justify="center" direction="column" alignItems="center" >
                    <div className={classes.gTitle}>
                        <Typography gutterBottom align="center">
                            <span className={classes.t3}>PUBLISHED GAMES BY</span>
                            <span className={classes.t4}>ULU GAMES</span>
                        </Typography>
                        <Typography className={classes.slogan} align="center">
                            See our games on App Store and Google Play!
                        </Typography>
                    </div>
                    <span className={classes.line}></span>
                    <div className={classes.slideWrap}>
                        <Slider {...settings} className={classes.box}>
                            {/* <Skeleton variant="rect" width={210} height={118} /> */}
                            <div>
                                <Grid container alignItems="center" direction="column" justify="space-around" >
                                    <RouterLink to="/detail">
                                        <img src={pic1} alt="uluLogo" className={classes.pic} />
                                    </RouterLink>
                                    <Typography className={classes.gName} align="center">Myth of Sword</Typography>
                                    <Typography className={classes.slogan}>Upcoming game with 2.5D artwork! </Typography>
                                </Grid>
                            </div>
                            <div>
                                <Grid container alignItems="center" direction="column" justify="space-around">
                                    <RouterLink to="/detail">
                                        <img src={pic2} alt="uluLogo" className={classes.pic} />
                                    </RouterLink>
                                    <Typography className={classes.gName}>ARKA</Typography>
                                    <Typography className={classes.slogan}>MMORPG Masterpiece </Typography>
                                </Grid>
                            </div>
                            <div>
                                <Grid container alignItems="center" direction="column" justify="space-around">
                                    <RouterLink to="/detail">
                                        <img src={pic3} alt="uluLogo" className={classes.pic} />
                                    </RouterLink>
                                    <Typography className={classes.gName}>ERA OF DISCORD</Typography>
                                    <Typography className={classes.slogan}>MMORPG Masterpiece </Typography>
                                </Grid>
                            </div>
                            <div>
                                <Grid container alignItems="center" direction="column" justify="space-around">
                                    <RouterLink to="/detail">
                                        <img src={pic4} alt="uluLogo" className={classes.pic} />
                                    </RouterLink>
                                    <Typography className={classes.gName}>RAID SURVIVOR</Typography>
                                    <Typography className={classes.slogan}>START A NEW ADVENTURE </Typography>
                                </Grid>
                            </div>
                        </Slider>
                    </div>
                </Grid>
            </Container>
            <Box pt={8} pb={6} bgcolor="background.light">
                <Container>
                    <Grid container justify="center" direction="column" alignItems="center" className={classes.padding}>
                        <Typography gutterBottom variant="h5" color="textPrimary" align="center">PUBLISH YOUR GAME/APP GLOBALLY NOW</Typography>
                        <Typography className={classes.slogan} align="center">Start self-publishing, or as a publishing partner with ULU GAME</Typography>
                        <Box mt={7}>
                            <Button variant="contained" size="large" color="primary" >GLOBAL PUBLISHING</Button>
                        </Box>
                    </Grid>
                </Container>
            </Box>
        </div >
    );
}

export default Home;
