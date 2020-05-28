import React from 'react';
import Account from '../index'
import { makeStyles, Container, Typography } from '@material-ui/core'
import PasswordComponent from '../../../components/User/Password'
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        minHeight: '700px',
        position: 'relative'
    },
    title: {
        fontWeight: '600',
        color: 'rgb(100, 101, 105)'
    },
    desc: {
        marginBottom: '2%'
    }
}));
function Profile() {
    const classes = useStyles()
    return (
        <Account>
            <div className={classes.root}>
                <span className={classes.title}>修改密码</span>
                <Container>
                    <div className={classes.inputEmail}>
                        <Typography gutterBottom variant="body2" color="textPrimary" align="center" className={classes.desc}>请输入你的邮箱，若你已设置追回邮箱，密码重置指令会被发送至你的追回邮箱</Typography>
                        <PasswordComponent />
                    </div>
                </Container>
            </div>
        </Account >
    )
}
export default Profile