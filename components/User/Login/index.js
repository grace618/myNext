import React, { useState } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import Phone from 'react-phone-number-input'
import { withTranslation, i18n } from '../../../i18n'
const crypto = require('crypto')

import { Grid, Button, TextField, Checkbox, Box, FormControlLabel, Typography, FormControl, Snackbar, Slide } from '@material-ui/core';
import { Save as SaveIcon, Clear, Facebook } from '@material-ui/icons';

import { makeStyles } from '@material-ui/styles'
import MySnackbarContentWrapper from 'components/SnackbarWrapper'
import { useSubmitForm } from 'common/CustomHooks'
import { sendPhoneCode, sendCaptchaByAuthCode } from 'service/login'
import { getUserInfo, register } from 'store/modules/app.js';

const useStyles = makeStyles(theme => ({
    loginBox: {
        width: '90%',
        maxWidth: '820px',
        background: 'white',
        position: 'fixed',
        top: '15%',
        right: 0,
        left: 0,
        margin: 'auto',
        zIndex: '999',
        padding: '2% 3% 5% 3%',
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
        '& *': {
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
    },
    phoneCode: {
        height: '58px',
        '& input': {
            height: '58px',
        }
    }
}))
/*global FB*/
function LoginComponent(props) {
    const classes = useStyles(props)
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }

    const [snackBar, setSnackBar] = useState(initSnackbar)
    let { show, t } = props
    const [changePanel, setShow] = useState(show)
    const user = useSelector(state => state.app)
    const [open, setOpen] = useState(false);
    let [time, setTime] = useState(30)
    let [time1, setTime1] = useState(30)
    const [isSend, setSend] = useState(false)
    const [isSend1, setSend1] = useState(false)
    const [phoneValue, setPhoneValue] = useState(null)
    const dispatch = useDispatch();


    const loginInfo = () => {
        setLoginWay(!LoginWay)
    }
    const sendCode = () => {
        const data = {
            uluAccount: phoneValue,
            gameId: '100001'
        }
        sendPhoneCode(data, user.authcode).then(res => {
            if (res.code != 0) {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
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
    const checkEmail = (email) => {
        setSnackBar(initSnackbar)
        const isEmail = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(email)
        if (email === '' || !isEmail) {
            setSnackBar({ ...snackBar, 'message': t('emailTip'), 'variant': 'warning', 'autoHideDuration': 5000 })
            setOpen(true);
            return false
        }
        return true
    }

    const submitFormData = () => {
        setSnackBar(initSnackbar)
        const { password, email, code } = inputs
        let md5 = crypto.createHash('md5')
        md5.update(password)
        var pwd = md5.digest('hex').toUpperCase()
        let data = {}
        if (LoginWay) {
            if (!checkEmail(email)) return false
            if (password === '') {
                setSnackBar({ ...snackBar, 'message': t('passwordTip'), 'variant': 'warning', 'autoHideDuration': 5000 })
                setOpen(true);
                return false
            }
            data = { loginType: 2, accessId: '', accessToken: '', uluAccount: email, password: pwd, gameId: '100001' }
        } else {
            if (phoneValue === '' || code === '') {
                setSnackBar({ ...snackBar, 'message': t('phoneEmail'), 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
                return false
            }
            data = { loginType: 2, accessId: '', accessToken: '', uluAccount: phoneValue, password: code, gameId: '100001' }
        }
        loginByWay(data)
    }
    const loginByWay = (data) => {
        dispatch(getUserInfo(data, user.authcode)).then((res) => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'success', 'autoHideDuration': 1500 })
                setOpen(true);
                props.closeUp()
                setInputs(initialFormState)
                location.reload()
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
            }
        });
    }
    const { inputs, setInputs, handleInputChange, handleSubmit } = useSubmitForm(initialFormState, submitFormData);
    /*register*/
    const initialRegState = {
        mail: '',
        password: '',
        captcha: '',
        gameId: 1,
        passwordAgain: '',
        checkedA: false
    }
    const submitRegData = () => {
        const { password, passwordAgain, mail, captcha, checkedA } = regInputs
        setSnackBar(initSnackbar)
        if (!checkEmail(mail)) return false
        if (password.length < 8) {
            setSnackBar({ ...snackBar, 'message': t('tip'), 'variant': 'warning', 'autoHideDuration': 5000 })
            setOpen(true);
            return false
        }
        if ((password == '' || passwordAgain == '') || (password !== passwordAgain)) {
            setSnackBar({ ...snackBar, 'message': t('pwdComfirm'), 'variant': 'warning', 'autoHideDuration': 5000 })
            setOpen(true);
            return false
        }
        if (!checkedA) {
            setSnackBar({ ...snackBar, 'message': t('readTip'), 'variant': 'warning', 'autoHideDuration': 1500 })
            setOpen(true);
            return false
        }
        let md5 = crypto.createHash('md5')
        md5.update(password)
        var pwd = md5.digest('hex').toUpperCase()
        const data = {
            "mail": mail,
            "password": pwd,
            "gameId": '100001',
            "captcha": captcha
        }
        dispatch(register(data, user.authcode)).then((res) => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
                props.closeUp()
                location.reload()
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
            }
        });
    }
    const sendCaptcha = () => {
        let lang = i18n.language == 'en' ? 'en-US' : 'zh-CN'
        const data = {
            "mail": regInputs.mail,
            "gameId": "100001",
            "type": 1,
            "language": lang
        }
        sendCaptchaByAuthCode(data, user.authcode).then(res => {
            if (res.code != 0) {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 1500 })
                setOpen(true);
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

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };
    /*facebook*/
    const facebookLogin = () => {
        FB.login(function (response) {
            if (response.status === 'connected') {
                let accessId = response.authResponse.userID
                let accessToken = response.authResponse.accessToken
                const data = { loginType: 3, accessId, accessToken, uluAccount: '', password: '', gameId: '100001' }
                loginByWay(data)
            }
            FB.logout(function () {
                console.log('User signed out.')
            })
        })
    }
    //google login
    const googleLogin = () => {
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
                const data = { loginType: 4, accessId, accessToken, uluAccount: '', password: '', gameId: '100001' }
                loginByWay(data)
                auth2.signOut().then(function () {
                    console.log('User signed out.')
                })
            })
        })
    }
    return (
        <div>
            <div className={classes.loginBox}>
                <span className={classes.close} onClick={() => { props.closeUp() }}><Clear color="primary" /></span>
                <div className={classes.login}>ULUGAMES</div>
                <Grid container >
                    <Grid item container direction="column" lg={6} xs={12} md={6} sm={6} xl={6} className={classes.left}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className={`${classes.button} ${classes.button1}`}
                            startIcon={<Facebook />}
                            onClick={facebookLogin}
                        >
                            {t('facebook')}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={`${classes.button} ${classes.buttonGoogle}`}
                            startIcon={<SaveIcon />}
                            onClick={googleLogin}
                        >
                            {t('google')}
                        </Button>
                    </Grid>
                    <Grid item lg={6} xs={12} md={6} sm={6} xl={6} className={classes.right}>
                        {
                            changePanel ? (
                                <form className={classes.formData} onSubmit={handleSubmit}>
                                    {/* login by email */}
                                    {
                                        LoginWay && <div>
                                            <FormControl className={classes.inputBox}>
                                                <TextField
                                                    id="outlined-email-input"
                                                    label={t('email')}
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
                                                    label={t('password')}
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
                                                <Phone
                                                    placeholder="Enter phone number"
                                                    className={classes.phoneCode}
                                                    label={t('phone')}
                                                    name="phoneNumber"
                                                    margin="normal"
                                                    variant="outlined"
                                                    country="US"
                                                    value={phoneValue}
                                                    defaultCountry="CN"
                                                    onChange={setPhoneValue}
                                                />
                                            </FormControl>
                                            <Box display="flex" justifyContent="space-betwwen">
                                                <FormControl className={classes.getcode}>
                                                    <TextField label={t('code')} name="code" margin="normal" variant="outlined" value={inputs.code} onChange={handleInputChange} />
                                                </FormControl>
                                                <FormControl className={classes.sendCaptcha}>
                                                    <Button variant="outlined" color="secondary" className={classes.sendcode} onClick={sendCode}> {isSend ? time : t('send')}</Button>
                                                </FormControl>
                                            </Box>
                                        </div>
                                    }
                                    <Box display="flex" justifyContent="space-between" alignItems="center" fontSize={16} className={classes.info}>
                                        <span onClick={loginInfo}> {LoginWay ? t('phoneLogin') : t('emailLogin')}</span>
                                        <Link href="/Accounts/password"><a>{t('forgetPassword')}</a></Link>
                                    </Box>
                                    <Button variant="contained" color="primary" className={classes.LoginBtn} onClick={handleSubmit}> {t('sign')} </Button>
                                    <Typography color="textPrimary" variant="body2" align="center">{t('ulu')}？<span onClick={() => setShow(false)} className={classes.asLink}>{t('register')}</span></Typography>
                                </form>) :
                                (
                                    // register
                                    <form className={classes.formData} onSubmit={handleRegSubmit}>
                                        <FormControl className={classes.inputBox}>
                                            <TextField
                                                label={t('email')}
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
                                                    label={t('code')}
                                                    name="captcha"
                                                    margin="normal"
                                                    variant="outlined"
                                                    size="small"
                                                    value={regInputs.captcha}
                                                    onChange={handleRegInputChnage}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.sendCaptcha}>
                                                <Button variant="outlined" color="secondary" className={classes.sendcode2} onClick={sendCaptcha}> {isSend1 ? time1 : t('send')}</Button>
                                            </FormControl>
                                        </Box>
                                        <FormControl className={classes.inputBox}>
                                            <TextField
                                                label={t("password")}
                                                className={classes.textField}
                                                type="password"
                                                name="password"
                                                autoComplete="password"
                                                margin="normal"
                                                size="small"
                                                variant="outlined"
                                                value={regInputs.password}
                                                onChange={handleRegInputChnage}
                                                helperText={t("tip")}
                                            />
                                        </FormControl>
                                        <FormControl className={classes.inputBox}>
                                            <TextField
                                                label={t('comfirm')}
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
                                                control={<Checkbox checked={regInputs.checkedA} name="checkedA" fontSize="small" className={classes.checked} onChange={handleRegInputChnage} />}
                                                label={t("read")}
                                            />
                                        </Box>
                                        <Button variant="contained" color="primary" className={classes.LoginBtn} onClick={submitRegData}> {t('register')} </Button>
                                        <Typography color="textPrimary" variant="body2" align="center">{t('accounts')}？<span onClick={() => setShow(true)} className={classes.asLink}>{t('login')}</span></Typography>
                                    </form>)
                        }
                    </Grid>
                </Grid>
            </div >
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
            <div className={classes.mask}></div>
        </div>
    )
}
LoginComponent.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('user')(LoginComponent);