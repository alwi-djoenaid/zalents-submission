import React, { useEffect } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Box, Button, Card, Container, Grid, Link, Snackbar, TextField, Typography } from '@material-ui/core';
import AuthContainer from '../container/AuthContainer';
import MuiAlert from '@material-ui/lab/Alert';

const styles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100vh'
    },
    center: {
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(50%, -50%)'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
    },
    card: {
        width: '100%',
        height: '100%',
        padding: '20px'
    },
    title: {
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    form: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '10px'
    },
    textfield: {
        marginTop: '20px',
        width: '100%'
    },
    loginBtn: {
        marginTop: '40px',
        width: '100%'
    },
    textRegister: {
        fontSize: '12px;',
        marginTop: '5px',
        textAlign: 'center'
    }
}))

const Auth = props => {
    const classes = styles();
    const authContainer = AuthContainer.useContainer();

    // useEffect(() => {
    //     authContainer.clearForm();
    // }, [])

    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const closeSnackbar = () => {
        authContainer.setOpenSnackbar(false)
    }

    const handleLoginClick = async () => {
        await authContainer.login()
            .then(response => {
                const {data, status} = response;
                if(status == 200){
                    authContainer.setOpenSnackbar(true);
                    authContainer.setToken(data.auth_token);
                    setTimeout(() => {
                        props.history.push('/home');
                    }, 4000);
                }
                
            })
            .catch(e => {
                console.log("error")

            })
    }

    return(
        <div className={classes.root}>
            <Container className={classes.center}>
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <div className={classes.content}>
                            <Box>
                                <Card className={classes.card}>
                                    <div className={classes.title}>
                                        <Typography variant="h5">Login</Typography>
                                    </div>
                                    
                                    <div className={classes.form}>
                                        <TextField value={authContainer.email} 
                                                    onChange={e => authContainer.setEmail(e.target.value)} 
                                                    className={classes.textfield} 
                                                    id="outlined-basic" 
                                                    label="Email" 
                                                    variant="outlined" />

                                        <TextField value={authContainer.password} 
                                                    onChange={e => authContainer.setPassword(e.target.value)} 
                                                    className={classes.textfield} 
                                                    type={authContainer.showPassword ? 'text' : 'password'}
                                                    id="outlined-basic" 
                                                    label="Password" 
                                                    variant="outlined" />

                                        <Box>
                                            <Button onClick={handleLoginClick} className={classes.loginBtn} variant="contained">Login</Button>
                                        </Box>

                                        {/* <Typography className={classes.textRegister}>
                                            <Link>Don't have account yet? Register</Link>
                                        </Typography> */}
                                    </div>
                                </Card>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={authContainer.openSnackbar} onClose={closeSnackbar} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity="success">Login Success!</Alert>
            </Snackbar>
        </div>
    );
}

export default Auth;