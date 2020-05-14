import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

import { Container, Grid, IconButton, Hidden, MenuItem, Menu, Button, TextField, Checkbox, Box, FormControlLabel, Typography, InputLabel, FormControl, Select, Input, Snackbar } from '@material-ui/core';
import { Language, Menu as MenuIcon, Save as SaveIcon, Clear } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles'

import { setLang } from 'store/modules/app'
import { useSubmitForm } from 'common/CustomHooks'
import { withTranslation } from '../../../i18n'
import MySnackbarContentWrapper from 'components/SnackbarWrapper'
import { addCollaboration, logout } from 'service/login'
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
        '& a': {
            color: theme.palette.white,
            margin: '0 10px',
            fontFamily: "Microsoft YaHei",
            fontSize: 12
        }
    },
    svg: {
        color: 'white'
    },
    loginBox: {
        width: '820px',
        height: '600px',
        background: 'white',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 'auto',
        zIndex: '999',
        padding: '30px 45px',
        boxSizing: 'border-box',
    },
    login: {
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: 'bold',
        padding: '10px 0',
        color: '#444444'
    },
    button: {
        width: '315px',
        boxSizing: 'border-box'
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
        marginTop: '60px',
        height: '200px'
    },
    right: {
        marginTop: '30px',
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
        margin: '20px 0 10px 0',
        display: 'block',
        fontSize: '24px'
    },
    info: {
        '& span': {
            cursor: 'pointer',
            fontSize: '14px',
            color: '#646581'
        }
    }

}))
const options = [{
    'value': 'cn',
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
    const inputEl = useRef(null)
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [needFixed, setNeedFixed] = useState(false);
    const { t, i18n } = props
    const [LoginPup, setLoginPup] = useState(false)
    const [show, setShow] = useState(false)
    const [token, setToken] = useState('dkhfbbgkdjfkdfj')
    const dispatch = useDispatch();

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
        if (value === 'cn' || value === 'en') {
            dispatch(setLang({ lang: value }))
            i18n.changeLanguage(value);
        }
        setAnchorElMenu(null);
    }
    const handleLogin = (index) => {
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
    /*login*/
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }
    const initialFormState = {
        email: '',
        password: '',
        phoneNumber: '',
        code: ''
    }
    const [snackBar, setSnackBar] = useState(initSnackbar)
    const [LoginWay, setLoginWay] = useState(true)
    const submitFormData = () => {
        setSnackBar(initSnackbar)
        const { password, email, phoneNumber, code } = inputs
        if (LoginWay) {
            if (password === '' || email === '') {
                setSnackBar({ ...snackBar, 'message': '请输入账号或密码', 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
            } else {
                addCollaboration(inputs).then(res => {
                    if (res.data.code == 0) {
                        setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'success', 'autoHideDuration': 1500 })
                        setOpen(true);
                        setInputs(initialFormState)
                        inputEl.current.value = ''
                    }
                })
            }
        } else {
            if (phoneNumber === '' || code === '') {
                setSnackBar({ ...snackBar, 'message': '请输入手机号码或验证码', 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
            } else {
                addCollaboration(inputs).then(res => {
                    if (res.data.code == 0) {
                        setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'success', 'autoHideDuration': 1500 })
                        setOpen(true);
                        setInputs(initialFormState)
                        inputEl.current.value = ''
                    }
                })
            }
        }
    }
    const { inputs, setInputs, handleInputChange, handleSubmit } = useSubmitForm(initialFormState, submitFormData);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };
    const loginByPhone = () => {
        setLoginWay(!LoginWay)
    }
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
        logout({ gameId }).then(res => {
            if (res.code == 0) {
                alert('退出登录')
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
                                                    <a key={option.name} onClick={() => handleLogin(index)} href="javascript:;">{t(option.name)}</a>
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
                                            <a key={option.name} onClick={() => handleLogin(index)} href="javascript:;">{t(option.name)}</a>
                                        )
                                    }
                                })
                            }
                            {/* 已登录 */}
                            <a href="/accounts/profile">grace_xxxx</a>
                            <a href="javascript:;" onClick={signout}>退出</a>
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
                        <Grid item container justify="space-around" direction="column" lg={6} xs={12} className={classes.left}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={getFacebookInfo}
                            >
                                通过Facebook登入
                                </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={`${classes.button} ${classes.buttonGoogle}`}
                                startIcon={<SaveIcon />}
                                onClick={getGooleInfo}
                            >
                                通过Google登入
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
                        <Grid item lg={6} xs={12} className={classes.right}>

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
                                                        type="number"
                                                        name="phoneNumber"
                                                        margin="normal"
                                                        variant="outlined"
                                                        value={inputs.phoneNumber}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormControl>
                                                <FormControl className={classes.inputBox}>
                                                    <Button variant="outlined" color="secondary"> 发送验证码</Button>
                                                    <TextField
                                                        label="验证码"
                                                        type="password"
                                                        name="password"
                                                        autoComplete="password"
                                                        margin="normal"
                                                        variant="outlined"
                                                        value={inputs.code}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormControl>
                                            </div>
                                        }
                                        <Box display="flex" justifyContent="space-between" alignItems="center" fontSize={16} className={classes.info}>
                                            <span onClick={loginByPhone}> {LoginWay ? '手机号登录' : '邮箱登录'}</span>
                                            <span onClick={forgetPassword}>忘记密码</span>
                                        </Box>
                                        <Button variant="contained" color="primary" className={classes.LoginBtn} onClick={handleSubmit}> 登入 </Button>
                                        <Typography color="textPrimary" variant="body2" align="center">没有游陆账号？<a href="javascript:;" onClick={() => setShow(false)}>马上注册</a></Typography>
                                    </form>) :
                                    (<form className={classes.formData} onSubmit={handleSubmit}>
                                        <FormControl className={classes.inputBox}>
                                            <TextField
                                                label="电子邮箱"
                                                className={classes.textField}
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                margin="normal"
                                                variant="outlined"
                                                value={inputs.email}
                                                onChange={handleInputChange}
                                            />
                                        </FormControl>
                                        <FormControl className={classes.inputBox}>
                                            <Button variant="outlined" color="secondary"> 发送验证码</Button>
                                            <TextField
                                                label="密码"
                                                className={classes.textField}
                                                type="password"
                                                name="password"
                                                autoComplete="password"
                                                margin="normal"
                                                variant="outlined"
                                                value={inputs.password}
                                                onChange={handleInputChange}
                                            />
                                        </FormControl>
                                        <FormControl className={classes.inputBox}>
                                            <TextField
                                                label="确认密码"
                                                className={classes.textField}
                                                type="password"
                                                name="password"
                                                autoComplete="password"
                                                margin="normal"
                                                variant="outlined"
                                                value={inputs.password}
                                                onChange={handleInputChange}
                                            />
                                        </FormControl>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" fontSize={16}>
                                            <FormControlLabel
                                                value="start"
                                                control={<Checkbox color="primary" />}
                                                label="我已阅读并同意遵守服务条款"
                                                labelPlacement="end"
                                            />
                                        </Box>
                                        <Button variant="contained" color="primary" className={classes.LoginBtn} onClick={handleSubmit}> 注册 </Button>
                                        <Typography color="textPrimary" variant="body2" align="center">已有账号？<a href="javascript:;" onClick={() => setShow(true)}>在此登录</a></Typography>
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