import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
const crypto = require('crypto')

import { Container, Grid, IconButton, Hidden, MenuItem, Menu, Button, TextField, Checkbox, Box, FormControlLabel, Typography, InputLabel, FormControl, Select, Input, Snackbar } from '@material-ui/core';
import { Language, Menu as MenuIcon, Save as SaveIcon, Clear } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles'



import { setLang } from 'store/modules/app'
import { useSubmitForm } from 'common/CustomHooks'
import { withTranslation } from '../../../i18n'
import MySnackbarContentWrapper from 'components/SnackbarWrapper'
import { logout, getInitConfigByWeb, login, sendPhoneCode, registerByEmailValitor, sendCaptchaByAuthCode } from 'service/login'
import { getCode } from '../../../utils/index'
import Login from '../Login'


const useStyles = makeStyles(theme => ({
    root: props => ({
        backgroundColor: props.backgroundColor ? props.backgroundColor : theme.palette.primary.main,
        width: '100%',
        height: theme.spacing(10),
        position: 'fixed',
        top: 0,
        zIndex: '5',
        '-webkit-transition': 'height .4s ease, opacity .3s ease',
        '-o-transition': 'height .4s ease, opacity .3s ease',
        'transition': 'height .4s ease, opacity .3s ease'
        // position: '-webkit-sticky',
        // position: 'sticky',
        // top: 0
    }),
    fixed: {
        position: 'fixed !important',
        backgroundColor: theme.palette.primary.main + '!important',
        zIndex: '2',
        height: '60px !important',
    },
    container: {
        height: '100%',
    },
    content: {
        height: '100%'
    },
    navLink: {
        '&>*': {
            color: theme.palette.white,
            margin: '0 10px',
            fontFamily: "Microsoft YaHei",
            fontSize: 12,
            cursor: 'pointer'
        }
    },
    svg: {
        color: 'white'
    },
    loginBox: {
        width: '90%',
        height: '60%',
        minHeight: '603px',
        maxWidth: '820px',
        background: 'white',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 'auto',
        zIndex: '999',
        padding: '1% 3%',
        boxSizing: 'border-box',
    },
    login: {
        textAlign: 'center',
        fontSize: '34px',
        fontWeight: 'bold',
        color: '#444444'
    },
    button: {
        width: '80%',
        boxSizing: 'border-box',
    },
    button1: {
        marginBottom: '10%'
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        cursor: 'pointer',
        '& svg': {
            fontSize: '36px'
        }
    },
    mask: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '888',
        background: 'rgba(0, 0, 0, 0.7)',
    },
    left: {
        marginTop: '5%',
        // height: '200px'
    },
    right: {
        // marginTop: '30px',
    },
    buttonColor: {
        background: '#7FC75A'
    },
    buttonGoogle: {
        background: '#FFC107'
    },
    textField: {
        width: '100%',
        boxSizing: 'border-box'
    },
    inputBox: {
        width: '100%',
    },
    LoginBtn: {
        width: '100%',
        boxSizing: 'border-box',
        margin: '10px 0',
        display: 'block',
        fontSize: '24px'
    },
    info: {
        clear: 'both',
        '& span': {
            cursor: 'pointer',
            fontSize: '14px',
            color: '#646581'
        }
    },
    asLink: {
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    sendcode: {
        "height": "55px",
        "margin": "17px 0 0 10%",
        "width": "89%"
    },
    sendcode2: {
        "height": "42px",
        "margin": "15px 0 0 10%",
        "width": "89%"
    },
    sendCaptcha: {
        width: '48%',
        boxSizing: 'border-box'
    },
    getcode: {
        width: '58%',
    },
    checked: {
        '&+span': {
            fontSize: '16px'
        }

    }

}))
const options = [{
    'value': 'zh',
    'name': '简体中文'
}, {
    'value': 'en',
    'name': 'English'
}]


