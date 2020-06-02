
import React from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link'
import Slider from "react-slick";
import Layout from '../components/Layouts/index.js'
import { gameList } from 'service/gameList'
import { getList } from 'service/news'
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden } from '@material-ui/core'
import { withTranslation } from '../i18n'
import { parseTime } from 'utils/format.js'
import './index.module.css'
import { useRouter } from 'next/router'
const useStyles = makeStyles(theme => ({
    header: {
        width: '100%',
        position: 'absolute',
        top: '10%'
    },
    headerWrap: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    headerBox: {
        width: '100%',
        height: 889,
        position: 'relative',
        marginTop: '60px',
        [theme.breakpoints.down('sm')]: {
            height: 667
        },
    },
    ImgBox: {
        height: '100%'
    },

    container: {
        height: '100%'
    },
    publishBtn: {
        height: '100%'
    },
    panelContainer: {
        padding: '5% 0',
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
        fontWeight: 'lighter',
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
        margin: '40px auto 30px auto',
        textAlign: 'center'
    },
    more: {
        background: 'white'
    },
    slide: {
        margin: '70px auto 80px auto',
    },
    slogan: {
        fontSize: 16,
        color: theme.palette.text.light,
    },
    slideWrap: {
        width: '100%',
        margin: '20px auto'
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
        margin: '11% 0 0 0',
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
    left: {
        textAlign: 'center'
    },
    slideImg: {
        '& img': {
            width: '277px',
            height: '277px',
            margin: '0 auto'
        }
    },
    c: {
        color: '#1f1313'
    },
    pic: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
    },
    paper: {
        margin: '100px 0 50px 0',
        height: '630px',
        '& > *': {
            marginBottom: '67px',
            boxSizing: 'border-box',

        },
    },
    news_detail: {
        borderLeft: "4px solid #fe9a45",
        height: 271,
        background: "#ffffff",
        padding: "30px 30px 25px",
        position: 'relative',

    },
    news_tit_s: {
        fontSize: 16,
        color: "#0f192a",
        fontWeight: 'bold',
        lineheight: 26
    },
    news_txt: {
        height: '105px',
        paddingTop: '16px',
        fontSize: 14,
        color: "#747474"
    },
    news_time: {
        fontSize: 12,
        bottom: '20px',
        color: "#747474"
    },
    center: {
        position: 'relative',
        color: 'white',

    },
    news_center: {
        margin: "-42px 10px 0 10px",
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        left: 0,
        borderLeft: "4px solid #fe9a45",
    },
    center_text: {
        zIndex: 2,
        position: 'absolute',
        bottom: 78,
        left: 34
    },
    center_time: {
        position: 'absolute',
        zIndex: '2',
        bottom: 28,
        left: 34,
        fontSize: '12px'
    }
}))

const ButtonLink = React.forwardRef(({ className, href, hrefAs, children }, ref) => (
    <Link href={href} as={hrefAs} ref={ref}>
        <a className={className}>
            {children}
        </a>
    </Link>
));

export async function getServerSideProps(context) {
    let list = []
    const data = {
        "language": context.req.language,
        "platformId": 3,
        "size": 12,
        "current": 1,
    }
    const res = await gameList(data)
    if (res.code == 0) {
        list = res.data.records
    }

    let newList = []
    const item = {
        "language": context.req.language,
        "platformId": 3,
        "label": 1,
        "size": 12,
        "current": 1
    }
    const response = await getList(item)
    if (response.code == 0) {
        newList = response.data.records
    }
    return {
        props: {
            "gameItem": list,
            'newList': newList
        }
    }
}

