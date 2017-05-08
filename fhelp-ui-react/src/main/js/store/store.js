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
    loadData(store);
    return store;
}

function loadData(store) {
    client({method: 'GET', path: '/fhelp/rbc/indicators'}).then(response => {
        const indicators = response.entity;
        store.dispatch({ type: "LOAD_INDICATORS", payload: indicators});
        return client({method: 'GET', path: '/fhelp/account'});
    }).then(response => {
        store.dispatch({ type: "LOAD_ACCOUNTS", payload: response.entity});
    });
}

export {configureStore, loadData, history};
