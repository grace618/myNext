import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden, Breadcrumbs, Link, Divider } from '@material-ui/core'
import Slider from "react-slick";
import ReactPlayer from 'react-player'
import ImageZoom from 'react-medium-image-zoom'
import {
    TwitterShareButton,
    FacebookShareButton,
} from 'react-share';
import img1 from 'assets/imgs/img1.jpg'
import img2 from 'assets/imgs/img2.jpg'
import img3 from 'assets/imgs/img3.jpg'
import img4 from 'assets/imgs/img4.jpg'
import mythLogo from 'assets/imgs/mythLogo.png'
import mythOfSword from 'assets/imgs/1_myth_of_sword.png'
import { ReactComponent as DateIcon } from 'icons/svg/date.svg'
import { ReactComponent as LightIcon } from 'icons/svg/light.svg'
import { ReactComponent as UserIcon } from 'icons/svg/user.svg'
import { ReactComponent as Facebook } from 'icons/svg/facebook.svg'
import { ReactComponent as Twitter } from 'icons/svg/twitter.svg'
import { ReactComponent as Wechat } from 'icons/svg/wechat.svg'
import { ReactComponent as Youtube } from 'icons/svg/youtube.svg'
import { ReactComponent as IOS } from 'icons/svg/IOS.svg'
import { ReactComponent as Android } from 'icons/svg/andriod.svg'
import { ReactComponent as Twitch } from 'icons/svg/twitch.svg'

const useStyles = makeStyles(theme => ({
    navBar: {
        height: '100%',
        '& div': {
            height: '100%',
            '& .breadcrumbsa': {
                fontSize: 14
            }
        }
    },
    logo: {
        fontSize: 16,
        fontFamily: "Microsoft YaHei",
        fontWeight: 'bold',
        color: theme.palette.text.secondary
    },
    gameTitle: {
        padding: '60px 0 30px 0'
    },
    divider: {
        color: theme.palette.primary.main
    },
    space: {
        padding: '30px 0'
    },
    m: {
        margin: '36px 0',
        lineHeight: 1.8
    },
    infoPanel: {
        margin: '30px 0 40px 0',
        '& div': {
            paddingBottom: 10
        }
    },
    downloadiOS: {
        background: '#0696F2',
        margin: '10px 0'
    },
    downloadGoogleplay: {
        background: '#7FC75A'
    },
    facebook: {
        background: '#3B5998',
        margin: '10px 0'
    },
    twitter: {
        background: '#08A0E9',
        marginBottom: 10
    },
    youtube: {
        background: '#FF0000',
        marginBottom: 10
    },
    wechat: {
        background: '#07AF12',
        marginBottom: 10
    },
    icon: {
        marginRight: 30,
        '& path': {
            fill: 'white'
        }
    },
    youtube2: {
        '& path': {
            fill: '#333333'
        }
    },
    share: {
        margin: '0 10px'
    },
    slideWrap: {
        width: '100%',
        marginTop: '20px'
    },
    box: {
        marginBottom: theme.spacing(5)
    },
    textInfo: {
        color: theme.palette.text.primary,
        fontWeight: "500"
    },
    rightPanel: {
        padding: '0 4%'
    },
    moreDetail: {
        width: 116,
        height: 32,
        fontSize: '12px'
    },
    source: {
        marginBottom: 40
    },
    thumbnail: {
        marginBottom: theme.spacing(3),
        width: theme.spacing(16),
        height: theme.spacing(16),
    }
}))