function Home(props) {
    const classes = useStyles()
    const { t, gameItem, newList } = props
    const router = useRouter();
    const toDetail = (e, id) => {
        router.push(`/NewsDetail/${id}`)
    }
    const settings1 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    }
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
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
        <Layout>
            {/* slide head img */}
            <div className={classes.headerBox}>
                <div className={classes.headerWrap}>
                    <Slider {...settings1} className={classes.h}>
                        <Grid container alignItems="center" justify="center">
                            <Hidden mdUp>
                                <img src="Images/mHeader.jpg" alt="banner1" className={classes.pic} />
                            </Hidden>
                            <Hidden only={['sm', 'xs']}>
                                <img src="Images/headerBg.jpg" alt="banner1" className={classes.pic} />
                            </Hidden>

                        </Grid>
                        <Grid container alignItems="center" justify="center" className={classes.ImgBox}>
                            <Hidden mdUp>
                                <img src="Images/mHeader2.jpg" alt="banner1" className={classes.pic} />
                            </Hidden>
                            <Hidden only={['sm', 'xs']}>
                                <img src="Images/headerBg3.jpg" alt="banner1" className={classes.pic} />
                            </Hidden>
                        </Grid>
                    </Slider>
                </div>
                <div className={classes.header}>
                    <Container className={classes.container}>
                        <Grid container alignItems="center" direction="column" justify="center" className={classes.publishBtn}>
                            <Typography variant="h4" gutterBottom className="classes.c" align="center">{t('solgan')}</Typography>
                            {/* <Hidden smDown> */}
                            <Typography variant="h6" gutterBottom className="classes.c" align="center">{t('sloganDesc1')}</Typography>
                            <Typography variant="h6" gutterBottom className="classes.c" align="center">{t('sloganDesc2')}</Typography>
                            <Typography variant="h6" gutterBottom className="classes.c" align="center">{t('sloganDesc3')}</Typography>
                            {/* </Hidden> */}
                            <Box mt={8} display={{ xs: 'none', sm: 'block' }}>
                                <Button variant="contained" color="primary" size="large" href="/publishing" component={ButtonLink}>{t('aboutBtn')}</Button>
                            </Box>
                        </Grid>
                    </Container>
                </div>
            </div>
            <Box bgcolor="background.light">
                <Container className={classes.panelContainer}>
                    <Grid container justify="space-between" >
                        <Grid item className={classes.left} xs={12} sm={12} md={6} lg={6} xl={6}>
                            <img src='Images/person.png' alt="role" className={classes.role} />
                        </Grid>
                        <Grid item container direction="column" justify="center" className={classes.right} xs={12} sm={12} md={6} lg={6} xl={6}>
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
                                    <Button component={ButtonLink} href={'/GameList'} variant="outlined" size="large" className={classes.more}>{t('moreBtn')}</Button>
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
                                gameItem.length > 0 && gameItem.map(item => (
                                    <Grid container alignItems="center" direction="column" justify="space-around" key={item.id} className={classes.slideImg}>
                                        <Link href="/GameDetail/[id]" as={`/GameDetail/${item.id}`}>
                                            <img src={item.gameImg} alt="" />
                                        </Link>
                                        <Typography className={classes.gName} align="center">{item.gameName}</Typography>
                                        <Typography className={classes.slogan} align="center"> {item.simpleDescription} </Typography>
                                    </Grid>
                                ))
                            }
                        </Slider>
                    </div>
                    <Button component={ButtonLink} href={'/GameList'} variant="outlined" pt={8}>查看更多</Button>
                </Grid>
            </Container>
            <Box bgcolor="background.light">
                {/* 新闻 */}
                <Container>
                    <Box pt={8} >
                        <Typography gutterBottom align="center">
                            <span className={classes.t4}>新闻公告</span>
                        </Typography>
                        <Typography className={classes.slogan} align="center" > 这里有游戏相关资讯 </Typography>
                        <span className={classes.line}></span>
                        {
                            newList.length > 0 && (
                                <>
                                    <Grid container justify="space-between" className={classes.paper}>
                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} onClick={(e) => toDetail(e, newList[1].id)}>
                                            <div className={classes.news_detail}>
                                                <p className={classes.news_tit_s}>{newList[1].title}</p>
                                                <p className={classes.news_txt}>{newList[1].content}</p>
                                                <p className={classes.news_time}> {parseTime(newList[1].createTime)}</p>
                                            </div>
                                            <img src={newList[1].imgUrl} alt="" />
                                        </Grid>
                                        <Grid item container direction="column" justify="center" xs={12} sm={12} md={4} lg={4} xl={4} className={classes.center} onClick={(e) => toDetail(e, newList[1].id)}>
                                            <img src={newList[0].backgroundImgUrl} alt="" className={classes.news_center} />
                                            <p className={classes.center_text}>{newList[0].title}</p>
                                            <p className={classes.center_time}> {parseTime(newList[0].createTime)}</p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} onClick={(e) => toDetail(e, newList[1].id)}>
                                            <img src={newList[2].imgUrl} alt="" />
                                            <div className={classes.news_detail}>
                                                <p className={classes.news_tit_s}>{newList[2].title}</p>
                                                <p className={classes.news_txt}> {newList[2].content}</p>
                                                <p className={classes.news_time}>  {parseTime(newList[2].createTime)}</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Box textAlign="center" pb={8}><Button component={ButtonLink} href={'/news'} variant="outlined" size="large">查看更多</Button></Box>
                                </>
                            )
                        }
                    </Box>
                </Container>
            </Box>
            <Box pt={8} pb={6}>
                <Container>
                    <Grid container justify="center" direction="column" alignItems="center" className={classes.padding}>
                        <Typography gutterBottom variant="h5" color="textPrimary" align="center">{t('partner')}</Typography>
                        <Typography className={classes.slogan} align="center">{t('create')}</Typography>
                        <Box mt={7}>
                            <Button component={ButtonLink} href={'/publishing'} variant="contained" size="large" color="primary">{t('about')}</Button>
                        </Box>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
}
Home.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('home')(Home);