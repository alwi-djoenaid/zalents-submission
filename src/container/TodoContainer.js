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
    const [taskListId, setTaskListId] = useState();
    const [taskListName, setTaskListName] = useState();
    const [taskListProgress, setTaskListProgress] = useState();
    const [targetTodoId, setTargetTodoId] = useState();
    const [taskListParent, setTaskListParent] = useState();

    const getTodoList = () => {
        return todoService.getTodoList();
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

    const editTaskList = async (todoId) => {
        let payload = {
            target_todo_id: targetTodoId,
            name: taskListName
        }
        return await todoService.editTaskList(payload, todoId);
    }

    const deleteTaskList = async (taskListParentId, taskListId) => {
        return await todoService.deleteTaskList(taskListParentId, taskListId);
    }

    return{
        task, 
        setTask,
        taskList, 
        setTaskList,
        selectedTaskGroup, 
        setSelectedTaskGroup,
        taskListId, 
        setTaskListId,
        taskListName, 
        setTaskListName,
        taskListProgress, 
        setTaskListProgress,
        targetTodoId, 
        setTargetTodoId,
        taskListParent, 
        setTaskListParent,
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
        createTaskItem,
        editTaskList,
        deleteTaskList
    };
}

const todoContainer = createContainer(useTodo);
export default todoContainer;