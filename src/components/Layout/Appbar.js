import React from 'react';
import {withRouter} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Logo from './../../assets/images/Logo.png';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    sidebar: {
        height: '100%',
        width: '68px',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#2F3136'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawer: {
        width: '250px'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    logo: {
        padding: '20px 11px'
    }
}))


const Appbar = props => {
    const classes = useStyles();
    return(
        <div className={classes.sidebar}>
            <img className={classes.logo} src={Logo} />
        </div>
    )
}

export default withRouter(Appbar);