const menu = [{
    'name': 'publishing',
}, {
    'name': 'GameList',
}, {
    'name': 'jobs',
},
{
    'name': 'login'
}, {
    'name': 'register'
}]
function Topbar(props) {
    const classes = useStyles(props)
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [needFixed, setNeedFixed] = useState(false);
    const { t, i18n } = props
    const [LoginPup, setLoginPup] = useState(false)
    const [show, setShow] = useState(false)
    const language = useSelector(state => state.app)
    const [authCode, setAuthCode] = useState(null)
    const [token, setToken] = useState(null)
    let [time, setTime] = useState(30)
    let [time1, setTime1] = useState(30)
    const [isSend, setSend] = useState(false)
    const [isSend1, setSend1] = useState(false)
    const dispatch = useDispatch();
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }
    const [snackBar, setSnackBar] = useState(initSnackbar)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleLanguage = (event) => {
        setAnchorElMenu(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleSelect = (event, value) => {
        if (value === 'zh' || value === 'en') {
            dispatch(setLang({ lang: value }))
            i18n.changeLanguage(value);
        }
        setAnchorElMenu(null);
    }
    const handleLogin = (index) => {

        getInit()
        if (index == 3) {
            setShow(true)
        } else {
            setShow(false)
        }
        setLoginPup(true)
    }
    const closePup = () => {
        setLoginPup(false)
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };

    useEffect(() => {
        setAuthCode(window.localStorage.getItem('authCode') || null)
        setToken(window.localStorage.getItem('token') || null)
    }, [])
    useEffect(() => {
        const hanldeScroll = () => {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            scrollTop > 0 ? setNeedFixed(true) : setNeedFixed(false)
        }
        window.addEventListener('scroll', hanldeScroll)
        return () => {
            window.removeEventListener('scroll', hanldeScroll)
        };
    })

    /* login*/
    const loginInfo = () => {
        setLoginWay(!LoginWay)
    }
    const getInit = async () => {
        const data = {
            "channelId": 9,
            "timestamp": new Date().getTime(),
            "gameId": 100001,
            "platform": 3,
            "channelTag": 0,
            "env": 3,
            "language": language.lang,
            "signature": "DFD29F8E1D150AB53830FB62B46E581C",
        }
        const res = await getInitConfigByWeb(data)
        if (res.code == 0) {
            localStorage.setItem('authCode', res.data.authCode)
            setAuthCode(res.data.authCode)
        }
    }
    const sendCode = () => {
        const data = {
            uluAccount: inputs.phoneNumber,
            gameId: '100001'
        }
        sendPhoneCode(data, authCode).then(res => {
            if (res.code != 0) {
                getCode(res.code)
            }
            setSend(true)
            let t1 = setInterval(() => {
                setTime(time--)
                if (time <= 0) {
                    clearInterval(t1)
                    setTime(30)
                    setSend(false)
                }
            }, 1000)
        })
    }

    const initialFormState = {
        email: '',
        password: '',
        phoneNumber: '',
        code: ''
    }
    const [LoginWay, setLoginWay] = useState(true)
    const submitFormData = () => {
        setSnackBar(initSnackbar)
        const { password, email, phoneNumber, code } = inputs
        let md5 = crypto.createHash('md5')
        md5.update(password)
        var pwd = md5.digest('hex').toUpperCase()
        let data = {}
        if (LoginWay) {
            data = { loginType: 2, accessId: '', accessToken: '', uluAccount: email, password: pwd, gameId: '100001' }
            if (password === '' || email === '') {
                setSnackBar({ ...snackBar, 'message': '请输入电子邮箱或密码', 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
                return false
            }
        } else {
            data = { loginType: 2, accessId: '', accessToken: '', uluAccount: phoneNumber, password: code, gameId: '100001' }
            if (phoneNumber === '' || code === '') {
                setSnackBar({ ...snackBar, 'message': '请输入手机号码或验证码', 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
                return false
            }
        }
        login(data, authCode).then(res => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'success', 'autoHideDuration': 1500 })
                setOpen(true);
                setToken(res.data.token)
                localStorage.setItem('token', res.data.token)
                closePup()
                setInputs(initialFormState)
            } else {
                getCode(res.code)
            }
        })
    }
    const { inputs, setInputs, handleInputChange, handleSubmit } = useSubmitForm(initialFormState, submitFormData);
    /*register*/
    const initialRegState = {
        mail: '',
        gameId: '100001',
        type: 1,
    }
    const submitRegData = () => {
        const { password, passwordAgain, mail, code, checkedA } = regInputs
        setSnackBar(initSnackbar)
        if ((password !== '' && passwordAgain !== '') || password !== passwordAgain) {
            setSnackBar({ ...snackBar, 'message': '两次输入密码不一致', 'variant': 'warning', 'autoHideDuration': 10000 })
            return false
        }
        if (!checkedA) {
            setSnackBar({ ...snackBar, 'message': '请先同意服务条款', 'variant': 'warning', 'autoHideDuration': 1500 })
            return false
        }
        let md5 = crypto.createHash('md5')
        md5.update(password)
        var pwd = md5.digest('hex').toUpperCase()
        const data = {
            "mail": mail,
            "password": pwd,
            "gameId": '100001',
            "captcha": code
        }
        registerByEmailValitor(data, authCode).then(res => {
            if (res.code == 0) {
                setToken(res.data.token)
                closePup()
            } else {
                getCode(res.code)
            }
        })
    }
    const sendCaptcha = () => {
        let lang = ''
        if (language.lang == 'en') {
            lang = 'en-US'
        }
        if (language.lang == 'zh') {
            lang = 'zh-CN'
        }
        const data = {
            "mail": regInputs.mail,
            "gameId": "100001",
            "type": 1,
            "language": lang
        }
        sendCaptchaByAuthCode(data, authCode).then(res => {
            if (res.code != 0) {
                getCode(res.code)
            }
            setSend1(true)
            let t1 = setInterval(() => {
                setTime1(time--)
                if (time <= 0) {
                    clearInterval(t1)
                    setTime1(30)
                    setSend1(false)
                }
            }, 1000)
        })
    }

    const regs = useSubmitForm(initialRegState, submitRegData);
    let regInputs = regs.inputs
    let handleRegInputChnage = regs.handleInputChange
    let handleRegSubmit = regs.handleSubmit
    /*facebook*/
    useEffect(() => {
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
            ; (function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0]
                if (d.getElementById(id)) {
                    return
                }
                js = d.createElement(s)
                js.id = id
                js.src = 'https://connect.facebook.net/en_US/sdk.js'
                fjs.parentNode.insertBefore(js, fjs)
            })(document, 'script', 'facebook-jssdk')
    }, [])

    const getFacebookInfo = () => {
        FB.login(function (response) {
            if (response.status === 'connected') {
                let accessId = response.authResponse.userID
                let accessToken = response.authResponse.accessToken
                const data = {
                    loginType: 3,
                    accessId,
                    accessToken,
                    gameId: this.clientId,
                    mail: '',
                    password: '',
                    captcha: ''
                }
                binding(data).then(res => {
                    if (res.code == 0) {
                        alert('成功')
                    }
                })
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
    // google
    const getGooleInfo = () => {
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
                googleSignIn(accessId, accessToken)
                auth2.signOut().then(function () {
                    console.log('User signed out.')
                })
            })
        })
    }
    const googleSignIn = (accessId, accessToken) => {
        const data = {
            loginType: 4,
            accessId,
            accessToken,
            gameId: this.clientId,
            mail: '',
            password: '',
            captcha: ''
        }
        binding(data).then(res => {
            if (res.code == 0) {
                alert('成功')
            } else {
                getCode(res.code)
            }
        })
    }
    /*forget password*/
    const forgetPassword = () => {

    }
    /**sign out */
    const signout = () => {
        logout({ gameId: '100001' }, token).then(res => {
            if (res.code == 0) {
                localStorage.removeItem('token')
                setToken(null)
                setSnackBar({ ...snackBar, 'message': '退出成功', 'variant': 'success', 'autoHideDuration': 1500 })
            }
        })
    }
    return (
        <div id="menu" className={`${classes.root} ${needFixed ? classes.fixed : ''}`}>
            <Container className={classes.container}>
                <Grid container alignItems="center" justify="space-between" className={classes.content}>
                    <Hidden mdUp>
                        {/* 小屏 */}
                        <Grid>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MenuIcon className={classes.svg} />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {
                                    menu.map((option, index) => {
                                        if (index < 3) {
                                            return (<MenuItem key={option.name} onClick={handleClose}> <Link href={`/${option.name}`} ><a>{t(option.name)}</a></Link></MenuItem>)
                                        } else {
                                            return (
                                                <MenuItem key={option.name} onClick={handleClose}>
                                                    <span key={option.name} onClick={() => handleLogin(index)}>{t(option.name)}</span>
                                                </MenuItem>
                                            )
                                        }
                                    })
                                }
                            </Menu>
                        </Grid>
                    </Hidden>
                    <Grid item>
                        <Link href="/" ><img src="../../images/logo.png" alt="uluLogo" /></Link>
                    </Grid>
                    {/* 大屏 */}
                    <Grid item className={classes.navLink}>
                        <Hidden only={['sm', 'xs']}>
                            {
                                menu.map((option, index) => {
                                    //未登录
                                    if (index < 3) {
                                        return (<Link href={`/${option.name}`} key={option.name}><a>{t(option.name)}</a></Link>)
                                    } else if (!token) {
                                        return (
                                            <span key={option.name} onClick={() => handleLogin(index)}>{t(option.name)}</span>
                                        )
                                    }
                                })
                            }
                            {/* 已登录 */}
                            {
                                token &&
                                <>
                                    <a href="/accounts/profile">grace_xxxx</a>
                                    <span className={classes.asLink} onClick={signout}>退出</span>
                                </>
                            }

                        </Hidden>
                        <IconButton aria-label="select" aria-controls="simple-menu" aria-haspopup="true" onClick={handleLanguage}>
                            <Language color="primary" className={classes.svg} />
                        </IconButton>
                        <Menu anchorEl={anchorElMenu} keepMounted open={Boolean(anchorElMenu)} onClose={handleSelect}>
                            {
                                options.map(option => (
                                    <MenuItem onClick={event => handleSelect(event, option.value)} key={option.value}>{option.name}</MenuItem>
                                ))
                            }
                        </Menu>
                    </Grid>
                </Grid>
                {LoginPup && (<div className={classes.loginBox}>
                    <span className={classes.close} onClick={closePup}><Clear color="primary" /></span>
                    <div className={classes.login}>ULUGAMES</div>
                    <Grid container >
                        <Grid item container direction="column" lg={6} xs={12} md={6} sm={6} xl={6} className={classes.left}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={`${classes.button} ${classes.button1}`}
                                startIcon={<SaveIcon />}
                                onClick={getFacebookInfo}
                            >
                                Facebook登入
                                </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={`${classes.button} ${classes.buttonGoogle}`}
                                startIcon={<SaveIcon />}
                                onClick={getGooleInfo}
                            >
                                Google登入
                            </Button>
                            {/* <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className={`${classes.button} ${classes.buttonColor}`}
                                startIcon={<SaveIcon />}
                            >
                                通过Twitter登入
                                </Button> */}
                        </Grid>
                        <Grid item lg={6} xs={12} md={6} sm={6} xl={6} className={classes.right}>
                            {
                                show ? (
                                    <form className={classes.formData} onSubmit={handleSubmit}>
                                        {/* login by email */}
                                        {
                                            LoginWay && <div>
                                                <FormControl className={classes.inputBox}>
                                                    <TextField
                                                        id="outlined-email-input"
                                                        label="电子邮箱"
                                                        className={classes.textField}
                                                        type="email"
                                                        name="email"
                                                        autoComplete="email"
                                                        margin="normal"
                                                        variant="outlined"
                                                        size="medium"
                                                        value={inputs.email}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormControl>
                                                <FormControl className={classes.inputBox}>
                                                    <TextField
                                                        id="outlined-password-input"
                                                        label="密码"
                                                        className={classes.textField}
                                                        type="password"
                                                        name="password"
                                                        autoComplete="password"
                                                        margin="normal"
                                                        variant="outlined"
                                                        size="medium"
                                                        value={inputs.password}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormControl>
                                            </div>
                                        }
                                        {/* login by phoneNumber */}
                                        {
                                            !LoginWay && <div>
                                                <FormControl className={classes.inputBox}>
                                                    <TextField
                                                        label="手机号码"
                                                        className={classes.textField}
                                                        name="phoneNumber"
                                                        margin="normal"
                                                        variant="outlined"
                                                        value={inputs.phoneNumber}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormControl>
                                                <Box display="flex" justifyContent="space-betwwen">
                                                    <FormControl className={classes.getcode}>
                                                        <TextField label="验证码" name="code" margin="normal" variant="outlined" value={inputs.code} onChange={handleInputChange} />
                                                    </FormControl>
                                                    <FormControl className={classes.sendCaptcha}>
                                                        <Button variant="outlined" color="secondary" className={classes.sendcode} onClick={sendCode}> {isSend ? time : '发送验证码'}</Button>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                        }
                                        <Box display="flex" justifyContent="space-between" alignItems="center" fontSize={16} className={classes.info}>
                                            <span onClick={loginInfo}> {LoginWay ? '手机号登录' : '邮箱登录'}</span>
                                            <span onClick={forgetPassword}>忘记密码</span>
                                        </Box>
                                        <Button variant="contained" color="primary" className={classes.LoginBtn} onClick={handleSubmit}> 登入 </Button>
                                        <Typography color="textPrimary" variant="body2" align="center">没有游陆账号？<span onClick={() => setShow(false)} className={classes.asLink}>马上注册</span></Typography>
                                    </form>) :
                                    (
                                        // register
                                        <form className={classes.formData} onSubmit={handleRegSubmit}>
                                            <FormControl className={classes.inputBox}>
                                                <TextField
                                                    label="电子邮箱"
                                                    className={classes.textField}
                                                    type="email"
                                                    name="mail"
                                                    size="small"
                                                    autoComplete="email"
                                                    margin="normal"
                                                    variant="outlined"
                                                    value={regInputs.mail}
                                                    onChange={handleRegInputChnage}
                                                />
                                            </FormControl>
                                            <Box display="flex" justifyContent="space-betwwen">
                                                <FormControl className={classes.getcode}>
                                                    <TextField
                                                        label="验证码"
                                                        name="code"
                                                        margin="normal"
                                                        variant="outlined"
                                                        size="small"
                                                        value={regInputs.code}
                                                        onChange={handleRegInputChnage}
                                                    />
                                                </FormControl>
                                                <FormControl className={classes.sendCaptcha}>
                                                    <Button variant="outlined" color="secondary" className={classes.sendcode2} onClick={sendCaptcha}> {isSend1 ? time1 : '发送验证码'}</Button>
                                                </FormControl>
                                            </Box>
                                            <FormControl className={classes.inputBox}>
                                                <TextField
                                                    label="密码"
                                                    className={classes.textField}
                                                    type="password"
                                                    name="password"
                                                    autoComplete="password"
                                                    margin="normal"
                                                    size="small"
                                                    variant="outlined"
                                                    value={regInputs.password}
                                                    onChange={handleRegInputChnage}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.inputBox}>
                                                <TextField
                                                    label="确认密码"
                                                    className={classes.textField}
                                                    type="password"
                                                    name="passwordAgain"
                                                    autoComplete="passwordAgain"
                                                    margin="normal"
                                                    size="small"
                                                    variant="outlined"
                                                    value={regInputs.passwordAgain}
                                                    onChange={handleRegInputChnage}
                                                />
                                            </FormControl>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <FormControlLabel
                                                    control={<Checkbox checked={regInputs.checkedA} name="checkedA" fontSize="small" className={classes.checked} />}
                                                    label="我已阅读并同意遵守服务条款"
                                                />
                                            </Box>
                                            <Button variant="contained" color="primary" className={classes.LoginBtn} onClick={submitRegData}> 注册 </Button>
                                            <Typography color="textPrimary" variant="body2" align="center">已有账号？<span onClick={() => setShow(true)} className={classes.asLink}>在此登录</span></Typography>
                                        </form>)
                            }
                        </Grid>
                    </Grid>
                </div >)}

            </Container >
            {/* tips */}
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
            {
                LoginPup && (<div className={classes.mask}></div>)
            }
        </div >
    )
}


Topbar.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('common')(Topbar);