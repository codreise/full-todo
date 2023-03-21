import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { composeWithDevTools } from '@redux-devtools/extension';

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;