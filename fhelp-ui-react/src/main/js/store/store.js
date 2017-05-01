'use strict';

import {createStore, applyMiddleware} from 'redux';
import client from '../api/client';
import actionMiddleware from './actionMiddleware';
import combineReducer from './combineReducer';

const createStoreWithMiddleware = applyMiddleware(actionMiddleware)(createStore);

function configureStore() {
    return createStoreWithMiddleware(combineReducer);
}


function loadData(store) {
    client({method: 'GET', path: '/fhelp/rbc/indicators'}).then(response => {
        const indicators = response.entity;
        store.dispatch({ type: "LOAD_INDICATORS", payload: indicators});
        return client({method: 'GET', path: '/fhelp/data/accounts'});
    }).then(response => {
        store.dispatch({ type: "LOAD_ACCOUNTS", payload: response.entity._embedded.accounts});
    });
}

export {configureStore, loadData};
