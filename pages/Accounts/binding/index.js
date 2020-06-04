import React, { useEffect, useState } from 'react';
import Account from '../index'
import { makeStyles, Button, Snackbar } from '@material-ui/core'
import { Facebook } from '@material-ui/icons';
import { withTranslation } from '../../../i18n'
import { unBind, bindingAccounts, getUserInfo } from 'service/login'
import Google from 'icons/svg/google.svg'
import { useSelector } from 'react-redux';
import MySnackbarContentWrapper from 'components/SnackbarWrapper'


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
    },
    ulPart: {
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0'
        }
    },
    iconStyle: {
        display: 'flex',
        alignItems: 'center',
        '& span': {
            fontSize: '14px',
            fontWeight: '600'
        }
    }
}))
function Profile() {
    const classes = useStyles()
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }

    const [snackBar, setSnackBar] = useState(initSnackbar)
    const [open, setOpen] = useState(false);
    const app = useSelector(state => state.app)
    let isBinding = {
        facebook: false,
        twitter: false,
        gameCenter: false,
        google: false,
        ulu: false,
        amazon: false
    }
    const [binding, setBinding] = useState(isBinding)
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };
    const init = () => {
        //获取用户信息
        getUserInfo({ gameId: '100001' }, app.token).then(res => {
            if (res.code == 0) {
                let data = parseInt(res.data.bingValue)
                const facebookBind = 2,
                    twitterBind = 4,
                    gameCenterBind = 8,
                    googleBind = 16,
                    uluBind = 32,
                    amazonBind = 64

                if (check(data, facebookBind)) {
                    setBinding({ facebook: true })
                } else {
                    setBinding({ facebook: false })
                }
                if (check(data, googleBind)) {
                    setBinding({ google: true })
                } else {
                    setBinding({ google: false })
                }
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
            }
        })
    }
    const check = (userPermission, specificPermission) => {
        return (userPermission & specificPermission) === specificPermission
    }
    /*facebook*/
    useEffect(() => {
        init();
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
        bingUser(data)
    }
    const bingUser = (data) => {
        bindingAccounts(data, app.token).then(res => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': '绑定成功', 'variant': 'success', 'autoHideDuration': 1500 })
                setOpen(true);
                init()
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
            accessId,
            accessToken,
            gameId: '100001'
        }
        unBind(data, app.token).then(res => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': '解绑成功', 'variant': 'success', 'autoHideDuration': 1500 })
                setOpen(true);
                init()
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
            }
        })
    }
    //google 
    const getGoogleInfo = (status) => {
        gapi.load('auth2', function () {
            let auth2 = gapi.auth2.init({
                client_id:
                    '372395845963-qidir2a8uasj8ari12m345fq93fquu36.apps.googleusercontent.com',
                // client_id:
                //     '554596168927-2fi16qqmcjhgousr6id9h6h33mc7jvrn.apps.googleusercontent.com',
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
        bingUser(data)
    }
    return (
        <Account>
            <div>
                <span className={classes.title}> 绑定账号</span>
                <p className={classes.textSize}>绑定你的社交网络账号后，你可以使用已绑定的社交网络账号来登录。</p>
                <ul className={classes.ulPart}>
                    <li>
                        <div className={classes.iconStyle}>
                            <Facebook className={classes.facebookIcon} />
                            <span>FACEBOOK</span>
                        </div>
                        <div>
                            {
                                binding.facebook ? <Button variant="outlined" color="primary" size="small" onClick={() => getFacebookInfo(0)}>解绑</Button> :
                                    <Button variant="contained" color="primary" size="small" onClick={() => getFacebookInfo(1)}>绑定</Button>
                            }
                        </div>
                    </li>
                    <li>
                        <div className={classes.iconStyle}>
                            <Google className={classes.twitterIcon} />
                            <span>GOOGLE</span>
                        </div>
                        <div>
                            {binding.google ? <Button variant="outlined" color="primary" size="small" onClick={() => getGoogleInfo(0)}>解绑</Button> :
                                <Button variant="contained" color="primary" size="small" onClick={() => getGoogleInfo(1)}>绑定</Button>}
                        </div>
                    </li>
                </ul>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={snackBar.autoHideDuration}
                onClose={handleCloseSnackbar}
            >
                <MySnackbarContentWrapper
                    onClose={handleCloseSnackbar}
                    variant={snackBar.variant}
                    message={snackBar.message}
                />
            </Snackbar>
        </Account>
    )
}
export default withTranslation('profile')(Profile);