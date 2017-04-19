'use strict';

import {createStore, applyMiddleware} from 'redux';
import client from '../api/client';
import actionMiddleware from './actionMiddleware'

const createStoreWithMiddleware = applyMiddleware(actionMiddleware)(createStore);

function configureStore() {
    return createStoreWithMiddleware(storeReducer, {
        accounts: [],
        rates: {},
        indicators: [],
        isVisibleNewAccountPanel: false,
        isDrawerOpened: false
    });;
}

function storeReducer(state = {}, action) {
    if (action.type === "LOAD_DATA") {
        return Object.assign({}, state, action.payload);
    } else if (action.type === 'SET_VISIBILITY_NEW_ACCOUNT_PANEL') {
        return Object.assign({}, state, {isVisibleNewAccountPanel: action.payload});
    } else if (action.type === 'SET_DRAWER_STATE') {
        return Object.assign({}, state, {isDrawerOpened: action.payload});
    } else if (action.type === 'ADD_ACCOUNT') {
        const newAccount = calculateRubleEquivalent(action.payload, state.rates);
        const newAccounts = state.accounts.concat(newAccount);
        return Object.assign({}, state, {accounts: newAccounts});
    } else if (action.type === 'LOAD_INDICATORS') {
        return Object.assign({}, state, {indicators: action.payload});
    }
    return state;
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
            account.rubBalance = account.balance*rates.USD;
            break;
        case 'EUR':
            account.rubBalance = account.balance*rates.EUR;
            break;
        default:
            account.rubBalance = account.balance;
    }
    return account;
}

export {configureStore, loadData};
