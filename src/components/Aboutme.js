import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { render } from '@testing-library/react';
import React from 'react';

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '0'
    },
    content: {
        paddingTop: '24px',
        paddingBottom: '24px'
    },
    name: {
        textAlign: 'center'
    },
    space: {
        paddingRight: '130px',
        paddingLeft: '130px'
    }
}))

const Aboutme = props => {
    const classes = styles();

    return(
        <div className={classes.content}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography className={classes.name} variant="h4">Alwi Azra Akbar</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <div className={classes.space}>
                            <Typography variant="h6">Profile</Typography>
                            <p>
                                I am a Computer Science fresh graduate from Universitas Bina Nusantara with 3.43 GPA. As a fresh
                                graduate, I am experienced at front-end web development using Reactjs and jQuery, and
                                understands back-end web application development using Java and PostgreSQL through my one
                                year internship experience. My dedication to my work made me able to contibute to the project
                                development by doing all of my responsibilities. I am ready for any challenges in the future.
                            </p>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <div className={classes.space}>
                            <Typography variant="h6">Core Skills</Typography>
                            <Grid item xs={12} md={12} lg={12}>

                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Aboutme;