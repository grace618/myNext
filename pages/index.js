import Layout from '../components/Layouts/index.js'
import React from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { makeStyles, Container, Typography, Grid, Button, Box } from '@material-ui/core'
import Slider from "react-slick";
import getLanguage from 'utils/i18n'
import { withTranslation } from '../i18n'
import { useGameList } from 'common/CustomHooks';
// import './index.css'


const useStyles = makeStyles(theme => ({
    header: {
        width: '100%',
        height: 889,
        position: 'absolute'
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
        '& > *': {
            boxSizing: 'border-box',

        },
    },
    news_detail: {
        borderLeft: "4px solid #fe9a45",
        height: 245,
        background: "#ffffff",
        padding: "30px 30px 25px",
        position: 'relative'
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
        marginTop: '-42px'
    },
    news_center: {
        margin: "0 10px",
        borderLeft: "4px solid #fe9a45",
        boxSizing: 'border-box'
    }

}))


const ButtonLink = ({ className, href, hrefAs, children }) => (
    <Link href={href} as={hrefAs}>
        <a className={className}>
            {children}
        </a>
    </Link>
)
function Home(props) {
    const classes = useStyles()
    const { t } = props
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
    const language = useSelector(state => state.app)
    const gameItem = useGameList(language.lang)
    return (
        <Layout>

            {/* slide head img */}
            <div className={classes.headerBox}>
                <div className={classes.headerWrap}>
                    <Slider {...settings1}>
                        <Grid container alignItems="center" justify="center" >
                            <img src="Images/headerBg.jpg" alt="banner1" className={classes.pic} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                            <img src="Images/headerBg3.jpg" alt="banner1" className={classes.pic} />
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
                        <Grid item className={classes.left} xs={12} sm={12} md={12} lg={6} xl={6}>
                            <img src='Images/person.png' alt="role" className={classes.role} />
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
                                gameItem && gameItem.map(item => (
                                    <Grid container alignItems="center" direction="column" justify="space-around" key={item.id} className={classes.slideImg}>
                                        <Link href="/GameDetail/[id]" as={`/GameDetail/${item.id}`}>
                                            <img src={item.gameImg} alt="" />
                                        </Link>

                                        <Typography className={classes.gName} align="center">{item.gameName}</Typography>
                                        {
                                            item.gameDetails.length > 0 && item.gameDetails.map(value => (
                                                value.type === '1' && <Typography className={classes.slogan} key={value.type} align="center"> {value.gameDescription} </Typography>
                                            ))
                                        }
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
                        <Grid container justify="space-between" className={classes.paper}>
                            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                <div className={classes.news_detail}>
                                    <p className={classes.news_tit_s}>萨顶顶倾力献唱《山海镜花》公测倒计时2天</p>
                                    <p className={classes.news_txt}> 《山海镜花》即将于4月29日正式开启全平台公测，距离大荒之旅正式启程还有2天！今日，本作公式公布了双版本主题曲预告，国际...</p>
                                    <p className={classes.news_time}> 04/28 2020</p>
                                </div>
                                <img src="Images/i1.png" alt="" />
                            </Grid>
                            <Grid item container direction="column" justify="center" xs={12} sm={12} md={12} lg={4} xl={4} className={classes.center}>
                                <img src="Images/i2.png" alt="" className={classes.news_center} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                <img src="Images/i1.png" alt="" />
                                <div className={classes.news_detail}>
                                    <p className={classes.news_tit_s}>萨顶顶倾力献唱《山海镜花》公测倒计时2天</p>
                                    <p className={classes.news_txt}> 《山海镜花》即将于4月29日正式开启全平台公测，距离大荒之旅正式启程还有2天！今日，本作公式公布了双版本主题曲预告，国际...</p>
                                    <p className={classes.news_time}> 04/28 2020</p>
                                </div>
                            </Grid>
                        </Grid>
                        <Box textAlign="center" pb={8}><Button component={ButtonLink} href={'/news'} variant="outlined" size="large">查看更多</Button></Box>
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