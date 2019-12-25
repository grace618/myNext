import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Container, Typography, Grid, Box } from '@material-ui/core'
import { ReactComponent as Facebook } from 'icons/svg/facebook.svg'
import { ReactComponent as Twitter } from 'icons/svg/twitter.svg'
import { ReactComponent as Youtube } from 'icons/svg/youtube.svg'
import { ReactComponent as Wechat } from 'icons/svg/wechat.svg'
const useStyles = makeStyles(theme => ({
    ico: {
        marginRight: theme.spacing(6),
        '& svg:hover': {
            '& path': {
                fill: 'orange'
            }
        },
        '& path': {
            fill: '#787676'
        }
    },
    info: {
        margin: '10px 0',
        '& a': {
            color: '#91959A',
            textDecoration: 'none'
        }
    },
    policy: {
        '& a': {
            color: '#91959A',
            textDecoration: 'none'
        }
    }
}))
function Footer() {
    const classes = useStyles()
    return (
        <Box bgcolor="background.default" color="text.light" p={7}>
            <Container>
                <Grid className={classes.tips} container alignItems="center" justify="space-between">
                    <span>健康游戏忠告</span>
                    <span>抵制不良游戏</span>
                    <span>拒绝盗版游戏</span>
                    <span>注意自我保护</span>
                    <span>谨防受骗上当</span>
                    <span>适度游戏益脑</span>
                    <span>沉迷游戏伤身</span>
                    <span>合理安排时间</span>
                    <span>享受健康生活</span>
                </Grid>
                <Grid container alignItems="center" justify="space-between" style={{ margin: '10px 0' }}>
                    {/* left */}
                    <Grid container direction="column" item xs={12} sm={12} md={8} lg={8} xl={8} >
                        <Grid container justify="space-around" alignItems="center" className={classes.info}>
                            <a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备17016575号-2</a>
                            <a href="http://www.beian.miit.gov.cn" target="_blank"> 沪网文{2017}3448-218号</a>
                            <Typography align="center">Copyright © U.LU Games all right reserved.</Typography>
                        </Grid>
                        <Grid container justify="space-around" alignItems="center">
                            <div className={classes.policy}>
                                <a href="http://policy.ulugame.com/policycn.html" target="_blank">用户服务协议  |  </a>
                                <a href="http://policy.ulugame.com/cn.html" target="_blank">用户隐私条款</a>
                            </div>
                            <Typography align="center">互联网违法不良信息举报电话：021-3490998</Typography>
                        </Grid>
                    </Grid>
                    {/* right */}
                    <Grid xs={12} sm={12} md={4} lg={4} xl={4} item container justify="flex-end" alignItems="center">
                        <Box display={{ xs: 'none', sm: 'block' }} >
                            <a href="https://twitter.com/ULUGames1" target="_blank" rel="noopener noreferrer" className={classes.ico}> <Twitter /></a>
                            <a href="https://www.youtube.com/channel/UC3PCMQ6sbpCZVdIqZaWf4-g" target="_blank" rel="noopener noreferrer" className={classes.ico}><Youtube /></a>
                            <span className={classes.ico}><Facebook /></span>
                            <span className={classes.ico}><Wechat /></span>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    )
}
export default Footer