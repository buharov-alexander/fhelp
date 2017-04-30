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
    const data = {};
    client({method: 'GET', path: '/fhelp/mmvb/rates'}).then(response => {
            data.rates = response.entity;
            return client({method: 'GET', path: '/fhelp/data/accounts'});
        }).then(response => {
            const accounts = response.entity._embedded.accounts.map(account =>
                calculateRubleEquivalent(account, data.rates));
            data.accounts = accounts;
            store.dispatch({ type: "LOAD_DATA", payload: data});
        });

    client({method: 'GET', path: '/fhelp/rbc/indicators'}).then(response => {
        const indicators = response.entity;
        store.dispatch({ type: "LOAD_INDICATORS", payload: indicators});
    });
}

function calculateRubleEquivalent(account, rates) {
    switch(account.valuta) {
        case 'USD':
            account.rubBalance = Math.round(account.balance*rates.USD*10)/10;
            break;
        case 'EUR':
            account.rubBalance = Math.round(account.balance*rates.EUR*10)/10;
            break;
        default:
            account.rubBalance = account.balance;
    }
    return account;
}

export {configureStore, loadData};
