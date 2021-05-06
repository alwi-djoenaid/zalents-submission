import React from 'react';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Mail, More } from '@material-ui/icons';


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
    }
}))

const mobileMenu = (
    <Menu>

    </Menu>
)


const Appbar = props => {
    const classes = useStyles();
    const [anchorElement, setAnchorElement] = React.useState(null);
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const isMobileMenuOpen = Boolean(anchorElement);

    const mobileMenuId = 'primary-search-account-menu-mobile'

    const handleMobileMenuClose = () => {
        setAnchorElement(null);
    };

    const handleMobileMenuOpen = (event) => {
        setAnchorElement(event.currentTarget);
      };

    const mobileMenu = (
        <Menu anchorEl={anchorElement} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id={mobileMenuId} keepMounted open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
            <MenuItem>
                <IconButton>
                    <MailIcon />
                </IconButton>
            </MenuItem>
        </Menu>
    )

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    const closeDrawer = () => {
        setOpenDrawer(false)
    }

    const list = () => {

    }

    return(
        <div className={classes.sidebar}>
            {/* <AppBar position="static" color="#fff">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="left" open={openDrawer} onClose={closeDrawer}>

                        <div className={classes.drawerHeader}>
                            <IconButton onClick={closeDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        
                        <Divider />

                        <List className={classes.drawer}>
                            <ListItem button to="/home" component={Link}>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>

                            <ListItem button to="/aboutme" component={Link}>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary="About Me"/>
                            </ListItem>
                        </List>
                    </Drawer>

                    <Typography variant="h5" className={classes.title}>
                        Submission
                    </Typography>

                    <div className={classes.sectionDesktop}>
                        <IconButton>
                            <MailIcon />
                        </IconButton>
                    </div>

                    <div className={classes.sectionMobile}>
                        <IconButton aria-label="show more" aria-controls={mobileMenuId} onClick={handleMobileMenuOpen}>
                            <MoreIcon />
                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
            {mobileMenu} */}
        </div>
    )
}

export default withRouter(Appbar);