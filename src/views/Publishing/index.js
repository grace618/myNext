import React, { useState, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { addCollaboration, uploadFile } from 'service/publishing'
import { useSubmitForm } from 'common/CustomHooks'
import MySnackbarContentWrapper from 'component/SnackbarWrapper'
import {
    makeStyles, Container, Typography, Grid, Button, Box, Hidden, Breadcrumbs, Link, Divider, InputLabel, FormControl, Select, MenuItem, Input, Snackbar, OutlinedInput
} from '@material-ui/core'


import { ReactComponent as Facebook } from 'icons/svg/facebook.svg'
import { ReactComponent as Twitter } from 'icons/svg/twitter.svg'
import { ReactComponent as Wechat } from 'icons/svg/wechat.svg'
import { ReactComponent as Youtube } from 'icons/svg/youtube.svg'


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
        color: 'rgb(244, 66, 66)',
        fontWeight: 'bold'
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
        marginTop: theme.spacing(3),
        '& div': {
            height: '40px'
        }
    },
    infoRight: {
        margin: '20% 0',
    },
    box: {
        '& a': {
            marginRight: theme.spacing(6),
            '& svg:hover': {
                '& path': {
                    fill: 'orange'
                }
            },
            '& path': {
                fill: '#787676'
            }
        }
    },
    close: {
        padding: theme.spacing(0.5),
    },
})
)
function GameList() {
    const classes = useStyles()
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
        const { companyName, mail, developmentStage, gameName } = inputs
        if (companyName === '' || mail === '' || developmentStage === '' || gameName === '') {
            setSnackBar({ ...snackBar, 'message': 'Please confirm the information entered.', 'variant': 'warning', 'autoHideDuration': 30000 })
            setOpen(true);
        } else {
            addCollaboration(inputs).then(res => {
                if (res.status === 200) {
                    setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'success', 'autoHideDuration': 1000 })
                    setOpen(true);
                    inputEl.current.value = ''
                }
            })
        }
    }
    const { inputs, handleInputChange, handleSubmit } = useSubmitForm(initialFormState, submitFormData);

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
    return (
        <div>
            <Hidden smDown>
                <Box bgcolor="background.light" height="60px">
                    <Container className={classes.navBar}>
                        <Grid justify="space-between" container alignItems="center">
                            <Typography className={classes.logo}>GLOBAL PUBLISHING</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to="/" component={RouterLink} className={classes.breadcrumbs}>Home </Link>
                                <Typography color="textPrimary" className={classes.breadcrumbs}> Global Publishing</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Container>
                </Box>
            </Hidden>
            <Container>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Box fontSize={44} align="center" fontWeight={500} pt={10} pb={2}> GLOBAL MOBILE GAME PUBLISHER <span className={classes.gameDesc}>ULU GAMES</span> </Box>
                    <Box align="center" color="text.secondary" pb={1} fontSize={24}>
                        Partner with us and go global
                    </Box>
                    <span className={classes.line}></span>
                    <img src={require('assets/imgs/publish/banner.jpg')} alt="banner" className={classes.banner} />
                </Grid>
            </Container>
            <Box bgcolor="background.light">
                <Container className={classes.listwrap}>
                    <Typography align="center" className={classes.support}>GLOBAL PUBLISHING SUPPORT</Typography>
                    <Box align="center" color="text.secondary" pb={6} pt={4}>We professionally assist developers to go global.</Box>
                    <Grid container>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon1.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">POLISHING</Typography>
                            <Typography className={classes.slogan} align="center">Game Direction, Game <br />  Balance, and UX </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon2.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">MONETIZATION DESIGN</Typography>
                            <Typography className={classes.slogan} align="center">Game Revenue Maximization </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon3.png')} className={classes.pic} alt="icon" />
                            <Typography className={classes.gName} align="center">LOCALIZATION</Typography>
                            <Typography className={classes.slogan} align="center">Text Translations and <br />Localization </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon4.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">SERVER SUPPORT</Typography>
                            <Typography className={classes.slogan} align="center">Play! Server Implementation </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon5.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">MARKETING</Typography>
                            <Typography className={classes.slogan} align="center">Ads and Cross-Promotions </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon6.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">PR</Typography>
                            <Typography className={classes.slogan} align="center">Media and Influencers </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon7.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">QA TESTING</Typography>
                            <Typography className={classes.slogan} align="center">Completeness and Checks for <br />Hurdles </Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.list}>
                            <img src={require('assets/imgs/publish/icon8.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.gName} align="center">HELP DESK</Typography>
                            <Typography className={classes.slogan} align="center">Global User Inquiries </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container >
                <Grid container justify="space-between" >
                    <Grid item justify="center" alignItems="center" container xs={12} sm={12} md={5} lg={5} xl={5}>
                        <img src={require('assets/imgs/publish/global.png')} alt="role" width="87%" />
                    </Grid>
                    <Grid item container direction="column" justify="flex-end" className={classes.right} xs={12} sm={12} md={7} lg={7} xl={7}>
                        <Box width="100%">
                            <Typography className={classes.t1}> GO GLOBAL AND BEYOND </Typography>
                            <Typography className={classes.word}>
                                ULUA GAME’s Publishing Partnership targets the global market.
                            </Typography>
                            <span className={classes.line}></span>
                            <Typography className={classes.desc}>
                                The world has become ever more connected since the inception of smartphones.
                                As a consequence, a large number of diverse people from different countries are able to play games on their devices.
                                The current mobile game market is the largest of all the game markets.
                                We are aiming for the success in the global market by taking advantage of this great opportunity. <br /><br />

                                In order to do so, we have established great publishing partnerships with excellent game developers and studios for publishing worldwide.
                                The size, genre and number of teams for the game being developed have no relations to the partnership.
                                If you think you have a unique and high-quality game that can be enjoyed by the global audience, please contact us without hesitation.
                                We will use all of ULUA GAME's capabilities to help the game's success on the global stage.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container justify="space-between" >
                    <Grid item container direction="column" justify="flex-end" className={classes.right} xs={12} sm={12} md={7} lg={7} xl={7}>
                        <Box width="100%">
                            <Typography className={classes.t1}>
                                GROUP OF SPECIALISTS WITH THE BEST QUALIFICATIONS
                            </Typography>
                            <Typography className={classes.word}>
                                We help you upgrade the finish and turn up the fun of the game to the max.
                            </Typography>
                            <span className={classes.line}></span>
                            <Typography className={classes.desc}>
                                We are experts in each of our own respective fields with the best skills.
                               We help you publish and go global with the experience acquired from having over 10 mobile games successfully launched.<br /><br />

                                From the development stage of the game, we plan, balance, design monetization and UI for enhanced results.
                                In particular, we work with our partners to establish positioning in the global market with perfection in mind.
                                We will help you achieve global success based on the experience and data gained from launching games of a variety of genres.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item justify="center" alignItems="center" container className={classes.left} xs={12} sm={12} md={5} lg={5} xl={5} >
                        <img src={require('assets/imgs/publish/group.png')} alt="role" width="85%" height="393" />
                    </Grid>
                </Grid>
            </Container>
            <Box bgcolor="background.light">
                <Container>
                    <Box className={classes.t1} align="center" pt={9} mb={4}>
                        ULUA GAME GLOBAL PUBLISHING ACHIEVEMENTS
                    </Box>
                    <Typography className={classes.word} align="center">
                        iOS App Store & Android Google Play
                    </Typography>
                    <Grid container justify="space-around">
                        <Grid container alignItems="center" direction="column" justify="space-around" item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.m}>
                            <img src={require('assets/imgs/publish/icon9.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.num} align="center">155</Typography>
                            <Typography className={classes.slogan}>COUNTRIES RELEASED</Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" justify="space-around" item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.m}>
                            <img src={require('assets/imgs/publish/icon10.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.num} align="center">2,000,000</Typography>
                            <Typography className={classes.slogan}>DOWNLOADS SURPASSED</Typography>
                        </Grid>
                        <Grid container alignItems="center" direction="column" justify="space-around" item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.m}>
                            <img src={require('assets/imgs/publish/icon11.png')} alt="uluLogo" className={classes.pic} />
                            <Typography className={classes.num} align="center">90%</Typography>
                            <Typography className={classes.slogan}>FEATURED ON APP STORES </Typography>
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
                            <Typography className={classes.t1}>SUCCESS OF 'ARKA'</Typography>
                            <Typography className={classes.word}>
                                We help you upgrade the finish and turn up the fun of the game to the max.
                            </Typography>
                            <span className={classes.line}></span>
                            <Typography variant="h6" color="textSecondary" className={classes.desc}>
                                We are experts in each of our own respective fields with the best skills.
                              We help you publish and go global with the experience acquired from having over 10 mobile games successfully launched. <br /><br />

                                From the development stage of the game, we plan, balance, design monetization and UI for enhanced results. In particular,
                                we work with our partners to establish positioning in the global market with perfection in mind.
                                We will help you achieve global success based on the experience and data gained from launching games of a variety of genres.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   2 million times. Our major projects include 'ARKA', 'ETERNAL STORM', and 'ERA of DISCORD'.
                            </Typography>
                            <Box mt={5}>
                                <Button size="medium" className={classes.more}>SEE MORE OF‘ARKA’</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container justify="space-between" spacing={1}>
                    <Grid item container direction="column" justify="center" className={classes.right} xs={12} sm={12} md={7} lg={7} xl={7}>
                        <Box width="100%">
                            <Typography className={classes.t1}>RADICAL ACHIEVEMENTS THROUGH RE-LAUNCH</Typography>
                            <Typography className={classes.word}>
                                We help you upgrade the finish and turn up the fun of the game to the max.
                            </Typography>
                            <span className={classes.line}></span>
                            <Typography variant="h6" color="textSecondary" className={classes.desc}>
                                We are experts in each of our own respective fields with the best skills.
                              We help you publish and go global with the experience acquired from having over 10 mobile games successfully launched. <br /> <br />

                                From the development stage of the game, we plan, balance, design monetization and UI for enhanced results.
                                In particular, we work with our partners to establish positioning in the global market with perfection in mind.
                                We will help you achieve global success based on the experience and data gained from launching games of a variety of genres.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          2 million times. Our major projects include 'ARKA', 'ETERNAL STORM', and 'ERA of DISCORD'.
                            </Typography>
                            <Box mt={5}>
                                <Button size="large" className={classes.more}>SEE MORE OF‘ARKA’</Button>
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
                        DREAM OF SHOWCASING YOUR GAME GLOBALLY?
                    </Box>
                    <Typography className={classes.word} align="center">
                        Submit your proposal with information. We will work with you for global success.
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Grid container justify="space-between">
                    <Grid xs={12} sm={12} md={9} lg={9} xl={9} item>
                        {/* react-hook-form */}
                        <form className={classes.formData} onSubmit={handleSubmit}>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    COMPANY (OR TEAM) NAME*
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
                                    YOUR EMAIL*
                                </InputLabel>
                                <OutlinedInput
                                    id="email"
                                    className={classes.textField}
                                    value={inputs.mail}
                                    name="mail"
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="DEVELOPMENT" className={classes.label}>
                                    DEVELOPMENT STAGE*
                                </InputLabel>
                                <Select
                                    value={inputs.developmentStage}
                                    id="DEVELOPMENT"
                                    onChange={handleInputChange}
                                    name="developmentStage"
                                    className={classes.textField}
                                >
                                    <MenuItem value={'Early Development'}>  Early Development </MenuItem>
                                    <MenuItem value={'Prototype or Playable Version'}>  Prototype or Playable Version </MenuItem>
                                    <MenuItem value={'50 to 100% Completed'}> 50 to 100% Completed </MenuItem>
                                    <MenuItem value={'Already Released'}> Already Released </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{ width: '100%', marginTop: "20px" }}>
                                <InputLabel shrink htmlFor="gameName" className={classes.label}>
                                    GAME NAME*
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
                                    UPLOAD FILES (IMG, MOV, PPT, APK, ETC.)
                                </InputLabel>
                                <Input type="file" style={{ width: '93%' }} onChange={upload} inputRef={inputEl} />
                            </FormControl>
                            <br />
                            <br />
                            <FormControl style={{ width: '100%', marginTop: "20px" }}>
                                <InputLabel shrink htmlFor="UPLOAD" className={classes.label}>
                                    PLEASE TELL US ABOUT YOUR GAME, TEAM, COMPANY AND CURRENT STATUS.*
                                </InputLabel>
                                <textarea id="UPLOAD" className={classes.textArea} value={inputs.descriptionContent} name="descriptionContent" onChange={handleInputChange}>
                                </textarea>
                            </FormControl>
                            <br />
                            <FormControl>
                                <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>SUBMIT</Button>
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid xs={12} sm={12} md={3} lg={3} xl={3} item>
                        <div className={classes.infoRight}>
                            <Typography className={classes.t1}> INFORMATION</Typography>
                            <Typography className={classes.desc}>
                                Experience as a user service manager
                                Experience in areas related to marketing, busiWe accept all genres and development stages of games for partnerships.
                                 Submitted materials will not be used for any purpose other than reviewing the game for a potential partnership.
                                Security and confidentiality will be maintained. After going over the proposal, we will get back to you within 3 to 15 business days.
                            </Typography>
                            <span className={classes.line}></span>
                            <Box fontWeight="bold"> Head office </Box>
                            <Typography className={classes.desc}>
                                Experience as a user service manager
                            Experience in areas related <br /> <br />
                                Email: info@ulugame.com
                            </Typography>
                            <br />
                            <Box className={classes.box}>
                                <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                    <Facebook />
                                </a>
                                <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                    <Twitter />
                                </a>
                                <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                    <Wechat />
                                </a>
                                <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                    <Youtube />
                                </a>
                            </Box>
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