import axios from 'axios';
import localforage from 'localforage';

export default class AuthService{
    async login(data){
        let response;
        const url = `https://todos-project-api.herokuapp.com/auth/login`;

        try{
            response = axios.post(url, data);
        } catch(e) {
            console.warn(e);
        }
        return response;
    }
}