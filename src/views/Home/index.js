import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden } from '@material-ui/core'
import Slider from "react-slick";
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useGameList } from 'common/CustomHooks';
import './index.css'

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
        marginBottom: theme.spacing(5),
    },
    gTitle: {
        padding: '0 10%'
    },
    padding: {
        padding: '0 10%'
    },
    role: {
        margin: '15% 0 0 -136px',
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
    },
    slideImg: {
        '& img': {
            width: '277px',
            height: '277px',
            margin: '0 auto'
        }
    },
}))
function Home() {
    const classes = useStyles()
    const language = useSelector(state => state.app)
    const { t } = useTranslation(['home'])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: false,
        // variableWidth: true,
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
    const gameItem = useGameList(language.lang)
    return (
        <div>
            <div className={classes.header}>
                <Container className={classes.container}>
                    <Grid container alignItems="center" direction="column" justify="center" className={classes.publishBtn}>
                        <Typography variant="h4" gutterBottom color="textSecondary" align="center">{t('solgan')}</Typography>
                        {/* <Hidden smDown> */}
                        <Typography variant="h6" gutterBottom color="textSecondary" align="center">{t('sloganDesc')}</Typography>
                        {/* </Hidden> */}
                        <Box mt={8} display={{ xs: 'none', sm: 'block' }}>
                            <Button variant="contained" color="primary" size="large" to="/publishing" component={RouterLink}>{t('aboutBtn')}</Button>
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
                                    <span className={classes.t1}>{t('ulu')}</span>
                                    <span className={classes.t2}>{t('uluGame')}</span>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className={classes.word}>
                                    {t('gameTitle')}
                                </Typography>
                                <span className={classes.line}></span>
                                <Typography variant="h6" color="textSecondary" className={classes.desc}>
                                    {t('gameDesc')}
                                </Typography>
                                <Box mt={5}>
                                    <Button variant="outlined" size="large" className={classes.more} to="/gameslist" component={RouterLink}>{t('moreBtn')}</Button>
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
                            {/* <span className={classes.t3}>PUBLISHED GAMES BY</span> */}
                            <span className={classes.t4}>{t('gameList')}</span>
                        </Typography>
                        <Typography className={classes.slogan} align="center">
                            {t('gameListDesc')}
                        </Typography>
                    </div>
                    <span className={classes.line}></span>
                    <div className={classes.slideWrap}>
                        <Slider {...settings} className={classes.box}>
                            {
                                gameItem.map(item => (
                                    <Grid container alignItems="center" direction="column" justify="space-around" key={item.id} className={classes.slideImg}>
                                        <RouterLink to={`/detail/${item.id}`}>
                                            <img src={item.gameImg} alt="" />
                                        </RouterLink>
                                        <Typography className={classes.gName} align="center">{item.gameName}</Typography>
                                        {
                                            item.gameDetails.map(value => (
                                                value.type === '1' && <Typography className={classes.slogan} key={value.type} align="center"> {value.gameDescription} </Typography>
                                            ))
                                        }
                                    </Grid>
                                ))
                            }
                        </Slider>
                    </div>
                </Grid>
            </Container>
            <Box pt={8} pb={6} bgcolor="background.light">
                <Container>
                    <Grid container justify="center" direction="column" alignItems="center" className={classes.padding}>
                        <Typography gutterBottom variant="h5" color="textPrimary" align="center">{t('partner')}</Typography>
                        <Typography className={classes.slogan} align="center">{t('create')}</Typography>
                        <Box mt={7}>
                            <Button variant="contained" size="large" color="primary" to="/publishing" component={RouterLink}>{t('about')}</Button>
                        </Box>
                    </Grid>
                </Container>
            </Box>
        </div >
    );
}

export default Home;
