import axios from 'axios';

export default class TodoService{
    constructor(){
        // this.state = {
        //     baseUrl: `https://todos-project-api.herokuapp.com/todos`
        // }
    }

    async getTodoList(){
        let response;
        try{
            response = await axios.get(`https://todos-project-api.herokuapp.com/todos`);
        } catch(e) {
            console.warn(e);
        }
        return response;
    }

    async getTaskList(todoId){
        let response;
        try{
            response = await axios.get(`https://todos-project-api.herokuapp.com/todos/${todoId}/items`)
        } catch(e) {
            console.warn(e);
        }
        return response;
    }

    async createTaskList(todoId, data){
        let response;
        try{
            response = await axios.post(`https://todos-project-api.herokuapp.com/todos/${todoId}/items`, data)
        } catch(e) {
            console.warn(e)
        }
        return response;
    }

    async 
}