import React from 'react';
import { makeStyles, Container, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, Avatar, CardContent, Card } from '@material-ui/core'
import { PersonOutline, LockOpen } from '@material-ui/icons';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import Layout from 'components/Layouts/index.js'
import { withTranslation } from '../../i18n'
const useStyles = makeStyles(theme => ({
    headerPart: {
        background: "url('../../images/accounts/star4.jpg') center center",
        width: '100%',
        height: 250,
        marginTop: '60px'
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
    },
    card: {
        minHeight: '500px',
    },
    right: {
        padding: '20px 0 0 1%',
        boxSizing: 'border-box'
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
        background: '#FBFBFB',
        height: '100%',
        paddingBottom: '45px'
    },
    title: {
        color: 'white',
        fontSize: "26px",
        padding: '120px 0 0 0',
        fontWeight: 'bold',
        fontSize: '34px'
    },
    textSize: {
        fontSize: '18px'
    }
}))
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function Accounts(props) {
    const classes = useStyles()
    const user = useSelector(state => state.app)
    const { t } = props
    return (
        <Layout>

            <div className={classes.box}>
                <div className={classes.headerPart}>
                    <Container><div className={classes.title}> {t('member')}</div></Container>
                </div>
                <Container className={classes.panelContainer}>
                    <Grid container justify="space-between" >
                        <Grid item className={classes.left} xs={12} sm={12} md={12} lg={4} xl={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <div className={classes.avatarBox}>
                                        <Avatar alt="Remy Sharp" src='../../images/accounts/snow1.jpg' className={classes.avatar} />
                                        <div className={classes.userName}> {user.uid} </div>
                                    </div>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        <ListItemLink href="/accounts/profile">
                                            <ListItemIcon>
                                                <PersonOutline />
                                            </ListItemIcon>
                                            <ListItemText primary={t('userinfo')} className={classes.textSize} />
                                        </ListItemLink>
                                        <Divider />
                                        <ListItemLink href="/accounts/binding">
                                            <ListItemIcon>
                                                <LockOpen />
                                            </ListItemIcon>
                                            <ListItemText primary={t('bindingService')} className={classes.textSize} />
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
export default withTranslation('accounts')(Accounts);