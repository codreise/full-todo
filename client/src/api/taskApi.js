import CONSTANTS from '../constants';
import history from '../BrowserHistory';
import { refreshSession } from './userApi';

export const getTasks = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const responce = await fetch (`${CONSTANTS.API_BASE}/tasks/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    if(responce.status === 400) {
        const error = await responce.json();
        return Promise.reject(error);
    }
    if(responce.status === 403) {
        await refreshSession();
        return await getTasks();
    }

    return responce.json();
}

export const createTask = async (data) => {
    const accessToken = localStorage.getItem('accessToken');
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    });
    
    if(responce.status === 400) {
        const error = await responce.json();
        return Promise.reject(error);
    }
    if(responce.status === 403) {
        await refreshSession();
        return await createTask(data);
    }

    return responce.json();
}

export const deleteTask = async(taskId) => {
    const accessToken = localStorage.getItem('accessToken');
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    if(responce.status === 400) {
        const error = await responce.json();
        return Promise.reject(error);
    }
    if(responce.status === 403) {
        await refreshSession();
        return await deleteTask(taskId);
    }

    return responce.json();
}