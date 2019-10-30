import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Slider from "react-slick";
import { useTranslation } from 'react-i18next';
import { gameList } from 'service/gameList'

import { useSelector } from 'react-redux'
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden, Breadcrumbs, Link, Divider, ButtonBase } from '@material-ui/core'
import banner1 from 'assets/imgs/gamelist/banner1.jpg'

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
        color: 'rgb(244, 66, 66)',
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
        borderRadius: '30px'
    }
})
)
function GameList() {
    const classes = useStyles()
    const { t } = useTranslation(['gameList']);
    const [list, setList] = useState([])
    const language = useSelector(state => state.app)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const getList = async (language) => {
        const res = await gameList(language)
        if (res.status === 200) {
            setList(res.data)
        }
    }
    useEffect(() => {
        if (language) {
            getList(language.lang)
        }
    }, [language])
    return (
        <div>
            <Hidden smDown>
                <Box bgcolor="background.light" height="60px">
                    <Container className={classes.navBar}>
                        <Grid justify="space-between" container alignItems="center">
                            <Typography className={classes.logo}>ULU GAMES</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to="/" component={RouterLink} className={classes.breadcrumbs}>Home </Link>
                                <Typography color="textPrimary" className={classes.breadcrumbs}> Games</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Container>
                </Box>
            </Hidden>
            <Container>
                <Grid container direction="column">
                    <Box fontSize={44} align="center" fontWeight={500} pt={10} pb={4}> THE <span className={classes.gameDesc}>BEST MOBILE GAMES</span> ARE HERE! </Box>
                    <Box align="center" color="text.secondary" pb={6} fontSize={24}>
                        ULU GAMES Globally Published Games
                    </Box>
                </Grid>
                <div className={classes.slideWrap}>
                    <Slider {...settings} className={classes.box}>
                        <div>
                            <Grid container alignItems="center" justify="center" >
                                <img src={banner1} alt="banner1" className={classes.pic} />
                            </Grid>
                        </div>
                        <div>
                            <Grid container alignItems="center" justify="center" >
                                <img src={banner1} alt="banner1" className={classes.pic} />
                            </Grid>
                        </div>
                    </Slider>
                </div>
                <Box pt={7}>
                    <span className={classes.headingBlock}>{t('game')}</span>
                    <span className={classes.line}></span>
                </Box>
                <div className={classes.gameList}>
                    {
                        list.map(item => (
                            <React.Fragment key={item.id}>
                                <Grid container spacing={2} alignItems="center" >
                                    <Grid item>
                                        <ButtonBase component={RouterLink} to={`/detail/${item.id}`}>
                                            <img className={classes.img} alt="complex" src={item.gameImg} />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={1} justify="space-around">
                                            <Box fontSize="18px" className={classes.textInfo} pb={1}>{item.gameName}</Box>
                                            {
                                                item.gameDetails.map(value => (
                                                    <React.Fragment key={value.type}>
                                                        {
                                                            value.type === '1' && <Typography variant="body2" color="textSecondary">{value.gameDescription}</Typography>
                                                        }
                                                        {
                                                            value.type === '2' && <Box fontSize="14px" lineHeight="1.7"> {value.gameDescription} </Box>
                                                        }

                                                    </React.Fragment>
                                                ))
                                            }
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" size="small" component={RouterLink} to={`/detail/${item.id}`}>
                                                {t('moreDetail')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                            </React.Fragment>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
export default GameList