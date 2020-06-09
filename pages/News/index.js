import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layouts/index.js'
import Link from 'next/link'
import { withTranslation, i18n } from '../../i18n'
import { makeStyles, Container, Typography, Grid, Box, Hidden, Breadcrumbs, Divider } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import { getList } from 'service/news'
import { parseTime } from 'utils/format.js'
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
        margin: '0 0 30px 0'
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
        margin: '50px 0 20px 0',

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
        color: theme.palette.text.primary,
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
        color: '#7c7c7c',
        height: '80px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '100%',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': 3,
        marginBottom: '10px'
    },
    titleColor: {
        color: "#000",
        fontWeight: "bold"
    },
    box: {
        minHeight: '500px',
        width: '100%'
    },
    headSlide: {
        background: "url('images/accounts/bg1.jpg') no-repeat",
        width: '100%',
        height: '390px'
    },
    title: {
        color: 'white',
        fontSize: "26px",
        padding: '240px 0 0 0',
        fontWeight: 'bold',
        fontSize: '34px'
    }
})
)
function NewList(props) {
    const classes = useStyles()
    const { t } = props
    const [infoItem, setInfoItem] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const user = useSelector(state => state.app)
    const getInfo = async (current) => {
        const data = {
            "language": i18n.language,
            "platformId": 3,
            "label": 1,
            "size": 10,
            "current": current
        }
        const res = await getList(data)
        setInfoItem([])
        setCurrent(1)
        setTotal(0)
        if (res.code == 0) {
            setInfoItem(res.data.records)
            setCurrent(res.data.current)
            setTotal(Math.ceil(res.data.total / 10))
        }
    }
    useEffect(() => {
        getInfo(current)
    }, [i18n.language])
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
            <div className={classes.headSlide}>
                <Container><div className={classes.title}> {t('news')}</div></Container>
            </div>
            <Container>
                <Box pt={10}>
                    {/* <span className={classes.headingBlock}>{t('news')}</span> */}
                    <span className={classes.line}></span>
                </Box>
                <div className={`${classes.gameList} ${classes.box}`}>
                    {
                        infoItem.length > 0 && infoItem.map(item => (
                            <React.Fragment key={item.id}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                        <Link href="/NewsDetail/[id]" as={`/NewsDetail/${item.id}`} ><img className={classes.img} alt="complex" src={item.imgUrl} /></Link>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} container justify="space-between" direction="column">
                                        <Link href="/NewsDetail/[id]" as={`/NewsDetail/${item.id}`}><a className={classes.titleColor}>{item.title}</a></Link>
                                        <Link href="/NewsDetail/[id]" as={`/NewsDetail/${item.id}`}><a className={classes.linkColor}>{item.content}</a></Link>
                                        <Box fontSize="14px" lineHeight="1.7" color="#7c7c7c">{t('publicBy')}：{parseTime(item.createTime, '{y}-{m}-{d}')}</Box>
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


NewList.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('news')(NewList);