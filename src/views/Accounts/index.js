import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Container, Typography, Grid, Button, Box, List, ListItem, ListItemText, ListItemIcon, Divider, Avatar, TextField } from '@material-ui/core'

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import star4 from 'assets/imgs/accounts/star4.jpg'

const useStyles = makeStyles(theme => ({
    headerPart: {
        background: `url(${star4}) center center`,
        width: '100%',
        height: 250,
        marginTop: '60px'
    },
    content: {
        minHeight: '600px'
    },
    avatar: {
        margin: 10,
        width: 100,
        height: 100,
    },


}))
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
function Home() {
    const classes = useStyles()




    return (
        <div>
            <div className={classes.headerPart}>
                会员中心
            </div>
            {/* part1 */}
            <div className={classes.content}>
                <Container className={classes.panelContainer}>
                    <Grid container justify="space-between" >
                        <Grid item className={classes.left} xs={12} sm={12} md={12} lg={4} xl={4}>
                            <div>
                                <Avatar alt="Remy Sharp" src={require('assets/imgs/accounts/avatar.jpg')} className={classes.avatar} />
                                <div>
                                    <div> Nameaby [登出]</div>
                                    <div><Button>修改资料</Button></div>
                                    <div>上次登录ip:192.168.0.1</div>
                                </div>
                            </div>

                            <List component="nav" aria-label="secondary mailbox folders">
                                <ListItemLink href="#profile">
                                    <ListItemIcon>
                                        <DraftsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="个人资料" />
                                </ListItemLink>
                                <Divider />
                                <ListItemLink href="#binding">
                                    <ListItemIcon>
                                        <DraftsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="绑定服务" />
                                </ListItemLink>
                                <Divider />
                            </List>
                        </Grid>
                        <Grid item container direction="column" justify="center" className={classes.right} xs={12} sm={12} md={12} lg={8} xl={8}>
                            <Box width="100%">
                                更换信息
                                <Avatar alt="Remy Sharp" src={require('assets/imgs/accounts/avatar.jpg')} className={classes.avatar} />更换头像

                                    <form>
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
                                        <TextField
                                            id="outlined-email-input"
                                            label="账号"
                                            className={classes.textField}
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <TextField
                                            id="outlined-email-input"
                                            label="名"
                                            className={classes.textField}
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <TextField
                                            id="outlined-email-input"
                                            label="姓"
                                            className={classes.textField}
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <Button>设置</Button>
                                    </Grid>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div >
    );
}

export default Home;
