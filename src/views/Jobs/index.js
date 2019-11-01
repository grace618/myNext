import React, { useState, useRef } from 'react'
import MySnackbarContentWrapper from 'component/SnackbarWrapper'
import { addRecruitment } from 'service/jobs'
import { uploadFile } from 'service/publishing'
import { useSubmitForm } from 'common/CustomHooks'
import {
    makeStyles, Typography, Grid, Container, Divider, Box, List, ListItemText, ListItem, Button, InputLabel, FormControl, Select, MenuItem, Input, OutlinedInput, Snackbar
} from '@material-ui/core'
import { Check, AddCircle } from '@material-ui/icons';
import Footer from 'views/Layouts/Footer'
import Topbar from 'views/Layouts/Topbar'
import banner from 'assets/imgs/jobs/banner.jpg'
const useStyles = makeStyles(theme => ({
    banner: {
        background: `url(${banner}) center top no-repeat`,
        width: '100%',
        height: '790px'
    },
    i_title: {
        fontSize: '18px',
        color: theme.palette.text.primary,
        fontWeight: 'bold'
    },
    s_title: {
        fontSize: '18px',
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    box: {
        margin: '7% 0',
        '&>div': {
            padding: '0 10px',
            borderSize: 'border-box'
        }
    },
    desc: {
        fontSize: 14,
        fontFamily: "Arial",
        color: theme.palette.text.secondary,
        lineHeight: 2.252
    },
    line: {
        backgroundColor: theme.palette.primary.main,
        height: 2,
        margin: '20px 0 35px 0'
    },
    wordText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 67,
        paddingBottom: 67
    },
    t1: {
        fontSize: 28,
        fontFamily: "Arial",
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        marginRight: theme.spacing(2),
    },
    word: {
        fontSize: '20px',
        color: 'rgb(145, 149, 154)'
    },
    line_short: {
        backgroundColor: 'rgb(68, 68, 68)',
        width: theme.spacing(5),
        height: 2,
        display: 'block',
        margin: '36px 0'
    },
    jobDescription: {
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: 'rgb(145, 149, 154)',
        margin: '40px 0 30px 0'
    },
    requirement: {
        backgroundColor: "rgb(238, 238, 238)",
        width: '100%',
        height: '44px',
        lineHeight: '44px',
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textIndent: '10px',
        color: theme.palette.text.primary
    },
    icon: {
        marginRight: '12px'
    },
    apply: {
        margin: '24px 0 66px 0'
    },
    label: {
        color: theme.palette.text.primary,
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%'
    },
    inputBox: {
        width: '100%',
        margin: '10px 0'
    },
    textField: {
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(3),
        width: '100%',
        height: 40,
        '& div': {
            height: '40px',
            lineHeight: '40px'
        }
    },
    textInput: {
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(3),
        width: '158px',
        height: 40,
        '& div': {
            height: '100%'
        }
    },
    textArea: {
        width: '100%',
        marginBottom: theme.spacing(3),
        height: 63
    },
    banner_title: {
        fontSize: '48px',
        fontFamily: "Arial",
        color: 'white'
    },
    banner_desc: {
        fontSize: '24px',
        fontFamily: "Arial",
        color: 'white'
    }
}))
function Jobs() {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const fileLoad = useRef(null)
    const initSnackbar = {
        message: '',
        variant: 'warning',
        autoHideDuration: 0
    }
    const [snackBar, setSnackBar] = useState(initSnackbar)
    const initialFormState = {
        firstName: '',
        lastName: '',
        mail: '',
        age: '',
        address: '',
        personalProfile: '',
        salary: '',
        arrival: '',
        recommendUrl: '',
        workExperience: '',
        selfIntroduction: '',
        resumeFileUrl: ''
    }
    const submitFormData = () => {
        setSnackBar(initSnackbar)
        const { firstName, lastName, mail, age, address, personalProfile, salary, arrival, workExperience, selfIntroduction, resumeFileUrl } = inputs
        if (firstName === '' || lastName === '' || mail === '' || age === '' || address === '' || personalProfile === '' || salary === '' || arrival === '' || workExperience === '' || selfIntroduction === '' || resumeFileUrl === ''
        ) {
            setSnackBar({ ...snackBar, 'message': 'Please confirm the information entered.', 'variant': 'warning', 'autoHideDuration': 30000 })
            setOpen(true);
        } else {
            addRecruitment(inputs).then(res => {
                if (res.status === 200) {
                    setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'success', 'autoHideDuration': 1000 })
                    setOpen(true);
                    fileLoad.current.value = ''
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
            <div className={classes.banner}>
                <Topbar backgroundColor="transparent" />
                <Box pt={27} align='center'>
                    <Typography className={classes.banner_title}>BEERS! CHEERS!</Typography>
                    <Typography className={classes.banner_desc}>WE ARE RECRUITING TALENTED PEOPLE FOR GLOBAL SUCCESS</Typography>
                </Box>
            </div>
            <Container>
                <Grid container justify="space-between" className={classes.box}>
                    <Grid item container direction="column" xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className={classes.desc_title}>
                            <span className={classes.i_title}>SPECIALIST</span><span className={classes.s_title}> ULU GAMES</span>
                            <Divider className={classes.line} />
                        </div>
                        <Typography className={classes.desc}>
                            With expertise in the fields of the mobile game industry, we work to get our games in to the global market.
                            We are a group of mobile game specialists constantly innovating to showcase unique and high quality games.
                        </Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className={classes.desc_title}>
                            <span className={classes.i_title}>OUR  </span><span className={classes.s_title}> VISION AND GOAL</span>
                            <Divider className={classes.line} />
                        </div>
                        <Typography className={classes.desc}>
                            Video games are the ultimate entertainment content that revitalizes energy drained from the daily grind.
                            We will continue to deliver unique and sophisticated games to the global community that bring smiles to the people.
                        </Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className={classes.desc_title}>
                            <span className={classes.i_title}>GLOBAL</span><span className={classes.s_title}> CHALLENGE</span>
                            <Divider className={classes.line} />
                        </div>
                        <Typography className={classes.desc}>
                            We are looking for people to challenge themselves in the global game market.
                            Welcome to the team with constant innovation in mind. (8 hours/day , flexible work hours. Social health insurance. Performance-based incentive pay.)
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Box bgcolor="background.light" >
                <Container className={classes.wordText}>
                    <Box align="center" className={classes.t1} mb={3}>
                        WE ARE ALWAYS LOOKING FOR NEW TALENTS!
                    </Box>
                    <Typography className={classes.word} align="center">
                        Head Office @ Garosu-gil, Sinsa, Seoul, Korea
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.box}>
                        <div>
                            <div className={classes.i_title}>
                                Unity Developer
                            <Divider className={classes.line} />
                            </div>
                            <Typography className={classes.jobDescription}>
                                We are looking for a Unity developer to create new mobile games.
                            </Typography>
                            <div className={classes.requirement}>
                                Requirements or preferences we may have
                            </div>
                            <List className={classes.list} dense={true}>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Experience as a user service manager" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Experience in areas related to marketing, business, or operations" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Likes and understands video games" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Excellent communication skills" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Detail-oriented" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Likes video games that appeal to the international audience" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Speaks a foreign language" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Bachelors degree or experience in related fields" />
                                </ListItem>
                            </List>
                            <div className={classes.requirement}>
                                Position Descripition
                            </div>
                            <Typography className={classes.desc}>
                                Likes video games that appeal to the international audience ,Indie game developer preferred,Ability to speak a foreign language
                            </Typography>
                            <Button variant="contained" color="primary" className={classes.apply}>APPLY</Button>
                        </div>
                        <div>
                            <div className={classes.i_title}>
                                Unity Developer
                            <Divider className={classes.line} />
                            </div>
                            <Typography className={classes.jobDescription}>
                                We are looking for a Unity developer to create new mobile games.
                            </Typography>
                            <div className={classes.requirement}>
                                Requirements or preferences we may have
                            </div>
                            <List className={classes.list} dense={true}>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Experience as a user service manager" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Experience in areas related to marketing, business, or operations" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Likes and understands video games" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Excellent communication skills" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Detail-oriented" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Likes video games that appeal to the international audience" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Speaks a foreign language" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Bachelors degree or experience in related fields" />
                                </ListItem>
                            </List>
                            <div className={classes.requirement}>
                                Position Descripition
                            </div>
                            <Typography className={classes.desc}>
                                Likes video games that appeal to the international audience ,Indie game developer preferred,Ability to speak a foreign language
                            </Typography>
                            <Button variant="contained" color="primary" className={classes.apply}>APPLY</Button>
                        </div>
                        <div>
                            <div className={classes.i_title}>
                                Unity Developer
                            <Divider className={classes.line} />
                            </div>
                            <Typography className={classes.jobDescription}>
                                We are looking for a Unity developer to create new mobile games.
                            </Typography>
                            <div className={classes.requirement}>
                                Requirements or preferences we may have
                            </div>
                            <List className={classes.list} dense={true}>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Experience as a user service manager" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Experience in areas related to marketing, business, or operations" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Likes and understands video games" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Excellent communication skills" />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary="Detail-oriented" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Likes video games that appeal to the international audience" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Speaks a foreign language" />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary="Bachelors degree or experience in related fields" />
                                </ListItem>
                            </List>
                            <div className={classes.requirement}>
                                Position Descripition
                            </div>
                            <Typography className={classes.desc}>
                                Likes video games that appeal to the international audience ,Indie game developer preferred,Ability to speak a foreign language
                            </Typography>
                            <Button variant="contained" color="primary" className={classes.apply}>APPLY</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.box}>
                        <div className={classes.i_title}>
                            APPLY
                        </div>
                        <Typography className={classes.word}>
                            After sending us the completed form below, we will get back to you after 3 to 7 days. Thank you!
                        </Typography>
                        <span className={classes.line_short}></span>
                        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                            <FormControl >
                                <InputLabel shrink htmlFor="firstName" className={classes.label}>
                                    FIRST NAME*
                                </InputLabel>
                                <OutlinedInput
                                    id="firstName"
                                    className={classes.textInput}
                                    name="firstName"
                                    required
                                    value={inputs.firstName}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl >
                                <InputLabel shrink htmlFor="lastName" className={classes.label}>
                                    LAST NAME*
                                </InputLabel>
                                <OutlinedInput
                                    id="lastName"
                                    className={classes.textInput}
                                    name="lastName"
                                    required
                                    value={inputs.lastName}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="mail" className={classes.label}>
                                    EMAIL*
                                </InputLabel>
                                <OutlinedInput
                                    id="mail"
                                    className={classes.textField}
                                    name="mail"
                                    type="email"
                                    required
                                    value={inputs.mail}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel shrink htmlFor="age" className={classes.label}>
                                    AGE*
                                </InputLabel>
                                <OutlinedInput
                                    id="age"
                                    className={classes.textInput}
                                    name="age"
                                    required
                                    value={inputs.age}
                                    type="number"
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl >
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    AREA OF RESIDENCE*
                                </InputLabel>
                                <OutlinedInput
                                    id="NAME"
                                    className={classes.textInput}
                                    name="address"
                                    required
                                    value={inputs.address}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="personalProfile" className={classes.label}>
                                    POSITION DESCRIPTION*
                                </InputLabel>
                                <Select
                                    value={inputs.personalProfile}
                                    id="personalProfile"
                                    name="personalProfile"
                                    required
                                    onChange={handleInputChange}
                                    className={classes.textField}
                                >
                                    <MenuItem value={10}>  Early Development </MenuItem>
                                    <MenuItem value={20}>  Prototype or Playable Version </MenuItem>
                                    <MenuItem value={30}> 50 to 100% Completed </MenuItem>
                                    <MenuItem value={40}> Already Released </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="salary" className={classes.label}>
                                    DESIRED SALARY (OR CURRENT SALARY)*
                                </InputLabel>
                                <OutlinedInput
                                    id="salary"
                                    className={classes.textField}
                                    name="salary"
                                    required
                                    value={inputs.salary}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="arrival" className={classes.label}>
                                    POSSIBLE JOB START DATE*
                                </InputLabel>
                                <OutlinedInput
                                    id="arrival"
                                    className={classes.textField}
                                    name="arrival"
                                    required
                                    value={inputs.arrival}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="recommendUrl" className={classes.label}>
                                    WEBSITE(FOR PORTFOLIO OR OTHER RELATED MATERIALS)
                                </InputLabel>
                                <OutlinedInput
                                    id="recommendUrl"
                                    className={classes.textField}
                                    style={{ marginTop: '40px' }}
                                    name="recommendUrl"
                                    value={inputs.recommendUrl}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="workExperience" className={classes.label}>
                                    WORK EXPERIENCE*
                                </InputLabel>
                                <textarea id="workExperience" className={classes.textArea} required name="workExperience" value={inputs.workExperience} onChange={handleInputChange} style={{ marginTop: '20px' }}>
                                </textarea>
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="selfIntroduction" className={classes.label}>
                                    PLEASE GIVE YOURSELF A CHANCE TO INTRODUCE
                                    YOURSELF AND THE REASON YOU ARE APPLYING FOR THE
                                    JOB*
                                </InputLabel>
                                <textarea id="selfIntroduction" className={classes.textArea} required value={inputs.selfIntroduction} name="selfIntroduction" onChange={handleInputChange} style={{ marginTop: '48px' }}>
                                </textarea>
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="email" className={classes.label}>
                                    UPLOAD (RESUME,PORTFOLIO,ETC.)*
                                </InputLabel>
                                <Input type="file" onChange={upload} inputRef={fileLoad} />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <Button variant="contained" color="primary" className={classes.apply} name="apply" type="submit" style={{ width: '100%' }}>SUBMIT</Button>
                            </FormControl>
                        </form>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
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
        </div >
    )
}
export default Jobs