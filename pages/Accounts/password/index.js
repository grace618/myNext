import React, { useState, useEffect } from 'react'
import { Container, Button, TextField, Typography, makeStyles, Box, FormControl, Snackbar } from '@material-ui/core';
import { useSubmitForm } from 'common/CustomHooks'
import { useSelector } from 'react-redux';
import Layout from '../../../components/Layouts/index.js'
import { resetPassword, sendCaptchaByAuthCode } from 'service/login'
import { getCode } from '../../../utils/index'
import MySnackbarContentWrapper from 'components/SnackbarWrapper'
import { useRouter } from 'next/router'
const crypto = require('crypto')
const useStyles = makeStyles((theme) => ({
    root: {
        background: '#FBFBFB',
        width: '100%',
        height: '100%',
        minHeight: '700px',
        position: 'relative'
    },
    textField1: {
        width: '50%',
        margin: '5% auto',
    },
    textField: {
        width: '50%',
        margin: '1% auto',
    },
    desc: {
        marginBottom: '2%'
    },
    LoginBtn: {
        width: '50%',
        display: 'block',
        margin: '2% auto',
    },
    inputEmail: {
        background: 'white',
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: '20%',
        width: '45%',
        minWidth: '350px',
        height: '71%',
    },
    title: {
        margin: '5% 0 2% 0'
    }
})
)
function getPassword() {
    const classes = useStyles()
    const [authCode, setAuthCode] = useState(null)
    const language = useSelector(state => state.app)
    const [step, setStep] = useState(true)
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }
    const [snackBar, setSnackBar] = useState(initSnackbar)
    const initialFormState = {
        mail: ''
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };
    //发送验证码
    const submitFormData = () => {
        let lang = ''
        if (language.lang == 'en') {
            lang = 'en-US'
        }
        if (language.lang == 'zh') {
            lang = 'zh-CN'
        }
        const data = {
            "mail": inputs.mail,
            "gameId": "100001",
            "type": 0,
            "language": lang
        }
        sendCaptchaByAuthCode(data, authCode).then(res => {
            if (res.code == 0) {
                setStep(false)
            } else {
                getCode(res.code)
            }
        })
    }
    useEffect(() => {
        setAuthCode(window.localStorage.getItem('authCode') || null)
    }, [])
    const { inputs, handleInputChange } = useSubmitForm(initialFormState, submitFormData);

    const initialRegState = {
        mail: '',
        captcha: '',
        password: '',
        gameId: '100001',
        passwordAgain: ''
    }
    //提交
    const submitData = () => {
        const { captcha, password, passwordAgain } = regInputs
        if ((password == '' || passwordAgain == '') || password !== passwordAgain) {
            setSnackBar({ ...snackBar, 'message': '两次输入密码不一致', 'variant': 'warning', 'autoHideDuration': 10000 })
            setOpen(true);
            return false
        }
        let md5 = crypto.createHash('md5')
        md5.update(password)
        var pwd = md5.digest('hex').toUpperCase()
        const data = {
            mail: inputs.mail,
            captcha: captcha,
            password: pwd,
            gameId: '100001'
        }
        resetPassword(data, authCode).then(res => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': '修改成功', 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
                router.push('/')
            }
        })
    }
    const regs = useSubmitForm(initialRegState, submitData);
    let regInputs = regs.inputs
    let handleRegInputChnage = regs.handleInputChange
    let handleRegSubmit = regs.handleSubmit
    return (
        <Layout>
            <div className={classes.root}>
                <Container>
                    <div className={classes.inputEmail}>
                        {/* sendMail */}
                        {
                            step ? (
                                <Box display="flex" alignContent="center" flexDirection="column">
                                    <Typography gutterBottom variant="h5" color="textPrimary" align="center" className={classes.title}>忘记密码?</Typography>
                                    <Typography gutterBottom variant="body1" color="textPrimary" align="center" className={classes.desc}>请输入你的邮箱，若你已设置追回邮箱，密码重置指令会被发送至你的追回邮箱</Typography>
                                    <TextField
                                        id="outlined-email-input"
                                        label="电子邮箱"
                                        className={classes.textField1}
                                        type="email"
                                        name="mail"
                                        margin="normal"
                                        variant="outlined"
                                        size="medium"
                                        value={inputs.mail}
                                        onChange={handleInputChange}
                                    />
                                    <Button variant="contained" color="primary" className={classes.LoginBtn} onClick={submitFormData} size="large"> 发送 </Button>
                                </Box>
                            ) : (
                                    <form className={classes.formData} >
                                        <Typography gutterBottom variant="h5" color="textPrimary" align="center" className={classes.title}>设置新密码</Typography>
                                        <Typography gutterBottom variant="body1" color="textPrimary" align="center" className={classes.desc}>邮箱验证码已下发，请注意查收</Typography>
                                        <Box display="flex" justifyContent="space-betwwen" flexDirection="column">
                                            <FormControl className={classes.getcode}>
                                                <TextField
                                                    label="验证码"
                                                    name="captcha"
                                                    margin="normal"
                                                    size="small"
                                                    className={classes.textField}
                                                    value={regInputs.captcha}
                                                    onChange={handleRegInputChnage}
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <TextField
                                                    label="密码"
                                                    className={classes.textField}
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
                                                    className={classes.textField}
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
                                    </form>
                                )
                        }
                    </div>
                </Container>
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
        </Layout >
    )
}
export default getPassword