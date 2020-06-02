import React, { useState, useEffect } from 'react'
import { Button, TextField, Typography, makeStyles, Box, FormControl, Snackbar } from '@material-ui/core';
import { useSubmitForm } from 'common/CustomHooks'
import { useSelector } from 'react-redux';
import { resetPassword, sendCaptchaByAuthCode } from 'service/login'
import MySnackbarContentWrapper from 'components/SnackbarWrapper'
import { useRouter } from 'next/router'
import { withTranslation } from '../../../i18n'
const crypto = require('crypto')
const useStyles = makeStyles((theme) => ({
    textField1: {
        width: '50%',
        margin: '5% auto',
    },
    textField: {
        width: '50%',
        margin: '1% auto',
    },
    LoginBtn: {
        width: '50%',
        display: 'block',
        margin: '2% auto',
    },
    tips: {
        fontSize: '14px',
        color: '#797676'
    }
})
)
function PasswordComponent() {
    const classes = useStyles()
    const user = useSelector(state => state.app)
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
    //发送验证码
    const submitFormData = () => {
        let lang = user.lang == 'en' ? 'en-US' : 'zh-CN'
        if (!checkEmail(inputs.mail)) return false
        const data = {
            "mail": inputs.mail,
            "gameId": "100001",
            "type": 0,
            "language": lang
        }

        sendCaptchaByAuthCode(data, user.authcode).then(res => {
            if (res.code == 0) {
                setStep(false)
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
            }
        })
    }

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
            mail: inputs.mail,
            captcha: captcha,
            password: pwd,
            gameId: '100001'
        }
        resetPassword(data, user.authcode).then(res => {
            if (res.code == 0) {
                setSnackBar({ ...snackBar, 'message': '修改成功', 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
                router.push('/')
            } else {
                setSnackBar({ ...snackBar, 'message': res.msg, 'variant': 'warning', 'autoHideDuration': 10000 })
                setOpen(true);
            }
        })
    }
    const regs = useSubmitForm(initialRegState, submitData);
    let regInputs = regs.inputs
    let handleRegInputChnage = regs.handleInputChange
    return (
        <div>
            {/* sendMail */}
            {
                step ? (
                    <Box display="flex" alignContent="center" flexDirection="column">
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
                            <Typography gutterBottom variant="body1" color="textPrimary" align="center" className={classes.tips}>设置新密码,邮箱验证码已下发，请注意查收</Typography>
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
        </div >
    )
}
export default withTranslation('password')(PasswordComponent);