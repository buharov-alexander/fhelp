'use strict';

import {createStore, applyMiddleware} from 'redux';
import client from '../api/client';
import actionMiddleware from './actionMiddleware';
import combineReducer from './combineReducer';
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'


const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const createStoreWithMiddleware = applyMiddleware(routeMiddleware, actionMiddleware)(createStore);

function configureStore() {
    const store = createStoreWithMiddleware(combineReducer);
    return store;
}

export {configureStore, history};
