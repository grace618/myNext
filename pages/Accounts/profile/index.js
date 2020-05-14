import React from 'react';
import Account from '../index'
import { makeStyles, Grid, Avatar, TextField, Box, Button } from '@material-ui/core'

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
        width: '100%',
        boxSizing: 'border-box',
        margin: '20px 0 10px 0',
        display: 'block',
        fontSize: '24px'
    },
}))
function Profile() {
    const classes = useStyles()
    return (
        <Account>
            <Box width="100%">
                默认头像
            <Avatar alt="Remy Sharp" src="../../images/accounts/snow1.jpg" className={classes.avatar} />
                <form>
                    <p>修改密码</p>
                    <Grid container direction="column">
                        <TextField
                            id="outlined-email-input"
                            label="用户名"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-email-input"
                            label="邮箱"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button variant="contained" color="primary" className={classes.LoginBtn} > 修改</Button>
                    </Grid>
                </form>
            </Box>
        </Account>
    )
}
export default Profile