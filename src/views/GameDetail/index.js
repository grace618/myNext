import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden, Breadcrumbs, Link, Divider } from '@material-ui/core'
import Slider from "react-slick";
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next';
import ImageZoom from 'react-medium-image-zoom'
// import {
//     TwitterShareButton,
//     FacebookShareButton,
// } from 'react-share';
import { ReactComponent as DateIcon } from 'icons/svg/date.svg'
import { ReactComponent as LightIcon } from 'icons/svg/light.svg'
import { ReactComponent as UserIcon } from 'icons/svg/user.svg'
import { ReactComponent as Facebook } from 'icons/svg/facebook.svg'
import { ReactComponent as Twitter } from 'icons/svg/twitter.svg'
import { ReactComponent as Youtube } from 'icons/svg/youtube.svg'
import { ReactComponent as IOS } from 'icons/svg/IOS.svg'
import { ReactComponent as Android } from 'icons/svg/andriod.svg'
import { ReactComponent as Twitch } from 'icons/svg/twitch.svg'


import { getGameDetail } from 'service/gameDetail'
import { parseTime } from 'utils/format.js'
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
        marginBottom: theme.spacing(5),
    },
    slideImg: {
        '& img': {
            width: '100%',
            padding: '3%',
            boxSizing: 'border-box'
        }
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
    },
    img: {
        width: 128,
        height: 128,
        borderRadius: '30px'
    },

}))
const gameType = [
    'MMORPG',
    'SLG',
    'MOBA',
    'SRPG',
    'Card',
    'RTS',
    'Action',
    'Adventure',
    'Fighting',
    'Shooting',
    'FPS',
    'Simulation',
    'Puzzle',
    'Racing',
    'Sports',
    'TableGame',
    'Music',
    'LoveGame',
    'Education',
    'TowerDefense',
    'IdleGame',
    'CasualGame'
]
function Detail(props) {
    const classes = useStyles()
    const { t } = useTranslation(['gameDetail'])
    const { match: { params: { id } } } = props;
    const [detail, setDetail] = useState({ gameBaseInfoList: [], recommendList: [], downloadUrlList: [] })
    const [snapshotImg, setSnapshotImg] = useState([])
    const [video, setVideo] = useState([])
    const [carousel, setCarousel] = useState([])
    const language = useSelector(state => state.app)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: false,
        autoplay: true,
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
    const getDetail = async (id, lang) => {
        const res = await getGameDetail(id, lang)
        if (res.status === 200) {
            setDetail(res.data)
            let snapshotImg = [], video = [], carousel = []
            res.data.snapshotUrlList.map(item => {
                if (item.type === '1') {
                    snapshotImg.push(item.snapshotUrl)
                }
                if (item.type === '3') {
                    if (item.snapshotUrl && item.snapshotUrl != '') {
                        video.push(item.snapshotUrl)
                    }
                }
                if (item.type === '2') {
                    carousel.push(item.snapshotUrl)
                }
                return null
            })
            setSnapshotImg(snapshotImg)
            setVideo(video)
            setCarousel(carousel)
        }
    }
    useEffect(() => {
        if (language) {
            getDetail(id, language.lang)
        }
    }, [language, id])
    return (
        <div>
            <Hidden smDown>
                <Box bgcolor="background.light" height="60px">
                    <Container className={classes.navBar}>
                        <Grid justify="space-between" container alignItems="center">
                            <Typography className={classes.logo}>ULU GAMES</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to="/" component={RouterLink} className={classes.breadcrumbs}>{t('home')} </Link>
                                <Link color="inherit" to="/gameslist" component={RouterLink} className={classes.breadcrumbs}> {t('game')}</Link>
                                <Typography color="textPrimary" className={classes.breadcrumbs}>{detail.gameName}</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Container>
                </Box>
            </Hidden>
            <Container>
                <Grid container alignItems="center" className={classes.gameTitle}>
                    <Box mr={3} mb={1}>
                        <img src={detail.gameImg} alt="" className={classes.img} />
                    </Box>
                    <div>
                        <Typography gutterBottom variant="h5" color="textPrimary">{detail.gameName}</Typography>
                        {
                            detail.gameBaseInfoList.map(value => (
                                value.type === '1' && <Typography color="textSecondary" key={value.type}>{value.gameDescription}</Typography>
                            ))
                        }
                    </div>
                </Grid>
                <Divider />
                <Grid container justify="space-between" className={classes.space}>
                    {/* spacing={spacing}  */}
                    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                        {
                            snapshotImg.map(item => (
                                <img src={item} alt="" width="100%" className={classes.source} key={item} />
                            ))
                        }
                        {
                            video.length > 0 && video.map(item => (
                                <ReactPlayer url={item} width="100%" className={classes.source} key={item} />
                            ))
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.rightPanel}>
                        <Box color="text.secondary" mb={3}>
                            {
                                detail.gameBaseInfoList.map(value => (
                                    <React.Fragment key={value.type}>
                                        {/* {value.type === '2' && <Typography color="textSecondary" key={value.type}>{value.gameDescription}</Typography>} */}
                                        {value.type === '3' && <div className={classes.m} dangerouslySetInnerHTML={{ __html: value.gameDescription }}
                                        />}
                                    </React.Fragment>
                                ))
                            }
                        </Box>
                        <Divider />
                        <Grid className={classes.infoPanel} container direction="column">
                            <Grid container item>
                                <Box className={classes.textInfo} width="150px"> <UserIcon /> {t('developer')}: </Box>
                                {detail.developer}
                            </Grid>
                            <Grid container item >
                                <Box className={classes.textInfo} width="150px"> <DateIcon /><span> {t('release')}:</span>  </Box>
                                {parseTime(detail.onlineTime, '{y}-{m}')}
                            </Grid>
                            <Grid container item>
                                <Box className={classes.textInfo} width="150px">  <LightIcon /><span> {t('genre')}:</span>  </Box>
                                {t(gameType[detail.gameType])}
                            </Grid>
                        </Grid>
                        <Divider />
                        {
                            detail.downloadUrlList.length > 0 && (
                                <Grid className={classes.infoPanel} container direction="column">
                                    <div className={classes.textInfo} >{t('download')}</div>
                                    {
                                        detail.downloadUrlList.map(item => (
                                            <React.Fragment key={item.type}>
                                                {item.type === '2' &&
                                                    <Button variant="contained" color="secondary" size="large" className={classes.downloadiOS} href={item.downloadUrl} target="_blank">
                                                        <IOS className={classes.icon} />
                                                        APP STORE
                                            </Button>
                                                }
                                                {
                                                    item.type === '1' &&
                                                    <Button variant="contained" color="primary" size="large" className={classes.downloadGoogleplay} href={item.downloadUrl} target="_blank">
                                                        <Android className={classes.icon} />
                                                        GOOGLE PLAY
                                            </Button>
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </Grid>)
                        }
                        <Divider />
                        <Grid className={classes.infoPanel} container direction="column">
                            <div className={classes.textInfo} >{t('follow')}</div>
                            {
                                detail.fbCommunityUrl && (
                                    <Button variant="contained" color="secondary" size="medium" className={classes.facebook} href={detail.fbCommunityUrl} target="_blank">
                                        <Facebook className={classes.icon} />
                                        ULUGAMES FACEBOOK
                                    </Button>
                                )
                            }
                            {
                                detail.twitterCommunityUrl && (
                                    <Button variant="contained" color="secondary" size="medium" className={classes.twitter} href={detail.twitterCommunityUrl} target="_blank">
                                        <Twitter className={classes.icon} />
                                        ULUGAMES TWITTER
                                    </Button>
                                )
                            }
                            {
                                detail.youtubeCommunityUrl && (
                                    <Button variant="contained" color="primary" size="medium" className={classes.youtube} href={detail.youtubeCommunityUrl} target="_blank">
                                        <Youtube className={classes.icon} />
                                        ULUGAMES YOUTUBE
                                    </Button>)
                            }
                            {/* <Button variant="contained" color="secondary" size="medium" className={classes.wechat} href={detail.wechatCommunityUrl} target="_blank">
                                <Wechat className={classes.icon} />
                                ULUGAMES WECHAT
                            </Button> */}
                        </Grid>
                        <Divider />
                        <Grid className={classes.infoPanel} container>
                            <Box fontSize="20px" className={classes.textInfo}>
                                <Grid container alignItems="center" justify="space-between">
                                    <Box mr={2}>
                                        <Youtube className={classes.youtube2} /> YouTube
                                    </Box>
                                    <div>
                                        <Twitch /> Twitch Copyright（Free）
                                    </div>
                                </Grid>
                            </Box>
                            <Typography>
                                {t('textInfo')}
                            </Typography>
                        </Grid>
                        {/* <Divider /> */}
                        {/* <Grid justify="space-between" container alignItems="center" >
                            <Typography>Share:</Typography>
                            <Box p={2}>
                                <Grid container >
                                    {
                                        detail.fbShareUrl && <FacebookShareButton
                                            url={detail.fbShareUrl}
                                            quote={detail.fbShareTitle}
                                            className={classes.share}
                                        >
                                            <Facebook />
                                        </FacebookShareButton>
                                    }
                                    {
                                        detail.twitterShareUrl && <TwitterShareButton
                                            url={detail.twitterShareUrl}
                                            quote={detail.twitterShareTitle}
                                            className={classes.share}
                                        >
                                            <Twitter />
                                        </TwitterShareButton>
                                    }
                                </Grid>
                            </Box>
                        </Grid> */}
                        {/* <Divider /> */}
                    </Grid>
                </Grid>
                <Box pt={2} pb={2} fontSize="20px" className={classes.textInfo}>{t('screenshots')}</Box>
                <div className={classes.slideWrap}>
                    <Slider {...settings} className={classes.box}>
                        {/* <Skeleton variant="rect" width={210} height={118} /> */}
                        {
                            carousel.map(item => (
                                <div key={item} className={classes.slideImg}>
                                    <ImageZoom
                                        image={{ src: item, alt: '', }}
                                        zoomImage={{ src: item, alt: '' }}
                                    />
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                <Divider />
                <Box pt={3} pb={4} fontSize="20px" className={classes.textInfo}>{t('recommended')}</Box>
                <Grid justify="space-between" container>
                    {
                        detail.recommendList.map(item => (
                            <Grid container item xs={12} sm={12} md={12} lg={6} xl={6} key={item.id} >
                                <Grid xs={12} sm={12} md={3} lg={3} xl={3} item container justify="center">
                                    <RouterLink to={`/detail/${item.id}`}>
                                        <img src={item.gameImg} alt="" className={classes.thumbnail} />
                                    </RouterLink>
                                </Grid>
                                <Grid xs={12} sm={12} md={8} lg={8} xl={8} item>
                                    <Grid item justify="space-between" container>
                                        <div>
                                            <Box fontSize="18px" className={classes.textInfo}>{item.gameName}</Box>
                                            {
                                                item.gameDetails.map(value => (
                                                    value.type === '1' && <Typography variant="body2" color="textSecondary" key={value.type}>{value.gameDescription}</Typography>
                                                ))
                                            }
                                        </div>
                                        <Hidden smDown>
                                            <Button variant="contained" color="primary" size="small" className={classes.moreDetail} component={RouterLink} to={`/detail/${item.id}`}>
                                                {t('moreDetail')}
                                            </Button>
                                        </Hidden>
                                    </Grid>
                                    <Grid>
                                        <Box fontSize="14px" pt={2} lineHeight="1.7" pb={2}>
                                            {
                                                item.gameDetails.map(value => (
                                                    value.type === '2' && <Typography variant="body2" color="textSecondary" key={value.type}>{value.gameDescription}</Typography>
                                                ))
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid alignItems="center" container justify="center" className={classes.space}>
                    <Button variant="contained" color="primary" size="large" component={RouterLink} to="/gameslist">{t('seeMore')} </Button>
                </Grid>
            </Container>
        </div >
    );
}

export default Detail;
