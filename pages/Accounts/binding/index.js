import React from 'react';
import Account from '../index'
import { makeStyles, Box, Divider, Typography } from '@material-ui/core'
import { Facebook, Twitter } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({

    avatar: {
        margin: 10,
        width: 120,
        height: 120,
        margin: '0 auto 20px auto'
    },
    avatarBox: {
        textAlign: 'center'
    },
    socail: {
        display: 'flex'
    },
    facebookIcon: {
        width: 40,
        height: 40,
        color: '#4865B3',
    },
    twitterIcon: {
        width: 40,
        height: 40,
        color: '#1EADE5'
    },
    list: {
        display: 'flex',
        flexDirection: "column",
        margin: '0 20px'
    },
    text: {
        margin: '30px 0 0 0',
        fontSize: '16px'
    },
    title: {
        fontWeight: '600',
        color: 'rgb(100, 101, 105)'
    },
    textSize: {
        fontSize: '16px'
    }
}))
function Profile() {
    const classes = useStyles()
    return (
        <Account>
            <Box width="100%">
                <span className={classes.title}> 绑定账号</span>
                <p className={classes.textSize}>你的社交网络账号绑定后，你可以使用已绑定的社交网络账号来登录。</p>
                <div className={classes.socail}>
                    <div className={classes.list}>
                        <Facebook className={classes.facebookIcon} />
                        <span>Facebook</span>
                    </div>
                    <div className={classes.list}>
                        <Twitter className={classes.twitterIcon} />
                        <span>Twitter</span>
                    </div>
                </div>
                <div className={classes.text}>你的账号已绑定的平台</div>
                <div className={classes.list}>
                    <Facebook className={classes.facebookIcon} />
                    <span>Facebook</span>
                </div>
            </Box>
        </Account>
    )
}
export default Profile