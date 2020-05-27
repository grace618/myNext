
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layouts/index.js'
import Link from 'next/link'
import Slider from "react-slick";
import { withTranslation } from '../../i18n'
import { gameList } from 'service/gameList'
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden, Breadcrumbs, Divider } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux'
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
    line: {
        backgroundColor: 'rgb(68, 68, 68)',
        width: theme.spacing(5),
        height: 2,
        display: 'block',
        margin: '40px 0 30px 0'
    },
    thumbnail: {
        marginBottom: theme.spacing(3),
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
    textInfo: {
        color: theme.palette.text.primary,
        fontWeight: "500"
    },
    divider: {
        margin: '25px 0'
    },
    gameList: {
        margin: '50px 0 110px 0'
    },
    gameDesc: {
        fontSize: 44,
        fontFamily: "Arial",
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    headingBlock: {
        fontSize: 26,
        fontFamily: "Arial",
        color: theme.palette.text.primary
    },
    img: {
        width: 128,
        height: 128,
        borderRadius: '30px',
        cursor: 'pointer'
    },
    pic: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '2%',
    },
    slideWrap: {
        width: '100%',
    },
})
)
const ButtonLink = React.forwardRef(({ className, href, hrefAs, children }, ref) => (
    <Link href={href} as={hrefAs} ref={ref}>
        <a className={className}>
            {children}
        </a>
    </Link>
));


function GameList(props) {
    const classes = useStyles()
    const { t } = props
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    }
    const [gameItem, setGameItem] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const language = useSelector(state => state.app)
    const getInfo = async (current) => {
        const data = {
            "language": language.lang,
            "platformId": 3,
            "size": 12,
            "current": current,
        }
        const res = await gameList(data)
        setGameItem([])
        setCurrent(1)
        setTotal(0)
        if (res.code == 0) {
            setGameItem(res.data.records)
            setCurrent(res.data.current)
            setTotal(Math.ceil(res.data.total / 10))
            window.scrollTo(0, 600);
        }
    }
    useEffect(() => {
        getInfo(current)
    }, [language])
    const handleChange = (event, val) => {
        getInfo(val)
    }
    return (
        <Layout>
            <Hidden smDown>
                <Box bgcolor="background.light" height="60px">
                    <Container className={classes.navBar}>
                        <Grid justify="space-between" container alignItems="center">
                            <Typography className={classes.logo}>ULU GAMES</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link href="/"><a className={classes.breadcrumbs}>{t('Home')}</a></Link>
                                <Typography color="textPrimary" className={classes.breadcrumbs}> {t('Games')}</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Container>
                </Box>
            </Hidden>
            <Container>
                <Grid container direction="column">
                    {/* <span className={classes.gameDesc}>BEST MOBILE GAMES</span> */}
                    <Box fontSize={44} align="center" fontWeight={500} pt={10} pb={4}> {t('headerTitle')} </Box>
                    <Box align="center" color="text.secondary" pb={6} fontSize={24}>
                        {t('headerSmallTitle')}
                    </Box>
                </Grid>
                <div className={classes.slideWrap}>
                    <Slider {...settings}>
                        <Grid container alignItems="center" justify="center" >
                            <img src='Images/gamelist/banner7.jpg' alt="banner1" className={classes.pic} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                            <img src='Images/gamelist/banner.jpg' alt="banner1" className={classes.pic} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                            <img src='Images/gamelist/banner1.jpg' alt="banner1" className={classes.pic} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                            <img src='Images/gamelist/banner2.jpg' alt="banner1" className={classes.pic} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                            <img src='Images/gamelist/banner3.jpg' alt="banner1" className={classes.pic} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                            <img src='Images/gamelist/banner4.jpg' alt="banner1" className={classes.pic} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                            <img src='Images/gamelist/banner5.jpg' alt="banner1" className={classes.pic} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                            <img src='Images/gamelist/banner6.jpg' alt="banner1" className={classes.pic} />
                        </Grid>
                    </Slider>
                </div>
                <Box pt={7}>
                    <span className={classes.headingBlock}>{t('game')}</span>
                    <span className={classes.line}></span>
                </Box>
                <div className={classes.gameList}>
                    {
                        gameItem.length > 0 && gameItem.map(item => (
                            <React.Fragment key={item.id}>
                                <Grid container spacing={2} alignItems="center" >
                                    <Grid item>
                                        <Link href="/GameDetail/[id]" as={`/GameDetail/${item.id}`} ><img className={classes.img} alt="complex" src={item.gameImg} /></Link>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={1} justify="space-around">
                                            <Box fontSize="18px" className={classes.textInfo} pb={1}>{item.gameName}</Box>
                                            <Typography variant="body2" color="textSecondary">{item.simpleDescription}</Typography>
                                            <Box fontSize="14px" lineHeight="1.7"> {item.shortDescription} </Box>
                                        </Grid>
                                        <Grid item>
                                            <Button component={ButtonLink} href="/GameDetail/[id]" hrefAs={`/GameDetail/${item.id}`} variant="contained" color="primary" size="small"> {t('moreDetail')}</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                            </React.Fragment>
                        ))
                    }
                </div>
                <Grid container justify="center" className={classes.gameList}><Pagination count={total} onChange={handleChange} page={current} color="primary" variant="outlined" /></Grid>
            </Container>
        </Layout>
    )
}


GameList.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('gameList')(GameList);