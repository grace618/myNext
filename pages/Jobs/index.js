import React, { useState, useRef } from 'react'
import MySnackbarContentWrapper from '../../components/SnackbarWrapper'
import PropTypes from 'prop-types'
import { addRecruitment } from 'service/jobs'
import { withTranslation } from '../../i18n'
import { uploadFile } from 'service/publishing'
import { useSubmitForm } from 'common/CustomHooks'

import {
    makeStyles, Typography, Grid, Container, Divider, Box, List, ListItemText, ListItem, Button, InputLabel, FormControl, Select, MenuItem, Input, OutlinedInput, Snackbar
} from '@material-ui/core'
import { Check, AddCircle } from '@material-ui/icons';
import Footer from '../../components/Layouts/Footer'
import Topbar from '../../components/Layouts/Topbar'

const useStyles = makeStyles(theme => ({
    banner: {
        background: `url('images/jobs/banner.jpg') center top no-repeat`,
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
            padding: '0 20px',
            boxSizing: 'border-box'
        }
    },
    desc: {
        fontSize: 14,
        fontFamily: "Arial",
        color: theme.palette.text.secondary,
    },
    line: {
        backgroundColor: theme.palette.primary.main,
        height: 2,
        margin: '20px 0'
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
        marginTop: 19,
        width: '158px',
        height: 40,
        [theme.breakpoints.down('md')]: {
            width: '100% !important',
        },
        '& div': {
            height: '100%',
            width: '100%'
        }
    },
    boxWrap: {
        marginBottom: '20px',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
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
    },
    jobBox: {
        marginBottom: '40px'
    },
    infoList: {
        marginBottom: '40px'
    }
}))
function Jobs(props) {
    const classes = useStyles()
    const { t } = props
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
        telNumber: '',
        mail: '',
        age: '',
        address: '',
        personalProfile: '',
        salary: '',
        arrival: '',
        educatinal: '',
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
            setSnackBar({ ...snackBar, 'message': 'Please confirm the information entered.', 'variant': 'warning', 'autoHideDuration': 10000 })
            setOpen(true);
        } else {
            addRecruitment(inputs).then(res => {
                if (res.status === 200) {
                    setSnackBar({ ...snackBar, 'message': 'success', 'variant': 'success', 'autoHideDuration': 1500 })
                    setOpen(true);
                    setInputs(initialFormState)
                    fileLoad.current.value = ''
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

    return (
        <div>
            <div className={classes.banner}>
                <Topbar backgroundColor="transparent" />
                <Box pt={27} align='center'>
                    <Typography className={classes.banner_title}>{t('career')}</Typography>
                    <Typography className={classes.banner_desc}>{t('bannerSlogan')}</Typography>
                </Box>
            </div>
            <Container>
                <Grid container justify="space-between" className={classes.box}>
                    <Grid item container direction="column" xs={12} sm={12} md={4} lg={4} xl={4} className={classes.infoList}>
                        <div className={classes.desc_title}>
                            <span className={classes.i_title}>{t('t1')}</span>
                            <span className={classes.s_title}>{t('t_1')}</span>
                            <Divider className={classes.line} />
                        </div>
                        <Typography className={classes.desc}>{t('d1')}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={12} md={4} lg={4} xl={4} className={classes.infoList}>
                        <div className={classes.desc_title}>
                            <span className={classes.i_title}>{t('t2')}</span>
                            <span className={classes.s_title}>{t('t_2')}</span>
                            <Divider className={classes.line} />
                        </div>
                        <Typography className={classes.desc}>{t('d2')}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className={classes.desc_title}>
                            <span className={classes.i_title}>{t('t3')}</span>
                            <span className={classes.s_title}>{t('t_3')}</span>
                            <Divider className={classes.line} />
                        </div>
                        <Typography className={classes.desc}>{t('d3')}</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Box bgcolor="background.light" >
                <Container className={classes.wordText}>
                    <Box align="center" className={classes.t1} mb={3}>{t('join')} </Box>
                    <Typography className={classes.word} align="center"> {t('better')}</Typography>
                </Container>
            </Box>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.box}>
                        <div className={classes.jobBox}>
                            <div className={classes.i_title}>
                                {t('SDKEngineer')}
                                <Divider className={classes.line} />
                            </div>
                            <div className={classes.requirement}>{t('requirements')}</div>
                            <List className={classes.list} dense={true}>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item1')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item2')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3')} />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item4')} />
                                </ListItem>
                            </List>
                            <div className={classes.requirement}> {t('jobDescription')} </div>
                            <div className={classes.desc}>
                                <List className={classes.list} dense={true}>
                                    <ListItem>
                                        <ListItemText primary={t('r1')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r2')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r3')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r4')} />
                                    </ListItem>
                                </List>
                            </div>
                            {/* <Button variant="contained" color="primary" className={classes.apply}>{t('apply')}</Button> */}
                        </div>
                        <div className={classes.jobBox}>
                            <div className={classes.i_title}>
                                {t('koreanOperation')}
                                <Divider className={classes.line} />
                            </div>
                            <div className={classes.requirement}>
                                {t('requirements')}
                            </div>
                            <List className={classes.list} dense={true}>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item2_2')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item2_3')} />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item2_1')} />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item2_4')} />
                                </ListItem>
                            </List>
                            <div className={classes.requirement}>{t('jobDescription')} </div>
                            <div className={classes.desc}>
                                <List className={classes.list} dense={true}>
                                    <ListItem>
                                        <ListItemText primary={t('r2_1')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r2_2')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r2_3')} />
                                    </ListItem>
                                </List>
                            </div>
                            {/* <Button variant="contained" color="primary" className={classes.apply}>{t('apply')}</Button> */}
                        </div>
                        <div className={classes.jobBox}>
                            <div className={classes.i_title}>
                                {t('videoDesigner')}
                                <Divider className={classes.line} />
                            </div>
                            <div className={classes.requirement}> {t('requirements')}</div>
                            <List className={classes.list} dense={true}>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3_2')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3_3')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3_4')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3_5')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3_6')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3_7')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3_9')} />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item3_8')} />
                                </ListItem>
                            </List>
                            <div className={classes.requirement}>{t('jobDescription')} </div>
                            <div className={classes.desc}>
                                <List className={classes.list} dense={true}>
                                    <ListItem>
                                        <ListItemText primary={t('r3_1')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r3_2')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r3_3')} />
                                    </ListItem>
                                </List>
                            </div>
                            {/* <Button variant="contained" color="primary" className={classes.apply}>{t('apply')}</Button> */}
                        </div>
                        <div className={classes.jobBox}>
                            <div className={classes.i_title}>
                                {t('coordinator')}
                                <Divider className={classes.line} />
                            </div>
                            <div className={classes.requirement}> {t('requirements')} </div>
                            <List className={classes.list} dense={true}>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item4_1')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item4_3')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item4_4')} />
                                </ListItem>
                                <ListItem>
                                    <Check color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item4_5')} />
                                </ListItem>
                                <ListItem>
                                    <AddCircle color="primary" className={classes.icon} />
                                    <ListItemText primary={t('item4_2')} />
                                </ListItem>
                            </List>
                            <div className={classes.requirement}> {t('jobDescription')}</div>
                            <div className={classes.desc}>
                                <List className={classes.list} dense={true}>
                                    <ListItem>
                                        <ListItemText primary={t('r4_1')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r4_2')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r4_3')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={t('r4_4')} />
                                    </ListItem>
                                </List>
                            </div>
                            {/* <Button variant="contained" color="primary" className={classes.apply}>{t('apply')}</Button> */}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.box}>
                        <Box className={classes.i_title} mb={3}> {t('apply')} </Box>

                        <Typography className={classes.word}> {t('info')}  <a href="mailto:uluhr@ulugame.com" style={{ color: 'rgb(100, 101, 105)' }}>{t('email')}</a></Typography>

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

Jobs.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('jobs')(Jobs);