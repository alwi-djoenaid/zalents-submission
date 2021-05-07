import {useState} from 'react';
import {createContainer} from 'unstated-next';
import TodoService from '../services/TodoService';
import localforage from 'localforage';

function useTodo(props){
    const todoService = new TodoService();
    const [anchorElement, setAnchorElement] = useState(null);
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    const [task, setTask] = useState([]);
    const [taskList, setTaskList] = useState([]);

    const [selectedTaskGroup, setSelectedTaskGroup] = useState();
    const [taskListName, setTaskListName] = useState();
    const [taskListProgress, setTaskListProgress] = useState();

    const getTodoList = () => {
        return todoService.getTodoList()
    }

    const getTaskItem = (todoId) => {
        return todoService.getTaskList(todoId)
    }

    const createTaskItem = async (todoId) => {
        let payload = {
            name: taskListName,
            progress_percentage: taskListProgress
        };
        console.log(payload)
        return await todoService.createTaskList(todoId, payload);
    }

    return{
        task, 
        setTask,
        taskList, 
        setTaskList,
        selectedTaskGroup, 
        setSelectedTaskGroup,
        taskListName, 
        setTaskListName,
        taskListProgress, 
        setTaskListProgress,
        anchorElement,
        setAnchorElement,
        open, 
        setOpen,
        openSnackbar, 
        setOpenSnackbar,
        inputValid, 
        setInputValid,
        getTodoList,
        getTaskItem,
        createTaskItem
    };
}

const todoContainer = createContainer(useTodo);
export default todoContainer;