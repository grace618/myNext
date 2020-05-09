import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import { useTranslation } from 'react-i18next';
import { Container, Grid, IconButton, Hidden, MenuItem, Menu } from '@material-ui/core';
import { Language, Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux';
import { language } from 'store/modules/app'


const useStyles = makeStyles(theme => ({
    root: props => ({
        // backgroundColor: props.backgroundColor ? props.backgroundColor : theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: theme.spacing(10),
        position: 'relative',
        top: 0,
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
            fontSize: 14
        }
    },
    svg: {
        color: 'white'
    },

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
}]
function Topbar(props) {
    const classes = useStyles(props)
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [needFixed, setNeedFixed] = useState(false);
    const { t, i18n } = useTranslation(['common'])
    const dispatch = useDispatch();
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
                                    menu.map(option => (
                                        <MenuItem key={option.name} onClick={handleClose}>
                                            <Link href={`/${option.name}`}><a>{t(option.name)}</a></Link>
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                        </Grid>
                    </Hidden>
                    <Grid item>
                        <Link href="/"><img src='/images/logo.png' alt="uluLogo" /></Link>
                    </Grid>
                    <Grid item className={classes.navLink}>
                        <Hidden only={['sm', 'xs']}>
                            {
                                menu.map(option => (
                                    <Link href={`/${option.name}`} key={option.name}><a>{t(option.name)}</a></Link>
                                ))
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
            </Container>
        </div >
    )
}
export default Topbar
