
import PropTypes from 'prop-types'
import Layout from '../../components/Layouts/index.js'
import Link from 'next/link'
import Slider from "react-slick";
import { useSelector } from 'react-redux'
import { withTranslation } from '../../i18n'
import { useGameList } from 'common/CustomHooks';
import { makeStyles, Container, Typography, Grid, Button, Box, Hidden, Breadcrumbs, Divider, ButtonBase } from '@material-ui/core'


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
        width: 188,
        height: 145,
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
    linkColor: {
        color: '#7c7c7c'
    },
    titleColor: {
        color: "#000",
        fontWeight: "bold"
    }
})
)
const ButtonLink = ({ className, href, hrefAs, children }) => (
    <Link href={href} as={hrefAs}>
        <a className={className}>
            {children}
        </a>
    </Link>
)

function GameList(props) {
    const classes = useStyles()
    const { t } = props
    const language = useSelector(state => state.app)
    const gameItem = useGameList(language.lang)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
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
                <Box pt={7}>
                    <span className={classes.headingBlock}>资讯</span>
                    <span className={classes.line}></span>
                </Box>
                <div className={classes.gameList}>
                    {
                        gameItem.map(item => (
                            <React.Fragment key={item.id}>
                                <Grid container spacing={2} alignItems="center" >
                                    <Grid item>
                                        <Link component={ButtonLink} href="/GameDetail/[id]" as={`/GameDetail/${item.id}`} ><img className={classes.img} alt="complex" src={item.gameImg} /></Link>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={8} xl={8} sm container justify="space-between" direction="column">
                                        <Box fontSize="16px" pb={1}><Link href="/NewsDetail/[id]" as={`/NewsDetail/${item.id}`}><a className={classes.titleColor}>萨顶顶倾力献唱《山海镜花》公测倒计时2天</a></Link></Box>
                                        <Box fontSize="14px" lineHeight="1.7" pb={3}> <Link href="/NewsDetail/[id]" as={`/NewsDetail/${item.id}`}><a className={classes.linkColor}>《山海镜花》即将于4月29日正式开启全平台公测，距离大荒之旅正式启程还有2天！今日，本作公式公布了双版本主题曲预告，国际音乐人萨顶顶重磅加盟，倾情献唱山盟版主题曲《星辰守候》，用音乐讲述山海故事，溯源...</a></Link>  </Box>
                                        <Box fontSize="14px" lineHeight="1.7" color="#7c7c7c">发布于：2020-04-29 12:49:25</Box>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                            </React.Fragment>
                        ))
                    }
                </div>
            </Container>
        </Layout>
    )
}


GameList.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('gameList')(GameList);