import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "98vh",
        marginTop: '0',
        overflow: "auto",
        background: "#eeeeee"
    },
    containerOpen: {
        paddingTop: "11vh",
        paddingLeft: "290px",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "0px"
        }
    },
    containerClosed: {
        paddingTop: "11vh",
        paddingLeft: "120px",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "0px"
        }
    }
}));

const Main = props => {
    const classes = useStyles();

    return(
        <main className={classes.content}>
            <div className={classes.appBarSpacer}>
                <div>
                    {props.children}
                </div>
            </div>
        </main>
    );
}

export default Main;