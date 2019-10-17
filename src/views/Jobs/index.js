import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import banner from 'assets/imgs/jobs/banner.jpg'
import { Check, AddCircle } from '@material-ui/icons';
import {
    Typography, Grid, Container, Divider, Box, List, ListItemText, ListItem, Button,
    TextField, InputLabel, FormControl, Select, MenuItem, Input
} from '@material-ui/core'
import Footer from 'views/Layouts/Footer'
import Topbar from 'views/Layouts/Topbar'
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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [development, setDevelopment] = useState('')
    const [gameName, setGameName] = useState('')
    const [description, setTextArea] = useState('')
    const handleSubmit = () => {
        // setOpen(true);
        console.log(name, email, development, gameName, description)
    }
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
                        <form style={{ width: '100%' }}>
                            <FormControl >
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    FIRST NAME*
                                </InputLabel>
                                <TextField
                                    id="NAME"
                                    className={classes.textInput}
                                    margin="normal"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl >
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    LAST NAME*
                                </InputLabel>
                                <TextField
                                    id="NAME"
                                    className={classes.textInput}
                                    margin="normal"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    EMAIL*
                                </InputLabel>
                                <TextField
                                    id="NAME"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    AGE*
                                </InputLabel>
                                <TextField
                                    id="NAME"
                                    className={classes.textInput}
                                    margin="normal"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl >
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    AREA OF RESIDENCE*
                                </InputLabel>
                                <TextField
                                    id="NAME"
                                    className={classes.textInput}
                                    margin="normal"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="DEVELOPMENT" className={classes.label}>
                                    POSITION DESCRIPTION*
                                </InputLabel>
                                <Select
                                    value={development}
                                    id="DEVELOPMENT"
                                    onChange={(event) => setDevelopment(event.target.value)}
                                    className={classes.textField}
                                >
                                    <MenuItem value={10}>  Early Development </MenuItem>
                                    <MenuItem value={20}>  Prototype or Playable Version </MenuItem>
                                    <MenuItem value={30}> 50 to 100% Completed </MenuItem>
                                    <MenuItem value={40}> Already Released </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    DESIRED SALARY (OR CURRENT SALARY)*
                                </InputLabel>
                                <TextField
                                    id="NAME"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    POSSIBLE JOB START DATE*
                                </InputLabel>
                                <TextField
                                    id="NAME"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="NAME" className={classes.label}>
                                    WEBSITE(FOR PORTFOLIO OR OTHER RELATED MATERIALS)
                                </InputLabel>
                                <TextField
                                    id="NAME"
                                    className={classes.textField}
                                    margin="normal"
                                    style={{ marginTop: '40px' }}
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="UPLOAD" className={classes.label}>
                                    WORK EXPERIENCE*
                                </InputLabel>
                                <textarea id="UPLOAD" className={classes.textArea} value={description} onChange={(event) => setTextArea(event.target.value)} style={{ marginTop: '20px' }}>
                                </textarea>
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="UPLOAD" className={classes.label}>
                                    PLEASE GIVE YOURSELF A CHANCE TO INTRODUCE
                                    YOURSELF AND THE REASON YOU ARE APPLYING FOR THE
                                    JOB*
                                </InputLabel>
                                <textarea id="UPLOAD" className={classes.textArea} value={description} onChange={(event) => setTextArea(event.target.value)} style={{ marginTop: '48px' }}>
                                </textarea>
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <InputLabel shrink htmlFor="email" className={classes.label}>
                                    UPLOAD (RESUME,PORTFOLIO,ETC.)*
                                </InputLabel>
                                <Input type="file" />
                            </FormControl>
                            <FormControl className={classes.inputBox}>
                                <Button variant="contained" color="primary" className={classes.apply} onClick={handleSubmit} style={{ width: '100%' }}>SUBMIT</Button>
                            </FormControl>
                        </form>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div >
    )
}
export default Jobs