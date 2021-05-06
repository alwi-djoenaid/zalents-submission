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

    const getTodoList = () => {
        return todoService.getTodoList()
    }

    const getTaskItem = (todoId) => {
        return todoService.getTaskList(todoId)
    }

    return{
        task, 
        setTask,
        taskList, 
        setTaskList,
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