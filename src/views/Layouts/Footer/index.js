import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Container, Typography, Grid, Box } from '@material-ui/core'
import { ReactComponent as Facebook } from 'icons/svg/facebook.svg'
import { ReactComponent as Twitter } from 'icons/svg/twitter.svg'
import { ReactComponent as Youtube } from 'icons/svg/youtube.svg'
import { ReactComponent as Wechat } from 'icons/svg/wechat.svg'
const useStyles = makeStyles(theme => ({
    ico: {
        marginLeft: theme.spacing(6),
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
        margin: '20px 0',
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
    },

}))
function Footer() {
    const classes = useStyles()
    return (
        <Box bgcolor="background.default" color="text.light" p={7}>
            <Container>
                <Grid container alignItems="center" justify="space-between">
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
                <Grid container justify="space-between" alignItems="center" className={classes.info}>
                    <a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备17016575号-2</a>
                    <a href="http://www.beian.miit.gov.cn" target="_blank"> 沪网文{2017}3448-218号</a>
                    <span >Copyright © U.LU Games all right reserved</span>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                    <div className={classes.policy}>
                        <a href="http://policy.ulugame.com/policycn.html" target="_blank">用户服务协议  |  </a>
                        <a href="http://policy.ulugame.com/cn.html" target="_blank">用户隐私条款</a>
                    </div>
                    <span >互联网违法不良信息举报电话：021-34909980</span>
                    <Box display={{ xs: 'none', sm: 'block' }} >
                        <a href="https://twitter.com/ULUGames1" target="_blank" rel="noopener noreferrer" className={classes.ico}> <Twitter /></a>
                        <a href="https://www.youtube.com/channel/UC3PCMQ6sbpCZVdIqZaWf4-g" target="_blank" rel="noopener noreferrer" className={classes.ico}><Youtube /></a>
                        <span className={classes.ico}><Facebook /></span>
                        <span className={classes.ico}><Wechat /></span>
                    </Box>
                </Grid>
            </Container>
        </Box >
    )
}
export default Footer