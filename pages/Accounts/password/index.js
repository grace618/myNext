import React from 'react'
import { makeStyles, Container, Typography } from '@material-ui/core'
import Layout from 'components/Layouts/index.js'
import PasswordComponent from 'components/User/Password'
import { withTranslation } from '../../../i18n'
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
function ResetPassword(props) {
    const classes = useStyles()
    const { t } = props
    return (
        <Layout>
            <div className={classes.root}>
                <Container>
                    <div className={classes.inputEmail}>
                        <Typography gutterBottom variant="h5" color="textPrimary" align="center" className={classes.title}>{t('forget')}?</Typography>
                        <Typography gutterBottom variant="body1" color="textPrimary" align="center" className={classes.desc}>{t('forgetTip')}</Typography>
                        <PasswordComponent />
                    </div>
                </Container>
            </div>
        </Layout>
    )
}
export default withTranslation('accounts')(ResetPassword);