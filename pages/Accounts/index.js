import React from 'react';
import { makeStyles, Container, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, Avatar, CardActions, CardContent, Card } from '@material-ui/core'
import { PersonOutline, LockOpen } from '@material-ui/icons';

import Layout from '../../components/Layouts/index.js'
const useStyles = makeStyles(theme => ({
    headerPart: {
        background: "url('../../images/accounts/star4.jpg') center center",
        width: '100%',
        height: 250,
        marginTop: '60px'
    },
    content: {

    },
    avatar: {
        margin: 10,
        width: 120,
        height: 120,
        margin: '0 auto 20px auto'
    },
    panelContainer: {
        background: 'white',
        borderRadius: "20px",
        margin: '40px auto 0 auto',
        minHeight: '600px',
        paddingTop: '20px'
    },
    left: {
        padding: '20px',
        borderRight: '1px solid rgb(224, 224, 224)',
        minHeight: '500px',
    },
    right: {
        padding: '20px 0 0 30px'
    },
    avatarBox: {
        textAlign: 'center'
    },
    userName: {
        color: '#7f7878',
        fontSize: "20px",
        fontWeight: "bold"
    },
    box: {
        background: '#FBFBFB'
    }
}))
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
function Accounts(props) {
    const classes = useStyles()
    return (
        <Layout>
            <div className={classes.box}>
                <div className={classes.headerPart}>会员中心</div>
                <Container className={classes.panelContainer}>
                    <Grid container justify="space-between" >
                        <Grid item className={classes.left} xs={12} sm={12} md={12} lg={4} xl={4}>
                            <div className={classes.avatarBox}>
                                <Avatar alt="Remy Sharp" src='../../images/accounts/snow1.jpg' className={classes.avatar} />
                                <div className={classes.userName}>
                                    garce_xxx
                                </div>
                            </div>
                            <Card className={classes.root}>
                                <CardContent>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        <ListItemLink href="/accounts/profile">
                                            <ListItemIcon>
                                                <PersonOutline />
                                            </ListItemIcon>
                                            <ListItemText primary="个人资料" />
                                        </ListItemLink>
                                        <Divider />
                                        <ListItemLink href="/accounts/binding">
                                            <ListItemIcon>
                                                <LockOpen />
                                            </ListItemIcon>
                                            <ListItemText primary="绑定服务" />
                                        </ListItemLink>
                                        <Divider />
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item className={classes.right} xs={12} sm={12} md={12} lg={8} xl={8}>
                            {props.children}
                        </Grid>
                    </Grid>

                </Container>
            </div>
        </Layout>
    )
}
export default Accounts