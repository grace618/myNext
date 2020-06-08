import React from 'react';
import Account from '../index'
import { makeStyles, Container, Typography } from '@material-ui/core'
import PasswordComponent from 'components/User/Password'
import { withTranslation } from '../../../i18n'
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
function Profile(props) {
    const classes = useStyles()
    const { t } = props
    return (
        <Account>
            <div className={classes.root}>
                <span className={classes.title}>{t('forget')}</span>
                <Container>
                    <div className={classes.inputEmail}>
                        <Typography gutterBottom variant="body2" color="textPrimary" align="center" className={classes.desc}>{t('forgetTip')}</Typography>
                        <PasswordComponent />
                    </div>
                </Container>
            </div>
        </Account >
    )
}

export default withTranslation('accounts')(Profile);