function Home() {
    const classes = useStyles()
    const shareUrl = 'http://github.com';
    const title = 'GitHub';
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
            <Hidden smDown>
                <Box bgcolor="background.light" height="60px">
                    <Container className={classes.navBar}>
                        <Grid justify="space-between" container alignItems="center">
                            <Typography className={classes.logo}>ULU GAMES</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to="/" component={RouterLink} className={classes.breadcrumbs}>Home </Link>
                                <Link color="inherit" to="/" component={RouterLink} className={classes.breadcrumbs}>
                                    Games
                                 </Link>
                                <Typography color="textPrimary" className={classes.breadcrumbs}>Myth of Sword</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Container>
                </Box>
            </Hidden>
            <Container>
                <Grid container alignItems="center" className={classes.gameTitle}>
                    <Box mr={5} mb={1}>
                        <img src={mythLogo} alt="mytho of sword" />
                    </Box>
                    <div>
                        <Typography gutterBottom variant="h5" color="textPrimary">Myth of Sword</Typography>
                        <Typography color="textSecondary">Upcoming game with 2.5D artwork! </Typography>
                    </div>
                </Grid>
                <Divider />
                <Grid container justify="space-between" className={classes.space}>
                    {/* spacing={spacing}  */}
                    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                        <img src={mythOfSword} alt="mythOfSword" width="100%" className={classes.source} />
                        <ReactPlayer url='https://www.youtube.com/embed/oSUq36I6jnA' width="100%" className={classes.source} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.rightPanel}>
                        <Box color="text.secondary" mb={3}>
                            <Typography> Upcoming game with 2.5D artwork! Fantastic design with various challenge game-plays:</Typography>
                            <Typography className={classes.m}>
                                1. Clan battle. Battle among different clans for the rich materials and Boss. <br />
                                2. Cross-server PK. PK across server for rare materials and BOSS! Be the KING!<br />
                                3. Love system. Find your love here and hold special wedding for her/him. You are not alone anymore.<br />
                                4. Wing Feature. Fantastic Wings with huge bonus on your combat power.<br />
                                5. Gorgeous Costume. Various unique and pretty costume for you.<br />
                                6. Awesome Weapons. Great weapons with huge power during battle and beat boss.<br />
                                7. Rich event. Lots of event during a day. You can play a full day!<br />
                                8. Unique home feature. You can share your story and pictures with others!<br />
                            </Typography>
                            <Typography gutterBottom>
                                More new content is under development. Please stay tuned!
                            </Typography>
                        </Box>
                        <Divider />
                        <Grid className={classes.infoPanel} container direction="column">
                            <Grid container item>
                                <Box className={classes.textInfo} width="150px"> <UserIcon /> Developer: </Box>
                                <span>ULU Games</span>
                            </Grid>
                            <Grid container item >
                                <Box className={classes.textInfo} width="150px"> <DateIcon /><span> Release Date:</span>  </Box>
                                <span>December 2016</span>
                            </Grid>
                            <Grid container item>
                                <Box className={classes.textInfo} width="150px">  <LightIcon /><span> Genre:</span>  </Box>
                                <span>RPG</span>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid className={classes.infoPanel} container direction="column">
                            <div className={classes.textInfo} > Download Now!</div>
                            <Button variant="contained" color="secondary" size="large" className={classes.downloadiOS}>
                                <IOS className={classes.icon} />
                                APP STORE
                            </Button>
                            <Button variant="contained" color="primary" size="large" className={classes.downloadGoogleplay}>
                                <Android className={classes.icon} />
                                GOOGLE PLAY
                            </Button>
                        </Grid>
                        <Divider />
                        <Grid className={classes.infoPanel} container direction="column">
                            <div className={classes.textInfo} >Follow official channels of ULU GAMES!</div>
                            <Button variant="contained" color="secondary" size="medium" className={classes.facebook}>
                                <Facebook className={classes.icon} />
                                ULUGAMES FACEBOOK
                            </Button>
                            <Button variant="contained" color="secondary" size="medium" className={classes.twitter}>
                                <Twitter className={classes.icon} />
                                ULUGAMES TWITTER
                            </Button>
                            <Button variant="contained" color="primary" size="medium" className={classes.youtube}>
                                <Youtube className={classes.icon} />
                                ULUGAMES YOUTUBE
                            </Button>
                            <Button variant="contained" color="secondary" size="medium" className={classes.wechat}>
                                <Wechat className={classes.icon} />
                                ULUGAMES WECHAT
                            </Button>
                        </Grid>
                        <Divider />
                        <Grid className={classes.infoPanel} container>
                            <Box fontSize="20px" className={classes.textInfo}>
                                <Grid container alignItems="center" justify="space-between">
                                    <Box mr={2}>
                                        <Youtube className={classes.youtube2} /> YouTube
                                    </Box>
                                    <div>
                                        <Twitch /> Twitch Copuright（Free）
                                    </div>
                                </Grid>
                            </Box>
                            <Typography>
                                Some game developers restrict use of game content on YouTube, Twitch, or other similar video streaming services.
                                We at ULU GAMES welcome and encourage you to use our games to be streamed freely.
                                 Along with the video, please use our images and artwork available throughout our site :)
                            </Typography>
                        </Grid>
                        <Divider />
                        <Grid justify="space-between" container alignItems="center" >
                            <Typography>Share:</Typography>
                            <Box p={2}>
                                <Grid container >
                                    <FacebookShareButton
                                        url={shareUrl}
                                        quote={title}
                                        className={classes.share}
                                    >
                                        <Facebook />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={shareUrl}
                                        quote={title}
                                        className={classes.share}
                                    >
                                        <Twitter />
                                    </TwitterShareButton>
                                    <Wechat className={classes.share} />
                                </Grid>
                            </Box>
                        </Grid>
                        <Divider />
                    </Grid>
                </Grid>
                <Box pt={2} pb={2} fontSize="20px" className={classes.textInfo}>Screenshots & Artwork</Box>
                <div className={classes.slideWrap}>
                    <Slider {...settings} className={classes.box}>
                        {/* <Skeleton variant="rect" width={210} height={118} /> */}
                        <div>
                            <Grid container alignItems="center" justify="center">
                                {/* <img src={img1} alt="uluLogo" className={classes.pic} /> */}
                                <ImageZoom
                                    image={{ src: img1, alt: 'ulugameImg', }}
                                    zoomImage={{ src: img1, alt: 'ulugameImg' }}
                                />
                                {/* <ImageZoom
                                    image={{
                                        src: img1,
                                        alt: 'Gazelle Stomping',
                                        title: "Don't exceed original image dimensions...",
                                        className: 'img',
                                        style: {
                                            width: '100%'
                                        }
                                    }}
                                    shouldRespectMaxDimension={true}
                                /> */}
                            </Grid>
                        </div>
                        <div>
                            <Grid container alignItems="center" justify="center">
                                <ImageZoom
                                    image={{ src: img2, alt: 'ulugameImg', }}
                                    zoomImage={{ src: img2, alt: 'ulugameImg' }}
                                />
                            </Grid>
                        </div>
                        <div>
                            <Grid container alignItems="center" justify="center">
                                <ImageZoom
                                    image={{ src: img3, alt: 'ulugameImg', }}
                                    zoomImage={{ src: img3, alt: 'ulugameImg' }}
                                />
                            </Grid>
                        </div>
                        <div>
                            <Grid container alignItems="center" justify="center" >
                                <ImageZoom
                                    image={{ src: img4, alt: 'ulugameImg', }}
                                    zoomImage={{ src: img4, alt: 'ulugameImg' }}
                                />
                            </Grid>
                        </div>
                    </Slider>
                </div>
                <Divider />
                <Box pt={3} pb={4} fontSize="20px" className={classes.textInfo}>Recommended Similar Games</Box>
                <Grid justify="space-between" container>
                    <Grid container item xs={12} sm={12} md={12} lg={6} xl={6}  >
                        <Grid xs={12} sm={12} md={3} lg={3} xl={3} item container justify="center">
                            <img src={mythLogo} alt="mytho of sword" className={classes.thumbnail} />
                        </Grid>
                        <Grid xs={12} sm={12} md={8} lg={8} xl={8} item>
                            <Grid item justify="space-between" container>
                                <div>
                                    <Box fontSize="18px" className={classes.textInfo}>Myth of Sword</Box>
                                    <Typography color="textSecondary">Upcoming game with 2.5D artwork! </Typography>
                                </div>
                                <Hidden smDown>
                                    <Button variant="contained" color="primary" size="small" className={classes.moreDetail}>
                                        MORE DETAILS
                                    </Button>
                                </Hidden>
                            </Grid>
                            <Grid>
                                <Box fontSize="14px" pt={2} lineHeight="1.7" pb={2}>
                                    Upcoming game with 2.5D artwork! <br />Fantastic design with various challenge game-plays:<br />
                                    1.  Clan battle. Battle among different clans for the rich materials and Boss.<br />
                                    2. Cross-server PK. PK across server for rare materials and BOSS! Be the KING!
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={6} xl={6}  >
                        <Grid xs={12} sm={12} md={3} lg={3} xl={3} item container justify="center">
                            <img src={mythLogo} alt="mytho of sword" className={classes.thumbnail} />
                        </Grid>
                        <Grid xs={12} sm={12} md={8} lg={8} xl={8} item>
                            <Grid item justify="space-between" container>
                                <div>
                                    <Box fontSize="18px" className={classes.textInfo}>Myth of Sword</Box>
                                    <Typography color="textSecondary">Upcoming game with 2.5D artwork! </Typography>
                                </div>
                                <Hidden smDown>
                                    <Button variant="contained" color="primary" size="small" className={classes.moreDetail}>
                                        MORE DETAILS
                                    </Button>
                                </Hidden>
                            </Grid>
                            <Grid>
                                <Box fontSize="14px" pt={2} lineHeight="1.7">
                                    Upcoming game with 2.5D artwork! <br />Fantastic design with various challenge game-plays:<br />
                                    1.  Clan battle. Battle among different clans for the rich materials and Boss.<br />
                                    2. Cross-server PK. PK across server for rare materials and BOSS! Be the KING!
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid alignItems="center" container justify="center" className={classes.space}>
                    <Button variant="contained" color="primary" size="large" component={RouterLink} to="/gameslist">SEE ALL GAMES </Button>
                </Grid>
            </Container>
        </div >
    );
}

export default Home;
