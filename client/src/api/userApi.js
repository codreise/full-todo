import CONSTANTS from '../constants';
import history from '../BrowserHistory';

export const registerUser = async (data) => {
    const res = await fetch(`${CONSTANTS.API_BASE}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if(res.status === 400) {
        const error = await res.json();
        return Promise.reject(error);
    }

    return res.json();
}

export const loginUser = async(userInput) => {
    const res = await fetch(`${CONSTANTS.API_BASE}/users/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    });
    
    if(res.status === 400) {
        const error = await res.json();
        return Promise.reject(error);
    }

    const {data, tokens} = await res.json(); // {data: {}, tokens: {}}
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    return data;
}

export const refreshSession = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await fetch(`${CONSTANTS.API_BASE}/users/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({refreshToken})
    });
    if(res.status === 401) {
        return history.replace('/');
    }

    const {tokens} = await res.json();
    console.log(tokens);
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    return;
}

export const authUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
        const res = await fetch(`${CONSTANTS.API_BASE}/users/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    
        if(res.status === 403) {
            await refreshSession();
        } else {
            return res.json()
        }
    
    } else {
        history.replace('/');
    }
}