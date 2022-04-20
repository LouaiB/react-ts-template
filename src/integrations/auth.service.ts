import axios from 'axios';
import Config from '../configs/config';


function login(email: string, password: string) {
    return axios.post(`${Config.apiUrl}/auth/login`, { email, password });
}

function autoLogin(refreshToken: string) {
    return axios.get(`${Config.apiUrl}/auth/autoLogin`, { headers: { 'refresh-token': refreshToken } });
}

function register(email: string, password: string) {
    return axios.post(`${Config.apiUrl}/auth/register`, { email, password });
}

function logout() {
    return axios.get(`${Config.apiUrl}/auth/logout`);
}

function getUserData() {
    return axios.get(`${Config.apiUrl}/auth/myDetails`);
}

function refresh(refreshToken: string) {
    return axios.get(`${Config.apiUrl}/auth/refresh`, { headers: { 'refresh-token': refreshToken } });
}


/**
 * Exports
 */
const AuthService = {
    login,
    autoLogin,
    register,
    logout,
    getUserData,
    refresh
}
export default AuthService;