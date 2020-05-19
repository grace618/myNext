import React, { useState, useEffect } from 'react'
import { Container, Grid, Button, TextField, Typography, makeStyles, Box, FormControl } from '@material-ui/core';
import { useSubmitForm } from 'common/CustomHooks'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/Layouts/index.js'

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#FBFBFB',
        width: '100%',
        height: '100%',
        minHeight: '700px',
        position: 'relative'
    },
    textField1: {
        width: '60%',
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
    const [isSend, setSend] = useState(false)
    const [isSend1, setSend1] = useState(false)
    const [step, setStep] = useState(false)
    const initialFormState = {
        email: ''
    }
    const submitFormData = () => {
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
    useEffect(() => {
        setAuthCode(window.localStorage.getItem('authCode') || null)
    }, [])
    const { inputs, handleInputChange } = useSubmitForm(initialFormState, submitFormData);
    const initialRegState = {
        mail: '',
        gameId: '100001',
        type: 1,
    }
    const submitData = () => {
        sendCaptchaByAuthCode(data, authCode).then(res => {
            if (res.code == 0) {

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
                                        name="email"
                                        autoComplete="email"
                                        margin="normal"
                                        variant="outlined"
                                        size="large"
                                        value={inputs.email}
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
                                                    name="code"
                                                    margin="normal"
                                                    size="small"
                                                    className={classes.textField}
                                                    value={regInputs.code}
                                                    onChange={handleRegInputChnage}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.inputBox}>
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
                                            <FormControl className={classes.inputBox}>
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
        </Layout >
    )
}
export default getPassword