import {useState} from 'react';
import {createContainer} from 'unstated-next';
import TodoService from '../services/TodoService';
import localforage from 'localforage';

function useTodo(props){
    const todoService = new TodoService();
    const [anchorElement, setAnchorElement] = useState(null);
    const [open, setOpen] = useState(false);

    const [task, setTask] = useState([]);
    const [taskList, setTaskList] = useState([]);

    const [selectedTaskGroup, setSelectedTaskGroup] = useState();
    const [taskListName, setTaskListName] = useState("");
    const [taskListProgress, setTaskListProgress] = useState();

    const getTodoList = () => {
        return todoService.getTodoList()
    }

    const getTaskItem = (todoId) => {
        return todoService.getTaskList(todoId)
    }

    const createTaskItem = (todoId) => {
        let payload = {
            name: taskListName,
            progress_percentage: taskListProgress
        }
        return await todoService.createTaskList(todoId)
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
        getTodoList,
        getTaskItem
    };
}

const todoContainer = createContainer(useTodo);
export default todoContainer;