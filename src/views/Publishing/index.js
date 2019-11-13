import React, { useState, useRef, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BMap from 'BMap'
import {
    makeStyles, Container, Typography, Grid, Button, Box, Hidden, Breadcrumbs, Link, Divider, InputLabel, FormControl, Select, MenuItem, Input, Snackbar, OutlinedInput
} from '@material-ui/core'
import MySnackbarContentWrapper from 'component/SnackbarWrapper'
import { addCollaboration, uploadFile } from 'service/publishing'
import { useSubmitForm } from 'common/CustomHooks'

import { ReactComponent as Facebook } from 'icons/svg/facebook.svg'
import { ReactComponent as Twitter } from 'icons/svg/twitter.svg'
import { ReactComponent as Youtube } from 'icons/svg/youtube.svg'
import { ReactComponent as Wechat } from 'icons/svg/wechat.svg'

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    navBar: {
        height: '100%',
        '& div': {
            height: '100%',
            '& .breadcrumbsa': {
                fontSize: 14
            }
        }
    },
    logo: {
        fontSize: 16,
        fontFamily: "Microsoft YaHei",
        fontWeight: 'bold',
        color: theme.palette.text.secondary
    },
    line: {
        backgroundColor: 'rgb(68, 68, 68)',
        width: theme.spacing(5),
        height: 2,
        display: 'block',
        margin: '36px 0'
    },
    gameDesc: {
        fontSize: 42,
        fontFamily: "Arial",
        color: theme.palette.primary.main,
    },
    banner: {
        margin: '20px auto 100px auto',
        width: '95%'
    },
    listwrap: {
        padding: '70px 0 0 0'
    },
    support: {
        fontSize: '30px',
        fontFamily: "Arial",
        color: theme.palette.text.primary,
        fontWeight: 'bold'
    },
    gName: {
        fontSize: '16px',
        fontFamily: "Arial",
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        margin: '33px auto 10px auto'
    },
    slogan: {
        fontSize: '14px',
        fontFamily: "Microsoft YaHei",
        color: 'rgb(145, 149, 154)',
    },
    list: {
        marginBottom: '55px'
    },
    t1: {
        fontSize: 28,
        fontFamily: "Arial",
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        marginRight: theme.spacing(2),
    },
    desc: {
        fontSize: 14,
        fontFamily: "Arial",
        color: theme.palette.text.secondary,
        lineHeight: 2.252
    },
    right: {
        margin: '7% 0'
    },
    word: {
        fontSize: '20px',
        color: 'rgb(145, 149, 154)'
    },
    num: {
        fontSize: '48px',
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    m: {
        margin: '5% 0'
    },
    wordText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 67,
        paddingBottom: 67
    },
    textField: {
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(3),
        width: '266px',
        height: 40,
        [theme.breakpoints.down('md')]: {
            width: '93%',
        },
        '& div': {
            height: '40px',
            lineHeight: '40px'
        }
    },
    inputBox: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    label: {
        color: theme.palette.text.primary,
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%'
    },
    formData: {
        margin: '14% 0 0 0',
        width: '100%'
    },
    textArea: {
        width: '93%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
        height: 143
    },
    gameName: {
        width: '93%',
        height: 40,
        marginTop: theme.spacing(3),
        '& div': {
            height: '40px',
            lineHeight: '40px'
        }
    },
    infoRight: {
        margin: '20% 0 30% 0',
    },
    ico: {
        marginRight: theme.spacing(6),
        '& svg:hover': {
            '& path': {
                fill: 'orange'
            }
        },
        '& path': {
            fill: '#787676'
        }
    },
    close: {
        padding: theme.spacing(0.5),
    },
})
)
function GameList() {
    const classes = useStyles()
    const { t } = useTranslation(['publishing'])
    const inputEl = useRef(null)
    const [open, setOpen] = useState(false);
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }
    const [snackBar, setSnackBar] = useState(initSnackbar)

    const initialFormState = {
        companyName: '',
        mail: '',
        developmentStage: '',
        gameName: '',
        descriptionContent: '',
        fileUrl: ''
    }
    const submitFormData = () => {
        setSnackBar(initSnackbar)
        const { companyName, mail, developmentStage, gameName, descriptionContent } = inputs
        if (companyName === '' || mail === '' || developmentStage === '' || gameName === '' || descriptionContent === '') {
            setSnackBar({ ...snackBar, 'message': 'Please confirm the information entered.', 'variant': 'warning', 'autoHideDuration': 10000 })
            setOpen(true);
        } else {
            addCollaboration(inputs).then(res => {
                if (res.status === 200) {
                    setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'success', 'autoHideDuration': 1500 })
                    setOpen(true);
                    setInputs(initialFormState)
                    inputEl.current.value = ''
                }
            })
        }
    }
    const { inputs, setInputs, handleInputChange, handleSubmit } = useSubmitForm(initialFormState, submitFormData);

    const upload = (e) => {
        let file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('file', file)
        uploadFile(formdata).then(res => {
            if (res.status === 200) {
                inputs.resumeFileUrl = res.data.imgURL
            }
        })
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };

    useEffect(() => {
        var map = new BMap.Map("container"); // 创建Map实例
        var point = new BMap.Point(121.3997796598, 31.1751441091)
        map.centerAndZoom(point, 12);// // 初始化地图,设置中心点坐标和地图级别
        map.addOverlay(new BMap.Marker(point));    // 创建标注,将标注添加到地图中 
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }, [])
    return (
        <div>
            <Hidden smDown>
                <Box bgcolor="background.light" height="60px">
                    <Container className={classes.navBar}>
                        <Grid justify="space-between" container alignItems="center">
                            <Typography className={classes.logo}>{t('ABOUT')}</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to="/" component={RouterLink} className={classes.breadcrumbs}>{t('home')} </Link>
                                <Typography color="textPrimary" className={classes.breadcrumbs}>{t('aboutUs')}</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Container>
                </Box>
            </Hidden>
            <Container>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Box fontSize={44} align="center" pt={10} pb={2} fontWeight='bold'> {t('ulu')} <span className={classes.gameDesc}>{t('global')}</span> </Box>
                    <Box align="center" color="text.secondary" pb={1} fontSize={24}>
                        {t('partner')}
                    </Box>
                    <span className={classes.line}></span>
                    <img src={require('assets/imgs/publish/banner.jpg')} alt="banner" className={classes.banner} />
                </Grid>
            </Container>
            <Box bgcolor="background.light">
                <Container className={classes.listwrap}>
                    <Typography align="center" className={classes.support}>{t('suport')}</Typography>
                    <Box align="center" color="text.secondary" pb={6} pt={4}>{t('developers')}</Box>
                    <Grid container>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon1.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">{t('POLISHING')}</Typography>
                            <Typography className={classes.slogan} align="center">{t('direction')} </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon2.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">{t('MONETIZATION')}</Typography>
                            <Typography className={classes.slogan} align="center">{t('revenue')}</Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon3.png')} className={classes.pic} alt="icon" />
                            <Typography className={classes.gName} align="center">{t('LOCALIZATION')}</Typography>
                            <Typography className={classes.slogan} align="center">{t('localization')} </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon4.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">{t('SERVER')}</Typography>
                            <Typography className={classes.slogan} align="center">{t('implementation')} </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon5.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">{t('MARKETING')}</Typography>
                            <Typography className={classes.slogan} align="center">{t('ads')} </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon6.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">{t("PR")}</Typography>
                            <Typography className={classes.slogan} align="center">{t('influencers')} </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon7.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">{t('QA')}</Typography>
                            <Typography className={classes.slogan} align="center">{t('completeness')}</Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon8.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">{t('DESK')}</Typography>
                            <Typography className={classes.slogan} align="center">{t('inquiries')} </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container >
                <Grid container justify="space-between" >
                    <Grid item justify="center" alignItems="center" container xs={12} sm={12} md={5} lg={5} xl={5}>
                        <img src={require('assets/imgs/publish/global.jpg')} alt="role" width="87%" />
                    </Grid>
                    <Grid item container direction="column" justify="flex-end" className={classes.right} xs={12} sm={12} md={7} lg={7} xl={7}>
                        <Box width="100%">
                            <Typography className={classes.t1}> {t('BEYOND')} </Typography>
                            <Typography className={classes.word}>
                                {t('partnership')}
                            </Typography>
                            <span className={classes.line}></span>
                            <Typography className={classes.desc}>
                                {t('desc1')} <br /><br />{t('desc2')}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container justify="space-between" >
                    <Grid item container direction="column" justify="flex-end" className={classes.right} xs={12} sm={12} md={7} lg={7} xl={7}>
                        <Box width="100%">
                            <Typography className={classes.t1}>
                                {t('QUALIFICATIONS')}
                            </Typography>
                            <Typography className={classes.word}>
                                {t('help')}
                            </Typography>
                            <span className={classes.line}></span>
                            <Typography className={classes.desc}>
                                {t('desc3')} <br /><br />{t('desc4')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item justify="center" alignItems="center" container className={classes.left} xs={12} sm={12} md={5} lg={5} xl={5} >
                        <img src={require('assets/imgs/publish/group.jpg')} alt="role" width="87%" />
                    </Grid>
                </Grid>
            </Container>
            <Box bgcolor="background.light">
                <Container>
                    <Box className={classes.t1} align="center" pt={9} mb={4}>
                        {t('ACHIEVEMENTS')}
                    </Box>
                    <Typography className={classes.word} align="center">
                        {t('plantform')}
                    </Typography>
                    <Grid container justify="space-around">
                        <Grid container alignItems="center" direction="column" justify="space-around" item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.m}>
                            <img src={require('assets/imgs/publish/icon9.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.num} align="center">30+</Typography>
                            <Typography className={classes.slogan}>{t('COUNTRIES')}</Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" justify="space-around" item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.m}>
                            <img src={require('assets/imgs/publish/icon10.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.num} align="center">22,300,000</Typography>
                            <Typography className={classes.slogan}>{t('DOWNLOADS')}</Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" justify="space-around" item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.m}>
                            <img src={require('assets/imgs/publish/icon11.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.num} align="center">90%</Typography>
                            <Typography className={classes.slogan}>{t('STORES')} </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container>
                <Grid container justify="space-between" >
                    <Grid item justify="center" alignItems="center" container className={classes.left} xs={12} sm={12} md={5} lg={5} xl={5} >
                        <img src={require('assets/imgs/publish/role_03.png')} alt="role" className={classes.role} width="85%" />
                    </Grid>
                    <Grid item container direction="column" justify="center" className={classes.right} xs={12} sm={12} md={7} lg={7} xl={7}>
                        <Box width="100%">
                            <Typography className={classes.t1}>{t('ARKA')}</Typography>
                            <Typography className={classes.word}>
                                {t('gameTitle')}
                            </Typography>
                            <span className={classes.line}></span>
                            <Typography variant="h6" color="textSecondary" className={classes.desc}>
                                {t('desc5')} <br /><br />{t('desc6')}
                            </Typography>
                            <Box mt={5}>
                                <Button variant="outlined" size="medium" className={classes.more} to={`/detail/1`} component={RouterLink}>{t('seeMore')}</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container justify="space-between" spacing={1}>
                    <Grid item container direction="column" justify="center" className={classes.right} xs={12} sm={12} md={7} lg={7} xl={7}>
                        <Box width="100%">
                            <Typography className={classes.t1}>{t('sword')}</Typography>
                            <Typography className={classes.word}>
                                {t('swordTtile')}
                            </Typography>
                            <span className={classes.line}></span>
                            <Typography variant="h6" color="textSecondary" className={classes.desc}>
                                {t('desc7')} <br /><br />{t('desc8')}
                            </Typography>
                            <Box mt={5}>
                                <Button variant="outlined" size="medium" className={classes.more} to={`/detail/2`} component={RouterLink}>{t('seeMoreBtn')}</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item justify="center" alignItems="center" container className={classes.left} xs={12} sm={12} md={5} lg={5} xl={5} >
                        <img src={require('assets/imgs/publish/role1_03.png')} alt="role" width="90%" />
                    </Grid>
                </Grid>
            </Container>
            <Box bgcolor="background.light" >
                <Container className={classes.wordText}>
                    <Box align="center" className={classes.t1} mb={3}>
                        {t('GLOBALLY')}
                    </Box>
                    <Typography className={classes.word} align="center">
                        {t('welcome')}
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Grid container justify="space-between">
                    <Grid xs={12} sm={12} md={9} lg={9} xl={9} item>

                        <div style={{ width: "90%", height: "80%", minHeight: '400px', margin: '8% auto', boxSizing: "border-box" }} id="container"></div>

                        {/* react-hook-form */}
                        {/* <form className={classes.formData} onSubmit={handleSubmit}>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    {t('name')}
                                </InputLabel>
                                <OutlinedInput
                                    id="NAME"
                                    className={classes.textField}
                                    name="companyName"
                                    value={inputs.companyName}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="email" className={classes.label}>
                                    {t('email')}
                                </InputLabel>
                                <OutlinedInput
                                    id="email"
                                    className={classes.textField}
                                    value={inputs.mail}
                                    name="mail"
                                    type="email"
                                    required
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="DEVELOPMENT" className={classes.label}>
                                    {t('stage')}
                                </InputLabel>
                                <Select
                                    value={inputs.developmentStage}
                                    id="DEVELOPMENT"
                                    onChange={handleInputChange}
                                    name="developmentStage"
                                    className={classes.textField}
                                >
                                    <MenuItem value={t('Development')} >  {t('Development')} </MenuItem>
                                    <MenuItem value={t('Version')}> {t('Version')} </MenuItem>
                                    <MenuItem value={t('Completed')}> {t('Completed')} </MenuItem>
                                    <MenuItem value={t('Released')}>{t('Released')} </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{ width: '100%', marginTop: "20px" }}>
                                <InputLabel shrink htmlFor="gameName" className={classes.label}>
                                    {t('GAMENAME')}
                                </InputLabel>
                                <OutlinedInput
                                    id="gameName"
                                    className={classes.gameName}
                                    value={inputs.gameName}
                                    onChange={handleInputChange}
                                    name="gameName"
                                />
                            </FormControl>
                            <br />
                            <FormControl style={{ width: '100%', marginTop: "20px" }}>
                                <InputLabel shrink htmlFor="email" className={classes.label}>
                                    {t('upload')}
                                </InputLabel>
                                <Input type="file" style={{ width: '93%' }} onChange={upload} inputRef={inputEl} />
                            </FormControl>
                            <br />
                            <br />
                            <FormControl style={{ width: '100%', marginTop: "20px" }}>
                                <InputLabel shrink htmlFor="UPLOAD" className={classes.label}>
                                    {t('info')}
                                </InputLabel>
                                <textarea id="UPLOAD" className={classes.textArea} value={inputs.descriptionContent} name="descriptionContent" onChange={handleInputChange}>
                                </textarea>
                            </FormControl>
                            <br />
                            <FormControl>
                                <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>{t('submit')}</Button>
                            </FormControl>
                        </form> */}
                    </Grid>
                    <Grid xs={12} sm={12} md={3} lg={3} xl={3} item>
                        <div className={classes.infoRight}>
                            {/* <Typography className={classes.t1}>{t('INFORMATION')}</Typography> */}
                            <Typography className={classes.desc}>
                                {t('concat')}
                            </Typography>
                            <span className={classes.line}></span>
                            <Box fontWeight="bold"> {t('office')} </Box>
                            <Typography className={classes.desc}>
                                {t('address1')}<br />{t('address2')}<br />{t('address3')}<br />
                                <a href="mailto:bd@ulugame.com" style={{ color: 'rgb(100, 101, 105)' }}>{t('email1')}</a>
                            </Typography>
                            <br />
                            <div>
                                <a href="https://twitter.com/ULUGames1" target="_blank" rel="noopener noreferrer" className={classes.ico}>
                                    <Twitter />
                                </a>
                                <a href="https://www.youtube.com/channel/UC3PCMQ6sbpCZVdIqZaWf4-g" target="_blank" rel="noopener noreferrer" className={classes.ico}>
                                    <Youtube />
                                </a>
                                <span className={classes.ico}><Facebook /></span>
                                <span className={classes.ico}><Wechat /></span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            {/* tips */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={snackBar.autoHideDuration}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={snackBar.variant}
                    message={snackBar.message}
                />
            </Snackbar>
        </div>
    )
}

export default GameList