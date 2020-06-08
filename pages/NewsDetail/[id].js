import React from 'react';
import { makeStyles, Container, Typography, Grid, Box, Hidden, Breadcrumbs, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withTranslation, i18n } from '../../i18n'
import Layout from 'components/Layouts/index.js'
import { newsDetail } from 'service/news'
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
        padding: '90px 0 30px 0',
        width: '100%'
    },
    divider: {
        color: theme.palette.primary.main
    },
    space: {
        padding: '30px 0',
        color: 'rgb(100, 101, 105)'
    },
    m: {
        margin: '36px 0',
        lineHeight: 1.8
    },
    content: {
        minHeight: "700px"
    },
    divider: {
        width: '100%',
        margin: '5px 0'
    }
}))


export async function getServerSideProps(context) {
    let list = {}
    const data = {
        "language": context.req.language,
        "platformId": 3,
        "id": context.query.id,
        "groupId": 1
    }
    const res = await newsDetail(data)
    if (res.code === 0) {
        list = res.data
    }
    return {
        props: {
            "detail": list
        }
    }
}

function NewDetail(props) {
    const classes = useStyles()
    let { t, detail } = props
    return (
        <Layout>
            <Hidden smDown>
                <Box bgcolor="background.light" height="60px">
                    <Container className={classes.navBar}>
                        <Grid justify="space-between" container alignItems="center">
                            <Typography className={classes.logo}>ULU GAMES</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link href="/" ><a className={classes.breadcrumbs}>{t('home')}</a></Link>
                                <Link href="/gameslist"><a className={classes.breadcrumbs}>{t('game')}</a></Link>
                            </Breadcrumbs>
                        </Grid>
                    </Container>
                </Box>
            </Hidden>
            <Container className={classes.content}>
                <Grid container alignItems="center" className={classes.gameTitle} direction="column">
                    <Typography gutterBottom variant="h5" color="textPrimary">{detail.title}</Typography>
                    <Divider className={classes.divider} />
                    <Typography gutterBottom color="textSecondary">{t('publicBy')}：{parseTime(detail.createTime, '{y}-{m}-{d}')}</Typography>
                </Grid>
                <div className={classes.space} dangerouslySetInnerHTML={{ __html: detail.content }}></div>
            </Container>
        </Layout >
    );
}
NewDetail.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('newsDetail')(NewDetail);