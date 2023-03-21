import {registerUser, loginUser, authUser, logOut } from '../api/axiosApi';
import {loginUserSuccess, loginUserError, registerUserSuccess, registerUserError, authUserSuccess, authUserError} from '../actions/actionCreator';
import {put} from 'redux-saga/effects';
import history from '../BrowserHistory'


export function* loginSaga(action) {
    try {
        const {data: {data}} = yield loginUser(action.payload);
        yield put(loginUserSuccess(data));
        history.push('/tasks');
    } catch (error) {
        yield put(loginUserError(error.response.data.error));
    }
}

export function* registerSaga(action) {
    try {
        const {data: {data}} = yield registerUser(action.payload);
        yield put(registerUserSuccess(data));
    } catch (error) {
        yield put(registerUserError(error.response.data.error));
    }
}

export function* authSaga(action) {
    try {
        const {data: {data}} = yield authUser();
        yield put(authUserSuccess(data));
    } catch (error) {
        yield put(authUserError(error.response.data.error));
    }
}

export function* logOutSaga(action) {
    logOut();
    history.push('/');
}