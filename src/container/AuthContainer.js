import {useState} from 'react';
import {createContainer} from 'unstated-next';
import AuthService from '../services/AuthService';
import localforage from 'localforage';
import axios from 'axios';

function useAuth(props){
    const authService = new AuthService();

    // Login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailRegistration, setEmailRegistration] = useState("");
    const [passwordRegistration, setPasswordRegistration] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false)

    const clearForm = () => {
        setEmail("");
        setPassword("");
    }

    const login = async (props) => {
        let payload = {
            email: email,
            password: password
        }
        // const response = await authService.login(payload)
        // console.log(response.status)

        // if(response.status == 200){
        //     console.log('test')
        //     const {data} = response;
        //     setToken(data.auth_token);
        //     await setLoginSuccess(true);
        // } else {
        //     await setLoginSuccess(false);
        // }

        return await authService.login(payload)
    }

    const setToken = async (token) => {
        // Set token expiration date
        let expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1);

        localforage.setItem("access_token", token);
        localforage.setItem("expire_date", expireDate)

        console.log(expireDate)
        if(token !== null){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
        }
    }

    const onTryAutoSignIn = async () => {
        const token = await localforage.getItem('access_token');
        const expire_date = await localforage.getItem('expire_date')

        // Check if no token exists
        if(token == null){
            logout();
        } else {
            // Check if token expired
            if(expire_date <= new Date()){
                console.log(test)
                logout();
            } else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsAuthenticated(true);
            }
        }
    }

    const logout = async () => {
        await localforage.removeItem("access_token");
        await localforage.removeItem("expire_date");
        await setIsAuthenticated(false);
    }

    return{
        email,
        setEmail,
        password,
        setPassword,
        emailRegistration,
        setEmailRegistration,
        passwordRegistration,
        setPasswordRegistration,
        isAuthenticated, 
        setIsAuthenticated,
        loginSuccess, 
        setLoginSuccess,
        openSnackbar,
        setOpenSnackbar,
        clearForm,
        login,
        logout,
        setToken,
        onTryAutoSignIn
    };
}

const AuthContainer = createContainer(useAuth);
export default AuthContainer;