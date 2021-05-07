import { Backdrop, Button, Card, CardContent, ClickAwayListener, Container, Fade, Grid, Grow, IconButton, Menu, MenuItem, MenuList, Modal, Paper, Popper, Snackbar, TextField, Typography } from '@material-ui/core';
import React, { useEffect , useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OptionIcon from '../assets/images/dots.png';
import todoContainer from '../container/TodoContainer';
import DoneIcon from '../assets/images/checklist.png';
import AddIcon from '../assets/images/AddIcon.png';
import ExclamationCircleIcon from '../assets/images/ExclamationCircle.png';
import MuiAlert from '@material-ui/lab/Alert';

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
    progressDisplay: {
        display: 'flex'
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
    percentageNumber: {
        marginLeft: '9px'
    },
    button: {
        minWidth: '0'
    },
    optionBtn: {
        minWidth: '0',
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
    },
    addBtn: {
        display: 'flex'
    },
    newTaskText: {
        color: '#2F3136',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: 'normal',
        top: '50%',
        paddingLeft: '9px',
        paddingTop: '7px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        width: '567px',
        // height: '302.5px',
        boxShadow: '0px 3px 6px -4px #0000001F',
        boxShadow: '0px 6px 16px 0px #00000014',
        boxShadow: '0px 9px 28px 8px #0000000D'
    },
    modalTitle: {
        color: '#262626',
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 'bold'
    },
    modalTextField: {
        padding: '10px'
    },
    paperDeleteTask: {
        backgroundColor: theme.palette.background.paper,
        padding: '32px',
        width: '400px',
        height: '188px'
    }
}))

