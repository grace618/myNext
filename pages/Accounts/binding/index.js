import React, { useEffect } from 'react';
import Account from '../index'
import { makeStyles, Box, Divider, Typography, Button, Container, Grid } from '@material-ui/core'
import { Facebook, Twitter } from '@material-ui/icons';
import { withTranslation } from '../../../i18n'
import { unBind, binding, getUserInfo } from 'service/login'
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
    const init = () => {
        //获取用户信息
        getUserInfo({ gameId: '100001' }).then(res => {
            this.$toast.clear()
            if (res.code == 0) {
                const data = parseInt(res.data.bingValue)
                this.bingValue = data
                this.emailBind = res.data.email
                const facebookBind = 2,
                    twitterBind = 4,
                    gameCenterBind = 8,
                    googleBind = 16,
                    uluBind = 32,
                    amazonBind = 64

                if (this.check(data, facebookBind)) {
                    this.isBinding.facebook = true
                }

            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
            }
        })
    }
    /*facebook*/
    useEffect(() => {

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.3";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");

        window.fbAsyncInit = function () {
            FB.init({
                appId: '1070581506477121',
                xfbml: true,
                status: true,
                cookie: true,
                autoLogAppEvents: true,
                version: 'v5.0'
            })
            FB.AppEvents.logPageView()
        }
    }, [])

    //fb login
    const getFacebookInfo = (status) => {
        FB.login(function (response) {
            if (response.status === 'connected') {
                let accessId = response.authResponse.userID
                let accessToken = response.authResponse.accessToken
                if (status == 1) {
                    facebookSignIn(3, accessId, accessToken)
                } else {
                    unBinding(3, accessId, accessToken)
                }
                FB.logout(function () {
                    console.log('User signed out.')
                })
            } else {
                FB.logout(function () {
                    console.log('User signed out.')
                })
            }
        })
    }
    //fb binding
    const facebookSignIn = (loginType, accessId, accessToken) => {
        const data = {
            loginType,
            accessId,
            accessToken,
            uluAccount: '',
            password: '',
            captcha: '',
            gameId: '100001'
        }
        binding(data).then(res => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': '绑定成功', 'variant': 'success', 'autoHideDuration': 1500 })
                setOpen(true);
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
            }
        })
    }
    //fb  unbind
    const unBinding = (loginType, accessId, accessToken) => {
        const data = {
            loginType,
            accessId: accessId,
            accessToken: accessToken,
            gameId: '100001'
        }
        unBind(data).then(res => {
            if (res.code == 0) {
                this.init()
                uluAccount
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
            }
        })
    }
    //google 
    useEffect(() => {
        window.setGoogleLoginData = setGoogleLoginData
    })
    const getGoogleInfo = (status) => {
        gapi.load('auth2', function () {
            let auth2 = gapi.auth2.init({
                // client_id:
                //   '372395845963-qidir2a8uasj8ari12m345fq93fquu36.apps.googleusercontent.com',
                client_id:
                    '554596168927-2fi16qqmcjhgousr6id9h6h33mc7jvrn.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
            })
            auth2.signIn().then(function () {
                let accessToken = auth2.currentUser.get().getAuthResponse().id_token
                let accessId = auth2.currentUser
                    .get()
                    .getBasicProfile()
                    .getId()
                if (status == 1) {
                    googleSignIn(accessId, accessToken)
                } else {
                    unBinding(4, accessId, accessToken)
                }
                auth2.signOut().then(function () {
                    console.log('User signed out.')
                })
            })
        })
    }
    //google binding
    const googleSignIn = (accessId, accessToken) => {
        const data = {
            loginType: 4,
            accessId,
            accessToken,
            gameId: '100001',
            uluAccount: '',
            password: '',
            captcha: ''
        }
        binding(data).then(res => {
            if (res.code == 0) {
                this.init()
                setSnackBar({ ...snackBar, 'message': '绑定成功', 'variant': 'success', 'autoHideDuration': 1500 })
                setOpen(true);
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
            }
        })
    }
    return (
        <Account>
            <div>
                <span className={classes.title}> 绑定账号</span>
                <p className={classes.textSize}>绑定你的社交网络账号后，你可以使用已绑定的社交网络账号来登录。</p>
                <Grid Container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Facebook className={classes.facebookIcon} />
                        <span>Facebook</span>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="small" onClick={getFacebookInfo(0)}>解绑</Button>
                    </Grid>
                </Grid>
                <Grid Container>
                    <Grid item>
                        <Twitter className={classes.twitterIcon} />
                        <span>Google</span>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="small" onClick={getGoogleInfo(1)}>解绑</Button>
                    </Grid>
                </Grid>
                <Grid Container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Facebook className={classes.facebookIcon} />
                        <span>Facebook</span>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="small" onClick={getFacebookInfo(1)}>绑定</Button>
                    </Grid>
                </Grid>
                <Grid Container>
                    <Grid item>
                        <Twitter className={classes.twitterIcon} />
                        <span>Google</span>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="small" onClick={getGoogleInfo(1)}>绑定</Button>
                    </Grid>
                </Grid>
            </div>
        </Account>
    )
}
export default withTranslation('profile')(Profile);