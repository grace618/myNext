import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, IconButton, Hidden, MenuItem, Menu, Snackbar } from '@material-ui/core';
import { Language, Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles'
import { setLang } from 'store/modules/app'
import { withTranslation } from '../../../i18n'
import MySnackbarContentWrapper from 'components/SnackbarWrapper'
import { logout, getInitConfigByWeb } from 'service/login'
import LoginComponent from '../../User/Login'
import { setCode } from 'store/modules/app'
import Cookies from 'js-cookie'
const useStyles = makeStyles(theme => ({
    root: props => ({
        backgroundColor: props.backgroundColor ? props.backgroundColor : theme.palette.primary.main,
        width: '100%',
        height: theme.spacing(10),
        position: 'fixed',
        top: 0,
        zIndex: '5',
        '-webkit-transition': 'height .4s ease, opacity .3s ease',
        '-o-transition': 'height .4s ease, opacity .3s ease',
        'transition': 'height .4s ease, opacity .3s ease'
        // position: '-webkit-sticky',
        // position: 'sticky',
        // top: 0
    }),
    fixed: {
        position: 'fixed !important',
        backgroundColor: theme.palette.primary.main + '!important',
        zIndex: '2',
        height: '60px !important',
    },
    container: {
        height: '100%',
    },
    content: {
        height: '100%'
    },
    navLink: {
        '&>*': {
            color: theme.palette.white,
            margin: '0 10px',
            fontFamily: "Microsoft YaHei",
            fontSize: 12,
            cursor: 'pointer'
        }
    },
    svg: {
        color: 'white'
    }

}))
const options = [{
    'value': 'zh',
    'name': '简体中文'
}, {
    'value': 'en',
    'name': 'English'
}]


const menu = [{
    'name': 'publishing',
}, {
    'name': 'GameList',
}, {
    'name': 'jobs',
},
{
    'name': 'login'
}, {
    'name': 'register'
}]
function Topbar(props) {
    const classes = useStyles(props)
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [needFixed, setNeedFixed] = useState(false);
    const { t, i18n } = props
    const [show, setShow] = useState(false)
    const [LoginPup, setLoginPup] = useState(false)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.app)
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }
    const [snackBar, setSnackBar] = useState(initSnackbar)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleLanguage = (event) => {
        setAnchorElMenu(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleSelect = (event, value) => {
        if (value === 'zh' || value === 'en') {
            dispatch(setLang({ lang: value }))
            i18n.changeLanguage(value);
        }
        setAnchorElMenu(null);
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };

    const handleLogin = (index) => {
        if (index == 3) {
            setShow(true)
        } else {
            setShow(false)
        }
        setLoginPup(true)
    }
    const closePup = () => {
        setLoginPup(false)
    }

    /* login*/
    const getInit = async () => {
        const data = {
            "channelId": 9,
            "timestamp": new Date().getTime(),
            "gameId": 100001,
            "platform": 3,
            "channelTag": 0,
            "env": 3,
            "language": user.lang,
            "signature": "DFD29F8E1D150AB53830FB62B46E581C",
        }

        const res = await getInitConfigByWeb(data)
        if (res.code == 0) {
            dispatch(setCode({ authcode: res.data.authCode }))
        }
    }
    /**sign out */
    const signout = () => {
        logout({ gameId: '100001' }, user.token).then(res => {
            if (res.code == 0) {
                setOpen(true);
                setSnackBar({ ...snackBar, 'message': '退出成功', 'variant': 'success', 'autoHideDuration': 1500 });
                Cookies.remove('token')
                Cookies.remove('uid')
                Cookies.remove('authCode')
                location.reload();
            }
        })
    }
    useEffect(() => {
        getInit()
    }, [])
    useEffect(() => {
        const hanldeScroll = () => {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            scrollTop > 0 ? setNeedFixed(true) : setNeedFixed(false)
        }
        window.addEventListener('scroll', hanldeScroll)
        return () => {
            window.removeEventListener('scroll', hanldeScroll)
        };
    })
    return (
        <div id="menu" className={`${classes.root} ${needFixed ? classes.fixed : ''}`}>
            <Container className={classes.container}>
                <Grid container alignItems="center" justify="space-between" className={classes.content}>
                    <Hidden mdUp>
                        {/* 小屏 */}
                        <Grid>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MenuIcon className={classes.svg} />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {
                                    menu.map((option, index) => {
                                        if (index < 3) {
                                            return (<MenuItem key={option.name} onClick={handleClose}> <Link href={`/${option.name}`} ><a>{t(option.name)}</a></Link></MenuItem>)
                                        } else if (!user.uid) {
                                            return (
                                                <MenuItem key={option.name} onClick={handleClose}>
                                                    <span key={option.name} onClick={() => handleLogin(index)}>{t(option.name)}</span>
                                                </MenuItem>
                                            )
                                        } else {
                                            <>
                                                <MenuItem>
                                                    <a href="/accounts/profile">{user.uid}</a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <span className={classes.asLink} onClick={signout}>退出</span>
                                                </MenuItem>
                                            </>
                                        }
                                    })
                                }
                            </Menu>
                        </Grid>
                    </Hidden>
                    <Grid item>
                        <Link href="/" ><img src="../../images/logo.png" alt="uluLogo" /></Link>
                    </Grid>
                    {/* 大屏 */}
                    <Grid item className={classes.navLink}>
                        <Hidden only={['sm', 'xs']}>
                            {
                                menu.map((option, index) => {
                                    //未登录
                                    if (index < 3) {
                                        return (<Link href={`/${option.name}`} key={option.name}><a>{t(option.name)}</a></Link>)
                                    } else if (!user.uid) {
                                        return (
                                            <span key={option.name} onClick={() => handleLogin(index)}>{t(option.name)}</span>
                                        )
                                    } else {
                                        <>
                                            <a href="/accounts/profile">{user.uid}</a>
                                            <span className={classes.asLink} onClick={signout}>退出</span>
                                        </>
                                    }
                                })
                            }
                        </Hidden>
                        <IconButton aria-label="select" aria-controls="simple-menu" aria-haspopup="true" onClick={handleLanguage}>
                            <Language color="primary" className={classes.svg} />
                        </IconButton>
                        <Menu anchorEl={anchorElMenu} keepMounted open={Boolean(anchorElMenu)} onClose={handleSelect}>
                            {
                                options.map(option => (
                                    <MenuItem onClick={event => handleSelect(event, option.value)} key={option.value}>{option.name}</MenuItem>
                                ))
                            }
                        </Menu>
                    </Grid>
                </Grid>
            </Container >
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
            {
                LoginPup && <LoginComponent show={show} closeUp={closePup} />
            }
        </div >
    )
}
Topbar.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('common')(Topbar);