const Homepage = props => {
    const classes = styles();
    const TodoContainer = todoContainer.useContainer();
    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef(null);
    const open = Boolean(anchorEl);
    const prevOpen = useRef(open);
    const [placement, setPlacement] = useState();
    const id = open ? 'simple-popper' : undefined;
    const [openModal, setOpenModal] = useState(false);
    const [openModalDeleteTask, setOpenModalDeleteTask] = useState(false);
    const [editModalClicked, setEditModalClicked] = useState(false);
    const [taskParent, setTaskParent] = useState();
    let subTask = [];
    let targetParentIndex;

    const handleOpenModalAddTask = (selected) => {
        TodoContainer.setSelectedTaskGroup(selected.currentTarget.value);
        setEditModalClicked(false);
        setOpenModal(true);
    };

    const handleOpenModalEditTask = () => {
        setEditModalClicked(true);
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleOpenModalDeleteTask = () => {
        setOpenModalDeleteTask(true);
    }

    const handleCloseModalDeleteTask = () => {
        setOpenModalDeleteTask(false);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const openMenu = () => {
    }

    const closeSnackbar = () => {
        TodoContainer.setOpenSnackbar(false)
    }

    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

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
                    })
            })
        })
    };

    useEffect(() => {
        loadData();
    }, [])

    const handleClick = (event, id, taskListParent, index, name) => {
        TodoContainer.setTaskListId(id)
        TodoContainer.setTaskListParent(taskListParent);
        TodoContainer.setTargetTaskListParent(index);
        TodoContainer.setTaskListName(name);
        
        targetParentIndex = index;
        setTaskParent(index - 1);
        // console.log(taskParent)
        // console.log(index)
        setAnchorEl(event.currentTarget);

        // console.log(TodoContainer.task)
        // console.log(taskParent);
        // console.log(TodoContainer.task[taskParent]);
        // console.log(TodoContainer.targetTaskListParent)
    };

    const createTaskItem = async () => {
        if(TodoContainer.taskListName || TodoContainer.taskListProgress){
            TodoContainer.setInputValid(true)
            await TodoContainer.createTaskItem(TodoContainer.selectedTaskGroup)
                .then(response => {
                    if(response.status == 201) {
                        TodoContainer.setOpenSnackbar(true);
                        setTimeout(() => {
                            window.location.reload();
                        }, 4000);
                    }
                })
                .catch(response => {
                    console.log(response);
                })
        } else {
            TodoContainer.setInputValid(false);
            TodoContainer.setOpenSnackbar(true);
        }
    }

    const editTaskItem = async () => {
        await TodoContainer.editTaskList(TodoContainer.taskListParent, TodoContainer.taskListId)
            .then(response => {
                if(response.status == 200){
                    //TodoContainer.setOpenSnackbar(true);
                    setTimeout(() => {
                        //window.location.reload()
                    }, 2000);
                }
            })
            .catch(response => {
                console.log(response);
            })
    }

    const moveRight = () => {
        TodoContainer.setTargetTaskListParent(TodoContainer.task[TodoContainer.targetTaskListParent + 1]);
        
        // setTimeout(() => {
        //     editTaskItem();
        // }, 2000);
        
    }

    const moveLeft = async () => {
        await TodoContainer.setTargetTaskListParent(TodoContainer.task[taskParent - 1].id);
        //console.log(TodoContainer.targetTaskListParent)
        //await editTaskItem();
    }

    const deleteTaskItem = async () => {
        await TodoContainer.deleteTaskList(TodoContainer.taskListParent, TodoContainer.taskListId)
            .then(response => {
                setTimeout(() => {
                   window.location.reload();
                }, 1000);
            })
            .catch(response => {
                console.log(response)
            })
    }

    const renderToolbar = (
        <Menu anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="toolbar"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={handleMenuClose}
        >
            
            <MenuItem className={classes.menuText} onClick={moveLeft}>Move Left</MenuItem>
            <MenuItem className={classes.menuText} onClick={moveRight}>Move Right</MenuItem>
            <MenuItem className={classes.menuText} onClick={handleOpenModalEditTask}>Edit</MenuItem>
            <MenuItem className={classes.menuText} onClick={handleOpenModalDeleteTask}>Delete</MenuItem>

        </Menu>
    )

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
                                                    
                                                    <Card key={taskList.id} className={classes.taskItemCard}>
                                                        <Typography className={classes.taskItemName}>{taskList.name}</Typography>
                                                        <div className={classes.bottom}>
                                                            <div className={classes.utility}>
                                                                <div className={classes.progressDisplay}>
                                                                    <div className={classes.progressBar}>
                                                                        {taskList.progress_percentage >=0 && taskList.progress_percentage && 
                                                                            <div className={classes.progressPercentage} style={{width: `${taskList.progress_percentage}%`, 
                                                                                backgroundColor:  `${taskList.progress_percentage == 100 ? '#52C41A' : '#1890FF'}`}}>
                                                                            </div>
                                                                        }
                                                                        
                                                                    </div>
                                                                    
                                                                    <div className={classes.percentageNumber}>
                                                                        {taskList.progress_percentage == 100 ?
                                                                            <img src={DoneIcon} style={{marginTop: '4px'}} />
                                                                            :
                                                                            <span className={classes.percentageText}>{taskList.progress_percentage}%</span>
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className={classes.button}>
                                                                    <IconButton className={classes.optionBtn} 
                                                                            aria-label="show more"
                                                                            aria-haspopup="true"
                                                                            aria-controls="toolbar"
                                                                            onClick={e => handleClick(e, taskList.id, taskList.todo_id, task.id, taskList.name)}>
                                                                        <img className={classes.btn} src={OptionIcon} />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                }
                                            </div>
                                        )}
                                            <Button value={task.id} type="button" onClick={selected => handleOpenModalAddTask(selected)}>
                                                <div className={classes.addBtn}>
                                                    <div>
                                                        <img src={AddIcon} style={{marginTop: '5px'}}/>
                                                    </div>
                                                    <Typography className={classes.newTaskText}>New Task</Typography>
                                                </div>
                                            </Button>
                                            
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </div>
            {/* Modal for create new task */}
            <Modal
                className={classes.modal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                open={openModal}
                onClose={handleMenuClose}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={classes.paper}>
                        <Typography className={classes.modalTitle} style={{marginTop: '12px'}} id="transition-modal-title">
                            {!editModalClicked ? 'Create Task' : 'Edit Task'}
                        </Typography>
                        <div>
                            <div >
                                <p style={{marginBottom: '4px'}}>Task Name</p>
                                <TextField value={TodoContainer.taskListName} 
                                            onChange={e => TodoContainer.setTaskListName(e.target.value)} 
                                            placeholder="example: Build rocket to Mars." 
                                            variant="outlined" 
                                            style={{width: '100%'}}>
                                </TextField>
                            </div>
                            <div >
                                <p style={{marginBottom: '4px'}}>Progress</p>
                                <TextField value={TodoContainer.taskListProgress} 
                                            onChange={e => TodoContainer.setTaskListProgress(e.target.value)} 
                                            placeholder="0%" 
                                            variant="outlined" 
                                            style={{width: '100px'}}>
                                </TextField>
                            </div>
                            <div style={{paddingTop: '10px', float: 'right'}}>
                                <Button onClick={handleClose} variant="contained" style={{backgroundColor: '#FFFFFF', borderColor: '1px solid', color: '#262626', marginRight: '8px'}}>
                                    Cancel
                                </Button>
                                {
                                    !editModalClicked ?

                                    <Button onClick={() => createTaskItem()} variant="contained" style={{backgroundColor: '#27AE60', color: '#FFFFFF'}}>
                                        Save Task
                                    </Button>

                                    :

                                    <Button onClick={() => editTaskItem()} variant="contained" style={{backgroundColor: '#27AE60', color: '#FFFFFF'}}>
                                        Save Task
                                    </Button>
                                }
                                
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

            {/* Modal for delete existing task */}
            <Modal
                className={classes.modal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                open={openModalDeleteTask}
                onClose={handleMenuClose}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalDeleteTask}>
                    <div className={classes.paperDeleteTask}>
                        <div style={{display: 'flex'}}>
                            <div>
                                <img src={ExclamationCircleIcon} />
                            </div>
                            <div style={{paddingLeft: '16px'}}>
                                <Typography className={classes.modalTitle} id="transition-modal-title">Delete Task</Typography>
                                <div>
                                    <div >
                                        <p style={{marginBottom: '4px'}}>Are you sure want to delete this task? your action can't be reverted.</p>
                                    </div>
                                    <div style={{paddingTop: '10px', float: 'right'}}>
                                        <Button onClick={handleCloseModalDeleteTask} variant="contained" style={{backgroundColor: '#FFFFFF', borderColor: '1px solid', color: '#262626', marginRight: '8px'}}>
                                            Cancel
                                        </Button>
                                        <Button onClick={deleteTaskItem} variant="contained" style={{backgroundColor: '#EB5757', color: '#FFFFFF'}}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </Fade>
            </Modal>
            <Snackbar open={TodoContainer.openSnackbar} onClose={closeSnackbar} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                {TodoContainer.inputValid ? 
                   <Alert severity="success">Task list has been created.</Alert> 
                   : 
                   <Alert severity="error">You are required to fill all of the input fields!</Alert>
                }
                {/* <Alert severity="success">Task list has been deleted.</Alert>
                <Alert severity="success">Task list has been updated.</Alert> */}
            </Snackbar>
            {renderToolbar}
        </div>
        
    );
}

export default Homepage;