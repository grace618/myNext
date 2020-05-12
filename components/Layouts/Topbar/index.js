import React, { useState, useEffect } from 'react';
import { withTranslation } from '../../../i18n'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Container, Grid, IconButton, Hidden, MenuItem, Menu, Button, TextField, Checkbox, Box, FormControlLabel, Typography } from '@material-ui/core';
import { Language, Menu as MenuIcon, Save as SaveIcon, Clear } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux';
import { language } from 'store/modules/app'


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
        '& a': {
            color: theme.palette.white,
            margin: '0 10px',
            fontFamily: "Microsoft YaHei",
            fontSize: 12
        }
    },
    svg: {
        color: 'white'
    },
    loginBox: {
        width: '820px',
        height: '550px',
        background: 'white',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 'auto',
        zIndex: '999',
        padding: '30px 45px',
        boxSizing: 'border-box',
    },
    login: {
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: 'bold',
        padding: '10px 0',
        color: '#444444'
    },
    button: {
        width: '315px',
        boxSizing: 'border-box'
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        cursor: 'pointer',
        '& svg': {
            fontSize: '36px'
        }
    },
    mask: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '888',
        background: 'rgba(0, 0, 0, 0.7)',
    },
    left: {
        marginTop: '60px',
        height: '200px'
    },
    right: {
        marginTop: '30px',
    },
    buttonColor: {
        background: '#7FC75A'
    },
    buttonGoogle: {
        background: '#FFC107'
    },
    textField: {
        width: 384,
        boxSizing: 'border-box'
    },
    LoginBtn: {
        width: 384,
        boxSizing: 'border-box',
        margin: '20px 0 10px 0',
        display: 'block',
        fontSize: '24px'
    }

}))
const options = [{
    'value': 'cn',
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
    const dispatch = useDispatch();


    /** */
    let [state, setState] = useState({})
    let [show, setShow] = useState(false)
    let [LoginPup, setLoginPup] = useState(false)
    const handleChange = () => {

    }
    const closePup = () => {
        setLoginPup(false)
    }
    const handleLogin = (index) => {
        if (index == 3) {
            setShow(true)
        } else {
            setShow(false)
        }
        setLoginPup(true)
    }
    /** */

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
        if (value === 'cn' || value === 'en') {
            i18n.changeLanguage(value);
            dispatch(language({ lang: value }))
        }
        setAnchorElMenu(null);
    }

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
                                        } else {
                                            return (<MenuItem key={option.name} onClick={handleClose}><Link key={option.name} href={`/${option.name}`} ><a onClick={() => handleLogin(index)}>{t(option.name)}</a></Link></MenuItem>)
                                        }
                                    })
                                }
                            </Menu>
                        </Grid>
                    </Hidden>
                    <Grid item>
                        <Link href="/" ><img src="../../images/logo.png" alt="uluLogo" /></Link>
                    </Grid>
                    <Grid item className={classes.navLink}>
                        <Hidden only={['sm', 'xs']}>
                            {
                                menu.map((option, index) => {
                                    if (index < 3) {
                                        return (<Link href={`/${option.name}`} key={option.name}><a>{t(option.name)}</a></Link>)
                                    } else {
                                        return (<a key={option.name} onClick={() => handleLogin(index)} href="javascript:;">{t(option.name)}</a>)
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
                {LoginPup && (<div className={classes.loginBox}>
                    <span className={classes.close} onClick={closePup}><Clear color="primary" /></span>
                    <div className={classes.login}>ULUGAMES</div>
                    <Grid container >
                        <Grid item container justify="space-around" direction="column" lg={6} xs={12} className={classes.left}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                通过Facebook登入
                                </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={`${classes.button} ${classes.buttonGoogle}`}
                                startIcon={<SaveIcon />}
                            >
                                通过Google登入
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className={`${classes.button} ${classes.buttonColor}`}
                                startIcon={<SaveIcon />}
                            >
                                通过Twitter登入
                                </Button>
                        </Grid>
                        <Grid item lg={6} xs={12} className={classes.right}>
                            {
                                show ? (<div>
                                    <TextField
                                        id="outlined-email-input"
                                        label="电子邮箱"
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <br />
                                    <TextField
                                        id="outlined-password-input"
                                        label="密码"
                                        className={classes.textField}
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <Box display="flex" justifyContent="space-between" alignItems="center" fontSize={16}>
                                        <FormControlLabel
                                            value="start"
                                            control={<Checkbox color="primary" />}
                                            label="自动登入"
                                            labelPlacement="end"
                                        />
                                        <span>忘记密码</span>
                                    </Box>
                                    <Button variant="contained" color="primary" className={classes.LoginBtn} > 登入 </Button>
                                    <Typography color="textPrimary" variant="body2" align="center">没有游陆账号？<a href="javascript:;" onClick={() => setShow(false)}>马上注册</a></Typography>
                                </div>) : (<div>
                                    <TextField
                                        id="outlined-email-input"
                                        label="电子邮箱"
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <br />
                                    <TextField
                                        id="outlined-password-input"
                                        label="密码"
                                        className={classes.textField}
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="outlined-password-input"
                                        label="确认密码"
                                        className={classes.textField}
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <Box display="flex" justifyContent="space-between" alignItems="center" fontSize={16}>
                                        <FormControlLabel
                                            value="start"
                                            control={<Checkbox color="primary" />}
                                            label="我已阅读并同意遵守服务条款"
                                            labelPlacement="end"
                                        />
                                    </Box>
                                    <Button variant="contained" color="primary" className={classes.LoginBtn} > 注册 </Button>
                                    <Typography color="textPrimary" variant="body2" align="center">已有账号？<a href="javascript:;" onClick={() => setShow(true)}>在此登录</a></Typography>
                                </div>)
                            }
                        </Grid>
                    </Grid>
                </div >)}

            </Container >
            {
                LoginPup && (<div className={classes.mask}></div>)
            }
        </div >
    )
}


Topbar.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('common')(Topbar);