import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import { loginSaga, registerSaga, authSaga, logOutSaga } from './authSaga';
import { getTasksSaga, createTaskSaga, deleteTaskSaga } from './tasksSaga';

function* rootSaga() {
    // users
    yield takeLatest(ACTION_TYPES.LOGIN_USER_REQUEST, loginSaga);
    yield takeLatest(ACTION_TYPES.REGISTER_USER_REQUEST, registerSaga);
    yield takeLatest(ACTION_TYPES.AUTH_USER_REQUEST, authSaga);
    yield takeLatest(ACTION_TYPES.LOG_OUT_REQUEST, logOutSaga);
    // tasks
    yield takeLatest(ACTION_TYPES.GET_TASKS_REQUEST, getTasksSaga);
    yield takeLatest(ACTION_TYPES.CREATE_TASK_REQUEST, createTaskSaga);
    yield takeLatest(ACTION_TYPES.DELETE_TASK_REQUEST, deleteTaskSaga);
}

export default rootSaga;