import { Button, Card, CardContent, ClickAwayListener, Container, Fade, Grid, Grow, Menu, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import React, { useEffect , useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OptionIcon from '../assets/images/dots.png';
import todoContainer from '../container/TodoContainer';
import DoneIcon from '../assets/images/checklist.png'

const styles = makeStyles(theme => ({
    root: {
        marginLeft: '68px'
    },
    wrapper: {
        paddingLeft: '50px',
        paddingRight: '50px',
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    content: {
        paddingTop: '24px',
        paddingBottom: '24px'
    },
    card: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#FFF9FB',
        border: '1px solid #EB2F96'
    },
    cardHeader: {
        border: '1px solid #FFADD2',
        borderRadius: '2px',
        width: '86px',
        backgroundColor: '#FFF0F6'
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: '12px',
        color: '#EB2F96',
        lineHeight: '20px',
        fontWeight: 'normal',
        height: '20px',
        left: '8px',
        top: '1px'
    },
    cardDescription: {
        width: '120px',
        height: '22px',
        marginTop: '4px'
    },
    cardDescriptionText: {
        fontSize: '12px',
        lineHeight: '20px',
        fontWeight: '500'
    },
    cardContent: {
        padding: '12px'
    },
    taskItemCard: {
        width: '100%',
        height: '100%',
        padding: '16px',
        margin: '6px 0px'
    },
    taskItemName: {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '500'
    },
    bottom: {
        marginTop: '30px'
    },
    utility: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    progressBar: {
        width: '84px',
        height: '8px',
        borderRadius: '8px',
        backgroundColor: '#F5F5F5',
        margin: 'auto 0px'
    },
    progressPercentage: {
        height: '100%',
        borderRadius: '8px',
    },
    button: {
        minWidth: '0'
    },
    optionBtn: {
        height: '24px',
        width: '24px',
        float: 'right',
        "&:hover": {
            backgroundColor: '#F2F2F2',
            borderRadius: '7px'
        }
    },
    btn: {
        margin: '0 3px',
        alignItems: 'center'
    },
    menuText: {
        fontSize: '14px',
        lineHeight: '20px',
        "&:hover": {
            backgroundColor: '#F5F0FC',
            color: '#5E20B3'
        }
    },
    test: {
        width: '500px',
        height: '500px'
    },
    percentageText: {
        color: '#8C8C8C',
        fontSize: '12px',
        lineHeight: '22px',
        fontWeight: 'normal'
    }
}))

const Homepage = props => {
    const classes = styles();
    const TodoContainer = todoContainer.useContainer();
    const anchorRef = useRef(null)
    //const prevOpen = useRef(open);
    const [anchorEl, setAnchorEl] = useState(null); 
    const open = Boolean(anchorEl);
    const [placement, setPlacement] = useState();
    const id = open ? 'transitions-popper' : undefined;
    let parentTask = {

    };
    let subTask = [];

    // const handleClick = (newPlacement) => (event) => {
    //     setAnchorEl(event.currentTarget);
    //     setOpen((prev) => placement !== newPlacement || !prev);
    //     setPlacement(newPlacement);
    // };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };

    const openMenu = () => {
        //setOpen((prevOpen) => !prevOpen);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        // if (prevOpen.current === true && open === false) {
        //     anchorRef.current.focus();
        // }

        // prevOpen.current = open;

        const loadData = async () => {
            TodoContainer.getTodoList()
            .then(response => {
                const {data} = response;
                TodoContainer.setTask(data)
                data.map(todo => {
                    TodoContainer.getTaskItem(todo.id)
                        .then(response => {
                            subTask.push(response.data);
                            TodoContainer.setTaskList(prevState => [...prevState, ...response.data])
                            // console.log(TodoContainer.taskList)
                            // console.log(subTask.length);
                            // console.log(subTask);
                            // console.log(subTask[0][0].todo_id);
                            // console.log(...subTask);
                        })
                    
                })
                console.log(subTask.length);
                console.log(data)
            })
        };
        loadData()
        
    }, [])

    return(
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Typography variant="h5">Product Roadmap</Typography>

                <div className={classes.content}>

                    <Grid container spacing={2}>

                        {TodoContainer.task.map((task, i) => 
                            <Grid key={i} item xs={12} md={6} lg={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>

                                        <div className={classes.cardHeader}>
                                            <Typography className={classes.cardTitle} variant="h6">{task.title}</Typography>
                                        </div>

                                        <div className={classes.cardDescription}>
                                            <Typography className={classes.cardDescriptionText} variant="h6">{task.description}</Typography>
                                        </div>

                                        {TodoContainer.taskList.map(taskList => 
                                            <div>
                                                {
                                                    task.id == taskList.todo_id 
                                                    
                                                    && 
                                                    
                                                    <Card className={classes.taskItemCard}>
                                                        <Typography className={classes.taskItemName}>{taskList.name}</Typography>
                                                        <div className={classes.bottom}>
                                                            <div className={classes.utility}>
                                                                <div className={classes.progressBar}>
                                                                    <div className={classes.progressPercentage} style={{width: `${taskList.progress_percentage}%`, 
                                                                        backgroundColor:  `${taskList.progress_percentage == 100 ? '#52C41A' : '#1890FF'}`}}>
                                                                    </div>
                                                                    
                                                                </div>

                                                                <div>
                                                                    {taskList.progress_percentage == 100 ?
                                                                        <img src={DoneIcon} style={{marginRight: '30px', marginTop: '4px'}} />
                                                                        :
                                                                        <span className={classes.percentageText}>{taskList.progress_percentage}%</span>
                                                                    }
                                                                </div>

                                                                <div className={classes.button}>
                                                                    <Button className={classes.optionBtn} 
                                                                            aria-describedby={id}
                                                                            onClick={handleClick}>
                                                                        <img className={classes.btn} src={OptionIcon} />
                                                                    </Button>

                                                                    <Popper open={open} id={id} anchorEl={anchorRef.current} transition >
                                                                        {({TransitionProps}) => {
                                                                            <Fade {...TransitionProps} timeout={350}>
                                                                                <Paper>
                                                                                    <ClickAwayListener onClickAway={handleClose}>
                                                                                        <MenuList autoFocusItem={open} id="menu-list-grow">
                                                                                        {
                                                                                            i !== 0 
                                                                            
                                                                                            &&

                                                                                            <MenuItem className={classes.menuText} onClick={handleClose}>Move Left</MenuItem>
                                                                                        }
                                                                        
                                                                                            <MenuItem className={classes.menuText} onClick={handleClose}>Move Right</MenuItem>
                                                                                            <MenuItem className={classes.menuText} onClick={handleClose}>Edit</MenuItem>
                                                                                            <MenuItem className={classes.menuText} onClick={handleClose}>Delete</MenuItem>
                                                                                        </MenuList>
                                                                                    </ClickAwayListener>
                                                                                </Paper>
                                                                            </Fade>
                                                                        }}
                                                                    </Popper>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                }
                                            </div>
                                        )}

                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </div>
        </div>
        
    );
}

export default Homepage;