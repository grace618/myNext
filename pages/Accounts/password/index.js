import React from 'react'
import { makeStyles, Container, Typography } from '@material-ui/core'
import Layout from '../../../components/Layouts/index.js'
import PasswordComponent from '../../../components/User/Password'
const useStyles = makeStyles(theme => ({
    root: {
        background: '#FBFBFB',
        width: '100%',
        height: '100%',
        minHeight: '700px',
        position: 'relative'
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
        padding: '40px 10px',
        boxSizing: 'border-box',
        height: '71%',
    },
    title: {
        fontWeight: '600',
        color: 'rgb(100, 101, 105)'
    },
    desc: {
        marginBottom: '2%'
    },
}));
function ResetPassword() {
    const classes = useStyles()

    return (
        <Layout>
            <div className={classes.root}>
                <Container>
                    <div className={classes.inputEmail}>
                        <Typography gutterBottom variant="h5" color="textPrimary" align="center" className={classes.title}>忘记密码?</Typography>
                        <Typography gutterBottom variant="body1" color="textPrimary" align="center" className={classes.desc}>请输入你的邮箱，若你已设置追回邮箱，密码重置指令会被发送至你的追回邮箱</Typography>
                        <PasswordComponent />
                    </div>
                </Container>
            </div>
        </Layout>
    )
}
export default ResetPassword