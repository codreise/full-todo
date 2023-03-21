import { getTask, createTask, deleteTask } from "../api/axiosApi";
import {
    getTasksSuccess,
    getTasksError,
    createTaskSuccess,
    createTaskError,
    deleteTaskSuccess,
    deleteTaskError
} from '../actions/actionCreator';

import {put} from 'redux-saga/effects';

export function* getTasksSaga(action) {
    try {
        const {data: {data}} = yield getTask();
        yield put(getTasksSuccess(data));
    } catch (error) {
        yield put(getTasksError(error.response.data.error));
    }
} 

export function* createTaskSaga(action) {
    try {
        const {data: {data}} = yield createTask(action.payload);
        yield put(createTaskSuccess(data));
    } catch (error) {
        yield put(createTaskError(error.response.data.error));
    }
}

export function* deleteTaskSaga(action) {
    try {
        const {data: {data}} = yield deleteTask(action.payload);
        yield put(deleteTaskSuccess(data));
    } catch (error) {
        yield put(deleteTaskError(error.response.data.error));
    }
}