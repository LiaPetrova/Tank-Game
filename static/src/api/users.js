import { clearUserData, setUserData } from '../util.js';
import * as api from './api.js';

export async function login(username, password) {
    const result = await api.post('/login', { username, password});

    const userData = {
        sessionToken: result.sessionToken,
        id: result.objectId,
        username: result.username
    };

    setUserData(userData);

    return result;
}

export async function register(username, password) {
    const result = await api.post('/users', { username, password});

    const userData = {
        sessionToken: result.sessionToken,
        id: result.objectId,
        username: username
    };

    setUserData(userData);

    return result;
}

export function logout() {
    api.post('/logout');
    clearUserData();
}