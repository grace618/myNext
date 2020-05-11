import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden, Breadcrumbs, Divider } from '@material-ui/core'

import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import Link from 'next/link'
import ImageZoom from 'react-medium-image-zoom'
import { withTranslation } from '../../i18n'
import Layout from '../../components/Layouts/index.js'
import Router from 'next/router'



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
const ButtonLink = ({ className, href, hrefAs, children }) => (
    <Link href={href} as={hrefAs}>
        <a className={className}>
            {children}
        </a>
    </Link>
)

function Detail(props) {
    const classes = useStyles()
    let id = Router.router.query.id
    let { t } = props
    const [detail, setDetail] = useState({ gameBaseInfoList: [], recommendList: [], downloadUrlList: [] })
    const [snapshotImg, setSnapshotImg] = useState([])
    const [video, setVideo] = useState([])
    const [carousel, setCarousel] = useState([])
    const language = useSelector(state => state.app)

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
        <Layout>
            <Hidden smDown>
                <Box bgcolor="background.light" height="60px">
                    <Container className={classes.navBar}>
                        <Grid justify="space-between" container alignItems="center">
                            <Typography className={classes.logo}>ULU GAMES</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" href="/" component={ButtonLink} className={classes.breadcrumbs}>{t('home')}</Link>
                                <Link color="inherit" href="/gameslist" component={ButtonLink} className={classes.breadcrumbs}>{t('game')}</Link>
                                <Typography color="textPrimary" className={classes.breadcrumbs}>{detail.gameName}</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Container>
                </Box>
            </Hidden>
            <Container>
                <Grid container alignItems="center" className={classes.gameTitle}>
                    <div>
                        <Typography gutterBottom variant="h5" color="textPrimary">万灵齐聚共赴大荒 《山海镜花》全平台公测今日启程</Typography>
                        <Divider />
                        <Typography gutterBottom color="textSecondary">类别： 平台新闻发表于2020-04-29 12:49:25</Typography>
                    </div>
                </Grid>

                <Grid container justify="space-between" className={classes.space}>
                    {/* spacing={spacing}  */}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.rightPanel}>
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
                    </Grid>
                </Grid>


            </Container>
        </Layout >
    );
}
Detail.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('gameDetail')(Detail);