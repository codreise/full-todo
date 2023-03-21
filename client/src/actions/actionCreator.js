import ACTION_TYPES from './actionTypes';

// users creators

export const authUserRequest = () => {
    return {
        type: ACTION_TYPES.AUTH_USER_REQUEST
    }
}

export const authUserSuccess = (data) => {
    return {
        type: ACTION_TYPES.AUTH_USER_SUCCESS,
        data
    }
}

export const authUserError = (error) => {
    return {
        type: ACTION_TYPES.AUTH_USER_ERROR,
        error
    }
}

export const loginUserRequest = (payload) => {
    return {
        type: ACTION_TYPES.LOGIN_USER_REQUEST,
        payload
    }
}

export const loginUserSuccess = (data) => {
    return {
        type: ACTION_TYPES.LOGIN_USER_SUCCESS,
        data
    }
}

export const loginUserError = (error) => {
    return {
        type: ACTION_TYPES.LOGIN_USER_ERROR,
        error
    }
}

export const registerUserRequest = (payload) => {
    return {
        type: ACTION_TYPES.REGISTER_USER_REQUEST,
        payload
    }
}

export const registerUserSuccess = (data) => {
    return {
        type: ACTION_TYPES.REGISTER_USER_SUCCESS,
        data
    }
}

export const registerUserError = (error) => {
    return {
        type: ACTION_TYPES.REGISTER_USER_ERROR,
        error
    }
}

export const logOutRequest = () => {
    return {
        type: ACTION_TYPES.LOG_OUT_REQUEST,
    }
}

// tasks creators

export const getTasksRequest = () => {
    return {
        type: ACTION_TYPES.GET_TASKS_REQUEST
    }
}

export const getTasksSuccess = (data) => {
    return {
        type: ACTION_TYPES.GET_TASKS_SUCCESS,
        data
    }
}

export const getTasksError = (error) => {
    return {
        type: ACTION_TYPES.GET_TASKS_ERROR,
        error
    }
}

export const createTaskRequest = (payload) => {
    return {
        type: ACTION_TYPES.CREATE_TASK_REQUEST,
        payload
    }
}

export const createTaskSuccess = (data) => {
    return {
        type: ACTION_TYPES.CREATE_TASK_SUCCESS,
        data
    }
}

export const createTaskError = (error) => {
    return {
        type: ACTION_TYPES.CREATE_TASK_ERROR,
        error
    }
}

export const deleteTaskRequest = (payload) => {
    return {
        type: ACTION_TYPES.DELETE_TASK_REQUEST,
        payload
    }
}

export const deleteTaskSuccess = (data) => {
    return {
        type: ACTION_TYPES.DELETE_TASK_SUCCESS,
        data
    }
}

export const deleteTaskError = (error) => {
    return {
        type: ACTION_TYPES.DELETE_TASK_ERROR,
        error
    }
}