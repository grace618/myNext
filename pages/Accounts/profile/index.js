import React, { useState, useEffect } from 'react';
import Account from '../index'
import { makeStyles, Grid, Avatar, TextField, Container, Button, Typography, Box, FormControl, Snackbar } from '@material-ui/core'
import { useSubmitForm } from 'common/CustomHooks'
import { useSelector } from 'react-redux';
import { resetPassword, sendBindCaptcha } from 'service/login'
// import { getCode } from '../../../utils/index'
import MySnackbarContentWrapper from 'components/SnackbarWrapper'
import { useRouter } from 'next/router'
const crypto = require('crypto')
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
    LoginBtn: {
        margin: '10px 0'
    },
    formData: {
        width: '50%',
        margin: '0 auto',
        minWidth: '350px'
    },
    root: {
        background: '#FBFBFB',
        width: '100%',
        height: '100%',
        minHeight: '700px',
        position: 'relative'
    },
    desc: {
        marginBottom: '2%'
    },
    sendcode: {
        width: '100%',
        boxSizing: 'border-box',
        margin: '0 0 0 10px'
    },
    getcode: {
        width: '66%',
    },
    textField: {
        width: '100%',
        margin: '1% auto',
    },
    inputBox: {
        width: '100%'
    },
    title: {
        fontWeight: '600',
        color: 'rgb(100, 101, 105)'
    }
}));
function Profile() {
    const classes = useStyles()
    const [authCode, setAuthCode] = useState(null)
    const language = useSelector(state => state.app)
    const [open, setOpen] = useState(false);
    const router = useRouter();
    let [time, setTime] = useState(30)
    const [token, setToken] = useState(null)
    const [isSend, setSend] = useState(false)
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }
    const [snackBar, setSnackBar] = useState(initSnackbar)
    useEffect(() => {
        setAuthCode(window.localStorage.getItem('authCode') || null)
        setToken(window.localStorage.getItem('token') || null)
    }, [])

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };
    //发送验证码
    const sendCaptcha = () => {
        let lang = ''
        if (language.lang == 'en') {
            lang = 'en-US'
        }
        if (language.lang == 'zh') {
            lang = 'zh-CN'
        }
        if (!checkEmail(regInputs.uluAccount)) return false
        const data = {
            "uluAccount": regInputs.uluAccount,
            "gameId": "100001",
            "type": 2,
            "language": lang
        }
        sendBindCaptcha(data, token).then(res => {
            if (res.code != 0) {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 5000 })
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

    const initialRegState = {
        uluAccount: '',
        captcha: '',
        password: '',
        gameId: '100001',
        passwordAgain: ''
    }

    //提交
    const checkEmail = (email) => {
        setSnackBar(initSnackbar)
        const isEmail = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(email)
        if (email === '' || !isEmail) {
            setSnackBar({ ...snackBar, 'message': '请输入合理的邮箱', 'variant': 'warning', 'autoHideDuration': 5000 })
            setOpen(true);
            return false
        }
        return true
    }
    const submitData = () => {
        const { captcha, password, passwordAgain } = regInputs
        if (!checkEmail(regInputs.uluAccount)) return false
        if (captcha == '') {
            setSnackBar({ ...snackBar, 'message': '请输入验证码', 'variant': 'warning', 'autoHideDuration': 10000 })
            setOpen(true);
            return false
        }
        if (password.length < 8) {
            setSnackBar({ ...snackBar, 'message': '请输入8-20位字母 (区别大小写)、数字或符号', 'variant': 'warning', 'autoHideDuration': 5000 })
            setOpen(true);
            return false
        }
        if ((password == '' || passwordAgain == '') || password !== passwordAgain) {
            setSnackBar({ ...snackBar, 'message': '两次输入密码不一致', 'variant': 'warning', 'autoHideDuration': 10000 })
            setOpen(true);
            return false
        }
        let md5 = crypto.createHash('md5')
        md5.update(password)
        var pwd = md5.digest('hex').toUpperCase()
        const data = {
            mail: regInputs.uluAccount,
            captcha: captcha,
            password: pwd,
            gameId: '100001'
        }
        resetPassword(data, authCode).then(res => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': '修改成功', 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
                location.reload()
            }
        })
    }
    const regs = useSubmitForm(initialRegState, submitData);
    let regInputs = regs.inputs
    let handleRegInputChnage = regs.handleInputChange
    let handleRegSubmit = regs.handleSubmit
    return (
        <Account>
            <span className={classes.title}>修改密码</span>
            < form className={classes.formData} >
                <FormControl className={classes.inputBox}>
                    <TextField
                        id="outlined-email-input"
                        label="电子邮箱"
                        type="email"
                        name="uluAccount"
                        margin="normal"
                        size="small"
                        className={classes.textField}
                        value={regInputs.uluAccount}
                        onChange={handleRegInputChnage}
                    />
                </FormControl>
                <Box display="flex" justifyContent="space-betwwen" alignItems="baseline">
                    <FormControl className={classes.getcode}>
                        <TextField label="验证码"
                            name="captcha"
                            margin="normal"
                            size="small"
                            value={regInputs.captcha}
                            onChange={handleRegInputChnage} />
                    </FormControl>
                    <FormControl className={classes.sendCaptcha}>
                        <Button variant="outlined" color="secondary" className={classes.sendcode} onClick={sendCaptcha}> {isSend ? time : '发送验证码'}</Button>
                    </FormControl>
                </Box>
                <Box display="flex" justifyContent="space-betwwen" flexDirection="column">
                    <FormControl>
                        <TextField
                            label="密码"
                            type="password"
                            name="password"
                            autoComplete="password"
                            margin="normal"
                            size="small"
                            value={regInputs.password}
                            onChange={handleRegInputChnage}
                            helperText="请输入8-20位字母 (区别大小写)、数字或符号"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="确认密码"
                            type="password"
                            name="passwordAgain"
                            autoComplete="passwordAgain"
                            margin="normal"
                            size="small"
                            value={regInputs.passwordAgain}
                            onChange={handleRegInputChnage}
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" className={classes.LoginBtn} onClick={submitData} size="large"> 完成 </Button>
                </Box>
            </form >
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
        </Account >
    )
}
export default Profile